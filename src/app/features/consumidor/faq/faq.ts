import { Component } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { FaqDTO, FaqService } from '../../../core/services/faq-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  imports: [Closedialog, FormsModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  faq: FaqDTO = {
    mensaje: '',
    user_id: 1 // ⚡ Aquí deberías asignar el ID del usuario autenticado
  };

  constructor(private faqService: FaqService) { }

  onSubmit(mensaje:string) {
    this.faq.mensaje=mensaje;
    this.faqService.create(this.faq).subscribe({
      next: (resp) => {
        console.log('Mensaje enviado ✅', resp);
        this.faq.mensaje = ''; // limpiar textarea
      },
      error: (err) => {
        console.error('Error al enviar ❌', err);
      }
    });
  }
}
