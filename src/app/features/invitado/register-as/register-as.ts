import { Component, inject } from '@angular/core';
import { Register } from '../register/register';
import { CommonModule } from '@angular/common';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { RegisterService } from '../../../core/services/register-service';


@Component({
  selector: 'app-register-as',
  imports: [CommonModule, Closedialog],
  templateUrl: './register-as.html',
  styleUrl: './register-as.css'
})
export class RegisterAs {

  constructor (private registerService: RegisterService) {}
  dialogManager = inject(DialogManager)

  onRegister(rol: string) {
    this.registerService.sendData(rol);

    this.dialogManager.openDialog('register', {
      data: { mode: 'create' }
    })
  }

}
