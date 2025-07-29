import { render, screen } from '@testing-library/react';
import { CheckoutSummary } from './CheckoutSummary';
import { CartSummary } from '../../../types/CartSummary';
import { Product } from '../../../types/Product';

jest.mock('../../../utils/formatPrice', () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`
}));

describe('CheckoutSummary', () => {
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

  const mockCartSummary: CartSummary = {
    items: [
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 3 }
    ],
    totalItems: 5,
    totalPrice: 53.50
  };

  it('renders order summary title', () => {
    render(<CheckoutSummary cartSummary={mockCartSummary} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('renders all cart items with names and quantities', () => {
    render(<CheckoutSummary cartSummary={mockCartSummary} />);

    expect(screen.getByText('Croissant')).toBeInTheDocument();
    expect(screen.getByText('x2')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.getByText('x3')).toBeInTheDocument();
  });

  it('calculates and displays individual item totals', () => {
    render(<CheckoutSummary cartSummary={mockCartSummary} />);

    expect(screen.getByText('$41.80')).toBeInTheDocument();
    expect(screen.getByText('$11.70')).toBeInTheDocument();
  });

  it('displays total price with primary color', () => {
    render(<CheckoutSummary cartSummary={mockCartSummary} />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    
    const totalPrice = screen.getByText('$53.50');
    expect(totalPrice).toBeInTheDocument();
    expect(totalPrice).toHaveClass('text-primary');
  });

  it('handles single item correctly', () => {
    const singleItemSummary: CartSummary = {
      items: [
        { product: mockProduct1, quantity: 1 }
      ],
      totalItems: 1,
      totalPrice: 20.90
    };

    render(<CheckoutSummary cartSummary={singleItemSummary} />);

    expect(screen.getByText('Croissant')).toBeInTheDocument();
    expect(screen.getByText('x1')).toBeInTheDocument();
    
    const prices = screen.getAllByText('$20.90');
    expect(prices).toHaveLength(2);
  });

  it('handles empty cart', () => {
    const emptyCartSummary: CartSummary = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };

    render(<CheckoutSummary cartSummary={emptyCartSummary} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();

    expect(screen.queryByText('Croissant')).not.toBeInTheDocument();
    expect(screen.queryByText('Bread')).not.toBeInTheDocument();
  });

  it('displays items in order', () => {
    render(<CheckoutSummary cartSummary={mockCartSummary} />);

    const container = screen.getByText('Order Summary').parentElement;
    const productNames = container?.querySelectorAll('.fw-medium');
    
    expect(productNames?.[0]).toHaveTextContent('Croissant');
    expect(productNames?.[1]).toHaveTextContent('Bread');
  });
});