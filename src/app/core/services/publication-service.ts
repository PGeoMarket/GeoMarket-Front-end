import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud-service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface PublicationDTO {
  id?: number;
  titulo: string;
  precio: number | null;
  descripcion?: string;
  visibilidad?: boolean;
  seller_id?: number;
  category_id?: number;
  puntuacion_promedio?: number,
  image?: ImageDTO;
  imagen?: File;
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
  private filterSubject = new BehaviorSubject<string>('');
  private reload_publicationSubject = new BehaviorSubject<boolean>(false);
  filterChanged$ = this.filterSubject.asObservable();
  reload_publicationChanged$ = this.reload_publicationSubject.asObservable();

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

  getCommentsByIdPublication(id: number): Observable<PublicationDTO> {
    return this.http.get<PublicationDTO>(
      `${this.API_URL}/${this.endpoint}/${id}?included=comments`);
  }

  getFilterPublication(filters: string): Observable<PublicationDTO[]> {
    return this.http.get<PublicationDTO[]>(
      `${this.API_URL}/${this.endpoint}?included=image${filters}`);
  }

  override create(data: Partial<PublicationDTO>): Observable<PublicationDTO> {
    const formData = new FormData();

    // Campos obligatorios
    formData.append('titulo', data.titulo ?? '');
    formData.append('precio', data.precio != null ? data.precio.toString() : '');

    // Campos opcionales
    if (data.descripcion) formData.append('descripcion', data.descripcion);
    if (data.seller_id) formData.append('seller_id', data.seller_id.toString());
    if (data.category_id) formData.append('category_id', data.category_id.toString());
    if (data.imagen) formData.append('imagen', data.imagen);

    return this.http.post<PublicationDTO>(
      `${this.API_URL}/${this.endpoint}`,
      formData
    );
  }

override update(id: number, data: Partial<PublicationDTO>): Observable<PublicationDTO> {
  const formData = new FormData();

  // Campos obligatorios
  formData.append('titulo', data.titulo ?? '');
  formData.append('precio', data.precio != null ? data.precio.toString() : '');

  // Campos opcionales
  if (data.descripcion) formData.append('descripcion', data.descripcion);
  if (data.seller_id) formData.append('seller_id', data.seller_id.toString());
  if (data.category_id) formData.append('category_id', data.category_id.toString());
  if (data.imagen) formData.append('imagen', data.imagen);

  // <-- Método override necesario para multipart + "PUT"
  formData.append('_method', 'PUT');

  // Enviar como POST (Laravel interpretará _method=PUT)
  return this.http.post<PublicationDTO>(`${this.API_URL}/${this.endpoint}/${id}`, formData);
}


  // Método para emitir filtros
  sendFilter(filters: string) {
    this.filterSubject.next(filters);
  }

  reloadPublication(reload_publication: boolean) {
    this.reload_publicationSubject.next(reload_publication);
  }
}
