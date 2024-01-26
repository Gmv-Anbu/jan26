import React from 'react'

import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 34px;
  height: 34px;
  margin-right 1rem;
  border-radius: 50%;
`
const OverLay = styled.div`
  background: rgba(225, 255, 255, 0.7);
  // background:  rgba(0,0,0,0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Typography = styled.p`
  font-size: 2rem;
`

function OverlayLoader() {
  return (
    <div>
      <OverLay>
        <Spinner />
        <Typography>Loading Please wait. Do not refresh or go back</Typography>
      </OverLay>
    </div>
  )
}

export default OverlayLoader
