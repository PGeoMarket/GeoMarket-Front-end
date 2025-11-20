import { Component, inject } from '@angular/core';
import { Publications } from '../publications/publications';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Filters } from '../filters/filters';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { CoordinateMapServiceDTO } from '../../../core/services/map-service';
import { LoginService } from '../../../core/services/login-service';

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
  user_coordinate!: CoordinateMapServiceDTO | null;
  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUserData();
    this.user_coordinate = this.userService.getTemporaryLocation() || null;
    if (!!!this.user?.activo) {
      this.loginService.logout().subscribe({
        next: () => {
          console.log('Logout exitoso');
        },
        error: () => {
          // Logout local aunque falle el servidor
          localStorage.clear();
          this.userService.clearUserData();
        }
      });

    }
  }

  abrirFiltros(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.isAbierto = true;
  }

  cerrarMenus() {
    this.isAbierto = false;
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
    this.userService.getMe().subscribe();
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }
}
