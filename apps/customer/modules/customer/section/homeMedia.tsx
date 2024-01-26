import React, { useState } from 'react'
import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'
import Image from 'next/image'
import { ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'

import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'
import { Loader } from '@apps/customer/modules/shared/components/Loader'

import imgCard2 from '../../../public/images/customer/Media/img-2.jpg'
import imgCard3 from '../../../public/images/customer/Media/img-3.png'

const MobileHomeMedia = dynamic(() => import('./mobileHomeMedia'))

const MediaWrap = styled.div`
  background: radial-gradient(36.33% 101.13% at 24.87% 53.55%, rgba(27, 25, 30, 0) 0%, #1b191e 0%);
  padding: 14rem 0 9.1rem;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    background: url(/images/customer/shared/bg-member-gradient.webp) no-repeat left center;
    bottom: -92px;
    left: -61px;
    width: 372px;
    height: 706px;
  }
  &:after {
    content: '';
    position: absolute;
    background: url(/images/customer/shared/bg-right-gradient.png) no-repeat top right;
    top: 0;
    right: 0;
    width: 820px;
    height: 582px;
  }
  h1,
  h2,
  h4 {
    color: #fff;
  }
  h1 {
    position: relative;
    z-index: 10;
  }
  .btn-border {
    padding: 0 4.6rem;
    z-index: 10;
    font-weight: 400 !important;
    font-size: 1.6rem;
    color: #bdc0c0 !important;
    position: relative;
    min-width: 18rem;
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
  .read-link {
    color: #2a7575;
    z-index: 10;
    position: relative;
    font-size: 1.6rem;
    font-weight: 600;
    &:hover {
      color: #fff;
    }
  }

  h6 {
    color: #bdc0c0;
    font-size: 1.6rem;
    margin-bottom: 3.4rem;
    font-weight: normal;
  }
  padding-left: 5vw;
  padding-right: 5vw;
  @media screen and (max-width: 778px) {
    display: none;
  }
`
const MediaContent = styled.div`
  display: flex;
`
const MediaLeft = styled.div`
  width: 50%;
  padding-right: 5.6rem;
  display: flex;
  align-items: flex-end;
  position: relative;
  h2 {
    margin-bottom: 3.4rem;
    font-size: 4.9rem;
    font-weight: normal;
    width: 21ch;
    @media screen and (max-width: 1279px) {
      font-size: 3.5rem;
    }
    &:hover {
      color: #2a7575;
      cursor: pointer;
    }
  }
  p {
    color: #bdc0c0;
  }
`
const MediaLeftAlignEnd = styled.div`
  position: relative;
  z-index: 10;
`
const AuthorDesc = styled.div`
  margin-top: 3.6rem;
  display: flex;
  span {
    padding-right: 5.9rem;
    color: #bdc0c0;
    font-size: 1.6rem;
  }
  a {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      padding-right: 1rem !important;
      vertical-align: middle;
    }
  }
`
const BgManPos = styled.div`
  position: absolute;
  z-index: 1;
  bottom: -17%;
  width: 66rem;
  left: 4%;
  filter: brightness(0.7);
  @media screen and (max-width: 1300px) {
    left: -5%;
    width: 570px;
  }
  @media screen and (max-width: 1050px) {
    left: -10%;
    width: 420px;
  }
`
const MediaRight = styled.div`
  margin-left: 3rem;
  @media screen and (max-width: 1300px) {
    margin-left: 12rem;
  }
  @media screen and (max-width: 1100px) {
    margin-left: 5rem;
  }
  h4 {
    font-size: 2.2rem;
    color: #fff;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin: 0 0 1.2rem;
    font-weight: normal;
    &:hover {
      color: #2a7575;
      cursor: pointer;
    }
  }
`
const MediaList = styled.div``
const MediaEach = styled.div`
  display: flex;
  figure {
    margin: 0 !important;
  }
  margin-bottom: 3.6rem;
  h6 {
    margin-bottom: 1.4rem;
  }
  .img {
    span {
    }
    @media screen and (max-width: 1279px) {
      min-width: 100% !important;
      min-height: 100% !important;
      margin: 0 !important;
    }
  }
  @media screen and (max-width: 1050px) {
    figure {
      height: 190px !important;
    }
  }
`
const MediaListDesc = styled.div`
  width: 45%;
  margin-left: 2rem;
  @media screen and (max-width: 1300px) {
    width: 70%;
  }
  p {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.6rem;
    color: #bdc0c0;
    margin-top: 1.8rem;
    letter-spacing: -0.015em;
  }
  .heading {
    font-weight: 600;
  }
  h6 {
    font-weight: 600;
    margin-top: 0.3rem;
  }
`
const MediaPublishDesc = styled.div`
  @media screen and (max-width: 1025px) {
    margin-top: 4rem;
  }
  margin-top: 1rem;
  span {
    padding-right: 3.2rem;
    color: #bdc0c0;
    font-weight: 600;

    font-size: 1.5rem;
  }
  .read {
    padding-right: 3.2rem;
    color: #bdc0c0;
    font-weight: 600;
    font-size: 1.5rem;
    color: #2a7575;
  }
`
const ViewBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 400;
  margin: 7.9rem 2rem 0 0;
  @media screen and (max-width: 1050px) {
    margin: 0rem 2rem 0 0;
  }
`

const HomeMedia = () => {
  const router = useRouter()
  const [btnLoading, setBtnLoading] = useState(false)

  const gotoMediaHandler = () => {
    setBtnLoading(true)
    router.push('/base/media')
    setTimeout(() => setBtnLoading(false), 2000)
  }

  return (
    <>
      <MediaWrap>
        <Container>
          <h1>Media</h1>
          <MediaContent>
            <MediaLeft>
              <MediaLeftAlignEnd>
                <h6>DBC News</h6>
                <a className="read-link" href={'https://www.bloomberg.com/press-releases/2023-04-05/watch-investment-advisory-firm-futuregrail-set-to-open-in-singapore-this-april-hosting-world-s-first-online-fractionalised'} target="_blank" rel="noreferrer">
                  <h2>Watch Investment Advisory Firm, FutureGrail, Set to Open in Singapore this April</h2>
                </a>
                <p>FutureGrail was started by renowned watch collector and investor Ali Nael and business partner Mohsin Rizvi...</p>
                <AuthorDesc>
                  <span>April 5, 2023</span>
                  {/* <Link > */}
                  <a className="read-link" href="/base/video" target="_blank">
                    <Image src="/images/customer/home/icon-watch.svg" alt="ICO" width={22} height={16} />
                    Watch now
                  </a>
                  {/* </Link> */}
                </AuthorDesc>
              </MediaLeftAlignEnd>
              <BgManPos>
                <Image src="/images/customer/home/media/ali-new.png" alt="ICO" width={633} height={791} />
              </BgManPos>
            </MediaLeft>
            <MediaRight>
              <MediaList>
                <MediaEach>
                  <figure style={{ position: 'relative', width: '326px', height: '246px' }}>
                    <Image className="img" objectFit="contain" objectPosition="center" layout="fill" src={imgCard2} alt="ICO" />
                  </figure>
                  <MediaListDesc>
                    <h6>Times News</h6>
                    <a className="read-link" href={'https://finance.yahoo.com/news/watch-investment-advisory-firm-futuregrail-001500015.html'} target="_blank" rel="noreferrer">
                      <h4 className="heading">FutureGrail, the premier investment advisory firm for high-end watches, announces the grand opening of its new location in Singapore</h4>
                    </a>
                    <p>The company offers expert advice and guidance to watch collectors and investors interested in this new and increasingly...</p>
                    <MediaPublishDesc>
                      <span className="date">April 5, 2023</span>
                      <span className="read">10 Min Read</span>
                    </MediaPublishDesc>
                  </MediaListDesc>
                </MediaEach>
                <MediaEach>
                  <figure style={{ position: 'relative', width: '326px', height: '246px' }}>
                    <Image className="img" objectFit="contain" objectPosition="center" layout="fill" src={imgCard3} alt="ICO" />
                  </figure>
                  <MediaListDesc>
                    <h6>ET News</h6>
                    <a className="read-link" href={'https://www.prnewswire.com/apac/news-releases/watch-investment-advisory-firm-futuregrail-set-to-open-in-singapore-this-april-hosting-worlds-first-online-fractionalised-auction-of-high-end-watches-museum-of-rare-timepieces-and-tax-free-storage-vaults-301789604.html'} target="_blank" rel="noreferrer">
                      {' '}
                      <h4 className="heading">Watch Museum displaying over 200 ultra-rare vintage Patek Philippe and other historical timepieces from the 19th and 20th centuries</h4>
                    </a>
                    <p>FutureGrail is proud to unveil its highly anticipated Watch Museum, featuring one of the worlds rarest collections of....</p>
                    <MediaPublishDesc>
                      <span className="date">April 5, 2023</span>
                      <span className="read">7 Min Read</span>
                    </MediaPublishDesc>
                  </MediaListDesc>
                </MediaEach>
              </MediaList>
              <ViewBtnWrap>
                <ButtonPrimaryOutline disabled={btnLoading} onClick={gotoMediaHandler} className="btn-border">
                  {btnLoading && (
                    <div className="loader">
                      <Loader width="40" opacity="0.5" />
                    </div>
                  )}
                  View More
                </ButtonPrimaryOutline>
              </ViewBtnWrap>
            </MediaRight>
          </MediaContent>
        </Container>
      </MediaWrap>
      {/* Mobile responsive */}
      <MobileHomeMedia btnLoading={btnLoading} onGotoMedia={gotoMediaHandler} />
    </>
  )
}

export default HomeMedia
