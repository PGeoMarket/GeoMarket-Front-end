import { Routes } from '@angular/router';
import { AddProduct } from './features/vendedor/dialogs-seller/add-product/add-product';
import { EditProduct } from './features/vendedor/dialogs-seller/edit-product/edit-product';
import { ProfileSeller } from './features/vendedor/profile-seller/profile-seller';
import { Home } from './features/consumidor/home/home';
import { FavoritePublications } from './features/consumidor/favorite-publications/favorite-publications';
import { ProfileOther } from './features/consumidor/profile-other/profile-other';
import { SelectLocation } from './features/consumidor/dialogs/select-location/select-location';
import { Map } from './features/consumidor/dialogs/map/map';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path:'add-product',component:AddProduct},
    {path:'edit-product',component:EditProduct},
    {path:'profile-seller',component:ProfileSeller},
    {path:'favorite-publications',component:FavoritePublications},
    {path:'ProfileOther',component:ProfileOther},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'select-location', component: SelectLocation},
    {path: 'Map', component: Map},
];
