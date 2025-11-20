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
  styleUrls: ['./report-management.css']
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
}
