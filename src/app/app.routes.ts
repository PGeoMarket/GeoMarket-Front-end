import { Routes } from '@angular/router';
import { AddProduct } from './features/vendedor/dialogs/add-product/add-product';
import { EditProduct } from './features/vendedor/dialogs/edit-product/edit-product';
import { Vendedor } from './features/vendedor/vendedor';
import { ProfileSeller } from './features/vendedor/profile-seller/profile-seller';
import { FavoritePublications } from './features/consumidor/favorite-publications/favorite-publications';
import { ProfileOther } from './features/consumidor/profile-other/profile-other';
import { ProfileConsumer } from './features/consumidor/profile-consumer/profile-consumer';

export const routes: Routes = [
    {path:'add-product',component:AddProduct},
    {path:'edit-product',component:EditProduct},
    {path:'profile-seller',component:ProfileSeller},
    {path:'favorite-publications',component:FavoritePublications},
    {path:'ProfileOther',component:ProfileOther},
    {path:'profile-buyer',component:ProfileConsumer}
];
