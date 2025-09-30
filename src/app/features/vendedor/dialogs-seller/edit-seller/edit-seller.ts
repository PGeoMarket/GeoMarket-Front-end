import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerDTO } from '../../../../core/services/seller-service';
import { UserDTO, UserService } from '../../../../core/services/user-service';
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

  constructor(private userService: UserService) { }

dialogManager=inject(DialogManager)

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: updated => {
       console.log(updated +'hola');
        this.showSuccessMessage = true;
      },
      error: err => {
        this.showErrorMessage = true;
        console.error(err);
      },
      complete:() =>{
       
      }
    });;
/* console.log(this.userService.getMe()); */

    if (this.user?.seller) {
      this.user.seller = this.user.seller;
    }

    this.user_edit = { ...this.user }

  }

  saveChanges(): void {
    if (!this.user) return;

    this.userService.update(this.user_edit.id, this.user_edit).subscribe({
      next: updated => {
        this.user = updated;
        this.showSuccessMessage = true;
      },
      error: err => {
        this.showErrorMessage = true;
        console.error(err);
      },
      complete:() =>{
       
      }
    });
  }

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
}
