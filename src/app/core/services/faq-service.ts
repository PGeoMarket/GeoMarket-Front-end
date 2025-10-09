import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { Faq } from '../../features/consumidor/faq/faq';
import { Observable } from 'rxjs';


export interface FaqDTO{
   mensaje: string;
   user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class FaqService extends CrudService<FaqDTO> {
 protected override endpoint = 'support';

 constructor(http: HttpClient) {
    super(http);
  }
  
/*   createFaq(faqData: Omit<FaqDTO, 'id' | 'created_at'>): Observable<Faq> {
    return this.http.post<Faq>(`${this.API_URL}/${this.endpoint}`, faqData);
  } */
  
}
