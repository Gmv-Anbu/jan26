/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components'
import Modal from './custom-modal'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ZoomSlider from './slider'
import { useState } from 'react'
import { handleApiImage } from '@apps/customer/utils/helper'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  overflow-y: scroll;
  padding: 10px 0;
  @media (max-width: 700px) {
    margin: 0rem;
  }
`
const CardButton = styled.button`
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  min-width: 126px;
  min-height: 40px;
  background: #ffffff;
  border: 1px solid #21393a;
  cursor: pointer;
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140.02%;
    color: #21393a;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    font-weight: 500;
    font-style: normal;
    font-weight: 600;
    font-size: 1.75rem;
  }
`
const HeadingBox = styled.div`
  width: 100%;
  padding: 2.1rem 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #dfebeb;
  h2 {
    min-width: 226px;
  }
  @media (max-width: 767px) {
    h2 {
      min-width: 26px;
    }
    padding: 2.1rem;
    gap: 20px;
  }
  @media (max-width: 424px) {
    h2 {
      min-width: 0px;
    }
  }
`
const NavBox = styled.div`
  min-width: 100px;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    span {
      color: #848a8b;
    }
  }
  .arrow-right,
  .arrow-left {
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    opacity: 1;
    :hover {
      opacity: 0.8;
    }
  }
  .arrow-right {
    margin-bottom: 0.4rem;
    transform: rotate(180deg);
  }
`
const ImageBox = styled.div`
  max-width: 1000px;
  max-height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid #d1e0e2;
  background-color: #fff;
  margin: 6rem 0 1rem 0;
  .classAnim1 {
    animation: imageAnimation1 0.3s ease-in;
  }
  .classAnim2 {
    animation: imageAnimation2 0.3s ease-in;
  }
  img {
    object-fit: cover;
    width:100%;
  }
  @keyframes imageAnimation1 {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }
  @keyframes imageAnimation2 {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }

`

const ControlsBox = styled.div`
  max-width: 89.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  .controls {
    padding: 0 2rem;
    font-weight: 400;
    border: none;
    background-color: transparent;
    font-size: 4rem;
    color: #595959;
    cursor: pointer;
  }
`

const ImageZOom = ({ onClose, image, title, currentImg, totalImgs }) => {
  const [value, setValue] = useState(0)
  const [imageSrc, setImageSrc] = useState(image)
  const [currentImgIndx, setCurrentImgIndx] = useState(currentImg)
  const [animationClass, setAnimationClass] = useState('')

  const rightImagesHandler = (action) => {
    if (action + currentImgIndx < totalImgs?.length) {
      setImageSrc(totalImgs[action + currentImgIndx]?.filePath)
      setCurrentImgIndx(action + currentImgIndx)
      setAnimationClass('classAnim1')
    }
    setTimeout(() => setAnimationClass(''), 500)
  }
  const leftImagesHandler = (action) => {
    if (action + currentImgIndx >= 0) {
      setImageSrc(totalImgs[action + currentImgIndx]?.filePath)
      setCurrentImgIndx(action + currentImgIndx)
      setAnimationClass('classAnim2')
    }
    setTimeout(() => setAnimationClass(''), 500)
  }
  return (
    <Modal closePopUp={onClose}>
      <MainContainer>
        <HeadingBox>
          <h2></h2>
          <NavBox>
            {totalImgs?.length > 1 && (
              <div className="arrow-left" onClick={() => leftImagesHandler(-1)}>
                <svg width={'8'} height={'15'} viewBox="0 0 3 6" fill="#444444" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.45563 3.20108L4.00391 0.711238L3.27597 6.21784e-08L-0.00024147 3.20108L3.27597 6.40215L4.00391 5.69091L1.45563 3.20108Z" fill="#444444" />
                </svg>
              </div>
            )}
            <p>
              <span>{currentImgIndx + 1} of</span> {totalImgs?.length}
            </p>
            {totalImgs?.length > 1 && (
              <div className="arrow-right" onClick={() => rightImagesHandler(1)}>
                <svg width={'8'} height={'15'} viewBox="0 0 3 6" fill="#444444" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.45563 3.20108L4.00391 0.711238L3.27597 6.21784e-08L-0.00024147 3.20108L3.27597 6.40215L4.00391 5.69091L1.45563 3.20108Z" fill="#444444" />
                </svg>
              </div>
            )}
          </NavBox>
          <CardButton onClick={onClose}>
            <p>Close</p>
          </CardButton>
        </HeadingBox>
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
            const handleChange = (val) => {
              if (val == 0) {
                resetTransform()
              } else if (value > val) {
                zoomOut()
              } else if (value < val) {
                zoomIn()
              }
              setValue(val)
            }

            return (
              <>
                {' '}
                <ImageBox onClick={(e) => e.stopPropagation()}>
                  <TransformComponent>
                    <img className={animationClass || ''} src={imageSrc ? handleApiImage(imageSrc) : ''} alt={'ICO'} />
                  </TransformComponent>
                </ImageBox>
                <ControlsBox>
                  <button
                    onClick={() => {
                      if (value <= 0) {
                        return
                      }
                      setValue(value - 1)
                      zoomOut()
                    }}
                    className="controls"
                  >
                    -
                  </button>
                  <ZoomSlider value={value} onSetValue={handleChange} />
                  <button
                    onClick={() => {
                      if (value >= 4) {
                        return
                      }
                      setValue(value + 1)
                      zoomIn()
                    }}
                    className="controls"
                  >
                    +
                  </button>
                </ControlsBox>
              </>
            )
          }}
        </TransformWrapper>
      </MainContainer>
    </Modal>
  )
}

export default ImageZOom
