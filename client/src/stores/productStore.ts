import { create } from 'zustand';
import { Product } from '../types';
import { getProducts } from '../services/ApiService';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getProducts();
      set({ products, loading: false });
    } catch (error) {
      set({ 
        error: 'Failed to load products', 
        loading: false 
      });
    }
  },
}));