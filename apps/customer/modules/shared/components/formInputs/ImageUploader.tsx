import React, { useRef, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { ButtonGradientPrimary } from '../button/button'
import Loader from '../Loader'
import { ModalService } from '@nft-marketplace/modal'
import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { IsImage } from '@apps/customer/utils/helper'
import { AudioComponent } from '@nft-marketplace/AudioComponent'

const UploadArtworkContainer = styled.div`
  // background: ${({ theme }) => theme.colors.uploadArtworkBg};
  border-radius: 1.2rem;
  padding: 2.2rem;
  height: 70rem;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  @media screen and (max-width: 540px) {
    background: transparent;
    padding: 0rem;
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
  }
  &.image-preview {
    border: none;
    overflow: hidden;
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
  text-align: center;
  p {
    margin: 0;
    margin-top: 3rem;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 2rem;
    font-weight: 400;
    line-height: 3rem;
    color: ${({ theme }) => theme.colors.fontdark};
    span {
      font-size: 2rem;
      font-weight: 600;
      line-height: 3rem;
    }
  }
`
const InputLabel = styled.label`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
  color: ${({ theme }) => theme.colors.fontprimary};
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
  const { label, value, onChange, loader, onDelete, mainAssetType, isEdit } = props
  const [isImageFlag, setIsImageFlag] = useState(isEdit)
  const dropArea = useRef<HTMLDivElement>(null)
  const showFile = useCallback(
    (file: File) => {
      let fileType = file.type //getting selected file type
      const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'audio/mp3', 'audio/mpeg'] //adding some valid image extensions in array
      if (validExtensions.includes(fileType)) {
        //if user selected file is an image file
        //if user selected file is an image file
        setIsImageFlag(IsImage(file.name))
        let fileReader = new FileReader() //creating new FileReader object
        fileReader.onload = () => {
          let fileURL = fileReader.result //passing user file source in fileURL variable
          onChange(fileURL, file)
        }
        fileReader.readAsDataURL(file)
      } else {
        ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={'Format not supported'} close={modalProps.close} />)
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
    <UploadArtworkContainer>
      <InputLabel>{label}</InputLabel>
      <UploadArtworkInput className={value ? 'image-preview' : ''} ref={dropArea}>
        {value ? (
          isImageFlag === true && mainAssetType == 'images' ? (
            <Image placeholder="blur" src={value} alt="image-data" blurDataURL={value} width="1080" height="1080" objectFit="contain" />
          ) : mainAssetType == 'video' ? (
            <VideoComponent filePath={value} mute={false} autoPlay={false} width={428} height={500} controls={true} />
          ) : (
            <AudioComponent filePath={value} mute={false} autoPlay={false} controls={true} width={428} height={500} imgSrc="/svgs/audio-white.svg" containerWidth="60" />
          )
        ) : (
          <DefaultImg>
            {!loader && (
              <span className="img-fileupload-wrp">
                <Image src={`/svgs/Image-uploader-bg.svg`} alt="Back" width="100" height="100 " objectFit="contain" />
              </span>
            )}

            {!loader && (
              <>
                <p>
                  Drop your Image here or <span>Browse</span>
                </p>
                <p>Supported formats are .png, .jpg, .jpeg, .gif, .mp4, .mp3</p>
              </>
            )}
          </DefaultImg>
        )}
        {loader && <Loader width="100" height="60" />}
        <label htmlFor="file" style={{display: value ? "none" :""}}></label>
        <input id="file" type="file" name="file" value="" onChange={fileBrowseHandler} disabled={isEdit} />
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
          disabled={isEdit}
        >
          Delete
        </ButtonGradientPrimary>
      )}
    </UploadArtworkContainer>
  )
}

export default ImageUploader
