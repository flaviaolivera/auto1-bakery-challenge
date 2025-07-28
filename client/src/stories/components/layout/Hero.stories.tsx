import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '../../../components/layout/Hero/Hero';

const meta: Meta<typeof Hero> = {
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
