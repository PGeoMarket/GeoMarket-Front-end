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
  styleUrl: './report-management.css'
})
export class ReportManagement implements OnInit{

  ifOpen : boolean= false;
  selectedReport: ReportDTO | null = null;
  reports?:ReportDTO[]

  constructor(private reportService:ReportService,private http:HttpClient){}

  ngOnInit(): void {
      this.reportService.getReportWithReportable().subscribe({
        next:data=>{console.log('reportes ok',data.length);
          this.reports=data;
        },
        error:err=>{console.log('reportes no',err);
        }
      })
  }

  getReportableTitle(report: ReportDTO): string {
  if (report.reportable_type.includes('Publication')) {
    return (report.reportable as PublicationDTO).titulo;
  }
  if (report.reportable_type.includes('User')) {
    const user = report.reportable as UserDTO;
    return `${user.primer_nombre} ${user.primer_apellido}`;
  }
  return '';
}

  openReport(report: ReportDTO) {
    // Si clickeas el mismo reporte, cierra
    if (this.selectedReport?.id === report.id && this.ifOpen) {
      this.ifOpen = false;
      this.selectedReport = null;
      return;
    }
    
    // Si clickeas otro reporte, abre ese
    this.selectedReport = report;
    console.log(this.selectedReport);
    
    this.ifOpen = true;
  }

}
