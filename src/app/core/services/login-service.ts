import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService, User } from './user-service';

export interface loginDTO {
  email: EmailValidator | string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService extends CrudService<loginDTO> {
  protected override endpoint = 'login';

  constructor(http: HttpClient, private userService: UserService) {
    super(http);
  }

  // Método login actualizado para Sanctum
  login(credentials: loginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.API_URL}/${this.endpoint}`,
      credentials
    ).pipe(
      tap(response => {
        // Guardar token
        localStorage.setItem('token', response.token);
        // Guardar usuario usando UserService
        this.userService.saveUser(response.user);
      })
    );
  }

  // Método logout
  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          this.userService.clearUserData();
        })
      );
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método original (mantener compatibilidad si lo necesitas)
  /* loginOld(credentials: loginDTO): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.API_URL}/${this.endpoint}`,
      credentials
    );
  } */
}