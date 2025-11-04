import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { Loader } from '@googlemaps/js-api-loader'; 
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [Closedialog],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit {

  private dialogManager = inject(DialogManager);
  private http = inject(HttpClient);

  private latitud: number = 0;
  private longitud: number = 0;
  private marker: any;

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyCsUAYxDmKFKoEMdFBGKcOzP152pyU6RYo', 
      version: 'weekly'
    });

    loader.load().then(() => {
      const mapElement = document.getElementById('gmap_canvas');
      if (!mapElement) return;

      const map = new google.maps.Map(mapElement, {
        center: { lat: 3.0082918, lng: -76.5055133 },
        zoom: 15,
      });

      // Crear marcador draggable
      this.marker = new google.maps.Marker({
        position: { lat: 3.0082918, lng: -76.5055133 },
        map: map,
        draggable: true,
      });

      // Actualizar coordenadas cuando se mueva el marcador
      google.maps.event.addListener(this.marker, 'position_changed', () => {
        this.latitud = this.marker.getPosition().lat();
        this.longitud = this.marker.getPosition().lng();
      });

      // Mover marcador cuando se haga click en el mapa
      google.maps.event.addListener(map, 'click', (event: any) => {
        this.marker.setPosition(event.latLng);
      });
    });
  }

  OnConfirmar() {
    this.http.post('http://127.0.0.1:8000/api/cordinates', {
      latitud: this.latitud,
      longitud: this.longitud,
      direccion: 'Santander de Quilichao',
      coordinateable_id: 5, // aquí pones el id del vendedor autenticado
      coordinateable_type: 'App\\Models\\Seller'
    }).subscribe({
      next: (res) => {
        console.log('Coordenada guardada correctamente:', res);
        this.dialogManager.closeDialog();
      },
      error: (err) => {
        console.error('Error al guardar coordenada:', err);
      }
    });
  }
}