import {
  Component, inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { ReportDTO } from '../../../core/services/report-service';
import { PublicationDTO } from '../../../core/services/publication-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';
import { DatePipe } from '@angular/common';
import { UserDTO } from '../../../core/services/user-service';
import { ReportedPublication } from '../reported-publication/reported-publication';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin-service';


@Component({
  selector: 'app-open-reporte',
  standalone: true,
  imports: [Closedialog, DatePipe, ReportedPublication, RouterLink],
  templateUrl: './open-reporte.html',
  styleUrls: ['./open-reporte.css']
})
export class OpenReporte implements OnInit, OnDestroy, OnChanges {

  @Input() report: ReportDTO | null = null;
  constructor(private adminService: AdminService) { }

  // Datos del reporte
  reportedPublication: PublicationDTO | null = null;
  reportedSeller: SellerDTO | null = null;
  reportedUser: UserDTO | null = null;

  // Datos API
  sellerData: SellerDTO | null = null;
  userSellerData: any | null = null;
  sellerId: number | null = null;

  // UI
  menuAbierto = false;
  menuBoton = false;
  mostrarPaneles = false;
  mostrarPanelUsuario = false;

  // Servicios
  private dialogManager = inject(DialogManager);
  private sellerService = inject(SellerService);
  private clickListener?: any;


  // 🔥🔥🔥 SE EJECUTA CADA VEZ QUE CAMBIA EL @Input (LA SOLUCIÓN)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['report'] && !changes['report'].firstChange) {
      this.resetData();
      this.inicializarReporte();
    }
  }

  ngOnInit(): void {
    this.inicializarReporte();
    this.setupGlobalClickListener();
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  }

  // 🔄 Limpia todas las variables antes de cargar un nuevo reporte
  private resetData() {
    this.reportedPublication = null;
    this.reportedSeller = null;
    this.reportedUser = null;

    this.sellerData = null;
    this.userSellerData = null;
    this.sellerId = null;

    this.mostrarPaneles = false;
    this.mostrarPanelUsuario = false;

    this.menuAbierto = false;
    this.menuBoton = false;
  }

  // 🔎 Toda la lógica que antes estaba en ngOnInit — ahora reutilizable
  private inicializarReporte() {
    if (!this.report) return;

    const type = this.report.reportable_type ?? '';

    // PUBLICACIÓN REPORTADA
    if (type.includes('Publication')) {
      this.reportedPublication = this.report.reportable as PublicationDTO;
      this.reportedSeller = this.reportedPublication.seller as SellerDTO;


      this.sellerId = this.reportedPublication?.seller?.id ?? null;
      this.mostrarPaneles = true;
      if (this.sellerId) this.loadSellerData(this.sellerId);
      return;
    }

    // SELLER REPORTADO
    if (type.includes('Seller')) {
      this.reportedSeller = this.report.reportable as SellerDTO;
      this.sellerId = this.reportedSeller?.id ?? null;
      this.mostrarPaneles = true;
      if (this.sellerId) this.loadSellerData(this.sellerId);
      return;
    }

    // USUARIO REPORTADO
    if (type.includes('User')) {
      this.reportedUser = this.report.reportable as UserDTO;
      this.reportedSeller = this.reportedUser.seller as SellerDTO;
      this.mostrarPanelUsuario = true;
      return;
    }
  }


  // API
  loadSellerData(id: number) {
    this.sellerService.getByIdSeller(id).subscribe({
      next: (data) => {
        this.sellerData = data;
        this.userSellerData = data.user;
      }
    });
  }


  // UI
  private setupGlobalClickListener() {
    if (!this.clickListener) {
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
    }
  }

  abrirMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuAbierto = true;
    this.cerrarBoton();
  }

  cerrarMenus() {
    this.menuAbierto = false;
  }

  abrirBoton(event: MouseEvent) {
    event.stopPropagation();
    this.menuBoton = true;
    this.cerrarMenus();
  }

  cerrarBoton() {
    this.menuBoton = false;
  }

  OnSuspender() {

    this.dialogManager.openDialog('reason', { data: { seller: this.reportedSeller } });
    this.cerrarBoton();
    this.cerrarMenus();
  }

  OnBloquear() {
    this.adminService.suspendedPermanent(this.reportedSeller?.user_id!)
      .subscribe({
        next: data => {
          console.log(data);

        }
      });

    this.cerrarBoton();
    this.cerrarMenus();
  }
}
