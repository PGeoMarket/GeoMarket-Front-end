import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Closedialog } from "../../../core/dialogs/closedialog";


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, Closedialog],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  
 // Recibe si es vendedor desde el componente padre
  @Input() isVendedor: boolean = false;
  
  // Datos del formulario
  formData = {
    nombre: '',
    apellidos: '',
    nombre_negocio: '',
    email: '',
    email_confirmation: '',
    telefono: '',
    direccion: '',
    password: '',
    password_confirmation: '',
    terms: false
  };

  // Control de errores
  errors: any = {};
  mostrarErrores: boolean = false;
  

 
  // Validar formulario
  validarFormulario(): boolean {
    this.errors = {};
    let isValid = true;

    // Validar campos obligatorios
    if (!this.formData.nombre.trim()) {
      this.errors.nombre = 'El nombre es obligatorio';
      isValid = false;
    }

    if (!this.formData.apellidos.trim()) {
      this.errors.apellidos = 'Los apellidos son obligatorios';
      isValid = false;
    }

    if (this.isVendedor && !this.formData.nombre_negocio.trim()) {
      this.errors.nombre_negocio = 'El nombre del negocio es obligatorio';
      isValid = false;
    }

    // Validar email
    if (!this.formData.email.trim()) {
      this.errors.email = 'El correo electrónico es obligatorio';
      isValid = false;
    } else if (!this.isValidEmail(this.formData.email)) {
      this.errors.email = 'El correo electrónico no es válido';
      isValid = false;
    }

    // Validar confirmación de email
    if (!this.formData.email_confirmation.trim()) {
      this.errors.email_confirmation = 'Debe confirmar el correo electrónico';
      isValid = false;
    } else if (this.formData.email !== this.formData.email_confirmation) {
      this.errors.email_confirmation = 'Los correos electrónicos no coinciden';
      isValid = false;
    }

    if (!this.formData.telefono.trim()) {
      this.errors.telefono = 'El teléfono es obligatorio';
      isValid = false;
    }

    if (this.isVendedor && !this.formData.direccion.trim()) {
      this.errors.direccion = 'La dirección es obligatoria';
      isValid = false;
    }

    // Validar contraseña
    if (!this.formData.password) {
      this.errors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (this.formData.password.length < 6) {
      this.errors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    // Validar confirmación de contraseña
    if (!this.formData.password_confirmation) {
      this.errors.password_confirmation = 'Debe confirmar la contraseña';
      isValid = false;
    } else if (this.formData.password !== this.formData.password_confirmation) {
      this.errors.password_confirmation = 'Las contraseñas no coinciden';
      isValid = false;
    }

    // Validar términos y condiciones
    if (!this.formData.terms) {
      this.errors.terms = 'Debe aceptar los términos y condiciones';
      isValid = false;
    }

    return isValid;
  }

  // Validar formato de email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Enviar formulario
// Enviar formulario
enviarFormulario() {
  this.mostrarErrores = true;
  
  if (this.validarFormulario()) {
    console.log('Formulario válido, procesando nombres...');

    // Dividir nombre en primer_nombre y segundo_nombre
    const [primerNombre, ...restoNombre] = this.formData.nombre.trim().split(' ');
    const segundoNombre = restoNombre.join(' '); // si solo escribió uno, queda vacío

    // Dividir apellidos en primer_apellido y segundo_apellido
    const [primerApellido, ...restoApellido] = this.formData.apellidos.trim().split(' ');
    const segundoApellido = restoApellido.join(' '); // si solo escribió uno, queda vacío

    // Crear payload para enviar a Laravel
    const payload = {
      primer_nombre: primerNombre,
      segundo_nombre: segundoNombre || null,
      primer_apellido: primerApellido,
      segundo_apellido: segundoApellido || null,
      nombre_negocio: this.formData.nombre_negocio || null,
      email: this.formData.email,
      telefono: this.formData.telefono,
      direccion: this.formData.direccion,
      password: this.formData.password,
    };

    console.log('Payload final para la API:', payload);
    console.log('Es vendedor:', this.isVendedor);

    // Aquí llamas a tu API con HttpClient
    // this.http.post('http://localhost:8000/api/register', payload).subscribe(...)
  } else {
    console.log('Formulario inválido, mostrando errores');
  }
}
}
