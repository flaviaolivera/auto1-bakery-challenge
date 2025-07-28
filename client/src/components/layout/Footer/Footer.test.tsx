import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the bakery name', () => {
    render(<Footer />);
    
    expect(screen.getByText('Auto1 Bakery Challenge')).toBeInTheDocument();
  });

  it('renders the copyright text with author name', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Copyright © 2025 Flavia Carolina Fernández Olivera/)).toBeInTheDocument();
  });

  it('renders LinkedIn link with correct attributes', () => {
    render(<Footer />);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/flavia-fernandezolivera/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('uses proper semantic HTML structure', () => {
    render(<Footer />);
    
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-light', 'border-top');
    
    const container = footer?.querySelector('.container');
    expect(container).toBeInTheDocument();
  });

  it('uses Bootstrap classes for styling', () => {
    render(<Footer />);
    
    const footer = document.querySelector('footer');
    expect(footer).toHaveClass('bg-light', 'border-top');
    
    const contentDiv = footer?.querySelector('.text-center.py-4');
    expect(contentDiv).toBeInTheDocument();
    
    const brandName = screen.getByText('Auto1 Bakery Challenge');
    expect(brandName.tagName).toBe('H6');
    expect(brandName).toHaveClass('mb-2');

    const copyrightParagraph = screen.getByText(/Copyright © 2025/).closest('p');
    expect(copyrightParagraph).toHaveClass('mb-0', 'text-muted');
  });

  it('has accessible link attributes', () => {
    render(<Footer />);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });

    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });
});