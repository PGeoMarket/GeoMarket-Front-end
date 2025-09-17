import { Component, OnInit } from '@angular/core';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publications',
  imports: [CommonModule],
  templateUrl: './publications.html',
  styleUrl: './publications.css'
})
export class Publications implements OnInit {
  publications!: PublicationDTO[];
  scopes!: string;

  constructor (protected publicationService: PublicationService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
      this.route.queryParamMap.subscribe(queryParams => {
        const filtros = queryParams.get('filtros');
        if (filtros) console.log(filtros);
        
      });

      
    console.log(this.scopes);
    
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
    if (!this.scopes) {
      this.loadPublications();
      return;
    }

    this.publicationService.getFilterPublication(this.scopes)
      .subscribe({
        next: data => this.publications = data,
        error: error => console.error('Error a publications filtradas: ' + error),
        complete: () => console.log('publications filtradas:')
      });
  }


}
