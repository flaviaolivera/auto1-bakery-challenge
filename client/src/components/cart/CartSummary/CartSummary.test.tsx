import { render, screen, fireEvent } from '@testing-library/react';
import { CartSummary } from './CartSummary';
import { CartSummary as CartSummaryType } from '../../../types/CartSummary';
import { Product } from '../../../types/Product';

jest.mock('../../common/buttons/Button/Button', () => ({
  Button: ({ 
    label, 
    onClick, 
    disabled, 
    variant, 
    size,
    className 
  }: { 
    label: string; 
    onClick?: () => void; 
    disabled?: boolean;
    variant?: string;
    size?: string;
    className?: string;
  }) => (
    <button 
      onClick={onClick}
      disabled={disabled}
      data-testid="order-button"
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {label}
    </button>
  )
}));

jest.mock('../../../utils/formatPrice', () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`
}));

describe('CartSummary', () => {
  const mockProduct1: Product = {
    id: '1',
    name: 'Croissant',
    price: 20.90,
    image: 'croissant.jpg',
    slug: 'croissant',
    stock: 10
  };

  const mockProduct2: Product = {
    id: '2',
    name: 'Bread',
    price: 3.90,
    image: 'bread.jpg',
    slug: 'bread',
    stock: 5
  };

  const mockCartSummary: CartSummaryType = {
    items: [
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 3 }
    ],
    totalItems: 5,
    totalPrice: 53.50
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    cartSummary: mockCartSummary,
    onClick: mockOnClick
  };

  it('renders total price and order button', () => {
    render(<CartSummary {...defaultProps} />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$53.50')).toBeInTheDocument();
    expect(screen.getByTestId('order-button')).toBeInTheDocument();
    expect(screen.getByText('Order')).toBeInTheDocument();
  });

  it('calls onClick when order button is clicked', () => {
    render(<CartSummary {...defaultProps} />);

    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when isLoading is true', () => {
    render(<CartSummary {...defaultProps} isLoading={true} />);

    const orderButton = screen.getByTestId('order-button');
    expect(orderButton).toBeDisabled();
  });

  it('disables button when cart is empty', () => {
    const emptyCartSummary: CartSummaryType = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };

    render(<CartSummary {...defaultProps} cartSummary={emptyCartSummary} />);

    const orderButton = screen.getByTestId('order-button');
    expect(orderButton).toBeDisabled();
  });

  it('handles empty cart correctly', () => {
    const emptyCartSummary: CartSummaryType = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };

    render(<CartSummary cartSummary={emptyCartSummary} onClick={mockOnClick} />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    
    const orderButton = screen.getByTestId('order-button');
    expect(orderButton).toBeDisabled();
  });
});