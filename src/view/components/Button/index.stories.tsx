import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '.';
import { SearchIcon } from '../icons/SearchIcon';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'normal',
    variant: 'filled',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    size: 'normal',
    variant: 'filled',
    children: 'Search',
    icon: <SearchIcon />,
  },
};
