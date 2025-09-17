import { Component } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { PublicationDTO } from '../../../../core/services/publication-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-filter-by-category',
  imports: [Closedialog, FormsModule, RouterModule],
  templateUrl: './filter-by-category.html',
  styleUrl: './filter-by-category.css'
})
export class FilterByCategory {
// array con ids seleccionados
  selectedIds: number[] = [];
  scope: string = '&filter[category_id]=';
  publicationsFiltred!: PublicationDTO[];

onCategoryChange(checked: boolean, categoryId: number) {
  if (checked) {
    if (this.selectedIds.includes(categoryId)) return;
    this.selectedIds.push(categoryId);
  } else {
    this.selectedIds = this.selectedIds.filter(id => id !== categoryId);
  }
}


  applyFilter() {
   this.scope += this.selectedIds;
/*      this.router.navigate(['/home'], { 
    queryParams: { category: this.selectedIds } 
  }); */
   
    //this.loadFiltredPublications();
/*     this.publicationService.getFilterPublication(this.scopeCategoryIds)
    .subscribe({
      next: data => this.publications = data,
      error: error => error.log('Error a publications filtradas: '+error),
      complete: () => console.log('publications filtradas:'),
       
    })  */  
    
  }
}
