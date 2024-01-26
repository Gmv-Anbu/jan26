import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import downArrow from '../../public/svgs/chevron-arrow-down.svg'
interface accordionProps {
  moreBtnClicked: boolean
}
const AccordionWrap = styled.div<accordionProps>`
  position: relative;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  padding: ${(props) => (props.moreBtnClicked ? `3.2rem 3.2rem 6rem 3.2rem` : `3.2rem 3.2rem 3rem 3.2rem`)};
  width: 44.2rem;
  min-height: 28rem;
  background-color: #f9f9f9;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(to right top, #1f3536, #214347, #235159, #255f6d, #286d83);
    color: ${({ theme }) => theme.colors.offWhiteFont};
  }
  &:hover h1 {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover p {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover span {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover svg {
    stroke: ${({ theme }) => theme.colors.white}!important;
  }
  @media screen and (max-width: 1440px) {
    width: 36.2rem;
    padding: ${(props) => (props.moreBtnClicked ? `2.7rem 2.7rem 6rem 2.7rem` : `2.7rem 2.7rem 5.2rem 2.7rem`)};
  }

  h1 {
    font-size: 3.2rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
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
`

const MoreBtn = styled.span<accordionProps>`
  background-color: transparent;
  /* border: none; */
  font-size: 1.6rem;
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  /* width: 5.3rem; */
  /* bottom: 3rem; */
  color: ${({ theme }) => theme.colors.secondaryFontGrey};
  cursor: pointer;
  font-weight: 600;
  svg {
    stroke: #8b8b8b;
    transform: ${(props) => (props.moreBtnClicked ? 'rotate(180deg)' : `rotate(0deg)`)};
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
const Accordion = ({ heading, content, key, style, charCount=140 }) => {
  const [moreBtnClicked, setMoreBtnClicked] = useState(false)
  return (
    <AccordionWrap key={key ? key : ''} style={style} moreBtnClicked={moreBtnClicked}>
      <h1>{heading}</h1>
      <p>
        {moreBtnClicked ? content + content : content.slice(0, charCount)}
        {content?.length > charCount && (
          <MoreBtn onClick={() => setMoreBtnClicked(!moreBtnClicked)} moreBtnClicked={moreBtnClicked}>
            {/* {moreBtnClicked ? 'Less' : 'More'} */}
            {/* <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L6 6L1 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg> */}
            {moreBtnClicked ? '...Less' : '...More'}
          </MoreBtn>
        )}
      </p>
    </AccordionWrap>
  )
}

export default Accordion
