import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  const mockOnClose = jest.fn();

  const defaultProps = {
    message: 'Product added to cart',
    isVisible: true,
    onClose: mockOnClose
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders toast with message when visible', () => {
    render(<Toast {...defaultProps} />);

    expect(screen.getByText('Product added to cart')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('does not render when isVisible is false', () => {
    render(<Toast {...defaultProps} isVisible={false} />);

    expect(screen.queryByText('Product added to cart')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Toast {...defaultProps} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('auto-closes after default delay', async () => {
    render(<Toast {...defaultProps} />);

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('auto-closes after custom delay', async () => {
    render(<Toast {...defaultProps} autoCloseDelay={2000} />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('renders success variant by default', () => {
    render(<Toast {...defaultProps} />);

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-success');
  });

  it('renders danger variant', () => {
    render(<Toast {...defaultProps} variant="danger" />);

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-danger');
  });

  it('clears timeout when component unmounts', () => {
    const { unmount } = render(<Toast {...defaultProps} />);

    unmount();
    jest.advanceTimersByTime(3000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});