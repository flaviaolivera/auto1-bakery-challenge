import React from 'react';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: string, quantity: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No products found</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard 
            product={product} 
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
};