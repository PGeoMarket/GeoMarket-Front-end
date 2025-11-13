import { Component, inject, Input, OnInit } from '@angular/core';
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
export class OpenReporte implements OnInit {

  @Input() report: ReportDTO | null = null;

  reportedPublication: PublicationDTO | null = null;
  reportedSeller: SellerDTO | null = null;
  reportedUser: UserDTO | null = null;

  sellerData: SellerDTO | null = null; 
  sellerId: number | null = null;
  userSellerData: any | null = null;

  menuAbierto = false;
  menuBoton = false;

  mostrarPaneles = false;
  mostrarPanelUsuario = false;

  private dialogManager = inject(DialogManager);
  private sellerService = inject(SellerService);

  ngOnInit(): void {
    console.log('📄 Report recibido:', this.report);
    if (!this.report) return;

    const type = this.report.reportable_type ?? '';
    console.log('📘 Tipo reportable:', type);

    if (type.includes('Publication')) {
      this.reportedPublication = this.report.reportable as PublicationDTO;
      this.sellerId = this.reportedPublication?.seller?.id ?? null;
      this.mostrarPaneles = true;
    } 
    else if (type.includes('Seller')) {
      this.reportedSeller = this.report.reportable as SellerDTO;
      this.sellerId = this.reportedSeller?.id ?? null;
      this.mostrarPaneles = true;
    } 
    else if (type.includes('User')) {
      this.reportedUser = this.report.reportable as UserDTO;
      this.mostrarPanelUsuario = true;
    }

    if (this.sellerId) {
      this.loadSellerData(this.sellerId);
    } else if (!this.mostrarPanelUsuario) {
      console.warn('⚠️ No se encontró el ID del seller reportado.');
    }

    console.log('📦 Report completo recibido:', JSON.stringify(this.report, null, 2));
  }

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
    this.menuAbierto = !this.menuAbierto;
  }

  abrirBoton(event: MouseEvent) {
    event.stopPropagation();
    this.menuBoton = !this.menuBoton;
  }

  cerrarMenus() {
    this.menuAbierto = false;
    this.menuBoton = false;
  }

  OnSuspender() {
    this.dialogManager.openDialog('reason', { data: { mode: 'create' } });
  }
}
