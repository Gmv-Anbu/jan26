import { RootState } from '@apps/customer/redux/store'
import { handleApiImage } from '@apps/customer/utils/helper'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { DismissBtn, ErrorImgWrapper, Info, LoginModalWrapper, ModalBody, ModalContent, ModalDialog, ModalFooter, Title } from './index.styled'
import { ILoginModal } from './modal'

const LoginModal = (props: ILoginModal) => {
  const { show, msg, closeModal } = props
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.warningImg) || "/svgs/modal-error.svg";

  return (
    <LoginModalWrapper className={show ? 'show' : 'fade'}>
      <ModalDialog className="modal-dialog">
        <ModalContent>
          <ModalBody>
            <ErrorImgWrapper>
              <Image src={imgSrc} alt={`modal-error`} width="110" height="100" />
            </ErrorImgWrapper>
            <Title>Connect your Wallet</Title>
            {/* <Info>{msg || 'Please connect your wallet.'}</Info> */}
          </ModalBody>
          <ModalFooter>
            <DismissBtn onClick={closeModal}>Connect Wallet</DismissBtn>
          </ModalFooter>
        </ModalContent>
      </ModalDialog>
    </LoginModalWrapper>
  )
}

export default LoginModal
