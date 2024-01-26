import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import ValueCard from '@apps/customer/components/ValueCard'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import { Container } from '@apps/customer/styles/CommonStyles'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

const AboutUsWrapper = styled.section`
  position: relative;
  background-color: #21393a;
  padding: 22rem 0 19.3rem;
  @media screen and (min-width: 768px) {
    background: #21393a url('/images/customer/aboutUs/aboutUs-bg.webp') no-repeat center;
    background-size: cover;
  }
  @media screen and (max-width: 768px) {
    padding: 12.8rem 0 53px;
  }
  @media screen and (max-width: 768px) {
    background: #21393a url('/images/customer/aboutUs/aboutUs-bg-mob.png') no-repeat center;
    background-size: cover;
  }
`
const ContentWrap = styled.div`
  display: flex;
  gap: 6.7rem;
  @media screen and (max-width: 1426px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 549px) {
    gap: 32px;
    justify-content: center;
  }
`
const LeftContent = styled.article`
  display: block;
  width: 48.1rem;
  h1 {
    width: 48.1rem;
    line-height: 104%;
    position: relative;
    z-index: 2;
    padding-top: 3.5rem;
  }
  h4 {
    margin: 16rem 0 2.9rem;
    font-weight: 400;
    font-size: 3.2rem;
    line-height: 104%;
    text-transform: uppercase;
    color: #ffffff;
    position: relative;
    z-index: 2;
  }
  p {
    max-width: 45.5rem;
    font-weight: 400;
    font-size: 18px;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: #ffffff;
    position: relative;
    z-index: 2;
    text-align: justify;
  }
  @media screen and (max-width: 1535px) {
    width: 40rem;
    h4 {
      margin: 4rem 0 2rem;
    }
  }
  @media screen and (max-width: 1426px) {
    width: 100%;
    /* padding-left: 1rem */
    p {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 549px) {
    /* padding-left: 3rem; */
    width: 341px;
    h1 {
      font-size: 24px;
      line-height: 116%;
      padding-top: 0;
    }
    h4 {
      margin: 16px 0 8px;
      font-size: 14px;
      line-height: 116%;
    }
    p {
      color: #bdc0c0;
      font-size: 14px;
    }
  }
`
const RightContent = styled.article`
  display: flex;
  gap: 4rem;
  justify-content: center;
  position: relative;
  h3 {
    font-size: 4.8rem;
    line-height: 120%;
    color: #ffffff;
    width: 30rem;
    font-weight: 400;
  }
  p {
    text-align: justify;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: #bdc0c0;
  }
  .mob-desc {
    display: none;
  }
  .desc-ctrl-btn {
    display: none;
    width: 100%;
    text-align: center;
    z-index: 5;
    margin-top: -3rem;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
  @media screen and (max-width: 768px) {
    .mob-desc {
      display: block;
      max-width: 43rem;
      text-align: justify;
    }
    .desc-desktop {
      display: none;
    }
  }
  /* .each-creator :nth-child(1){
        background: url("/images/customer/aboutUs/creator1.png") no-repeat center;
    }
    .each-creator :nth-child(2){
        background: url("/images/customer/aboutUs/creator2.png") no-repeat center;
    } */
  .slider-container,
  .slider-container-active {
    opacity: 1;
    position: absolute;
    inset: 50% auto auto -6rem !important;
    transform: translateY(-65%) rotate(180deg);
    width: 110px;
    height: 110px;
    z-index: 10;
    cursor: pointer;
    @media screen and (min-width: 1100px) {
      display: block;
    }
  }
  .slider-container-right,
  .slider-container-right-active {
    opacity: 1;
    position: absolute;
    inset: 50% 94.5% !important;
    transform: translateY(-50%);
    width: 110px;
    height: 110px;
    z-index: 10;
    cursor: pointer;
    @media screen and (min-width: 1100px) {
      display: block;
    }
  }
  .creator1 {
    &::before {
      background: url('/images/customer/aboutUs/ali.webp') no-repeat;
      background-size: 100%;
    }
    @media screen and (max-width: 768px) {
      width: 345px !important;
      height: 461px !important;
      &::before {
        background: url('/images/customer/aboutUs/ali-mob.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .creator2 {
    &::before {
      background: url('/images/customer/aboutUs/moshin.webp') no-repeat;
      background-size: 100%;
    }
    @media screen and (max-width: 768px) {
      width: 345px !important;
      height: 461px !important;
      &::before {
        background: url('/images/customer/aboutUs/moshin-mob.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .creator3 {
    &::before {
      background: url('/images/customer/aboutUs/Arnaud-web.webp') no-repeat;
      background-size: 100%;
    }
    @media screen and (max-width: 768px) {
      width: 345px !important;
      height: 461px !important;
      &::before {
        background: url('/images/customer/aboutUs/Arnaud-mobile.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .creator4 {
    &::before {
      background: url('/images/customer/aboutUs/Arvin-web.webp') no-repeat;
      background-size: 100%;
    }
    @media screen and (max-width: 768px) {
      width: 345px !important;
      height: 461px !important;
      &::before {
        background: url('/images/customer/aboutUs/Arvin-mobile.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .classAnim1 {
    animation: imageAnimation1 0.4s ease-in;
  }
  .classAnim2 {
    animation: imageAnimation2 0.4s ease-in;
  }
  @keyframes imageAnimation1 {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  @keyframes imageAnimation2 {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  &:not(:hover) {
    .slider-container,
    .slider-container-right {
      opacity: 1;
      transition: opacity 0.8s ease-in-out;
    }
  }
  &:hover {
    .slider-container-active,
    .slider-container-right-active {
      opacity: 1;
      // transition: opacity 0.8s ease-in-out;
    }
  }
  .each-creator {
    // filter: drop-shadow(0px 75.9091px 59.5594px rgba(0, 0, 0, 0.25));
    -webkit-box-shadow: 0px 60px 95px -29px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 60px 95px -29px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 60px 95px -29px rgba(0, 0, 0, 0.75);
    cursor: pointer;
    position: relative;
    width: 426px;
    height: 660px;
    overflow-y: clip;
    z-index: 4;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    &::after {
      content: '';
      background: url('/images/customer/aboutUs/line.png') no-repeat bottom;
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .hover-wrapper {
      position: absolute;
      padding: 0 2.4rem 0 4rem;
      top: 84%;
      transition: all 0.6s cubic-bezier(0.4, 0, 1, 1);
      @media screen and (max-width: 1100px) {
        top: 88%;
      }
    }
    @media screen and (min-width: 768px) {
      &:hover {
        &::before {
          filter: brightness(0.6);
          transition: filter 0.8s ease-in-out;
        }
        &::after {
          opacity: 1;
          transition: opacity 0.8s ease-in-out;
        }
        .hover-wrapper {
          width: 100%;
          height: 100%;
          text-align: start;
          color: #cacece;
          top: 33%;
          @media screen and (max-width: 1426px) {
            top: 48%;
          }
        }
        .designation {
          padding-bottom: 2rem;
          transition: padding 0.8s ease-in-out;
        }
      }
      &:not(:hover) {
        .designation {
          padding-bottom: 4.4rem;
          transition: padding 0.8s ease-in-out;
        }
        &::after {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        &::before {
          filter: brightness(1);
          transition: filter 0.8s ease-in-out;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .hover-wrapper {
        top: 75%;
        padding: 0 2.4rem 0 24px;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    flex-wrap: wrap;
  }
`
const ValueWrapper = styled.section`
  position: relative;
  background: #f4f9f9;
  &::after {
    content: '';
    position: absolute;
    background: url('/images/customer/aboutUs/value-gradient.webp') no-repeat;
    width: 441px;
    height: 496px;
    right: 0;
    bottom: 0;
  }
  .value-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .value-content {
    padding: 14.4rem 0;
    position: relative;
    z-index: 2;
  }
  .value-img {
    &::before {
      content: '';
      position: absolute;
      background: #f4f9f9 url('/images/customer/aboutUs/value.webp') no-repeat left center;
      background-size: contain;
      width: 100%;
      height: 100%;
      top: 50%;
      right: -98%;
      transform: translate(-50%, -50%);
      z-index: 0;
      @media screen and (max-width: 1550px) {
        right: -100%;
      }
    }
  }
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 400;
    font-size: 6rem;
    line-height: 104%;
    padding-bottom: 1.6rem;
    text-transform: uppercase;
  }
  p {
    color: ${({ theme }) => theme.colors.fontGray};
    line-height: 142.5%;
    letter-spacing: -0.015em;
    max-width: 70rem;
  }
  @media screen and (max-width: 768px) {
    .value-content {
      padding: 0;
    }
    .value-img {
      display: none;
    }
    .value-container {
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    background: #f4f9f9;
    padding: 6rem 0.5rem 31.5rem;
    h2 {
      font-size: 24px;
      line-height: 116%;
    }
    p {
      max-width: 341px;
      font-size: 14px;
    }
    &::after {
      content: '';
      position: absolute;
      background: #f4f9f9 url('/images/customer/aboutUs/value-mob.png') no-repeat bottom center;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 31rem;
      z-index: 4;
    }
  }
`
const ValuePreproswrap = styled.div`
  padding: 7rem 0 14rem;
  margin-top: 7rem;
  background: url('/images/customer/shared/FUTUREGRAIL.png') no-repeat top center;
  h1 {
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    max-width: 69rem;
    color: #4e4e4e;
  }
  @media screen and (max-width: 768px) {
    margin-top: 4rem;
    padding: 60px 0 99px;
    h1 {
      max-width: 212px;
      font-size: 24px;
      line-height: 116%;
    }
    p {
      font-size: 14px;
      max-width: 331px;
    }
  }
`
const ValueTopContent = styled.div`
  display: flex;
  gap: 22.2rem;
  p {
    align-self: center;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
    p {
      align-self: flex-start;
    }
  }
`
const ImgContainer = styled.div`
  position: absolute;
  top: 5rem;
  width: 100%;
  height: 332px;
  @media screen and (max-width: 768px) {
    height: 185px;
    top: 9rem;
  }
`
const creator1Desc =
  "Mr. Nael's passion and expertise in curating valuable watch collections, coupled with his reputation for neutrality and openness in the industry, has led him to launch 2tonevintage watches, Cultured watches, and the prestigious 'Singapore Watch Fair.' FutureGrail's value proposition reflects the group dedication to excellence and advancing the world of high-end watches to the next level."
const creator2Desc =
  "Mr. Rizvi is a watch enthusiast and tech expert with a proven track record at some of the world's largest tech companies. He has extensive experience in corporate operations, having served in various leadership roles, including as a senior executive at a Fortune 500 company. His passion for watches and technology led him to co-found FutureGrail, a business platform aimed at revolutionizing the high-end watch industry as collectibles and an alternative asset class."
const creator3Desc =
  "Arnaud Tellier is a distinguished horology expert with over 30 years of experience in the field. A graduate of the International Museum of Horology in La Chaux-de-Fonds, he joined Antiquorum as Vice-President in 1990 before becoming the Director and Curator of the Patek Philippe Museum of Geneva for 12 years. Mr. Tellier's unrivaled knowledge of horology, spanning from the 1600s to present day, is showcased in his hundreds of publications. Possessing exclusive insights, Arnaud's expertise renders him an invaluable asset to FutureGrail."
const creator4Desc =
  'Arvind is a valuable member of the FutureGrail team, bringing almost two decades of experience and insights in international aspects of corporate governance and regulations. His expertise in corporation laws, with a particular emphasis on bespoke constitutions, smart contracts, and group authorization schemes in the developing asset class of watches and other passion artefacts, is likely to be of great benefit to the team in navigating complex legal issues.'

const creatorsList = [
  {
    id: 1,
    name: 'Ali Nael',
    pos: 'CEO & Co-Founder',
    classNme: 'creator1',
    desc: "Mr. Nael's passion and expertise in curating valuable watch collections, coupled with his reputation for neutrality and openness in the industry, has led him to launch 2tonevintage watches, Cultured watches, and the prestigious 'Singapore Watch Fair.' FutureGrail's value proposition reflects the group dedication to excellence and advancing the world of high-end watches to the next level.",
  },
  {
    id: 2,
    name: 'Mohsin Rizvi',
    pos: 'COO & Co-Founder',
    classNme: 'creator2',
    desc: "Mr. Rizvi is a watch enthusiast and tech expert with a proven track record at some of the world's largest tech companies. He has extensive experience in corporate operations, having served in various leadership roles, including as a senior executive at a Fortune 500 company. His passion for watches and technology led him to co-found FutureGrail, a business platform aimed at revolutionizing the high-end watch industry as collectibles and an alternative asset class.",
  },
  {
    id: 3,
    name: 'Arnaud Tellier',
    pos: 'Head of Curation',
    classNme: 'creator3',
    desc: "Arnaud Tellier is a distinguished horology expert with over 30 years of experience in the field. A graduate of the International Museum of Horology in La Chaux-de-Fonds, he joined Antiquorum as Vice-President in 1990 before becoming the Director and Curator of the Patek Philippe Museum of Geneva for 12 years. Mr. Tellier's unrivaled knowledge of horology, spanning from the 1600s to present day, is showcased in his hundreds of publications. Possessing exclusive insights, Arnaud's expertise renders him an invaluable asset to FutureGrail.",
  },
  {
    id: 4,
    name: 'Arvind',
    pos: 'General Counsel',
    classNme: 'creator4',
    desc: 'Arvind is a valuable member of the FutureGrail team, bringing almost two decades of experience and insights in international aspects of corporate governance and regulations. His expertise in corporation laws, with a particular emphasis on bespoke constitutions, smart contracts, and group authorization schemes in the developing asset class of watches and other passion artefacts, will be of great benefit to the team in navigating complex legal issues',
  },
]
const AboutUs = () => {
  const { width } = useWindowSize()

  const [showDesc1, setShowDesc1] = useState(false)
  const [showDesc2, setShowDesc2] = useState(false)
  const [showDesc3, setShowDesc3] = useState(false)
  const [showDesc4, setShowDesc4] = useState(false)
  const [isSlicerStart, setIsSlicerStart] = useState(0)
  const [isSlicerEnd, setIsSlicerEnd] = useState(2)

  const [animationClass, setAnimationClass] = useState('')
  const [position, setPosition] = useState(0)

  const handleMouseMove = (event) => {
    if (event.clientX >= 1251 && event.clientX <= 1675) {
      setPosition(2)
      return
    }
    if (event.clientX >= 784 && event.clientX <= 1208) {
      setPosition(1)
      return
    }
  }

  function changeSlicerHandler1() {
    setAnimationClass('classAnim2')
    setTimeout(() => setAnimationClass(''), 500)
    if (-1 + isSlicerEnd >= 5) {
      setIsSlicerStart(0)
      setIsSlicerEnd(2)
      return
    }
    if (-1 + isSlicerStart <= -1) {
      setIsSlicerStart(2)
      setIsSlicerEnd(4)
      return
    }
    setIsSlicerStart(-1 + isSlicerStart)
    setIsSlicerEnd(-1 + isSlicerEnd)
  }

  function changeSlicerHandler2() {
    setAnimationClass('classAnim1')
    setTimeout(() => setAnimationClass(''), 500)
    if (1 + isSlicerEnd >= 5) {
      setIsSlicerStart(0)
      setIsSlicerEnd(2)
      return
    }
    if (1 + isSlicerStart <= -1) {
      setIsSlicerStart(2)
      setIsSlicerEnd(4)
      return
    }
    setIsSlicerStart(1 + isSlicerStart)
    setIsSlicerEnd(1 + isSlicerEnd)
  }
  return (
    <>
      <AboutUsWrapper>
        <ImgContainer>
          <Image src={width > 768 ? '/images/customer/aboutUs/FUTUREGRAIL.png' : '/images/customer/aboutUs/mob-futuregrail.png'} alt="FUTUREGRAIL" layout="fill" />
        </ImgContainer>

        <Container>
          <ContentWrap>
            <LeftContent>
              <h1>About Us</h1>
              <h4>WHO WE ARE</h4>
              <p>
                FutureGrail was founded by collectors, for collectors. Our passion for high-end timepieces inspired us to create an end-to-end business platform that delivers value to our esteemed customers. We aim to educate and inspire the world
                about the beauty of watches and to legitimize them as an alternative asset class. By unlocking the intrinsic value of watches through digitization and adding new capabilities, we are changing the way luxury watches are viewed and
                traded. Our innovative use of blockchain technology and expertise in the watch industry is leading the way for a new era of watch collecting. Join us in our journey to unlock the full potential of luxury timepieces.
              </p>
            </LeftContent>
            {width > 1100 ? (
              <RightContent>
                <div className={position == 1 ? 'slider-container-active' : 'slider-container'} onClick={changeSlicerHandler1}>
                  <Image className="slider-arrow" src={'/images/customer/aboutUs/arrow.png'} layout="fill" />
                </div>
                {creatorsList.slice(isSlicerStart, isSlicerEnd).map((creator) => (
                  <div onMouseMove={handleMouseMove} key={creator.id} className={`each-creator ${creator.classNme} ${animationClass}`}>
                    <div className="hover-wrapper">
                      <h3>{creator.name}</h3>
                      <p className="designation">{creator.pos}</p>
                      <p className="desc-desktop">{creator.desc}</p>
                    </div>
                  </div>
                ))}{' '}
                <div className={position == 2 ? 'slider-container-right-active' : 'slider-container-right'} onClick={changeSlicerHandler2}>
                  <Image className="slider-arrow" src={'/images/customer/aboutUs/arrow.png'} layout="fill" />
                </div>
              </RightContent>
            ) : (
              <RightContent>
                <div className="each-creator creator1">
                  <div className="hover-wrapper">
                    <h3>Ali Nael</h3>
                    <p className="designation">CEO & Co-Founder</p>
                    <p className="desc-desktop">{creator1Desc}</p>
                  </div>
                </div>
                <p className="mob-desc">{!showDesc1 ? `${creator1Desc.slice(0, 167)}...` : creator1Desc}</p>
                {showDesc1 ? (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc1(false)}>
                    Less <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                ) : (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc1(true)}>
                    More <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                )}

                <div className="each-creator creator2">
                  <div className="hover-wrapper">
                    <h3>Mohsin Rizvi</h3>
                    <p className="designation">COO & Co-Founder</p>
                    <p className="desc-desktop">{creator2Desc}</p>
                  </div>
                </div>
                <p className="mob-desc">{!showDesc2 ? `${creator2Desc.slice(0, 167)}...` : creator2Desc}</p>
                {showDesc2 ? (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc2(false)}>
                    Less <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                ) : (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc2(true)}>
                    More <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                )}
                <div className="each-creator creator3">
                  <div className="hover-wrapper">
                    <h3>Arnaud Tellier</h3>
                    <p className="designation">Head of Curation</p>
                    <p className="desc-desktop">{creator3Desc}</p>
                  </div>
                </div>
                <p className="mob-desc">{!showDesc3 ? `${creator3Desc.slice(0, 167)}...` : creator3Desc}</p>
                {showDesc3 ? (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc3(false)}>
                    Less <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                ) : (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc3(true)}>
                    More <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                )}
                <div className="each-creator creator4">
                  <div className="hover-wrapper">
                    <h3>Arvind</h3>
                    <p className="designation">General Counsel</p>
                    <p className="desc-desktop">{creator4Desc}</p>
                  </div>
                </div>
                <p className="mob-desc">{!showDesc4 ? `${creator4Desc.slice(0, 167)}...` : creator4Desc}</p>
                {showDesc4 ? (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc4(false)}>
                    Less <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                ) : (
                  <p className="desc-ctrl-btn" onClick={() => setShowDesc4(true)}>
                    More <Image src={'/images/customer/aboutUs/arrow-up.svg'} width={12} height={11.3} />
                  </p>
                )}
              </RightContent>
            )}
          </ContentWrap>
        </Container>
      </AboutUsWrapper>
      <ValueWrapper>
        <Container className="value-container">
          <div className="value-content">
            <h2>Value Proposition</h2>
            <p>
              Welcome to FutureGrail, your trusted partner in exploring luxury watches as an alternative asset class. We are committed to offering a comprehensive range of solutions for our customers. As expert advisors, we prioritize education and
              inspiration, ensuring our clients make well-informed decisions. Understanding the importance of legitimizing luxury timepieces as a viable investment option, our end-to-end platform, FutureGrail 360, demonstrates our dedication to
              promoting equality, transparency, and accessibility in this market. Our thoughtfully designed suite of services aims to help you unlock the full potential of your timepiece investments.
            </p>
          </div>
          <div className="value-img"></div>
        </Container>
      </ValueWrapper>
      <ValuePreproswrap>
        <Container>
          <ValueTopContent>
            <h1>Our core Values</h1>
            <p>
              FutureGrail is empowered by its core values of Trust, Authenticity, Equality, and Innovation—Our values shape our culture and how we serve our customers and the collecting community. Our values are our guiding compass, helping us
              venture into new places and amplify change.
            </p>
          </ValueTopContent>

          <ValueCard />
        </Container>
      </ValuePreproswrap>
      <Newsletter />
    </>
  )
}

export default AboutUs
