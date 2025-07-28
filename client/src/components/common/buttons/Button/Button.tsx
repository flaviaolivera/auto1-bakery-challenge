import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  label: string;
  variant?: 'gradient-blue' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'gradient-blue',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
}) => {
  const baseClasses = `btn ${styles['custom-btn']}`;
  const variantClass = variant ? styles[variant] : '';
  const sizeClass = `btn-${size}`;
  const fullWidthClass = fullWidth ? 'w-100' : '';
  const loadingClass = loading ? styles.loading : '';
  
  const buttonClasses = [
    baseClasses,
    variantClass,
    sizeClass,
    fullWidthClass,
    loadingClass
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
      ) : (
        label
      )}
    </button>
  );
};