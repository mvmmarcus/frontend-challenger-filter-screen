import { describe, it, expect, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { SliderSelector } from '.';

const onChangeSliderValue = vitest.fn();

const DefaultComponent = () => (
  <SliderSelector
    min={0}
    max={100}
    valueMin={20}
    valueMax={80}
    onChange={onChangeSliderValue}
  />
);

describe('<SliderSelector />', () => {
  it('Should render the component correctly', () => {
    render(<DefaultComponent />);

    expect(screen.getByTestId('input-range-min')).toBeInTheDocument();
    expect(screen.getByTestId('input-range-max')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('Should change input range value', () => {
    render(<DefaultComponent />);

    const inputRangeMin = screen.getByTestId('input-range-min');
    const inputRangeMax = screen.getByTestId('input-range-max');

    fireEvent.change(inputRangeMin, { target: { value: 40 } });
    fireEvent.change(inputRangeMax, { target: { value: 60 } });

    expect(onChangeSliderValue).toHaveBeenCalledWith(40, 60);

    expect(inputRangeMin).toHaveProperty('value', '40');
    expect(inputRangeMax).toHaveProperty('value', '60');
  });
});
