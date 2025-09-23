import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogManager } from '../../../dialogs/dialog-manager';
import { LoginService } from '../../../services/login-service';
import { UserService } from '../../../services/user-service';


@Component({
  selector: 'app-buyer',
  imports: [RouterLink],
  templateUrl: './buyer-slidebar.html',
  styleUrl: './buyer-slidebar.css'
})
export class BuyerSlidebar {
 private dialogManager = inject(DialogManager);

 constructor(private loginService: LoginService,private userService: UserService) {}
   
 
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
}
