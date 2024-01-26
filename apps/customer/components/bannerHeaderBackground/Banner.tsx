import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import React from 'react'
import styled from 'styled-components'
interface StyleProps {
  maxHeight?: string
  minHeight?: string
  height?: string
}
const BannerWrapper = styled.div<StyleProps>`

  display:flex;
  align-items:center;
  background-color: ${({ theme }) => theme.colors.primary};
  position: relative;
  min-height: ${(props) => (props.minHeight ? props.minHeight : '38.4rem')};
  min-height: ${(props) => (props.height ? props.height : '')};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : '')};
  text-align: center;
  background-image: url('/images/customer/Banner/bg-img.webp');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: ${(props) => (props.height ? `100% ${props.height}` : '100% 43.4rem')};
  h1 {
    margin-bottom: 0.8rem;
    padding: 12.5rem 0 0;
    line-height: 116%;
  }
  p {
    color: #bdc0c0;
    max-width: 572px;
    margin: 0 auto;
    line-height: 142.5%;
    letter-spacing: -0.015em;
  }
  button {
    margin-top: 46px;
  }
  &.sell-page {
    padding: 12rem 0 8rem 0;
    h1 {
      padding: 6.2rem 0 2.4rem;
      margin: 0;
      font-size: 60px;
      font-weight: 400;
      line-height: 62px;
    }
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 26px;
      color: #F4F9F9;
    }
    button {
      padding: 17px 40px;
      font-family: Poppins;
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 20px;
    }
  }
  @media screen and (max-width: 1100px) {
    min-height: 25.5rem;
    padding-top: 4rem;
  }
  @media screen and (max-width: 850px) {
    button {
      margin-top: 40px;
    }
    p {
      max-width: 300px;
    }
  }
  @media screen and (max-width: 768px) {
    min-height: 17rem;
    padding: 12rem 0 8rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('/images/customer/news Letter/banner-mr-bg-img1.png');
    h1 {
      font-size: 3rem;
      padding: 4.2rem 0 0;
    }
    p {
      font-size: 1.75rem;
      max-width: 342px;
    }
  }
  @media screen and (max-width: 500px) {
    button {
      width: 100%;
      min-width: 100%;
    }
    &.sell-page {
      padding: 8.5rem 24px 4rem;
      h1 {
        padding: 40px 0 24px 0;
        font-size: 24px;
        font-weight: 400;
        line-height: 28px;     
      }
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: -0.015em;
      }
    }
  }
  div{
    position:relative;
    text-align:center;
    width:100%;
  }
`
const InputWrapper = styled.div`
  position: absolute;
  bottom: -3rem;
  left: 0;
  right: 0;
  input {
    /* all: unset; */
    /* background-color: #F4F9F9; */
    width: min(88%, 628px);
    height: 60px;
    border: 1.09015px solid #d1e0e2;
    font-size: 1.8rem;
    padding-left: 4.5rem;
    background: #f4f9f9 url('/images/customer/news Letter/search.svg') no-repeat center left;
    background-position-x: 15px;
  }
  [type='text']:focus {
    outline: none;
  }
  @media screen and (max-width:549px){
    input{
      padding-left: 6.5rem;
      background-position-x: 20px;
      height: 48px;
    }
    
  }
`
const Banner = ({ heading, description, className, search, button, handleChange, onClick, height, maxHeight }: { heading: string; description: string; className?: string; button?: string; search?: boolean; handleChange?: (e: any) => void; onClick?: () => void; height?: string; maxHeight?: string }) => {
  return (
    <BannerWrapper className={className || ''} height={height} maxHeight={maxHeight}>
      <div>
        <h1>{heading}</h1>
        {description && <p>{description}</p>}
        {button
          ? <ButtonPrimary onClick={() => onClick ? onClick() : {}}>{button}</ButtonPrimary>
          : null}
        {search && (
          <InputWrapper>
            <input type="text" placeholder="Search" onChange={handleChange} />
            {/* <Icon name="search"/> */}
          </InputWrapper>
        )}
      </div>

    </BannerWrapper>
  )
}

export default Banner
