import { Injectable } from '@angular/core';

export interface ReportDTO {
  id: number;
  user_id: number;
  reportable_id: number;
  reportable_type: string; // Ej: "App\\Models\\Publication" o "App\\Models\\User"
  reason_id: number;
  descripcion_adicional: string | null;
  estado: number; // 0 = pendiente, 1 = resuelto (o lo que hayas definido)
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
}
