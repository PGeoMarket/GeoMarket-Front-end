import { Component, inject, Input } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { ReportDTO } from '../../../core/services/report-service';

@Component({
  selector: 'app-open-reporte',
  imports: [Closedialog],
  templateUrl: './open-reporte.html',
  styleUrl: './open-reporte.css'
})
export class OpenReporte {

  @Input() report: ReportDTO | null = null;
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
}
