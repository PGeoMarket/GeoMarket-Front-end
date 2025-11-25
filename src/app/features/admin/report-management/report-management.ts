import { Component, OnInit } from '@angular/core';
import { OpenReporte } from "../open-reporte/open-reporte";
import { ReportDTO, ReportService } from '../../../core/services/report-service';
import { HttpClient } from '@angular/common/http';
import { PublicationDTO } from '../../../core/services/publication-service';
import { UserDTO } from '../../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin-service';

@Component({
  selector: 'app-report-management',
  imports: [OpenReporte, CommonModule, FormsModule],
  templateUrl: './report-management.html',
  styleUrls: ['./report-management.css']
})
export class ReportManagement implements OnInit {

  ifOpen: boolean = false;
  selectedReport: ReportDTO | null = null;
  
  reports: ReportDTO[] = [];
  unsuspendUserId: number | null = null;

  constructor(
    private reportService: ReportService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.reportService.getReportWithReportable().subscribe({
      next: (data) => {
        this.reports = data || [];
      }
    });
  }

  getReportableTitle(report: ReportDTO): string {
    if (!report || !report.reportable_type || !report.reportable) return '—';

    if (report.reportable_type.includes('Publication')) {
      const pub = report.reportable as PublicationDTO;
      return pub?.titulo ?? '—';
    }

    if (report.reportable_type.includes('User')) {
      const user = report.reportable as UserDTO;
      return `${user?.primer_nombre ?? ''} ${user?.primer_apellido ?? ''}`.trim() || '—';
    }

    return '—';
  }

  openReport(report: ReportDTO) {
    if (this.selectedReport?.id === report.id && this.ifOpen) {
      this.ifOpen = false;
      this.selectedReport = null;
      return;
    }

    this.selectedReport = report;
    this.ifOpen = true;
  }

  unsuspendUser() {
    if (!this.unsuspendUserId) {
      alert("Ingresa un ID válido.");
      return;
    }

    const confirmar = confirm(`¿Quitar suspensión al usuario con ID ${this.unsuspendUserId}?`);
    if (!confirmar) return;

    this.adminService.unsuspendUser(this.unsuspendUserId).subscribe({
      next: (data) => {
        console.log("Suspensión removida:", data);
        alert("Suspensión eliminada correctamente.");
        this.unsuspendUserId = null;
      },
      error: (err) => {
        console.error("Error al quitar suspensión", err);
        alert("No se pudo quitar la suspensión.");
      }
    });
  }
}
