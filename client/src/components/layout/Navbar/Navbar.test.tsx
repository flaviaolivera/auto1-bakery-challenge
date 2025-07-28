import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';


describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Auto1 Bakery Challenge')).toBeInTheDocument();
  });

  it('renders the cart icon button', () => {
    render(<Navbar />);
    
    const cartButton = screen.getByLabelText('Go to cart');
    expect(cartButton).toBeInTheDocument();
  });

  it('uses proper Bootstrap navbar structure', () => {
    render(<Navbar />);
    
    const navbar = document.querySelector('nav');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('navbar', 'navbar-expand', 'navbar-light', 'bg-light');
    
    const container = navbar?.querySelector('.container-fluid');
    expect(container).toBeInTheDocument();
  });

  it('has accessible brand button', () => {
    render(<Navbar />);
    
    const brandButton = screen.getByText('Auto1 Bakery Challenge');
    expect(brandButton.tagName).toBe('BUTTON');
    expect(brandButton).toHaveClass('navbar-brand');
  });

  it('has accessible cart button with aria-label', () => {
    render(<Navbar />);
    
    const cartButton = screen.getByLabelText('Go to cart');
    expect(cartButton).toBeInTheDocument();
    expect(cartButton).toHaveAttribute('aria-label', 'Go to cart');
  });

  it('uses Bootstrap layout classes correctly', () => {
    render(<Navbar />);
    
    const navbar = document.querySelector('nav');
    const container = navbar?.querySelector('.container-fluid');
    const rightSection = container?.querySelector('.d-flex');
    
    expect(container).toBeInTheDocument();
    expect(rightSection).toBeInTheDocument();
  });
});