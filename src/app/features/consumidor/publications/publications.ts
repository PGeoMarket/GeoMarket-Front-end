import { Component, Injectable, OnInit } from '@angular/core';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDetail } from '../product-detail/product-detail';

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
  publication_selected!:PublicationDTO | null;
  constructor(protected publicationService: PublicationService) { }

  ngOnInit(): void {

    this.loadPublications();

    this.publicationService.filterChanged$
    .subscribe(filters => {
      this.loadFiltredPublications(filters);
    });
  }

  loadPublications() {
    this.publicationService.getAllPublication()
      .subscribe({
        next: data => this.publications = data,
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

    this.publicationService.getFilterPublication(filters) // Usar el parámetro filters
      .subscribe({
        next: data => { this.publications = data },
        error: error => console.error('Error a publications filtradas: ' + error),
        complete: () => console.log('publications filtradas:' + this.publications.length)
      });
  }


  //Logica a de abrir product-detail
  open: boolean = false;

  openProductDetail(publication: PublicationDTO) {
    this.publication_selected = publication;
    this.open = !this.open;
    
  }

  closePublicationDetail() {
    this.open = false;
  }

 

}
