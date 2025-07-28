import { render, screen } from '@testing-library/react';
import { CartItemList } from './CartItemList';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { Product } from '../../../types/Product';

jest.mock('../../common/buttons/Button/Button', () => ({
  Button: ({ 
    label, 
    onClick, 
    variant, 
    size 
  }: { 
    label: string; 
    onClick?: () => void; 
    variant?: string;
    size?: string;
  }) => (
    <button 
      onClick={onClick}
      data-testid="shop-now-button"
      data-variant={variant}
      data-size={size}
    >
      {label}
    </button>
  )
}));
jest.mock('../CartItem/CartItem', () => ({
  CartItem: ({ cartItem }: { cartItem: CartItemType }) => (
    <div data-testid={`cart-item-${cartItem.product.id}`}>
      {cartItem.product.name} - Quantity: {cartItem.quantity}
    </div>
  )
}));

describe('CartItemList', () => {
  const mockProduct1: Product = {
    id: '1',
    name: 'Product 1',
    price: 10.99,
    image: 'https://example.com/product1.jpg',
    slug: 'product-1',
    stock: 5
  };

  const mockProduct2: Product = {
    id: '2',
    name: 'Product 2',
    price: 25.50,
    image: 'https://example.com/product2.jpg',
    slug: 'product-2',
    stock: 3
  };

  const mockCartItems: CartItemType[] = [
    { product: mockProduct1, quantity: 2 },
    { product: mockProduct2, quantity: 1 }
  ];

  const mockOnQuantityChange = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    items: mockCartItems,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
  };

  it('renders all cart items when items are provided', () => {
    render(<CartItemList {...defaultProps} />);

    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
    expect(screen.getByText('Product 1 - Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Product 2 - Quantity: 1')).toBeInTheDocument();
  });

  it('renders separators between items', () => {
    const { container } = render(<CartItemList {...defaultProps} />);

    const separators = container.querySelectorAll('hr.separator');
    expect(separators).toHaveLength(mockCartItems.length - 1);
  });

  it('does not render separator after the last item', () => {
    const singleItem = [mockCartItems[0]];
    const { container } = render(
      <CartItemList {...defaultProps} items={singleItem} />
    );

    const separators = container.querySelectorAll('hr.separator');
    expect(separators).toHaveLength(0);
  });

  it('renders empty state when no items are provided', () => {
    render(<CartItemList {...defaultProps} items={[]} />);

    expect(screen.getByText('No items in cart')).toBeInTheDocument();
    expect(screen.getByTestId('shop-now-button')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cart-item-2')).not.toBeInTheDocument();
  });

  it('renders Shop Now button with correct props in empty state', () => {
    render(<CartItemList {...defaultProps} items={[]} />);

    const shopNowButton = screen.getByTestId('shop-now-button');
    expect(shopNowButton).toHaveAttribute('data-variant', 'dark');
    expect(shopNowButton).toHaveAttribute('data-size', 'lg');
  });

  it('passes correct props to CartItem components', () => {
    render(<CartItemList {...defaultProps} isLoading={true} />);

    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
  });

  it('renders with single item without separator', () => {
    const singleItemList: CartItemType[] = [mockCartItems[0]];
    const { container } = render(
      <CartItemList {...defaultProps} items={singleItemList} />
    );

    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(container.querySelectorAll('hr.separator')).toHaveLength(0);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<CartItemList {...defaultProps} />);

    const listContainer = container.querySelector('.cartItemList');
    expect(listContainer).toBeInTheDocument();

    const separators = container.querySelectorAll('.separator');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('renders empty state with correct styling', () => {
    const { container } = render(<CartItemList {...defaultProps} items={[]} />);

    const emptyState = container.querySelector('.emptyState');
    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveClass('emptyState');
  });
});