import { Component, Input, OnInit } from '@angular/core';
import { CommentDTO, CommentService } from '../../../core/services/comment-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments-profile',
  imports: [CommonModule],
  templateUrl: './comments-profile.html',
  styleUrl: './comments-profile.css'
})
export class CommentsProfile implements OnInit {
  @Input() seller_id!: number;
  comments: CommentDTO[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    if (this.seller_id) {
      this.loadComments();
    }
  }

  loadComments(): void {
    this.commentService.getSellerByComments(this.seller_id)
      .subscribe({
        next: (res) => {
          // Extraer publicaciones -> comentarios
          const publications = res.seller?.publications || [];
          this.comments = publications.flatMap((p: any) => p.comments || []);
        },
        error: (err) => console.error('Error cargando comentarios del seller', err),
        complete: () => console.log('Comentarios cargados:', this.comments.length)
      });
  }

    
}
