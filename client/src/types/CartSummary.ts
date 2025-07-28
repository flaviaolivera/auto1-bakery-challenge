import { CartItem } from './CartItem';

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}