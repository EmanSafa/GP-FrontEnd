// Shared API types

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: string;
  stock?: string;
  brand_id?: string;
  category_id?: string;
  specifications?: string; // JSON string
  main_image?: string;
  rating?: string;
  is_available?: string; // "1" or "0"
  created_at?: string;
  updated_at?: string;
  category_name?: string;
  brand_name?: string;
  main_image_url?: string;
}
export interface Category {
  id: number;
  name: string;
  description: string;
  cat_image: string;
  created_at: string;
  updated_at: string;
  product_count: number;
  cat_image_url: string;
}
export interface Brand {
  id: number;
  name: string;
  logo: string;
  created_at: string;
  updated_at: string;
  product_count: number;
  logo_url: string;
}

export interface PaginationData {
  total: number;
  perPage: number;
  page: number;
  totalPages: number;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: PaginationData;
  filters: any;
}
export type CategoriesResponse = Category[];

export interface ProductParams {
  page?: number;
  per_page?: number;
  category?: number;
  brand?: number;
  min_price?: number;
  max_price?: number;
  sort?: "price" | "rating" | "created_at" | "name";
  order?: "asc" | "desc";
}
export interface SearchParams {
  q: string;
  limit: number;
}
export interface SingleProductResponse {
  success: boolean;
  product: Product;
}

export interface SingleProductImagesResponse {
  id: number;
  images: { id: number; url: string; created_at: string }[];
  product_id: number;
  success: boolean;
}
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  is_active: string;
  created_at: string;
}

export interface UserProfileResponse {
  success: boolean;
  user: User;
}

export interface UpdateUserProfileRequest {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  total: string;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_address: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface UserOrdersResponse {
  success: boolean;
  orders: Order[];
  total_orders: number;
  pagination: PaginationData;
}
