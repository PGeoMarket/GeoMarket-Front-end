import { Component, inject } from '@angular/core';
import { Publications } from '../publications/publications';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Filters } from '../filters/filters';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { CoordinateDTO } from '../../../core/services/map-service';

@Component({
  selector: 'app-home',
  imports: [Publications, Filters],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  isAbierto: boolean = false;
  dialogManager = inject(DialogManager);
  user: UserDTO | null = null;
  user_coordinate!: CoordinateDTO|null;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserData();
    this.user_coordinate = this.userService.getTemporaryLocation()||null;    

  }

  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto =  true;
  }

  cerrarMenus() {
    this.isAbierto =  false;
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
        this.user_coordinate = this.userService.getTemporaryLocation()!;
        
        console.log("a", this.userService.getTemporaryLocation());
        
      }
    });

  }


    getUserData() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }
}
