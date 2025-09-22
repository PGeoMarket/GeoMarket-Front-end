import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: number;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  email: string;
  role_id: number;
  activo: boolean;
  role: {
    id: number;
    nombre: string;
  };
  seller?: {
    id: number;
    nombre_tienda: string;
    descripcion?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/v1';
  
  // Estado reactivo del usuario actual
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
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
  saveUser(user: User): void {
    localStorage.setItem('user_data', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Limpiar datos del usuario
  clearUserData(): void {
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
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
    return this.getUserRole() === 'consumidor';
  }

  // Obtener información actualizada del usuario desde el servidor
  getMe(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/me`)
      .pipe(
        tap(response => this.saveUser(response.user))
      );
  }
}