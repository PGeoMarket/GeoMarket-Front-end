import { Component, Injectable, Input, OnInit } from '@angular/core';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { ProductDetail } from '../product-detail/product-detail';
import { UserService } from '../../../core/services/user-service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CoordinateMapServiceDTO } from '../../../core/services/map-service';
import { PaginatedResponse } from '../../../core/services/crud-service';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, ProductDetail],
  templateUrl: './publications.html',
  styleUrl: './publications.css'
})

@Injectable({ providedIn: 'root' })
export class Publications implements OnInit {
  publications!: PublicationDTO[];
  publications_temp!: PublicationDTO[];
  publication_selected!: PublicationDTO | null;

  //Paginacion
  currentPage: number = 1;
  totalPages: number = 1;
  // Variables para guardar el estado de filtros
  private currentFilters: string = '';
  private currentCoordinate: CoordinateMapServiceDTO | null = null;
  private currentLoadType: 'normal' | 'filtered' | 'location' = 'normal';

  @Input() isFrom_cache: boolean = false;
  seller_id: number = 0;
  constructor(protected publicationService: PublicationService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.seller_id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.seller_id) {
      this.loadSellerPublications();
      if (this.isFrom_cache) {
        this.publicationService.filterChanged$
          .subscribe(filters => {
            this.loadCacheFiltredPublications(filters);
          });
      }
      return;
    }

    //Recargar publicaciones
    this.publicationService.reload_publicationChanged$
      .subscribe((isReload_publication) => {
        if (isReload_publication) {
          this.loadPublications();
          return;
        }
      })

    //Publicaciones con filtros - agregar reset a página 1
    this.publicationService.filterChanged$
      .subscribe(filters => {
        this.loadFiltredPublications(filters, 1); // ✅ Agregar página 1 aquí
        return;
      });

    this.loadPublications();

    //Publicaciones por ubicación - agregar reset a página 1
    this.publicationService.filter_locationChanged$
      .subscribe(coordinate => {
        this.loadLocationPublications(coordinate, 1) // ✅ Agregar página 1 aquí
        return;
      });
  }



  loadPublications(page: number = 1) {
    if (!this.isFrom_cache && !this.seller_id) {
      this.publicationService.getAllPublication(page).subscribe({
        next: (response: PaginatedResponse<PublicationDTO>) => {
          this.publications = response.data; // ✅ response.data (el array)
          this.totalPages = response.last_page; // ✅ response.last_page
          this.currentPage = response.current_page;
        }, // ✅ response.current_page
        error: error => console.error('No se pudo obtener las publicaciones: ' + error),
        complete: () => console.log('Publicaciones obtenidas correctamente')
      });
      return;
    }

    if (this.seller_id) {
      // Este caso ya se maneja en loadSellerPublications
      return;
    }

    this.userService.getFavorites().subscribe({
      next: data => {
        this.publications = data
        this.publications_temp = data
      },
      error: error => console.error('No se pudo obtener las publicaciones: ' + error),
      complete: () => console.log('Publicaciones obtenidas correctamente')
    });
  }

  loadFiltredPublications(filters: string, page: number = 1) {
    // si no hay scope definido, obtenemos todo
    if (!filters) {
      this.loadPublications();
      return;
    }

    // Guardar estado
    this.currentFilters = filters;
    this.currentLoadType = 'filtered';
    this.currentPage = page; // Usar la página que viene como parámetro

    if (!this.isFrom_cache) {
      this.publicationService.getFilterPublication(filters, page) // ✅ Agregar page aquí
        .subscribe({
          next: (response: PaginatedResponse<PublicationDTO>) => {
            this.publications = response.data;
            this.totalPages = response.last_page;
            this.currentPage = response.current_page;
          },
          error: error => console.error('Error:', error)
        });
    } else {
      this.loadCacheFiltredPublications(filters);
    }
  }

  loadSellerPublications() {
    // si no hay scope definido, obtenemos todo
    if (!this.seller_id) {
      this.loadPublications();
      return;
    }

    this.publicationService.getFilterPublication(`&filter[seller_id]=${this.seller_id}`)
      .subscribe({
        next: (response: PaginatedResponse<PublicationDTO>) => {
          this.publications = response.data; // ✅ response.data
          this.totalPages = response.last_page; // ✅ response.last_page
        },
        error: error => console.error('Error:', error)
      });
    return;
  }

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

  // En loadLocationPublications
  loadLocationPublications(coordinate: CoordinateMapServiceDTO, page: number = 1) {
    // Guardar estado
    this.currentCoordinate = coordinate;
    this.currentLoadType = 'location';
    this.currentPage = page; // Usar la página que viene como parámetro

    if (!this.isFrom_cache) {
      this.publicationService.getPublicationsByLocation(coordinate, page) // ✅ Agregar page aquí
        .subscribe({
          next: (response: PaginatedResponse<PublicationDTO>) => {
            this.publications = response.data;
            this.totalPages = response.last_page;
            this.currentPage = response.current_page;
          },
          error: error => console.error('Error:', error)
        });
    } else {
      this.userService.getFavoritesByLocation(coordinate)
        .subscribe({
          next: data => {
            this.publications = data;
          },
          error: error => console.error('Error:', error)
        });
    }
  }


  //Paginacion
  //Paginacion - Método para cambiar página
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    // Usar el estado guardado para determinar qué cargar
    switch (this.currentLoadType) {
      case 'filtered':
        this.loadFiltredPublications(this.currentFilters, page); // ✅ Usar el método principal
        break;
      case 'location':
        if (this.currentCoordinate) {
          this.loadLocationPublications(this.currentCoordinate, page); // ✅ Usar el método principal
        }
        break;
      default:
        this.loadPublications(page);
        break;
    }
  }

  //Logica a de abrir product-detail
  open: boolean = false;

  private closeTimeout: any;

  openProductDetail(publication: PublicationDTO) {
    if (this.open) return this.closePublicationDetail(); //ya no cierra al dar click a otra publicacion

    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }

    this.publication_selected = publication;
    this.open = true;
  }

  closePublicationDetail() {
    this.open = false;

    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.closeTimeout = setTimeout(() => {
      this.publication_selected = null;
      this.closeTimeout = undefined;
    }, 300);
  }
}
