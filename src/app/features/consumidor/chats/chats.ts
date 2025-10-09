import { Component } from '@angular/core';
import { OpenChat } from "../open-chat/open-chat";
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  imports: [OpenChat],
  templateUrl: './chats.html',
  styleUrl: './chats.css'
})
export class Chats {
repeat = Array.from({ length: 16 });

ifOpen : boolean= false;
 
constructor(private router:Router){}

 goBack() {
    this.router.navigate(['/']); // o la ruta que quieras
  }
}
