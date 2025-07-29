import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  label: string | React.ReactNode;
  variant?: 'gradient-blue' | 'secondary' | 'dark';
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
  const isCustomVariant = variant === 'gradient-blue';
  
  const baseClasses = 'btn';
  const variantClass = isCustomVariant 
    ? `${styles['custom-btn']} ${styles[variant]}` 
    : `btn-${variant}`;
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