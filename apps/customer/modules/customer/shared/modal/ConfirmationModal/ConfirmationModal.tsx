import { RootState } from "@apps/customer/redux/store"
import { handleApiImage } from "@apps/customer/utils/helper"
import Image from "next/image"
import { useSelector } from "react-redux"
import { ButtonGradientPrimary } from "../../../../shared/components/button/button"
import { SuccessModalWrapper, ModalDialog, ModalContent, ModalBody, Title, SuccessImgWrapper, Info } from "./index.styled"
import { IConfirmationModal } from "./modal"


const ConfirmationModal = (props: any) => {

    const { show, closeModal,title, onConfirmation } = props
    const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
    const imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.warningImg) || "/svgs/modal-error.svg";

    return (
        <SuccessModalWrapper className={show ? 'show' : 'fade'}>
            <ModalDialog className='modal-dialog'>
                <ModalContent>
                    <ModalBody>
                        <Title>{title}</Title>
                        <SuccessImgWrapper>
                        <Image src={imgSrc} alt={`modal-error`} width="110" height="100" /> 
                        </SuccessImgWrapper>
                       <div className="button-container">
                       <ButtonGradientPrimary onDoubleClick={()=>{}} onClick={onConfirmation} blockBtn size="md" className="button-content">
                            Yes
                        </ButtonGradientPrimary>
                        <ButtonGradientPrimary onClick={closeModal} blockBtn size="md" className="button-content">
                            No
                        </ButtonGradientPrimary>
                       </div>
                    </ModalBody>
                </ModalContent>
            </ModalDialog>
        </SuccessModalWrapper>
    )
} 

export default ConfirmationModal