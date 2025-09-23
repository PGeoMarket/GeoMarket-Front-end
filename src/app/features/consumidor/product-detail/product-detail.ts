import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PublicationDTO } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { Comments } from '../comments/comments';
import { DialogManager } from '../../../core/dialogs/dialog-manager';

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
    this.favorito = !this.favorito;

    //aqui api xd
  }

  onReporManagment() {
       this.dialogManager.openDialog('report', {
      data: { mode: 'create' }
    });
  }
}
