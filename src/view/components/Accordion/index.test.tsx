import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Accordion } from '.';

describe('<Accordion />', () => {
  it('Should render the component correctly', () => {
    render(
      <Accordion
        content="Content"
        title="Accordion title"
        isCollapsed={false}
      />
    );

    expect(screen.queryByText('Accordion title')).toBeInTheDocument();
    expect(screen.queryByText('Content')).toBeInTheDocument();
  });

  it('Should toggle collapse', () => {
    render(
      <Accordion
        content="Content"
        title="Accordion title"
        isCollapsed={false}
      />
    );

    const accordionHeader = screen.getByRole('button');

    fireEvent.click(accordionHeader);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    fireEvent.click(accordionHeader);

    expect(screen.queryByText('Content')).toBeInTheDocument();
  });
});
