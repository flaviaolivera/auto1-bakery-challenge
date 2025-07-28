import React from 'react';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { Thumbnail } from '../../common/media/Thumbnail/Thumbnail';
import { IconButton } from '../../common/buttons/IconButton/IconButton';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './CartItem.module.scss';

interface CartItemProps {
  cartItem: CartItemType;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove?: (productId: string) => void;
  isLoading?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  onQuantityChange,
  onRemove,
  isLoading = false
}) => {
  const { product, quantity } = cartItem;
  const totalPrice = product.price * quantity;

  const handleQuantityDecrease = () => {
    if (quantity <= 1) {
      onRemove?.(product.id);
      return;
    }
    onQuantityChange(product.id, quantity - 1);
  };

  const handleQuantityIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  return (
    <div className={`d-flex align-items-center py-3 ${styles.cartItem} ${isLoading ? styles.loading : ''}`}>

      <div className={`flex-shrink-0 ${styles.imageContainer}`}>
        <Thumbnail
          src={product.image || 'https://blocks.astratic.com/img/general-img-square.png'}
          alt={product.name}
        />
      </div>

      <div className={`flex-grow-1 ms-3 ${styles.productInfo}`}>
        <h6 className={`mb-1 ${styles.productName}`}>
          {product.name}
        </h6>
        <div className={styles.productPrice}>
          {formatPrice(totalPrice)}
        </div>
      </div>

      <div className={`d-flex align-items-center ${styles.quantityControls}`}>
        <span className={`me-1 ${styles.quantityDisplay}`}>
          {quantity}
        </span>
        
        <IconButton
          icon="FiMinus"
          size="large"
          onClick={handleQuantityDecrease}
          disabled={isLoading}
        />
        
        <IconButton
          icon="FiPlus"
          size="large"
          onClick={handleQuantityIncrease}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};