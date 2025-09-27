import { Component, OnInit } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerDTO } from '../../../core/services/seller-service';
import { UserDTO, UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-edit-seller',
  standalone: true,
  imports: [Closedialog, CommonModule, FormsModule],
  templateUrl: './edit-seller.html',
  styleUrls: ['./edit-seller.css'],
})
export class EditSeller implements OnInit {
  user: UserDTO | null = null;
  store: SellerDTO | null = null;

  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if (this.user?.seller) {
      this.store = this.user.seller;
    }
  }

  saveChanges(): void {
    if (!this.user) return;

    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: updated => {
        this.user = updated;
        this.store = updated.seller ?? null;
        this.showSuccessMessage = true;
      },
      error: err => {
        this.showErrorMessage = true;
        console.error(err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && this.user) {
      const file = input.files[0];

      // Vista previa inmediata
      const reader = new FileReader();
      reader.onload = () => {
        this.user!.image = { ...(this.user!.image ?? {}), url: reader.result as string };
      };
      reader.readAsDataURL(file);

      // Subir al backend
      this.userService.updateUserImage(this.user.id, file).subscribe({
        next: updated => this.user = updated,
        error: err => console.error(err)
      });
    }
  }
}
