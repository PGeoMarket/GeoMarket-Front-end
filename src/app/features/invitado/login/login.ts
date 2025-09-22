import { Component, inject } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { loginDTO, LoginService } from '../../../core/services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Closedialog, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  login: loginDTO = {
    email: '',
    password: ''
  };

  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  
  dialogManager = inject(DialogManager);

  onRegisterAs() {
    this.dialogManager.openDialog('register-as', {
      data: { mode: 'create' }
    });
  }

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit(form: any) {
    if (form.invalid) return;

    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    this.loginService.login(this.login).subscribe({
      next: (resp: { token: string; }) => {
        console.log('✅ Login exitoso', resp);
        localStorage.setItem('token', resp.token);
        this.showSuccessMessage = true;
        
        // Ocultar mensaje después de 2 segundos
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl('/home')
          this.dialogManager.closeDialog()
        }, 1000);
      },
      error: (err: any) => {
        console.error('❌ Error en login', err);
        this.showErrorMessage = true;
        
        // Ocultar mensaje de error después de 3 segundos
        setTimeout(() => {
          this.showErrorMessage = false;

        }, 3000);
      }
    });
  }
}