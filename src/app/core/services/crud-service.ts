import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// En tu archivo de interfaces
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T> {
  protected abstract endpoint: string;

  protected readonly API_URL = 'https://apigeomarket-production.up.railway.app/api'; // tu backend Laravel

  constructor(protected http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}/${this.endpoint}`);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${this.endpoint}/${id}`);
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(`${this.API_URL}/${this.endpoint}`, data);
  }

  update(id: number, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.endpoint}/${id}`);
  }
}

