import React, { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { Button } from '../../common/buttons';
import { Select, SelectOption } from '../../common/forms/Select/Select';
import { formatPrice } from '../../../utils';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
  isLoading?: boolean;
  disabled?: boolean;
  availableStock?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isLoading = false,
  disabled = false,
  availableStock,
}) => {
  const [quantity, setQuantity] = useState(1);

  const safeAvailableStock = availableStock ?? 0;
  
  useEffect(() => {
    if (quantity > safeAvailableStock && safeAvailableStock > 0) {
      setQuantity(1);
    }
  }, [safeAvailableStock, quantity]);

  const handleQuantityChange = (newQuantity: string | number) => {
    const numQuantity = Number(newQuantity);
    if (numQuantity <= safeAvailableStock) {
      setQuantity(numQuantity);
    }
  };

  const handleAddToCart = () => {
    if (quantity <= safeAvailableStock) {
      onAddToCart(product.id, quantity);
      setQuantity(1); 
    }
  };

  const quantityOptions: SelectOption[] = Array.from(
    { length: safeAvailableStock }, 
    (_, i) => ({
      value: i + 1,
      label: `${i + 1}`
    })
  );

  const isOutOfStock = safeAvailableStock === 0;
  const isCardDisabled = disabled || isOutOfStock;

  return (
    <div className={`card h-100 ${styles.productCard} ${isCardDisabled ? styles.disabled : ''}`}>
      <div className="position-relative">
        <img 
          src={product.image || 'https://blocks.astratic.com/img/general-img-landscape.png'} 
          className={`card-img-top p-4 ${styles.cardImage}`}
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
        
        <div className={`d-flex justify-content-between align-items-center mb-2 ${styles.priceSection}`}>
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
              variant="dark"
              size="sm"
              onClick={handleAddToCart}
              disabled={isCardDisabled || quantity > safeAvailableStock}
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