import { Component, Input, OnInit } from '@angular/core';
import { CommentDTO, CommentService } from '../../../core/services/comment-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class Comments implements OnInit{
  comments!: CommentDTO[];
  @Input() publication_id!: number;
  @Input() seller_id!: number;

  //Solo para pruebas
  submit_comment!: CommentDTO;
  
  constructor (private commentService: CommentService) {}

  ngOnInit(): void {
    this.submit_comment = {
    publication_id : this.publication_id,
    user_id:3,  
    }
    this.loadComments();
    
  }

  loadComments() {
    console.log(this.publication_id);
    
    this.commentService.getCommentByPublication(this.publication_id)
    .subscribe({
      next: data => this.comments = data,
      error: error => console.error('Error al cargar  comentarios', error),
      complete: () => {console.log('Cantidad de comentarios cargados correctamente: '+ this.comments.length)},
      
    })
  }

  onSubmit(comment_user: string) {
    if (!comment_user) return;
    this.submit_comment = {
      ...this.submit_comment,
      texto : comment_user,
      valor_estrella: 1, //falta pantalla
  }
    this.commentService.create(this.submit_comment)
    .subscribe({
      next: data => console.log(data),
      error: error => console.error('Error al crear comentario', error, this.submit_comment),
      complete: () => {
        console.log('Comentario hecho con extio');
        this.loadComments();
      },
      
      
    })
  }
  
}
