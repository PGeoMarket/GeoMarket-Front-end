import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicationService } from './publication-service';

export interface CommentDTO {
  id?: number;
  texto?: string;
  valor_estrella?: number;
  user_id: number;
  publication_id: number | null;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService extends CrudService<CommentDTO> {
  protected override endpoint = 'comments';
  private filter_by_publication = 'filter[publication_id]';

  publicationService =  inject(PublicationService);
  constructor(http: HttpClient) {
    super(http);
  }
  
  getCommentByPublication (publication_id: number) : Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.API_URL}/${this.endpoint}?${this.filter_by_publication}=${publication_id}`)
  }
}
