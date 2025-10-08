import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css'
})
export class Filters {
  @Input() isAbierto: boolean = false;
  @Output() isAbiertoChange = new EventEmitter<boolean>(); // <-- agregado
  dialogManager = inject(DialogManager);

  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto = true;
    this.isAbiertoChange.emit(this.isAbierto); // <-- notificar al padre
  }

  onFilterByCategory() {
    this.dialogManager.openDialog('filter-by-category', {
      data: { mode: 'create' }
    })
  }

  onFilterByProximity() {
    this.dialogManager.openDialog('filter-by-proximity', {
      data: { mode: 'create' }
    })
  }

  onFilterByPrice() {
    this.dialogManager.openDialog('filter-by-price', {
      data: { mode: 'create' }
    })
  }
}
