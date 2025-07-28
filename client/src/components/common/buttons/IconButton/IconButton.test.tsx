import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconButton } from './IconButton';

jest.mock('./IconButton.module.scss', () => ({
  'icon-btn': 'icon-btn',
  'small': 'small',
  'medium': 'medium',
  'large': 'large'
}));

jest.mock('react-icons/fi', () => ({
  FiPlus: () => <span data-testid="fi-plus">+</span>,
  FiMinus: () => <span data-testid="fi-minus">-</span>,
  FiX: () => <span data-testid="fi-x">×</span>,
}));

describe('IconButton Component', () => {
  it('renders with icon', () => {
    render(<IconButton icon="FiPlus" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('fi-plus')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<IconButton icon="FiPlus" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('icon-btn', 'medium');
    expect(button).toHaveAttribute('type', 'button');
  });

  // Icon tests
  it('renders different icons correctly', () => {
    const { rerender } = render(<IconButton icon="FiPlus" />);
    expect(screen.getByTestId('fi-plus')).toBeInTheDocument();

    rerender(<IconButton icon="FiMinus" />);
    expect(screen.getByTestId('fi-minus')).toBeInTheDocument();

    rerender(<IconButton icon="FiX" />);
    expect(screen.getByTestId('fi-x')).toBeInTheDocument();
  });

  // Size tests
  it('renders different sizes correctly', () => {
    const { rerender } = render(<IconButton icon="FiPlus" size="small" />);
    expect(screen.getByRole('button')).toHaveClass('small');

    rerender(<IconButton icon="FiPlus" size="medium" />);
    expect(screen.getByRole('button')).toHaveClass('medium');

    rerender(<IconButton icon="FiPlus" size="large" />);
    expect(screen.getByRole('button')).toHaveClass('large');
  });

  // State tests
  it('handles disabled state', () => {
    render(<IconButton icon="FiPlus" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  // Interaction tests
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<IconButton icon="FiPlus" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<IconButton icon="FiPlus" onClick={handleClick} disabled />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Accessibility tests
  it('has proper aria-label by default', () => {
    render(<IconButton icon="FiPlus" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'FiPlus button');
  });

  it('uses custom aria-label when provided', () => {
    render(<IconButton icon="FiPlus" aria-label="Add item" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Add item');
  });

  // Error handling
  it('handles invalid icon gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    // @ts-ignore - Testing invalid icon
    render(<IconButton icon="InvalidIcon" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  // Type attribute
  it('always renders with type="button"', () => {
    render(<IconButton icon="FiPlus" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});