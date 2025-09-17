// src/app/core/dialog-registry.ts

// Importa los componentes que se usarán como diálogos
import { FilterByCategory } from "../../features/consumidor/dialogs/filter-by-category/filter-by-category";
import { FilterByProximity } from "../../features/consumidor/dialogs/filter-by-proximity/filter-by-proximity";
import { RegisterAs } from "../../features/invitado/register-as/register-as";
import { Register } from "../../features/invitado/register/register";
import { AddProduct } from "../../features/vendedor/dialogs-seller/add-product/add-product";
import { EditProduct } from "../../features/vendedor/dialogs-seller/edit-product/edit-product";

/**
 * Diccionario de diálogos disponibles en la app.
 * La clave es el nombre (string) y el valor es el componente.
 */
export const DIALOG_COMPONENTS = {
  // Vendedor
  'add-product': AddProduct,
  'edit-product': EditProduct,

  // Consumidor
  // 
  'filter-by-category': FilterByCategory,
  'filter-by-proximity': FilterByProximity,
  'register-as':RegisterAs,
  'register':Register,

  // Admin
  // ...

  // Invitado
  // ...

  // Auth
  // ...
} as const;

export type DialogComponentNames = keyof typeof DIALOG_COMPONENTS;
