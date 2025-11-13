import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud-service';

export interface CoordinateDTO {
  latitud: number;
  longitud: number;
  direccion: string;
  coordinateable_id: number;
  coordinateable_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService extends CrudService<CoordinateDTO> {
  protected override endpoint = 'coordinates';

  constructor(http: HttpClient) {
    super(http);
  }

  // Solo métodos para API, sin localStorage
}