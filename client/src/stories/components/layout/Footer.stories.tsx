import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../../../components/layout/Footer/Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongContent: Story = {
  render: () => (
    <div>
      <div style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
        <div className="container">
          <h1>Long Page Content</h1>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              This is paragraph {i + 1} of long content to demonstrate how the footer appears 
              after scrolling through a longer page. The footer maintains its styling and 
              functionality regardless of page length.
            </p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
};
