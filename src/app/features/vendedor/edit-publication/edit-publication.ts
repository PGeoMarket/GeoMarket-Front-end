import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule, NgStyle } from '@angular/common';
import { ProductDetail } from '../../consumidor/product-detail/product-detail';
import { UserService } from '../../../core/services/user-service';
import { EditProduct } from '../dialogs-seller/edit-product/edit-product';
import { Filters } from '../../consumidor/filters/filters';

@Component({
  selector: 'app-edit-publication',
  imports: [EditProduct, Closedialog, NgStyle, CommonModule, ProductDetail, Filters],
  templateUrl: './edit-publication.html',
  styleUrl: './edit-publication.css'
})
export class EditPublication implements OnInit {
  publications!: PublicationDTO[];
  selectedPublication!: PublicationDTO;
  publication_selected!: PublicationDTO | null;
  publications_temp!: PublicationDTO[];
  isAbierto: boolean = false;

  private dialogManager = inject(DialogManager);

  constructor(private publicationService: PublicationService, private userService: UserService) { }

  ngOnInit(): void {


    this.publicationService.filterChanged$
      .subscribe(filters => {
        this.loadCacheFiltredPublications(filters);
        return;

      });

    this.loadOwnPublications();
    this.publicationService.reload_publicationChanged$
      .subscribe(() => {
        this.loadOwnPublications();
        return;

      })
  }

  loadOwnPublications() {
    this.userService.getOwnPublications().subscribe({
      next: data => {
        this.publications = data;
        this.publications_temp = data; // AQUÍ ESTABA EL ERROR - FALTABA ESTA ASIGNACIÓN
      },
      error: error => console.error('No se pudo obtener las publicaciones: ' + error),
      complete: () => console.log('Publicaciones obtenidas correctamente')
    });

    /*     this.publicationService.getAllPublication().subscribe({
          next: data => this.publications = data,
          error: error => console.error('No se pudo obtener las publicaciones: ' + error),
          complete: () => console.log('Publicaciones obtenidas correctamente')
        }); */
  }

  onEditProduct(publication: PublicationDTO) {
    this.selectedPublication = publication;

    this.dialogManager.openDialog('edit-product', {
      data: { publication: this.selectedPublication },
      onClose: (res) => {
        console.log('cerrado con edit-product', res);
        this.loadOwnPublications();
      }
    });


  }

  onDeleteProduct(id: number) {
    this.closePublicationDetail();

    // 🔥 CONFIRMACIÓN ANTES DE ELIMINAR
    const confirmar = confirm("¿Seguro que deseas eliminar esta publicación?");
    if (!confirmar) return;

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


  //filtros
  loadCacheFiltredPublications(filters: string) {
    let filtrado: PublicationDTO[] = [];
    this.publications = filtrado;

    // Verificar si hay filtro de categoría Y NO hay filtro de título
    const hasCategoryFilter = filters.includes('&filter[category_id]=');
    const hasTitleFilter = filters.includes('&filter[titulo]=');
    const hasMinPriceFilter = filters.includes('&filter[precio_min]=');
    const hasMaxPriceFilter = filters.includes('&filter[precio_max]=');

    /* Para category */
    if (hasCategoryFilter && !hasTitleFilter) {
      let filters_split = filters.split("&filter[category_id]=");

      console.log(filters_split);

      this.publications_temp.forEach(pub => {
        filters_split.forEach(f => {
          if (f !== "") {
            const categoryId = f.split('&')[0];
            if (pub.category_id == Number(categoryId)) {
              filtrado.push(pub);
            }
          }
        });
      });

      this.publications = [...new Set(filtrado)];
      return;
    }

    /* Para precios */
    if ((hasMinPriceFilter || hasMaxPriceFilter) && !hasTitleFilter) {
      let min_price = 0;
      let max_price = Number.MAX_SAFE_INTEGER;

      if (hasMinPriceFilter) {
        const minMatch = filters.match(/&filter\[precio_min\]=(\d+)/);
        if (minMatch) min_price = parseInt(minMatch[1]);
      }

      if (hasMaxPriceFilter) {
        const maxMatch = filters.match(/&filter\[precio_max\]=(\d+)/);
        if (maxMatch) max_price = parseInt(maxMatch[1]);
      }

      console.log(`${min_price} > ${max_price}`);

      this.publications_temp.forEach(pub => {
        if (pub.precio! >= min_price && pub.precio! <= max_price) {
          filtrado.push(pub);
        }
      });

      this.publications = filtrado;
      return;
    }

    // Caso por defecto si no aplican los filtros anteriores
    this.publications = [...this.publications_temp];
  }

  //CHATGPT:
  editarIndex: number | null = null;


  abrirMenu(index: number, event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.editarIndex = this.editarIndex === index ? null : index;

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


  //Filtros
  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto = true;
  }

  cerrarMenus() {
    this.isAbierto = false;
  }
}
