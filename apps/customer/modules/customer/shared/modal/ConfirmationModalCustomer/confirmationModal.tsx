import React from 'react'
import styled from 'styled-components'
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`
const ModalContainer = styled.div`
  background-color: #fff;
  width: 45rem;
  padding: 2.5rem;
  text-align: center;
  border-radius: 2px;
  p {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;
    display: flex;
    justify-content: center;
    color: #000000;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
`

const CancelButton = styled.button`
  color: #6a6d6e;
  border: none;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rm;
  padding: 1rem 2rem;
  background: #fff;
  text-transform: uppercase;
  cursor: pointer;
`
const YesButton = styled.button`
  color: #f0483f !important;
  border: none;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.8rem;
  padding: 1rem 2rem;
  background: #fff;
  text-transform: uppercase;
  cursor: pointer;
`

const ConfirmationModal = ({ message, onConfirm, onCancel, cancelText, confirmText }) => {
  return (
    <ModalWrapper>
      <ModalContainer>
        <p>{message}</p>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
          <YesButton onClick={onConfirm}>{confirmText}</YesButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalWrapper>
  )
}
export default ConfirmationModal
