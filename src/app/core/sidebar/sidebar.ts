import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  role = 'invitado'; // Cambiar según login

get isInvitado() {
  return this.role === 'invitado';
}
get isVendedor() {
  return this.role === 'vendedor';
}

}
