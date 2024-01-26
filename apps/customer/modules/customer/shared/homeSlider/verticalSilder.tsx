import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Slider from 'react-slick'
import { AudioComponent } from '@nft-marketplace/AudioComponent'
import { VideoComponent } from '@nft-marketplace/VideoComponent'

const SliderContainer = styled.div`
  min-width: 17rem;
  max-width: 20rem;
  width: 100%;
  margin-right: 2rem;
  .slick-slide {
    max-width: 20rem;
    width: 100%;
    min-width: 12rem;
  }
  
  .hide_transform{
    .slick-track{
   height:auto !important ;
  }
  @media screen and (max-width:540px){
    .slick-track{
   width: 100% !important;
   transform: inherit !important;
   display: flex;
   justify-content: center;
  }
  }
  @media screen and (max-width:768px){
    .slick-track{
   width: 100% !important;
   transform: inherit !important;
   display: flex;
   justify-content: center;
  }
  }
  }
 
  .slick-list {
    max-height: 70rem !important;
    height: 100%;
  }
  
  .slick-prev,
  .slick-next {
    width: 2.4rem;
    height: 2.4rem;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &:before {
      display: none;
    }
  }
  .slick-prev {
    top: -1.5rem;
    background-image: url(/svgs/chevron-arrow-up.svg);
  }
  .slick-next {
    top: auto;
    bottom: -1.5rem;
    background-image: url(/svgs/chevron-arrow-down.svg);
  }
  img, video, .audio-container {
    width: 19rem !important;
    height: 20rem !important;
    cursor: pointer;
    max-width: 100%;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.copyFromClipboardbg};
    border: 1.23177px solid ${({ theme }) => theme.colors.buttoncolor};
    box-sizing: border-box;
    backdrop-filter: blur(3.5rem);
    border-radius: 0.8rem;
    transform: scale(0.82);
    opacity: 0.3;
    backdrop-filter: blur(3.5rem);
    &.active-center {
      opacity: 1;
      transform: scale(1);
      margin: 1rem 0;
      backdrop-filter: none;
    }
    @media screen and (max-width: 1500px) {
      width: 18rem !important;
      height: 17.5rem !important;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-right: 0rem;
    .slick-list {
      height: auto !important;
      padding: 0 !important;
    }
    .slick-prev,
    .slick-next {
      left: auto;
      top: 50%;
    }
    .slick-prev {
      left: 1rem;
      transform: translateY(-50%) rotate(-90deg);
    }
    .slick-next {
      bottom: auto;
      right: 1rem;
      transform: translateY(-50%) rotate(-90deg);
    }
    img.active-center, video.active-center, .audio-container.active-center {
      margin: 0 !important;
    }
  }
  @media screen and (max-width: 540px) {
    img, video, .audio-container {
      width: 15rem !important;
      height: 15rem !important;
      &.active-center {
        margin: 0;
      }
    }
    .slick-track {
      width: 1680px !important;
      transform: translate3d(-360px, 0px, 0px) !important;
    }
    .slick-slide {
      width: 15rem !important;
      min-width: auto;
    }
    .slick-prev,
    .slick-next {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
`

const VerticalSlider = (props: any) => {
  const { parentCallBack, sliderArr, selected } = props
  const settings = {
    dots: false,
    infinite: sliderArr?.length >= 2 ? true : false,
    slidesToShow: sliderArr?.length <= 2 ? 1 : 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
    className: 'center',
    centerMode: true,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      parentCallBack(currentSlide)
    },
    afterChange: function (currentSlide: any) {
      parentCallBack(currentSlide)
    },
    responsive: [
      {
        breakpoint: 770,
        settings: {
          vertical: false,
          infinite: sliderArr?.length > 2 ? true : false,
          verticalSwiping: false,
          centerMode: true,
          slidesToShow: sliderArr?.length <= 2 ? 1 : sliderArr?.length == 3 ? 3 : 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false,
          infinite: sliderArr?.length > 2 ? true : false,
          verticalSwiping: false,
          slidesToShow: sliderArr?.length <= 2 ? 1 : sliderArr?.length == 4 ? 4 : 3,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <SliderContainer>
      <Slider {...settings} className={sliderArr?.length <= 4 ? 'hide_transform': ''}>
        {sliderArr.map((slide: any) =>
          slide.mediaType === 'video' ? (
            <div>
              <VideoComponent className={`${sliderArr[selected] === slide ? 'active-center' : 'vertical-slider-images'}`} filePath={slide?.NFT} width={160} height={140} controls={false} mute={true} autoPlay={false} />
            </div>
          )
            // : slide.mediaType === 'audio' ? (
            //   <AudioComponent className={`${sliderArr[selected] === slide ? 'active-center' : 'vertical-slider-images'}`} filePath={slide?.NFT} width={160} height={140} controls={false} mute={false} autoPlay={false} imgSrc="/svgs/audio-white.svg" />
            // ) 
            : (
              <img className={`${sliderArr[selected] === slide ? 'active-center' : 'vertical-slider-images'}`} src={slide.mediaType === 'audio' ? '/svgs/audio-white.svg' : slide?.NFT} key={slide} alt={`demo-${slide}`} />
            )
        )}
      </Slider>
    </SliderContainer>
  )
}

export default VerticalSlider
