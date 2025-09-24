import { Component, inject } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { Router } from '@angular/router';
import { DialogManager } from '../../../core/dialogs/dialog-manager';

@Component({
  selector: 'app-profile-consumer',
  imports: [Closedialog],
  templateUrl: './profile-consumer.html',
  styleUrl: './profile-consumer.css'
})
export class ProfileConsumer {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // o la ruta que quieras
  }

   private dialogManager = inject(DialogManager);
        onOpenEditConsumer() {
          this.dialogManager.openDialog('edit-consumer', {
            data: { mode: 'create' }
          });
        }
}
