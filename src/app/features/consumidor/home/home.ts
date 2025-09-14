import { Component } from '@angular/core';
import { Publications } from '../publications/publications';

@Component({
  selector: 'app-home',
  imports: [Publications],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  isAbierto: boolean = false;

  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto =  true;
  }

  cerrarMenus() {
    this.isAbierto =  false;
  }
}
