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

  user: UserBySellerDTO;

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

export interface UserBySellerDTO {
  primer_nombre: string;
  segundo_nombre?: string | null;
  primer_apellido: string;
  segundo_apellido?: string | null;
  image?: ImageDTO;

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
    return this.http.get<SellerDTO>(`${this.API_URL}/${this.endpoint}/${id}?included=image,user,user.image,coordinate,phones`);
  }

  updateSeller(sellerId: number, data: Partial<SellerDTO>): Observable<SellerDTO> {
    const formData = new FormData();

    if (data.nombre_tienda) formData.append('nombre_tienda', data.nombre_tienda);
    if (data.descripcion) formData.append('descripcion', data.descripcion);

    // Si tienes coordenadas
    if (data.coordinate?.direccion) {
      formData.append('direccion', data.coordinate.direccion);
    }
    if (data.coordinate?.latitud) {
      formData.append('latitud', data.coordinate.latitud.toString());
    }
    if (data.coordinate?.longitud) {
      formData.append('longitud', data.coordinate.longitud.toString());
    }

    formData.append('_method', 'PUT');

    return this.http.post<SellerDTO>(
      `${this.API_URL}/${this.endpoint}/${sellerId}`,
      formData
    );
  }
}
