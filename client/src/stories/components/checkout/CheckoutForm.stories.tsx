import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutForm } from '../../../components/checkout/CheckoutForm/CheckoutForm';

const meta: Meta<typeof CheckoutForm> = {
  component: CheckoutForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSubmit: {
      action: 'form-submitted'
    },
    register: {
      description: 'Register function from React Hook Form',
      control: false
    },
    errors: {
      description: 'Errors object from React Hook Form',
      control: false
    },
    isLoading: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockRegister = (name: string) => ({
  name,
  onChange: () => {},
  onBlur: () => {},
  ref: () => {}
});

export const Default: Story = {
  args: {
    register: mockRegister as any,
    errors: {}
  }
};

export const WithErrors: Story = {
  args: {
    register: mockRegister as any,
    errors: {
      email: { message: 'Please enter a valid email address', type: 'required' },
      phone: { message: 'Phone number is required', type: 'required' },
      address: {
        street: { message: 'Street address is required', type: 'required' },
        city: { message: 'City is required', type: 'required' },
        postalCode: { message: 'Postal code must be 5 digits', type: 'pattern' }
      },
      paymentMethod: { message: 'Please select a payment method', type: 'required' }
    }
  }
};

export const Loading: Story = {
  args: {
    register: mockRegister as any,
    errors: {},
    isLoading: true
  }
};
