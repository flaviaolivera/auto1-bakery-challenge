import { CartItem } from './CartItem';
import { CustomerInfo } from './CustomerInfo';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  status: 'pending' | 'confirmed' | 'error';
  timestamp: Date;
}

export interface OrderRequest {
  items: Array<{
    name: string;
    quantity: number;  
  }>;
}

export interface OrderResponse {
  message?: string;    
  error?: string;      
  errorItem?: string;  
}