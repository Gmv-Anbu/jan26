import React, { useRef } from 'react'
import Image from "next/image";
import { useCallback,useState} from "react";
import styled from "styled-components";
import Loader from '../Loader';
import { validateImage } from '../../../../utils/helper';
import ErrorModal from '../../../customer/shared/modal/error';


interface IMultipleUploader{
    onChange:Function;
    value:{filePath:string,fileType:string}[];
}

const Container = styled.div`
display: flex;
justify-content:space evenly;
align-items:center;
height:auto;
width:auto;
margin:20px;
`

const Imagepreviewer = styled.div`
display: flex;
justify-content:space-between;
align-items:center;
height:60px;
width:auto;
margin:20px;
    .img-wrapper {
        margin-right: 20px;
    }
`
const Heading = styled.div`
display: flex;
justify-content:center;
align-items:center;
font-size:10px;
`

function MultipleImageUploader(props: IMultipleUploader) {

    const { value, onChange} = props;
    const [loader,setLoader]=useState<boolean>(false)
    const [error,setError]=useState(false)
    const [showModal, setShowModal] = useState(false)
    const multiFileUpload = useRef(null);
    const openModal = () => setShowModal(true)
    const closeModal = () => {
        setShowModal(false)
    }
    const showFile = useCallback((file: Blob) => {
    
        let fileType = file.type;

        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            setLoader(true)
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let fileURL = fileReader.result;
                onChange(file);
            }
            fileReader.readAsDataURL(file);
        } else {
          setError(true)
          openModal()
          multiFileUpload.current.value=""
        }
       
    }, [onChange,loader])



       
        
    const fileBrowseHandler = async (event: any) => {
        
       showFile(event.target.files[0])
    }

        return (
        <Container>
        <label>
            <div style={value?.length < 3?{margin:10,cursor:"pointer"}:{margin:10,cursor:"no-drop"}}>
            <Image src={`/svgs/icons/file.svg`} alt='file' width="100" height="60" />
            <input type="file" name="myfile" ref={multiFileUpload} hidden onChange={fileBrowseHandler} disabled={value?.length < 3? false : true}/>
            <Heading>
           Add NFT
           </Heading>
            </div>
        </label>
       <Imagepreviewer onLoad={()=>{setLoader(false)}}>
        {value?.length 
        ? value?.map((obj: any, index: any) => {
            if(obj?.filePath) {
                return <div className='img-wrapper'>
                    <Image key={index} src={validateImage(obj?.filePath)} alt='file' layout='fixed' width="100" height="100"  />
                </div>
            }
        })
        : null}
       </Imagepreviewer>
       {loader && <Loader width="100" height="60"/>}
       {
        error &&  <ErrorModal show={showModal} msg={"This is not an Image File!"} closeModal={closeModal}/>
       }
    </Container>
        
        
    )
}

export default MultipleImageUploader