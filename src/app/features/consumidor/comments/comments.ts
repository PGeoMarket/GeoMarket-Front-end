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
  user!: UserDTO[];
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
        next: data => {
          this.comments = data                    
        },
        error: error => console.error('Error al cargar  comentarios', error),
        complete: () => { console.log('Cantidad de comentarios cargados correctamente: ' + this.comments.length) },

      })
      console.log(this.comments)
      
/* 
      this.comments.forEach((comment, index)=> {
        this.userService.getById(comment.user_id)
        .subscribe({
          next: data => {
            
            
          }
        })
        
      }) */
      
  }

  onRatePublication() {
    if (!this.userService.isLoggedIn()) {
      this.dialogManager.openDialog('login', {
        data: { mode: 'create' }
      });

      return;
    }

    //
    const user = this.userService.getCurrentUser();
    this.dialogManager.openDialog('rate-publication', {
      data: { publication_id: this.publication_id, user_id: user?.id },
      onClose: (res) => {
        console.log('cerrado con', res);
        this.loadComments();
      }

    });

  }

}
