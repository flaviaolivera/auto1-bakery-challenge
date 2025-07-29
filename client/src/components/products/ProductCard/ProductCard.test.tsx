import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard, ProductCardProps } from './ProductCard';
import { Product } from '../../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  price: 29.99,
  stock: 10,
  image: 'https://blocks.astratic.com/img/general-img-landscape.png',
  description: 'A test product description'
};

const mockOnAddToCart = jest.fn();

const renderProductCard = (props?: Partial<ProductCardProps>) =>
  render(
    <ProductCard
      product={mockProduct}
      onAddToCart={mockOnAddToCart}
      availableStock={mockProduct.stock}
      {...props}
    />
  );

describe('ProductCard', () => {
  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    renderProductCard();

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('€29.99')).toBeInTheDocument();
  });

  it('renders with default quantity of 1', () => {
    renderProductCard();

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('1');
  });

  it('allows quantity to be changed via select', () => {
    renderProductCard();

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '3' } });

    expect(select).toHaveValue('3');
  });

  it('generates quantity options based on stock', () => {
    const lowStockProduct = { ...mockProduct, stock: 3 };

    render(
      <ProductCard
        product={lowStockProduct}
        onAddToCart={mockOnAddToCart}
        availableStock={3}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).not.toBeInTheDocument();
  });

  it('generates options up to available stock without artificial limit', () => {
    const highStockProduct = { ...mockProduct, stock: 15 };

    render(
      <ProductCard
        product={highStockProduct}
        onAddToCart={mockOnAddToCart}
        availableStock={15}
      />
    );

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.queryByText('16')).not.toBeInTheDocument();
  });

  it('calls onAddToCart with correct product id and quantity', () => {
    renderProductCard();

    const addButton = screen.getByText('Add to cart');
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '3' } });
    fireEvent.click(addButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith('1', 3);
  });

  it('shows out of stock state when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };

    render(
      <ProductCard
        product={outOfStockProduct}
        onAddToCart={mockOnAddToCart}
        availableStock={0}
      />
    );

    expect(screen.getAllByText('Out of stock')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /out of stock/i })).toBeDisabled();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByText('Quantity:')).not.toBeInTheDocument();
  });

  it('disables card when disabled prop is true', () => {
    renderProductCard({ disabled: true });

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled();
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders without description when not provided', () => {
    const productWithoutDescription = { ...mockProduct, description: undefined };

    render(
      <ProductCard
        product={productWithoutDescription}
        onAddToCart={mockOnAddToCart}
        availableStock={mockProduct.stock}
      />
    );

    expect(screen.queryByText('A test product description')).not.toBeInTheDocument();
  });

  it('uses Bootstrap card structure correctly', () => {
    renderProductCard();

    const card = document.querySelector('.card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('h-100');

    const cardImg = document.querySelector('.card-img-top');
    expect(cardImg).toBeInTheDocument();

    const cardBody = document.querySelector('.card-body');
    expect(cardBody).toBeInTheDocument();

    const cardTitle = document.querySelector('.card-title');
    expect(cardTitle).toBeInTheDocument();

    const cardText = document.querySelector('.card-text');
    expect(cardText).toBeInTheDocument();
  });
});
