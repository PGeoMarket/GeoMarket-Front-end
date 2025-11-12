import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { ReportDTO } from '../../../core/services/report-service';
import { PublicationDTO } from '../../../core/services/publication-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';
import { DatePipe } from '@angular/common';
import { UserDTO } from '../../../core/services/user-service';

@Component({
  selector: 'app-open-reporte',
  standalone: true,
  imports: [Closedialog, DatePipe],
  templateUrl: './open-reporte.html',
  styleUrls: ['./open-reporte.css']
})
export class OpenReporte implements OnInit, OnDestroy {

  @Input() report: ReportDTO | null = null;

  reportedPublication: PublicationDTO | null = null;
  reportedSeller: SellerDTO | null = null;
  sellerData: SellerDTO | null = null; 
  sellerId: number | null = null;
  userSellerData: any | null = null;

  menuAbierto = false;
  menuBoton = false;

  private dialogManager = inject(DialogManager);
  private sellerService = inject(SellerService);

  private clickListener?: any;

  ngOnInit(): void {
    console.log('📄 Report recibido:', this.report);

    if (!this.report) return;

    const type = this.report.reportable_type ?? '';
    console.log('📘 Tipo reportable:', type);

    if (type.includes('Publication')) {
      this.reportedPublication = this.report.reportable as PublicationDTO;
      this.sellerId = this.reportedPublication?.seller?.id ?? null;
    }

    if (type.includes('Seller')) {
      this.reportedSeller = this.report.reportable as SellerDTO;
      this.sellerId = this.reportedSeller?.id ?? null;
    }

    if (this.sellerId) {
      this.loadSellerData(this.sellerId);
    } else {
      console.warn('⚠️ No se encontró el ID del seller reportado.');
    }

    // 🟢 Escucha global para cerrar menús si haces clic fuera
    this.clickListener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const dentroDeMenu =
        target.closest('.menu-boton') ||
        target.closest('.menu-general');

      if (!dentroDeMenu) {
        this.cerrarBoton();
        this.cerrarMenus();
      }
    };

    document.addEventListener('click', this.clickListener);

    console.log('📦 Report completo recibido:', JSON.stringify(this.report, null, 2));
  }

  ngOnDestroy(): void {
    // 🔴 Limpia el listener al destruir el componente
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  }

  // ✅ Cargar datos del seller y sus datos personales
  loadSellerData(id: number) {
    this.sellerService.getByIdSeller(id).subscribe({
      next: (data) => {
        this.sellerData = data;
        this.userSellerData = data.user;

        console.log('🟢 Datos completos del seller reportado:', this.sellerData);
        console.log('👤 Datos personales del usuario del seller:', this.userSellerData);
      },
      error: (err) => {
        console.error('❌ Error al cargar datos del seller:', err);
      }
    });
  }

  abrirMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuAbierto = true;
    this.cerrarBoton(); // cerrar el otro si está abierto
  }

  cerrarMenus() {
    this.menuAbierto = false;
  }

  abrirBoton(event: MouseEvent) {
    event.stopPropagation();
    this.menuBoton = true;
    this.cerrarMenus(); // cerrar el otro si está abierto
  }

  cerrarBoton() {
    this.menuBoton = false;
  }

  OnSuspender() {
    this.dialogManager.openDialog('reason', { data: { mode: 'create' } });
    // 🟢 Cerramos ambos menús al seleccionar una acción
    this.cerrarBoton();
    this.cerrarMenus();
  }
}
