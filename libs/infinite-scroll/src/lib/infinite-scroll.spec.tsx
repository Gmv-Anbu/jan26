import { render } from '@testing-library/react';

import InfiniteScroll from './infinite-scroll';

describe('InfiniteScroll', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfiniteScroll />);
    expect(baseElement).toBeTruthy();
  });
});
