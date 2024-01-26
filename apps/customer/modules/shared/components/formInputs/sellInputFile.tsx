import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Loader from '../Loader'
import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'
import { ModalService } from '@nft-marketplace/modal'

const UploadArtworkContainer = styled.div`
  border-radius: 1.2rem;
  width: 310px;
  margin-bottom: 3rem;
  @media screen and (max-width: 575px) {
    width: 100%;
    min-width: 292px;
    margin-bottom: 20px;
  }
`
const UploadArtworkInput = styled.div`
  // border: 2px dashed #D0D0D0;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23D0D0D0FF' stroke-width='4' stroke-dasharray='5%2c 13' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 0rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 160px;
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
    width: 101%;
    height: 100%;
    position: absolute;
  }

  &.image-preview {
    border: none;
  }
`
const DefaultImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: grab;
  padding: 28px;
  p {
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: -0.23999999463558197px;
    color: #272C44;
    margin: 12px 0 5px;
  }
  span {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: -0.23999999463558197px;  
    color: #92949D;  
  }
`
const InputLabel = styled.label`
    margin: 0 0 5px 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    color: #121212;
    display: inline-block;
`
const ImagePreview = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 161px;
  border-radius: 1.3rem;
`

const SellInputFile = ({
  label,
  value,
  size,
  noBG,
  error,
  name,
  onChange,
  spinloader,
  endLoader,
}: {
  label: string
  value: string
  size?: string
  error?: string
  name?: string
  noBG?: boolean
  onChange: (e: any) => void
  spinloader?: boolean
  endLoader: () => void
}) => {
  const dropArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (null !== dropArea.current) {
      const dropAreaElement = dropArea.current
      //If user Drag File Over DropArea
      const dragoverListener = (event: any) => {
        event.preventDefault() //preventing from default behaviour
        if (null !== dropAreaElement) dropAreaElement.classList.add('active')
        // dragText.textContent = "Release to Upload File";
      }
      dropAreaElement.addEventListener('dragover', dragoverListener)
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
        // const data = { target: event.dataTransfer, length: 1 }
        if ((event.dataTransfer.files.length && event.dataTransfer.files[0].type === 'image/jpeg') || event.dataTransfer.files[0].type === 'image/jpg' || event.dataTransfer.files[0].type === 'image/png') {
          onChange({ target: { files: event.dataTransfer.files, name: name, value: value } }) //calling function
        } else {
          ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc="Only supports image files with jpeg, png or jpg" />)
        }
      }
      dropAreaElement.addEventListener('drop', dropListener)
      return () => {
        dropAreaElement?.removeEventListener('dragover', dragoverListener)
        dropAreaElement?.removeEventListener('dragleave', dragLeaveListener)
        dropAreaElement?.removeEventListener('drop', dropListener)
      }
    }
  }, [onChange])
  return (
    <UploadArtworkContainer className={`${size}`}>
      <InputLabel>{label}</InputLabel>
      <UploadArtworkInput ref={dropArea} className={value ? 'image-preview' : ''}>
        {value 
        ? <ImagePreview style={{ backgroundImage: `url(${value})` }} onLoad={endLoader} /> 
        : (
          <DefaultImg>
            {spinloader ? (
              <Loader width="100" height="60"/>
            ) : (
              <>
                <Image src={`/svgs/sell-img-upload.svg`} alt="Back" width="56" height="56" />
                <p>Upload Photos</p>
                <span>Or drag and drop</span>
                {/* <p>Supported formats are .png, .jpg, .jpeg</p> */}
              </>
            )}
          </DefaultImg>
        )}
        <label className="label" htmlFor={name || 'file'}></label>
        <input id={name || 'file'} type="file" accept="image/*" name={name || 'file'} onChange={onChange} />
      </UploadArtworkInput>
      {error ? <p className="error">{error}</p> : null}
    </UploadArtworkContainer>
  )
}

export default SellInputFile
