import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PublicationService } from './publication-service';
import { UserDTO } from './user-service';

export interface CommentDTO {
  id?: number;
  texto?: string;
  valor_estrella?: number;
  user_id: number;
  publication_id: number | null;
  created_at?: string;
  user: UserDTO; // <-- opcional
}



@Injectable({
  providedIn: 'root'
})
export class CommentService extends CrudService<CommentDTO> {
  protected override endpoint = 'comments';
  private filter_by_publication = 'filter[publication_id]';

  private publicationIdSubject = new BehaviorSubject<number | null>(null);
  publicationIdChanged$ = this.publicationIdSubject.asObservable();

  publicationService = inject(PublicationService);
  constructor(http: HttpClient) {
    super(http);
  }

  getCommentByPublication(publication_id: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.API_URL}/${this.endpoint}?${this.filter_by_publication}=${publication_id}&included=user.image`)

  }

  sendPublicationId(publication_id: number) {
    this.publicationIdSubject.next(publication_id);
  }

  getSellerByComments(seller_id: number): Observable<CommentDTO[]> {
    console.log(`${this.API_URL}/sellers/${seller_id}?included=publications.comments.user.image`);
    
    return this.http
      .get<{ seller: { publications: { comments: CommentDTO[] }[] } }>(
        `${this.API_URL}/sellers/${seller_id}?included=publications.comments.user.image`
      )
      .pipe(
        map((response) => {
          const publications = response?.seller?.publications ?? [];
          return publications.flatMap((p) => p.comments ?? []);
        })
      );
  }




}
