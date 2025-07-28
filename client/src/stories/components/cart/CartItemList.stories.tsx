import type { Meta, StoryObj } from '@storybook/react';
import { CartItemList } from '../../../components/cart/CartItemList/CartItemList';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { Product } from '../../../types/Product';

const meta: Meta<typeof CartItemList> = {
  component: CartItemList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' }
    },
    onQuantityChange: {},
    onRemove: {},
    isLoading: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct1: Product = {
  id: '1',
  name: 'Wireless Headphones',
  price: 79.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
  slug: 'wireless-headphones',
  stock: 15
};

const mockProduct2: Product = {
  id: '2',
  name: 'Smartphone Case',
  price: 24.99,
  image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop',
  slug: 'smartphone-case',
  stock: 8
};

const mockProduct3: Product = {
  id: '3',
  name: 'Bluetooth Speaker',
  price: 45.50,
  image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
  slug: 'bluetooth-speaker',
  stock: 12
};

const singleCartItem: CartItemType[] = [
  { product: mockProduct1, quantity: 2 }
];

const multipleCartItems: CartItemType[] = [
  { product: mockProduct1, quantity: 2 },
  { product: mockProduct2, quantity: 1 },
  { product: mockProduct3, quantity: 3 }
];

const mockOnQuantityChange = (productId: string, newQuantity: number) => {
  console.log(`Quantity changed for product ${productId}: ${newQuantity}`);
};

const mockOnRemove = (productId: string) => {
  console.log(`Product removed: ${productId}`);
};

export const Default: Story = {
  args: {
    items: multipleCartItems,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false
  }
};

export const SingleItem: Story = {
  args: {
    items: singleCartItem,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false
  },
};

export const EmptyCart: Story = {
  args: {
    items: [],
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false
  },
};



