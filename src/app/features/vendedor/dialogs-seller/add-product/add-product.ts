import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
/* import { PublicationDTO } from ; */
import { PublicationDTO, PublicationService } from '../../../../core/services/publication-service';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, Closedialog],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  product: PublicationDTO = {
    titulo: "",
    precio: null as number | null,
    descripcion: "",
    seller_id: 1,
  }

  private dialogManager = inject(DialogManager);

  constructor(private publicationService: PublicationService, private router: Router) { }

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

  onSubmit() {
    if (this.product && this.imageFile) {
      const payload: PublicationDTO = {
        ...this.product,
        imagen: this.imageFile
      };

      this.publicationService.create(payload).subscribe({
        next: (data) => {
          console.log('Creación exitosa', data);
          this.publicationService.reloadPublication(true)
          this.dialogManager.closeDialog();
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }
}