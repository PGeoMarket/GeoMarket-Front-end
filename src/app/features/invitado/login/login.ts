import { Component, inject } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { loginDTO, LoginService } from '../../../core/services/login-service';

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


  dialogManager = inject(DialogManager)
  onRegisterAs() {
    this.dialogManager.openDialog('register-as', {
      data: { mode: 'create' }
    });
  }
  constructor(private loginService: LoginService) { }
  onSubmit(form: any) {
    if (form.invalid) return;

    this.loginService.login(this.login).subscribe({
      next: (resp: { token: string; }) => {
        console.log('✅ Login exitoso', resp);
        localStorage.setItem('token', resp.token);
      },
      error: (err: any) => {
        console.error('❌ Error en login', err);
      }
    });
  }

}
