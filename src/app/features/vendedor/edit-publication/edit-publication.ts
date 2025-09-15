import { Component, inject, OnInit, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { EditProduct } from '../dialogs-seller/edit-product/edit-product';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import {  PublicationDTO, PublicationService } from '../../../core/services/publication-service';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-edit-publication',
  imports: [EditProduct, Closedialog, NgStyle, CommonModule],
  templateUrl: './edit-publication.html',
  styleUrl: './edit-publication.css'
})
export class EditPublication implements OnInit {
  repeat = Array.from({ length: 16 });
  publications!: PublicationDTO[];
  selectedPublication!: PublicationDTO;

  private dialogManager = inject(DialogManager);

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications() {
    this.publicationService.getAllPublication()
      .subscribe({
        next: data => this.publications = data,
        error: error => console.error('No se pudo obtener las publicaciones: ' + error),
        complete: () => console.log('Publicaciones obtenidas correctamente')

      })
  }

  onEditProduct(publication: PublicationDTO) {
    this.selectedPublication = publication;

    this.dialogManager.openDialog('edit-product', {
      data: { publication: this.selectedPublication } // Pasamos todo el objeto
    });
  }

  onDeleteProduct(id: number) {
    this.publicationService.delete(id).subscribe({
      next: data => {
        console.log(data);
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        // opcional: mostrar mensaje de error
      }
    })
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
