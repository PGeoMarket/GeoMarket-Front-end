import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { RegisterDTO, RegisterService } from '../../../core/services/register-service';
import { DialogManager } from '../../../core/dialogs/dialog-manager';

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

  telefonoPrincipal: string = '';
  telefonoSecundario: string = '';

  constructor(private registerService: RegisterService) { }

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
    role_id: 3 // valor por defecto
  }

  ngOnInit(): void {
    this.asignateRol();
    console.log('Role ID inicial:', this.registerUser.role_id);
  }

  asignateRol() {
    this.registerService.rol_Changed$
      .subscribe(rol => {
        console.log('Cambiando rol a:', rol);
        
        // Preservar los datos ya ingresados
        const currentData = { ...this.registerUser };

        if (rol == 'vendedor') {
          this.registerUser = {
            ...currentData, // Mantener todos los datos existentes
            nombre_tienda: currentData.nombre_tienda || "",
            descripcion: currentData.descripcion || "",
            latitud: currentData.latitud || 0,
            longitud: currentData.longitud || 0,
            direccion: currentData.direccion || "",
            role_id: 2
          }
          // Reiniciar teléfonos cuando cambia a vendedor
          this.telefonoPrincipal = '';
          this.telefonoSecundario = '';
        } else if (rol == 'consumidor') {
          // Remover campos específicos de vendedor cuando se cambia a consumidor
          const { nombre_tienda, descripcion, latitud, longitud, direccion, ...consumerData } = currentData;
          this.registerUser = {
            ...consumerData,
            role_id: 3
          }
          // Limpiar teléfonos cuando cambia a consumidor
          this.telefonoPrincipal = '';
          this.telefonoSecundario = '';
        }

        console.log('Datos después del cambio de rol:', this.registerUser);
      });
  }

  // Función para formatear teléfono (remover caracteres no numéricos)
  formatPhone(event: any, type: 'principal' | 'secundario') {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remover caracteres no numéricos
    
    if (value.length > 10) {
      value = value.substring(0, 10); // Limitar a 10 dígitos
    }
    
    if (type === 'principal') {
      this.telefonoPrincipal = value;
    } else {
      this.telefonoSecundario = value;
    }
    
    input.value = value;
  }

  // Función para construir el array de teléfonos
  buildPhoneArray(): number[] {
    const phones: number[] = [];
    
    // Agregar teléfono principal si existe
    if (this.telefonoPrincipal && this.telefonoPrincipal.length === 10) {
      phones.push(Number(this.telefonoPrincipal));
    }
    
    // Agregar teléfono secundario si existe
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

    // Validar teléfono principal para vendedor
    if (this.registerUser.role_id === 2 && (!this.telefonoPrincipal || this.telefonoPrincipal.length !== 10)) {
      console.log('Teléfono principal inválido para vendedor');
      return;
    }

    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.emailTaken = false;

    // Preparar datos para enviar
    const dataToSend = { ...this.registerUser };

    // Si es vendedor, reemplazar telefono por el array
    if (this.registerUser.role_id === 2) {
      // @ts-ignore - Temporalmente ignoramos el error de tipo
      dataToSend.telefonos = this.buildPhoneArray();
    }

    console.log('Enviando datos:', dataToSend);

    // @ts-ignore - Temporalmente ignoramos el error de tipo
    this.registerService.create(dataToSend)
      .subscribe({
        next: data => {
          console.log('Respuesta del servidor:', data);
          this.showSuccessMessage = true;
          
          // Redirigir después de 2 segundos
          setTimeout(() => {
            this.onLogin()
          }, 2000);
        },
        error: error => {
          console.error('Error al crear usuario:', error);
          console.log('Datos enviados:', dataToSend);
          this.showErrorMessage = true;
          
          if (error.status === 422 && error.error?.errors?.email) {
            this.emailTaken = true;
          }

          // Ocultar mensaje de error después de 3 segundos
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        },
      })
  }
  
  onLogin(){
    this.dialogManager.closeDialog()
    this.dialogManager.openDialog('login',{
      data:{mode:'create'}
    })
  }
}