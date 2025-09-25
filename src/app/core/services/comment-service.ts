import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PublicationService } from './publication-service';

export interface CommentDTO {
  id?: number;
  texto?: string;
  valor_estrella?: number;
  user_id: number;
  publication_id: number | null;
  created_at?: string;
  user: UserDTO;
}

export interface UserDTO {
  id: number;
  primer_nombre: string;
  segundo_nombre: string | null;
  primer_apellido: string;
  segundo_apellido: string | null;
  image: ImageDTO | null;
}

export interface ImageDTO {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService extends CrudService<CommentDTO> {
  protected override endpoint = 'comments';
  private filter_by_publication = 'filter[publication_id]';

    private publicationIdSubject = new BehaviorSubject<number | null>(null);
    publicationIdChanged$ = this.publicationIdSubject.asObservable();

  publicationService =  inject(PublicationService);
  constructor(http: HttpClient) {
    super(http);
  }
  
  getCommentByPublication (publication_id: number) : Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.API_URL}/${this.endpoint}?${this.filter_by_publication}=${publication_id}`)
  }

    sendPublicationId(publication_id: number) {
      this.publicationIdSubject.next(publication_id);
    }

    getSellerByComments(seller_id: number): Observable<any> { 
  return this.http.get<any>(`${this.API_URL}/sellers/${seller_id}?include=publications.comments.user`);
}

}
