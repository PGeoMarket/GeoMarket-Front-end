import { Component } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { FaqDTO, FaqService } from '../../../core/services/faq-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [Closedialog, FormsModule, CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  faq: FaqDTO = {
    mensaje: '',
    user_id: 1 // ⚡ Aquí deberías asignar el ID del usuario autenticado
  };

  // Estados para el feedback
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private faqService: FaqService) { }

  onSubmit(mensaje: string) {
    this.faq.mensaje = mensaje;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    this.faqService.create(this.faq).subscribe({
      next: (resp) => {
        console.log('Mensaje enviado ✅', resp);
        this.faq.mensaje = ''; // limpiar textarea
        this.showSuccessMessage = true;
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error al enviar ❌', err);
        this.showErrorMessage = true;
        
        // Ocultar el mensaje de error después de 3 segundos
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    });
  }
}