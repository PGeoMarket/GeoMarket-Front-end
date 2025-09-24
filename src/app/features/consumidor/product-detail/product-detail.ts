import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PublicationDTO } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { Comments } from '../comments/comments';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Comments],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  @Input() publication_detail!: PublicationDTO | null;
  @Output() close = new EventEmitter<void>();

  private dialogManager = inject(DialogManager);

  constructor (private userService: UserService) {}

  menuAbierto: boolean = false;
  abrirMenu(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    //this.editarIndex = this.editarIndex === index ? null : index;
    this.menuAbierto = true;
  }

  cerrarMenus() {
    this.menuAbierto = false;
  }

  favorito: boolean = false;
  removePublicationDetail() {
    this.close.emit(); // Emitir evento al padre  
    // NO modifiques this.publication_detail ni this.open aquí
  }

  changeFavoritePublication() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', {
        data: { mode: 'create' }
      });

      return;
    }

    //respectiva flotante/pantalla
    //aqui api xd
    this.favorito = !this.favorito;

  }

  onChat() {

    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', {
        data: { mode: 'create' }
      });

      return;
    }

    //logica del chat
  }

  onReport() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', {
        data: { mode: 'create' }
      });

      return;
    }

    //respectiva flotante/pantalla
    this.dialogManager.openDialog('report', {
      data: { mode: 'create' }
    });
  }
}

