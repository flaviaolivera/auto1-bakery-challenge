import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from '../../../components/cart/CartItem/CartItem';
import { CartItem as CartItemType } from '../../../types/CartItem';

const meta: Meta<typeof CartItem> = {
  component: CartItem,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    cartItem: {},
    onQuantityChange: {
      action: 'quantity-changed'
    },
    onRemove: {
      action: 'item-removed'
    },
    isLoading: {
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '1rem' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCartItem: CartItemType = {
  product: {
    id: '1',
    name: 'Premium T-Shirt',
    slug: 'premium-t-shirt',
    price: 29.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: '100% organic cotton t-shirt'
  },
  quantity: 2
};

const cartItemWithoutImage: CartItemType = {
  product: {
    id: '4',
    name: 'Without Image',
    slug: 'product-without-image',
    price: 15.75,
    stock: 10,
    description: 'Product that shows placeholder image'
  },
  quantity: 3
};

const cartItemWithLongName: CartItemType = {
  product: {
    id: '5',
    name: 'Product with a Very Long Name That Should Be Truncated in the Cart Item Display',
    slug: 'product-long-name',
    price: 45.00,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Product with very long name'
  },
  quantity: 4
};

export const Default: Story = {
  args: {
    cartItem: sampleCartItem
  }
};

export const WithoutImage: Story = {
  args: {
    cartItem: cartItemWithoutImage
  }
};

export const LongProductName: Story = {
  args: {
    cartItem: cartItemWithLongName
  }
};
