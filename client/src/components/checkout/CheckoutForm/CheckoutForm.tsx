import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CustomerInfoForm } from '../../../schemas/checkoutSchema';
import { Button } from '../../common/buttons/Button/Button';
import styles from './CheckoutForm.module.scss';

interface CheckoutFormProps {
  onSubmit: () => void;
  register: UseFormRegister<CustomerInfoForm>;
  errors: FieldErrors<CustomerInfoForm>;
  isLoading?: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  register,
  errors,
  isLoading = false
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={`card ${styles.checkoutForm}`}>
      <div className="card-header">
        <h4 className="card-title mb-0">Customer Information</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          <div className="row mb-4">
            <div className="col-12">
              <h5 className="mb-3">Contact Information</h5>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                {...register('email')}
                disabled={isLoading}
                placeholder="your@email.com"
              />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number *
              </label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                id="phone"
                {...register('phone')}
                disabled={isLoading}
                placeholder="+34 123 456 789"
              />
              {errors.phone && (
                <div className="invalid-feedback">
                  {errors.phone.message}
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="row mb-4">
            <div className="col-12">
              <h5 className="mb-3">Delivery Address</h5>
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="address.street" className="form-label">
                Street Address *
              </label>
              <input
                type="text"
                className={`form-control ${errors.address?.street ? 'is-invalid' : ''}`}
                id="address.street"
                {...register('address.street')}
                disabled={isLoading}
                placeholder="123 Main Street"
              />
              {errors.address?.street && (
                <div className="invalid-feedback">
                  {errors.address.street.message}
                </div>
              )}
            </div>
            <div className="col-md-8 mb-3">
              <label htmlFor="address.city" className="form-label">
                City *
              </label>
              <input
                type="text"
                className={`form-control ${errors.address?.city ? 'is-invalid' : ''}`}
                id="address.city"
                {...register('address.city')}
                disabled={isLoading}
                placeholder="Jerez de la Frontera"
              />
              {errors.address?.city && (
                <div className="invalid-feedback">
                  {errors.address.city.message}
                </div>
              )}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="address.postalCode" className="form-label">
                Postal Code *
              </label>
              <input
                type="text"
                className={`form-control ${errors.address?.postalCode ? 'is-invalid' : ''}`}
                id="address.postalCode"
                {...register('address.postalCode')}
                disabled={isLoading}
                placeholder="11400"
              />
              {errors.address?.postalCode && (
                <div className="invalid-feedback">
                  {errors.address.postalCode.message}
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="row mb-4">
            <div className="col-12">
              <h5 className="mb-3">Payment Method</h5>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="paymentCash"
                      value="cash"
                      {...register('paymentMethod')}
                      disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="paymentCash">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="paymentCard"
                      value="card"
                      {...register('paymentMethod')}
                      disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="paymentCard">
                      Credit Card
                    </label>
                  </div>
                </div>
              </div>
              {errors.paymentMethod && (
                <div className="text-danger mt-2">
                  {typeof errors.paymentMethod.message === 'string' && errors.paymentMethod.message}
                </div>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="specialInstructions" className="form-label">
                Special Instructions (Optional)
              </label>
              <textarea
                className={`form-control ${errors.specialInstructions ? 'is-invalid' : ''}`}
                id="specialInstructions"
                rows={3}
                {...register('specialInstructions')}
                disabled={isLoading}
                placeholder="Any special delivery instructions..."
              />
              {errors.specialInstructions && (
                <div className="invalid-feedback">
                  {errors.specialInstructions.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Button
                variant="gradient-blue"
                size="lg"
                label={isLoading ? 'Processing...' : 'Place Order'}
                type="submit"
                loading={isLoading}
                fullWidth
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};