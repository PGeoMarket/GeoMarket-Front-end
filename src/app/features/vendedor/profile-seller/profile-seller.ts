import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditPublication } from '../edit-publication/edit-publication';


@Component({
  selector: 'app-profile-seller',
  imports: [CommonModule, EditPublication],
  templateUrl: './profile-seller.html',
  styleUrl: './profile-seller.css'
})
export class ProfileSeller {
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });

}
