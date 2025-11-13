import { Component, OnInit } from '@angular/core';
import { OpenReporte } from "../open-reporte/open-reporte";
import { ReportDTO, ReportService } from '../../../core/services/report-service';
import { HttpClient } from '@angular/common/http';
import { PublicationDTO } from '../../../core/services/publication-service';
import { UserDTO } from '../../../core/services/user-service';

@Component({
  selector: 'app-report-management',
  imports: [OpenReporte],
  templateUrl: './report-management.html',
  styleUrls: ['./report-management.css']  // ✅ corregido (antes estaba mal escrito)
})
export class ReportManagement implements OnInit {

  ifOpen: boolean = false;
  selectedReport: ReportDTO | null = null;
  reports: ReportDTO[] = [];

  constructor(
    private reportService: ReportService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.reportService.getReportWithReportable().subscribe({
      next: (data) => {
        console.log('✅ Reportes cargados correctamente:', data.length);
        this.reports = data || [];
      },
      error: (err) => {
        console.error('❌ Error al cargar reportes:', err);
      }
    });
  }

  /** 
   * Devuelve un título legible según el tipo de reporte.
   * Se agregan validaciones para evitar errores cuando reportable es null.
   */
  getReportableTitle(report: ReportDTO): string {
    if (!report || !report.reportable_type || !report.reportable) {
      return '—'; // si no hay datos, muestra guion
    }

    if (report.reportable_type.includes('Publication')) {
      const publication = report.reportable as PublicationDTO;
      return publication?.titulo ?? '—';
    }

    if (report.reportable_type.includes('User')) {
      const user = report.reportable as UserDTO;
      return `${user?.primer_nombre ?? ''} ${user?.primer_apellido ?? ''}`.trim() || '—';
    }

    return '—';
  }

  /** 
   * Abre o cierra el reporte seleccionado 
   */
  openReport(report: ReportDTO) {
    if (this.selectedReport?.id === report.id && this.ifOpen) {
      // Si haces clic sobre el mismo reporte, cierra el panel
      this.ifOpen = false;
      this.selectedReport = null;
      return;
    }

    // Si haces clic en otro reporte, abre ese
    this.selectedReport = report;
    console.log('🟢 Report seleccionado:', this.selectedReport);
    this.ifOpen = true;
  }
}
