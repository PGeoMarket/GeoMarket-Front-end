import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddProduct } from '../add-product/add-product';
import { EditPublication } from '../edit-publication/edit-publication';
import { Closedialog } from '../../../core/directives/closedialog';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, EditPublication],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });

}
