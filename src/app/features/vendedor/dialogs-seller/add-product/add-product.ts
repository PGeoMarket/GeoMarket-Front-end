import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';
/* import { PublicationDTO } from ; */
import { PublicationDTO, PublicationService } from '../../../../core/services/publication-service';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { Router } from '@angular/router';
import { UserDTO, UserService } from '../../../../core/services/user-service';
import { BehaviorSubject, finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, Closedialog],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct implements OnInit, OnDestroy {
  product: PublicationDTO = {
    titulo: "",
    precio: null as number | null,
    descripcion: "",
    visibilidad: 1
  }

  private destroy$ = new Subject<void>();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  user!: UserDTO;

  private dialogManager = inject(DialogManager);

  constructor(private publicationService: PublicationService, private router: Router, private userService: UserService) { }

  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()!;

    this.product = {
      ...this.product,
      seller_id: this.user.seller?.id,
    }

    console.log(this.user.seller!.id);

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onResetImage() {
    this.imagePreview = null;
    this.imageFile = null;
    // Limpiar el input file
    const fileInput = document.getElementById('upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    if (this.loadingSubject.value) return;

    if (this.product && this.imageFile) {
      this.loadingSubject.next(true);

      const payload: PublicationDTO = {
        ...this.product,
        imagen: this.imageFile
      };

      this.publicationService.create(payload)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe({
          next: (data) => {
            console.log('Creación exitosa', data);
            this.publicationService.reloadPublication(true);
            this.dialogManager.closeDialog();
          },
          error: (err) => {
            console.error('Error al crear', err);
          }
        });
    }
  }


}
