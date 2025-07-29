import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../common/buttons/IconButton/IconButton';
import styles from './Navbar.module.scss';

interface NavbarProps {
  cartItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleBrandClick = () => {
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand navbar-light bg-light ${styles.navbar}`}>
      <div className="container-fluid">
        <button 
          className={`navbar-brand btn btn-link text-decoration-none p-0 ${styles.brand}`}
          onClick={handleBrandClick}
        >
          Auto1 Bakery Challenge
        </button>
        
        <div className="d-flex">
          <div className="position-relative">
            <IconButton
              icon="FiShoppingCart"
              size="large"
              aria-label={`Go to cart (${cartItemCount} items)`}
              onClick={handleCartClick}
            >
              {cartItemCount > 0 && (
                <span className={`position-absolute badge rounded-pill bg-danger ${styles.cartBadge}`}>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </nav>
  );
};
