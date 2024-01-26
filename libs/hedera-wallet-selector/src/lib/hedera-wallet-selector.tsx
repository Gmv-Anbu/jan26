import styled from 'styled-components';
import connectToExtension from './useHashPack';

/* eslint-disable-next-line */
export interface HederaWalletSelectorProps {}

const StyledHederaWalletSelector = styled.div`
  color: pink;
`;

export function HederaWalletSelector(props: HederaWalletSelectorProps) {
  // const { connectToExtension } = useHashConnect();
  return (
    <StyledHederaWalletSelector>
      <button type="button" onClick={() => connectToExtension()}>
        Connect HashPack
      </button>
    </StyledHederaWalletSelector>
  );
}

export default HederaWalletSelector;
