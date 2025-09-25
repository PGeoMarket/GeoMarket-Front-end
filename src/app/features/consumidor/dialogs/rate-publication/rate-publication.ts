import { Component, inject, Input, OnInit } from '@angular/core';
import { Closedialog } from "../../../../core/dialogs/closedialog";
import { FormsModule } from "@angular/forms";
import { CommentDTO, CommentService } from '../../../../core/services/comment-service';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';

@Component({
  selector: 'app-rate-publication',
  imports: [Closedialog, FormsModule],
  templateUrl: './rate-publication.html',
  styleUrl: './rate-publication.css'
})
export class RatePublication implements OnInit {
  submit_comment!: CommentDTO;
  @Input() publication_id!: number;
  @Input() user_id!: number;
  rating: number | null = null;

  constructor(private commentService: CommentService) { }

  dialogManager = inject(DialogManager)

  ngOnInit(): void {

    console.log(this.publication_id);

  }

  setRating(value: number) {
    this.rating = value;
  }


  onSubmit(comment_user: string) {
    if (!comment_user) return;
    this.submit_comment = {
      ...this.submit_comment,
      publication_id: this.publication_id,
      user_id: this.user_id,
      texto: comment_user,
      valor_estrella: this.rating!, //falta pantalla
    }
    this.commentService.create(this.submit_comment)
      .subscribe({
        next: data => {
          console.log(data);
          this.onCloseDialog({ saved: true, comment_user: data ?? this.submit_comment });
        },
        error: error => console.error('Error al crear comentario', error, this.submit_comment),
        complete: () => {
          console.log('Comentario hecho con extio');

        },
      })
  }

    onCloseDialog(result?: any) {
    // si el método _close fue inyectado al componente (por openDialog),
    // úsalo — eso cierra el overlay y ejecuta el callback onClose del llamador.
    const maybeClose = (this as any)._close;
    if (typeof maybeClose === 'function') {
      maybeClose(result);
      return;
    }

    // fallback: cerrar con el manager (no dispara onClose callback)
    this.dialogManager.closeDialog();
  }
}
