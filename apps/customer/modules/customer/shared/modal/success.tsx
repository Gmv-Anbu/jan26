import Image from 'next/image';
import React from 'react'
import styled from 'styled-components'
import { ButtonGradientPrimary } from '../../../shared/components/button/button';
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import { handleApiImage } from '@apps/customer/utils/helper';

const SuccessModalWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: 1072;
    display: none;
    transition: opacity .15s linear;
    &.show {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        width: 100%;
        &:before {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: ${({ theme }) => theme.colors.artWorkText};
            opacity: .4;
        }
        .modal-dialog {
            transform: translate(0,0);
        }   
    }
`
const ModalDialog = styled.div`
    max-width: 50rem;
    margin: 0rem auto;
    position: relative;
    width: 100%;
    pointer-events: none;
    transition: transform .3s ease-out,-webkit-transform .3s ease-out;
    transform: translate(0,-25%);
`
const ModalContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: ${({ theme }) => theme.colors.modelContentColor};
    border-radius: 1.5rem;
`
const ModalHeader = styled.div`
    padding: 3.5rem;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    h3 {
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 3.6rem;
        color: ${({ theme }) => theme.colors.white};
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.8rem;
        color: ${({ theme }) => theme.colors.fontdark};
        margin-bottom: 0rem;
    }
    a {
        position: absolute;
        right: 2rem;
        top: 2rem;
    }
`
const ModalBody = styled.div`
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    padding: 6rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
`
const Title = styled.h3`
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 4.2rem;
    margin-bottom: 3rem;
`
const Info = styled.p`
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.4rem;
    margin-bottom: 3.5rem;
    color: ${({ theme }) => theme.colors.coolGrey};
    span {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.white};
    }
`
const SuccessImgWrapper = styled.div`
    width: 21rem;
    height: 19rem;
    margin-bottom: 4.5rem;
`

const SuccessModal = (props: any) => {

    const { show, closeModal, info, title } = props
    const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
    const imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.successImg) || "/svgs/success.svg";

    return (
        <SuccessModalWrapper className={show ? 'show' : 'fade'}>
            <ModalDialog className='modal-dialog'>
                <ModalContent>
                    <ModalBody>
                        <Title>{title}</Title>
                        <SuccessImgWrapper>
                            <Image src={imgSrc} alt={`modal-success`} width="210" height="190" />
                        </SuccessImgWrapper>
                        {info ? <Info>Your bid for <span>Paratrooper</span> with <span>4 ETH</span> has been successfully Placed</Info> : null}
                        <ButtonGradientPrimary onClick={closeModal} blockBtn size="md">
                            Done
                        </ButtonGradientPrimary>
                    </ModalBody>
                </ModalContent>
            </ModalDialog>
        </SuccessModalWrapper>
    )
}

export default SuccessModal