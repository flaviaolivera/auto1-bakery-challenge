import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from './CartItem';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { Product } from '../../../types/Product';

jest.mock('../../common/media/Thumbnail/Thumbnail', () => ({
  Thumbnail: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="thumbnail" />
  )
}));

jest.mock('../../common/buttons/IconButton/IconButton', () => ({
  IconButton: ({ 
    icon, 
    onClick, 
    disabled 
  }: { 
    icon: string; 
    onClick: () => void; 
    disabled?: boolean 
  }) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      data-testid={`icon-button-${icon}`}
    >
      {icon}
    </button>
  )
}));

jest.mock('../../../utils/formatPrice', () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`
}));

describe('CartItem', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 25.99,
    image: 'https://example.com/product.jpg',
    slug: 'test-product',
    stock: 10
  };

  const mockCartItem: CartItemType = {
    product: mockProduct,
    quantity: 2
  };

  const mockOnQuantityChange = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    cartItem: mockCartItem,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove
  };

  it('renders the cart item with correct product information', () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$51.98')).toBeInTheDocument(); 
    expect(screen.getByText('2')).toBeInTheDocument(); 
    expect(screen.getByTestId('thumbnail')).toHaveAttribute('src', 'https://example.com/product.jpg');
    expect(screen.getByTestId('thumbnail')).toHaveAttribute('alt', 'Test Product');
  });

  it('displays fallback image when product image is not provided', () => {
    const productWithoutImage: Product = {
      ...mockProduct,
      image: undefined
    };

    const cartItemWithoutImage: CartItemType = {
      ...mockCartItem,
      product: productWithoutImage
    };

    render(<CartItem {...defaultProps} cartItem={cartItemWithoutImage} />);

    expect(screen.getByTestId('thumbnail')).toHaveAttribute(
      'src', 
      'https://blocks.astratic.com/img/general-img-square.png'
    );
  });

  it('calls onQuantityChange when plus button is clicked', () => {
    render(<CartItem {...defaultProps} />);

    const plusButton = screen.getByTestId('icon-button-FiPlus');
    fireEvent.click(plusButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith('1', 3);
  });

  it('calls onQuantityChange when minus button is clicked and quantity > 1', () => {
    render(<CartItem {...defaultProps} />);

    const minusButton = screen.getByTestId('icon-button-FiMinus');
    fireEvent.click(minusButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith('1', 1);
  });

  it('calls onRemove when minus button is clicked and quantity is 1', () => {
    const cartItemWithQuantity1: CartItemType = {
      ...mockCartItem,
      quantity: 1
    };

    render(<CartItem {...defaultProps} cartItem={cartItemWithQuantity1} />);

    const minusButton = screen.getByTestId('icon-button-FiMinus');
    fireEvent.click(minusButton);

    expect(mockOnRemove).toHaveBeenCalledWith('1');
    expect(mockOnQuantityChange).not.toHaveBeenCalled();
  });

  it('does not call onRemove when minus button is clicked and quantity is 1 but onRemove is not provided', () => {
    const cartItemWithQuantity1: CartItemType = {
      ...mockCartItem,
      quantity: 1
    };

    const propsWithoutOnRemove = {
      cartItem: cartItemWithQuantity1,
      onQuantityChange: mockOnQuantityChange
    };

    render(<CartItem {...propsWithoutOnRemove} />);

    const minusButton = screen.getByTestId('icon-button-FiMinus');
    fireEvent.click(minusButton);

    expect(mockOnQuantityChange).not.toHaveBeenCalled();
  });

  it('disables buttons when isLoading is true', () => {
    render(<CartItem {...defaultProps} isLoading={true} />);

    const plusButton = screen.getByTestId('icon-button-FiPlus');
    const minusButton = screen.getByTestId('icon-button-FiMinus');

    expect(plusButton).toBeDisabled();
    expect(minusButton).toBeDisabled();
  });

  it('applies loading class when isLoading is true', () => {
    const { container } = render(<CartItem {...defaultProps} isLoading={true} />);
    
    const cartItemElement = container.querySelector('.cartItem');
    expect(cartItemElement).toHaveClass('loading');
  });

  it('does not apply loading class when isLoading is false', () => {
    const { container } = render(<CartItem {...defaultProps} isLoading={false} />);
    
    const cartItemElement = container.querySelector('.cartItem');
    expect(cartItemElement).not.toHaveClass('loading');
  });

  it('calculates and displays correct total price', () => {
    const cartItemWithDifferentQuantity: CartItemType = {
      ...mockCartItem,
      quantity: 3
    };

    render(<CartItem {...defaultProps} cartItem={cartItemWithDifferentQuantity} />);

    expect(screen.getByText('$77.97')).toBeInTheDocument(); 
  });
});