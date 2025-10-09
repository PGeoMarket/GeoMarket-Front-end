import { Component, inject, OnInit } from '@angular/core';
import { DialogManager } from '../../../dialogs/dialog-manager';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login-service';
import { UserDTO, UserService } from '../../../services/user-service';

@Component({
  selector: 'app-seller-slidebar',
  imports: [RouterLink],
  templateUrl: './seller-slidebar.html',
  styleUrl: './seller-slidebar.css'
})
export class SellerSlidebar implements OnInit {
  private dialogManager = inject(DialogManager);
  user: UserDTO | null = null;
 constructor(private loginService: LoginService,private userService: UserService) {}
  ngOnInit(): void {
    this.getUserData();
  }

  onAddProduct() {
    this.dialogManager.openDialog('add-product', {
      data: { mode: 'create' }
    });
  }
  onFaq() {
    this.dialogManager.openDialog('faq', {
      data: { mode: 'create' }
    });
  }

  onChats() {
    this.dialogManager.openDialog('chats', {
      data: { mode: 'create' }
    });
  }

  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        console.log('Logout exitoso');
      },
      error: () => {
        // Logout local aunque falle el servidor
        localStorage.clear();
        this.userService.clearUserData();
      }
    });
  }

   getUserData() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }
}
