import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { PublicationService } from '../../../../core/services/publication-service';
import { UserService } from '../../../../core/services/user-service';
import { CoordinateMapServiceDTO } from '../../../../core/services/map-service';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-by-proximity',
  imports: [Closedialog, FormsModule],
  templateUrl: './filter-by-proximity.html',
  styleUrl: './filter-by-proximity.css'
})
export class FilterByProximity implements OnInit {

  filtro_seleccionado: string = "";
  coordinate!: CoordinateMapServiceDTO;

  constructor(private publicationService: PublicationService, private userService: UserService) { }
  dialogManager = inject(DialogManager);

  ngOnInit(): void {
    this.coordinate = this.userService.getTemporaryLocation()!;

  }

  applyFilter() {

    this.publicationService.sendFilterLocation(this.coordinate)
    this.dialogManager.closeDialog();
    
  }

    openMapDialog() {
    console.log('Abriendo diálogo del mapa para selección manual');

    // Limpiar cualquier ubicación temporal previa
    //this.userService.clearTemporaryLocation();

    this.dialogManager.openDialog('map', {
      data: { mode: 'select' },
      onClose: (res) => {
        console.log('cerrado con', res);
        
        //Actualizar la ubicación del usuario si se seleccionó una nueva
        this.coordinate = this.userService.getTemporaryLocation()!;
        
        console.log("a", this.userService.getTemporaryLocation());
        
      }
    });

  }


}
