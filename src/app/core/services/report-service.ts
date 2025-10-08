import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { PublicationDTO } from './publication-service';
import { Observable } from 'rxjs';
import { UserDTO } from './user-service';

export interface ReportDTO {
  id: number;
  user_id: number;
  reportable_id: number;
  reportable_type: string; // Ej: "App\\Models\\Publication" o "App\\Models\\User"
  reason_id: number;
  descripcion_adicional: string | null;
  estado: number;
  reportable?: UserDTO | PublicationDTO;
  reason?: ReasonDTO;
}
export interface ReasonDTO {
  id: number;
  motivo: string;
  applies_to: string; // "publication" | "user"
}

@Injectable({
  providedIn: 'root'
})
export class ReportService extends CrudService<ReportDTO>{

  protected override endpoint = 'reports';

  constructor(http: HttpClient) {
    super(http);
  } 
  
  getReportWithReportable():Observable<ReportDTO[]>{
    return this.http.get<ReportDTO[]>(`${this.API_URL}/${this.endpoint}?included=reason,reportable.image`)
  }

 
  reportPublication(publicationId: number, payload: any):Observable<any>{
    console.log(`${this.API_URL}/publications/${publicationId}/report`, payload);
    
    return this.http.post(`${this.API_URL}/publications/${publicationId}/report`, payload)
  }

  reportSeller(sellerId: number, payload: any):Observable<any> {
  return this.http.post(`${this.API_URL}/users/${sellerId}/report`, payload);
}

}
