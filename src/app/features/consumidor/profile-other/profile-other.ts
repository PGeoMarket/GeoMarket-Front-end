import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditPublication } from "../../vendedor/edit-publication/edit-publication";

@Component({
  selector: 'app-profile-other',
  imports: [CommonModule, EditPublication],
  templateUrl: './profile-other.html',
  styleUrl: './profile-other.css'
})
export class ProfileOther {
tab: string = "catalogo";
repeat = Array.from({ length: 16 });
 
  menuAbierto: boolean = false;
  abrirMenu(event: MouseEvent) {
    event.stopPropagation(); // evita que cierre de inmediato
    //this.editarIndex = this.editarIndex === index ? null : index;
    this.menuAbierto = true;
  }

  cerrarMenus() {
    this.menuAbierto = false;
  }
}
