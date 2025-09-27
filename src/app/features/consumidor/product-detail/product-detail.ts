import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { PublicationDTO } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { Comments } from '../comments/comments';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserService } from '../../../core/services/user-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Comments],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit{

  @Input() publication_detail!: PublicationDTO | null;
  @Output() close = new EventEmitter<void>();
  seller_product_detail!: SellerDTO;

  private dialogManager = inject(DialogManager);

  constructor (private userService: UserService, private sellerService: SellerService) {}

  ngOnInit(): void {    
    this.sellerService.getByIdSeller(this.publication_detail?.seller_id!)
    .subscribe({
      next: data => this.seller_product_detail = data,
      error: error => console.error("No se pudo traer a seller", error),
      complete: () => console.log("Vendedor traido correctamente")
      
    })
    
  }

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

  /* onReport() {
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
  } */

    onReport(){
     if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', {
        data: { mode: 'create' }
      });

      return;
    }

     const user = this.userService.getCurrentUser();
    this.dialogManager.openDialog('report', {
      data: { publication_id: this.publication_detail?.id, user_id: user?.id },
      onClose: (res) => {
        console.log('cerrado con', res);
      }

    });

  }
}

