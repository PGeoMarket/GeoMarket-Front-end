import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
/* import { PublicationModel } from ; */
import { PublicationModel, PublicationService } from '../../../../core/services/publication-service';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, Closedialog], // <-- Agrega CommonModule aquí
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  product: PublicationModel = {
    title: "",
    price: null as number | null,
    description: "",
    sellerId: 1,
    image: {
      url: "https://images7.memedroid.com/images/UPLOADED555/62c1103df10b7.jpeg",
    }

  }

  private dialogManager = inject(DialogManager);

  constructor(private publicationService: PublicationService, private router: Router) { }

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
        ...this.product
      };

      this.publicationService.createPublication(payload).subscribe({
        next: (data) => {
          console.log('Creación exitosa', data);
          this.dialogManager.closeDialog();
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }


  onCancel() {
    this.dialogManager.closeDialog();
  }

}
