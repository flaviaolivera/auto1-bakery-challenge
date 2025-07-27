import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Icon } from '../../../../components/common/media/Icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      description: 'Icon name from react-icons/fi'
    },
    size: {
      control: { type: 'number'},
      description: 'Icon size in pixels or CSS units'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default sizes
export const Default: Story = {
  args: {
    name: 'FiHeart'
  }
};

export const Small: Story = {
  args: {
    name: 'FiStar',
    size: 16
  }
};

export const Medium: Story = {
  args: {
    name: 'FiSmile',
    size: 24
  }
};

export const Large: Story = {
  args: {
    name: 'FiThumbsUp',
    size: 48
  }
};

export const ExtraLarge: Story = {
  args: {
    name: 'FiGift',
    size: 200
  }
};
