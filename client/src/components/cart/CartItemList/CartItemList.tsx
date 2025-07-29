import React from 'react';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { CartItem } from '../CartItem/CartItem';
import { Button } from '../../common/buttons';
import styles from './CartItemList.module.scss';

interface CartItemListProps {
  items: CartItemType[];
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove?: (productId: string) => void;
  isLoading?: boolean;
  canIncreaseQuantity: (productId: string) => boolean;
  canDecreaseQuantity?: (productId: string) => boolean;
}

export const CartItemList: React.FC<CartItemListProps> = ({
  items,
  onQuantityChange,
  onRemove,
  isLoading = false,
  canIncreaseQuantity,
  canDecreaseQuantity = () => true  
}) => {
  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className="text-muted mb-3">No items in cart</p>
        <Button
          variant="dark"
          size="md"
          label="Shop Now"
        />
      </div>
    );
  }

  return (
    <div className={styles.cartItemList}>
      {items.map((item, index) => (
        <React.Fragment key={item.product.id}>
          <CartItem
            cartItem={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            isLoading={isLoading}
            canIncrease={canIncreaseQuantity(item.product.id)}
            canDecrease={canDecreaseQuantity(item.product.id)}
          />

          {index < items.length - 1 && (
            <hr className={styles.separator} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};