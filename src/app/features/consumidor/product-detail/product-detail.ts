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
  favorito!: boolean;

  private dialogManager = inject(DialogManager);

  constructor (private userService: UserService, private sellerService: SellerService) {}

  ngOnInit(): void {    

    this.publicationsFavorite()

    this.sellerService.getByIdSeller(this.publication_detail?.seller_id!)
    .subscribe({
      next: data => this.seller_product_detail = data,
      error: error => console.error("No se pudo traer a seller", error),
      complete: () => console.log("Vendedor traido correctamente")
      
    });

    this.favorito = this.isFavorite();
    console.log(this.favorito + " en ngOnInit");
    
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

    this.userService.changeFavorites(this.publication_detail?.id!)
    .subscribe({
      next: data=> console.log(data)
    });
    this.favorito = !this.favorito
    
    this.userService.reloadFavoritePublications(true);
    
  }

  publicationsFavorite () {
    this.userService.getFavorites()
    .subscribe({
      next: data => {
        data.forEach(p => {
          if (this.publication_detail!.id == p.id ) {
            this.favorito = true;
            return;
          }
        });
        
      }
    })
  }

  isFavorite(): boolean {
    let favoritos: PublicationDTO[] = [];
    console.log(this.favorito+ " antes de llamar a getFavorites");
    
    this.userService.getFavorites().subscribe({
      next: data => {
        favoritos = data;
      },
      error: error => console.error("No se pudo traer las favoritas", error),
      complete: () => console.log("Favoritas traidas correctamente")
    });
    if (favoritos.some(pub => pub.id === this.publication_detail?.id) ) {
      console.log(this.favorito + " dentro de isFavorite");
      
      return true;
    }
    console.log(this.favorito + " dentro de isFavorite");
    console.log(favoritos);
    
    return false;

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

