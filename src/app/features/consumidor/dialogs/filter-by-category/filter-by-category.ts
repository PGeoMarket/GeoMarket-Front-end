import { Component } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { PublicationDTO, PublicationService } from '../../../../core/services/publication-service';
import { FormsModule } from '@angular/forms';
import { Publications } from '../../publications/publications';

@Component({
  selector: 'app-filter-by-category',
  imports: [Closedialog, FormsModule],
  templateUrl: './filter-by-category.html',
  styleUrl: './filter-by-category.css'
})
export class FilterByCategory extends Publications {
// array con ids seleccionados
  selectedIds: number[] = [];
  scope: string = '&filter[category_id]=';
  publicationsFiltred!: PublicationDTO[];

  onCategoryChange(checked: boolean, categoryId: number) {
    if (checked) {
      if (!this.selectedIds.includes(categoryId)) {
        this.selectedIds.push(categoryId);
      }
    } else {
      this.selectedIds = this.selectedIds.filter(id => id !== categoryId);
    }
  }


  applyFilter() {
    this.scopeCategoryIds = this.scope + this.selectedIds;
    console.log(this.scopeCategoryIds);
    this.loadFiltredPublications();
/*     this.publicationService.getFilterPublication(this.scopeCategoryIds)
    .subscribe({
      next: data => this.publications = data,
      error: error => error.log('Error a publications filtradas: '+error),
      complete: () => console.log('publications filtradas:'),
       
    })  */  
    
  }
}
