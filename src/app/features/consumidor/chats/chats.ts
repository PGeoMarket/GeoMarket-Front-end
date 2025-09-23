import { Component } from '@angular/core';
import { OpenChat } from "../open-chat/open-chat";
import { Closedialog } from "../../../core/dialogs/closedialog";

@Component({
  selector: 'app-chats',
  imports: [OpenChat, Closedialog],
  templateUrl: './chats.html',
  styleUrl: './chats.css'
})
export class Chats {
repeat = Array.from({ length: 16 });

ifOpen : boolean= false;
}
