import { Component } from '@angular/core';
import { Register } from '../register/register';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register-as',
  imports: [CommonModule,Register],
  templateUrl: './register-as.html',
  styleUrl: './register-as.css'
})
export class RegisterAs {
volver() {
throw new Error('Method not implemented.');
}
enviarFormulario() {
throw new Error('Method not implemented.');
}
isVendedor: any;
cancelar() {
throw new Error('Method not implemented.');
}
 // Controla qué vista mostrar
  mostrarSelector: boolean = true;
  tipoSeleccionado: string = '';

  // Método para seleccionar tipo de usuario
  seleccionarTipo(tipo: 'vendedor' | 'consumidor') {
    this.tipoSeleccionado = tipo;
    this.mostrarSelector = false; // Oculta selector y muestra formulario
  }

  // Método para volver al selector
  volverAlSelector() {
    this.mostrarSelector = true;
    this.tipoSeleccionado = '';
  }

  // Método para cerrar todo el modal
  cerrarModal() {
    console.log('Cerrando modal principal');
    // Aquí emitirías evento al componente padre
  }
}
