import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  
 // Recibe si es vendedor desde el componente padre
  @Input() isVendedor: boolean = false;
  
  // Eventos hacia el componente padre
  @Output() volverAtras = new EventEmitter<void>();
  @Output() cerrarModal = new EventEmitter<void>();

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
  
  // Método para volver al selector
  volver() {
    this.volverAtras.emit();
  }
  
  // Cerrar modal completamente
  cerrar() {
    this.cerrarModal.emit();
  }
  
  // Cancelar registro (vuelve al selector)
  cancelar() {
    this.volver();
  }
  
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
  enviarFormulario() {
    this.mostrarErrores = true;
    
    if (this.validarFormulario()) {
      console.log('Formulario válido, enviando datos...');
      console.log('Es vendedor:', this.isVendedor);
      console.log('Datos:', this.formData);
      
      // Aquí harías la llamada al backend
      // this.authService.register(this.formData, this.isVendedor ? 'vendedor' : 'consumidor');
    } else {
      console.log('Formulario inválido, mostrando errores');
    }
  }
}
