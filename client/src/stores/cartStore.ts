import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];

  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;

  getQuantityInCart: (productId: string) => number;
  getAvailableStock: (product: Product) => number;
  canAddToCart: (product: Product, requestedQuantity: number) => boolean;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product: Product, quantity: number) => {
    const { items } = get();
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      set({ items: [...items, { product, quantity }] });
    }
  },

  removeFromCart: (productId: string) => {
    set({ items: get().items.filter(item => item.product.id !== productId) });
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set({
      items: get().items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    });
  },

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    return get().items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  // NEW: Get quantity of specific product in cart
  getQuantityInCart: (productId: string) => {
    const item = get().items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  },

  // NEW: Get available stock (total stock - quantity in cart)
  getAvailableStock: (product: Product) => {
    const quantityInCart = get().getQuantityInCart(product.id);
    return Math.max(0, product.stock - quantityInCart);
  },

  // NEW: Check if we can add a specific quantity to cart
  canAddToCart: (product: Product, requestedQuantity: number) => {
    const availableStock = get().getAvailableStock(product);
    return requestedQuantity <= availableStock;
  },
}));