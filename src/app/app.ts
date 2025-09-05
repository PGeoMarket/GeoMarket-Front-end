import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { FormsModule } from '@angular/forms';
import { Dialog } from './core/services/dialog';
import { AddProduct } from './roles/vendedor/add-product/add-product';
import { DialogManager } from './core/services/dialog-manager';
import { DIALOG_COMPONENTS } from './core/dialog-registry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
    private dialogManager = inject(DialogManager);

    ngOnInit() {
        // Registrar todos los componentes de dialog al iniciar la app
        this.dialogManager.registerComponents(DIALOG_COMPONENTS);
        console.log('Dialogs registrados:', this.dialogManager.getRegisteredComponents());
    }
}