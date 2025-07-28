import React from 'react';
import * as Icons from 'react-icons/fi';
import styles from './IconButton.module.scss';

export interface IconButtonProps {
  icon: keyof typeof Icons;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  size = 'medium',
  children,
}) => {
  const IconComponent = Icons[icon] as React.ComponentType;

  if (!IconComponent) {
    return null;
  }

  const baseClasses = styles['icon-btn'];
  const sizeClass = styles[size];
  
  const buttonClasses = [
    baseClasses,
    sizeClass
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ `${icon} button`}
    >
      <IconComponent />
      {children}
    </button>
  );
};