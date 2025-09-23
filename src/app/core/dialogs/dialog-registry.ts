// src/app/core/dialog-registry.ts

// Importa los componentes que se usarán como diálogos
import { FilterByCategory } from "../../features/consumidor/dialogs/filter-by-category/filter-by-category";
import { FilterByProximity } from "../../features/consumidor/dialogs/filter-by-proximity/filter-by-proximity";
import { RegisterAs } from "../../features/invitado/register-as/register-as";
import { Register } from "../../features/invitado/register/register";
import { Faq } from "../../features/consumidor/faq/faq";
import { Map } from "../../features/consumidor/dialogs/map/map";
import { SelectLocation } from "../../features/consumidor/dialogs/select-location/select-location";
import { AddProduct } from "../../features/vendedor/dialogs-seller/add-product/add-product";
import { EditProduct } from "../../features/vendedor/dialogs-seller/edit-product/edit-product";
import { Login } from "../../features/invitado/login/login";
import { Reason } from "../../features/admin/reason/reason";
import { EditSeller } from "../../features/vendedor/edit-seller/edit-seller";
import { RatePublication } from "../../features/consumidor/dialogs/rate-publication/rate-publication";
import { FilterByPrice } from "../../features/consumidor/dialogs/filter-by-price/filter-by-price";
import { ProfileConsumer } from "../../features/consumidor/profile-consumer/profile-consumer";
import { Chats } from "../../features/consumidor/chats/chats";
import { ReportManagement } from "../../features/admin/report-management/report-management";

/**
 * Diccionario de diálogos disponibles en la app.
 * La clave es el nombre (string) y el valor es el componente.
 */
export const DIALOG_COMPONENTS = {
  //all
  'faq':Faq,
  // Vendedor
  'add-product': AddProduct,
  'edit-product': EditProduct,
  'edit-seller': EditSeller,

  // Consumidor
  // 
  'chats': Chats,
  'profile-consumer' : ProfileConsumer,
  'filter-by-category': FilterByCategory,
  'filter-by-proximity': FilterByProximity,
  'filter-by-price': FilterByPrice,
  'map': Map, 
  'select-location': SelectLocation,
  'rate-publication': RatePublication,
  'report-management': ReportManagement,

  // Admin
  'reason': Reason,
  // ...

  // Invitado
  // 
    'login':Login,
    'register-as':RegisterAs,
    'register':Register,
  // Auth
  // ...
} as const;

export type DialogComponentNames = keyof typeof DIALOG_COMPONENTS;
