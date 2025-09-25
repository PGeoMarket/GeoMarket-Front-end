import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentDTO, CommentService } from '../../../core/services/comment-service';

@Component({
  selector: 'app-comments-profile',
  imports: [CommonModule],
  templateUrl: './comments-profile.html',
  styleUrl: './comments-profile.css'
})
export class CommentsProfile implements OnInit {
  @Input() sellerId!: number;

  comments: CommentDTO[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    if (this.sellerId) {
      this.commentService.getSellerByComments(this.sellerId).subscribe({
        next: (comments) => (this.comments = comments),
        error: (err) => console.error('Error cargando comentarios:', err)
      });
    }
  }
}