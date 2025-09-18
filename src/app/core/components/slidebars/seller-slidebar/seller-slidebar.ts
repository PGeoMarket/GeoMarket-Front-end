import { Component, inject } from '@angular/core';
import { DialogManager } from '../../../dialogs/dialog-manager';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-slidebar',
  imports: [RouterLink],
  templateUrl: './seller-slidebar.html',
  styleUrl: './seller-slidebar.css'
})
export class SellerSlidebar {
  private dialogManager = inject(DialogManager);

  onAddProduct() {
    this.dialogManager.openDialog('add-product', {
      data: { mode: 'create' }
    });
  }

}
