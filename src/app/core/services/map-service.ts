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
  protected override endpoint = 'coordinates'; // Cambié a coordinates

  constructor(http: HttpClient) {
    super(http);
  }

  // Guardar en localStorage para el register
  saveLocation(latitud: number, longitud: number) {
    const locationData = {
      latitud: latitud,
      longitud: longitud,
      direccion: 'Santander de Quilichao'
    };
    localStorage.setItem('userLocation', JSON.stringify(locationData));
  }

  // Obtener del localStorage
  getLocation() {
    const data = localStorage.getItem('userLocation');
    return data ? JSON.parse(data) : null;
  }
}