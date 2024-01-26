import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import { SERVICE } from '@apps/customer/constants/constants'
import { serviceCardInfo } from '@apps/customer/data/section'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { Container, Flex } from '@apps/customer/styles/CommonStyles'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ServiceWrapper = styled.div`
  width: 100%;
`
const ServiceContainer = styled.div`
  padding: 14rem 0 14rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const ServiceCardsContainer = styled.div`
  width: 100%;
  display: grid;
  /* grid-template-columns: auto auto; */
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  grid-gap: 3rem;
  padding: 5% 0;
  /* place-content: center; */
  transition: all 0.2s;
  @media screen and (max-width: 1330px) {
    place-items: center;
  }
  @media screen and (max-width: 1200px) {
    /* grid-template-columns: auto auto; */
  }
  @media screen and (max-width: 798px) {
    grid-template-columns: 1fr;
  }
`
interface IStyleProps {
  isGap?: boolean
}
const EachSectionWrap = styled.div<IStyleProps>`
  cursor: pointer;
  background: #f4f9f9;
  padding: 3.5rem 4rem 4rem 8.9rem;
  box-shadow: 0px 1px 0px #d7eaea;
  width: 100%;
  margin: ${({ isGap }) => (isGap ? '0 0 4rem 0' : '0 0 0 0')};
  h1 {
    font-weight: 600;
    font-size: 3.2rem;
    line-height: 104%;
    color: #0e1818;
  }
  .expand-ico {
    cursor: pointer;
    position: relative;
    left: -5.4rem;
    top: 2.4rem;
  }
  @media screen and (max-width: 798px) {
    padding: 2.5rem 3rem 3rem 8rem;
  }
  @media screen and (max-width: 549px) {
    padding: 2.5rem 3rem 3rem 4rem;
    .expand-ico {
      left: -3rem;
    }
  }
`

const Services = () => {
  const [activeCard, setActiveCard] = useState(-1)
  const [show, setShow] = useState<string | number>(null)
  const { width } = useWindowSize()

  return (
    <ServiceWrapper>
      <Banner heading={'Value added services'} description={'Empower Your Journey: Experience Our Service Edge'} height={'484px'} />
      <Container>
        <ServiceContainer>
          {serviceCardInfo.map((eachSection, key) => (
            <EachSectionWrap isGap={+key % 2 != 0} key={key} onClick={() => (show === key ? setShow('') : setShow(key))}>
              <div>
                <span className="expand-ico">
                  <Icon name={show === key ? 'faq-up' : 'faq-down'} fill={width < 549 ? 'black' : null} />
                </span>
                <h1>{eachSection.section}</h1>
              </div>
              {show === key && (
                <ServiceCardsContainer>
                  {eachSection.services.map((card, index) => (
                    <MyAccordion
                      key={index}
                      // charCount={card.charCount}
                      // style={{ marginBottom: '4.2rem' }}
                      heading={card.heading}
                      content={card.content}
                      isActive={index == activeCard ? true : false}
                      tabindx={index}
                      onTanIndx={(indx) => setActiveCard(indx)}
                      img={card?.img}
                    />
                  ))}
                </ServiceCardsContainer>
              )}
            </EachSectionWrap>
          ))}
        </ServiceContainer>
      </Container>

      <Newsletter />
    </ServiceWrapper>
  )
}

interface accordionProps {
  moreBtnClicked: boolean
}
const AccordionWrap = styled.div<accordionProps>`
  position: relative;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  /* padding: ${(props) => (props.moreBtnClicked ? `3.2rem 3.2rem 1rem 3.2rem` : `3.2rem 3.2rem 1rem 3.2rem`)}; */
  padding: 65px 3rem 3rem 179px;
  width: 640px;
  /* min-height: 28rem; */
  min-height: 29.8rem;
  /* max-height: ${(props) => (props.moreBtnClicked ? 'fit-content' : '35rem')}; */
  background-color: #f9f9f9;
  z-index: ${(props) => (props.moreBtnClicked ? 10 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem 0;
  align-items: flex-start;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    background: url('/images/customer/vault/tile-bg.png') no-repeat bottom right;
    right: -5%;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &:hover {
    background: ${({ theme }) => `url('/images/customer/services/custom-bg.png') ${theme.colors.primary} `};
    background-size: 100% 120%;
    background-repeat: no-repeat;
    /* &::before {
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
    } */

    h1 {
      color: #ffffff;
    }
    p {
      color: #ffffff;
    }
  }
  @media screen and (max-width: 1502px) {
    width: 480px;
  }
  @media screen and (max-width: 1330px) {
    width: 100%;
  }
  @media screen and (max-width: 590px) {
    padding: 45px 2rem 2rem 85px;
  }

  /* @media screen and (max-width: 1440px) {
    width: 40.2rem;
    padding: ${(props) => (props.moreBtnClicked ? `2.7rem 2.7rem 1.5rem 2.7rem` : `2.7rem 2.7rem 1.2rem 2.7rem`)};
  } */

  h1 {
    font-weight: 400;
    font-size: 3.2rem;
    line-height: 104%;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    text-transform: uppercase;
    word-break: break-word;
  }
  p {
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.colors.primaryFontGrey};
    width: 100%;
    text-overflow: ellipsis;
  }
  .cutoff-text {
    /* --max-lines: ${(props) => (props.moreBtnClicked ? 1000000000 : 4)};
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--max-lines); */
    /* max-width: 30.7rem; */
    /* padding-left: 1rem; */
  }
  .accordion-content {
    /* padding: 69px 0 0 196px; */
  }
  @media screen and (max-width: 798px) {
    /* width: 350px; */
  }
  @media screen and (max-width: 480px) {
    width: 300px;
  }
  @media screen and (max-width: 340px) {
    width: 250px;
  }
`

const MoreBtn = styled.span<accordionProps>`
  background-color: transparent;
  font-size: 1.8182rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.5rem;
  padding: 1.4rem 0;
  color: ${({ theme }) => theme.colors.secondaryFontGrey};
  cursor: pointer;
  font-weight: 600;
  svg {
    width: 1.25rem;
    height: 0.625rem;
    stroke: #8b8b8b;
    transform: ${(props) => (props.moreBtnClicked ? 'rotate(180deg)' : `rotate(0deg)`)};
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`
const MoreBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
  bottom: 3rem;
  width: calc(100% - 6.4rem);
`
const ImgContainer = styled.div`
  width: 17.1rem;
  height: 28.4rem;
  position: absolute;
  top: -2%;
  left: -2%;
  @media screen and (max-width: 590px) {
    transform: scale(0.85);
    width: 16.25rem;
    height: 27rem;
    top: -2%;
    left: -15%;
  }
`
function MyAccordion({ heading, content, img, tabindx, onTanIndx, isActive }) {
  const [moreBtnClicked, setMoreBtnClicked] = useState(false)

  useEffect(() => {
    setMoreBtnClicked(isActive)
  }, [isActive])

  return (
    <AccordionWrap key={tabindx ? tabindx : ''} moreBtnClicked={moreBtnClicked}>
      <ImgContainer>
        <Image src={img} alt="register" layout="fill" />
      </ImgContainer>
      <div className="accordion-content">
        <h1>{heading}</h1>
        {/* <p>{moreBtnClicked ? content : `${content.slice(0, charCount)} ${content?.length > charCount ? '...' : ''}`}</p> */}
        <p className="cutoff-text">{content}</p>
      </div>
      {/* {content?.length > charCount && (
        <MoreBtnWrap>
          <MoreBtn
            onClick={() => {
              setMoreBtnClicked(!moreBtnClicked)
              onTanIndx(tabindx)
            }}
            moreBtnClicked={moreBtnClicked}
          >
            {moreBtnClicked ? 'Less' : 'More'}
            <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L6 6L1 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MoreBtn>
        </MoreBtnWrap>
      )} */}
    </AccordionWrap>
  )
}

export default Services
