import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { Loader } from '@googlemaps/js-api-loader'; 
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { UserService } from '../../../../core/services/user-service';

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

  latitud: number = 0;
  longitud: number = 0;
  private marker: any;

  ngOnInit(): void {
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

      const savedLocation = this.userService.getTemporaryLocation();
      const initialLat = savedLocation?.latitud || 3.0082918;
      const initialLng = savedLocation?.longitud || -76.5055133;

      this.latitud = initialLat;
      this.longitud = initialLng;

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
        this.latitud = this.marker.getPosition().lat();
        this.longitud = this.marker.getPosition().lng();
      });

      google.maps.event.addListener(map, 'click', (event: any) => {
        this.marker.setPosition(event.latLng);
        this.latitud = event.latLng.lat();
        this.longitud = event.latLng.lng();
      });
    });
  }

  OnConfirmar() {
    // Guardar y cerrar inmediatamente
    this.userService.saveTemporaryLocation(this.latitud, this.longitud);
    console.log('Ubicación guardada y cerrando diálogo:', this.latitud, this.longitud);
    this.dialogManager.closeDialog();
  }
}