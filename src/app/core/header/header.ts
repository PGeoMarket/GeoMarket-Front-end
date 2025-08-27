import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-header',
  imports: [Sidebar],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  logoUrl = 'public/svg/icons/logo.svg';
  geomarketLogoUrl = 'assets/svg/icons/geomarket.svg';
  lupaUrl = 'public/svg/icons/lupa.svg';
  temaUrl = 'public/svg/icons/teme.svg';
  menuUrl = 'public/svg/icons/menu.svg';
  userProfileUrl = 'public/svg/icons/userProfiel.svg';
  homeUrl = 'public/svg/icons/home.svg';
  favoritesUrl = 'public/svg/icons/favorites.svg';
  addPublicationUrl = 'public/svg/icons/addPublication.svg';
  messagesUrl = 'public/svg/icons/messages.svg';
  supportUrl = 'public/svg/icons/support.svg';
}
