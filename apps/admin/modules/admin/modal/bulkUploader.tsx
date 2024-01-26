import moment from 'moment'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../shared/components/Loader'
import API from '../../../api/admin/index'
import { handleApiImage } from '@apps/admin/utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import ErrorModal from '../shared/modal/error'
import SuccessModal from '../shared/modal/success'

interface ErrorMessageProps{
  show:boolean
}
const ErrorMessage = styled.div<ErrorMessageProps>`
  color: ${({ theme }) => theme.colors.danger};
  padding: 5px 0;
  visibility: ${({ show }) => (show)?'show':'hidden' };
  height:1rem;
`;
interface IButton1 {
    disabledStatus?: boolean
  }
  
  const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  `
  const ModalContainer = styled.div`
    width: 348px;
    height: auto;
    background: #ffffff;
    border-radius: 6px;
    padding: 4.3rem 3.8rem;
    input{
        font-size:14px;
        
    }
  `
  const Errormsg = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    color: #a81717;
    font-size: 1.4rem;
    visibility: visible;
    padding-left: 3px;
    padding-top: 1rem;
  `
  
  const FilterHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    line-height: 1.19rem;
    color: #172f53;
    // margin-bottom: 3rem;
    h3 {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
  
      color: #172f53;
    }
    svg {
      cursor: pointer;
    }
  `
  
  const ButtonComponent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `
  
  const Button1 = styled.button<IButton1>`
    height: auto;
    width: 100px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    background: #ffffff;
    color: #23487b;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #bac6d9;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  `
  const Button2 = styled.button`
    padding: 10px;
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    border-radius: 6px;
    width: 154px;
    height: auto;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  `
  const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  
    margin-top: 10px;
  `
  const DropdownDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  
    margin-top: 10px;
  `
  const DHead = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #323232;
    margin-top: 25px;
    margin-bottom: 10px;
    line-height: 21px;
  `
  
  const DHead2 = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #323232;
    margin-top: 25px;
    line-height: 21px;
  `
  const DateL = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #323232;
    margin-top: 25px;
    margin-bottom: 10px;
    line-height: 21px;
  `
  const Select = styled.select`
    /* width: 100%;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #bac6d9;
  border-radius: 6px; */
  
    width: 100%;
    padding: 10px;
    font-size: 16px;
    line-height: 1;
    border: 1px solid #bac6d9;
    border-radius: 5px;
    background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right;
    -webkit-appearance: none;
    background-position-x: 94%;
    background-size: 10px;
  `
  
  const SelectD = styled.input`
    width: 100%;
    padding: 10px;
    background: #ffffff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
  `
  const Option = styled.option`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #3c3c3c;
    width: 250px;
  `
  
  const ExcelDownloadWrapper = styled.div`
    cursor: pointer;
  `
  
  const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid #e3e3e3;
    margin: 3rem 0;
  `
  
  const UrlViewer = styled.input`
    width: 100%;
    border: 1px solid #e3e3e3;
    height: 4rem;
    background: #ccc;
    width: 100%;
    border: 1px solid #e3e3e3;
    margin: 1rem 0;
  `
  

const BulkUploadModel = ({ setOpenModal }) => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')

 

  const handleFileUpload = async (e:any) => {
    setFile(null)
    setFileError('')
    if (e?.target.files?.[0]) {
      // const file = await handleExcelFileUpload(e?.target.file[0]);
        // const file = await handleExcelFileUpload(e?.target.file[0]);
        const name = e?.target.files?.[0].name;
        if (name.substring(name.lastIndexOf('.') + 1, name.length) !== 'csv') {
          setFileError('Supported file format is csv.')
          e.preventDefault()
          return false
        }       
        setFile(e?.target.files?.[0])
    }
  }

  const createBulkAsset = (file: any) => {
    if(!file){
      setFileError('Please choose a file.')
      return false
    }
    setLoading(true);
    
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    const payload = new FormData()
    payload.append('file', file)
    API.addAssetBulk(payload)
      .then((res) => {
        if (res?.data !== null && res?.status === 200) {
          ModalService.close(fullLoader)
          ModalService.open((modalProps: any) => <SuccessModal title="Success" desc={`${res?.data?.message}`} close={modalProps.close} />)
          setOpenModal(false)
          // setAPIError(null)
          // openModal()
        } else if (res?.error?.error) {
          ModalService.close(fullLoader)
          ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
          setOpenModal(false)
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        setOpenModal(false)
        console.log(err)
      })
  } 

  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader
            onClick={() => {
              setOpenModal(false)
            }}
          >
            <h3>Bulk Upload</h3>
            <span onClick={() => setOpenModal(false)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                  fill="#172F53"
                />
              </svg>
            </span>
          </FilterHeader>
          <DHead>Select csv file</DHead>
            <input type="file" onChange={(e) => handleFileUpload(e)} />       
          <ErrorMessage show={!!fileError} >{fileError}</ErrorMessage>
          {/* <DHead>Download sample file.</DHead>
          {/* <ExcelDownloadWrapper>
            <a href="/samples/bulku.xlsx" target="_blank">
              <Image src="/images/admin/execel.jpg" alt="info" width="28" height="28" />
            </a>
          </ExcelDownloadWrapper> */} 
          <div></div>
          <Line></Line>
          <ButtonComponent>
            {/* <Button1
              onClick={() => {
                setValidationError(null)
                onResetFilter({ from: null, to: null, saleType: null })
                setTo('')
                setFrom('')
                setRole('')
                setShowError(false)
              }}
              disabled={!saleType && !to && !from ? true : false}
              disabledStatus={!saleType && !to && !from ? true : false}
            >
              Reset
            </Button1> */}
            <Button2 disabled={loading || !!fileError} onClick={() => createBulkAsset(file)}>
              {loading ? (
                <>
                  Loading... <Loader height="20" width="20" />
                </>
              ) : (
                'Upload'
              )}
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default BulkUploadModel
