import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../../../../components/common/indicators';

const meta: Meta<typeof Toast> = {
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { type: 'text' }
    },
    variant: {
      control: { type: 'select' },
      options: ['success', 'danger']
    },
    isVisible: {
      control: { type: 'boolean' }
    },
    onClose: {
      description: 'Callback fired when toast is closed'
    },
    autoCloseDelay: {
      control: { type: 'number', min: 1000, max: 5000, step: 500 }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockOnClose = () => {
  console.log('Toast closed');
};

export const ProductAdded: Story = {
  args: {
    message: 'Product added to cart',
    variant: 'success',
    isVisible: true,
    onClose: mockOnClose,
    autoCloseDelay: 3000
  }
};

export const ProductRemoved: Story = {
  args: {
    message: 'Product removed from cart',
    variant: 'danger',
    isVisible: true,
    onClose: mockOnClose,
    autoCloseDelay: 3000
  }
};

