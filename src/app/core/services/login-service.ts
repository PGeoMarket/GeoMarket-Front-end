import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface loginDTO {
  email: EmailValidator | string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class LoginService extends CrudService<loginDTO> {
  protected override endpoint = 'login';
  
  
  constructor(http: HttpClient) {
    super(http);
  }

  login(credentials: loginDTO): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.API_URL}/${this.endpoint}`,
      credentials
    );
  }
}
