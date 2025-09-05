import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { DialogManager } from '../../../core/services/dialog-manager';
import { Publication } from '../../../core/models/models';
import { ApiService } from '../../../core/services/api';
import { Closedialog } from '../../../core/directives/closedialog';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, Closedialog], // <-- Agrega CommonModule aquí
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  product: Publication = {
    titulo: '',
    precio: 0,
    descripcion: '',
    visibilidad: true,
    seller_id: 0,
    category_id: 1,
    image: { url: 'https://images7.memedroid.com/images/UPLOADED555/62c1103df10b7.jpeg', imageable_type: '', imageable_id: '' }
  };

  private dialogManager = inject(DialogManager);

  constructor(private api: ApiService) { }

  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;

/*   onImageSelected(event: Event) {
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
    this.product.image.url = '';
  } */

  onSubmit() {
  if (this.product) {
    const payload = {
      ...this.product,
      seller_id: 1,               // valor fijo
      imagen: this.product.image.url // <- aquí va la URL directamente
    };

    this.api.createPublication(payload).subscribe({
      next: (res) => {
        console.log('Creación exitosa', res);
        this.dialogManager.closeDialog();
        setTimeout(() => window.location.reload(), 50);
      },
      error: (err) => console.error('Error al crear', err)
    });
  }
}


  onCancel() {
    this.dialogManager.closeDialog();
  }

  onCloseDialog() {
    this.dialogManager.closeDialog();
  }
}
