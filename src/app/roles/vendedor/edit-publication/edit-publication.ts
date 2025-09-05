import { Component, inject, OnInit, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { Dialog } from '../../../core/services/dialog';
import { Closedialog } from '../../../core/directives/closedialog';
import { EditProduct } from '../edit-product/edit-product';
import { DialogManager } from '../../../core/services/dialog-manager';
import { Publication } from '../../../core/models/models';
import { ApiService } from '../../../core/services/api';
import { CommonModule, NgStyle } from '@angular/common'; 

@Component({
  selector: 'app-edit-publication',
  imports: [EditProduct, Closedialog, NgStyle, CommonModule],
  templateUrl: './edit-publication.html',
  styleUrl: './edit-publication.css'
})
export class EditPublication implements OnInit {
  repeat = Array.from({ length: 16 });
  publications!: Publication[];
  
  private dialogManager = inject(DialogManager);

  constructor (private api:ApiService) {}

  ngOnInit(): void {
    this.api.getPublications()
    .subscribe({
      next: data => this.publications = data,
    })
  }
  onEditProduct() {
    this.dialogManager.openDialog('edit-product', {
      data: { mode: 'create' }
    });
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
