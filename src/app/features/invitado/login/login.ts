import { Component, inject } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { loginDTO, LoginService } from '../../../core/services/login-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  errorMessage: string = '';
  isLoading: boolean = false;
  
  dialogManager = inject(DialogManager);

  constructor(private loginService: LoginService, private router: Router) { }

  onRegisterAs() {
    this.dialogManager.openDialog('register-as', {
      data: { mode: 'create' }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid || this.isLoading) return;

    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.errorMessage = '';
    this.isLoading = true;

    this.loginService.login(this.login).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        console.log('Token:', this.loginService.getToken());
        console.log('Usuario:', response.user);
        console.log('Rol:', response.user.role!.nombre);
        
        this.showSuccessMessage = true;
        
        // Ocultar mensaje después de 1 segundo y navegar
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl('/home');
          this.dialogManager.closeDialog();
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error en login', err);
        console.error('err.error:', err.error);
        console.error('err.error.message:', err.error?.message);
        
        this.isLoading = false;
        this.showErrorMessage = true;
        
        // Extraer mensaje del error
        this.errorMessage = this.extractErrorMessage(err);
        
        console.log('Mensaje mostrado:', this.errorMessage);
        
       
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 6000);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private extractErrorMessage(err: HttpErrorResponse): string {
    return err.error?.message || 'Error al iniciar sesión. Intenta nuevamente.';
  }
  
}