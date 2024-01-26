import React, { useEffect, useRef } from 'react'
import Image from "next/image";
import { useCallback,useState} from "react";
import styled from "styled-components";
import Loader from '../Loader';
import { handleApiImage, validateImage } from '../../../../utils/helper';
import ErrorModal from '../../../customer/shared/modal/error';
import { ModalService } from '@nft-marketplace/modal';


interface IMultipleUploader{
    onChange:Function;
    name:string;
    value:any;
    type?:any;
    label?:any;
}

const Container = styled.div`
    height:auto;
    width:auto;
    margin-bottom: 3rem;
    @media screen and (max-width: 575px) {
        margin-bottom: 20px;
    }
`

const Imagepreviewer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items:center;
    height:75px;
    width:auto;
    @media screen and (max-width: 575px) {
        margin-top: 20px;
    }
    .img-wrapper {
        border: 1px solid #E8E8E8;
        border-radius: 3px;
        width: 69px;
        position: relative;
        overflow: hidden;
        margin-right: 11px;
        &.overlay {
            &:before {
                content: '';
                position: absolute;
                background: rgba(0,0,0,0.6);
                z-index: 1;
                height: -webkit-fill-available;
                width: 69px;
            }
        }
        :last-child {
            margin: 0;
        }
        p {
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            color: #FFFFFF;
            position: absolute;
            z-index: 2;
            top: 50%;
            left: 50%;
            width: 45px;
            text-align: center;
            transform: translate(-50%, -50%);
        }
    }
`

const MultiImgUploader = styled.div`
    margin-bottom: 13px;
    label {
        margin: 0 0 5px 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #121212;
        display: inline-block;
    }
    .img-uploader {
        display: flex;
        align-items: center;
        justify-content: center;
        height:auto;
        width:auto;
        padding: 16px 0;
        // border: 2px dashed #D0D0D0;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23D0D0D0FF' stroke-width='4' stroke-dasharray='5%2c 13' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        position: relative;
        label {
            display: block;
            width: 101%;
            height: 100%;
            position: absolute;
        }
        div {
            margin-left: 11px;
        }
        p {
            font-size: 14px;
            font-weight: 700;
            line-height: 16px;    
            color: #272C44;  
            margin-bottom: 5px;      
        }
        span {
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            color: #92949D;
        }
    }
    @media screen and (max-width: 575px) {
        margin-bottom: 0px;
        // .img-uploader {
        //     min-height: 161px;
        // }
    }
`

function SellMultiFileInput(props: IMultipleUploader) {

    const { value, onChange, name, type, label } = props;
    const [loader,setLoader]=useState<boolean>(false)
    const [error,setError]=useState(false)
    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(true)
    const dropArea = useRef<HTMLDivElement>(null)
    const closeModal = () => {
        setShowModal(false)
    }

    const showFile = useCallback((file: Blob) => {
        let fileType = file?.type;
        console.log('fileType', fileType)
        let validExtensions = 
            type === 'pdf' 
                ? ['application/pdf'] 
                : type === 'pdf-image' 
                    ?  ['application/pdf', "image/jpeg", "image/jpg", "image/png"]
                    : ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            setLoader(true)
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let fileURL = fileReader.result;
                onChange(file, name);
            }
            fileReader.readAsDataURL(file);
        } else {
          setError(true)
          openModal()
        }
       
    }, [onChange,loader])
        
    const fileBrowseHandler = async (event: any) => {
        console.log('event.target.files[0]', event.target.files[0])
       showFile(event.target.files[0])
    }

    const imgArr = [
        {filePath: '/images/customer/dashboard/watch-4.png'},
        {filePath: '/images/customer/dashboard/watch-4.png'},
        {filePath: '/images/customer/dashboard/watch-4.png'},
        {filePath: '/images/customer/dashboard/watch-4.png'},
        {filePath: '/images/customer/dashboard/watch-4.png'},
        {filePath: '/images/customer/dashboard/watch-4.png'},
        {filePath: '/images/customer/dashboard/watch-4.png'},
    ]

    useEffect(() => {
        setLoader(false)
    },[value])

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
          if(type === 'pdf' || type === 'pdf-image'  && event.dataTransfer.files.length && event.dataTransfer.files[0].type === 'application/pdf') {
            setLoader(true)
            onChange(event.dataTransfer.files[0], name)
          } else if ((event.dataTransfer.files.length && event.dataTransfer.files[0].type === 'image/jpeg') || event.dataTransfer.files[0].type === 'image/jpg' || event.dataTransfer.files[0].type === 'image/png') {
            setLoader(true)
            onChange(event.dataTransfer.files[0], name)
          } else {
            ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={`Only supports image files with ${type === 'pdf' || type === 'pdf-image' ? 'pdf,' : ''} jpeg, png or jpg`} />)
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
        <Container className='multi-upload-wrapper'>
            <MultiImgUploader>
                <label>{label || 'Support Images'}</label>
                <div ref={dropArea} className='img-uploader'>
                    {loader 
                    ? <Loader width="40" height="40"/> 
                    : <>
                    <label className="label" htmlFor={name || 'file'}></label>
                    <input id={name || 'file'} hidden type="file" accept="image/*" name={name || 'file'} onChange={fileBrowseHandler} />
                    <Image src={`/svgs/sell-img-upload.svg`} alt="Back" width="40" height="40" />
                    <div>
                        <p>Upload {type === 'pdf' ? 'PDF' : type === 'pdf-image' ? 'PDF/Photos' : 'Photos'}</p>
                        {type === 'pdf' ? '' : <span>Or drag and drop</span>}
                        
                    </div>
                    </>}
                </div>
            </MultiImgUploader>
                {value?.length 
                ? <Imagepreviewer className='previewer' onLoad={()=>{setLoader(false)}}>
                    {value?.map((el: any, index: any) => {
                        let extra = value?.length - 4
                        if(type === 'pdf-image') {
                            return <a href={handleApiImage(el?.key)} target="_blank">{index+1}.{handleApiImage(el?.key)}</a>
                        } else if(el && index < 4 && el?.fileType !== 'application/pdf') {
                            return <div className={`img-wrapper ${extra && index === 3 ? 'overlay' : ''}`}>
                                <Image key={index} src={validateImage(el?.key || el)} alt='file' layout='fixed' width="69" height="75"  />
                                {extra && index === 3 ? <p>+{extra} More <br></br> Photo{extra != 1 ? 's' : ''}</p> : null}
                            </div>
                        } 
                        // else {
                        //     return <a href={handleApiImage(el?.key)} target="_blank">{index+1}.{handleApiImage(el?.key)}</a>
                        // }
                    })}
                </Imagepreviewer>
                : null}
            {error &&  <ErrorModal show={showModal} msg={type === 'pdf-image' ? 'Only pdf, jpeg, png or jpg file accepted' : type === 'pdf' ? 'Only pdf file accepted' :"This is not an Image File!"} closeModal={closeModal}/>}
        </Container>
    )
}

export default SellMultiFileInput