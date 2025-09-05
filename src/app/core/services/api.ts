import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://api.geomarket.test/v1/publications';

  constructor(private http: HttpClient) {}

  // GET: listado
  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl);
  }

  // GET: detalle
  getPublication(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.baseUrl}/${id}`);
  }

  // POST: crear
  createPublication(data: Publication): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // PUT/PATCH: actualizar
  updatePublication(id: number, data: Publication): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // DELETE: eliminar
  deletePublication(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
