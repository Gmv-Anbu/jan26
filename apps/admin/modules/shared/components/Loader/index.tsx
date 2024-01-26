import Image from 'next/image';
import React from 'react'
import styled, { keyframes } from "styled-components";

interface ILoaderProps{
  width: string,
  height : string
}

const rotate = keyframes`
from {
  tranform:rotate(0deg);
}
to{
  transform:rotate(360deg);
}
`

const Spinner = styled.img`
  animation:${rotate} infinite 1s linear;
  z-index:111111;
`

export const Loader:React.FC<ILoaderProps>=({width, height})=> {
  return <Spinner src={`/svgs/loader.svg`} alt="loading" width={width} height={height} />
}