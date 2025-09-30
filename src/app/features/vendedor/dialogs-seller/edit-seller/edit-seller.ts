import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO, UserService } from '../../../../core/services/user-service';
import { SellerService } from '../../../../core/services/seller-service'; // 👈 IMPORTAR
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
import { forkJoin } from 'rxjs'; // 👈 IMPORTAR

@Component({
  selector: 'app-edit-seller',
  standalone: true,
  imports: [Closedialog, CommonModule, FormsModule],
  templateUrl: './edit-seller.html',
  styleUrls: ['./edit-seller.css'],
})
export class EditSeller implements OnInit {
  user!: UserDTO;
  user_edit!: UserDTO;
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  showSuccessMessage = false;
  showErrorMessage = false;
  isLoading = false;

  dialogManager = inject(DialogManager);

  constructor(
    private userService: UserService,
    private sellerService: SellerService // 👈 INYECTAR
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getMe().subscribe({
      next: (response) => {
        this.user = response.user;
        this.user_edit = JSON.parse(JSON.stringify(this.user));
        this.isLoading = false;
      },
      error: (err) => {
        this.showErrorMessage = true;
        this.isLoading = false;
        console.error('Error cargando usuario:', err);
      }
    });
  }

  saveChanges(): void {
  if (!this.user_edit) return;
  
  this.isLoading = true;
  this.showSuccessMessage = false;
  this.showErrorMessage = false;

  if (this.imageFile) {
    this.user_edit.imagen = this.imageFile;
  }

  // ✅ Primero actualizar usuario
  this.userService.update(this.user_edit.id, this.user_edit).subscribe({
    next: (updatedUser) => {
      this.user = updatedUser;
      
      // ✅ Luego actualizar seller si existe
      if (this.user_edit.seller?.id) {
        this.sellerService.updateSeller(
          this.user_edit.seller.id, 
          this.user_edit.seller
        ).subscribe({
          next: (updatedSeller) => {
            this.user.seller = updatedSeller;
            this.user_edit = JSON.parse(JSON.stringify(this.user));
            this.showSuccessMessage = true;
            this.isLoading = false;
            
            setTimeout(() => {
                  window.location.reload();
                }, 1000)
            this.userService.getMe().subscribe()
            this.dialogManager.closeDialog()
          },
          error: (err) => {
            this.showErrorMessage = true;
            this.isLoading = false;
            console.error('Error actualizando seller:', err);
          }
        });
      } else {
        // No hay seller, solo se actualizó el usuario
        this.user_edit = JSON.parse(JSON.stringify(this.user));
        this.showSuccessMessage = true;
        this.isLoading = false;
        
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }
    },
    error: (err) => {
      this.showErrorMessage = true;
      this.isLoading = false;
      console.error('Error actualizando usuario:', err);
    }
  });
}

  onImageSelected(event: Event): void {
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

  onResetImage(): void {
    this.imagePreview = null;
    this.imageFile = null;
    const fileInput = document.getElementById('upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}