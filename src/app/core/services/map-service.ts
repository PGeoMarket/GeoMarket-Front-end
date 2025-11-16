import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud-service';
import { lastValueFrom } from 'rxjs';

export interface CoordinateMapServiceDTO {
  latitud: number;
  longitud: number;
  distancia?: number;
  direccion: string;
  coordinateable_id?: number;
  coordinateable_type?: string;
}

// Interface para la respuesta completa de OpenStreetMap
export interface OpenStreetMapResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: OpenStreetMapAddress;
  boundingbox: string[];
}

// Interface para el objeto address dentro de la respuesta
export interface OpenStreetMapAddress {
  town?: string;
  city?: string;
  village?: string;
  municipality?: string;
  state?: string;
  state_district?: string;
  region?: string;
  country: string;
  country_code: string;
  postcode?: string;
  'ISO3166-2-lvl4'?: string;
  // Otros campos que puedan aparecer
  [key: string]: any;
}

export interface ExtractedAddress {
  country: string;
  department: string;
  municipality: string;
  fullAddress: string;
  completeData: OpenStreetMapAddress;
}

@Injectable({
  providedIn: 'root'
})
export class MapService extends CrudService<CoordinateMapServiceDTO> {
  protected override endpoint = 'coordinates';

  constructor(http: HttpClient) {
    super(http);
  }

  // Solo métodos para API, sin localStorage

  async getAddressFromCoords(lat: number, lng: number): Promise<ExtractedAddress> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
    
    const data$ = this.http.get<OpenStreetMapResponse>(url);
    const data = await lastValueFrom(data$);
    
    return this.extractAddressComponents(data);
  }

  private extractAddressComponents(data: OpenStreetMapResponse): ExtractedAddress {
    const address: OpenStreetMapAddress = data.address;
    
    return {
      country: address.country || '',
      department: address.state || address.region || '',
      municipality: address.city || address.town || address.village || address.municipality || '',
      fullAddress: data.display_name,
      completeData: address
    };
  }
}