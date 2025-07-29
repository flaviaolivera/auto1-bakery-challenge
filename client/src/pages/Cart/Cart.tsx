import React from 'react';
import { motion } from 'motion/react';
import { CartItemList } from '../../components/cart/CartItemList/CartItemList';
import { CartSummary as CartSummaryComponent } from '../../components/cart/CartSummary/CartSummary';
import { Button } from '../../components/common/buttons';
import { useCart } from '../../hooks/useCart';

const Cart: React.FC = () => {
  const {
    items,
    isEmpty,
    isLoading,
    cartSummary,
    handleQuantityChange,
    handleRemoveItem,
    handleProceedToCheckout,
    handleContinueShopping,
    canIncreaseQuantity,
    canDecreaseQuantity,
  } = useCart();

  return (
    <div className="min-vh-100 bg-white px-2">
      {isEmpty ? (
        <div className="container text-center py-5">
          <h3 className="text-muted mb-3">Your cart is empty</h3>
          <p className="text-muted mb-4">Add some delicious items to get started!</p>
          <Button 
            label="Continue Shopping"
            variant="gradient-blue"
            onClick={handleContinueShopping}
          />
        </div>
      ) : (
        <div className='container py-3'>
          <h2 className="fw-bold text-start">My Order</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row"
          >
            <div className="col-12 col-lg-8">
              <CartItemList 
                items={items}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                isLoading={isLoading}
                canIncreaseQuantity={canIncreaseQuantity}
                canDecreaseQuantity={canDecreaseQuantity}
              />
            </div>

            <div className="col-lg-4 d-none d-lg-block">
              <div className="ms-3">
                <div className="bg-light rounded-3 p-3 mb-3">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-truck me-2 text-primary"></i>
                    Delivery Info
                  </h6>
                  <p className="mb-1 small text-muted">Estimated delivery: 30-45 min</p>
                  <p className="mb-0 small text-success">Free delivery in your area</p>
                </div>

                <div className="bg-light rounded-3 p-3 mb-3">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-shop me-2 text-primary"></i>
                    Our Bakery
                  </h6>
                  <p className="mb-1 small text-muted">Fresh baked daily</p>
                  <p className="mb-0 small text-muted">Quality ingredients since 1985</p>
                </div>

                <Button 
                  label="Continue Shopping"
                  variant="dark"
                  onClick={handleContinueShopping}
                  fullWidth
                />
              </div>
            </div>
          </motion.div>

          <div
            className="position-fixed bottom-0 start-0 end-0"
            style={{ zIndex: 1000 }}
          >
            <CartSummaryComponent
              cartSummary={cartSummary}
              onClick={handleProceedToCheckout}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;