import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud-service";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";


export interface PublicationDTO {
  id?: number;
  titulo: string;
  precio: number;
  descripcion?: string;
  visibilidad?: boolean;
  seller_id?: number;
  category_id?: number;
  image: ImageDTO;                  // 👈 siempre requerido
  created_at?: string;
  updated_at?: string;
}

export interface ImageDTO {
  id?: number;
  url: string;
  imageable_id?: string;
  imageable_type?: string;
}

export interface PublicationModel {
  id?: number;
  title: string;
  price: number | null;                    // 👈 ya no null ni opcional
  description?: string;
  isVisible?: boolean;
  sellerId?: number;
  categoryId?: number;
  image: {                           // 👈 siempre requerido
    id?: number;
    url: string;
    type?: string;
  };
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PublicationService extends CrudService<PublicationModel, PublicationDTO> {
  protected override endpoint = 'publications';

  constructor(http: HttpClient) {
    super(http);
  }

  getAllPublication(): Observable<PublicationModel[]> {
    return this.http.get<PublicationDTO[]>(
      `${this.API_URL}/${this.endpoint}?included=image`
    ).pipe(
      map(dtos => dtos.map(dto => this.transformToModel(dto)))
    );
  }

  getByIdPublication(id: number): Observable<PublicationModel> {
    return this.http.get<PublicationDTO>(
      `${this.API_URL}/${this.endpoint}/${id}?included=image`
    ).pipe(
      map(dto => this.transformToModel(dto))
    );
  }

  createPublication(data: PublicationModel) {         // 👈 ya no Partial
    const dto = this.transformToDTO(data);
    return super.create(dto);
  }

  updatePublication(id: number, data: PublicationModel) { // 👈 ya no Partial
    const dto = this.transformToDTO(data);
    return super.update(id, dto);
  }

  private transformToModel(dto: PublicationDTO): PublicationModel {
    return {
      id: dto.id,
      title: dto.titulo,
      price: dto.precio,
      description: dto.descripcion,
      isVisible: dto.visibilidad,
      sellerId: dto.seller_id,
      categoryId: dto.category_id,
      image: {
        id: dto.image.id,
        url: dto.image.url
      },
      createdAt: dto.created_at ? new Date(dto.created_at) : undefined
    };
  }

  private transformToDTO(model: PublicationModel): PublicationDTO {
    return {
      id: model.id,
      titulo: model.title,
      precio: model.price!,
      descripcion: model.description,
      visibilidad: model.isVisible,
      seller_id: model.sellerId,
      category_id: model.categoryId,
      image: {
        url: model.image.url,
      }
    };
  }
}
