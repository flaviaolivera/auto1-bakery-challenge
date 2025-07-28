import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../../../components/common/buttons/IconButton/IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      description: 'Icon name from react-icons/fi',
      control: { type: 'text' }
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    onClick: {
      action: 'clicked'
    },
    children: {
      control: false
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'FiHome',
    size: 'medium'
  }
};

export const Small: Story = {
  args: {
    icon: 'FiUser',
    size: 'small'
  }
};

export const Large: Story = {
  args: {
    icon: 'FiSettings',
    size: 'large'
  }
};

export const Disabled: Story = {
  args: {
    icon: 'FiTrash',
    size: 'medium',
    disabled: true
  }
};

export const WithBadge: Story = {
  render: (args) => (
    <div className="position-relative d-inline-block">
      <IconButton {...args}>
        <span className="position-absolute badge rounded-pill bg-danger" style={{
          top: '-5px',
          right: '-8px',
          fontSize: '0.7rem',
          minWidth: '18px',
          height: '18px',
          lineHeight: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600'
        }}>
          3
        </span>
      </IconButton>
    </div>
  ),
  args: {
    icon: 'FiShoppingCart',
    size: 'medium'
  }
};

export const WithNotificationBadge: Story = {
  render: (args) => (
    <div className="position-relative d-inline-block">
      <IconButton {...args}>
        <span className="position-absolute badge rounded-pill bg-primary" style={{
          top: '-5px',
          right: '-8px',
          fontSize: '0.7rem',
          minWidth: '18px',
          height: '18px',
          lineHeight: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600'
        }}>
          99+
        </span>
      </IconButton>
    </div>
  ),
  args: {
    icon: 'FiBell',
    size: 'large'
  }
};
