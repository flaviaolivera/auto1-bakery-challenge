import { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}