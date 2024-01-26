import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {Loader} from '@apps/admin/modules/shared/components/Loader'
import { handleApiImage } from '@apps/admin/utils/helper'

const UploadArtworkContainer = styled.div`
  background: ${({ theme }) => theme.colors.uploadArtworkBg};
  border-radius: 1.2rem;
  padding: 2.2rem;
  height: 70rem;
  width: 100%;
  .info {
    font-size: 12px;
  }
  &.md {
    height: 50rem;
    max-width: 40rem;
  }
  &.sm {
    height: 185px;
    // max-width: 30rem;
  }
  &.no-background {
    padding: 0rem;
    margin-bottom: 3rem;
    background: none;
    .label {
      border: 1px dashed ${({ theme }) => theme.colors.borderprimary};
      border-radius: 1.3rem;
      cursor: pointer;
    }
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
  height: calc(100% - 3.8rem);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .img-fileupload-wrp {
    background: #e6eefb;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    img {
      width: 30px !important;
      height: 22px !important;
    }
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
  }
`
const DefaultImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
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
`

interface IInputLabel {
  required: boolean
}

const InputLabel = styled.label<IInputLabel>`
  font-family: Poppins;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
  color: ${({ theme }) => theme.colors.artWorkText};
  &:after {
    ${(props) =>
      props.required &&
      `
        content: ' *';
      `}
    color: red;
  }
`
const ImagePreview = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  border-radius: 1.3rem;
`

const ArtworkInputFile = ({
  label,
  value,
  size,
  noBG,
  error,
  info,
  name,
  ref,
  onChange,
  spinloader,
  endLoader,
  required,
  disabled
}: {
  label: string
  value: string
  size?: string
  error?: string
  info?: string
  name?: string
  noBG?: boolean
  ref?: any
  onChange: (e: any) => void
  spinloader?: boolean
  endLoader: () => void
  required: boolean
  disabled: boolean
}) => {
  return (
    <UploadArtworkContainer ref={ref} className={`${size} ${noBG ? 'no-background' : ''}`}>
      <InputLabel required={required}>{label}</InputLabel>
      <UploadArtworkInput className={value ? 'image-preview' : ''}>
        {value && !spinloader ? (
          <ImagePreview style={{ backgroundImage: `url(${handleApiImage(value)})` }} onLoad={endLoader} />
        ) : (
          <DefaultImg>
            {spinloader ? (
              <Loader width="100" height="60"/>
            ) : (
              <>
                <span className="img-fileupload-wrp">
                  <Image src={`/svgs/img-filedrop.svg`} alt="Back" width="100" height="60" />
                </span>
                <p>
                  {!noBG && 'Drop your Art here or '}
                  <span>Browse</span><br></br>
                </p>
                <p>Supported formats are .png, .jpg, .jpeg, .webp</p>
              </>
            )}
          </DefaultImg>
        )}
        <label className="label" htmlFor={name || 'file'}></label>
        <input id={name || 'file'} type="file" name={name || 'file'} onChange={onChange} disabled={disabled || false} />
      </UploadArtworkInput>
      {error ? <p className="error">{error}</p> : null}
      {info ? <p className="info">Info: {info}</p> : null}
    </UploadArtworkContainer>
  )
}

export default ArtworkInputFile
