import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { FaqDTO, FaqService } from '../../../core/services/faq-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user-service';
import { DialogManager } from '../../../core/dialogs/dialog-manager';


@Component({
  selector: 'app-faq',
  imports: [Closedialog, FormsModule, CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})

export class Faq {
dialogManager = inject(DialogManager);

  faq: FaqDTO = {
    mensaje: '',
    user_id:  0// ⚡ Aquí deberías asignar el ID del usuario autenticado
  };

  // Estados para el feedback
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private faqService: FaqService, private UserService:UserService) { 
    this.faq.user_id=UserService.getUserId()
  }


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
this.OnSubmitFaq();
        }, 1000);
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
  OnSubmitFaq() {
    this.dialogManager.closeDialog()
   this.dialogManager.
    openDialog('submit-faq', {
      data: { mode: 'create' }
    }); 
  }
}