import { ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import { NextPage } from 'next'
import styled from 'styled-components'
// import bgImg from '../../../public/images/customer/wallet/bg-img.png'

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
  &::before {
    position: absolute;
    content: '';
    width: 454px;
    height: 146px;
    top: 5%;
    background-image: url('/images/customer/wallet/bg-img.png');
    background-repeat: no-repeat;
  }
  &::after {
    position: absolute;
    content: '';
    width: 86px;
    height: 86px;
    top: 20%;
    background-image: url('/images/customer/wallet/tick-img.png');
    background-repeat: no-repeat;
  }
  @media screen and (max-width: 768px) {
    min-width: 342px;
    min-height: 387px;
    top: 2%;
    &::before {
      width: 308.01px;
      height: 136.61px;
      top: 5%;
      background-image: url('/images/customer/wallet/bg-img-mr.png');
    }
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
    padding: 1.6rem 2.8rem 1.6rem 2.9rem;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    color: #fff;
    margin: 4rem 0;
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

const ConnectedPopup: NextPage = () => {
  return (
    <MainContainer>
      <ContentWrapper>
        <Content>
          <h2>Congratulations</h2>
          <p>Your wallet is connected successfully!</p>
          <ButtonPrimaryOutline className="custom-btn">
            Continue
          </ButtonPrimaryOutline>
        </Content>
      </ContentWrapper>
    </MainContainer>
  )
}

export default ConnectedPopup
