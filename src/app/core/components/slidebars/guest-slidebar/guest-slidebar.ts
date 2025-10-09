import { Component, inject } from '@angular/core';
import { DialogManager } from '../../../dialogs/dialog-manager';

@Component({
  selector: 'app-guest',
  imports: [],
  templateUrl: './guest-slidebar.html',
  styleUrl: './guest-slidebar.css'
})
export class GuestSlidebar {
  dialogManager = inject(DialogManager);

  onRegisterAs() {
    this.dialogManager.openDialog('register-as', {
      data: { mode: 'create' }
    })
  }

  onRegister() {
    this.dialogManager.openDialog('Register', {
      data: { mode: 'create' }
    })
  }

  onLogin() {
    this.dialogManager.openDialog('login', {
      data: { mode: 'create' }
    });
  }

}