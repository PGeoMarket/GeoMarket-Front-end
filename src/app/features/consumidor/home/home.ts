import { Component, inject } from '@angular/core';
import { Publications } from '../publications/publications';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { FilterByCategory } from '../dialogs/filter-by-category/filter-by-category';

@Component({
  selector: 'app-home',
  imports: [Publications],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  isAbierto: boolean = false;
  protected filtro!: string; 
  dialogManager = inject(DialogManager);
  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto =  true;
  }

  cerrarMenus() {
    this.isAbierto =  false;
  }

  onFilterByCategory() {
    this.dialogManager.openDialog('filter-by-category', {
      data: {mode: 'create'}
    })
  }

  onFilterByProximity() {
    this.dialogManager.openDialog('filter-by-proximity', {
      data: {mode: 'create'}
    })
  }

  onOpenMap() {
    this.dialogManager.openDialog('map', {
      data: {mode: 'create'}
    })
  }
}
