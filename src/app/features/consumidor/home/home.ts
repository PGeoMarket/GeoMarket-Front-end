import { Component, inject } from '@angular/core';
import { Publications } from '../publications/publications';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Filters } from '../filters/filters';
import { UserDTO, UserService } from '../../../core/services/user-service';

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
  
  constructor(private userService: UserService) {}

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
      data: { mode: 'select' }
    });

  }

    getUserData() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }
}
