import { Component, inject } from '@angular/core';
import { DialogManager } from '../../../dialogs/dialog-manager';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin-slidebar.html',
  styleUrl: './admin-slidebar.css'
})
export class AdminSlidebar {
 private dialogManager = inject(DialogManager);
  onFaq() {
    this.dialogManager.openDialog('faq', {
      data: { mode: 'create' }
    });
  }
}
