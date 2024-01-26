import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Loader from '../Loader'
import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'
import { ModalService } from '@nft-marketplace/modal'

const UploadArtworkContainer = styled.div`
  background: ${({ theme }) => theme.colors.uploadArtworkBg};
  border-radius: 1.2rem;
  padding: 2.2rem;
  width: 100%;
  height: 25rem;
  /* max-width: 55rem; */
  /* &.md {
    height: 50rem;
    max-width: 40rem;
}
&.sm {
    height: 30rem;
    max-width: 30rem;
} */
  &.no-background {
    padding: 0rem;
    margin-bottom: 3rem;
    background: none;
    .label {
      border: 1px solid ${({ theme }) => theme.colors.borderprimary};
      border-radius: 1.3rem;
    }
  }
  @media screen and (max-width: 540px) {
    background: transparent;
    padding: 0rem;
    height: 30rem;
  }
`
const UploadArtworkInput = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.uploadArtColor};
  box-sizing: border-box;
  border-radius: 1.3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
  }
`
const DefaultImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: grab;
  padding: 2rem 0;
  p {
    margin: 0;
    margin-top: 1rem;
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-size: 2rem;
    font-weight: 400;
    line-height: 3rem;
    color: ${({ theme }) => theme.colors.fontdark};
    span {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 3rem;
    }
  }
`
const InputLabel = styled.label`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
  color: ${({ theme }) => theme.colors.artWorkText};
`
const ImagePreview = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 20rem;
  border-radius: 1.3rem;
`

const ArtworkInputFile = ({
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
    <UploadArtworkContainer className={`${size} ${noBG ? 'no-background' : ''}`}>
      <InputLabel>{label}</InputLabel>
      <UploadArtworkInput ref={dropArea} className={value ? 'image-preview' : ''}>
        {value ? (
          <ImagePreview style={{ backgroundImage: `url(${value})` }} onLoad={endLoader} />
        ) : (
          <DefaultImg>
            {spinloader ? (
              <Loader width="100" height="60"/>
            ) : (
              <>
                <Image src={`/svgs/UploadImgBg.svg`} alt="Back" width="130" height="80" />
                <p>
                  {!noBG && 'Drop your Art here or '}
                </p>
                <>
                  <p>Drop your Image here or Browse</p>
                  <p>Supported formats are .png, .jpg, .jpeg</p>
                </>
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

export default ArtworkInputFile
