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

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserDTO> {

  protected override endpoint = 'users';

  // Estado reactivo del usuario actual
  private currentUserSubject = new BehaviorSubject<UserDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private favoritePublicationsSubject = new BehaviorSubject<boolean>(false);
  public favoritePublications$ = this.favoritePublicationsSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.loadUserFromStorage();
  }

  // Cargar usuario desde localStorage
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

    reloadFavoritePublications(reload_publication: boolean) {
    this.favoritePublicationsSubject.next(reload_publication);
  }

  // Guardar usuario
  saveUser(user: UserDTO): void {
    localStorage.setItem('user_data', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Limpiar datos del usuario
  clearUserData(): void {
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  // Obtener usuario actual
  getCurrentUser(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // Obtener rol del usuario
  getUserRole(): string {
    const user = this.getCurrentUser();
    return user?.role?.nombre || 'guest';
  }

  // Verificadores de rol
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isVendedor(): boolean {
    return this.getUserRole() === 'vendedor';
  }

  isConsumidor(): boolean {
    return this.getUserRole() === 'Consumidor';
  }

  // Obtener información actualizada del usuario desde el servidor
  getMe(): Observable<{ user: UserDTO }> {
    return this.http.get<{ user: UserDTO }>(`${this.API_URL}/me`)
      .pipe(
        tap(response => this.saveUser(response.user))
      );
  }

  getFavorites(): Observable<PublicationDTO[]> {
    const user = this.getCurrentUser();
    let userId = user?.id;

    return this.http.get<PublicationDTO[]>(`${this.API_URL}/${this.endpoint}/${userId}/favorites`)
  }

<<<<<<< HEAD
  changeFavorites(publication_id: number) {
    const user = this.getCurrentUser();
    let userId = user?.id;

    const formData = new FormData();

    if (publication_id) formData.append('publication_id', String(publication_id));
    formData.append('_method', 'PATCH');

    return this.http.post<any>(`${this.API_URL}/${this.endpoint}/${userId}/favorites/toggle`, formData);
  }

=======
  //se debe pasar a seller o publications
>>>>>>> f22a3f78a5f3c969e73c5ee944ab2b28205279cd
  getOwnPublications() {
    const user = this.getCurrentUser();
    let user_id = user?.id;
    console.log("id del usuario: " + user_id)
    //console.log(`${this.API_URL}/${this.endpoint}/${user_id}?included=seller.publications.image`);

    return this.http
      .get<any>(`${this.API_URL}/${this.endpoint}/${user_id}?included=seller.publications.image`)
      .pipe(
        map((response: any) => {
          // Asegura que siempre regrese un array
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

}