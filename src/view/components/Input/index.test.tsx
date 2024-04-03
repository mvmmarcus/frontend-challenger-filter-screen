import { describe, it, expect, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from '.';
import { CloseIcon } from '../icons/CloseIcon';

describe('<Input />', () => {
  it('Should render the component correctly', () => {
    render(<Input name="input" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Should render the component with icon', () => {
    render(
      <Input
        name="input"
        icon={
          <span data-testid="input-close-icon">
            <CloseIcon />
          </span>
        }
      />
    );

    expect(screen.getByTestId('input-close-icon')).toBeInTheDocument();
  });

  it('Should trigger onChange function', () => {
    const onChange = vitest.fn();

    render(<Input name="input" onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'text' },
    });

    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('textbox')).toHaveProperty('value', 'text');
  });

  it('Should trigger onClear function', () => {
    const onClear = vitest.fn();

    render(<Input name="input" value="text" onClear={onClear} />);

    expect(screen.getByRole('textbox')).toHaveProperty('value', 'text');

    fireEvent.click(screen.getByRole('button'));

    expect(onClear).toHaveBeenCalled();
    expect(screen.getByRole('textbox')).toHaveProperty('value', '');
  });
});
