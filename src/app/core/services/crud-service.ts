import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<TModel, TDTO = TModel> {
  protected abstract endpoint: string;
  protected readonly API_URL = 'http://api.geomarket.test/v1';

  constructor(protected http: HttpClient) {}

  // Métodos base que trabajan con DTOs
  getAll(): Observable<TDTO[]> {
    return this.http.get<TDTO[]>(`${this.API_URL}/${this.endpoint}`);
  }

  getById(id: number): Observable<TDTO> {
    return this.http.get<TDTO>(`${this.API_URL}/${this.endpoint}/${id}`);
  }

  create(data: Partial<TDTO>): Observable<TDTO> {
    return this.http.post<TDTO>(`${this.API_URL}/${this.endpoint}`, data);
  }

  update(id: number, data: Partial<TDTO>): Observable<TDTO> {
    return this.http.put<TDTO>(`${this.API_URL}/${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.endpoint}/${id}`);
  }
}

