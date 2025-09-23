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

  registerUser: RegisterDTO = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    password: "",
    password_confirmation: "",
  }

  ngOnInit(): void {
    this.asignateRol();
    console.log(this.registerUser.role_id);
  }

  asignateRol() {
    this.registerService.rol_Changed$
      .subscribe(rol => {
        if (rol == 'vendedor') {
          this.registerUser = {
            ...this.registerUser,
            nombre_tienda: "",
            descripcion: "",
            latitud: 0,
            longitud: 0,
            direccion: "",
            role_id: 2
          }
        }

        if (rol == 'consumidor') {
          this.registerUser = {
            ...this.registerUser,
            role_id: 3
          }
        }

        console.log(rol);
      });
  }

  sendForm(form: NgForm) {
    if (form.invalid) return;

    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.emailTaken = false;

    this.registerService.create(this.registerUser)
      .subscribe({
        next: data => {
          console.log(data);
          this.showSuccessMessage = true;
          
          // Redirigir después de 2 segundos
          setTimeout(() => {
            this.onLogin()
          }, 2000);
        },
        error: error => {
          console.error('No se pudo crear al usuario ', error);
          console.log(this.registerUser);
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