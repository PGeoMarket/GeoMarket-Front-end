import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { PublicationDTO, PublicationService } from '../../../../core/services/publication-service';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, Closedialog],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {
  @Input() publication!: PublicationDTO;    // Input desde el padre
  product?: PublicationDTO;                 // Inicializado en ngOnInit
  id?: number;                           // Inicializado en ngOnInit

  constructor(private publicationService: PublicationService) { }
  private dialogManager = inject(DialogManager)

  ngOnInit(): void {
    // Inicializamos las variables a partir del Input
    if (this.publication) {
      this.product = { ...this.publication }; // copia para no mutar el original
      this.id = this.publication.id;
    }

  }

  onSubmit() {
    if (this.id && this.product) {
      const payload: PublicationDTO = {
        ...this.product,
        imagen: this.imageFile!
      };
      this.publicationService.update(this.id, payload).
        subscribe({
          next: (data) => {
            console.log('Actualización exitosa', data);
            this.onCloseDialog({ saved: true, publication: data ?? this.product });
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

    onResetImage() {
    this.imagePreview = null;
    this.imageFile = null;
    // Limpiar el input file
    const fileInput = document.getElementById('upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onCancel() {
    // lógica para cancelar la edición (si quieres cerrar desde aquí, tendrás que
    // notificar al padre o usar DialogManager; por ahora lo dejo vacío porque
    // dijiste no agregar nada innecesario)
  }

  onCloseDialog(result?: any) {
    // si el método _close fue inyectado al componente (por openDialog),
    // úsalo — eso cierra el overlay y ejecuta el callback onClose del llamador.
    const maybeClose = (this as any)._close;
    if (typeof maybeClose === 'function') {
      maybeClose(result);
      return;
    }

    
    // fallback: cerrar con el manager (no dispara onClose callback)
    this.dialogManager.closeDialog();
  }
}