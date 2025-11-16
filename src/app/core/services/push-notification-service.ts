import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { PushNotifications, Token, ActionPerformed, PushNotificationSchema } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications'; 

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService extends CrudService<any> {

  protected override endpoint = 'device-token';
  private deviceId: string | null = null;

  constructor(
    http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  async init(userId: number): Promise<void> {
    if (!Capacitor.isNativePlatform()) {
      console.log('⚠️ Push notifications solo disponibles en móvil');
      return;
    }

    try {
      let permStatus = await PushNotifications.checkPermissions();
      
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
      
      if (permStatus.receive !== 'granted') {
        console.error('❌ Permisos denegados');
        return;
      }

      console.log('✅ Permisos concedidos');
      
      // Generar deviceId ANTES de registrar
      this.deviceId = this.getOrCreateDeviceId(userId);
      console.log('🔑 Device ID:', this.deviceId);
      
      await PushNotifications.register();
      this.setupListeners(userId);

    } catch (error) {
      console.error('Error inicializando push:', error);
    }
  }

  private setupListeners(userId: number): void {
    
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('📲 FCM Token:', token.value);
      await this.registerDevice(userId, token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('❌ Error FCM:', error);
    });

  PushNotifications.addListener(
  'pushNotificationReceived',
  (notification: PushNotificationSchema) => {
    console.log('📩 Nuevo mensaje:', notification);
    
    // Emitir evento simple
    window.dispatchEvent(new CustomEvent('inAppNotification', {
      detail: {
        title: notification.title,
        body: notification.body,      }
    }));
  }
);

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('👆 Notificación tocada:', notification);
        
        const data = notification.notification.data;
        if (data && data.chat_id) {
          this.router.navigate(['/chats']);
        }
      }
    );
  }

  private async registerDevice(userId: number, fcmToken: string): Promise<void> {
    try {
      const response = await this.http.post<any>(
        `${this.API_URL}/device-token`,
        {
          device_id: this.deviceId,
          fcm_token: fcmToken,
          platform: 'android'
        }
      ).toPromise();

      console.log('✅ Registrado en backend');

    } catch (error) {
      console.error('❌ Error registrando:', error);
    }
  }

  async unregister(): Promise<void> {
    if (!this.deviceId || !Capacitor.isNativePlatform()) {
      return;
    }

    try {
      await this.http.delete(
        `${this.API_URL}/device-token?device_id=${this.deviceId}`
      ).toPromise();

      console.log('✅ Desregistrado');
      
      // Limpiar localStorage también
      localStorage.removeItem('device_unique_id');
      this.deviceId = null;

    } catch (error) {
      console.error('❌ Error desregistrando:', error);
    }
  }

  /**
   * Generar o recuperar device ID persistente
   */
  private getOrCreateDeviceId(userId: number): string {
    // Intentar obtener ID existente
    let persistentId = localStorage.getItem('device_unique_id');
    
    if (!persistentId) {
      // Crear uno nuevo que persista entre sesiones
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      persistentId = `user-${userId}-device-${timestamp}-${random}`;
      
      // Guardar para futuras sesiones
      localStorage.setItem('device_unique_id', persistentId);
      console.log('🆕 Nuevo device ID creado');
    } else {
      console.log('♻️ Device ID existente recuperado');
    }
    
    return persistentId;
  }
}