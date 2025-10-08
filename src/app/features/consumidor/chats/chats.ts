import { Component, HostListener } from '@angular/core';
import { OpenChat } from "../open-chat/open-chat";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chats',
  imports: [OpenChat, CommonModule],
  templateUrl: './chats.html',
  styleUrl: './chats.css'
})
export class Chats {
  repeat = Array.from({ length: 16 });
  ifOpen: boolean = false;
  private windowWidth: number = 0;

  constructor(private router: Router) {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  isMobile(): boolean {
    return this.windowWidth < 768; // md breakpoint de Tailwind
  }

  openChat() {
    this.ifOpen = true;
  }

  closeChat() {
    this.ifOpen = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}