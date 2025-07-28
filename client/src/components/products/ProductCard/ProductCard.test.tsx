import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
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

describe('ProductCard', () => {
  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('€29.99')).toBeInTheDocument();
  });

  it('renders with default quantity of 1', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('1');
  });

  it('allows quantity to be changed via select', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

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
      />
    );

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.queryByText('16')).not.toBeInTheDocument();
  });

  it('calls onAddToCart with correct product id and quantity', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

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
      />
    );

    expect(screen.getAllByText('Out of stock')).toHaveLength(2); 

    expect(screen.getByRole('button', { name: /out of stock/i })).toBeDisabled();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByText('Quantity:')).not.toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        isLoading={true}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('.spinner-border')).toBeInTheDocument();

    expect(button).toHaveClass('loading');
  });

  it('disables card when disabled prop is true', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        disabled={true}
      />
    );

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled();
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders without description when not provided', () => {
    const productWithoutDescription = { ...mockProduct, description: undefined };
    
    render(
      <ProductCard 
        product={productWithoutDescription} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    expect(screen.queryByText('A test product description')).not.toBeInTheDocument();
  });

  it('uses Bootstrap card structure correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

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