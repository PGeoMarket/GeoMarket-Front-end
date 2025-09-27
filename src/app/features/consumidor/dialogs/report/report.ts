import { Component, Input, OnInit } from '@angular/core';
import { Closedialog } from "../../../../core/dialogs/closedialog";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  imports: [Closedialog, FormsModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class Report implements OnInit {
 
  @Input() publication_id!: number;
  @Input() user_id!: number;

  otroMotivo: boolean = false;


   
  ngOnInit(): void {
    console.log( this.publication_id);
    console.log(this.user_id);
  }
  
}
