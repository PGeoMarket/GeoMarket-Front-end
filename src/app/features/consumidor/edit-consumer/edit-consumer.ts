import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud-service';
import { DialogManager } from '../../../core/dialogs/dialog-manager';

@Component({
  standalone: true,                             // ← obliga a declarar standalone
  selector: 'app-edit-consumer',
  imports: [Closedialog, CommonModule, FormsModule],
  templateUrl: './edit-consumer.html',
  styleUrls: ['./edit-consumer.css']            // ← corregido: styleUrls en plural
})
export class EditConsumer
  extends CrudService<UserDTO>
  implements OnInit                         // ← ahora implementas OnInit
{
  protected override endpoint = 'users';
  emailTaken!: boolean;
  showSuccessMessage = false;
  showErrorMessage = false;
  user!: UserDTO;
  user_edit!: UserDTO;
  isLoading = false;
  
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  dialogManager = inject(DialogManager);

  constructor(
    private userService: UserService,      // ← inyección en minúscula para usarla abajo
    http: HttpClient
  ) {
    super(http);
  }

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
        if (this.user_edit.id) {
          // No hay seller, solo se actualizó el usuario
          this.user_edit = JSON.parse(JSON.stringify(this.user));
          this.showSuccessMessage = true;
          this.isLoading = false;

          setTimeout(() => {
                  window.location.reload();
                }, 1000)
            this.userService.getMe().subscribe()
            this.dialogManager.closeDialog()
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
