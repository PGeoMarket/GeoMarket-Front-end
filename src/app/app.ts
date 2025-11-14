import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './core/components/header/header';
import { FormsModule } from '@angular/forms';
import { Dialog } from './core/dialogs/dialog';
import { AddProduct } from './features/vendedor/dialogs-seller/add-product/add-product';
import { DialogManager } from './core/dialogs/dialog-manager';
import { DIALOG_COMPONENTS } from './core/dialogs/dialog-registry';
import { PushNotificationService } from './core/services/push-notification-service';
import { UserService } from './core/services/user-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private dialogManager = inject(DialogManager);

  constructor(
    private pushService: PushNotificationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Registrar todos los componentes de dialog al iniciar la app
    this.dialogManager.registerComponents(DIALOG_COMPONENTS);
    console.log(
      'Dialogs registrados:',
      this.dialogManager.getRegisteredComponents()
    );

    this.userService.currentUser$.subscribe((user) => {
      if (user && user.id) {
        console.log('👤 Usuario logueado:', user.primer_nombre);
        console.log('🔔 Inicializando push notifications...');
        this.pushService.init(user.id);
      } else {
        console.log('👤 Usuario deslogueado');
      }
    });
  }
}
