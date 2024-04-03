import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SliderSelector } from '.';

const meta = {
  title: 'Components/SliderSelector',
  component: SliderSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number', defaultValue: 0 },
    max: { control: 'number', defaultValue: 100 },
    valueMin: { control: 'number', defaultValue: 20 },
    valueMax: { control: 'number', defaultValue: 80 },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof SliderSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    valueMin: 20,
    valueMax: 80,
  },
};
