import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from '../slidebars/admin/admin';
import { Buyer } from '../slidebars/buyer/buyer';
import { Guest } from '../slidebars/guest/guest';
import { SellerSlidebar } from '../slidebars/seller-slidebar/seller-slidebar';

@Component({
  selector: 'app-header',
  imports: [CommonModule,SellerSlidebar,Admin,Buyer,Guest],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  /* logoUrl = /svg/icons/logo.svg';
  geomarketLogoUrl = 'assets/svg/icons/geomarket.svg';
  lupaUrl = 'public/svg/icons/lupa.svg';
  temaUrl = 'public/svg/icons/teme.svg';
  menuUrl = 'public/svg/icons/menu.svg';
  userProfileUrl = 'public/svg/icons/userProfiel.svg';
  homeUrl = 'public/svg/icons/home.svg';
  favoritesUrl = 'public/svg/icons/favorites.svg';
  addPublicationUrl = 'public/svg/icons/addPublication.svg';
  messagesUrl = 'public/svg/icons/messages.svg';
  supportUrl = 'public/svg/icons/support.svg'; */

  role:string='seller'

  open = false; // equivalente al x-data { open: false }

  toggleMenu() {
    this.open = !this.open;
  }

  closeMenu() {
    this.open = false;
  }
}
