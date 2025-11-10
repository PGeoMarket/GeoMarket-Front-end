import { Component, inject, Input, OnInit } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { ReportDTO } from '../../../core/services/report-service';
import { PublicationDTO } from '../../../core/services/publication-service';
import { UserDTO } from '../../../core/services/user-service';

@Component({
  selector: 'app-open-reporte',
  imports: [Closedialog],
  templateUrl: './open-reporte.html',
  styleUrl: './open-reporte.css'
})
export class OpenReporte implements OnInit {

  @Input() report: ReportDTO | null = null;

  // --- PROPIEDADES AGREGADAS para que el HTML funcione ---
  reportedPublication: PublicationDTO | null = null; // si el reporte es sobre una publicación
  reportedSeller: any | null = null;                // si el reporte es sobre un seller
  sellerUser: UserDTO | null = null;                // usuario dueño de la publicación / seller.user
  // -------------------------------------------------------

  menuAbierto: boolean = false;
  abrirMenu(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    //this.editarIndex = this.editarIndex === index ? null : index;
    this.menuAbierto = true;
  }

  cerrarMenus() {
    this.menuAbierto = false;
  }
  menuBoton: boolean = false;
  abrirBoton(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    //this.editarIndex = this.editarIndex === index ? null : index;
    this.menuBoton = true;
  }

  cerrarBoton() {
    this.menuBoton = false;
  }

  private dialogManager = inject(DialogManager);
  OnSuspender() {
    this.dialogManager.openDialog('reason', {
      data: { mode: 'create' }
    });
  }

  // -------------------------------------------------------
  // Inicialización: interpreta report.reportable según el tipo
  // -------------------------------------------------------
  ngOnInit(): void {
    if (!this.report) return;

    // Si es reporte a publicación
    if (this.report.reportable_type?.includes('Publication')) {
      // asigna publicación y su seller.user (si vienen incluidos en el payload)
      this.reportedPublication = this.report.reportable as PublicationDTO;
      // en tu API la publicación debería incluir seller -> seller.user
      // protegemos con ?. por si falta alguna parte
      // @ts-ignore
      this.sellerUser = (this.reportedPublication as any)?.seller?.user ?? null;
    }

    // Si es reporte a seller (vendedor)
    if (this.report.reportable_type?.includes('Seller')) {
      // el reportable es el seller
      // @ts-ignore
      this.reportedSeller = this.report.reportable;
      // seller trae user
      // @ts-ignore
      this.sellerUser = (this.reportedSeller as any)?.user ?? null;
    }
  }
}
