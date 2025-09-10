import { Component, inject, OnInit, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog'; 
import { EditProduct } from '../dialogs/edit-product/edit-product'; 
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { PublicationDTO, PublicationService } from '../../../core/services/publication-service'; 
import { CommonModule, NgStyle } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private publicationService: PublicationService, private router:Router) { }

  ngOnInit(): void {
    this.publicationService.getAll()
      .subscribe({
        next: data => {this.publications = data; console.log(this.publications);
        }
        
      })
  }
  onEditProduct(publication: PublicationDTO) {
    this.selectedPublication = publication;

    this.dialogManager.openDialog('edit-product', {
      data: { publication: this.selectedPublication } // Pasamos todo el objeto
    });
  }

  onDeleteProduct(id:number) {
    this.publicationService.delete(id).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/profile-seller']);

      },

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
