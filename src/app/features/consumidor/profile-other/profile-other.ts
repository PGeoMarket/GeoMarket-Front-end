import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-other',
  imports: [CommonModule],
  templateUrl: './profile-other.html',
  styleUrl: './profile-other.css'
})
export class ProfileOther {
tab: string = "catalogo";
repeat = Array.from({ length: 16 });
options: string = "close";
}
