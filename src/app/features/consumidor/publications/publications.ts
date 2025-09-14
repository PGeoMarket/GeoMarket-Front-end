import { Component, OnInit } from '@angular/core';
import { PublicationModel, PublicationService } from '../../../core/services/publication-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publications',
  imports: [CommonModule],
  templateUrl: './publications.html',
  styleUrl: './publications.css'
})
export class Publications implements OnInit{
  publications!: PublicationModel[];

  constructor (private publicationService: PublicationService) {}
  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications () {
  this.publicationService.getAllPublication()
  .subscribe({
    next: data => this.publications = data,
    error: error=> console.error('No se puedo obtener las publicaciones: ' + error),
    complete: () => console.log('Publicaciones obtenidas correctamente')    
    
  })
  }
}
