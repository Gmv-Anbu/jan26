import React, { useState } from 'react'
import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'
import Image from 'next/image'
import { Loader } from '@apps/customer/modules/shared/components/Loader'

import CardComponent from '@apps/customer/components/card/card'
import { ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'

import imgCard2 from '../../../public/images/customer/Media/img-2.jpg'
import imgCard3 from '../../../public/images/customer/Media/img-3.png'

const MediaMrScreenWrap = styled.div`
  width: 100%;
  background-image: url('/images/customer/home/home-media-bg-img.png');
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 10px 60px 10px;
  @media screen and (min-width: 778px) {
    display: none;
  }
  h1 {
    min-width: 342px;
    font-weight: 400;
    font-size: 3rem;
    line-height: 116%;
    text-transform: uppercase;
    color: #ffffff;
    padding: 0 0 24px 0;
  }
`
const MainImageBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const DetailsBox = styled.div`
  position: absolute;
  top: 190px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem 0;
  padding: 0 16px;
  max-width: 342px;
  p {
    color: #bdc0c0;
  }
  .p-1 {
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 125%;
  }
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 2.25rem;
    line-height: 120%;
    color: #ffffff;
    &:hover {
      color: #2a7575;
      cursor: pointer;
    }
  }
  .p-2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015rem;
    color: #bdc0c0;
  }
  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 3rem;
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 125%;
      color: #bdc0c0;
      font-size: 1.5rem;
    }
    p:last-child {
      font-weight: 500;
      color: #2a7575;
      font-size: 1.5rem;
    }
  }
`
const GridContianer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  place-content: center;
  align-items: flex-start;
  max-width: 342px;
  .Card-box {
    margin: 24px 0 0px 0;
  }
`

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 0 0 0;
  .btn-border {
    min-height: 48px;
    min-width: 140px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :disabled {
      filter: blur(0.6px);
      cursor: not-allowed;
    }
    .loader {
      position: absolute;
    }
  }
`

function MobileHomeMedia({ btnLoading, onGotoMedia }) {
    const dummy_data = [
        {
          image: { src: imgCard2, alt: 'storie-2', w: 342, h: 200 },
          subText: 'Times News',
          title: 'FutureGrail, the premier investment advisory firm for high-end watches, announces the grand opening of its new location in Singapore',
          description: 'The company offers expert advice and guidance to watch collectors and investors interested in this new and increasingly...',
          date: 'April 5, 2023',
          min: '10 Min Read',
          isHref: true,
          isLink: 'https://finance.yahoo.com/news/watch-investment-advisory-firm-futuregrail-001500015.html',
        },
        {
          image: { src: imgCard3, alt: 'storie-3', w: 342, h: 200 },
          subText: 'ET News',
          title: 'Watch Museum displaying over 200 ultra-rare vintage Patek Philippe and other historical timepieces from the 19th and 20th centuries',
          description: 'FutureGrail is proud to unveil its highly anticipated Watch Museum, featuring one of the worlds rarest collections of....',
          date: 'April 5, 2023',
          min: '07 Min Read',
          isVideo: false,
          isHref: true,
          isLink: 'https://www.prnewswire.com/apac/news-releases/watch-investment-advisory-firm-futuregrail-set-to-open-in-singapore-this-april-hosting-worlds-first-online-fractionalised-auction-of-high-end-watches-museum-of-rare-timepieces-and-tax-free-storage-vaults-301789604.html',
        },
    ]
  
    return (
      <MediaMrScreenWrap>
        <h1>Media</h1>
        <MainImageBox>
          <Image src={'/images/customer/home/media/Ali-mr.png'} alt="ICO" width={342} height={393} />
          <DetailsBox>
            <p className="p-1">DBC News</p>
            <a className="read-link" href={'https://www.bloomberg.com/press-releases/2023-04-05/watch-investment-advisory-firm-futuregrail-set-to-open-in-singapore-this-april-hosting-world-s-first-online-fractionalised'} target="_blank" rel="noreferrer">
              <h2>Watch Investment Advisory Firm, FutureGrail, Set to Open in Singapore this April</h2>
            </a>
            <p className="p-2">FutureGrail was started by renowned watch collector and investor Ali Nael and business partner Mohsin Rizvi...</p>
            <div className="date">
              <p>April 5, 2023</p>
              <a className="read-link" href="/base/video" target="_blank">
                {' '}
                <p>Watch now</p>
              </a>
            </div>
          </DetailsBox>
        </MainImageBox>
        <GridContianer>
          {dummy_data.map((item, key) => (
            <div key={key} className="Card-box">
              <CardComponent isVideo={false} isColor={'#FFFFFF'} image={item.image} subText={item.subText} title={item.title} description={item.description} date={item.date} min={item.min} isHref={item.isHref} isLink={item.isLink} />
            </div>
          ))}
        </GridContianer>
        <ButtonBox>
          <ButtonPrimaryOutline disabled={btnLoading} onClick={onGotoMedia} className="btn-border">
            {btnLoading && (
              <div className="loader">
                <Loader width="40" opacity="0.5" />
              </div>
            )}
            View More
          </ButtonPrimaryOutline>
        </ButtonBox>
      </MediaMrScreenWrap>
    )
}

export default MobileHomeMedia