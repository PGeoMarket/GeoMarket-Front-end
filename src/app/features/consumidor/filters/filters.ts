import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { PublicationService } from '../../../core/services/publication-service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css'
})
export class Filters implements OnInit {
  isFiltred: boolean = false;
  @Input() isAbierto: boolean = false;
  @Input() fromProfile: boolean = false;
  @Output() isAbiertoChange = new EventEmitter<boolean>(); // <-- agregado
  dialogManager = inject(DialogManager);
  constructor(protected publicationService: PublicationService) { }

  ngOnInit(): void {

    /* Para activar boton de borrar filtros */
    this.publicationService.filterChanged$
      .subscribe(filters => {
        this.isFiltred = !!filters && !filters.includes('&filter[titulo]=');
        console.log(filters + "desde aca");

      });

    this.publicationService.filter_locationChanged$
      .subscribe(filters => {
        this.isFiltred = !!filters.latitud || !!filters.longitud;

      });
  }

  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto = true;
    this.isAbiertoChange.emit(this.isAbierto); // <-- notificar al padre
  }

  borrarFiltros(event: MouseEvent) {
    this.publicationService.sendFilter('');
    this.publicationService.sendFilterLocation({ latitud: 0, longitud: 0, direccion: '' });
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
