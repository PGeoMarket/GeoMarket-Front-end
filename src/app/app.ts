import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { FormsModule } from '@angular/forms';
import { Dialog } from './core/services/dialog';
import { AddProduct } from './roles/vendedor/add-product/add-product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, FormsModule, AddProduct],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GeoMarket_Front-end');
    private dialog = inject(Dialog);
  private router = inject(Router);

  // Método que puede ser llamado desde el sidebar
  openDialogFromRoute(componentName: string, data?: any) {
    // Mapeo de strings a componentes
    const componentMap: { [key: string]: any } = {
      'add-product': AddProduct,
      // Agrega más según necesites
    };

    const component = componentMap[componentName];
    if (component) {
      this.dialog.openDialog(component);
    }
  }

  // O si prefieres usar el router para abrir dialogs
  openDialogRoute(route: string) {
    this.router.navigate([{ outlets: { dialog: route } }]);
  }
}
