import React, { useState } from 'react'
import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'
import Image from 'next/image'
import Tab from '@apps/customer/components/Tab'
import TabContent from '@apps/customer/components/Tab/TabContent'
import useWindowSize from '@apps/customer/hooks/useWindowSize'

const FeatureWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 15rem 0 27rem;
  background-size: cover;
  /* background-size: 100% 100rem; */
  background-repeat: no-repeat;
  background-position: 0 -70px;
  h1 {
    max-width: 420px;
    font-size: 5.5rem;
    line-height: 6.2rem;
    margin: 0 0 5px;
    @media screen and (max-width: 900px) {
      font-size: 4.5rem;
    }
  }
  h1,
  p {
    color: #fff;
  }
  @media screen and (max-width: 798px) {
    padding: 5rem 2rem;
    height: 160rem;
    /* background-size: 100% 100%; */
    h1 {
      font-size: 3.5rem;
    }
  }
  @media screen and (max-width: 460px) {
    h1,
    p {
      padding: 0;
      margin: 0;
    }
    h1 {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 116%;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 142.5%;
      letter-spacing: -0.015em;
      color: #dadddd;
    }
  }
  @media screen and (max-width: 558px) {
    background-image: url(/images/customer/home/salient-bg.png);
    background-size: cover;
    background-position: top right;
    padding: 58px 0rem 70px;
    height: 100%;
  }
  @media screen and (min-width: 558px) {
    background-image: url(/images/customer/home/bg-feature.webp);
  }
`
const TabWrap = styled.div`
  margin: 1rem 0 0;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 798px) {
    display: none;
  }
`
const MobileScreenContainer = styled.div`
  @media screen and (min-width: 798px) {
    display: none;
  }
  display: block;
`
const MRContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  p {
    font-weight: 400;
    font-size: 2rem;
    max-width: 340px;
  }
  & figure:first-of-type {
    margin-top: 1.8rem;
  }
  @media screen and (max-width: 798px) {
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 130%;
      color: #dadddd;
    }
    figure {
      max-width: 342px;
      max-height: 191px;
      min-width: 342px;
      min-height: 191px;
    }
  }
  @media screen and (max-width: 374px) {
    figure {
      max-width: 342px;
      max-height: 191px;
      min-width: 302px;
      min-height: 191px;
    }
  }
`

const MRLogoContainer = styled.div`
  position: absolute;
  display: none;
  top: 5.5rem;
  left: 0;
  width: 100%;
  height: 145px;
  @media screen and (max-width: 558px) {
    display: block;
  }
`

const tabContentData = [
  {
    name: "Welcome to our museum, where we showcase hundreds of rare wristwatches, pocket watches, and important objects. Immerse yourself in an experience that inspires new and seasoned collectors alike. We welcome our members and guests to join us to build and enhance the community's horological knowledge and experience.",
    primaryImg: '/images/customer/home/salient/mus-1-web.png',
    secondaryImg: '/images/customer/home/salient/museum-2.png',
  },
  {
    name: 'Experience the ultimate peace of mind with our bonded tax-free Watch Vault storage for your precious timepieces. Our state-of-the-art safety deposit boxes, expert authentication, thorough valuation, and meticulous collections management services provide depositors and collectors with complete visibility and confidence in the security of their treasured watches.',
    primaryImg: '/images/customer/home/salient/vault-1-web.png',
    secondaryImg: '/images/customer/home/salient/vault-2.png',
  },
  {
    name: "Unlock the intrinsic value of your watches through our platform's digitization and fractionalization features. Easily access and manage all your data, including ownership proof, condition reports, and provenance, in one convenient location. ",
    primaryImg: '/images/customer/home/salient/platform-1.png',
    secondaryImg: '/images/customer/home/salient/platform-2.png',
  },
]

const SalientFeature = () => {
  const [active, setActive] = useState(1)
  const { width } = useWindowSize()
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
    <FeatureWrapper>
      <MRLogoContainer>
        <Image src="/images/customer/home/salient-logo.png" layout="fill" alt="ICO" />
      </MRLogoContainer>
      <Container>
        <div>
          <h1>Our Offerings</h1>
          <p>Discover what sets us apart.</p>
        </div>
        <TabWrap>
          <Tab tabPos="46px" tabData={['The Museum', 'The Vault', 'The Platform']} active={active} handleActive={(val) => setActive(val)} />
          {selectedTabData(active)}
        </TabWrap>
        <MobileScreenContainer>
          <Tab2 tabData={['The Museum', 'The Vault', 'The Platform']} active={active} handleActive={(val) => setActive(val)} />
          {active == 1 && (
            <MRContentBox>
              <p>
                {
                  "Welcome to our museum, where we showcase hundreds of rare wristwatches, pocket watches, and important objects. Immerse yourself in an experience that inspires new and seasoned collectors alike. We welcome our members and guests to join us to build and enhance the community's horological knowledge and experience."
                }
              </p>
              <figure>
                <Image src="/images/customer/home/salient/mus-2-mr.png" alt="ICO" width={width > 767 ? 600 : 342} height={width > 767 ? 320 : 191} />
              </figure>
              <figure>
                <Image src="/images/customer/home/salient/museum-2-mr.png" alt="ICO" width={width > 767 ? 600 : 342} height={width > 767 ? 320 : 191} />
              </figure>
            </MRContentBox>
          )}
          {active == 2 && (
            <MRContentBox>
              <p>
              Experience the ultimate peace of mind with our bonded tax-free Watch Vault storage for your precious timepieces. Our state-of-the-art safety deposit boxes, expert authentication, thorough valuation, and meticulous collections management services provide depositors and collectors with complete visibility and confidence in the security of their treasured watches.
              </p>
              <figure>
                <Image src="/images/customer/home/salient/vault-1-mr.png" alt="ICO" width={width > 767 ? 600 : 342} height={width > 767 ? 320 : 191} />
              </figure>
              <figure>
                <Image src="/images/customer/home/salient/vault-2-mr.png" alt="ICO" width={width > 767 ? 600 : 342} height={width > 767 ? 320 : 191} />
              </figure>
            </MRContentBox>
          )}
          {active == 3 && (
            <MRContentBox>
              <p>
                {
                  "Unlock the intrinsic value of your watches through our platform's digitization and fractionalization features. Easily access and manage all your data, including ownership proof, condition reports, and provenance, in one convenient location. "
                }
              </p>
              <figure>
                <Image src="/images/customer/home/salient/platform-1.png" alt="ICO" width={width > 767 ? 600 : 342} height={width > 767 ? 320 : 191} />
              </figure>
              <figure>
                <Image src="/images/customer/home/salient/platform-2-mr.png" alt="ICO" width={width > 767 ? 600 : 342} height={width > 767 ? 320 : 191} />
              </figure>
            </MRContentBox>
          )}
        </MobileScreenContainer>
      </Container>
    </FeatureWrapper>
  )
}

const TabHead2 = styled.div`
  width: 100%;
  display: flex;
  padding: 4rem 0;
  hr {
    border-radius: 50%;
    background: linear-gradient(270deg, transparent 0%, #ffffff 85.11%, transparent 100.88%);
    height: 2px;
    border: 0;
    box-shadow: 0 0 3px #2a4c4e;
    border-bottom-right-radius: 60%;
  }
  @media screen and (max-width: 460px) {
    width: 355px;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      scrollbar-width: none; /* Firefox */
      display: none; /* Safari and Chrome */
    }
  }
`
const ButtonLink2 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 10rem;
  background: transparent;
  border: 0;
  font-size: 2rem;
  color: #848a8b;
  text-transform: uppercase;
  position: relative;
  width: 100%;
  text-align: left;
  padding-left: 5rem;
  cursor: pointer;
  hr {
    border-radius: 50%;
    background: linear-gradient(270deg, transparent 0%, #ffffff 85.11%, transparent 100.88%);
    height: 2px;
    border: 0;
    box-shadow: 0 0 3px #2a4c4e;
    border-bottom-right-radius: 60%;
  }

  @media screen and (max-width: 549px) {
    font-size: 2rem;
    padding: 0;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 460px) {
    min-width: 140px;
    height: 60px;
    padding: 0 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 104%;
    text-transform: uppercase;
    color: #ffffff;
    opacity: 0.97;
  }
  &.active {
    color: #fff;
    &:after {
      content: '';
      position: absolute;
      background: linear-gradient(180deg, rgba(32, 54, 55, 0) 0%, #2a4c4e 100%);
      opacity: 0.54;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      @media screen and (max-width: 768px) {
        opacity: 0.5;
      }
    }
    &:last-child:after {
      transform: rotate(180deg);
      bottom: 4px;
      @media screen and (max-width: 768px) {
        transform: none;
        bottom: 0;
      }
    }
  }
  &:last-child:before {
    background: none;
  }
  hr {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3;
  }
`

function Tab2({ tabData, active, handleActive }: { tabData: Array<string>; active: number; handleActive: (val: number) => void }) {
  const renderTabs = tabData.map((tab, index) => (
    <ButtonLink2 onClick={() => handleActive(index + 1)} key={index} className={active === index + 1 ? 'active' : ''}>
      {tab}
      <hr style={{ opacity: active !== index + 1 && '0.34' }} />
    </ButtonLink2>
  ))

  return (
    <>
      <TabHead2>{renderTabs}</TabHead2>
    </>
  )
}

export default SalientFeature
