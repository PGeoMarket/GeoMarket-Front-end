import { Component, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { Dialog } from '../../../core/services/dialog';
import { Closedialog } from '../../../core/directives/closedialog';
import { EditProduct } from '../edit-product/edit-product';

@Component({
  selector: 'app-edit-publication',
  imports: [EditProduct, Closedialog],
  templateUrl: './edit-publication.html',
  styleUrl: './edit-publication.css'
})
export class EditPublication {
  repeat = Array.from({ length: 16 });

  dialogService = inject(Dialog);

  template = viewChild(TemplateRef);

  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  openDialog() {
    this.dialogService.openDialog(this.template()!, this.viewContainerRef()!);
  }

  openDialogComponent() {
    this.dialogService.openDialog(EditProduct);
  }

  //CHATGPT:
  editarIndex: number | null = null;


  abrirMenu(index: number, event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    this.editarIndex = this.editarIndex === index ? null : index;
  }

  cerrarMenus() {
    this.editarIndex = null;
  }
}
