import styled, { css } from 'styled-components'
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
    padding: 6rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    .button-container{
        display: flex;
        justify-content: space-between;
       
    }
    .button-content{
        margin-left: 10px;
    }

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
    margin-bottom: 4.5rem;
`

export {SuccessModalWrapper,SuccessImgWrapper,Info,Title,ModalBody,ModalContent,ModalHeader,ModalDialog}