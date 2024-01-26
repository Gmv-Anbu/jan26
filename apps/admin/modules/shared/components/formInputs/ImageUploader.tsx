import React, { useRef, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { ButtonGradientPrimary } from '../button/button'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { AudioComponent } from '@nft-marketplace/AudioComponent'
import { IsImage } from '@apps/admin/utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { APP_ENV } from '@apps/admin/config'

const UploadArtworkContainer = styled.div`
  // background: #fff;
  // border-radius: 1.2rem;
  padding: 2rem;
  height: 70rem;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  &.thumbnail {
    height: 45rem;
  }
  @media screen and (max-width: 1100px) {
    padding: 0rem;
  }
  @media screen and (max-width: 540px) {
    background: transparent;
    height: 50rem;
  }
`
const UploadArtworkInput = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.uploadArtColor};
  box-sizing: border-box;
  border-radius: 1.3rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &.active {
    border: ${({ theme }) => `2px solid ${theme.colors.borderprimary}`};
  }
  input {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: transparent;
    color: transparent;
    visibility: hidden;
  }
  label {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
  &.image-preview {
    border: none;
    overflow: hidden;

    span {
      background: #122379 !important;
      border-radius: 10px;
      width: 414px !important;
      height: 515px !important;
    }
  }
  @media screen and (max-width: 540px) {
    height: 46rem;
  }
`
const DefaultImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 94%;
  width: 94%;
  background: #fafafa;
  border-radius: 4px;
  p {
    margin: 0;
    margin-top: 5px;
    font-family: Inter;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 3rem;
    color: #343a40;
    span {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 3rem;
    }
  }
  .img-fileupload-wrp {
    background: #e6eefb;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px !important;
      height: 22px !important;
    }
  }
`

interface IInputLabel {
  required: boolean
}

const InputLabel = styled.label<IInputLabel>`
  font-family: Inter;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
  color: ${({ theme }) => theme.colors.fontprimary};
  &:after {
    ${(props) =>
      props.required &&
      `
        content: ' *';
      `}
    color: red;
  }
`
const ImagePreview = styled.img`
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  border-radius: 1.3rem;
`
const ImageUploader = (props: any) => {
  const { className, label, value, onChange, onDelete, loader, required, mainAssetType, disabled, supImgText, onlyImg } = props
  // const [load, setLoad] = useState(false);

  const [flag, setFlag] = useState(false)
  let fileTypeArr1 = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'audio/mp3', 'audio/mpeg'] //adding some valid image extensions in array
  let fileTypeArr2 = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const dropArea = useRef<HTMLDivElement>(null)
  const showFile = useCallback(
    (file: File) => {
      const fileType = file.type //getting selected file type
      const validExtensions = onlyImg ? fileTypeArr2 : fileTypeArr1
      console.log('fileType', fileType)
      if (validExtensions.includes(fileType)) {
        //if user selected file is an image file
        setFlag(IsImage(file.name))
        const fileReader = new FileReader() //creating new FileReader object
        fileReader.onload = () => {
          const fileURL = fileReader.result //passing user file source in fileURL variable
          onChange(fileURL, file)
        }
        fileReader.readAsDataURL(file)
      } else {
        ModalService.open((modalProps: any) => <ErrorModal title="Warning" desc="File format not supported" close={modalProps.close} />)
        if (null !== dropArea.current) dropArea.current.classList.remove('active')
      }
    },
    [onChange]
  )
  const fileBrowseHandler = (e: any) => {
    showFile(e.target.files[0])
  }

  useEffect(() => {
    if (null !== dropArea.current) {
      const dropAreaElement = dropArea.current
      //If user Drag File Over DropArea
      const draqoverListener = (event: any) => {
        event.preventDefault() //preventing from default behaviour
        if (null !== dropAreaElement) dropAreaElement.classList.add('active')
        // dragText.textContent = "Release to Upload File";
      }
      dropAreaElement.addEventListener('dragover', draqoverListener)
      //If user leave dragged File from DropArea
      const dragLeaveListener = () => {
        if (null !== dropAreaElement) dropAreaElement.classList.remove('active')
        // dragText.textContent = "Drag & Drop to Upload File";
      }
      dropAreaElement.addEventListener('dragleave', dragLeaveListener)
      //If user drop File on DropArea
      const dropListener = (event: any) => {
        event.preventDefault() //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        showFile(event.dataTransfer.files[0]) //calling function
      }
      dropAreaElement.addEventListener('drop', dropListener)
      return () => {
        dropAreaElement?.removeEventListener('dragover', draqoverListener)
        dropAreaElement?.removeEventListener('dragleave', dragLeaveListener)
        dropAreaElement?.removeEventListener('drop', dropListener)
      }
    }
  }, [showFile])

  return (
    <UploadArtworkContainer className={className || ''}>
      <InputLabel required={required}>{label}</InputLabel>
      <UploadArtworkInput className={value ? 'image-preview' : ''} ref={dropArea}>
        {value ? (
          flag === true || mainAssetType == 'images' ? (
            <Image placeholder="blur" src={value} alt="image-data" blurDataURL={value} width="1080" height="1080" objectFit="contain" />
          ) : mainAssetType == 'video' ? (
            <VideoComponent filePath={value} mute={false} autoPlay={false} width={428} height={500} controls={true} />
          ) : (
            <AudioComponent filePath={value} mute={false} autoPlay={false} width={428} height={500} controls={true} padding="122" />
          )
        ) : (
          <DefaultImg>
            {!loader && (
              <span className="img-fileupload-wrp">
                <Image src={`/svgs/img-filedrop.svg`} alt="Back" width="100" height="100 " objectFit="cover" />
              </span>
            )}

            {!loader && (
              <>
                <p>
                  Drop your Image here or <span>Browse</span>
                </p>
                <p>{supImgText || 'Supported formats are .png, .jpg, .jpeg, .webp'} </p>
              </>
            )}
          </DefaultImg>
        )}
        <label htmlFor="file" style={{display: value ? "none" :""}}></label>
        <input id="file" type="file" name="file" value="" onChange={fileBrowseHandler} disabled={loader ? true : false} />
      </UploadArtworkInput>
      {value && (
        <ButtonGradientPrimary
          blockBtn
          onClick={() => {
            onDelete(value)
          }}
          id="upload"
          fs="1.4"
          size="sm"
          disabled={disabled}
        >
          {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z" fill="#172F53" />
          </svg> */}
          Delete
        </ButtonGradientPrimary>
      )}
    </UploadArtworkContainer>
  )
}

export default ImageUploader
