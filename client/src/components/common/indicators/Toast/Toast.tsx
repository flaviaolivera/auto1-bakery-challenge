import React, { useEffect } from 'react';

export type ToastVariant = 'success' | 'danger';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  isVisible: boolean;
  onClose: () => void;
  autoCloseDelay?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'success',
  isVisible,
  onClose,
  autoCloseDelay = 3000
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoCloseDelay, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`toast show fade bg-${variant} text-white`}
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      style={{ minWidth: '250px' }}
    >
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-white me-2 m-auto" 
          aria-label="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};