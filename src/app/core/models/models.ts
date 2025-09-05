// Modelo básico (puedes ajustarlo según tu backend)
export interface Publication {
  id?: number;
  titulo: string;
  precio: number;
  descripcion?: string;
  imagen: string;
  visibilidad?: boolean;
  seller_id?: number;
  category_id?: number;
  fecha_actualizacion?: string;
}