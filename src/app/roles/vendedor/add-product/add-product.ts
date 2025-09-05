import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { DialogManager } from '../../../core/services/dialog-manager';

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
    description: '',
    hidden: false // <-- Agrega esta línea
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

  onResetImage() {
    this.imagePreview = null;
    this.imageFile = null;

  }

  onSubmit() {
    // lógica para enviar el formulario
    console.log(this.product, this.imageFile);
  }

  onCancel() {
    this.product = { name: '', price: null, category: '', description: '', hidden: false };
    this.imagePreview = null;
    this.imageFile = null;
  }

  private dialogManager = inject(DialogManager)

  onCloseDialog() {
    this.dialogManager.closeDialog();
  }
}