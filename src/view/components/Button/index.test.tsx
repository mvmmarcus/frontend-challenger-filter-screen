import { describe, it, expect, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '.';
import { SearchIcon } from '../icons/SearchIcon';

describe('<Button />', () => {
  it('Should render the component correctly', () => {
    render(<Button>Button</Button>);

    expect(screen.queryByText('Button')).toBeInTheDocument();
  });

  it('Should render the small outlined variant component ', () => {
    render(
      <Button variant="outlined" size="small">
        Button
      </Button>
    );

    expect(screen.getByRole('button')).toHaveClass('bg-transparent py-1 h-6');
  });

  it('Should render the component with icon', () => {
    render(
      <Button
        icon={
          <span data-testid="button-search-icon">
            <SearchIcon />
          </span>
        }
      >
        Button
      </Button>
    );

    expect(screen.getByTestId('button-search-icon')).toBeInTheDocument();
  });

  it('Should call onClick function', () => {
    const onClick = vitest.fn();

    render(
      <Button
        onClick={onClick}
        icon={
          <span data-testid="button-search-icon">
            <SearchIcon />
          </span>
        }
      >
        Button
      </Button>
    );

    fireEvent.click(screen.getByTestId('button-search-icon'));

    expect(onClick).toHaveBeenCalled();
  });
});
