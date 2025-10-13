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
  
  // Recibir seller_id desde componente padre
  @Input() seller_id?: number | null;
  
  // Si no viene seller_id, usar el del usuario actual
  @Input() useCurrentUserSeller: boolean = false;
  
  comments: CommentDTO[] = [];
  
  constructor(
    private commentService: CommentService, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const sellerId = this.getSellerIdToUse();
    
    if (sellerId) {
      this.loadComments(sellerId);
    } else {
      console.warn('No se proporcionó seller_id');
    }
  }

  /**
   * Determina qué seller_id usar según las entradas
   */
  private getSellerIdToUse(): number | null {
    // Prioridad 1: seller_id pasado como @Input
    if (this.seller_id) {
      return this.seller_id;
    }
    
    // Prioridad 2: Usar seller del usuario actual si está habilitado
    if (this.useCurrentUserSeller) {
      return this.userService.getSellerId();
    }
    
    return null;
  }

  /**
   * Cargar comentarios del seller
   */
  private loadComments(sellerId: number): void {
    this.commentService.getSellerByComments(sellerId).subscribe({
      next: (data) => {
        this.comments = data;
        console.log(`✅ ${data.length} comentarios cargados para seller ${sellerId}`);
      },
      error: (err) => {
        console.error('❌ Error cargando comentarios:', err);
        this.comments = [];
      }
    });
  }
}