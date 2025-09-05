import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogManager } from '../../services/dialog-manager';
@Component({
  selector: 'app-seller',
  imports: [RouterLink],
  templateUrl: './seller.html',
  styleUrl: './seller.css'
})
export class Seller {
  private dialogManager = inject(DialogManager);

  onAddProduct() {
    this.dialogManager.openDialog('add-product', {
      data: { mode: 'create' }
    });
  }

}
