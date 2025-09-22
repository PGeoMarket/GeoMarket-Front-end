import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EditPublication } from '../edit-publication/edit-publication';
import { DialogManager } from '../../../core/dialogs/dialog-manager';


@Component({
  selector: 'app-profile-seller',
  imports: [CommonModule, EditPublication],
  templateUrl: './profile-seller.html',
  styleUrl: './profile-seller.css'
})
export class ProfileSeller {
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });

   private dialogManager = inject(DialogManager);
      onOpenEdit() {
        this.dialogManager.openDialog('edit-seller', {
          data: { mode: 'create' }
        });
      }

}
