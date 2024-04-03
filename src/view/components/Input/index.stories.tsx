import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useArgs } from '@storybook/preview-api';
import { Input, InputProps } from '.';
import { SearchIcon } from '../icons/SearchIcon';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const InputComponent = (args: InputProps) => {
  {
    const [, setArgs] = useArgs();

    return (
      <Input
        onChange={(event) => {
          setArgs({ value: event.target.value });
          args.onChange?.(event);
        }}
        {...args}
      />
    );
  }
};

export const Default: Story = {
  args: {
    placeholder: 'Enter Something',
    name: 'default',
  },
  render: InputComponent,
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search',
    name: 'search',
    icon: <SearchIcon />,
  },
  render: InputComponent,
};
