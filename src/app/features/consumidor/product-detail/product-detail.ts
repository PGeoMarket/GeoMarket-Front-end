import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicationDTO } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { Comments } from '../comments/comments';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Comments],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

@Input() publication_detail!: PublicationDTO | null;
@Output() close = new EventEmitter<void>();

favorito: boolean =  false;
removePublicationDetail() {
  this.close.emit(); // Emitir evento al padre  
  // NO modifiques this.publication_detail ni this.open aquí
}

changeFavoritePublication() {
 this.favorito = !this.favorito;

 //aqui api xd
}
}
