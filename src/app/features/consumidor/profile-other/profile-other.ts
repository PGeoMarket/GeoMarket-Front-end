import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Publications } from '../publications/publications';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../../core/services/publication-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserService } from '../../../core/services/user-service';
import { PublicationDTO } from '../../../core/services/publication-service';
import { CommentsProfile } from "../../vendedor/comments-profile/comments-profile";
import { Filters } from '../filters/filters';
import { MiniMap } from '../mini-map/mini-map';

@Component({
  selector: 'app-profile-other',
  imports: [CommonModule, Publications, CommentsProfile, Filters, MiniMap],
  templateUrl: './profile-other.html',
  styleUrl: './profile-other.css'
})
export class ProfileOther {
  @Input() publication_detail!: PublicationDTO | null;
  tab: string = "catalogo";
  seller_id!: number;
  seller!: SellerDTO;
  isAbierto: boolean = false;


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

  user_seller_id(): number | null {
    return this.seller ? this.seller.user_id : null;
  }

  onOpenMap() {
    this.dialogManager.openDialog('map', {
      data: { mode: 'create' }
    })
  }

  menuAbierto: boolean = false;
  abrirReport(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    //this.editarIndex = this.editarIndex === index ? null : index;
    this.menuAbierto = true;
  }

  cerrarReport() {
    this.menuAbierto = false;
  }
  onReport() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', { data: { mode: 'create' } });
      return;
    }

    const currentUser = this.userService.getCurrentUser();
    const reportUser = this.user_seller_id();
    // Evitar que el usuario se reporte a sí mismo
    if (currentUser?.id === reportUser) {
      alert("No puedes reportarte a ti mismo.");
      return;
    }

    this.dialogManager.openDialog('report', {
      data: {
        user_id: currentUser?.id, // quien reporta
        seller_id: reportUser // perfil a reportar
      },
      onClose: (res) => console.log('Reporte cerrado con:', res)
    });
  }

    //Filtros
  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto = true;
  }

  cerrarFiltros() {
    this.isAbierto = false;
  }
}
