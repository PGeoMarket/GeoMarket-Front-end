import { Injectable } from '@angular/core';

export interface CategoryDTO {
  id?: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

}
