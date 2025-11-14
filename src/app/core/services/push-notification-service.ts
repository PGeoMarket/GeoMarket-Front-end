import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { PushNotifications, Token, ActionPerformed, PushNotificationSchema } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService extends CrudService<any> {

  protected override endpoint = 'device-token'; // No se usa mucho pero es requerido

  private deviceId: string | null = null;

  constructor(
    http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  /**
   * Inicializar notificaciones push
   */
  async init(userId: number): Promise<void> {
    // Solo en dispositivos móviles
    if (!Capacitor.isNativePlatform()) {
      console.log('⚠️ Push notifications solo disponibles en móvil');
      return;
    }

    try {
      // 1. Pedir permisos
      let permStatus = await PushNotifications.checkPermissions();
      
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
      
      if (permStatus.receive !== 'granted') {
        console.error('❌ Permisos de notificaciones denegados');
        return;
      }

      console.log('✅ Permisos concedidos');

      // 2. Registrar con FCM
      await PushNotifications.register();

      // 3. Configurar listeners
      this.setupListeners(userId);

    } catch (error) {
      console.error('Error inicializando push:', error);
    }
  }

  /**
   * Configurar listeners de notificaciones
   */
  private setupListeners(userId: number): void {
    
    // Token recibido de FCM
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('📲 FCM Token recibido:', token.value);
      
      // Generar device ID único
      this.deviceId = `user-${userId}-${Date.now()}`;
      
      // Registrar en backend
      await this.registerDevice(userId, token.value);
    });

    // Error al registrar
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('❌ Error en registro FCM:', error);
    });

    // Notificación recibida (app en primer plano)
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('📩 Notificación recibida (foreground):', notification);
        // Aquí puedes mostrar un toast o alert personalizado
      }
    );

    // Notificación tocada (abre la app)
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('👆 Notificación tocada:', notification);
        
        const data = notification.notification.data;
        if (data && data.chat_id) {
          // Navegar al chat
          this.router.navigate(['/chats']);
        }
      }
    );
  }

  /**
   * Registrar dispositivo en backend
   */
  private async registerDevice(userId: number, fcmToken: string): Promise<void> {
    try {
      // Usa this.API_URL heredado de CrudService
      const response = await this.http.post<any>(
        `${this.API_URL}/device-token`,
        {
          device_id: this.deviceId,
          fcm_token: fcmToken,
          platform: 'android'
        }
      ).toPromise();

      console.log('✅ Dispositivo registrado en backend:', response);

    } catch (error) {
      console.error('❌ Error registrando dispositivo:', error);
    }
  }

  /**
   * Desregistrar dispositivo (logout)
   */
  async unregister(): Promise<void> {
  if (!this.deviceId || !Capacitor.isNativePlatform()) {
    return;
  }

  try {
    // Envía device_id como query param
    await this.http.delete(
      `${this.API_URL}/device-token?device_id=${this.deviceId}`
    ).toPromise();

    console.log('✅ Dispositivo desregistrado');
    this.deviceId = null;

  } catch (error) {
    console.error('❌ Error desregistrando dispositivo:', error);
  }
}
}