// src/components/common/ui/Select/Select.tsx
import React from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  disabled = false,
  size = 'md',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    
    // Convert back to number if the original option value was a number
    const option = options.find(opt => opt.value.toString() === selectedValue);
    if (option) {
      onChange(option.value);
    }
  };

  const selectClasses = [
    'form-select',
    styles.select,
    size !== 'md' && `form-select-${size}`,
  ].filter(Boolean).join(' ');

  return (
    <select
      className={selectClasses}
      value={value?.toString() || ''}
      onChange={handleChange}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};