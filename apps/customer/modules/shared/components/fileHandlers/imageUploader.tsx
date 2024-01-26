import Image from 'next/image';
import React,{useRef,useState,useEffect} from 'react'
import { ButtonGradientPrimary } from '../button/button';
import { HiddenUploadInput, ImagePreview, UploadButton, UploadWrapper } from './imageUploader.style'
type AppProps = {
    onFileUpload: Function;
};
export default function ImageUploader({onFileUpload}:AppProps) {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any>(null);
    const handleClick = () => {
        if (null !== hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    }
    useEffect(() => {
        onFileUpload(file);
    }, [file,onFileUpload])
    
    const handleFileUpload = (e:any):void=>{
        const fileUploaded = e.target.files[0];
        setFile(fileUploaded);
    }
    return (
        <UploadWrapper>
            <ImagePreview>
            <Image src={file&& URL.createObjectURL(file)||'/images/customer/logo.png'} width="100%" height="100%"   />
            </ImagePreview>
            <HiddenUploadInput type="file" onChange={handleFileUpload} ref={hiddenFileInput} />
            <ButtonGradientPrimary blockBtn onClick={handleClick} id="upload" fs="1.4" size="sm">Upload</ButtonGradientPrimary>
        </UploadWrapper>
    )
}
