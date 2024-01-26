import { IsImage } from '@apps/admin/utils/helper';
import { ImageUploader } from '@apps/admin/modules/admin/components/theme/components/header/UpdateHeader.styled';
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error';
import { ModalService } from '@nft-marketplace/modal';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonGradientPrimary } from '../button/button';
import {Loader} from '../Loader';
const ImageDunny = styled.div`
    padding: 3rem 1.5rem 1.8rem;
    background: #F9F9F9;
    border: 1px dashed #BAC6D9;
    border-radius: 4px;
    border-width: 2px;
    text-align: center;
    p {
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;   
        margin-bottom: 5px;     
    }
    span {
        display: block;
        font-family: Inter;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        margin-bottom: 15px;     
    }
    button {
        background: #FFFFFF;
        border-radius: 6px;
        font-family: Inter;
        padding: 1rem;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        width: 100%;
        border: 1px solid #2D5B9A;

        // border-image-source: linear-gradient(90deg, rgba(45, 91, 154, 0.56) 0%, rgba(8, 18, 35, 0.56) 100%);
        color: #23487B;
    }
`

const UploadArtworkContainer = styled.div`
  // background: #fff;
  // border-radius: 1.2rem;
  /* padding: 4rem;
  height: 70rem; */
  /* width: 100%;
  display: flex;
  flex-flow: column;
  gap: 1rem; */
  @media screen and (max-width: 540px) {
    background: transparent;
    padding: 0rem;
    height: 50rem;
  }
`;
const UploadArtworkInput = styled.div`
  /* border: 1px dashed ${({ theme }) => theme.colors.uploadArtColor}; */
  box-sizing: border-box;
  /* border-radius: 1.3rem;
  height: 100%;
  width: 168px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; */
  /* height: 15rem; */
  &.active {
    border: ${({ theme }) => `2px solid ${theme.colors.borderprimary}`};
  }
  input {
    display: block;
    /* width: 100%;
    height: 100%;
    position: absolute; */
    background: transparent;
    color: transparent;
    visibility: hidden;
  }
  label {
    display: block;
    /* width: 100%;
    height: 100%;
    position: absolute; */
  }
  &.image-preview {
    //     border: none;
    /* padding: 0 1.8rem; */

    span {
      background: #122379 !important;
      border-radius: 10px;
      /* width: 414px !important;
      height: 515px !important; */
    }
  }
  @media screen and (max-width: 540px) {
    height: 46rem;
  }
`;
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
    /* margin: 0; */
    /* margin-top: 5px; */
    font-family: Inter;
    font-size: 1.4rem;
    font-weight: 400;
    /* line-height: 3rem; */
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
`;
const InputLabel = styled.label`
  font-family: Inter;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
  color: ${({ theme }) => theme.colors.fontprimary};
`;
const ImagePreview = styled.img`
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  border-radius: 1.3rem;
`;
const CustomFileUpload = (props: any) => {
  const { label, value, onChange, onDelete, loader, validExtensions, content, imageDimensions } = props;
  // const [load, setLoad] = useState(false);


  const [flag, setFlag] = useState(false);

  const dropArea = useRef<HTMLDivElement>(null);
  const showFile = useCallback(
    (file: File) => {
      const fileType = file.type; //getting selected file type
      if (!validExtensions.includes(fileType)) {
        ModalService.open((modalProps: any) => (
          <ErrorModal
            title="Warning"
            desc={validExtensions.includes('image/x-icon') ? "It only support .ico files" : "Format not supported"}
            close={modalProps.close}
          />
        ));
        if (null !== dropArea.current) dropArea.current.classList.remove('active');
        return false;
      }
      if(!(file.size <= 5242880)) {
        ModalService.open((modalProps: any) => (
          <ErrorModal
            title="Warning"
            desc={`${file.name} is larger than 5 MB`}
            close={modalProps.close}
          />
        ));
        return false;
      }
      if (validExtensions.includes(fileType)) {
        //if user selected file is an image file
        setFlag(IsImage(file.name));
        const fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
          const fileURL = fileReader.result; //passing user file source in fileURL variable
          onChange(fileURL, file);
        };
        fileReader.readAsDataURL(file);
      }
    },
    [onChange]
  );
  const fileBrowseHandler = (e: any) => {
    showFile(e.target.files[0]);
  };

  useEffect(() => {
    if (null !== dropArea.current) {
      const dropAreaElement = dropArea.current;
      //If user Drag File Over DropArea
      const draqoverListener = (event: any) => {
        event.preventDefault(); //preventing from default behaviour
        if (null !== dropAreaElement) dropAreaElement.classList.add('active');
        // dragText.textContent = "Release to Upload File";
      };
      dropAreaElement.addEventListener('dragover', draqoverListener);
      //If user leave dragged File from DropArea
      const dragLeaveListener = () => {
        if (null !== dropAreaElement)
          dropAreaElement.classList.remove('active');
        // dragText.textContent = "Drag & Drop to Upload File";
      };
      dropAreaElement.addEventListener('dragleave', dragLeaveListener);
      //If user drop File on DropArea
      const dropListener = (event: any) => {
        event.preventDefault(); //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        showFile(event.dataTransfer.files[0]); //calling function
      };
      dropAreaElement.addEventListener('drop', dropListener);
      return () => {
        dropAreaElement?.removeEventListener('dragover', draqoverListener);
        dropAreaElement?.removeEventListener('dragleave', dragLeaveListener);
        dropAreaElement?.removeEventListener('drop', dropListener);
      };
    }
  }, [showFile]);

  return (
    // <UploadArtworkContainer>
    //   <InputLabel>{label}</InputLabel>
    //   <UploadArtworkInput
    //     className={value ? 'image-preview' : ''}
    //     ref={dropArea}
    //   >
    //     {value ? (
    //       flag === true ? (
    //         <Image
    //           placeholder="blur"
    //           src={value}
    //           alt="image-data"
    //           blurDataURL={value}
    //           width="1080"
    //           height="1080"
    //           objectFit="contain"
    //         />
    //       ) : (
    //         <VideoComponent filePath={value} mute={false} />
    //       )
    //     ) : (
    //       <DefaultImg>
    //         {/* {!loader && (
    //           <span className="img-fileupload-wrp">
    //             <Image
    //               src={`/svgs/img-filedrop.svg`}
    //               alt="Back"
    //               width="100"
    //               height="100 "
    //               objectFit="cover"
    //             />
    //           </span>
    //         )} */}

    //         {!loader && (
    //         //   <p>
    //         //     Drop your Image here or <span>Browse</span>
    //         //   </p>
    //         <ImageDunny>
    //         <Image src={'/svgs/upload-img.svg'} width={34} height={34} alt={"uplaod-img"} />
    //                 {/* <label>Upload your logo image</label>
    //                 <span>Max size limit - 5MB</span> */}
    //                 <p>Upload your logo image</p>
    //                 <p>Max size limit - 5MB</p>

    //                 <button className="pointer" onClick={()=>alert("pani")}>Change Logo</button>
    //         </ImageDunny>

    //         )}
    //       </DefaultImg>
    //     )}
    //     <label htmlFor="file"></label>
    //     <input
    //       id="file"
    //       type="file"
    //       name="file"
    //       value=""
    //       onChange={fileBrowseHandler}
    //     />
    //   </UploadArtworkInput>
    //   {value && (
    //     <ButtonGradientPrimary
    //       blockBtn
    //       onClick={() => {
    //         onDelete(value);
    //       }}
    //       id="upload"
    //       fs="1.4"
    //       size="sm"
    //     >
    //       <svg
    //         width="12"
    //         height="12"
    //         viewBox="0 0 12 12"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
    //           fill="#172F53"
    //         />
    //       </svg>
    //     </ButtonGradientPrimary>
    //   )}
    // </UploadArtworkContainer>
    <>
      {loader ?
        <Loader width="100" height="60"/>
        :



        <ImageUploader>
          <UploadArtworkInput
            className={value ? 'image-preview' : ''}
            ref={dropArea}
          >
            {value ? (

              <Image
                placeholder="blur"
                src={value}
                alt="image-data"
                blurDataURL={value}
                width={imageDimensions ? imageDimensions?.width : "1080"}
                height={imageDimensions ? imageDimensions?.height : "1080"}
                objectFit="fill"
              />
            )
              :
              <>
                <Image src={'/svgs/upload-img.svg'} width={34} height={34} alt={"uplaod-img"} />
                <label>{content?.label}</label>
                <span>Max size limit - 5MB</span>
                {
                  imageDimensions ?
                    <>
                      <span>Height - {imageDimensions?.height}</span>
                      <span>Width - {imageDimensions?.width}</span>
                    </> : null
                }

                {/* <button className="pointer" onClick={()=>alert("pani")}>Change Logo</button> */}
                <label className="btn-in" htmlFor="file">{content?.btnLabel}</label>
                <input
                  className='hide'
                  id="file"
                  type="file"
                  name="file"
                  value=""
                  onChange={fileBrowseHandler}
                />
              </>
            }

          </UploadArtworkInput>

          {value && (
            <ButtonGradientPrimary
              blockBtn
              onClick={() => {
                onDelete(value);
              }}
              id="upload"
              fs="1.4"
              size="sm"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                  fill="#172F53"
                />
              </svg>
            </ButtonGradientPrimary>
          )}
        </ImageUploader>
      }
    </>
  );

};

export default CustomFileUpload;



















































// import Image from 'next/image';
// import styled from 'styled-components';
// import Loader from '../Loader';

// const UploadArtworkContainer = styled.div`
//   background: ${({ theme }) => theme.colors.uploadArtworkBg};
//   border-radius: 1.2rem;
//   padding: 2.2rem;
//   height: 70rem;
//   width: 100%;
//   max-width: 55rem;
//   &.md {
//     height: 50rem;
//     max-width: 40rem;
//   }
//   &.sm {
//     height: 185px;
//     // max-width: 30rem;
//   }
//   &.no-background {
//     padding: 0rem;
//     margin-bottom: 3rem;
//     background: none;
//     .label {
//       border: 1px dashed ${({ theme }) => theme.colors.borderprimary};
//       border-radius: 1.3rem;
//     }
//   }
//   @media screen and (max-width: 540px) {
//     background: transparent;
//     padding: 0rem;
//     height: 50rem;
//   }
// `;
// const UploadArtworkInput = styled.div`
//   border: 1px dashed ${({ theme }) => theme.colors.uploadArtColor};
//   box-sizing: border-box;
//   border-radius: 1.3rem;
//   height: calc(100% - 3.8rem);
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   .img-fileupload-wrp {
//     background: #e6eefb;
//     width: 56px;
//     height: 56px;
//     border-radius: 50%;
//     display: -webkit-box;
//     display: -webkit-flex;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-align-items: center;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     -webkit-box-pack: center;
//     -webkit-justify-content: center;
//     -ms-flex-pack: center;
//     justify-content: center;
//     img {
//       width: 30px !important;
//       height: 22px !important;
//     }
//   }
//   input {
//     display: block;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     background: transparent;
//     color: transparent;
//     visibility: hidden;
//   }
//   label {
//     display: block;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//   }
//   &.image-preview {
//     border: none;
//   }
// `;
// const DefaultImg = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   p {
//     margin-top: 5px;
//     font-family: Inter;
//     font-size: 1.4rem;
//     font-weight: 400;
//     line-height: 3rem;
//     color: #343a40;
//     span {
//       font-size: 1.4rem;
//       font-weight: 400;
//       line-height: 3rem;
//     }
//   }
// `;
// const InputLabel = styled.label`
//   font-family: Poppins;
//   font-size: 1.8rem;
//   font-weight: 500;
//   line-height: 2.7rem;
//   margin: 0;
//   margin-bottom: 1.1rem;
//   display: block;
//   color: ${({ theme }) => theme.colors.artWorkText};
// `;
// const ImagePreview = styled.div`
//   width: 100%;
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
//   height: 100%;
//   border-radius: 1.3rem;
// `;

// const C = ({
//   label,
//   value,
//   size,
//   noBG,
//   error,
//   name,
//   onChange,
//   spinloader,
//   endLoader,
// }: {
//   label: string;
//   value: string;
//   size?: string;
//   error?: string;
//   name?: string;
//   noBG?: boolean;
//   onChange: (e: any) => void;
//   spinloader?: boolean;
//   endLoader: () => void;
// }) => {
//   return (
//     <UploadArtworkContainer
//       className={`${size} ${noBG ? 'no-background' : ''}`}
//     >
//       <InputLabel>{label}</InputLabel>
//       <UploadArtworkInput className={value ? 'image-preview' : ''}>
//         {value ? (
//           <ImagePreview
//             style={{ backgroundImage: `url(${value})` }}
//             onLoad={endLoader}
//           />
//         ) : (
//           <DefaultImg>
//             {spinloader ? (
//               <Loader />
//             ) : (
//               <>
//                 <span className="img-fileupload-wrp">
//                   <Image
//                     src={`/svgs/img-filedrop.svg`}
//                     alt="Back"
//                     width="100"
//                     height="60"
//                   />
//                 </span>
//                 <p>
//                   {!noBG && 'Drop your Art here or '}
//                   <span>Browse</span>
//                 </p>
//               </>
//             )}
//           </DefaultImg>
//         )}
//         <label className="label" htmlFor={name || 'file'}></label>
//         <input
//           id={name || 'file'}
//           type="file"
//           name={name || 'file'}
//           onChange={onChange}
//         />
//       </UploadArtworkInput>
//       {error ? <p className="error">{error}</p> : null}
//     </UploadArtworkContainer>
//   );
// };

// export default CustomFileUpload;
