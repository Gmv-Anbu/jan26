import { render } from '@testing-library/react';

import ApexChart from './apex-chart';

describe('ApexChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApexChart />);
    expect(baseElement).toBeTruthy();
  });
});
