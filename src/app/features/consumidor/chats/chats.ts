import { Component, HostListener } from '@angular/core';
import { OpenChat } from "../open-chat/open-chat";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatDTO, ChatService } from '../../../core/services/chat-service';
import { Observable } from 'rxjs';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-chats',
  imports: [OpenChat, CommonModule],
  templateUrl: './chats.html',
  styleUrl: './chats.css'
})
export class Chats {
  chatsList$: Observable<ChatDTO[]>;
  ifOpen: boolean = false;
  private windowWidth: number = 0;
  userRole?:string

  constructor(
    private router: Router,
    private chatService: ChatService,
    private userService: UserService
  ) {
    this.windowWidth = window.innerWidth;
    this.chatsList$ = this.chatService.chatsList$;
    this.userRole=userService.getUserRole()
  }

  


  ngOnInit(): void {
    // Cargar lista de chats al iniciar
    this.chatService.loadChatsList();
    
    // Si hay un chat ya conectado, abrirlo
    const currentChat = this.chatService.getCurrentChat();
    if (currentChat) {
      this.ifOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  isMobile(): boolean {
    return this.windowWidth < 768;
  }

  openChat(chat: ChatDTO) {
    // Conectar a este chat
    this.chatService.connectToChat(chat);
    this.ifOpen = true;
  }

  closeChat() {
    this.ifOpen = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}