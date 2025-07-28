import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={`bg-light border-top ${styles.footer}`}>
      <div className="container">
        <div className="text-center py-4">
          <h6 className={`mb-2 ${styles.brandName}`}>
            Auto1 Bakery Challenge
          </h6>
          <p className={`mb-0 text-muted ${styles.copyright}`}>
            Copyright © 2025 Flavia Carolina Fernández Olivera |{' '}
            <a 
              href="https://www.linkedin.com/in/flavia-fernandezolivera/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkedinLink}
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};