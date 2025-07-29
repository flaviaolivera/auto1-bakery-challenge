import React from 'react';
import { CartSummary as CartSummaryType } from '../../../types/CartSummary';
import { Button } from '../../common/buttons/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './CartSummary.module.scss';

interface CartSummaryProps {
  cartSummary: CartSummaryType;
  onClick?: () => void;
  isLoading?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  cartSummary,
  onClick,
  isLoading = false
}) => {
  return (
    <div className={`card position-sticky bottom-0 ${styles.cartCard}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0 fw-bold">Total</h5>
          <span className="fs-3 fw-bold">
            {formatPrice(cartSummary.totalPrice)}
          </span>
        </div>
        <Button
          variant="gradient-blue"
          size="lg"
          label={isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Processing...
            </>
          ) : "Order"}
          onClick={onClick}
          disabled={isLoading || cartSummary.totalItems === 0}
          fullWidth
        />
      </div>
    </div>
  );
};