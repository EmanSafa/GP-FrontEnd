// Shared API types

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: string; // API returns price as a string (e.g. "35000.00")
  stock?: string;
  brand_id?: string;
  category_id?: string;
  specifications?: string; // JSON string like '{"ram":"12GB","storage":"512GB"}'
  main_image?: string;
  rating?: string;
  is_available?: string; // "1" or "0"
  created_at?: string;
  updated_at?: string;
  category_name?: string;
  brand_name?: string;
  main_image_url?: string;
}

export type ProductsResponse = Product[];
