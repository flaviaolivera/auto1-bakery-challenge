import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';


describe('Hero', () => {
  it('renders the main title', () => {
    render(<Hero />);
    
    expect(screen.getByText('Welcome to Auto1 Bakery Challenge')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Hero />);
    
    expect(screen.getByText('Fresh baked goods daily')).toBeInTheDocument();
  });

  it('renders the Shop Now button', () => {
    render(<Hero />);
    
    const shopButton = screen.getByRole('button', { name: /shop now/i });
    expect(shopButton).toBeInTheDocument();
  });

  it('uses proper semantic HTML structure', () => {
    render(<Hero />);
    
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();

    const container = section?.querySelector('.container');
    expect(container).toBeInTheDocument();
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});