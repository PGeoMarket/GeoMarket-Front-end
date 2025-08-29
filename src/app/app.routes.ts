import { Routes } from '@angular/router';
import { AddProduct } from './roles/vendedor/add-product/add-product';
import { EditProduct } from './roles/vendedor/edit-product/edit-product';

export const routes: Routes = [
    {path:'addProduct',component:AddProduct},
    {path:'editProduct',component:EditProduct}
];
