import { Routes } from '@angular/router';
import { AddProduct } from './features/vendedor/publications-own/add-product/add-product';
import { EditProduct } from './features/vendedor/publications-own/edit-product/edit-product';
import { Vendedor } from './features/vendedor/vendedor';
import { ProfileSeller } from './features/vendedor/profile-seller/profile-seller';

export const routes: Routes = [
    {path:'add-product',component:AddProduct},
    {path:'edit-product',component:EditProduct},
    {path:'profile-seller',component:ProfileSeller},
];
