import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ProductGrid } from './ProductGrid';
import { Product } from '../../../types/Product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Test Product 1',
    slug: 'test-product-1',
    price: 29.99,
    stock: 10,
    image: 'https://example.com/product1.jpg',
    description: 'First test product'
  },
  {
    id: '2',
    name: 'Test Product 2',
    slug: 'test-product-2',
    price: 49.99,
    stock: 5,
    image: 'https://example.com/product2.jpg',
    description: 'Second test product'
  },
  {
    id: '3',
    name: 'Test Product 3',
    slug: 'test-product-3',
    price: 19.99,
    stock: 0,
    description: 'Third test product without image'
  }
];

const mockOnAddToCart = jest.fn();
const mockGetAvailableStock = (product: Product) => product.stock;

// Render helper
const renderProductGrid = (products = mockProducts) =>
  render(
    <ProductGrid
      products={products}
      onAddToCart={mockOnAddToCart}
      getAvailableStock={mockGetAvailableStock}
    />
  );

describe('ProductGrid', () => {
  beforeEach(() => {
    mockOnAddToCart.mockClear();
    cleanup();
  });

  it('renders all products in a responsive grid', () => {
    renderProductGrid();

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Test Product 3')).toBeInTheDocument();

    const gridContainer = document.querySelector('.row.g-4');
    expect(gridContainer).toBeInTheDocument();

    const columns = document.querySelectorAll('.col-sm-6.col-lg-4.col-xl-3');
    expect(columns).toHaveLength(3);
  });

  it('passes onAddToCart prop to ProductCard components', () => {
    renderProductGrid();

    const addToCartButtons = screen.getAllByText('Add to cart');
    fireEvent.click(addToCartButtons[0]);

    expect(mockOnAddToCart).toHaveBeenCalledWith('1', 1);
  });

  it('renders each product as a ProductCard', () => {
    renderProductGrid();

    const cards = document.querySelectorAll('.card');
    expect(cards).toHaveLength(3);

    const cardTitles = document.querySelectorAll('.card-title');
    expect(cardTitles).toHaveLength(3);
  });

  it('displays empty state when no products are provided', () => {
    renderProductGrid([]);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  it('handles products with different states correctly', () => {
    renderProductGrid();

    expect(screen.getAllByText('Add to cart')).toHaveLength(2);
    expect(screen.getAllByText('Out of stock')).toHaveLength(2);

    const images = document.querySelectorAll('.card-img-top');
    expect(images).toHaveLength(3);
  });

  it('maintains product order', () => {
    renderProductGrid();

    const cardTitles = document.querySelectorAll('.card-title');
    expect(cardTitles[0]).toHaveTextContent('Test Product 1');
    expect(cardTitles[1]).toHaveTextContent('Test Product 2');
    expect(cardTitles[2]).toHaveTextContent('Test Product 3');
  });

  it('uses Bootstrap responsive breakpoints', () => {
    renderProductGrid();

    const columns = document.querySelectorAll('[class*="col-"]');
    columns.forEach(column => {
      expect(column).toHaveClass('col-sm-6');
      expect(column).toHaveClass('col-lg-4');
      expect(column).toHaveClass('col-xl-3');
    });
  });
});
