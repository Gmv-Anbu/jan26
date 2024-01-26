import React from 'react'
import styled from 'styled-components'

const ValueCardWrap = styled.div`
  margin: 6rem 0 0;
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`
const ValueCardEach = styled.div`
  padding: 0.9rem 0.5rem;
  width: 351px;
  height: 605px;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
  @media screen and (max-width: 425px) {
    width: 263.75px;
    height: 453.33px;
  }
  position: relative;
  color: #848a8b;
  &:hover .value-bg {
    display: block;
    width: 100%;
  }
  &:hover {
    .h3,
    .para {
      color: #fff;
    }
    .para {
      display: block;
    }
  }
  &:first-child {
    .h3,
    .para,
    .value-bg {
      display: block;
      color: #fff;
    }
  }
`
const ValueCardInner = styled.div`
  position: relative;
  min-height: 605px;
  transition: all 0.5s ease-in;
  background: #fafafa;
  padding: 7.2rem 4rem 4rem;
  h3,
  p {
    position: relative;
    z-index: 10;
  }
  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 3.2rem;
    line-height: 104%;
    color: #0e1818;
    text-transform: uppercase;
  }
  &:before {
    content: '';
    position: absolute;
    background: url(/images/customer/home/bg-gradient.png) no-repeat bottom left;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 425px) {
    min-height: 453.33px;
    h3 {
      font-weight: 400;
      font-size: 2.39776rem;
      line-height: 104%;
      text-transform: uppercase;
    }
    h3 {
      font-size: 23px !important;
    }
  }
`
const ValueContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 4rem;
  right: 4rem;
  p {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin: 0 0 3rem;
    letter-spacing: -0.015em;
    color: #848a8b;
    font-style: normal;
    font-weight: 400;
  }
  @media screen and (max-width: 425px) {
    p {
      font-weight: 400;
      font-size: 14px !important;
      line-height: 142.5%;
      letter-spacing: -0.015em;
      color: #ffffff;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      width: 100%;
      margin: 0 0 3rem;
    }
  }
`
const ValueBgHolder = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
`
const ValueIcon = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0.9rem;
  right: 0;
  background-repeat: no-repeat;
  background-position: top right 5px;
`

const ValueCard = () => {
  return (
    <ValueCardWrap>
      <ValueCardEach>
        <ValueCardInner>
          <h3 className="h3">Trust</h3>
          <ValueContent>
            <p className="para">We build lasting relationships with our community through transparency and trust. We champion our customers as they pursue their horological dreams with access to the rarest and most exceptional timepieces.</p>
          </ValueContent>
          <ValueBgHolder className="value-bg" style={{ backgroundImage: `url(/images/customer/home/valueCores/trust-2.webp)` }}></ValueBgHolder>
        </ValueCardInner>
        <ValueIcon style={{ backgroundImage: `url(/images/customer/home/icon-value1.svg)` }}></ValueIcon>
      </ValueCardEach>
      <ValueCardEach>
        <ValueCardInner>
          <h3 className="h3">Authenticity</h3>
          <ValueContent>
            <p className="para">
            Our culture is driven by sourcing the finest luxury timepieces. Our vetting process ensures your purchase is 100% authentic and accurately described, providing complete peace of mind.
            </p>
          </ValueContent>
          <ValueBgHolder className="value-bg" style={{ backgroundImage: `url(/images/customer/home/valueCores/athenticity.webp)` }}></ValueBgHolder>
        </ValueCardInner>
        <ValueIcon style={{ backgroundImage: `url(/images/customer/home/icon-value2.svg)` }}></ValueIcon>
      </ValueCardEach>
      <ValueCardEach>
        <ValueCardInner>
          <h3 className="h3">Equality</h3>
          <ValueContent>
            <p className="para">
            At FutureGrail, we empower you to succeed. Building your dream collection should be enjoyable and accessible. Everyone has a fair chance to secure their grail watch at a fair price through private sales, auctions, fixed-price and fractional offerings
            </p>
          </ValueContent>
          <ValueBgHolder className="value-bg" style={{ backgroundImage: `url(/images/customer/home/valueCores/equality.webp)` }}></ValueBgHolder>
        </ValueCardInner>
        <ValueIcon style={{ backgroundImage: `url(/images/customer/home/equalityIcom.svg)` }}></ValueIcon>
      </ValueCardEach>
      <ValueCardEach>
        <ValueCardInner>
          <h3 className="h3">Innovation</h3>
          <ValueContent>
            <p className="para">
            Our platform enables you to unlock instrinsic value from your asset while providing new capabilities. Securely showcase your watch collection anywhere in the world with NFTs. Prove ownership, trade, transfer and acquire new pieces with ease.
            </p>
          </ValueContent>
          <ValueBgHolder className="value-bg" style={{ backgroundImage: `url(/images/customer/home/valueCores/innovation.webp)` }}></ValueBgHolder>
        </ValueCardInner>
        <ValueIcon style={{ backgroundImage: `url(/images/customer/home/icon-value4.svg)` }}></ValueIcon>
      </ValueCardEach>
    </ValueCardWrap>
  )
}

export default ValueCard
