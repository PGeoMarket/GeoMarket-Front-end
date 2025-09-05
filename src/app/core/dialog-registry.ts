// src/app/core/dialog-registry.ts

// Importaciones de componentes por feature
// Vendedor
import { AddProduct } from "../roles/vendedor/add-product/add-product";
import { EditProduct } from "../roles/vendedor/edit-product/edit-product";
// Consumidor  

// Admin

// Invitado

export const DIALOG_COMPONENTS = {
    // Vendedor dialogs
    'add-product': AddProduct,
    'edit-product': EditProduct,

    
    // Consumidor dialogs

    
    // Admin dialogs

    
    // Auth dialogs

    
    // Agrega más componentes aquí según necesites
} as const;

export type DialogComponentNames = keyof typeof DIALOG_COMPONENTS;