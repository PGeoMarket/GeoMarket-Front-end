import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct {
  product = {
    name: 'Arroz florhuila',
    price: 1000,
    category: 'alimentos',
    description: 'Arroz blanco de grano largo, ideal para acompañar cualquier comida. Suave, esponjoso y fácil de preparar.'
  };
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

  onSubmit() {
    // lógica para enviar el formulario editado
    console.log(this.product, this.imageFile);
  }

  onCancel() {
    // lógica para cancelar la edición
  }
}