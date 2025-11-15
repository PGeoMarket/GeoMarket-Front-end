import { Component, inject, OnInit } from '@angular/core';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { CoordinateDTO, UserDTO, UserService } from '../../../../core/services/user-service';
import { Loader } from '@googlemaps/js-api-loader';
import { SellerDTO, SellerService } from '../../../../core/services/seller-service';
import { Closedialog } from '../../../../core/dialogs/closedialog';

@Component({
  selector: 'app-map-seller',
  imports: [Closedialog],
  templateUrl: './map-seller.html',
  styleUrl: './map-seller.css'
})
export class MapSeller implements OnInit {
  private dialogManager = inject(DialogManager);
  private userService = inject(UserService);
  private sellerService = inject(SellerService);

  coordinate!: CoordinateDTO;
  user: UserDTO | null = null;
  private marker: any;

  ngOnInit(): void {
    this.getUserData();
    this.coordinate = this.user!.seller!.coordinate!;
    this.loadMap();
  }

  private loadMap(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyCsUAYxDmKFKoEMdFBGKcOzP152pyU6RYo',
      version: 'weekly'
    });

    loader.load().then(() => {
      const mapElement = document.getElementById('gmap_canvas');
      if (!mapElement) return;

      const savedLocation = this.coordinate;
      const initialLat = savedLocation!.latitud;
      const initialLng = savedLocation!.longitud;

      this.coordinate.latitud = initialLat;
      this.coordinate.longitud = initialLng;

      const map = new google.maps.Map(mapElement, {
        center: { lat: initialLat, lng: initialLng },
        zoom: 15,
      });

      this.marker = new google.maps.Marker({
        position: { lat: initialLat, lng: initialLng },
        map: map,
        draggable: true,
      });

      google.maps.event.addListener(this.marker, 'dragend', () => {
        this.coordinate.latitud = this.marker.getPosition().lat();
        this.coordinate.longitud = this.marker.getPosition().lng();
      });

      google.maps.event.addListener(map, 'click', (event: any) => {
        this.marker.setPosition(event.latLng);
        this.coordinate.latitud = event.latLng.lat();
        this.coordinate.longitud = event.latLng.lng();
      });
    });
  }

  getUserData() {
    this.user = this.userService.getCurrentUser();

  }

  OnConfirmar() {
    // Guardar y cerrar inmediatamente

    this.sellerService.getCoordinateById(this.coordinate.id)
      .subscribe({
        next: (coordinate: CoordinateDTO) => {
          console.log('Coordenada antes de guardar:', coordinate);
        },
        error: (error) => {
          console.error('Error al obtener la coordenada:', error);
        }
      })

    this.sellerService.updateCoordinate(this.coordinate.id, this.coordinate)
      .subscribe({
        next: (coordinate: CoordinateDTO) => {
          console.log('Coordenada actualizado:', coordinate);
          this.onCloseDialog({ saved: true, coordinate: this.coordinate });
        },
        error: (error) => {
          console.error('Error al actualizar la coordenada:', error);
        }
      })

    console.log('coordenadas guardadas:', this.coordinate);


      
  }

      onCloseDialog(result?: any) {
    // si el método _close fue inyectado al componente (por openDialog),
    // úsalo — eso cierra el overlay y ejecuta el callback onClose del llamador.
    const maybeClose = (this as any)._close;
    if (typeof maybeClose === 'function') {
      maybeClose(result);
      return;
    }

    // fallback: cerrar con el manager (no dispara onClose callback)
    this.dialogManager.closeDialog();
  }


}
