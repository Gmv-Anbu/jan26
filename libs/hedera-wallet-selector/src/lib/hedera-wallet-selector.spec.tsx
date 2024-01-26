import { render } from '@testing-library/react';

import HederaWalletSelector from './hedera-wallet-selector';

describe('HederaWalletSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HederaWalletSelector />);
    expect(baseElement).toBeTruthy();
  });
});
