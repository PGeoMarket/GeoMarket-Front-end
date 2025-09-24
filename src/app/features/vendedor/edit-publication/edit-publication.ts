import { Component, inject, OnInit, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { EditProduct } from '../dialogs-seller/edit-product/edit-product';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule, NgStyle } from '@angular/common';
import { ProductDetail } from '../../consumidor/product-detail/product-detail';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-edit-publication',
  imports: [EditProduct, Closedialog, NgStyle, CommonModule, ProductDetail],
  templateUrl: './edit-publication.html',
  styleUrl: './edit-publication.css'
})
export class EditPublication implements OnInit {
  publications!: PublicationDTO[];
  selectedPublication!: PublicationDTO;
  publication_selected!: PublicationDTO | null;

  private dialogManager = inject(DialogManager);

  constructor(private publicationService: PublicationService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadOwnPublications();
    this.publicationService.reload_publicationChanged$
      .subscribe(() => {
        this.loadOwnPublications();
      })
  }

  loadOwnPublications() {
 /*    this.userService.getOwnPublications().subscribe({
      next: data => this.publications = data,
      error: error => console.error('No se pudo obtener las publicaciones: ' + error),
      complete: () => console.log('Publicaciones obtenidas correctamente')
    }); */

    this.publicationService.getAllPublication().subscribe({
      next: data => this.publications = data,
      error: error => console.error('No se pudo obtener las publicaciones: ' + error),
      complete: () => console.log('Publicaciones obtenidas correctamente')
    });

    console.log(this.publications);

  }

  onEditProduct(publication: PublicationDTO) {
    this.selectedPublication = publication;

    this.dialogManager.openDialog('edit-product', {
      data: { publication: this.selectedPublication },
      onClose: (res) => {
        console.log('cerrado con', res);
        this.loadOwnPublications();
      }
    });

  }

  onDeleteProduct(id: number) {
    this.publicationService.delete(id).subscribe({
      next: data => {
        console.log(data);
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        // opcional: mostrar mensaje de error
      }
    })
  }

  //CHATGPT:
  editarIndex: number | null = null;


  abrirMenu(index: number, event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.editarIndex = this.editarIndex === index ? null : index;

  }

  cerrarMenus() {
    this.editarIndex = null;
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
