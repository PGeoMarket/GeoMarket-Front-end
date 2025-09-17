import { Component, OnInit } from '@angular/core';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publications',
  imports: [CommonModule],
  templateUrl: './publications.html',
  styleUrl: './publications.css'
})
export class Publications implements OnInit {
  publications!: PublicationDTO[];
  scopeCategoryIds!: string;

  constructor (protected publicationService: PublicationService) {}
  
  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications () {
    this.publicationService.getAllPublication()
      .subscribe({
        next: data => this.publications = data,
        error: error => console.error('No se pudo obtener las publicaciones: ' + error),
        complete: () => console.log('Publicaciones obtenidas correctamente')
      });
  }

  loadFiltredPublications () {
    // si no hay scope definido, obtenemos todo
    if (!this.scopeCategoryIds) {
      this.loadPublications();
      return;
    }

    this.publicationService.getFilterPublication(this.scopeCategoryIds)
      .subscribe({
        next: data => this.publications = data,
        error: error => console.error('Error a publications filtradas: ' + error),
        complete: () => console.log('publications filtradas:')
      });
  }

  // <-- nuevo: recibe del hijo la scope y actualiza la lista
  onCategoryApplied(scope: string) {
    this.scopeCategoryIds = scope;
    this.loadFiltredPublications();
  }
}
