import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Thumbnail } from '../../../../components/common/media/Thumbnail';

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
    },
    alt: {
      control: { type: 'text' },
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://placehold.co/200x200/3B82F6/FFFFFF?text=Product',
    alt: 'Test image'
  }
};

export const SmallContainer: Story = {
  args: {
    src: 'https://placehold.co/64x64/3B82F6/FFFFFF?text=64px',
    alt: 'Small thumbnail'
  },
  decorators: [
    (Story) => (
      <div style={{ width: '64px', height: '64px', border: '1px dashed #ccc' }}>
        <Story />
      </div>
    )
  ],
};

export const MediumContainer: Story = {
  args: {
    src: 'https://placehold.co/120x120/10B981/FFFFFF?text=120px',
    alt: 'Medium thumbnail'
  },
  decorators: [
    (Story) => (
      <div style={{ width: '120px', height: '120px', border: '1px dashed #ccc' }}>
        <Story />
      </div>
    )
  ],
};

export const LargeContainer: Story = {
  args: {
    src: 'https://placehold.co/200x200/EF4444/FFFFFF?text=200px',
    alt: 'Large thumbnail'
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', height: '200px', border: '1px dashed #ccc' }}>
        <Story />
      </div>
    )
  ],
};

export const DifferentRatios: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ width: '100px', height: '100px', border: '1px dashed #ccc' }}>
        <Thumbnail src="https://placehold.co/100x100/3B82F6/FFFFFF?text=1:1" alt="Square" />
      </div>
      <div style={{ width: '120px', height: '80px', border: '1px dashed #ccc' }}>
        <Thumbnail src="https://placehold.co/120x80/10B981/FFFFFF?text=3:2" alt="Landscape" />
      </div>
      <div style={{ width: '80px', height: '120px', border: '1px dashed #ccc' }}>
        <Thumbnail src="https://placehold.co/80x120/EF4444/FFFFFF?text=2:3" alt="Portrait" />
      </div>
    </div>
  ),
};