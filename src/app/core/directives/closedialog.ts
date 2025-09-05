import { Directive, inject } from '@angular/core';
import { Dialog } from '../services/dialog';

@Directive({
  selector: '[appClosedialog]',
      exportAs: 'appClosedialog',
    host: {
        '(click)': 'closeDialog()'
    }
})
export class Closedialog {

  private _dialogRef = inject(Dialog, {optional: true});
    

    closeDialog() {
        if(!this._dialogRef) return;
        this._dialogRef.closeDialog();
    }
}