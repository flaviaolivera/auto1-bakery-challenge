import React, { useState } from 'react';
import { Product } from '../../types';
import { Button } from '../common/buttons';
import { Select, SelectOption } from '../common/forms/Select/Select';
import { formatPrice } from '../../utils';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isLoading = false,
  disabled = false
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: string | number) => {
    setQuantity(Number(newQuantity));
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  // Generate quantity options based on available stock
  const quantityOptions: SelectOption[] = Array.from(
    { length: product.stock }, 
    (_, i) => ({
      value: i + 1,
      label: `${i + 1}`
    })
  );

  const isOutOfStock = product.stock === 0;
  const isCardDisabled = disabled || isOutOfStock;

  return (
    <div className={`card h-100 ${styles.productCard} ${isCardDisabled ? styles.disabled : ''}`}>
      <div className="position-relative">
        <img 
          src={product.image || 'https://blocks.astratic.com/img/general-img-landscape.png'} 
          className={`card-img-top ${styles.cardImage}`}
          alt={product.name}
        />
        {isOutOfStock && (
          <span className={`position-absolute badge bg-danger ${styles.outOfStockBadge}`}>
            Out of stock
          </span>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className={`card-title ${styles.cardTitle}`}>
          {product.name}
        </h5>
        
        {product.description && (
          <p className={`card-text text-muted ${styles.cardText}`}>
            {product.description}
          </p>
        )}
        
        <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.priceSection}`}>
          <span className={`fw-bold fs-5 ${styles.price}`}>
            {formatPrice(product.price)}
          </span>
        </div>
        
        {!isOutOfStock && (
          <div className="mt-auto">
            <div className="d-flex align-items-center gap-2 mb-3">
              <label htmlFor={`quantity-${product.id}`} className="form-label mb-0 small">
                Quantity:
              </label>
              <Select
                options={quantityOptions}
                value={quantity}
                onChange={handleQuantityChange}
                size="sm"
                disabled={isCardDisabled}
              />
            </div>
            
            <Button
              variant="gradient-blue"
              size="sm"
              onClick={handleAddToCart}
              disabled={isCardDisabled}
              loading={isLoading}
              label={isLoading ? 'Adding...' : 'Add to cart'}
              fullWidth
            />
          </div>
        )}
        
        {isOutOfStock && (
          <div className="mt-auto">
            <Button
              variant="secondary"
              size="sm"
              disabled
              label="Out of stock"
              fullWidth
            />
          </div>
        )}
      </div>
    </div>
  );
};