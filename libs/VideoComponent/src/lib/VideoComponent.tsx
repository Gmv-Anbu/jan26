import React from 'react'
import { IVideoComponent } from './modal'
import styled from 'styled-components'

interface VidContainerProps {
  rounded?: string | number
}

const Container = styled.div<VidContainerProps>`
  @media screen and (min-width: 1501px) {
    video {
      /* width: 100% !important; */
      /* height: 28.1rem; */
      /* width:61px;
  height:60px; */
      top: 0;
      left: 0;
      position: inherit;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1500px) {
    video {
      /* width: 100% !important; */
      /* height: 22.2rem !important; */
      top: 0;
      left: 0;
      position: inherit;
    }
  }

  @media screen and (min-width: 605px) and (max-width: 767px) {
    video {
      /* width: 100% !important; */
      /* height: 20.2rem; */
      top: 0;
      left: 0;
      position: inherit;
    }
  }

  @media screen and (min-width: 540px) {
    video {
      /* width: 100% !important; */
      /* height: 20.2rem;  */
      top: 0;
      left: 0;
      position: inherit;
    }
  }
  @media screen and (max-width: 540px) {
    video {
      /* width: 100% !important; */
      /* height: 18rem;  */
      top: 0;
      left: 0;
      position: inherit;
    }
  }

  video {
    /* height: 22.3rem; */
    top: 0;
    left: 0;
    border-radius: ${({ rounded }) => (rounded ? `${rounded}px` : 'initial')};
    position: inherit;
    object-fit: cover;
    width: 100%;
  }
`

export function VideoComponent({ filePath, width, height, controls, mute, autoPlay = true, className, rounded }: IVideoComponent) {
  return (
    <Container rounded={rounded}>
      <video className={className ? className : ''} autoPlay={autoPlay} loop={true} muted={mute} width={width} height={height} controls={controls}>
        <source src={filePath}></source>
      </video>
    </Container>
  )
}
