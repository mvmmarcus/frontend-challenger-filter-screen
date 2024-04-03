import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { FilterPage } from '.';
import { colorFilters, items } from './helpers';

const DefaultComponent = () => <FilterPage />;

describe('<FilterPage />', () => {
  it('Should render the component correctly', () => {
    render(<DefaultComponent />);

    const sliderMinValue = screen.getByTestId('slider-min-value');
    const sliderMaxValue = screen.getByTestId('slider-max-value');

    const resetAllButton = screen.getByRole('button', { name: 'RESET ALL' });
    const searchInput = screen.getByTestId('search-input');

    expect(screen.getByText('Filter by:')).toBeInTheDocument();
    expect(resetAllButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(screen.getByText('COLOR')).toBeInTheDocument();

    colorFilters.forEach((color) => {
      expect(screen.getByText(color.label)).toBeInTheDocument();
    });

    const filteredItems = items.filter((item) => {
      return (
        item.price >= Number(sliderMinValue.textContent) &&
        item.price <= Number(sliderMaxValue.textContent)
      );
    });

    filteredItems.forEach((item) => {
      expect(screen.getByText(item.price.toFixed(2))).toBeInTheDocument();
    });

    expect(
      screen.getByText(`ITEMS (${filteredItems.length})`)
    ).toBeInTheDocument();
  });

  it('Should filter items by search filter', () => {
    render(<DefaultComponent />);

    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 23 } });

    expect(screen.getByText(`ITEMS (2)`)).toBeInTheDocument();
  });

  it('Should filter items by colors filter', () => {
    render(<DefaultComponent />);

    const tealButtonFilter = screen.getByRole('button', { name: 'Teal' });

    fireEvent.click(tealButtonFilter);

    expect(screen.getByText(`ITEMS (1)`)).toBeInTheDocument();

    fireEvent.click(tealButtonFilter);

    expect(screen.getByText(`ITEMS (10)`)).toBeInTheDocument();
  });

  it('Should trigger reset all button', () => {
    render(<DefaultComponent />);

    const resetAllButton = screen.getByRole('button', { name: 'RESET ALL' });

    expect(screen.getByText(`ITEMS (10)`)).toBeInTheDocument();

    fireEvent.click(resetAllButton);

    expect(screen.getByText(`ITEMS (37)`)).toBeInTheDocument();
  });
});
