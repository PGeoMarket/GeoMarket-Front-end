import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';

export interface suspendMessageDTO {
  message?: string;
  suspended_until?: string;
  active?: boolean;
  days?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService extends CrudService<suspendMessageDTO> {

  protected override endpoint = 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  suspendedTemporary(suspendObject: suspendMessageDTO, user_id: number) {
    
    return this.http.post<any>(`${this.API_URL}/${this.endpoint}/${user_id}/suspend/temporary`, suspendObject);

  }

  suspendedPermanent(user_id: number) {
    return this.http.post<suspendMessageDTO>(`${this.API_URL}/${this.endpoint}/${user_id}/suspend/permanent`, 'ARREGLÁLO JUAN DIEGO');

  }

}
