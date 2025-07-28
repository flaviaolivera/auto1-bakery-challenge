import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '../../../components/products/ProductCard/ProductCard';
import { Product } from '../../../types/Product';

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    product: {},
    onAddToCart: {
      action: 'add-to-cart'
    },
    isLoading: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProduct: Product = {
  id: '1',
  name: 'Premium T-Shirt',
  slug: 'premium-t-shirt',
  price: 29.99,
  stock: 8,
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  description: '100% organic cotton t-shirt, perfect for everyday wear. Modern and comfortable design.'
};

const outOfStockProduct: Product = {
  id: '4',
  name: 'Sold Out Product',
  slug: 'sold-out-product',
  price: 19.99,
  stock: 0,
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
  description: 'This product is temporarily out of stock.'
};

const productWithoutImage: Product = {
  id: '5',
  name: 'Product Without Image',
  slug: 'product-without-image',
  price: 15.50,
  stock: 8,
  description: 'Product that has no image configured, shows placeholder.'
};

const productWithLongName: Product = {
  id: '6',
  name: 'Product with an Extremely Long Name That Should Be Truncated in the Card Display Area',
  slug: 'product-long-name',
  price: 45.00,
  stock: 12,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  description: 'This product has a very long name to test text truncation in the product card. The description is also quite long to verify that it displays correctly with line limitations and proper overflow handling.'
};

export const Default: Story = {
  args: {
    product: sampleProduct
  }
};

export const OutOfStock: Story = {
  args: {
    product: outOfStockProduct
  }
};

export const WithoutImage: Story = {
  args: {
    product: productWithoutImage
  }
};

export const WithLongText: Story = {
  args: {
    product: productWithLongName
  }
};

export const Loading: Story = {
  args: {
    product: sampleProduct,
    isLoading: true
  }
};

export const Disabled: Story = {
  args: {
    product: sampleProduct,
    disabled: true
  }
};
