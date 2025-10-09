import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentDTO, CommentService } from '../../../core/services/comment-service';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-comments-profile',
  imports: [CommonModule],
  templateUrl: './comments-profile.html',
  styleUrl: './comments-profile.css'
})
export class CommentsProfile implements OnInit{
  
  comments: CommentDTO[] = [];
    constructor(
    private commentService: CommentService, private userService: UserService) {}

  private getSellerId(): number | null {

    const sellerId = this.userService.getSellerId();
    console.log(sellerId);
    
    return sellerId || null;
  }

  ngOnInit(): void {
    const id = this.getSellerId();
    if (id) {
      this.commentService.getSellerByComments(id).subscribe({
        next: (data) => (this.comments = data),
        error: (err) => console.error('Error cargando comentarios:', err)
      });
    }
  }
}