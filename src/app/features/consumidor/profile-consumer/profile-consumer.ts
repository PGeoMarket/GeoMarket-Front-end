import { Component } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-consumer',
  imports: [Closedialog],
  templateUrl: './profile-consumer.html',
  styleUrl: './profile-consumer.css'
})
export class ProfileConsumer {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // o la ruta que quieras
  }
}
