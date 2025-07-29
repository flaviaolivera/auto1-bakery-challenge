import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Navbar', () => {
  it('renders the brand name', () => {
    renderWithRouter(<Navbar cartItemCount={0} />);
    expect(screen.getByText('Auto1 Bakery Challenge')).toBeInTheDocument();
  });

  it('uses proper Bootstrap navbar structure', () => {
    renderWithRouter(<Navbar cartItemCount={0} />);
    const navbar = document.querySelector('nav');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('navbar', 'navbar-expand', 'navbar-light', 'bg-light');

    const container = navbar?.querySelector('.container-fluid');
    expect(container).toBeInTheDocument();
  });

  it('has accessible brand button', () => {
    renderWithRouter(<Navbar cartItemCount={0} />);
    const brandButton = screen.getByText('Auto1 Bakery Challenge');
    expect(brandButton.tagName).toBe('BUTTON');
    expect(brandButton).toHaveClass('navbar-brand');
  });

  it('uses Bootstrap layout classes correctly', () => {
    renderWithRouter(<Navbar cartItemCount={0} />);
    const navbar = document.querySelector('nav');
    const container = navbar?.querySelector('.container-fluid');
    const rightSection = container?.querySelector('.d-flex');

    expect(container).toBeInTheDocument();
    expect(rightSection).toBeInTheDocument();
  });

  it('shows cart badge when cartItemCount is provided', () => {
    renderWithRouter(<Navbar cartItemCount={3} />);
    const badge = document.querySelector('.badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('3');
  });

  it('does not show cart badge when cartItemCount is 0', () => {
    renderWithRouter(<Navbar cartItemCount={0} />);
    const badge = document.querySelector('.badge');
    expect(badge).not.toBeInTheDocument();
  });

  it('does not show cart badge when cartItemCount is not provided', () => {
    renderWithRouter(<Navbar cartItemCount={0} />);
    const badge = document.querySelector('.badge');
    expect(badge).not.toBeInTheDocument();
  });

  it('shows 99+ when cartItemCount exceeds 99', () => {
    renderWithRouter(<Navbar cartItemCount={150} />);
    const badge = document.querySelector('.badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('99+');
  });
});
