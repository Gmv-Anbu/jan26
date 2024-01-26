import React, { useEffect } from 'react'
import gsap from 'gsap'
import styled from 'styled-components'
import Image from 'next/image'

const VideoWrapper = styled.div`
  margin-bottom: -4px;
  position: relative;
  font-family: 'Proxima Nova';
  font-style: normal;
  /* ::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(215deg, #21cacd -45%, transparent 31%, #21cacd 300%);
  z-index: 1;
} */
  @media screen and (max-width: 430px) {
    margin-top: 65px;
  }

  .video-container {
    position: relative;
  }
  .down {
    z-index: 1;
    position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translate(-50%, -50%);
    span {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 9px;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      color: #fff;
      @media screen and (max-width: 768px) {
        font-size: 1.75rem;
      }
    }
  }

  .downArrow {
    z-index: 1;
    position: absolute;
    bottom: 195px;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: white;
    animation: arrow-move 1.2s cubic-bezier(0.48, 0.48, 0.68, 0.85) infinite;
  }

  @keyframes arrow-move {
    0% {
      transform: translate(-50%, 20px);
    }

    100% {
      opacity: 0;
      transform: translate(-50%, 80px);
    }
  }

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    min-height: 747px;
    /* margin-top:-110rem; */
  }
  .container {
    z-index: 1;
    position: relative;
    @media screen and (max-width: 768px) {
      margin-top: 136px;
    }
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15%;
    .anim-since-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 10.4rem;
      top: 50%;
      position: relative;
      overflow: hidden;
      width: 100%;
      position: absolute;
      line-height: 10.4rem;
      text-align: center;
      font-size: 10rem;
      color: #fff;
      @media screen and (max-width: 768px) {
        height: 5rem;
      }
      span {
        font-family: 'proxima_novalight';
        @media screen and (max-width: 1024px) {
          height: 8rem;
          font-size: 9rem;
        }
        @media screen and (max-width: 768px) {
          font-family: 'proxima_novaregular';
          height: 5rem;
          font-size: 5rem;
          line-height: 4.2rem;
        }
      }
    }
    .anim-title {
      font-weight: bold;
      font-family: 'proxima_nova';
      width: 100%;
      height: 10rem;
      position: relative;
      overflow: hidden;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &.mb-20 {
        margin-bottom: 2rem;
      }
      @media screen and (max-width: 768px) {
        height: 5rem;
        margin-bottom: 0.3rem;
      }
      @media screen and (max-width: 456px) {
        :nth-child(2) {
          height: 11rem;
          span {
            height: 11rem;
            line-height: 6rem;
          }
        }
      }
      span {
        font-family: 'proxima_novalight';
        position: absolute;
        line-height: 10.4rem;
        text-align: center;
        font-size: 10rem;
        color: #fff;
        @media screen and (max-width: 1024px) {
          height: 8rem;
          font-size: 9rem;
          line-height: normal;
        }
        @media screen and (max-width: 990px) {
          font-size: 7rem;
        }
        @media screen and (max-width: 768px) {
          height: 5rem;
          font-size: 5rem;
          line-height: 4.2rem;
        }
      }
    }
    .anim-sub-title {
      @media screen and (max-width: 1024px) {
        height: 4rem;
      }
      @media screen and (max-width: 768px) {
        height: 2.5rem;
      }
      width: 100%;
      height: 3.5rem;
      position: relative;
      overflow: hidden;
      span {
        font-style: italic;
        width: 100%;
        position: absolute;
        font-size: 2.2rem;
        font-weight: 400;
        line-height: 2.6rem;
        text-align: center;
        color: #bdc0c0;
        @media screen and (max-width: 1024px) {
          font-size: 2.5rem;
        }
        @media screen and (max-width: 990px) {
          font-size: 2.8rem;
        }
        @media screen and (max-width: 768px) {
          font-size: 2rem;
        }
      }
    }
  }
`
const VideoBackground = styled.div`
  z-index: 0;
  top: 0;
  left: 0;
  position: relative;
  .video-bg {
    &::before {
      content: '';
      position: absolute;
      background: url(/images/customer/home/banner-video-bg.webp) center center;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-size: contain;
    }
  }
  &::before {
    content: '';
    position: absolute;
    background: url(/images/customer/home/left-gradient.png) no-repeat left center;
    bottom: 0px;
    left: -11px;
    width: 372px;
    height: 706px;
    z-index: 1;
  }
  &::after {
    content: '';
    right: -55rem;
    top: -10rem;
    position: absolute;
    background-image: linear-gradient(127.11deg, rgba(60, 198, 254, 0.9) 41.76%, rgba(58, 216, 159, 0.9) 62.26%, rgba(41, 193, 255, 0.9) 81.52%);
    filter: blur(150px);
    width: 800px;
    height: 300px;
    transform: rotate(9deg);
    @media screen and (max-width: 549px) {
      display: none;
    }
  }
`

const HomeVideoBanner = () => {
  useEffect(() => {
    const tl = gsap.timeline()

    // tl.from('.anim-since-title span', {
    //   y: 150,
    //   ease: 'power4.out',
    //   delay: 1,
    //   skewY: 7,
    //   duration: 1.5,
    //   stagger: {
    //     amount: 0.3,
    //   },
    // })
    // tl.to('.anim-since-title span', {
    //   y: -150,
    //   ease: 'power4.in',
    //   delay: 1,
    //   skewY: 7,
    //   duration: 1.5,
    //   stagger: {
    //     amount: 0.3,
    //   },
    // })
    tl.from('.anim-title span', {
      y: 170,
      ease: 'power4.out',
      delay: 1,
      skewY: 7,
      duration: 1.5,
      stagger: {
        amount: 0.3,
      },
    })
    tl.from('.anim-sub-title span', {
      y: 100,
      ease: 'power4.out',
      delay: -1,
      skewY: 7,
      duration: 1,
      stagger: {
        amount: 0.3,
      },
    })
    tl.from('.down span', {
      y: 50,
      opacity: 0,
      ease: 'power4.out',
      duration: 2,
    })
    tl.from('.downArrow span', {
      y: 50,
      opacity: 0,
      ease: 'power4.out',
      duration: 1,
    })
  }, [])

  return (
    <VideoWrapper>
      <div className="container">
        {/* <div className="line anim-since-title">
          <span>Since 2019</span>
        </div> */}
        <div className="line anim-title">
          <span>INVESTING IN THE</span>
          
        </div>
        <div className="line anim-title mb-20">
          <span>DESIRES OF TOMORROW</span>
        </div>
        <div className="line anim-sub-title">
          <span>Uncovering timeless artistry</span>
        </div>
        <div className="line anim-sub-title">
          <span>Explore our extraordinary horological collection</span>
        </div>
      </div>
      <VideoBackground>
        <video autoPlay muted loop playsInline preload="metadata">
          <source type="video/mp4" src={'https://d3uwo5oqixn6qw.cloudfront.net/eethah8eiBeicooX5eg9coh3ne2ieC3thei2kahyooR9ki0ech.mp4'} />
        </video>
        <div className="video-bg"></div>
      </VideoBackground>
      <div className="scroll-down-section">
        <div className="downArrow">
          <Image src="/images/customer/home/scrolldown.svg" alt="ICO" width={32} height={16} />
        </div>
        <div className="down">
          <span>Scroll Down</span>
        </div>
      </div>
    </VideoWrapper>
  )
}

export default HomeVideoBanner
