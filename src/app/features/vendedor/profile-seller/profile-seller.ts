import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Loader } from '@googlemaps/js-api-loader';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { CommentsProfile } from "../comments-profile/comments-profile";
import { EditPublication } from '../edit-publication/edit-publication';
import { CoordinateDTO } from '../../../core/services/user-service';
import { MiniMap } from '../../consumidor/mini-map/mini-map';
import { Filters } from '../../consumidor/filters/filters';


@Component({
  selector: 'app-profile-seller',
  imports: [CommonModule, CommentsProfile, EditPublication, MiniMap, Filters],
  templateUrl: './profile-seller.html',
  styleUrl: './profile-seller.css'
})
export class ProfileSeller implements OnInit {
  tab: string = "catalogo";
  user: UserDTO | null = null;
  coordinate!: CoordinateDTO;
  title = 'google-maps';

  isAbierto: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserData();
    this.coordinate = this.user!.seller!.coordinate!;
    console.log(this.coordinate);
    
  }


  openMapSellerDialog() {
    console.log('Abriendo diálogo del mapa para selección manual');

    this.dialogManager.openDialog('map-seller', {
      data: { mode: 'select' },
      onClose: (res) => {
        console.log('cerrado con', res);
        this.updateCoordinate(res.coordinate);
        
      }
        
      
    });
/*     // Verificar inmediatamente después de que se cierre (cada 100ms por 5 segundos)
    let checks = 0;
    const maxChecks = 50; // 5 segundos máximo

    const checkLocation = setInterval(() => {
      checks++;
      const savedLocation = this.userService.getTemporaryLocation();

      if (savedLocation && savedLocation.latitud && savedLocation.longitud) {
        console.log('Ubicación manual actualizada:', savedLocation.latitud, savedLocation.longitud);
        this.user!.seller!.coordinate!.latitud = savedLocation.latitud;
        this.user!.seller!.coordinate!.longitud = savedLocation.longitud;
        this.userService.clearTemporaryLocation();
        clearInterval(checkLocation);
      }

      if (checks >= maxChecks) {
        console.log('Tiempo máximo de espera alcanzado');
        clearInterval(checkLocation);
      }
    }, 100); */
  }


  // Método para actualizar las coordenadas
  updateCoordinate(newCoordinate: CoordinateDTO) {
    // Crear un NUEVO objeto para que Angular detecte el cambio
    this.coordinate = { ...newCoordinate,
      coordinateable_id: this.coordinate.coordinateable_id,
      coordinateable_type: this.coordinate.coordinateable_type,
      id: this.coordinate.id
     };
    
    // También actualizar en el usuario si es necesario
    if (this.user?.seller) {
      this.user.seller.coordinate = { ...newCoordinate };
    }
    
    console.log('Coordenadas actualizadas:', this.coordinate);
  }


  private dialogManager = inject(DialogManager);
  onOpenEdit() {
    this.dialogManager.openDialog('edit-seller', {
      data: { mode: 'create' },
      onClose: (res) => {
        console.log('cerrado con', res);
        this.userService.getMe().subscribe();
      }
    });
  }

  getUserData() {
    this.userService.getMe().subscribe();
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }

  //Filtros
  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto = true;
  }

  cerrarMenus() {
    this.isAbierto = false;
  }

}
