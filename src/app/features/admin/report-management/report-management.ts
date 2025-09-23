import { Component } from '@angular/core';
import { OpenReporte } from "../open-reporte/open-reporte";

@Component({
  selector: 'app-report-management',
  imports: [OpenReporte],
  templateUrl: './report-management.html',
  styleUrl: './report-management.css'
})
export class ReportManagement {
repeat = Array.from({ length: 16 });

ifOpen : boolean= false;

}
