import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { IconButton } from '../../../../components/common/buttons';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      description: 'Icon name from react-icons/fi'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Button size'
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'clicked',
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Plus: Story = {
  args: {
    icon: 'FiPlus',
  }
};

export const Minus: Story = {
  args: {
    icon: 'FiMinus', 
  }
};

export const Small: Story = {
  args: {
    icon: 'FiPlus',
    size: 'small',
  }
};

export const Medium: Story = {
  args: {
    icon: 'FiPlus',
    size: 'medium',
  }
};

export const Large: Story = {
  args: {
    icon: 'FiPlus',
    size: 'large',
  }
};

export const Disabled: Story = {
  args: {
    icon: 'FiPlus',
    disabled: true,
  }
};
