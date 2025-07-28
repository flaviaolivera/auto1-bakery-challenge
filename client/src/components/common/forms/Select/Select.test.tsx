import { render, screen, fireEvent } from '@testing-library/react';
import { Select, SelectOption } from './Select';

const mockOptions: SelectOption[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 'three', label: 'Option 3' },
  { value: 4, label: 'Option 4', disabled: true },
];

const mockOnChange = jest.fn();

describe('Select', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
        placeholder="Select option"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
      />
    );

    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange with correct value when option is selected', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });

    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange with string value when string option is selected', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'three' } });

    expect(mockOnChange).toHaveBeenCalledWith('three');
  });

  it('displays selected value correctly', () => {
    render(
      <Select
        options={mockOptions}
        value={2}
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('2');
  });

  it('can be disabled', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
        disabled
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('renders disabled options correctly', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
      />
    );

    const disabledOption = screen.getByText('Option 4');
    expect(disabledOption).toHaveAttribute('disabled');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
        size="sm"
      />
    );

    let select = screen.getByRole('combobox');
    expect(select).toHaveClass('form-select-sm');

    rerender(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
        size="lg"
      />
    );

    select = screen.getByRole('combobox');
    expect(select).toHaveClass('form-select-lg');
  });

  it('uses default placeholder when none provided', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('handles empty value correctly', () => {
    render(
      <Select
        options={mockOptions}
        onChange={mockOnChange}
        placeholder="Choose option"
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('');
  });
});