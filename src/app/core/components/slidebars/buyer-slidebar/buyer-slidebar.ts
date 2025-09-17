import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogManager } from '../../../dialogs/dialog-manager';


@Component({
  selector: 'app-buyer',
  imports: [RouterLink],
  templateUrl: './buyer-slidebar.html',
  styleUrl: './buyer-slidebar.css'
})
export class BuyerSlidebar {
 private dialogManager = inject(DialogManager);
 
  onFaq() {
    this.dialogManager.openDialog('faq', {
      data: { mode: 'create' }
    });
  }
}
