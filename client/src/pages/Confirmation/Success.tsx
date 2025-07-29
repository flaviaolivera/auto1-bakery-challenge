// src/pages/Confirmation/Success.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
  return (
    <div className="container py-5 text-center">
      <h1>Order Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
    </div>
  );
};

export default Success;
