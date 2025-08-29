import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Agrega CommonModule aquí
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  product = {
    name: '',
    price: null,
    category: '',
    description: ''
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
    // lógica para enviar el formulario
    console.log(this.product, this.imageFile);
  }

  onCancel() {
    this.product = { name: '', price: null, category: '', description: '' };
    this.imagePreview = null;
    this.imageFile = null;
  }
}