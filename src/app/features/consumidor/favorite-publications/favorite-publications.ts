import { Component } from '@angular/core';
import { PublicationDTO } from '../../../core/services/publication-service';

@Component({
  selector: 'app-favorite-publications',
  imports: [],
  templateUrl: './favorite-publications.html',
  styleUrl: './favorite-publications.css'
})
export class FavoritePublications {
publications!: PublicationDTO[];
repeat = Array.from({ length: 16 });
}
