import React from 'react';
import { CartSummary } from '../../../types/CartSummary';
import { formatPrice } from '../../../utils/formatPrice';

interface CheckoutSummaryProps {
  cartSummary: CartSummary;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  cartSummary
}) => {
  return (
    <div>
      <h6 className="mb-3 fw-bold">Order Summary</h6>
      
      {cartSummary.items.map((item) => (
        <div key={item.product.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div className="d-flex flex-column">
            <span className="fw-medium">{item.product.name}</span>
            <small className="text-muted">x{item.quantity}</small>
          </div>
          <span className="fw-bold">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      ))}
      
      <div className="d-flex justify-content-between align-items-center my-3">
        <h6 className="mb-0 fw-bold">Total</h6>
        <h5 className="mb-0 fw-bold text-primary">
          {formatPrice(cartSummary.totalPrice)}
        </h5>
      </div>
    </div>
  );
};