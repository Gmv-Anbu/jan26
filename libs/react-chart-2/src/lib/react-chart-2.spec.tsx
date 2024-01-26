import { render } from '@testing-library/react';

import ReactChart2 from './react-chart-2';

describe('ReactChart2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactChart2 />);
    expect(baseElement).toBeTruthy();
  });
});
