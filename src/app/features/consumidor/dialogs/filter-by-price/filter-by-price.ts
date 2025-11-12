import { Component, inject } from '@angular/core';
import { Closedialog } from "../../../../core/dialogs/closedialog";
import { PublicationService } from '../../../../core/services/publication-service';
import { FormsModule } from '@angular/forms';
import { DialogManager } from '../../../../core/dialogs/dialog-manager';

@Component({
  selector: 'app-filter-by-price',
  imports: [Closedialog, FormsModule],
  templateUrl: './filter-by-price.html',
  styleUrl: './filter-by-price.css'
})
export class FilterByPrice {
  // array con ids seleccionados
  selectedIds: number[] = [];
  scope_min: string = '&filter[precio_min]=';
  scope_max: string = '&filter[precio_max]=';
  min_price: number = 0;
  max_price: number = 0;

  constructor (private publicationService: PublicationService) {}

  dialogManager = inject(DialogManager);

  applyFilter() {

    if (!this.min_price) {
      const filter = this.scope_max + this.max_price;
      this.publicationService.sendFilter(filter)
      this.dialogManager.closeDialog()
      return;
    }

    if (!this.max_price) {
      const filter = this.scope_min + this.min_price;
      this.publicationService.sendFilter(filter)
      this.dialogManager.closeDialog()
      return;
    }

    const filter = this.scope_min + this.min_price + this.scope_max + this.max_price;
    this.publicationService.sendFilter(filter)
    this.dialogManager.closeDialog()
    console.log(filter);

    return;

  }
}
