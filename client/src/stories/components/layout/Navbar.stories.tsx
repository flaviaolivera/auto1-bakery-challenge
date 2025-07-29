import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../../components/layout/Navbar/Navbar';


const meta: Meta<typeof Navbar> = {
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    cartItemCount: {
      control: { type: 'number', min: 0, max: 200 }
    }
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCartItems: Story = {
  args: {
    cartItemCount: 3
  }
};

export const SingleItem: Story = {
  args: {
    cartItemCount: 1
  }
};

export const WithManyCartItems: Story = {
  args: {
    cartItemCount: 25
  }
};

export const MaxCount: Story = {
  args: {
    cartItemCount: 99
  }
};

export const WithOverflowCartItems: Story = {
  args: {
    cartItemCount: 150
  }
};

