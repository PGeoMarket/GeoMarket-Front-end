import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSlidebar } from '../slidebars/admin-slidebar/admin-slidebar';
import { BuyerSlidebar } from '../slidebars/buyer-slidebar/buyer-slidebar';
import { GuestSlidebar } from '../slidebars/guest-slidebar/guest-slidebar';
import { SellerSlidebar } from '../slidebars/seller-slidebar/seller-slidebar';
import { Router, RouterLink } from '@angular/router';
import { UserService, SearchEntry } from '../../services/user-service';
import { LoginService } from '../../services/login-service';
import { FormsModule } from '@angular/forms';
import { PublicationService } from '../../services/publication-service';
import { Observable } from 'rxjs';
import { SearchHistory } from '../search-history/search-history';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SellerSlidebar, AdminSlidebar, BuyerSlidebar, GuestSlidebar, RouterLink, FormsModule, SearchHistory],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  // bind al input (si prefieres template-driven ya lo tenías)
  public searchText = '';

  // observable del historial (lo puedes usar en template con async)
  public searchHistory$: Observable<SearchEntry[]>;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private publicationService: PublicationService,
    private router: Router,
/*     private themeService: ThemeService, */
  ) {
    this.searchHistory$ = this.userService.searchHistory$;
  }

  open = false;

  toggleMenu() {
    this.open = !this.open;
  }

/*   toggleTheme() {
    this.themeService.toggleTheme();
  } */

  closeMenu() {
    this.open = false;
  }
  // Dentro de tu clase Header
showHistory = false;

onFocusSearch() {
  this.showHistory = true;
}

onBlurSearch() {
  // Pequeño retardo para permitir clics dentro del historial
  setTimeout(() => (this.showHistory = false), 200);
}


  // Getters para el rol (sin cambios)
  get role(): string { return this.userService.getUserRole(); }
  get isLoggedIn(): boolean { return this.userService.isLoggedIn(); }
  get isAdmin(): boolean { return this.userService.isAdmin(); }
  get isVendedor(): boolean { return this.userService.isVendedor(); }
  get isConsumidor(): boolean { return this.userService.isConsumidor(); }

  logout(): void {
    this.loginService.logout().subscribe({
      next: () => console.log('Logout exitoso'),
      error: () => {
        localStorage.clear();
        this.userService.clearUserData();
      }
    });
  }

  /**
   * Ejecuta la búsqueda: navega, envía filtro y guarda en historial (normalizado).
   * Llama a this.userService.addSearch(...) para persistir en localStorage.
   */
  searchPublicationByName(searchPublication: string) {
    const normalized = (searchPublication ?? '').trim();
    // guardar en historial solo si hay algo (puedes permitir guardar string vacío si quieres)
    if (normalized.length > 0) {
      this.userService.addSearch(normalized);
    }

    // navega a home (ya lo hacías)
    this.router.navigate(['/home']);

    // enviar filtro a PublicationService
    this.publicationService.sendFilter('&filter[titulo]=' + encodeURIComponent(normalized));

    console.log(this.userService.getSearchHistory());

  }

  borrarFiltros(event: MouseEvent) {
    this.publicationService.sendFilter('');
  }

  /**
   * Reutilizar una búsqueda desde el historial:
   *  - rellena el input, ejecuta la búsqueda y vuelve a guardar (actualiza timestamp).
   */
  useSearchFromHistory(entry: SearchEntry) {
    if (!entry) return;
    this.searchText = entry.query;
    this.searchPublicationByName(entry.query);
  }

  /**
   * Opcional: eliminar entrada del historial (si quieres exponer esto en la UI).
   */
  removeSearchFromHistory(entry: SearchEntry) {
    if (!entry) return;
    this.userService.removeSearch(entry.query);
  }

  /**
   * Opcional: limpiar todo el historial desde el header.
   */
  clearHistory() {
    this.userService.clearSearchHistory();
  }
}
