import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import NftCard from '../pages/customer/base/nftcard';
import { screen } from '@testing-library/react';
import { render } from 'modules/test-utils';

const mockState = {};

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: 'test',
    S3_IMG_URL: 'test'
  }
}))

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(callback => callback(mockState)),
  useDispatch: jest.fn().mockReturnValue(() => { })
}));

describe('<NftCard/>', () => {
  it('should render without issues', () => {
    render(<NftCard />)
    const content = screen.getByText(/CoinList. Mina Token Sale./i);
    expect(content).toBeInTheDocument();
  });
});
