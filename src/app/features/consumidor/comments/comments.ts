import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentDTO, CommentService } from '../../../core/services/comment-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class Comments implements OnInit {
  comments!: CommentDTO[];
  @Input() publication_id!: number;
  @Input() seller_id!: number;

  dialogManager = inject(DialogManager);
  //Solo para pruebas

  constructor(private commentService: CommentService, private userService: UserService) { }

  ngOnInit(): void {

    this.loadComments();

  }

  loadComments() {
    console.log(this.publication_id);

    this.commentService.getCommentByPublication(this.publication_id)
      .subscribe({
        next: data => this.comments = data,
        error: error => console.error('Error al cargar  comentarios', error),
        complete: () => { console.log('Cantidad de comentarios cargados correctamente: ' + this.comments.length) },

      })
  }

  onRatePublication() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('rate-publication', {
        data: { mode: 'create' }
      });

      return;
    }

    //respectiva flotante/pantalla
    
  }
}
