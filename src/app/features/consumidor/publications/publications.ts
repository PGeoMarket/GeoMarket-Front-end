import { Component, Injectable, Input, OnInit } from '@angular/core';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { ProductDetail } from '../product-detail/product-detail';
import { UserService } from '../../../core/services/user-service';
import { ActivatedRoute } from '@angular/router';

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
  @Input() isFrom_favorites: boolean = false;
  seller_id: number = 0;
  constructor(protected publicationService: PublicationService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.seller_id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.seller_id) {
      this.loadSellerPublications();

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

    this.loadPublications();

    this.publicationService.filterChanged$
      .subscribe(filters => {
        this.loadFiltredPublications(filters);
      });

  }

  loadPublications() {
    if (!this.isFrom_favorites&&!this.seller_id) {
      this.publicationService.getAllPublication()
        .subscribe({
          next: data => this.publications = data,
          error: error => console.error('No se pudo obtener las publicaciones: ' + error),
          complete: () => console.log('Publicaciones obtenidas correctamente')
        });
      return;
    }

    if (this.seller_id) {

    }

    this.userService.getFavorites().subscribe({
      next: data => {
            this.publications = data
            this.publications_temp = data
          },
      error: error => console.error('No se pudo obtener las publicaciones: ' + error),
      complete: () => console.log('Publicaciones obtenidas correctamente')
    });


  }

  loadFiltredPublications(filters: string) {
    // si no hay scope definido, obtenemos todo
    if (!filters) {
      this.loadPublications();
      return;
    }

    if (!this.isFrom_favorites) {
      this.publicationService.getFilterPublication(filters) // Usar el parámetro filters
        .subscribe({
          next: data => { this.publications = data },
          error: error => console.error('Error a publications filtradas: ' + error),
          complete: () => console.log('publications filtradas:' + this.publications.length)
        });
      return;
    }
    this.loadFavoriteFiltredPublications(filters);

  }

    loadSellerPublications() {
    // si no hay scope definido, obtenemos todo
    if (!this.seller_id) {
      this.loadPublications();
      return;
    }

      this.publicationService.getFilterPublication(`&filter[seller_id]=${this.seller_id}`) // Usar el parámetro filters
        .subscribe({
          next: data => { this.publications = data },
          error: error => console.error('Error a publications filtradas: ' + error),
          complete: () => console.log('publications filtradas:' + this.publications.length)
        });
      return;

  }

  loadFavoriteFiltredPublications(filters: string) {
    let filters_split = filters.split("&filter[category_id]="); //21 es la longitud de "&filter[seller_id]=" al inicio, para
    let filtrado: PublicationDTO[] = [];

    this.publications_temp.filter(pub => {
      filters_split.forEach(f => {
        if (f != "") {
          if (pub.category_id == Number(f)) {
            filtrado.push(pub);
          }
        }
      });

    });

    this.publications = filtrado;
  }

  //Logica a de abrir product-detail
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
