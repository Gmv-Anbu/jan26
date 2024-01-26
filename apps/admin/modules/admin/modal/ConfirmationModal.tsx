import Image from "next/image"
import { ButtonGradientPrimary } from "../../shared/components/button/button"
import { SuccessModalWrapper, ModalDialog, ModalContent, ModalBody, Title, SuccessImgWrapper, Info } from "../styled-components/confirmModalStyle"
interface IConfirmationModal{
    show:any, 
    closeModal?:Function,
    title:string,
    onConfirmation?:Function
}

const ConfirmationModal = (props: any) => {

    const { show, closeModal,title, onConfirmation } = props

    return (
        <SuccessModalWrapper className={show ? 'show' : 'fade'}>
            <ModalDialog className='modal-dialog'>
                <ModalContent>
                    <ModalBody>
                        <Title>{title}</Title>
                        <SuccessImgWrapper>
                        <Image src={`/svgs/modal-error.svg`} alt={`modal-error`} width="110" height="100" /> 
                        </SuccessImgWrapper>
                        {props?.showReason && 
                         <div className="confirmReason">
                         <label className="input-label color-white">Reason</label>
                         <input className="input-text" type="text" value={props?.reason} onChange={(e)=>{props?.setReason(e.target.value)}} maxLength={100} />
                         <p className="confirm-reason-info">{props?.reason?.length ? 100-props?.reason.length:'100'} characters remaining</p>
                         <p className="error">{}</p>
                         </div>
                        }
                       <div className="button-container">
                      
                       <ButtonGradientPrimary onClick={onConfirmation} disabled={props?.showReason && !props?.reason} blockBtn size="md" className={props?.showReason ? 'btn-width-150':'button-content'}>
                            Yes
                        </ButtonGradientPrimary>
                        <ButtonGradientPrimary onClick={closeModal} blockBtn size="md" className={props?.showReason ? 'btn-width-150':'button-content'}>
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