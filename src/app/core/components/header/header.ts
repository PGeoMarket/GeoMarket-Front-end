import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSlidebar } from '../slidebars/admin-slidebar/admin-slidebar';
import { BuyerSlidebar } from '../slidebars/buyer-slidebar/buyer-slidebar';
import { GuestSlidebar } from '../slidebars/guest-slidebar/guest-slidebar';
import { SellerSlidebar } from '../slidebars/seller-slidebar/seller-slidebar';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { LoginService } from '../../services/login-service';
import { FormsModule } from '@angular/forms';
import { PublicationService } from '../../services/publication-service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SellerSlidebar, AdminSlidebar, BuyerSlidebar, GuestSlidebar, RouterLink,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  constructor(
    private userService: UserService, 
    private loginService: LoginService,
    private publicationService: PublicationService
  ) {
    let currentUser$ = this.userService.currentUser$;
  }
  
  // Estado reactivo del usuario
  
  open = false;


  toggleMenu() {
    this.open = !this.open;
  }

  closeMenu() {
    this.open = false;
  }

  // Getters para el rol
  get role(): string {
    return this.userService.getUserRole();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  get isVendedor(): boolean {
    return this.userService.isVendedor();
  }

  get isConsumidor(): boolean {
    return this.userService.isConsumidor();
  }

  // Logout
  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        console.log('Logout exitoso');
      },
      error: () => {
        // Logout local aunque falle el servidor
        localStorage.clear();
        this.userService.clearUserData();
      }
    });
  }

  searchPublicationByName(searchPublication: string) {
    
    this.publicationService.sendFilter('&filter[titulo]='+searchPublication);
  }
  
}


