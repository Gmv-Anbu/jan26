import useWindowSize from '@apps/customer/hooks/useWindowSize';
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button';
import Icon from '@apps/customer/modules/shared/components/icon/icon';
import Image from 'next/image';
import React from 'react'
import ReactDOM from "react-dom";
import styled from 'styled-components'

const ModalWrapper = styled.div`
    /* position: fixed;
    inset: 0 */
    /* background-color: rgba(0, 0, 0, 0.5); */
    display: flex;
    align-items: center;
    justify-content: center;
`
const ModalContent = styled.div`
    background-color: #fff;
    box-shadow: 0px 24px 36px rgba(0, 0, 0, 0.09);
    width: 640px;
    min-height: 416px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        padding-bottom: 25px !important;
    }
    h4{
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
    }
    p{
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
        padding-bottom: 51px;
        max-width: 200px;
        text-align: center;
    }
    @media screen and (max-width: 680px){
        width: 342px;
        img{
            padding-bottom: 67px !important;
        }
        h4{
            padding-bottom: 14px;
        }
        p{
            padding-bottom: 30px;
            max-width: 230px;
        }
    }
`

const Modal = ({isShow,img, onClose,title,content, btnText}) => {
    const {width} = useWindowSize()

    if(!isShow) return null
    return (
        <ModalWrapper>
            <ModalContent onClick={e => e.stopPropagation()}>
                <Image src={img} alt="ICO" width={width > 549 ? "86" : "80"} height={width > 549 ? "86" : "80"} />
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                </div>
                <p className="modal-body">{content}</p>
                <div className="modal-footer">
                    <ButtonPrimary onClick={onClose}>{btnText}</ButtonPrimary>
                </div>
            </ModalContent>
        </ModalWrapper>
    )
}

export default Modal