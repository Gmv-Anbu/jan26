import Image from 'next/image';
import styled from 'styled-components';

import {
  providerNames,
  hederaProviderNames,
} from '@nft-marketplace/wallet-selector';

interface WalletConnectModalProps {
  onSelect: (id: string) => void;
}

const WalletConnectModal = ({ onSelect }: WalletConnectModalProps) => {
  return (
    <WalletConnectModalWrapper>
      <Header>Hedera Connect your wallet</Header>
      <Subhead>Connect your preferred wallet account</Subhead>
      <ItemListWrapper>
        {Object.values(hederaProviderNames).map((item) => (
          <WalletItem
            key={item.id}
            id={item.id}
            title={item.label}
            src={item.icon}
            onSelect={onSelect}
            imgWidth={item.iconWidth}
            imgHeight={item.iconHeight}
          />
        ))}
      </ItemListWrapper>
    </WalletConnectModalWrapper>
  );
};
export default WalletConnectModal;
interface WalletItemProps {
  id: string;
  title: string;
  src: string;
  imgWidth?: number;
  imgHeight?: number;
  onSelect: (id: string) => void;
}
const WalletItem = ({
  id = 'metaMask',
  title = 'Metamask',
  src = '/svgs/metamask.svg',
  imgWidth = 30,
  imgHeight = 30,
  onSelect,
}: WalletItemProps) => {
  return (
    <ItemContainer key={id} onClick={() => onSelect(id)}>
      <Image src={src} alt={id} width={imgWidth} height={imgHeight} />
      <ItemText>{title}</ItemText>
    </ItemContainer>
  );
};
const WalletConnectModalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 4rem;
`;
const Header = styled.h2`
  margin: 0;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  color: ${({ theme }) => theme.colors.fontcolor};
  margin-bottom: 0.3rem;
`;
const Subhead = styled.h4`
  margin: 0;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.fontdark};
  margin-bottom: 4.1rem;
`;
const ItemListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2rem;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.web3Modalbg};
  border-radius: 0.9rem;
  gap: 1.4rem;
  height: 5rem;
  padding: 1rem;
  cursor: pointer;
`;
const ItemText = styled.span`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.colors.fontprimary};
`;
