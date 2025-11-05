import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DialogManager } from '../../../core/dialogs/dialog-manager';
import { Loader } from '@googlemaps/js-api-loader';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { CommentsProfile } from "../comments-profile/comments-profile";
import { EditPublication } from '../edit-publication/edit-publication';


@Component({
  selector: 'app-profile-seller',
  imports: [CommonModule, CommentsProfile, EditPublication],
  templateUrl: './profile-seller.html',
  styleUrl: './profile-seller.css'
})
export class ProfileSeller implements OnInit {
  tab: string = "catalogo";
  repeat = Array.from({ length: 16 });

  title = 'google-maps';

  ngOnInit(): void {
    this.getUserData();
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

  onOpenMap() {
    this.dialogManager.openDialog('map', {
      data: { mode: 'create' }
    })
  }


  private dialogManager = inject(DialogManager);
  onOpenEdit() {
    this.dialogManager.openDialog('edit-seller', {
      data: { mode: 'create' },
      onClose: (res) => {
        console.log('cerrado con', res);
        this.userService.getMe().subscribe();
      }
    });
  }
  user: UserDTO | null = null;

  constructor(private userService: UserService) { }

  getUserData() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }



}
