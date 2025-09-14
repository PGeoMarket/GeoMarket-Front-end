import { Routes } from '@angular/router';
import { AddProduct } from './features/vendedor/dialogs-seller/add-product/add-product';
import { EditProduct } from './features/vendedor/dialogs-seller/edit-product/edit-product';
import { Vendedor } from './features/vendedor/vendedor';
import { ProfileSeller } from './features/vendedor/profile-seller/profile-seller';
import { Home } from './features/consumidor/home/home';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path:'add-product',component:AddProduct},
    {path:'edit-product',component:EditProduct},
    {path:'profile-seller',component:ProfileSeller},
    {path: '', redirectTo: '/home', pathMatch: 'full'},

];
