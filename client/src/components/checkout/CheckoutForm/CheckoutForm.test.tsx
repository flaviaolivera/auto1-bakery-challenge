import { render, screen, fireEvent } from '@testing-library/react';
import { CheckoutForm } from './CheckoutForm';

const mockRegister = jest.fn((name: string) => ({
  name,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn()
}));

const mockOnSubmit = jest.fn();

const defaultProps = {
  onSubmit: mockOnSubmit,
  register: mockRegister as any,
  errors: {} as any,
  isLoading: false
};

describe('CheckoutForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockRegister.mockClear();
  });

  it('renders all form fields', () => {
    render(<CheckoutForm {...defaultProps} />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/cash on delivery/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/credit card/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/special instructions/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /place order/i })).toBeInTheDocument();
  });

  it('calls register for each form field', () => {
    render(<CheckoutForm {...defaultProps} />);

    expect(mockRegister).toHaveBeenCalledWith('email');
    expect(mockRegister).toHaveBeenCalledWith('phone');
    expect(mockRegister).toHaveBeenCalledWith('address.street');
    expect(mockRegister).toHaveBeenCalledWith('address.city');
    expect(mockRegister).toHaveBeenCalledWith('address.postalCode');
    expect(mockRegister).toHaveBeenCalledWith('paymentMethod');
    expect(mockRegister).toHaveBeenCalledWith('specialInstructions');
  });

  it('displays validation errors when provided', () => {
    const errorsWithMessages = {
      email: { message: 'Email is required' },
      phone: { message: 'Phone is required' },
      address: {
        street: { message: 'Street is required' },
        city: { message: 'City is required' },
        postalCode: { message: 'Postal code is required' }
      },
      paymentMethod: { message: 'Payment method is required' },
      specialInstructions: { message: 'Instructions too long' }
    };

    render(
      <CheckoutForm 
        {...defaultProps} 
        errors={errorsWithMessages as any} 
      />
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
    expect(screen.getByText('Street is required')).toBeInTheDocument();
    expect(screen.getByText('City is required')).toBeInTheDocument();
    expect(screen.getByText('Postal code is required')).toBeInTheDocument();
    expect(screen.getByText('Payment method is required')).toBeInTheDocument();
    expect(screen.getByText('Instructions too long')).toBeInTheDocument();
  });

  it('adds error classes to inputs when there are errors', () => {
    const errorsWithMessages = {
      email: { message: 'Email is required' },
      address: {
        street: { message: 'Street is required' }
      }
    };

    render(
      <CheckoutForm 
        {...defaultProps} 
        errors={errorsWithMessages as any} 
      />
    );

    expect(screen.getByLabelText(/email address/i)).toHaveClass('is-invalid');
    expect(screen.getByLabelText(/street address/i)).toHaveClass('is-invalid');
    expect(screen.getByLabelText(/phone number/i)).not.toHaveClass('is-invalid');
  });

  it('calls onSubmit when form is submitted', () => {
    render(<CheckoutForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /place order/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('uses Bootstrap card structure', () => {
    render(<CheckoutForm {...defaultProps} />);

    const card = document.querySelector('.card');
    expect(card).toBeInTheDocument();

    const cardHeader = document.querySelector('.card-header');
    expect(cardHeader).toBeInTheDocument();

    const cardBody = document.querySelector('.card-body');
    expect(cardBody).toBeInTheDocument();

    const cardTitle = document.querySelector('.card-title');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent('Customer Information');
  });

  it('has proper form sections', () => {
    render(<CheckoutForm {...defaultProps} />);

    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Delivery Address')).toBeInTheDocument();
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
  });
});