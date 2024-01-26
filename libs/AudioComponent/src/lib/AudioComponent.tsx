import React from 'react'
import { IAudioComponent } from './modal'
import styled from 'styled-components'
import Image from 'next/image'

interface AudioProps {
  height?: number
  width?: number
  size?: string
  padding?: string | number
}
interface ContainerProps {
  containerWidth?: string | number
}

const Container = styled.div<ContainerProps>`
  /* .audio-img{
    width: 400px;
    height: 400px;
  } */

  /* @media screen and (max-width: 540px) {
  .audio-img{
    width: 300px !important;
    height: 250px !important;
  }
} */

  /* @media screen and (min-width: 1501px) {
    audio {
    top: 0;
    left: 0;
    position: inherit;
    }}
@media screen  and (min-width: 768px) and (max-width: 1500px) {
audio {
  top: 0;
  left: 0;
  position: inherit;
}
}


@media screen and (min-width: 605px)  and (max-width: 767px) {
audio {
  top: 0;
  left: 0;
  position: inherit;
}
}



@media screen and (min-width: 540px) {
audio {
  top: 0;
  left: 0;
  position: inherit;
}
}
@media screen and (max-width: 540px) {
audio {
  top: 0;
  left: 0;
  position: inherit;
}
}

audio {
    width: 100% !important;
    top: 0;
    left: 0;
    position: inherit;
    object-fit: cover;
    }*/
  position: relative;
  width: ${(props) => (props?.containerWidth ? `${props.containerWidth}%` : '100%')};
  audio {
    width: 92%;
    position: absolute;
    bottom: -15px;
    left: 0;
  }
`
const ImgContainer = styled.div<AudioProps>`
  /* width: ${(props) => (props.height ? `${props.width}px` : '300px')};
  height: ${(props) => (props.height ? `${props.height}px` : '300px')}; */
  padding: ${(props) => (props?.padding ? `${props.padding}% 0 0` : '95% 0 0')};
  @media screen and (max-width: 540px) {
    width: ${(props) => (props?.size === 'small' ? `${props.width}px` : '200px !important')};
    height: ${(props) => (props?.size === 'small' ? `${props.height}px` : '200px !important')};
  }
`

export function AudioComponent({ filePath, width, height, controls, mute, autoPlay = true, imgSrc = '/svgs/audio.svg', size, className, containerWidth, padding, style }: IAudioComponent) {
  return (
    <Container className='audio-container' containerWidth={containerWidth} style={style?style : {}}>
      {/* <Image src={imgSrc} alt="Back" width="100" height="100 " objectFit="cover" /> */}
      <ImgContainer width={width} height={height} size={size} padding={padding}>
        <Image className={className ? className : ''} src={imgSrc} alt="Back" layout="fill" />
        {/* <Image className='audio-img' src={imgSrc} alt="Audio" layout='fill'/> */}
      </ImgContainer>
      <audio autoPlay={autoPlay} loop={true} muted={mute} controls={controls}>
        <source src={filePath}></source>
      </audio>
    </Container>
  )
}
