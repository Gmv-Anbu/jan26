import Image from 'next/image'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../Loader'
import { IsImage, validateImage } from '../../../../utils/helper'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { ButtonGradientSecondary } from '../button/button'
import { ModalService } from '@nft-marketplace/modal'

interface IMultipleUploader {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function
  value: { filePath: string; fileType: string }[]
  onDelete: any
  required: boolean
  max?:Number
}

const Container = styled.div`
  display: flex;
  justify-content: space evenly;
  align-items: flex-start;
  height: auto;
  width: auto;
  margin: 20px;
  margin-top: 5rem;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Imagepreviewer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  margin: 0 20px;
  flex-wrap: wrap;
  .img-wrapper {
    margin-right: 20px;
    position: relative;
  }
`

interface IHeading {
  required: boolean
}

const Heading = styled.p<IHeading>`
  text-align: center;
  font-size: 10px;
  /* &:after {
    ${(props) =>
    props.required &&
    `
        content: ' *';
      `}
    color: red;
  } */
`
const ImageContainer = styled.div`
  .upload-box {
    background: #fff;
    border-radius: 8px 0 0 8px;
  }
  #uploadSecondary {
    margin: 0;
    padding: 0;
    position: absolute;
    background: #fff !important;
    color: black !important;
    width: 26px !important;
    height: 26px !important;
    top: -12.5%;
    right: -12%;
    z-index: 2;
    border-radius: 50%;
    min-width: inherit !important;
  }
  margin-bottom: 2rem;

  span {
    position: unset !important;
  }
`
const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  height: 95px;
  width: 95px;
  border-radius: 50%;
  position: relative;
  top: -31px;
  left: -27px;
`
const Ficon = styled.svg`
  position: absolute;
  top: 35%;
  left: 30%;
`
const DropUl = styled.div`
  position: relative;
  top: -65px;
  left: 30px;
`
const DropLi = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #ffffff;
  cursor: pointer;

  margin-bottom: 1.2rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const LabelWrapper = styled.label`
  cursor: pointer;
`

function MultipleImageUploader(props: IMultipleUploader) {
  const { value, onChange, onDelete, required } = props
  const [loader, setLoader] = useState<boolean>(false)

  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
  }

  const showFile = useCallback(
    (file: Blob) => {
      const fileType = file?.type
      const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/webp']
      if (validExtensions.includes(fileType)) {
        setLoader(true)
        onChange(file)
        // const fileReader = new FileReader();
        // fileReader.onload = () => {
        //   const fileURL = fileReader.result;
        // };
      } else if (typeof fileType !== 'undefined') {
        ModalService.open((modalProps: any) => <ErrorModal title="Warning" desc="File format not supported" close={modalProps.close} />)
        // openModal();
      }
    },
    [onChange, loader]
  )

  const fileBrowseHandler = async (event: any) => {
    
    showFile(event.target.files[0])
    
  }

  const fileBrowseHandle = async (event: any) => {
    showFile(event.target.files[0])
  }

  return (
    <Container>
      <LabelWrapper>
  
        <div>
          <span>

            <Image  src={`/svgs/icons/file.svg`} alt="file" width="100" height="60" />
          </span>
          <input type="file" name="myfile" hidden onChange={fileBrowseHandler} />
          <div>
            <Heading required={required}>Add supporting file</Heading>
          </div>
        </div>
      </LabelWrapper>

      <Imagepreviewer
        onLoad={() => {
          setLoader(false)
        }}
      >
        {' '}
        {value?.length
          ? value?.map((obj: any, index: any) => {
              if (obj?.filePath) {
                if (IsImage(obj?.filePath)) {
                  return (
                    <ImageContainer key={index} className="img-wrapper">
                      <ButtonGradientSecondary
                        blockBtn
                        onClick={() => {
                          onDelete(obj?.filePath, index)
                        }}
                        id="uploadSecondary"
                        fs="1.4"
                        size="sm"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                            fill="#172F53"
                          />
                        </svg>
                      </ButtonGradientSecondary>

                      <Image src={validateImage(obj?.filePath)} alt="file" layout="fixed" width="100" height="100" />
                      <input type="file" name="myfile" hidden onChange={fileBrowseHandle} />
                    </ImageContainer>
                  )
                } else {
                  return (
                    <div key={index} className="img-wrapper">
                      <VideoComponent filePath={validateImage(obj?.filePath)} width={100} height={100} controls={false} mute={true} autoPlay={true} />
                    </div>
                  )
                }
                return (
                  <div key={index} className="img-wrapper">
                    <Image src={validateImage(obj?.filePath)} alt="file" layout="fixed" width="100" height="100" />
                  </div>
                )
              }
            })
          : null}
      </Imagepreviewer>
      {loader && <Loader width="100" height="60" />}
      {/* {error && (
        <ErrorModal
          title="Alert"
          desc="Format not supported"
          close={modalProps.close}
        />
      )} */}
    </Container>
  )
}

export default MultipleImageUploader
