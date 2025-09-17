// src/app/core/dialog-registry.ts

// Importa los componentes que se usarán como diálogos
import { FilterByCategory } from "../../features/consumidor/dialogs/filter-by-category/filter-by-category";
import { FilterByProximity } from "../../features/consumidor/dialogs/filter-by-proximity/filter-by-proximity";
import { Faq } from "../../features/consumidor/faq/faq";
import { AddProduct } from "../../features/vendedor/dialogs-seller/add-product/add-product";
import { EditProduct } from "../../features/vendedor/dialogs-seller/edit-product/edit-product";

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

  // Consumidor
  // 
  'filter-by-category': FilterByCategory,
  'filter-by-proximity': FilterByProximity,

  // Admin
  // ...

  // Invitado
  // ...

  // Auth
  // ...
} as const;

export type DialogComponentNames = keyof typeof DIALOG_COMPONENTS;
