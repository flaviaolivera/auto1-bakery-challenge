import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCartStore } from '../../stores';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerInfoSchema, CustomerInfoForm } from '../../schemas/checkoutSchema';
import { OrderRequest } from '../../types';
import { createOrder } from '../../services';
import { CheckoutForm } from '../../components/checkout/CheckoutForm/CheckoutForm';
import { CheckoutSummary } from '../../components/checkout/CheckoutSummary/CheckoutSummary';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const isEmpty = items.length === 0;

  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<CustomerInfoForm>({
  resolver: zodResolver(customerInfoSchema),
});

const cartSummary = {
  items,
  totalItems,
  totalPrice,
};

const onSubmit = async (data: CustomerInfoForm) => {
  try {
    const orderPayload: OrderRequest = {
      items: items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
      })),
    };

    await createOrder(orderPayload);

    clearCart();

    toast.success('Order created successfully!');

    navigate('/confirmation/success');
  } catch (error) {
    console.error('Order creation failed:', error);

    toast.error('Failed to create order. Please try again.');

    navigate('/confirmation/error');
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-vh-100 d-flex flex-column"
    >
      
      <main className="flex-grow-1 py-5">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="row"
          >
            <div className="col-12">              
              <motion.nav
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                aria-label="breadcrumb"
                className="mb-4"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/cart" className="text-decoration-none">Cart</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Checkout
                  </li>
                </ol>
              </motion.nav>
              
              <div className="row">
                <div className="col-lg-8 order-2 order-lg-1">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="card shadow-sm"
                  >
                      <CheckoutForm
                        register={register}
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        isLoading={isSubmitting}
                      />
                  </motion.div>
                </div>
                
                <div className="col-lg-4 order-1 order-lg-2 mb-3">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="card shadow-sm position-sticky"
                    style={{ top: '2rem' }}
                  >
                   <div className="card-body">
                    <CheckoutSummary cartSummary={cartSummary} />
                  </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default Checkout;