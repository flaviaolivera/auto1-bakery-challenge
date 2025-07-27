import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Icon } from './Icon';

jest.mock('react-icons/fi', () => ({
  FiHeart: ({ size }: { size?: number | string }) => (
    <span data-testid="fi-heart" data-size={size}>♥</span>
  ),
  FiStar: ({ size }: { size?: number | string }) => (
    <span data-testid="fi-star" data-size={size}>★</span>
  ),
  FiSmile: ({ size }: { size?: number | string }) => (
    <span data-testid="fi-smile" data-size={size}>😊</span>
  ),
}));

describe('Icon Component', () => {
  it('renders icon correctly', () => {
    render(<Icon name="FiHeart" />);
    expect(screen.getByTestId('fi-heart')).toBeInTheDocument();
  });

  it('renders with default size', () => {
    render(<Icon name="FiHeart" />);
    const icon = screen.getByTestId('fi-heart');
    expect(icon).toHaveAttribute('data-size', '24');
  });

  // Size tests
  it('renders with custom numeric size', () => {
    render(<Icon name="FiHeart" size={48} />);
    const icon = screen.getByTestId('fi-heart');
    expect(icon).toHaveAttribute('data-size', '48');
  });

  it('renders with custom string size', () => {
    render(<Icon name="FiHeart" size="2rem" />);
    const icon = screen.getByTestId('fi-heart');
    expect(icon).toHaveAttribute('data-size', '2rem');
  });

  // Different icons tests
  it('renders different icons correctly', () => {
    const { rerender } = render(<Icon name="FiHeart" />);
    expect(screen.getByTestId('fi-heart')).toBeInTheDocument();

    rerender(<Icon name="FiStar" />);
    expect(screen.getByTestId('fi-star')).toBeInTheDocument();

    rerender(<Icon name="FiSmile" />);
    expect(screen.getByTestId('fi-smile')).toBeInTheDocument();
  });

  // Error handling
  it('handles invalid icon gracefully', () => {
    // @ts-ignore - Testing invalid icon
    render(<Icon name="InvalidIcon" />);
    
    // Should not render anything
    expect(screen.queryByTestId('fi-heart')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fi-star')).not.toBeInTheDocument();
  });

  // Size variations
  it('works with different size formats', () => {
    const { rerender } = render(<Icon name="FiHeart" size={16} />);
    expect(screen.getByTestId('fi-heart')).toHaveAttribute('data-size', '16');

    rerender(<Icon name="FiHeart" size="1.5rem" />);
    expect(screen.getByTestId('fi-heart')).toHaveAttribute('data-size', '1.5rem');

    rerender(<Icon name="FiHeart" size="100px" />);
    expect(screen.getByTestId('fi-heart')).toHaveAttribute('data-size', '100px');
  });
});