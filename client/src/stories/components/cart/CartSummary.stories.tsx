import type { Meta, StoryObj } from '@storybook/react';
import { CartSummary } from '../../../components/cart/CartSummary/CartSummary';
import { CartSummary as CartSummaryType } from '../../../types/CartSummary';
import { Product } from '../../../types/Product';

const meta: Meta<typeof CartSummary> = {
  component: CartSummary,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light-gray',
      values: [
        { name: 'light-gray', value: '#f8f9fa' }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    cartSummary: {
      control: { type: 'object' }
    },
    onClick: {},
    isLoading: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct1: Product = {
  id: '1',
  name: 'Croissant',
  price: 20.90,
  image: 'https://images.unsplash.com/photo-1555507036-ab794f4ade8a?w=300&h=300&fit=crop',
  slug: 'croissant',
  stock: 10
};

const mockProduct2: Product = {
  id: '2',
  name: 'Bread',
  price: 3.90,
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
  slug: 'bread',
  stock: 15
};

const mockProduct3: Product = {
  id: '3',
  name: 'Cupcake',
  price: 2.50,
  image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300&h=300&fit=crop',
  slug: 'cupcake',
  stock: 20
};

const sampleCartSummary: CartSummaryType = {
  items: [
    { product: mockProduct1, quantity: 2 },
    { product: mockProduct2, quantity: 3 },
    { product: mockProduct3, quantity: 10 }
  ],
  totalItems: 15,
  totalPrice: 78.50
};

const smallCartSummary: CartSummaryType = {
  items: [
    { product: mockProduct1, quantity: 1 }
  ],
  totalItems: 1,
  totalPrice: 20.90
};

const emptyCartSummary: CartSummaryType = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const mockOnClick = () => {};

export const Default: Story = {
  args: {
    cartSummary: sampleCartSummary,
    onClick: mockOnClick,
    isLoading: false
  }
};

export const Loading: Story = {
  args: {
    cartSummary: sampleCartSummary,
    onClick: mockOnClick,
    isLoading: true
  },
};

export const EmptyCart: Story = {
  args: {
    cartSummary: emptyCartSummary,
    onClick: mockOnClick,
    isLoading: false
  },
};


