import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSlidebar } from '../slidebars/admin-slidebar/admin-slidebar';
import { BuyerSlidebar } from '../slidebars/buyer-slidebar/buyer-slidebar';
import { GuestSlidebar } from '../slidebars/guest-slidebar/guest-slidebar';
import { SellerSlidebar } from '../slidebars/seller-slidebar/seller-slidebar';

@Component({
  selector: 'app-header',
  imports: [CommonModule,SellerSlidebar,AdminSlidebar,BuyerSlidebar,GuestSlidebar],
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

  role:string='buyer'

  open = false; // equivalente al x-data { open: false }

  toggleMenu() {
    this.open = !this.open;
  }

  closeMenu() {
    this.open = false;
  }
}
