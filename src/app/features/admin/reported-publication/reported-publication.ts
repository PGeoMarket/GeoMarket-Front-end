import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  HostListener
} from '@angular/core';
import { PublicationDTO } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserService } from '../../../core/services/user-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';
import { Router, RouterLink } from '@angular/router';
import { ChatService } from '../../../core/services/chat-service';
import { Comments } from '../../consumidor/comments/comments';
import { MiniMap } from '../../consumidor/mini-map/mini-map';
import { PublicationService } from '../../../core/services/publication-service';

@Component({
  selector: 'reported-publication',
  standalone: true,
  imports: [CommonModule, Comments, RouterLink, MiniMap],
  templateUrl: './reported-publication.html',
  styleUrls: ['./reported-publication.css']
})
export class ReportedPublication implements OnInit {

  @Input() publication_detail!: PublicationDTO | null;
  @Output() close = new EventEmitter<void>();

  seller_product_detail!: SellerDTO;
  favorito!: boolean;

  menuAbierto = false; // menú principal
  menuBoton = false;   // menú del botón de 3 puntos

  private dialogManager = inject(DialogManager);
  private publicationService = inject(PublicationService);

  constructor(
    private userService: UserService,
    private sellerService: SellerService,
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.publicationsFavorite();

    if (this.publication_detail?.seller_id) {
      this.sellerService.getByIdSeller(this.publication_detail.seller_id).subscribe({
        next: data => this.seller_product_detail = data,
        error: err => console.error("No se pudo traer al seller", err)
      });
    }

    this.favorito = this.isFavorite();
  }

  /** ⭐ CIERRA TODOS LOS MENÚS AL HACER CLICK FUERA */
  @HostListener('document:click')
  closeMenusOnClickOutside() {
    this.menuAbierto = false;
    this.menuBoton = false;
  }

  /** ⭐ Evita que el menú se cierre inmediatamente */
  abrirMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuAbierto = true;
    this.cerrarBoton();
  }

  abrirBoton(event: MouseEvent) {
    event.stopPropagation();
    this.menuBoton = true;
    this.cerrarMenus();
  }

  cerrarMenus() {
    this.menuAbierto = false;
  }

  cerrarBoton() {
    this.menuBoton = false;
  }

  OnSuspender() {
    this.dialogManager.openDialog('reason', { data: { mode: 'create' } });
    this.cerrarBoton();
    this.cerrarMenus();
  }

  OnBloquear() {
    this.dialogManager.openDialog('reason', { data: { mode: 'create' } });
    this.cerrarBoton();
    this.cerrarMenus();
  }

  OnDelete() {
  if (!this.publication_detail?.id) return;

  const confirmar = confirm("¿Seguro que deseas eliminar esta publicación?");
  if (!confirmar) return;

  this.publicationService.delete(this.publication_detail.id).subscribe({
    next: () => {
      console.log("Publicación eliminada exitosamente.");

      // Cerrar menús
      this.cerrarMenus();
      this.cerrarBoton();

      // Cerrar el detalle de publicación
      this.removePublicationDetail();
    },
    error: (err) => {
      console.error("Error al eliminar la publicación:", err);
      alert("No se pudo eliminar la publicación.");
    }
  });
}

  removePublicationDetail() {
    this.close.emit();
  }

  changeFavoritePublication() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', { data: { mode: 'create' } });
      return;
    }

    this.userService.changeFavorites(this.publication_detail?.id!).subscribe();
    this.favorito = !this.favorito;
    this.userService.reloadFavoritePublications(true);
  }

  publicationsFavorite() {
    this.userService.getFavorites().subscribe({
      next: data => {
        this.favorito = data.some(p => p.id === this.publication_detail?.id);
      }
    });
  }

  isFavorite(): boolean {
    let favoritos: PublicationDTO[] = [];

    this.userService.getFavorites().subscribe({
      next: data => favoritos = data
    });

    return favoritos.some(pub => pub.id === this.publication_detail?.id);
  }

  onChat() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', { data: { mode: 'create' } });
      return;
    }

    this.chatService.createChatFromPublication(this.publication_detail!.id!)
      .subscribe({
        next: response => {
          if (response.success) {
            this.chatService.connectToChat(response.chat);
            this.router.navigate(['chats']);
          }
        }
      });
  }
}
