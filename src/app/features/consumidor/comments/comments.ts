import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentDTO, CommentService } from '../../../core/services/comment-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { UserDTO, UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class Comments implements OnInit {
  comments!: CommentDTO[];
  user!: UserDTO;
  ownComment!: CommentDTO;
  @Input() publication_id!: number;
  @Input() seller_id!: number;

  dialogManager = inject(DialogManager);
  //Solo para pruebas

  constructor(private commentService: CommentService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserData();
    this.loadComments();
  }

  loadComments() {
    console.log(this.publication_id);

    this.commentService.getCommentByPublication(this.publication_id)
      .subscribe({
        next: data => {
          this.comments = data
        },
        error: error => console.error('Error al cargar  comentarios', error),
        complete: () => {
          console.log('Cantidad de comentarios cargados correctamente: ' + this.comments.length)
          this.checkUserComments();

        },

      })

  }

  //si el user ya tiene comment
  checkUserComments() {
    this.ownComment = this.comments.find(comment => comment.user.id === this.user.id)!;
    console.log(this.ownComment);

  }

  onRatePublication() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', {
        data: { mode: 'create' }
      });

      return;
    }

    this.dialogManager.openDialog('rate-publication', {
      data: { publication_id: this.publication_id, user_id: this.user?.id, ownComment: this.ownComment },
      onClose: (res) => {
        console.log('cerrado con', res);
        this.loadComments();
      }

    });

  }

  removeOwnComment() {
    this.commentService.delete(this.ownComment.id!)
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: error => console.error('Error al eliminar comentario', error),
        complete: () => {
          console.log('Comentario eliminado con extio');
          this.loadComments();
        },
      });


  }

  getUserData() {
    this.userService.getMe().subscribe();
    this.user = this.userService.getCurrentUser()!;
    console.log(this.user);
  }

}
