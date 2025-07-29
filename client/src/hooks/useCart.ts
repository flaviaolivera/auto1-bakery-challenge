import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../stores';
import { CartSummary } from '../types/CartSummary';

export const useCart = () => {
  const navigate = useNavigate();
  const cartStore = useCartStore();
  const { items, getTotalPrice, getTotalItems, updateQuantity, removeFromCart, clearCart } = cartStore;
  const [isLoading, setIsLoading] = useState(false);
  
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const isEmpty = items.length === 0;

  const cartSummary: CartSummary = {
    items,
    totalItems,
    totalPrice
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    const item = items.find(item => item.product.id === productId);
    
    if (!item) {
      toast.error('Product not found in cart');
      return;
    }

    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    if (newQuantity > item.product.stock) {
      toast.error(`Only ${item.product.stock} items available in stock`);
      return;
    }

    setIsLoading(true);
    try {
      updateQuantity(productId, newQuantity);
      toast.success(`Updated ${item.product.name} quantity`);
    } catch (error) {
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    
    if (!item) {
      toast.error('Product not found in cart');
      return;
    }

    removeFromCart(productId);
    toast.success(`${item.product.name} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const handleProceedToCheckout = () => {
    if (isEmpty) {
      toast.error('Your cart is empty');
      return;
    }

    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const canIncreaseQuantity = (productId: string): boolean => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity < item.product.stock : false;
  };

  const canDecreaseQuantity = (productId: string): boolean => {
    return true; 
  };

  return {
    // State
    items,
    totalPrice,
    totalItems,
    isEmpty,
    isLoading,
    cartSummary,
    
    // Handlers
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleProceedToCheckout,
    handleContinueShopping,
    canIncreaseQuantity,
    canDecreaseQuantity,
  };
};