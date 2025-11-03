import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CrudService } from './crud-service';
import { ImageDTO, PublicationDTO } from './publication-service';
import { SellerDTO } from './seller-service';

export interface UserDTO {
  id: number;
  primer_nombre: string;
  segundo_nombre?: string | null;
  primer_apellido: string;
  segundo_apellido?: string | null;
  email?: string;
  role_id?: number;
  activo?: boolean;
  created_at?: string;
  updated_at?: string;
  role?: {
    id: number;
    nombre: string;
    created_at: string;
    updated_at: string;
  };
  seller?: SellerDTO;
  image?: ImageDTO | null;
  imagen?: File;
  coordinate?: CoordinateDTO | null;
  
}

export interface CoordinateDTO {
  id: number;
  created_at: string;
  updated_at: string;
  latitud: number;
  longitud: number;
  direccion: string;
  coordinateable_type: string;
  coordinateable_id: number;
}

export interface SearchEntry {
  query: string;
  at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserDTO> {

  protected override endpoint = 'users';

  private currentUserSubject = new BehaviorSubject<UserDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private favoritePublicationsSubject = new BehaviorSubject<boolean>(false);
  public favoritePublications$ = this.favoritePublicationsSubject.asObservable();

  private searchHistorySubject = new BehaviorSubject<SearchEntry[]>([]);
  public searchHistory$ = this.searchHistorySubject.asObservable();

  private readonly searchKeyBase = 'search_history_v1';

  constructor(http: HttpClient) {
    super(http);
    this.loadUserFromStorage();
    this.loadSearchHistoryFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.clearUserData();
      }
    }
  }

  private getSearchKey(): string {
    const user = this.currentUserSubject.value;
    const id = user?.id ?? 'guest';
    return `${this.searchKeyBase}_user_${id}`;
  }

  private loadSearchHistoryFromStorage(): void {
    try {
      const raw = localStorage.getItem(this.getSearchKey());
      const list = raw ? (JSON.parse(raw) as SearchEntry[]) : [];
      this.searchHistorySubject.next(list);
    } catch {
      this.searchHistorySubject.next([]);
    }
  }

  private saveSearchHistoryToStorage(list: SearchEntry[]) {
    try {
      localStorage.setItem(this.getSearchKey(), JSON.stringify(list));
      this.searchHistorySubject.next(list);
    } catch {
      // si falla el storage, mantenemos el estado en memoria
      this.searchHistorySubject.next(list);
    }
  }

  addSearch(query: string, max = 20): void {
    if (!query) return;
    const now = new Date().toISOString();
    const current = this.searchHistorySubject.value.slice();
    const existingIndex = current.findIndex(e => e.query === query);
    if (existingIndex !== -1) {
      current.splice(existingIndex, 1);
    }
    current.unshift({ query, at: now });
    if (current.length > max) current.splice(max);
    this.saveSearchHistoryToStorage(current);
  }

  getSearchHistory(): SearchEntry[] {
    return this.searchHistorySubject.value;
  }

  removeSearch(query: string): void {
    const current = this.searchHistorySubject.value.filter(e => e.query !== query);
    this.saveSearchHistoryToStorage(current);
  }

  clearSearchHistory(): void {
    this.saveSearchHistoryToStorage([]);
  }

  reloadFavoritePublications(reload_publication: boolean) {
    this.favoritePublicationsSubject.next(reload_publication);
  }

  saveUser(user: UserDTO): void {
    localStorage.setItem('user_data', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.loadSearchHistoryFromStorage();
  }

  clearUserData(): void {
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
    this.loadSearchHistoryFromStorage();
  }

  getCurrentUser(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    return user?.role?.nombre || 'guest';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isVendedor(): boolean {
    return this.getUserRole() === 'vendedor';
  }

  isConsumidor(): boolean {
    return this.getUserRole() === 'Consumidor';
  }

  getMe(): Observable<{ user: UserDTO }> {
    return this.http.get<{ user: UserDTO }>(`${this.API_URL}/me`)
      .pipe(
        tap(response => this.saveUser(response.user))
      );
  }

  getFavorites(): Observable<PublicationDTO[]> {
    const user = this.getCurrentUser();
    let userId = user?.id;
    return this.http.get<PublicationDTO[]>(`${this.API_URL}/${this.endpoint}/${userId}/favorites`);
  }

  changeFavorites(publication_id: number) {
    const user = this.getCurrentUser();
    let userId = user?.id;
    const formData = new FormData();
    if (publication_id) formData.append('publication_id', String(publication_id));
    formData.append('_method', 'PATCH');
    return this.http.post<any>(`${this.API_URL}/${this.endpoint}/${userId}/favorites/toggle`, formData);
  }

  getOwnPublications() {
    const user = this.getCurrentUser();
    let user_id = user?.id;
    return this.http
      .get<any>(`${this.API_URL}/${this.endpoint}/${user_id}?included=seller.publications.image`)
      .pipe(
        map((response: any) => {
          return response?.user?.seller?.publications ?? [];
        })
      );
  }

  getUserId(): number {
    const user = this.getCurrentUser();
    return user?.id ?? 1;
  }

  getUserImage(user_id: number) {
    return this.http.get<UserDTO>(`${this.API_URL}/${this.endpoint}/${user_id}?included=image`);
  }

  getSellerId(): number | null {
    const user = this.getCurrentUser();
    return user?.seller?.id ?? null;
  }

  override update(id: number, data: Partial<UserDTO>): Observable<UserDTO> {
    const formData = new FormData();
    formData.append('primer_nombre', data.primer_nombre ?? '');
    formData.append('segundo_nombre', data.segundo_nombre ?? '');
    formData.append('primer_apellido', data.primer_apellido ?? '');
    formData.append('segundo_apellido', data.segundo_apellido ?? '');
    formData.append('email', data.email ?? '');
    formData.append('imagen', data.imagen  ?? '');
    formData.append('_method', 'PUT');
    if (data.role_id !== undefined && data.role_id !== null) {
      formData.append('role_id', data.role_id.toString());
    }
    formData.append('_method', 'PUT');
    return this.http.post<UserDTO>(`${this.API_URL}/${this.endpoint}/${id}`, formData);
  }
}
