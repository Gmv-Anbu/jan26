import BookAnAppoinment from '@apps/customer/components/Calendly/calendly'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import Tab from '@apps/customer/components/Tab'
import TabContent from '@apps/customer/components/Tab/TabContent'
import { FeatureDataMob, HowItWorksData, tabContentData } from '@apps/customer/data/vault'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import { Container } from '@apps/customer/styles/CommonStyles'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

interface WorkProps {
  contentWidth: string
}

const VaultContainer = styled.div`
  /* width: 100%; */
  /* padding: 6.25rem 15rem; */
  /* padding: 100px 240px; */

  h1 {
    margin-bottom: 4px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 2.2rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: #ffffff;
    width: 44.9rem;
  }
`

const FeatureBg = styled.section`
  /* background-color: ${({ theme }) => theme.colors.primary}; */
  padding: 18rem 0 14.8rem;
  position: relative;
  @media screen and (min-width: 768px) {
    background: ${({ theme }) => theme.colors.primary} url('/images/customer/vault/vault-bg.webp') no-repeat center;
    background-size: cover;
    /* &::before{
        content: "";
        position: absolute;
        background: url("/images/customer/vault/vault-gradient-left.png") no-repeat center left;
        top: 0;
        left: 0;
        width: 372px;
        height: 100%;
        z-index: 4;
        }

        &::after{
        content: "";
        position: absolute;
        background: url("/images/customer/vault/vault-gradient-right.png") no-repeat bottom right;
        right: 0;
        bottom: 0;
        width: 372px;
        height: 100%;
        z-index: 4;
        } */
  }

  @media screen and (max-width: 768px) {
    padding: 12.8rem 0.5rem 6.4rem;
    background-color: #fff;
    .vault-info {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 3.2rem;
      width: 100% !important;
    }
    h1 {
      color: ${({ theme }) => theme.colors.primary};
      text-align: center;
      font-size: 24px;
    }
    p {
      color: ${({ theme }) => theme.colors.fontGray};
      font-size: 14px;
    }
  }
`

const FeaturesDesktop = styled.section`
  /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px,1fr)); */
  display: flex;
  /* flex-wrap: wrap; */
  /* margin-top: 5.9rem; */
  /* gap: 12.4rem; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const WorkContainer = styled.section`
  background-color: #f9f9f9;
  /* padding: 14rem 24rem 12.4rem 24rem; */
  padding: 14rem 0 12.4rem;
  position: relative;
  h1 {
    color: #253031;
    margin-bottom: 5rem;
  }
  @media screen and (max-width: 1366px) {
    padding: 14rem 0 12.4rem;
  }
  @media screen and (max-width: 768px) {
    padding: 60px 0.5rem 69px;
    h1 {
      font-size: 24px;
      margin-bottom: 32px;
      color: #0e1818;
      line-height: 116%;
      font-weight: 400;
    }
  }
`
const HowItWorks = styled.div`
  display: grid;
  gap: 32px;
  @media screen and (min-width: 1249px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
  }
`
const WorkSteps = styled.article<WorkProps>`
  background-color: white;
  padding: 6.5rem 0 6rem 20rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    background: url('/images/customer/vault/tile-bg.png') no-repeat bottom right;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    &::before {
      content: '';
      position: absolute;
      background: url('/images/customer/vault/tile-bg-top.png') no-repeat top left;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
    }
    &::after {
      background: url('/images/customer/vault/tile-bg-hover.png') no-repeat bottom right;
    }

    h2 {
      color: #ffffff;
    }
    p {
      color: #ffffff;
    }
  }
  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 3.2rem;
    line-height: 130%;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2.6rem;
  }
  p {
    max-width: 40rem;
    /* width: ${(props) => props.contentWidth}; */
    color: ${({ theme }) => theme.colors.fontGray};
  }
  @media screen and (max-width: 1356px) {
    p {
      max-width: 35rem;
    }
  }
  @media screen and (max-width: 590px) {
    padding: 3.7rem 0 3rem 12rem;
    h2 {
      font-size: 2.25rem;
      margin-bottom: 8px;
    }
    p {
      width: 216px;
      font-size: 12px;
    }
    &::after {
      background: url('/images/customer/vault/mob-gradient.png') no-repeat bottom right;
    }
    &:hover {
      &::before {
        background: url('/images/customer/vault/mob-top-hover-gradient.png') no-repeat top left;
      }
      &::after {
        background: url('/images/customer/vault/mob-hover-gradient.png') no-repeat bottom right;
      }
    }
  }
`
const ImgContainer = styled.div`
  width: 17.1rem;
  height: 25.6rem;
  position: absolute;
  top: 0;
  left: 0;
  @media screen and (max-width: 590px) {
    width: 10.25rem;
    height: 15rem;
  }
`

const FeaturesMobile = styled.section`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40.4px;
  }
`

const EachFeatureWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 461px;
  padding: 5.9rem 1.5rem 4rem 2rem;
  background-size: cover !important;
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 120%;
    text-transform: uppercase;
    color: #ffffff;
  }
  p {
    color: white;
    width: auto;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 768px) {
    p {
      font-size: 15px;
    }
  }
`
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem 0;
  margin: 6.6rem 0 0;
  h2 {
    font-size: 24px;
    color: #0e1818;
    line-height: 116%;
    font-weight: 400;
  }
  @media screen and (max-width: 768px) {
    button {
      width: 100% !important;
      max-width: 100% !important;
      font-size: 14px;
    }
    h2 {
      text-align: center;
      font-size: 16px;
      color: #0e1818;
      line-height: 116%;
      font-weight: 400;
    }
  }
`
const LogoImgContainer = styled.div`
  position: absolute;
  top: 4rem;
  left: -12px;
  width: 100%;
  height: 332px;
  background: url(/images/customer/shared/bg-text-bold.png) no-repeat;
  @media screen and (max-width: 768px) {
    top: -1rem;
    width: 208%;
    left: -28rem;
    height: 180px;
    background: url(/images/customer/shared/bg-text-bold.png) no-repeat;
    transform: scale(0.45);
  }
`

const Vault = () => {
  const [viewCalender, setViewCalender] = useState(false)
  const [active, setActive] = useState(1)
  const { width } = useWindowSize()
  const renderFeatureSectionMob = FeatureDataMob.map((each, index) => (
    <EachFeatureWrapper key={index} style={{ background: `url(${each.img}) no-repeat center` }}>
      <h3>{each.name}</h3>
      <p>{each.desc}</p>
    </EachFeatureWrapper>
  ))
  const renderWorkTiles = HowItWorksData.map((each, index) => (
    <WorkSteps key={index} contentWidth={each.contentWidth}>
      <ImgContainer>
        <Image src={each.img} alt="register" layout="fill" />
      </ImgContainer>
      <h2>{each.title}</h2>
      <p>{each.content}</p>
      {/* {each.content && <p>{each.content}</p>} */}
    </WorkSteps>
  ))

  const selectedTabData = (id: number) => {
    switch (id) {
      case 1:
        return <TabContent article={tabContentData[id - 1]} />
      case 2:
        return <TabContent article={tabContentData[id - 1]} />
      case 3:
        return <TabContent article={tabContentData[id - 1]} />
    }
  }

  return (
    <>
      <BookAnAppoinment isOpen={viewCalender} closePopup={() => setViewCalender(false)} pathName={'/make-an-appointment-for-1hour'} />
      <VaultContainer>
        <FeatureBg>
          <Container>
            <h1>THE VAULT</h1>
            <p className="vault-info">Secure, convenient, and reliable storage and logistics, customized to your needs. At our facility, we prioritize the safety and protection of your assets, so you can focus on what matters most to you.</p>
            <FeaturesDesktop>
              <Tab tabPos="32px" tabData={['Safety Deposit Boxes', 'Collections Management', 'Authentication and Valuation']} active={active} handleActive={(val) => setActive(val)} />
              {selectedTabData(active)}
            </FeaturesDesktop>
            <FeaturesMobile>{renderFeatureSectionMob}</FeaturesMobile>
          </Container>
        </FeatureBg>

        <WorkContainer>
          <LogoImgContainer>
            {/* <Image src={width > 768 ? '/images/customer/shared/bg-text-bold.png' : '/images/customer/vault/futuregrail-mob.png'} alt="FUTUREGRAIL" layout="fill" /> */}
          </LogoImgContainer>
          <Container>
            <h1>How it Works</h1>
            <HowItWorks>{renderWorkTiles}</HowItWorks>

            <BtnContainer>
              <h2>Start depositing your valuables whenever you choose by opening an account with us today.</h2>
              <ButtonPrimary onClick={() => setViewCalender(true)} padding="1.6rem 6rem">
                Schedule an appointment
              </ButtonPrimary>
            </BtnContainer>
          </Container>
        </WorkContainer>
        <Newsletter />
      </VaultContainer>
    </>
  )
}

export default Vault
