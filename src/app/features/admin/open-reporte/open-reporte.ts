import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { ReportDTO } from '../../../core/services/report-service';
import { PublicationDTO } from '../../../core/services/publication-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';
import { DatePipe } from '@angular/common';
import { UserDTO } from '../../../core/services/user-service';
import { ProductDetail } from '../../consumidor/product-detail/product-detail';

@Component({
  selector: 'app-open-reporte',
  standalone: true,
  imports: [Closedialog, DatePipe, ProductDetail],
  templateUrl: './open-reporte.html',
  styleUrls: ['./open-reporte.css']
})
export class OpenReporte implements OnInit, OnDestroy {

  @Input() report: ReportDTO | null = null;

  // Datos del reporte
  reportedPublication: PublicationDTO | null = null;
  reportedSeller: SellerDTO | null = null;
  reportedUser: UserDTO | null = null;

  // Datos cargados desde API
  sellerData: SellerDTO | null = null;
  userSellerData: any | null = null;
  sellerId: number | null = null;

  // Control de UI
  menuAbierto = false;
  menuBoton = false;
  mostrarPaneles = false;
  mostrarPanelUsuario = false;

  // Servicios
  private dialogManager = inject(DialogManager);
  private sellerService = inject(SellerService);
  private clickListener?: any;

  ngOnInit(): void {
    console.log('═══════════════════════════════════════');
    console.log('🔍 INICIANDO ANÁLISIS DE REPORTE');
    console.log('═══════════════════════════════════════');
    
    if (!this.report) {
      console.error('❌ No hay reporte');
      return;
    }

    const type = this.report.reportable_type ?? '';
    console.log('📌 Tipo de reporte:', type);
    console.log('📌 ID reportado:', this.report.reportable_id);

    // 🟢 REPORTE DE PUBLICACIÓN
    if (type.includes('Publication')) {
      console.log('✅ Detectado: PUBLICACIÓN REPORTADA');
      
      this.reportedPublication = this.report.reportable as PublicationDTO;
      this.sellerId = this.reportedPublication?.seller?.id ?? null;
      
      this.mostrarPaneles = true;
      this.mostrarPanelUsuario = false;
      
      console.log('   └─ Seller ID de la publicación:', this.sellerId);
      
      if (this.sellerId) {
        this.loadSellerData(this.sellerId);
      }
    } 
    
    // 🟡 REPORTE DE SELLER (tienda)
    else if (type.includes('Seller')) {
      console.log('✅ Detectado: SELLER/TIENDA REPORTADA');
      
      this.reportedSeller = this.report.reportable as SellerDTO;
      this.sellerId = this.reportedSeller?.id ?? null;
      
      this.mostrarPaneles = true;
      this.mostrarPanelUsuario = false;
      
      console.log('   └─ Seller ID:', this.sellerId);
      
      if (this.sellerId) {
        this.loadSellerData(this.sellerId);
      }
    } 
    
    // 🔴 REPORTE DE USUARIO (perfil personal)
    else if (type.includes('User')) {
      console.log('✅ Detectado: USUARIO/PERFIL REPORTADO');
      
      // ⭐ CLAVE: Asignar el usuario directamente desde reportable
      this.reportedUser = this.report.reportable as UserDTO;
      
      // ⭐ NO cargamos seller para usuarios reportados
      this.sellerId = null;
      this.sellerData = null;
      this.userSellerData = null;
      
      // ⭐ Mostrar solo el panel de usuario
      this.mostrarPaneles = false;
      this.mostrarPanelUsuario = true;
      
      console.log('   └─ Usuario reportado:');
      console.log('      • ID:', this.reportedUser?.id);
      console.log('      • Nombre:', this.reportedUser?.primer_nombre, this.reportedUser?.primer_apellido);
      console.log('      • Email:', this.reportedUser?.email);
      console.log('      • Imagen:', this.reportedUser?.image?.url || 'Sin imagen');
      
      console.log('   └─ NO se cargará información de Seller');
    }
    
    else {
      console.warn('⚠️ TIPO DE REPORTE NO RECONOCIDO:', type);
    }

    console.log('───────────────────────────────────────');
    console.log('📊 ESTADO FINAL:');
    console.log('   • mostrarPaneles:', this.mostrarPaneles);
    console.log('   • mostrarPanelUsuario:', this.mostrarPanelUsuario);
    console.log('   • reportedUser:', !!this.reportedUser);
    console.log('   • reportedPublication:', !!this.reportedPublication);
    console.log('   • reportedSeller:', !!this.reportedSeller);
    console.log('═══════════════════════════════════════');

    this.setupGlobalClickListener();
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  }

  loadSellerData(id: number) {
    console.log('🔄 Cargando datos del Seller ID:', id);
    
    this.sellerService.getByIdSeller(id).subscribe({
      next: (data: SellerDTO) => {
        this.sellerData = data;
        this.userSellerData = data.user;

        console.log('✅ Datos del seller cargados:');
        console.log('   └─ Tienda:', this.sellerData?.nombre_tienda);
        console.log('   └─ Propietario:', this.userSellerData?.primer_nombre, this.userSellerData?.primer_apellido);
      },
      error: (err: any) => {
        console.error('❌ Error al cargar seller:', err);
      }
    });
  }

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
    this.dialogManager.openDialog('reason', { data: { mode: 'create' } });
    this.cerrarBoton();
    this.cerrarMenus();
  }
}