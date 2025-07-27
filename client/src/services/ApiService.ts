import { Product, ProductFromAPI, OrderRequest, OrderResponse } from '../types';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const fetchAPI = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${baseURL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetchAPI<{ storage: ProductFromAPI[] }>('/api/storage');
    
    return response.storage.map((item, index) => ({
      id: `product-${index}`,
      name: item.name,
      slug: item.name.toLowerCase(),  
      price: item.price,
      stock: item.stock,
      image: `/images/${item.name.toLowerCase()}.png`,  
      description: undefined,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products');
  }
};

export const createOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  try {
    return await fetchAPI<OrderResponse>('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};