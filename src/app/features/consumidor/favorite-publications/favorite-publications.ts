import { Component, inject, OnInit } from '@angular/core';
import { PublicationDTO } from '../../../core/services/publication-service';
import { UserService } from '../../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { ProductDetail } from '../product-detail/product-detail';
import { Filters } from '../filters/filters';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Publications } from '../publications/publications';


@Component({
  selector: 'app-favorite-publications',
  imports: [CommonModule, Publications, Filters],
  templateUrl: './favorite-publications.html',
  styleUrl: './favorite-publications.css'
})
export class FavoritePublications {
  publications!: PublicationDTO[];
  publication_selected!: PublicationDTO | null;
  isAbierto: boolean = false;


  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto = true;
  }

  cerrarMenus() {
    this.isAbierto = false;
  }

  open: boolean = false;

  private closeTimeout: any; // declara esto junto a las propiedades de la clase

  openProductDetail(publication: PublicationDTO) {
    // si hay un timeout de cierre pendiente, lo cancelamos (evita race conditions)
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }

    if (this.open) return this.closePublicationDetail();

    this.publication_selected = publication;
    this.open = true;
  }

  closePublicationDetail() {
    // iniciar la animación (cambia la clase)
    this.open = false;

    // esperar a que termine la transición CSS (Tailwind duration-300 = 300ms)
    // y entonces limpiar publication_selected para que el contenido se quite después de animar
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.closeTimeout = setTimeout(() => {
      this.publication_selected = null;
      this.closeTimeout = undefined;
    }, 300);

  }
}
