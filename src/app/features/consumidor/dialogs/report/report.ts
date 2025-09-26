import { Component } from '@angular/core';
import { Closedialog } from "../../../../core/dialogs/closedialog";
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-report',
  imports: [Closedialog,FormsModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class Report {

 otroMotivo: boolean = false;

}
