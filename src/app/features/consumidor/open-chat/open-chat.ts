import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-open-chat',
  standalone: true,
  templateUrl: './open-chat.html',
  styleUrls: ['./open-chat.css']
})
export class OpenChat {
  @Output() closeChat = new EventEmitter<void>();

  onClose() {
    this.closeChat.emit();
  }
}