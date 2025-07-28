import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, SelectOption } from '../../../../components/common/forms/Select/Select';

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: {
    },
    value: {
      control: { type: 'text' }
    },
    onChange: {
      action: 'changed'
    },
    placeholder: {
      control: { type: 'text' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions: SelectOption[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
];

const quantityOptions: SelectOption[] = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`
}));

const categoryOptions: SelectOption[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home' },
  { value: 'sports', label: 'Sports', disabled: true },
];

const SelectWithState = (props: any) => {
  const [value, setValue] = useState<string | number | undefined>(props.initialValue);
  return (
    <Select
      {...props}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        props.onChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <SelectWithState {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'Select option...'
  }
};

export const Quantity: Story = {
  render: (args) => <SelectWithState {...args} initialValue={1} />,
  args: {
    options: quantityOptions,
    placeholder: 'Quantity',
    size: 'sm'
  }
};

export const WithDisabledOptions: Story = {
  render: (args) => <SelectWithState {...args} />,
  args: {
    options: categoryOptions,
    placeholder: 'Select category...'
  }
};

export const SmallSize: Story = {
  render: (args) => <SelectWithState {...args} />,
  args: {
    options: basicOptions,
    size: 'sm',
    placeholder: 'Select option...'
  }
};

export const LargeSize: Story = {
  render: (args) => <SelectWithState {...args} />,
  args: {
    options: basicOptions,
    size: 'lg',
    placeholder: 'Select option...'
  }
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    placeholder: 'Select option...'
  }
};