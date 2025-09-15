import { Routes } from '@angular/router';
import { AddProduct } from './features/vendedor/dialogs-seller/add-product/add-product';
import { EditProduct } from './features/vendedor/dialogs-seller/edit-product/edit-product';
import { ProfileSeller } from './features/vendedor/profile-seller/profile-seller';
<<<<<<< HEAD
import { Home } from './features/consumidor/home/home';
import { ProfileOther } from './features/consumidor/profile-other/profile-other';
import { FavoritePublications } from './features/consumidor/favorite-publications/favorite-publications';
=======
import { FavoritePublications } from './features/consumidor/favorite-publications/favorite-publications';
import { ProfileOther } from './features/consumidor/profile-other/profile-other';
>>>>>>> origin/dev

export const routes: Routes = [
    {path: 'home', component: Home},
    {path:'add-product',component:AddProduct},
    {path:'edit-product',component:EditProduct},
    {path:'profile-seller',component:ProfileSeller},
    {path:'favorite-publications',component:FavoritePublications},
    {path:'ProfileOther',component:ProfileOther},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
