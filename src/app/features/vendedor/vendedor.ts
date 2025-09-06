import { Component } from '@angular/core';
import { AddProduct } from './publications-own/add-product/add-product'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-vendedor',
  standalone: true,
  imports: [AddProduct],
  templateUrl: './vendedor.html',
  styleUrl: './vendedor.css'
})
export class Vendedor { }