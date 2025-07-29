import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/buttons';

const Success: React.FC = () => {
  return (
    <motion.div
      className="min-vh-100 d-flex flex-column justify-between pt-4 pb-0"
      style={{ maxWidth: '500px', margin: '0 auto' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h4 className="fw-bold text-start px-3 mb-3">Order received</h4>

      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <img
          src="/images/fireworks.png"
          alt="Celebration"
          className="img-fluid my-3"
          style={{ maxHeight: '200px' }}
        />
        <h2 className="fw-bold mb-2" style={{ fontSize: '3rem' }}>Thank you!</h2>
        <p className="text-muted mb-4" style={{ maxWidth: '25ch'}}>
          We have successfully received your order.
        </p>
      </div>

      <div className="bg-white shadow rounded-top-4 px-3 py-4 w-100">
        <Link to="/">
          <Button label="Submit another order" variant="gradient-blue" fullWidth />
        </Link>
      </div>
    </motion.div>
  );
};

export default Success;
