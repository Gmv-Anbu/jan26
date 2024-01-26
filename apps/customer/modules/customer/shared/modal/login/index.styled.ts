import styled, { css } from 'styled-components';

const LoginModalWrapper = styled.div`
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
            max-width: 50rem;
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
    border-radius: 9px;
    max-height:469px;
    max-width:500px;
`  
const ModalHeader = styled.div`
    padding: 3.5rem;
    font-family: ${({theme}) => theme.fontsFamily.primary};
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
    font-family: ${({theme}) => theme.fontsFamily.primary};
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
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 132.5%;
    text-align: center;
    color: ${({ theme }) => theme.colors.colorD2};
`
const ErrorImgWrapper = styled.div`
    width: 11rem;
    height: 10rem;
    margin-bottom: 2.5rem;
`
const ModalFooter = styled.div`
    width: 100%;
    text-align: center;
    padding:0 20px;
    
`
const DismissBtn = styled.a`
    // font-family: Manrope;
    font-weight: 400;
    line-height: 14.16px;
    color: ${({ theme }) => theme.colors.white};
    display: inline-flex;
    justify-content: center;
    background: ${({ theme }) => theme.colors.dismissBtnColor};
    border-radius: 8px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
    padding: 15px;
    font-size: 16px;
    max-width: 354px;
    // background: ${({ theme }) => theme.colors.gradientBtnBG};
    border-radius: 8px;
    margin: 0 auto;
    width: 100%;
    margin-top:28px;
    margin-bottom:51px;
     &:hover {
    transform: translateY(-2px);
  }
   
`
export {LoginModalWrapper,DismissBtn,ModalBody,ModalContent,ModalDialog,ModalFooter,ModalHeader,Info,Title,ErrorImgWrapper}