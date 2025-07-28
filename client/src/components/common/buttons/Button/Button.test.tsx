import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with label', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<Button label="Default" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-md');
    expect(button).toHaveAttribute('type', 'button');
  });

  // Variant tests
  it('renders gradient-blue variant correctly', () => {
    render(<Button label="Gradient Blue" variant="gradient-blue" />);
    expect(screen.getByRole('button')).toHaveClass('gradient-blue');
  });
  
  // Size tests
  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button label="Small" size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('btn-sm');

    rerender(<Button label="Medium" size="md" />);
    expect(screen.getByRole('button')).toHaveClass('btn-md');

    rerender(<Button label="Large" size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  // State tests
  it('handles disabled state', () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('handles loading state', () => {
    render(<Button label="Loading" loading />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('loading');
    expect(button.querySelector('.spinner-border')).toBeInTheDocument(); // spinner
  });

  it('renders full width when specified', () => {
    render(<Button label="Full Width" fullWidth />);
    expect(screen.getByRole('button')).toHaveClass('w-100');
  });

  // Interaction tests
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Clickable" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button label="Disabled" onClick={handleClick} disabled />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(<Button label="Loading" onClick={handleClick} loading />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Type attribute tests
  it('renders with custom type attribute', () => {
    render(<Button label="Submit" type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  // Accessibility tests
  it('has proper accessibility attributes', () => {
    render(<Button label="Accessible" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName('Accessible');
  });

  it('shows loading spinner with proper accessibility', () => {
    render(<Button label="Loading" loading />);
    const button = screen.getByRole('button');
    const spinner = button.querySelector('.spinner-border');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });
});