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

  constructor(private registerService: RegisterService) { }

  dialogManager = inject(DialogManager)

  // Inicializar con todos los campos básicos
  registerUser: RegisterDTO = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    telefono: "",
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
        } else if (rol == 'consumidor') {
          // Remover campos específicos de vendedor cuando se cambia a consumidor
          const { nombre_tienda, descripcion, latitud, longitud, direccion, ...consumerData } = currentData;
          this.registerUser = {
            ...consumerData,
            role_id: 3
          }
        }

        console.log('Datos después del cambio de rol:', this.registerUser);
      });
  }

  sendForm(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.emailTaken = false;

    console.log('Enviando datos:', this.registerUser);

    this.registerService.create(this.registerUser)
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
          console.log('Datos enviados:', this.registerUser);
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