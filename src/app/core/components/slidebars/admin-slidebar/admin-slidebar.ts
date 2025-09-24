import { Component, inject, OnInit } from '@angular/core';
import { DialogManager } from '../../../dialogs/dialog-manager';
import { UserDTO, UserService } from '../../../services/user-service';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin-slidebar.html',
  styleUrl: './admin-slidebar.css'
})
export class AdminSlidebar implements OnInit{
 private dialogManager = inject(DialogManager);
  onFaq() {
    this.dialogManager.openDialog('faq', {
      data: { mode: 'create' }
    });
  }
  user: UserDTO | null = null;
  constructor(private userService:UserService , private loginService:LoginService){}
  ngOnInit(): void {
    this.getUserData();
  }


  getUserData() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
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
