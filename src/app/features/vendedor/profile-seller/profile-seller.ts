import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EditPublication } from '../edit-publication/edit-publication';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserDTO, UserService } from '../../../core/services/user-service';


@Component({
  selector: 'app-profile-seller',
  imports: [CommonModule, EditPublication],
  templateUrl: './profile-seller.html',
  styleUrl: './profile-seller.css'
})
export class ProfileSeller implements OnInit {
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });

  private dialogManager = inject(DialogManager);
  onOpenEdit() {
    this.dialogManager.openDialog('edit-seller', {
      data: { mode: 'create' }
    });
  }
  user: UserDTO | null = null;

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }
}
