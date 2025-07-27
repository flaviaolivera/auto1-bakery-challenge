import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../../../components/common/buttons';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
        variant: {
      control: { type: 'select' },
      options: ['gradient-blue'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state with spinner'
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'clicked',
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GradientBlue: Story = {
  args: {
    label: 'Add to Cart',
    size: 'md',
    variant: 'gradient-blue'
  }
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'sm'
  }
};

export const Medium: Story = {
  args: {
    label: 'Medium Button',
    size: 'md'
  }
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'lg'
  }
};


export const Loading: Story = {
  args: {
    loading: true,
    size: 'lg'
  }
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
};

