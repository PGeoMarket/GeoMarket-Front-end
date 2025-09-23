import { Routes } from '@angular/router';
import { AddProduct } from './features/vendedor/dialogs-seller/add-product/add-product';
import { EditProduct } from './features/vendedor/dialogs-seller/edit-product/edit-product';
import { ProfileSeller } from './features/vendedor/profile-seller/profile-seller';
import { Home } from './features/consumidor/home/home';
import { FavoritePublications } from './features/consumidor/favorite-publications/favorite-publications';
import { ProfileOther } from './features/consumidor/profile-other/profile-other';
import { Faq } from './features/consumidor/faq/faq';
import { SelectLocation } from './features/consumidor/dialogs/select-location/select-location';
import { Map } from './features/consumidor/dialogs/map/map';
import { ProfileConsumer } from './features/consumidor/profile-consumer/profile-consumer';
import { Register } from './features/invitado/register/register';
import { RegisterAs } from './features/invitado/register-as/register-as';
import { ProductDetail } from './features/consumidor/product-detail/product-detail';
import { Chats } from './features/consumidor/chats/chats';
import { Login } from './features/invitado/login/login';
import { ReportManagement } from './features/admin/report-management/report-management';
import { Report } from './features/consumidor/dialogs/report/report';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path:'add-product',component:AddProduct},
    {path:'edit-product',component:EditProduct},
    {path:'profile-seller',component:ProfileSeller},
    {path:'favorite-publications',component:FavoritePublications},
    {path:'ProfileOther',component:ProfileOther},
    {path:'faq',component:Faq},
    {path:'profile-buyer',component:ProfileConsumer},
    {path: '', redirectTo: '/home', pathMatch: 'full'},

    {path:'register',component:Register},
    {path:'register-as',component:RegisterAs},
    {path: 'select-location', component: SelectLocation},
    {path: 'Map', component: Map},
    {path: 'chats',component:Chats},
    {path: 'login', component: Login},
    {path: 'profile-consumer', component: ProfileConsumer},
    {path: 'report-management', component: ReportManagement},
     {path: 'report', component: Report}
];
