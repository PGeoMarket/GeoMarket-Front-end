import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { CoordinateDTO } from './user-service';
import { ImageDTO } from './publication-service';
import { Observable } from 'rxjs';

export interface SellerDTO {

  id: number;
  user_id: number;
  nombre_tienda: string;
  descripcion?: string | null;
  activo: boolean;
  puntuacion_promedio: number;
  created_at: string;
  updated_at: string;

  coordinate: CoordinateDTO | null;

  image?: ImageDTO;

  phones: {
    id: number;
    numero_telefono: number;
    seller_id: number;
    created_at: string;
    updated_at: string;
  }[];
}


@Injectable({
  providedIn: 'root'
})
export class SellerService extends CrudService<SellerDTO> {

  protected override endpoint = 'sellers';

  constructor(http: HttpClient) {
    super(http);
  }

  getByIdSeller(id: number): Observable<SellerDTO> {
    return this.http.get<SellerDTO>(`${this.API_URL}/${this.endpoint}/${id}?included=image`);
  }

  

}
