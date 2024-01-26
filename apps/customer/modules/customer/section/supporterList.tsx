import React from 'react'
import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'
import Image from 'next/image'
import useWindowSize from '@apps/customer/hooks/useWindowSize'

const SupporterContainer = styled.div`
  width: 100%;
`
const SupporterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 13.7rem 0 15.5rem 0;
  gap: 81px;
  .heading {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 5.5rem;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    li {
      :hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }

  /* Mr screen start */
  @media screen and (max-width: 767px) {
    .heading {
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 104%;
      text-align: center;
      text-transform: uppercase;
      color: #202a2a;
    }
    ul {
      justify-content: center;
      gap: 40px 51px;
    }
  }
  @media screen and (min-width: 1023px) and (max-width: 1024px) {
    li {
    width: 31% !important;
    text-align: center !important;
    }
  }
`

const SupporterList = () => {
  const { width } = useWindowSize()

  return (
    <SupporterContainer>
      <Container>
        <SupporterWrapper>
          <h1 className="heading">Our Strongest Supporters</h1>
          <ul>
            <li>
              <Image src="/images/customer/home/logo-1.png" alt="ICO" width={width > 767 ? 307.93 : 227} height={width > 767 ? 52.53 : 39} />
            </li>
            <li>
              <Image src="/images/customer/home/SingaporeWatchFair.svg" alt="ICO" width={width > 767 ? 475 : 278} height={width > 767 ? 36 : 36} />
            </li>
            <li>
              <Image src="/images/customer/home/logo-2.png" alt="ICO" width={width > 767 ? 121 : 98} height={width > 767 ? 88 :65} />
            </li>
          </ul>
        </SupporterWrapper>
      </Container>
    </SupporterContainer>
  )
}

export default SupporterList
