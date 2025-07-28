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

    it('shows cart badge when cartItemCount is provided', () => {
    render(<Navbar cartItemCount={3} />);
    
    const badge = document.querySelector('.badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('3');
  });

  it('does not show cart badge when cartItemCount is 0', () => {
    render(<Navbar cartItemCount={0} />);
    
    const badge = document.querySelector('.badge');
    expect(badge).not.toBeInTheDocument();
  });

  it('does not show cart badge when cartItemCount is not provided', () => {
    render(<Navbar />);
    
    const badge = document.querySelector('.badge');
    expect(badge).not.toBeInTheDocument();
  });

  it('shows 99+ when cartItemCount exceeds 99', () => {
    render(<Navbar cartItemCount={150} />);
    
    const badge = document.querySelector('.badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('99+');
  });
});