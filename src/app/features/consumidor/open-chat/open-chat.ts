import { Component, Output, EventEmitter } from '@angular/core';
import { ChatDTO, ChatService, MessageDTO } from '../../../core/services/chat-service';
import { UserService } from '../../../core/services/user-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-open-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './open-chat.html',
  styleUrls: ['./open-chat.css']
})
export class OpenChat {
  @Output() closeChat = new EventEmitter<void>();

  messages$: Observable<MessageDTO[]>;
  currentChat$: Observable<ChatDTO | null>;
  connectionStatus$: Observable<string>;
  
  newMessageText: string = '';
  isSending: boolean = false;
  currentUserId: number;
  userRole?:string

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {
    this.messages$ = this.chatService.messages$;
    this.currentChat$ = this.chatService.currentChat$;
    this.connectionStatus$ = this.chatService.connectionStatus$;
    this.currentUserId = this.userService.getUserId();
    this.userRole=userService.getUserRole()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.messages$.subscribe(() => {
      setTimeout(() => this.scrollToBottom(), 50);
    });
  }

  scrollToBottom() {
    const container = document.getElementById('chatScroll');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  onClose() {
    this.chatService.disconnectFromCurrentChat();
    this.closeChat.emit();
  }

  sendMessage() {
    if (!this.newMessageText.trim() || this.isSending) {
      return;
    }

    this.isSending = true;
    const messageText = this.newMessageText.trim();

    this.chatService.sendMessage(messageText).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Mensaje enviado');
          this.newMessageText = '';
        }
        this.isSending = false;
      },
      error: (error) => {
        console.error('❌ Error al enviar mensaje:', error);
        alert('Error al enviar el mensaje');
        this.isSending = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  isMyMessage(message: MessageDTO): boolean {
    return message.sender_id === this.currentUserId;
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getSenderName(message: MessageDTO): string {
    if (!message.sender) return 'Usuario';
    return `${message.sender.primer_nombre} ${message.sender.primer_apellido}`;
  }

}
