import { LucideIcon } from "lucide-react";

export interface TProduct {
  _id?: string;
  name?: string;
  description?: string;
  category?: string;
  brand?: string;
  stockQuantity?: number;
  rating?: number; 
  productDescription?: string;
  price?: number;
  image?: string;
  isAvailable?: boolean;
  __v?: number; 
}


/* ---------------- Types ---------------- */
export type Page = "home" | "product" | "cart";

export interface Product {
  id: number;
  name: string;
  bn: string;
  price: number;
  was: number;
  icon: LucideIcon;
  cat: string;
  images: string[]; 
  description: string;
}

export interface CartItem {
  id: number;
  qty: number;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}