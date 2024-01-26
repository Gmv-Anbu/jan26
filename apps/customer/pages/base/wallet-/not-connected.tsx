import { ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import { NextPage } from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import metaMask from '../../../public/images/customer/wallet/meta-mask-img.png'

const MainContainer = styled.div`
  width: 100%;
  padding: 15rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 15rem 2rem;
  }
`
const ContentWrapper = styled.div`
  position: relative;
  min-width: 640px;
  min-height: 416px;
  background: #ffffff;
  box-shadow: 0px 24px 36px rgba(0, 0, 0, 0.09);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10rem 5rem;

  &::after {
    position: absolute;
    content: '';
    width: 86px;
    height: 86px;
    top: 20%;
    background-image: url('/images/customer/wallet/info-img.png');
    background-repeat: no-repeat;
  }
  @media screen and (max-width: 768px) {
    min-width: 342px;
    min-height: 441px;
    top: 2%;
    &::after {
      top: 10%;
      background-size: 80px;
    }
  }
`

const Content = styled.div`
  position: absolute;
  width: 100%;
  bottom: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 5rem;

  h2 {
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.2rem;
    display: flex;
    align-items: center;
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
  }
  p {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
  }
  button {
    background: ${({ theme }) => theme.colors.secondary};
    text-transform: uppercase;
    min-height: 50px;
    min-width: 135px;
    border: 0;
    /* padding: 1.6rem 2.8rem 1.6rem 2.9rem; */
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    color: #fff;
    margin: 4rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    &:hover {
      background: #29898b;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0 2.5rem;
    h2 {
      font-size: 3rem;
    }
    p {
      font-size: 1.75rem;
    }
    button {
      font-size: 2rem;
      min-width: 294px;
    }
  }
`

const NotConnectedPopup: NextPage = () => {
  return (
    <MainContainer>
      <ContentWrapper>
        <Content>
          <h2>Your Wallet is not connected</h2>
          <p>By connecting your wallet, you agree to our terms of service & our privacy policy.</p>
          <ButtonPrimaryOutline className="custom-btn">
            <Image src={metaMask} alt={'ICO'} width={42} height={42} />
            Connect Wallet
          </ButtonPrimaryOutline>
        </Content>
      </ContentWrapper>
    </MainContainer>
  )
}

export default NotConnectedPopup
