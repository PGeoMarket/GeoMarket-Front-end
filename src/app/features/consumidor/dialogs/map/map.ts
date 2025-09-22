import { Component, inject, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { Loader } from '@googlemaps/js-api-loader'; 
import { DialogManager } from '../../../../core/dialogs/dialog-manager';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [Closedialog],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit {
  title = 'google-maps';

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyB5z4XpgHuZimhlIFzBKd2ey_VtzcRgcvs', 
      version: 'weekly'
    });

    loader.load().then(() => {
      const mapElement = document.getElementById("gmap_canvas");
      if (mapElement) {
        new google.maps.Map(mapElement, {
          center: { lat: 4.60971, lng: -74.08175 }, 
          zoom: 6
        });
      }
    });
  }

 private dialogManager = inject(DialogManager);

  OnConfirmar() {
     this.dialogManager.closeDialog();
    this.dialogManager.openDialog('select-location', {
      data: { mode: 'create' }
    });
  }

}