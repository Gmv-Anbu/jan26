import Image from 'next/image';
import React, { useState } from 'react'
import Select from 'react-select'
import styled, { css } from 'styled-components'
import { ButtonGradientPrimary } from '../../shared/components/button/button';

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
    font-family: Poppins;
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
    font-family: Poppins;
    padding: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: ${({ theme }) => theme.colors.fontprimary};
`
const Title = styled.h3`
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 4.2rem;
    color: ${({ theme }) => theme.colors.fontprimary};
    margin-bottom: .8rem;
`
const Info = styled.p`
    font-size: 2rem;
    font-weight: 400;
    line-height: 3.2rem;
    color:${({ theme }) => theme.colors.infoColor};
`
const ErrorImgWrapper = styled.div`
    width: 11rem;
    height: 10rem;
    margin-bottom: 2.5rem;
`
const ModalFooter = styled.div`
    width: 100%;

`
const DismissBtn = styled.a`
    // font-family: Manrope;
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    color: ${({ theme }) => theme.colors.white};
    padding: 2.5rem;
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.colors.dismissBtnColor};
    border-radius: 0px 0px 9px 9px;
    cursor: pointer;
    &:hover {
        background:  ${({ theme }) => theme.colors.gradientBtnBG};
        color: #FFF;
      }
      
`

const ErrorModal = (props: any) => {

    const { show, msg, closeModal } = props

    return (
        <SuccessModalWrapper className={show ? 'show' : 'fade'}>
            <ModalDialog className='modal-dialog'>
                <ModalContent>
                    <ModalBody>
                        <ErrorImgWrapper>
                            <Image src={`/svgs/modal-error.svg`} alt={`modal-error`} width="110" height="100" />
                        </ErrorImgWrapper>
                        <Title>Oh Snap!</Title>
                        <Info>{msg || 'An error has occured while creating an error report'}</Info>
                    </ModalBody>
                    <ModalFooter>
                        <DismissBtn onClick={closeModal}>Dismiss</DismissBtn>
                    </ModalFooter>
                </ModalContent>
            </ModalDialog>
        </SuccessModalWrapper>
    )
} 

export default ErrorModal