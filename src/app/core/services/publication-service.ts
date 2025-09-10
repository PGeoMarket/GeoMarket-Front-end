import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud-service";
import { Injectable } from "@angular/core";


export interface PublicationDTO {
  id?: number;
  titulo: string;
  precio: number;
  descripcion?: string;
  visibilidad?: boolean;
  seller_id?: number;
  category_id?: number;
  image: ImageDTO;

}

export interface ImageDTO {
  id?:number;
  url:string;
  imageable_type:string;
  imageable_id:string;

}

@Injectable({
  providedIn: 'root'   // 👈 esto hace que Angular lo registre automáticamente
})

export class PublicationService extends CrudService<PublicationDTO> {
  protected override endpoint = 'publications';

  constructor(http: HttpClient) {
    super(http);
  }
}
