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
    console.log(`${this.API_URL}/${this.endpoint}/${userId}/favorites`);

    return this.http.get<PublicationDTO[]>(`${this.API_URL}/${this.endpoint}/${userId}/favorites`)
  }

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

updateUser(id: number, data: Partial<UserDTO>): Observable<UserDTO> {
  const formData = new FormData();

  formData.append('primer_nombre', data.primer_nombre ?? '');
  formData.append('segundo_nombre', data.segundo_nombre ?? '');
  formData.append('primer_apellido', data.primer_apellido ?? '');
  formData.append('segundo_apellido', data.segundo_apellido ?? '');
  formData.append('email', data.email ?? '');

  if (data.role_id !== undefined && data.role_id !== null) {
    formData.append('role_id', data.role_id.toString());
  }

  formData.append('_method', 'PUT');

  return this.http.post<UserDTO>(
    `${this.API_URL}/${this.endpoint}/${id}`,
    formData
  ).pipe(
    tap(user => this.saveUser(user)) // 🔥 guarda en localStorage
  );
}

// Actualizar solo la imagen del usuario
updateUserImage(userId: number, file: File): Observable<UserDTO> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('_method', 'PUT');

  return this.http.post<UserDTO>(
    `${this.API_URL}/${this.endpoint}/${userId}`,
    formData
  ).pipe(
    tap(user => this.saveUser(user)) // 🔥 actualiza el usuario guardado
  );
}

}