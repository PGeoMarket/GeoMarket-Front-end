import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Publications } from '../publications/publications';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../../core/services/publication-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserService } from '../../../core/services/user-service';
import { PublicationDTO } from '../../../core/services/publication-service';

@Component({
  selector: 'app-profile-other',
  imports: [CommonModule, Publications],
  templateUrl: './profile-other.html',
  styleUrl: './profile-other.css'
})
export class ProfileOther {
  @Input() publication_detail!: PublicationDTO | null;
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });
  seller_id!: number;
  seller!: SellerDTO;


  constructor(private route: ActivatedRoute, private publicationService: PublicationService, private sellerService: SellerService, private userService: UserService) { }
  dialogManager = inject(DialogManager);

  ngOnInit(): void {
    this.seller_id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSellerProfile();
    this.loadPublicationsOther();
  }

  loadSellerProfile() {
    this.sellerService.getByIdSeller(this.seller_id)
      .subscribe({
        next: data => this.seller = data,
        error: error => console.error("No se pudo traer a seller", error),
        complete: () => console.log("Vendedor traido correctamente")

      });

    console.log(this.seller);

  }

  loadPublicationsOther() {
    const filtersSeller = `&filter[seller_id]=${this.seller_id}`;

    this.publicationService.sendFilter(filtersSeller);
  }

  onOpenMap() {
    this.dialogManager.openDialog('map', {
      data: { mode: 'create' }
    })
  }

  menuAbierto: boolean = false;
  abrirMenu(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    //this.editarIndex = this.editarIndex === index ? null : index;
    this.menuAbierto = true;
  }

  cerrarMenus() {
    this.menuAbierto = false;
  }
  onReport(): void {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', { data: { mode: 'create' } });
      return;
    }

    const currentUser = this.userService.getCurrentUser();

    const sellerId = this.publication_detail?.seller_id || this.seller_id;

    if (!sellerId) {
      console.error("No se encontró el ID del vendedor a reportar.");
      alert("No se pudo identificar el usuario a reportar.");
      return;
    }

    if (currentUser?.id === sellerId) {
      alert("No puedes reportarte a ti mismo.");
      return;
    }
    console.log("📌 Reportando al vendedor con ID:", sellerId);

    this.dialogManager.openDialog('report', {
      data: {
        reporter_id: currentUser?.id, // quien reporta
        reported_user_id: sellerId    // el usuario o vendedor reportado
      },
      onClose: (res) => console.log('Reporte cerrado con:', res)
    });
  }



}
