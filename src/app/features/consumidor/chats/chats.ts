import { Component } from '@angular/core';
import { OpenChat } from "../open-chat/open-chat";

@Component({
  selector: 'app-chats',
  imports: [OpenChat],
  templateUrl: './chats.html',
  styleUrl: './chats.css'
})
export class Chats {
repeat = Array.from({ length: 16 });

ifOpen : boolean= false;
}
