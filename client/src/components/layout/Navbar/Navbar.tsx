import React from 'react';
import { IconButton } from '../../common/buttons/IconButton/IconButton';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  return (
    <nav className={`navbar navbar-expand navbar-light bg-light ${styles.navbar}`}>
      <div className="container-fluid">
        <button 
          className={`navbar-brand btn btn-link text-decoration-none p-0 ${styles.brand}`}
        >
          Auto1 Bakery Challenge
        </button>
        
        <div className="d-flex">
          <IconButton
            icon="FiShoppingCart"
            size="medium"
            aria-label="Go to cart"
          />
        </div>
      </div>
    </nav>
  );
};