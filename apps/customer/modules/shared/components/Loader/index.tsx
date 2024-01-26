import Image from 'next/image'
import React from 'react'
import styled, { keyframes } from 'styled-components'

interface ILoaderProps {
  width?: string
  height?: string
  opacity?: string
}

const rotate = keyframes`
from {
  tranform:rotate(0deg);
}
to{
  transform:rotate(360deg);
}
`

const Spinner = styled.img<ILoaderProps>`
  animation: ${rotate} infinite 1s linear;
  border: 0 !important ;
  opacity: ${(props) => (props.opacity ? props.opacity : '1')};
`

const OverLay = styled.div`
  display: none;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9998;
  align-items: center;
  justify-content: center;
`

export const Loader: React.FC<ILoaderProps> = ({ width, height, opacity }) => {
  return <Spinner src={`/svgs/loader.svg`} alt="loading" width={width} height={height} opacity={opacity} />
}

export const OverlayLoader = () => {
  return (
    <OverLay>
      <Spinner src={`/svgs/loader.svg`} alt="loading" width="100" height="60" />
    </OverLay>
  )
}

export default Loader
