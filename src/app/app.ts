import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GeoMarket_Front-end');
}