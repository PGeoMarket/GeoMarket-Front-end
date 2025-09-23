import { Component, inject } from '@angular/core';
import { DialogManager } from '../../../dialogs/dialog-manager';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login-service';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-seller-slidebar',
  imports: [RouterLink],
  templateUrl: './seller-slidebar.html',
  styleUrl: './seller-slidebar.css'
})
export class SellerSlidebar {
  private dialogManager = inject(DialogManager);
 constructor(private loginService: LoginService,private userService: UserService) {}

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

}
