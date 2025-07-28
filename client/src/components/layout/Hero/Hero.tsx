import React from 'react';
import { Button } from '../../common/buttons';
import styles from './Hero.module.scss';

export const Hero: React.FC = () => {

  return (
    <section className={`bg-light ${styles.hero}`}>
      <div className="container">
        <div className="text-center py-5">
          <h1 className={`display-4 fw-bold mb-3 ${styles.title}`}>
            Welcome to Auto1 Bakery Challenge
          </h1>
          <p className={`lead text-muted mb-4 ${styles.subtitle}`}>
            Fresh baked goods daily
          </p>
          <div className="d-flex justify-content-center">
            <Button
              variant="dark"
              size="lg"
              label="Shop Now"
            />
          </div>
        </div>
      </div>
    </section>
  );
};