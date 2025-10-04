import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Publications } from '../publications/publications';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../../core/services/publication-service';
import { SellerDTO, SellerService } from '../../../core/services/seller-service';
import { DialogManager } from '../../../core/dialogs/dialog-manager';

@Component({
  selector: 'app-profile-other',
  imports: [CommonModule, Publications],
  templateUrl: './profile-other.html',
  styleUrl: './profile-other.css'
})
export class ProfileOther {
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });
  seller_id!: number;
  seller!: SellerDTO;

  constructor(private route: ActivatedRoute, private publicationService: PublicationService, private sellerService: SellerService) { }
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
  
}
