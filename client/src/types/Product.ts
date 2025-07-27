export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
}

export interface ProductFromAPI {
  name: string;
  price: number;
  stock: number;
}