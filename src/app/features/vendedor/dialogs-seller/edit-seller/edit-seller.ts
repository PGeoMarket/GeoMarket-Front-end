import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO, UserService } from '../../../../core/services/user-service';
import { SellerService } from '../../../../core/services/seller-service';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';

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

  // ✅ Variables para manejar los teléfonos
  telefonoPrincipal: string = '';
  telefonoSecundario: string = '';

  dialogManager = inject(DialogManager);

  constructor(
    private userService: UserService,
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getMe().subscribe({
      next: (response) => {
        this.user = response.user;
        this.user_edit = JSON.parse(JSON.stringify(this.user));
        
        // ✅ Extraer teléfonos del array
        if (this.user_edit.seller?.phones) {
          this.telefonoPrincipal = this.user_edit.seller.phones[0]?.numero_telefono?.toString() || '';
          this.telefonoSecundario = this.user_edit.seller.phones[1]?.numero_telefono?.toString() || '';
        }
        
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

    // ✅ Actualizar usuario
    this.userService.update(this.user_edit.id, this.user_edit).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        
        // ✅ Actualizar seller si existe
        if (this.user_edit.seller?.id) {
          // ✅ Construir array de teléfonos para enviar al backend
          const telefonosArray: number[] = [];
          
          if (this.telefonoPrincipal && this.telefonoPrincipal.trim() !== '') {
            telefonosArray.push(Number(this.telefonoPrincipal));
          }
          
          if (this.telefonoSecundario && this.telefonoSecundario.trim() !== '') {
            telefonosArray.push(Number(this.telefonoSecundario));
          }

          // ✅ Preparar datos del seller con teléfonos
          const sellerData = {
            ...this.user_edit.seller,
            telefonos: telefonosArray // ✅ Array de números como espera el backend
          };

          this.sellerService.updateSeller(
            this.user_edit.seller.id, 
            sellerData
          ).subscribe({
            next: (updatedSeller) => {
              this.user.seller = updatedSeller;
              this.user_edit = JSON.parse(JSON.stringify(this.user));
              this.showSuccessMessage = true;
              this.isLoading = false;
              
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              
              this.userService.getMe().subscribe();
              this.dialogManager.closeDialog();
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