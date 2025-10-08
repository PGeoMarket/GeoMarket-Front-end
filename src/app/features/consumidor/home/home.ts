import { Component, inject } from '@angular/core';
import { Publications } from '../publications/publications';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Filters } from '../filters/filters';

@Component({
  selector: 'app-home',
  imports: [Publications, Filters],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  isAbierto: boolean = false;
  dialogManager = inject(DialogManager);

  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto =  true;
  }

  cerrarMenus() {
    this.isAbierto =  false;
  }


  onOpenMap() {
    this.dialogManager.openDialog('map', {
      data: {mode: 'create'}
    })
  }
}
