import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { Loader } from '@googlemaps/js-api-loader';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { UserDTO, UserService } from '../../../../core/services/user-service';
import { HttpClient } from '@angular/common/http';
import { CoordinateMapServiceDTO, ExtractedAddress, MapService } from '../../../../core/services/map-service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [Closedialog],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit {

  private dialogManager = inject(DialogManager);
  private userService = inject(UserService);
  user: UserDTO | null = null;
  coordinate: CoordinateMapServiceDTO | { latitud: number; longitud: number; direccion: string } = { latitud: 3.0082918, longitud: -76.5055133, direccion: '' };
  openStreetMap_result: any;
  private marker: any;

  constructor(private http: HttpClient, private mapService: MapService) { }

  ngOnInit(): void {
    this.loadMap();
    this.getUserData();

    if (this.user && this.user.coordinate) {
      this.coordinate.latitud = this.user.coordinate.latitud;
      this.coordinate.longitud = this.user.coordinate.longitud;
    }
    console.log(this.user?.coordinate);

  }

  private loadMap(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyCsUAYxDmKFKoEMdFBGKcOzP152pyU6RYo',
      version: 'weekly'
    });

    loader.load().then(() => {
      const mapElement = document.getElementById('gmap_canvas');
      if (!mapElement) return;

      const savedLocation = this.userService.getTemporaryLocation();
      const initialLat = savedLocation?.latitud || 3.0082918;
      const initialLng = savedLocation?.longitud || -76.5055133;

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
    this.getLocationFromCoords(this.coordinate.latitud, this.coordinate.longitud);

      });
    });
  }

  OnConfirmar() {
    // Guardar y cerrar inmediatamente
    this.userService.saveTemporaryLocation(this.coordinate.latitud, this.coordinate.longitud, this.coordinate.direccion);
    console.log('Ubicación guardada y cerrando diálogo:', this.coordinate.latitud, this.coordinate.longitud);
    this.onCloseDialog({ saved: true, coordinate: this.coordinate });
  }

  getUserData() {
    this.user = this.userService.getCurrentUser();

  }

  //deepseek lo de direccion
  async getLocationFromCoords(lat: number, lng: number) {
    try {
      const addressData: ExtractedAddress = await this.mapService.getAddressFromCoords(lat, lng);

      this.coordinate.direccion = addressData.municipality;
      console.log(addressData);
      
      console.log(this.coordinate);


      /*       console.log('📍 Datos tipados:');
            console.log('🏛️  Departamento:', addressData.department); // "Cauca"
            console.log('🏠 Municipio:', addressData.municipality); // "Santander de Quilichao"
            console.log('🇨🇴 País:', addressData.country); // "Colombia"
            console.log('📦 Datos completos:', addressData.completeData); */

    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
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