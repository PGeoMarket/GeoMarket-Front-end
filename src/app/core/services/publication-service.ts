import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud-service";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";

export interface PublicationDTO {
  id?: number;
  titulo: string;
  precio: number | null;
  descripcion?: string;
  visibilidad?: boolean;
  seller_id?: number;
  category_id?: number;
  image?: ImageDTO;
  imagen?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ImageDTO {
  id?: number;
  url: string;
  imageable_id?: string;
  imageable_type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicationService extends CrudService<PublicationDTO> {
  protected override endpoint = 'publications';
  
  // Subject para comunicar filtros
  private filterSubject = new Subject<string>();
  filterChanged$ = this.filterSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  getAllPublication(): Observable<PublicationDTO[]> {
    return this.http.get<PublicationDTO[]>(
      `${this.API_URL}/${this.endpoint}?included=image`);
  }

  getByIdPublication(id: number): Observable<PublicationDTO> {
    return this.http.get<PublicationDTO>(
      `${this.API_URL}/${this.endpoint}/${id}?included=image`);
  }

  getFilterPublication(filters: string): Observable<PublicationDTO[]> {
    return this.http.get<PublicationDTO[]>(
      `${this.API_URL}/${this.endpoint}?included=image${filters}`);
  }

  // Método para emitir filtros
  sendData(filters: string) {
    this.filterSubject.next(filters);
  }
}