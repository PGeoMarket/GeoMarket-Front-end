import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoordinateMapServiceDTO } from '../../../core/services/map-service';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.html',
  styleUrl: './mini-map.css'
})
export class MiniMap implements OnChanges {
  @Input() coordinate: CoordinateMapServiceDTO | { latitud: number; longitud: number } = { latitud: 0, longitud: 0 };
  @Output() give_url = new EventEmitter<string>();
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
  const browserUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);

    this.give_url.emit(browserUrl);
  }

}
