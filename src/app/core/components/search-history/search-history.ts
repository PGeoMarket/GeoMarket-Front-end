import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService, SearchEntry } from '../../services/user-service';
import { PublicationService } from '../../services/publication-service';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-history.html',
  styleUrls: ['./search-history.css']
})
export class SearchHistory {
  // Observable público desde UserService
  public history$: Observable<SearchEntry[]>;
  // controla si muestra todas las entradas o solo las últimas 5
  public showAll = false;

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private router: Router
  ) {
    this.history$ = this.userService.searchHistory$;
  }

  // usar una búsqueda seleccionada: guarda (actualiza timestamp), navega y aplica filtro
  use(entry: SearchEntry) {
    if (!entry) return;
    const q = entry.query ?? '';
    const normalized = q.trim();
    if (!normalized) return;
    // guardar en historial (sube al inicio)
    this.userService.addSearch(normalized);
    // navegar a home y aplicar filtro (mismo comportamiento que header)
    this.router.navigate(['/home']);
    this.publicationService.sendFilter('&filter[titulo]=' + encodeURIComponent(normalized));
  }

  // eliminar una búsqueda específica
  remove(entry: SearchEntry, event?: Event) {
    if (event) event.stopPropagation();
    this.userService.removeSearch(entry.query);
  }

  // borrar todo el historial
  clearAll(event?: Event) {
    if (event) event?.stopPropagation();
    this.userService.clearSearchHistory();
  }

  // toggle ver todas
  toggleShowAll(event?: Event) {
    if (event) event.stopPropagation();
    this.showAll = !this.showAll;
  }

  // helper para obtener el listado a mostrar (últimas 5 si showAll === false)
  slice(history: SearchEntry[]) {
    if (!history) return [];
    return this.showAll ? history : history.slice(0, 5);
  }
}
