import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';


export interface loginDTO {
  email: EmailValidator | string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class logionService extends CrudService<loginDTO> {
  protected override endpoint = 'login';

  constructor(http: HttpClient) {
    super(http);
  }
}
