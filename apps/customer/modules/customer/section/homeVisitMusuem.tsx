import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'
import { ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import PlayButtonImg from '../../../public/images/customer/playbtn.png'
import { Loader } from '@apps/customer/modules/shared/components/Loader'
import BookAnAppoinment from '@apps/customer/components/Calendly/calendly'
interface PageProps {
  page: string
}

const VisitWrap = styled.div<PageProps>`
  display: flex;
  flex-direction: ${(props) => (props.page === 'museum' ? 'column' : 'row')};
  flex-wrap: wrap;
  overflow: hidden;
  .btn-border {
    width: 100%;
    margin-top: ${(props) => (props.page === 'museum' ? '5.5rem' : '10rem')};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    :disabled {
      filter: blur(0.6px);
      cursor: not-allowed;
    }
    .loader {
      position: absolute;
    }
    @media screen and (max-width: 1545px) {
      width: 96%;
    }
    @media screen and (max-width: 780px) {
      margin: 5rem 0 5rem 0;
    }
  }
  @media screen and (max-width: 470px) {
    display: flex;

    flex-direction: column;
  }
  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: column;
  }

  &.museumPage {
    .right-content {
      width: 55%;
      .clock {
        transform: scale(1.2);
        left: 13.5rem;
      }
      .loc {
        top: 10rem;
        right: -3rem;
      }
    }
    @media screen and (max-width: 780px) {
      .right-content {
        width: 100%;
        .clock {
          transform: scale(1);
          left: 17rem;
        }
        .loc {
          transform: scale(1);
          right: 2rem;
        }
      }
    }
  }
`
const VisitSecLeft = styled.div<PageProps>`
  width: ${(props) => (props.page === 'museum' ? '100%' : '51%')};
  @media screen and (max-width: 470px) {
    width: 100%;
  }
  @media screen and (max-width: 780px) {
    width: 100%;
  }
`
const VideoWrapper = styled.div<PageProps>`
  cursor: pointer;
  video {
    object-fit: cover;
    width: 100%;
    height:  ${(props) => (props.page === 'museum' ? '800px' : '980px')};
    margin-bottom: -5px;
    @media screen and (max-width: 470px) {
      object-fit: cover;
      width: 100%;
      height: 45rem;
      margin-bottom: -5px;
    }
  }
  video::-webkit-media-controls-play-button {
    display: none;
  }
  video::-webkit-media-controls-start-playback-button {
    display: none;
  }
  video::-webkit-media-controls-play {
    display: none;
  }
  video::-webkit-media-controls-enclosure {
    overflow: hidden;
  }
  video::-moz-media-controls-play-button {
    display: none;
  }

  .videoComponent {
    position: relative;
    @media screen and (max-width: 470px) {
      object-fit: cover;
      width: 100%;

      margin-bottom: -5px;
    }
    @media screen and (max-width: 330px) {
      width: 100%;
      video {
        height: 47rem !important;
      }
    }
    @media screen and (max-width: 780px) {
      width: 100%;
      video {
        height: 60rem;
      }
    }
  }
`
const VisitSecRight = styled.div<PageProps>`
  width: ${(props) => (props.page === 'museum' ? '100%' : '49%')};
  background: ${(props) => (props.page === 'museum' ? "url('/images/customer/home/visit-museum-bg.webp') no-repeat center center" : "url('/images/customer/home/bg-visit.png') no-repeat center center")};
  min-height: ${(props) => (props.page === 'museum' ? '669px' : '960px')};
  display: flex;
  align-items: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  ${(props) =>
    props.page !== 'museum' &&
    css`
      &::before {
        content: '';
        left: -5rem;
        top: -13rem;
        z-index: 2;
        position: absolute;
        background-image: linear-gradient(127.11deg, rgba(60, 198, 254, 0.9) 41.76%, rgba(58, 216, 159, 0.9) 62.26%, rgba(41, 193, 255, 0.9) 81.52%);
        filter: blur(90px);
        width: 200px;
        height: 200px;
      }
    `}

  @media screen and (max-width: 780px) {
    width: 100%;
    min-height: 6.69rem;
  }
  @media screen and (max-width: 470px) {
    width: 100%;
    /* padding-top: 5rem; */
    min-height: 0;
    ${(props) =>
      props.page !== 'museum'
        ? css`
            background-position: bottom -105px right -115px;
            background-size: 210%;
          `
        : css`
            background: url('/images/customer/home/bg-map-mob.png') no-repeat center center;
            background-position: bottom 0px right 0px;
            background-size: 110%;
          `}

    &::before {
      left: -12rem;
      top: -28rem;
      filter: blur(90px);
      width: 300px;
      height: 300px;
      transform: rotate(83deg);
    }
    &::after {
      content: '';
      position: absolute;
      background: url(/images/customer/home/TextureM.svg);
      top: 0;
      right: 0;
      width: 54rem;
      height: 100%;
      background-size: contain;
      z-index: 1;
    }
  }
`
const VisitMusuemContent = styled.div<PageProps>`
  display: ${(props) => props.page === 'museum' && 'flex'};
  gap: ${(props) => props.page === 'museum' && '11.6rem'};
  padding: 0 3rem 0 10.4rem;
  ${(props) =>
    props.page === 'museum' &&
    css`
    max-width: 144rem;
    margin: auto;
    padding: 0;
    gap: 9rem;
  `}
  width: 100%;
  .mw-56 {
    max-width: 56rem;
  }
  @media screen and (max-width: 1025px) {
    padding: 0 1rem 0 10.4rem;
  }
  @media screen and (max-width: 780px) {
    flex-direction: column;
    padding: 5rem 5rem 0 10rem;
    gap: 0;
  }
  @media screen and (max-width: 470px) {
    padding: 0 3.4rem !important;
    margin-top: 2.2rem;
    width: 100%;
    &::before {
      content: '';
      right: -20rem;
      bottom: 0;
      z-index: 2;
      position: absolute;
      background-image: linear-gradient(127.11deg, rgba(60, 198, 254, 0.9) 41.76%, rgba(58, 216, 159, 0.9) 62.26%, rgba(41, 193, 255, 0.9) 81.52%);
      filter: blur(150px);
      width: 200px;
      height: 200px;
    }
  }
  h1,
  p,
  h6 {
    color: #fff;
  }
  p {
    @media screen and (max-width: 470px) {
      font-size: 1.4rem;
    }
  }
  h6 {
    font-size: 1.6rem;
    margin-bottom: 2.5rem;
    font-weight: normal;
    @media screen and (max-width: 460px) {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 104%;
      color: #f4f9f9;
      margin-bottom: 16px;
    }
  }
  h1 {
    margin-bottom: ${(props) => (props.page === 'museum' ? '8rem' : '2rem')};
    width: ${(props) => props.page !== 'museum' && '10ch'};
    /* font-size:3.75em !important; */
    @media screen and (max-width: 780px) {
      width: 16ch;
      margin-top: 3rem;
    }
    @media screen and (max-width: 470px) {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 116%;
      text-transform: uppercase;
      color: #ffffff;
      margin: 15px 0 16px 0;
    }
  }
  div.sub-head {
    /* font-size: 1rem !important; */
    font-weight: 400;
    font-size: 2.2rem;
    width: ${(props) => (props.page === 'museum' ? '44.9rem' : '49.3rem')};
    line-height: 142.5%;
    color: #f4f9f9;
    letter-spacing: -0.015em;
    @media screen and (max-width: 460px) {
      width: 90%;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 142.5%;
      letter-spacing: -0.015em;
      color: #dadddd;
    }
    @media screen and (max-width: 330px) {
      font-size: 1.4rem;
      word-break: break-word;
      width: 44ch;
      padding-right: 5rem;
    }
  }
`
const Location = styled.div`
  position: relative;
`
const HourVenueWrap = styled.div`
  margin: 15.3rem 0 0;
  display: flex;

  p {
    &.heading-4 {
      font-size: 3.2rem;
      font-weight: 400;
      line-height: 3.3rem;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    &.text-bot,
    &.text-bot-2 {
      font-size: 1.9rem;
      font-weight: 400;
      line-height: 2rem;
      text-transform: uppercase;
    }
    &.text-bot-2 {
      margin: 0.8rem 0 0 0;
    }
    &.p-spacing {
      letter-spacing: 0.2em;
    }
  }
  .span-txt {
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 132%;
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }

  @media screen and (max-width: 470px) {
    margin: 40px 0 0 0;
    display: flex;
    flex-direction: column;
  }
`
const HourWrap = styled.div`
  width: 38%;
  @media screen and (max-width: 470px) {
    width: 65%;
  }
`
const Button = styled.div`
  @media screen and (max-width: 330px) {
    width: 91.5% !important ;
  }
  @media screen and (max-width: 470px) {
    margin-bottom: 2.4rem;
    width: 100%;
    position: relative;
    z-index: 1000;

    .btn-border {
      font-size: 14px;
      @media screen and (max-width: 470px) {
        width: 100%;
      }
    }
  }
`
const IconVenueHolder = styled.div`
  position: relative;
  .clock {
    position: absolute;
    top: 0;
    left: 12rem;
  }
`
const VenueWrap = styled.div`
  width: 50%;
  position: relative;
  .loc {
    position: absolute;
    top: 0;
    right: -1rem;
    @media screen and (max-width: 470px) {
      top: 6rem;
      right: 1rem;
    }
  }
  span {
    @media screen and (max-width: 780px) {
      margin-top: 0 !important;
      margin-left: 0.3rem;
    }
  }
  @media screen and (max-width: 470px) {
    padding-top: 4rem;
    padding-left: 0 !important;
    width: 105%;
  }
  @media screen and (max-width: 780px) {
    padding-left: 2rem;
  }
`
const PlayBtn = styled.div<PageProps>`
  @media screen and (max-width: 470px) {
    width: 6.5em;
    left: ${(props) => (props.page === 'museum' ? '42.8%' : '44.5%')};
    top: 45%;
  }
  width: 8.6em;
  position: absolute;

  left: ${(props) => (props.page === 'museum' ? '47.8%' : '45.8%')};
  z-index: 1;
  top: 46%;
  border: none;
  transform: translate(-50%, -50%);
  display: block;
  transform: scale(1);
  animation: pulse 1.5s cubic-bezier(0.29, 0.35, 0.94, 0.8) infinite alternate;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 transparent;
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px transparent;
    }
  }

  // @keyframes playBtnAnim {
  //   from {
  //     transform: scale(0);
  //     opacity: 0;
  //   }
  //   to {
  //     transform: scale(1);
  //     opacity: 1;
  //   }
  // }
  .playBtn-img {
    width: 86px !important;
    height: 86px !important;
    cursor: pointer;
    @media screen and (max-width: 425px) {
      width: 36px !important;
      height: 36px !important;
    }
  }
`
const HomeVisitMusuem = ({ page }: { page?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [viewCalender, setViewCalender] = useState(false)
  const videoRef = useRef(null)

  const visitMuseumText =
    page === 'museum'
      ? "Welcome to our museum, where we showcase hundreds of rare wristwatches, pocket watches, and important objects. Immerse yourself in an experience that inspires new and seasoned collectors alike. We welcome our members and guests to join us to build and enhance the community's horological knowledge and experience."
      : 'Members and guests are cordially invited to explore the world of horology at our museum. We offer a unique opportunity to discover rare timepieces and historical artifacts, learn about their significance, and immerse yourself in a world of passion and beauty. Plan your visit below. '

  const handlePlay = () => {
    setIsPlaying(true)
    videoRef.current.play()
  }
  const handlePause = () => {
    setIsPlaying(false)
  }
  const handleClick = () => {
    if (isPlaying) {
      setIsPlaying(false)
      videoRef.current.pause()
    }
  }

  const handleStop = () => {
    setIsPlaying(false)
    videoRef.current.currentTime = 0
    videoRef.current.pause()
  }

  useEffect(() => {
    if (window?.screen?.availWidth <= 500) {
      setIsMobile(true)
    }
  }, [])

  return (
    <>
      {' '}
      <BookAnAppoinment isOpen={viewCalender} closePopup={() => setViewCalender(false)} pathName={'/plan-your-visit-to-futuregrail-museum-for-1-hour'} />
      <VisitWrap className={page + 'Page'} page={page}>
        <VisitSecLeft page={page}>
          <VideoWrapper page={page}>
            <div className="videoComponent">
              <PlayBtn page={page}>{!isPlaying && <Image onClick={handlePlay} className="playBtn-img" src={PlayButtonImg} alt="ICO" />}</PlayBtn>

              <video
                onClick={handleClick}
                onPause={handlePause}
                onPlay={handlePlay}
                onEnded={handleStop}
                ref={videoRef}
                // muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                controlsList="nodownload noplaybackrate"
                poster="/images/customer/Museum/museum-video-thumbnail.webp"
              >
                <source type="video/mp4" src={'https://d3uwo5oqixn6qw.cloudfront.net/FG+video+1080p.mp4'} />
              </video>
            </div>
          </VideoWrapper>
        </VisitSecLeft>
        <VisitSecRight page={page}>
          <VisitMusuemContent page={page}>
            <div className="left-content">
              <h1>Visit Our Museum!</h1>
              <div className="sub-head">{visitMuseumText}</div>
            </div>
            <div className="right-content">
              <HourVenueWrap>
                <HourWrap>
                  <h6>Opening Hours</h6>
                  <IconVenueHolder>
                    <p className="heading-4">
                      10 AM - <br></br>6 PM SGT
                    </p>
                    <p className="text-bot p-spacing">mon - fri</p>
                    <p className="text-bot-2">(Closed on Singapore public holidays & weekend)</p>
                    <div className="clock">
                      <Image className="img1" src="/images/customer/home/icon-clock.svg" alt="ICO" width={isMobile ? 68 : 84} height={isMobile ? 68 : 84} />
                    </div>
                  </IconVenueHolder>
                </HourWrap>

                <VenueWrap>
                  <Location>
                    <h6>Located at</h6>
                    <p className="heading-4">
                      100E Pasir <br /> Panjang Road,
                    </p>
                    <span className="span-txt">
                      {' '}
                      B&D Building, 03-01 / 03-02, <br /> Singapore, 118521 (Free parking <br /> available at our carpark)
                    </span>
                  </Location>
                  <div className="loc">
                    <Image src="/images/customer/Location.png" alt="ICO" width={isMobile ? 68 : 97} height={isMobile ? 68 : 97} />
                  </div>
                </VenueWrap>
              </HourVenueWrap>
              <Button>
                <ButtonPrimaryOutline
                  disabled={btnLoading}
                  onClick={() => {
                    setBtnLoading(true)
                    setViewCalender(true)
                    setTimeout(() => setBtnLoading(false), 2000)
                  }}
                  className="btn-border mw-56"
                >
                  {btnLoading && (
                    <div className="loader">
                      <Loader width="40" opacity="0.5" />
                    </div>
                  )}
                  Plan Your Visit
                </ButtonPrimaryOutline>
              </Button>
            </div>
          </VisitMusuemContent>
        </VisitSecRight>
      </VisitWrap>
    </>
  )
}

export default HomeVisitMusuem
