import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { RegisterDTO, RegisterService } from '../../../core/services/register-service';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, Closedialog],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

  emailTaken!: boolean;
  constructor(private registerService: RegisterService) { }

  registerUser: RegisterDTO = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    password: "",
    password_confirmation: "",
  }

  /*   // Validar formato de email
    isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    } */

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
if (form.invalid) return; // No procesa el formulario si es inválido

this.registerService.create(this.registerUser)
  .subscribe({
    next: data => console.log(data),
    error: error => {
      console.error('No se pudo crear al usuario ', error);
      console.log(this.registerUser);
      
      if (error.status === 422 && error.error?.errors?.email) {
        this.emailTaken = true;
      }
    },
  })
  }
}
