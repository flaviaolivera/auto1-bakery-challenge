import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from '../../../components/products/ProductGrid/ProductGrid';
import { Product } from '../../../types/Product';

const meta: Meta<typeof ProductGrid> = {
  component: ProductGrid,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    products: {},
    onAddToCart: {
      action: 'add-to-cart'
    }
  },
  decorators: [
    (Story) => (
      <div className="container-fluid p-4">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium T-Shirt',
    slug: 'premium-t-shirt',
    price: 29.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: '100% organic cotton t-shirt, perfect for everyday wear.'
  },
  {
    id: '2',
    name: 'Leather Jacket',
    slug: 'leather-jacket',
    price: 299.99,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Handcrafted genuine leather jacket.'
  },
  {
    id: '3',
    name: 'Sports Sneakers',
    slug: 'sports-sneakers',
    price: 89.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'High-performance running shoes.'
  },
  {
    id: '4',
    name: 'Sold Out Item',
    slug: 'sold-out-item',
    price: 49.99,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
    description: 'This popular item is currently out of stock.'
  }
];

const manyProducts: Product[] = [
  ...sampleProducts,
  {
    id: '5',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    price: 199.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Premium noise-cancelling headphones.'
  },
  {
    id: '6',
    name: 'Smart Watch',
    slug: 'smart-watch',
    price: 399.99,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Advanced fitness and health tracking.'
  },
  {
    id: '7',
    name: 'Backpack',
    slug: 'backpack',
    price: 79.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Durable travel backpack with laptop compartment.'
  },
  {
    id: '8',
    name: 'Coffee Mug',
    slug: 'coffee-mug',
    price: 24.99,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
    description: 'Ceramic mug perfect for your morning coffee.'
  }
];

export const Default: Story = {
  args: {
    products: sampleProducts
  }
};

export const SingleProduct: Story = {
  args: {
    products: [sampleProducts[0]]
  }
};

export const TwoProducts: Story = {
  args: {
    products: sampleProducts.slice(0, 2)
  }
};

export const ManyProducts: Story = {
  args: {
    products: manyProducts
  }
};

export const AllOutOfStock: Story = {
  args: {
    products: sampleProducts.map(product => ({ ...product, stock: 0 }))
  }
};