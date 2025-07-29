// src/pages/Confirmation/Error.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Error: React.FC = () => {
  return (
    <div className="container py-5 text-center">
      <h1>Order Failed</h1>
      <p>Sorry, there was an issue processing your order. Please try again later.</p>
      <Link to="/checkout" className="btn btn-primary mt-3">Back to Checkout</Link>
    </div>
  );
};

export default Error;
