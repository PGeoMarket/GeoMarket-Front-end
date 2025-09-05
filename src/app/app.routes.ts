import { Routes } from '@angular/router';
import { AddProduct } from './roles/vendedor/add-product/add-product';
import { EditProduct } from './roles/vendedor/edit-product/edit-product';
import { Vendedor } from './roles/vendedor/vendedor';
import { Profile } from './roles/vendedor/profile/profile';

export const routes: Routes = [
    {path:'addProduct',component:AddProduct},
    {path:'editProduct',component:EditProduct},
    {path:'vendedor',component:Vendedor},
    {path:'sellerProfile',component:Profile},
];
