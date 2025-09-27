import { Component, Input, OnInit } from '@angular/core';
import { Closedialog } from "../../../../core/dialogs/closedialog";
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../core/services/report-service';

@Component({
  selector: 'app-report',
  imports: [Closedialog, FormsModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class Report implements OnInit {
 
  @Input() publication_id!: number;
  @Input() user_id!: number;

  reason_id: number | null = null;
  descripcion_adicional: string = "";

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    console.log("publication_id:", this.publication_id);
    console.log("user_id:", this.user_id);
  }

 onSubmit(): void {
  if (!this.reason_id) {
    alert("Debes seleccionar un motivo");
    return;
  }

  const payload = {
    reason_id: this.reason_id,
    descripcion_adicional: this.reason_id === 9 ? this.descripcion_adicional : null,
    user_id: this.user_id
  };

  console.log("Payload que se envía:", payload);

  this.reportService.reportPublication(this.publication_id, payload).subscribe({
  next: res => {
    console.log("Reporte enviado:", res);
    alert("Reporte enviado con éxito ✅");
  },
  error: err => {
    console.error("Error al enviar reporte:", err);
    alert("Hubo un error al enviar el reporte ❌");
  }
});
}
}