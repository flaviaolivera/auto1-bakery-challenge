import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';
import { useProductStore } from '../../stores';
import { useCartStore } from '../../stores';

import { Navbar } from '../../components/layout/Navbar/Navbar';
import { ProductGrid } from '../../components/products/ProductGrid/ProductGrid';
import { Footer } from '../../components/layout/Footer/Footer';

const Home: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const cartStore = useCartStore();
  const totalItems = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      toast.error('Product not found');
      return;
    }

    if (!cartStore.canAddToCart(product, quantity)) {
      const availableStock = cartStore.getAvailableStock(product);
      toast.error(`Only ${availableStock} items available`);
      return;
    }

    if (quantity <= 0) {
      toast.error('Please select a valid quantity');
      return;
    }

    cartStore.addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRetryFetch = () => {
    fetchProducts();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-vh-100 d-flex flex-column"
    >
      <Navbar cartItemCount={totalItems} />

      <main className="flex-grow-1">
        <motion.section
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-5"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <motion.h3
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center mb-5 display-5 fw-bold text-primary"
                >
                  Our Fresh Products
                </motion.h3>
                
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-5"
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading delicious products...</p>
                  </motion.div>
                )}
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="alert alert-danger text-center"
                  >
                    <h5>Oops! Something went wrong</h5>
                    <p>{error}</p>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={handleRetryFetch}
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
                
                {!loading && !error && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <ProductGrid 
                      products={products}
                      onAddToCart={handleAddToCart}
                      getAvailableStock={(product) => cartStore.getAvailableStock(product)}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default Home;