import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EditPublication } from '../edit-publication/edit-publication';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-profile-seller',
  imports: [CommonModule, EditPublication],
  templateUrl: './profile-seller.html',
  styleUrl: './profile-seller.css'
})
export class ProfileSeller {
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });

    title = 'google-maps';
  
    ngOnInit(): void {
      const loader = new Loader({
        apiKey: 'AIzaSyB5z4XpgHuZimhlIFzBKd2ey_VtzcRgcvs', 
        version: 'weekly'
      });
  
      loader.load().then(() => {
        const mapElement = document.getElementById("mapax");
        if (mapElement) {
          new google.maps.Map(mapElement, {
            center: { lat: 4.60971, lng: -74.08175 }, 
            zoom: 6
          });
        }
      });
    }

   private dialogManager = inject(DialogManager);
      onOpenEdit() {
        this.dialogManager.openDialog('edit-seller', {
          data: { mode: 'create' }
        });
      }

       onOpenMap() {
    this.dialogManager.openDialog('map', {
      data: {mode: 'create'}
    })
  }

}
