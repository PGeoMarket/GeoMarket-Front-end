// Modelo básico (puedes ajustarlo según tu backend)
export interface Publication {
  id?: number;
  titulo: string;
  precio: number;
  descripcion?: string;
  image: Image;
  visibilidad?: boolean;
  seller_id?: number;
  category_id?: number;
  fecha_actualizacion?: string;
}

export interface Image {
  id?:number;
  url:string;
  imageable_type:string;
  imageable_id:string;

}