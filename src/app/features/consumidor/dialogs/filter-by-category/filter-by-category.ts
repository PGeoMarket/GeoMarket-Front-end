import { Component } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PublicationService } from '../../../../core/services/publication-service';

@Component({
  selector: 'app-filter-by-category',
  standalone: true,
  imports: [Closedialog, FormsModule, RouterModule],
  templateUrl: './filter-by-category.html',
  styleUrl: './filter-by-category.css'
})
export class FilterByCategory {
  // array con ids seleccionados
  selectedIds: number[] = [];
  scope: string = '&filter[category_id]=';
  filters: string = "";

  constructor (private publicationService: PublicationService) {}

  onCategoryChange(checked: boolean, categoryId: number) {
    if (checked) {
      if (this.selectedIds.includes(categoryId)) return;
      this.selectedIds.push(categoryId);
    } else {
      this.selectedIds = this.selectedIds.filter(id => id !== categoryId);
    }

  }


  applyFilter() {
    this.filters = ""; // Limpiar filtros anteriores
    this.selectedIds.forEach(
      selectedId => this.filters += (this.scope + selectedId)
    )
  this.publicationService.sendData(this.filters);
  }

}
