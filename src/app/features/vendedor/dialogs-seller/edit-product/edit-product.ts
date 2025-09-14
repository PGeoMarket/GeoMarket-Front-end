import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Closedialog } from '../../../../core/dialogs/closedialog'; 
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { Publication, PublicationService } from '../../../../core/services/publication-service'; 


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, Closedialog],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {
  @Input() publication!: Publication;    // Input desde el padre
  product?: Publication;                 // Inicializado en ngOnInit
  id?: number;                           // Inicializado en ngOnInit
  @Output() updated = new EventEmitter<void>();

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    // Inicializamos las variables a partir del Input
    if (this.publication) {
      this.product = { ...this.publication }; // copia para no mutar el original
      this.id = this.publication.id;
    }
    
  }

  onSubmit() {
    if (this.id && this.product) {
      console.log(this.product);
      
      this.publicationService.updatePublication(this.id, this.product).
      subscribe({
      next: (data) => {
        console.log('Actualización exitosa', data);
        this.dialogManager.closeDialog();
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        // opcional: mostrar mensaje de error
      }
    });
    }
  }

  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  onCancel() {
    // lógica para cancelar la edición (si quieres cerrar desde aquí, tendrás que
    // notificar al padre o usar DialogManager; por ahora lo dejo vacío porque
    // dijiste no agregar nada innecesario)
  }

  private dialogManager = inject(DialogManager)

  onCloseDialog() {
    this.dialogManager.closeDialog();
  }
}