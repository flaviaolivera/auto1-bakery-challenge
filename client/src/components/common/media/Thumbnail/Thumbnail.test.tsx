import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Thumbnail } from './Thumbnail';

jest.mock('./Thumbnail.module.scss', () => ({
  thumbnail: 'thumbnail'
}));

describe('Thumbnail Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image'
  };

  it('renders image correctly', () => {
    render(<Thumbnail {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('applies correct src and alt attributes', () => {
    render(<Thumbnail {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test-image.jpg');
    expect(img).toHaveAttribute('alt', 'Test image');
  });

  it('applies thumbnail CSS class', () => {
    render(<Thumbnail {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('thumbnail');
  });

  it('has loading lazy by default', () => {
    render(<Thumbnail {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  // Accessibility tests
  it('has accessible alt text', () => {
    render(<Thumbnail src="/croissant.jpg" alt="Fresh croissant" />);
    expect(screen.getByAltText('Fresh croissant')).toBeInTheDocument();
  });

  it('works with different image sources', () => {
    const { rerender } = render(
      <Thumbnail src="/croissant.jpg" alt="Croissant" />
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', '/croissant.jpg');

    rerender(<Thumbnail src="/bread.png" alt="Bread" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/bread.png');
  });
});