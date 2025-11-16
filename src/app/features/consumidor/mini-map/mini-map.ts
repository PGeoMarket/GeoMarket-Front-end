import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoordinateMapServiceDTO } from '../../../core/services/map-service';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.html',
  styleUrl: './mini-map.css'
})
export class MiniMap implements OnChanges {
  @Input() coordinate: CoordinateMapServiceDTO | { latitud: number; longitud: number } = { latitud: 0, longitud: 0 };
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Inicializar con una URL por defecto o vacía
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en la propiedad 'coordinate'
    if (changes['coordinate'] && this.coordinate) {
      this.loadMapWithCoordinates(this.coordinate.latitud, this.coordinate.longitud);
    }
  }

  loadMapWithCoordinates(lat: number, lng: number) {
    const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }
}