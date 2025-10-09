import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { EmailValidator } from '@angular/forms';

export interface RegisterDTO {
  //Consumidor
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: EmailValidator | string;
  password: string;
  password_confirmation: string;
  role_id?: number;

  //Vendedor
  nombre_tienda?: string;
  descripcion?: string;
  latitud?: number;
  longitud?: number;
  direccion?: string;
}


@Injectable({
  providedIn: 'root'
})
export class RegisterService extends CrudService<RegisterDTO> {
  protected override endpoint = 'register';
  
  private rol = new BehaviorSubject<string>('');
  rol_Changed$ = this.rol.asObservable();
  constructor(http: HttpClient) {
    super(http);
  }
  
  sendData(rol: string) {
    this.rol.next(rol);
  }
}
