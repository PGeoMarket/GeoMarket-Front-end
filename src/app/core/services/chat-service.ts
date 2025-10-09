import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import * as Ably from 'ably';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ChatDTO {
  id: number;
  initiator_user_id: number;
  responder_user_id: number;
  publication_id: number;
  ably_channel_id: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  
  // Relaciones
  initiator?: {
    id: number;
    primer_nombre: string;
    primer_apellido: string;
  };
  responder?: {
    id: number;
    primer_nombre: string;
    primer_apellido: string;
  };
  publication?: {
    id: number;
    titulo: string;
  };
  other_participant?: {
    id: number;
    primer_nombre: string;
    primer_apellido: string;
  };
  other_participant_name?: string;
  other_participant_image_url?: string;
  publication_image_url?: string;
}

export interface MessageDTO {
  id?: number;
  chat_id: number;
  sender_id: number;
  text: string;
  message_type: string;
  sent_at: string;
  created_at?: string;
  updated_at?: string;
  
  // Relación
  sender?: {
    id: number;
    primer_nombre: string;
    primer_apellido: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatService extends CrudService<ChatDTO>{

  protected override endpoint = 'chats';

  private ably!: Ably.Realtime;
  private currentChannel: Ably.RealtimeChannel | null = null;

  private messagesSubject = new BehaviorSubject<MessageDTO[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  // Estado de conexión
  private connectionStatusSubject = new BehaviorSubject<string>('disconnected');
  public connectionStatus$ = this.connectionStatusSubject.asObservable();
  
  // Chat actual activo
  private currentChatSubject = new BehaviorSubject<ChatDTO | null>(null);
  public currentChat$ = this.currentChatSubject.asObservable();
  
  // Lista de todos los chats
  private chatsListSubject = new BehaviorSubject<ChatDTO[]>([]);
  public chatsList$ = this.chatsListSubject.asObservable();

  constructor(http:HttpClient) {
    super(http);
    this.initializeAbly()
  }

  // ==============================================
  // CONFIGURACIÓN DE ABLY
  // ==============================================
  
  private initializeAbly() {
    this.ably = new Ably.Realtime({
      key: 'gcafIA.bc4D1g:CMI8hVOsKfbcOkBXJDcX7xf9_FYafqxBIoo_wvXpuNk'
    });

    this.ably.connection.on('connected', () => {
      console.log('✅ Conectado a Ably');
      this.connectionStatusSubject.next('connected');
    });

    this.ably.connection.on('disconnected', () => {
      console.log('❌ Desconectado de Ably');
      this.connectionStatusSubject.next('disconnected');
    });

    this.ably.connection.on('failed', () => {
      console.log('💥 Falló conexión a Ably');
      this.connectionStatusSubject.next('failed');
    });
  }

  createChatFromPublication(publicationId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/chats/from-publication`, {
      publication_id: publicationId
    });
  }

  /**
   * Obtener todos mis chats
   */
  getMyChats(): Observable<any> {
    return this.http.get(`${this.API_URL}/chats`);
  }

  loadChatsList(): void {
    this.getMyChats().subscribe({
      next: (response) => {
        if (response.success) {
          console.log(response.chats);
          
          this.chatsListSubject.next(response.chats);
        }
      },
      error: (error) => {
        console.error('Error al cargar chats:', error);
      }
    });
  }

  /**
   * Obtener mensajes de un chat
   */
  getChatMessages(chatId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/chats/${chatId}/messages`);
  }

  /**
   * Enviar mensaje al backend
   */
  private sendMessageToBackend(chatId: number, text: string): Observable<any> {
    return this.http.post(`${this.API_URL}/chats/${chatId}/messages`, {
      text: text
    });
  }

  // ==============================================
  // TIEMPO REAL CON ABLY
  // ==============================================

  /**
   * Conectar a un canal de chat para tiempo real
   */
  connectToChat(chat: ChatDTO): void {
    // Desconectar del canal anterior si existe
    if (this.currentChannel) {
      this.disconnectFromCurrentChat();
    }

    // Guardar chat actual
    this.currentChatSubject.next(chat);

    // Conectar al canal de Ably
    this.currentChannel = this.ably.channels.get(chat.ably_channel_id);
    
    // Limpiar mensajes anteriores
    this.messagesSubject.next([]);

    // Escuchar mensajes nuevos en tiempo real
    this.currentChannel.subscribe('new-message', (message) => {
      console.log('📨 Mensaje recibido via Ably:', message.data);
      this.addMessageToList(message.data);
    });

    // Cargar mensajes existentes
    this.loadChatMessages(chat.id);

    console.log(`🔗 Conectado al canal: ${chat.ably_channel_id}`);
  }

  /**
   * Enviar mensaje en tiempo real (via Ably)
   */
  private sendRealtimeMessage(messageData: MessageDTO): void {
    if (this.currentChannel) {
      this.currentChannel.publish('new-message', messageData);
      console.log('📤 Mensaje enviado via Ably:', messageData);
    }
  }


  disconnectFromCurrentChat(): void {
    if (this.currentChannel) {
      this.currentChannel.unsubscribe();
      this.currentChannel.detach();
      this.currentChannel = null;
      console.log('🔌 Desconectado del chat');
    }
    this.currentChatSubject.next(null);
    this.messagesSubject.next([]);
  }

  private loadChatMessages(chatId: number): void {
    this.getChatMessages(chatId).subscribe({
      next: (response) => {
        if (response.success) {
          this.messagesSubject.next(response.messages);
          console.log(`📚 Cargados ${response.messages.length} mensajes`);
        }
      },
      error: (error) => {
        console.error('Error al cargar mensajes:', error);
      }
    });
  }

  private addMessageToList(message: MessageDTO): void {
    const currentMessages = this.messagesSubject.value;
    
    // Evitar duplicados
    if (!currentMessages.find(m => m.id === message.id)) {
      this.messagesSubject.next([...currentMessages, message]);
    }
  }

  /**
   * Enviar mensaje completo (Backend + Tiempo Real)
   */
  sendMessage(text: string): Observable<any> {
    const currentChat = this.currentChatSubject.value;
    
    if (!currentChat) {
      throw new Error('No hay chat activo');
    }

    return new Observable(observer => {
      this.sendMessageToBackend(currentChat.id, text).subscribe({
        next: (response) => {
          if (response.success) {
            // Publicar en Ably para tiempo real
            this.sendRealtimeMessage(response.message);
            observer.next(response);
            observer.complete();
          }
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  getCurrentChat(): ChatDTO | null {
    return this.currentChatSubject.value;
  }

  /**
   * Limpiar al destruir
   */
  ngOnDestroy(): void {
    this.disconnectFromCurrentChat();
    if (this.ably) {
      this.ably.close();
    }
  }
  
}
