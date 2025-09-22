import { Injectable } from '@angular/core';

export interface UserDTO {
  primer_nombre: string;
  segundo_nombre:string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  password_hash: string;
  role_id: number;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
}
