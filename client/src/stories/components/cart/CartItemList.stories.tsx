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
    },
    canIncreaseQuantity: {},
    canDecreaseQuantity: {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct1: Product = {
  id: '1',
  name: 'Croissant',
  price: 3.99,
  image: 'https://images.unsplash.com/photo-1555507036-ab794f575c7c?w=300&h=300&fit=crop',
  slug: 'croissant',
  stock: 15
};

const mockProduct2: Product = {
  id: '2',
  name: 'Chocolate Muffin',
  price: 4.50,
  image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=300&fit=crop',
  slug: 'chocolate-muffin',
  stock: 8
};

const mockProduct3: Product = {
  id: '3',
  name: 'Fresh Bread',
  price: 2.25,
  image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop',
  slug: 'fresh-bread',
  stock: 3
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

const mockCanIncreaseQuantity = (productId: string): boolean => {
  const product = [mockProduct1, mockProduct2, mockProduct3].find(p => p.id === productId);
  const currentItem = multipleCartItems.find(item => item.product.id === productId);
  return product && currentItem ? currentItem.quantity < product.stock : true;
};

const mockCanDecreaseQuantity = (productId: string): boolean => {
  return true; 
};

const mockCanIncreaseQuantityLimited = (productId: string): boolean => {
  if (productId === '3') return false; 
  return mockCanIncreaseQuantity(productId);
};

export const Default: Story = {
  args: {
    items: multipleCartItems,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false,
    canIncreaseQuantity: mockCanIncreaseQuantity,
    canDecreaseQuantity: mockCanDecreaseQuantity
  }
};

export const SingleItem: Story = {
  args: {
    items: singleCartItem,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false,
    canIncreaseQuantity: mockCanIncreaseQuantity,
    canDecreaseQuantity: mockCanDecreaseQuantity
  },
};

export const EmptyCart: Story = {
  args: {
    items: [],
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false,
    canIncreaseQuantity: mockCanIncreaseQuantity,
    canDecreaseQuantity: mockCanDecreaseQuantity
  },
};

export const Loading: Story = {
  args: {
    items: multipleCartItems,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: true,
    canIncreaseQuantity: mockCanIncreaseQuantity,
    canDecreaseQuantity: mockCanDecreaseQuantity
  },
};

export const StockLimited: Story = {
  args: {
    items: multipleCartItems,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false,
    canIncreaseQuantity: mockCanIncreaseQuantityLimited,
    canDecreaseQuantity: mockCanDecreaseQuantity
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows behavior when some items reach their stock limit (Fresh Bread cannot be increased).'
      }
    }
  }
};

export const WithoutDecreaseFunction: Story = {
  args: {
    items: multipleCartItems,
    onQuantityChange: mockOnQuantityChange,
    onRemove: mockOnRemove,
    isLoading: false,
    canIncreaseQuantity: mockCanIncreaseQuantity,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates default behavior when canDecreaseQuantity is not provided (always returns true).'
      }
    }
  }
};