import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { RegisterDTO, RegisterService } from '../../../core/services/register-service';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { MapService } from '../../../core/services/map-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, Closedialog],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

  emailTaken!: boolean;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  locationLoading: boolean = false;
  locationError: boolean = false;

  telefonoPrincipal: string = '';
  telefonoSecundario: string = '';

  constructor(
    private registerService: RegisterService,
    private mapService: MapService
  ) { }

  dialogManager = inject(DialogManager)

  registerUser: RegisterDTO = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    telefonos:[], 
    email: "",
    password: "",
    password_confirmation: "",
    role_id: 3
  }

  ngOnInit(): void {
    this.asignateRol();
  }

  asignateRol() {
    this.registerService.rol_Changed$
      .subscribe(rol => {
        console.log('Cambiando rol a:', rol);
        
        const currentData = { ...this.registerUser };

        if (rol == 'vendedor') {
          this.registerUser = {
            ...currentData,
            nombre_tienda: currentData.nombre_tienda || "",
            descripcion: currentData.descripcion || "",
            latitud: currentData.latitud || 0,
            longitud: currentData.longitud || 0,
            direccion: currentData.direccion || "",
            role_id: 2
          }
          this.telefonoPrincipal = '';
          this.telefonoSecundario = '';
          
          this.getCurrentLocation();
        } else if (rol == 'consumidor') {
          const { nombre_tienda, descripcion, latitud, longitud, direccion, ...consumerData } = currentData;
          this.registerUser = {
            ...consumerData,
            role_id: 3
          }
          this.telefonoPrincipal = '';
          this.telefonoSecundario = '';
        }
      });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      this.locationLoading = true;
      this.locationError = false;
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.registerUser.latitud = position.coords.latitude;
          this.registerUser.longitud = position.coords.longitude;
          this.locationLoading = false;
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          this.locationLoading = false;
          this.locationError = true;
          
          this.registerUser.latitud = 3.0082918;
          this.registerUser.longitud = -76.5055133;
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      console.log('Geolocalización no soportada');
      this.locationError = true;
      this.registerUser.latitud = 3.0082918;
      this.registerUser.longitud = -76.5055133;
    }
  }

  openMapDialog() {
    this.dialogManager.openDialog('map', {
      data: { mode: 'select' }
    });
    
    const checkLocation = setInterval(() => {
      const savedLocation = this.mapService.getLocation();
      if (savedLocation && savedLocation.latitud && savedLocation.longitud) {
        this.registerUser.latitud = savedLocation.latitud;
        this.registerUser.longitud = savedLocation.longitud;
        clearInterval(checkLocation);
      }
    }, 500);
    
    setTimeout(() => {
      clearInterval(checkLocation);
    }, 10000);
  }

  formatPhone(event: any, type: 'principal' | 'secundario') {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    if (type === 'principal') {
      this.telefonoPrincipal = value;
    } else {
      this.telefonoSecundario = value;
    }
    
    input.value = value;
  }

  buildPhoneArray(): number[] {
    const phones: number[] = [];
    
    if (this.telefonoPrincipal && this.telefonoPrincipal.length === 10) {
      phones.push(Number(this.telefonoPrincipal));
    }
    
    if (this.telefonoSecundario && this.telefonoSecundario.length === 10) {
      phones.push(Number(this.telefonoSecundario));
    }
    
    return phones;
  }

  sendForm(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    if (this.registerUser.role_id === 2 && (!this.registerUser.latitud || !this.registerUser.longitud)) {
      console.log('Ubicación no disponible para vendedor');
      return;
    }

    if (this.registerUser.role_id === 2 && (!this.telefonoPrincipal || this.telefonoPrincipal.length !== 10)) {
      console.log('Teléfono principal inválido para vendedor');
      return;
    }

    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.emailTaken = false;

    const dataToSend = { ...this.registerUser };

    if (this.registerUser.role_id === 2) {
      // @ts-ignore
      dataToSend.telefonos = this.buildPhoneArray();
    }

    console.log('Enviando datos al backend:', dataToSend);

    // @ts-ignore
    this.registerService.create(dataToSend)
      .subscribe({
        next: data => {
          this.dialogManager.closeDialog();
          this.dialogManager.openDialog('login', {
            data: { mode: 'create' }
          });
        },
        error: error => {
          console.error('Error al registrar usuario:', error);
          this.showErrorMessage = true;
          
          if (error.status === 422 && error.error?.errors?.email) {
            this.emailTaken = true;
          }

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        },
      })
  }
}