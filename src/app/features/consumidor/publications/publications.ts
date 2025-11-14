import { Component, Injectable, Input, OnInit } from '@angular/core';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { ProductDetail } from '../product-detail/product-detail';
import { UserService } from '../../../core/services/user-service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

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

    //Publicaciones con filtros, si no hay filtros simplemente se cargan todos
    this.publicationService.filterChanged$
      .subscribe(filters => {
        this.loadFiltredPublications(filters);
        return;
      });

    this.loadPublications();
  }

  loadPublications() {
    if (!this.isFrom_cache && !this.seller_id) {
      this.publicationService.getAllPublication()
        .subscribe({
          next: data => this.publications = data,
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

  loadFiltredPublications(filters: string) {
    // si no hay scope definido, obtenemos todo
    if (!filters) {
      this.loadPublications();
      return;
    }

    if (!this.isFrom_cache) {
      /* Para category */
      if (!!filters.indexOf('&filter[category_id]=') && !!filters.indexOf('&filter[titulo]=')) {
        this.publications = [];
        let filters_array: string[] = filters.split("&");

        filters_array.forEach(filter_array => {
          if (filter_array != '') {
            this.publicationService.getFilterPublication("&" + filter_array)
              .subscribe({
                next: data => { this.publications = [...this.publications, ...data] },
                error: error => console.error('Error a publications filtradas: ' + error),
                complete: () => console.log('publications filtradas:' + this.publications.length)
              });
          }
        });
        return;
      }

      /* Para precios */
      this.publicationService.getFilterPublication(filters)
        .subscribe({
          next: data => { this.publications = data },
          error: error => console.error('Error a publications filtradas: ' + error),
          complete: () => console.log('publications filtradas:' + this.publications.length)
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
        next: data => { 
          this.publications = data;
          this.publications_temp = data; // AQUÍ ESTABA EL ERROR - FALTABA ESTA ASIGNACIÓN
        },
        error: error => console.error('Error a publications filtradas: ' + error),
        complete: () => console.log('publications filtradas:' + this.publications.length)
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

  //Logica a de abrir product-detail
  open: boolean = false;

  private closeTimeout: any;

  openProductDetail(publication: PublicationDTO) {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }

    if (this.open) return this.closePublicationDetail();

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