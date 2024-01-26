import auth from '@apps/admin/api/admin/auth'
import SuccessModal from '@apps/admin/modules/admin/modal/SuccessModal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { ModalService } from '@nft-marketplace/modal'
import React, { useState } from 'react'
import Image from 'next/image'
import {
  BtnContainer,
  BtnContainer1,
  CancelBtn,
  Change,
  Changepass,
  ChangeSpan,
  ContiuneBtn,
  Errormsg,
  Form1,
  Input1,
  Input2,
  Label1,
  ModalBackground,
  ModalContainer,
  PwdChange,
  PasswordEye,
  PasswordEyeConfirm,
  PassWordWrapper,
} from '../styled-components/passwordModelCss'
import { InputWrapper } from '../styled-components/formInputs'
import { KEYS } from '@apps/admin/utils/storage'
import { checkPassword } from '@apps/admin/utils/helper'

const PasswordModel = ({ setOpenModal, userData, logoutUser }) => {
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [oldPassword, setOldPassword] = useState()
  const [check, setCheck] = useState<boolean>(false)
  const [reset, setReset] = useState()
  const [newPassword, setNewPassword] = useState()
  const [passType, setPassType] = useState<string>('password')
  const [passNew1Type, setPassNew1Type] = useState<string>('password')
  const [passNew2Type, setPassNew2Type] = useState<string>('password')
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState({ error: '', message: '' })
  const closeModal = () => {
    setShowModal(false)
  }
  const openModal = () => setShowModal(true)

  const passwordCheckHandler = (e) => {
    e.preventDefault()
    auth.checkPassword(userData.email, oldPassword).then((res) => {
      if (res?.data?.data.valid) {
        setCheck(res?.data?.data.valid)
        setError(!res?.data?.data.valid)
      } else {
        setCheck(false)
        setError(true)
      }
    })
  }

  const setPassword = (e) => {
    setOldPassword(e.target.value)
  }

  const resetCheckHandler = (e) => {
    e.preventDefault()
    if (!reset) {
      // ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc="Please enter new password" />)
      setPasswordError({ error: 'password', message: 'Please enter new password' })
      return false
    } else if (!newPassword) {
      // ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc="Please enter confirm password" />)
      setPasswordError({ error: 'confirmPassword', message: 'Please enter confirm password' })
      return false
    }

    if (!confirmPasswordError) {
      auth.resetPassword(userData.email, oldPassword, reset, newPassword).then((res) => {
        if (!res?.error?.error?.message) {
          setCheck(res?.data?.data.valid)
          setOpenModal(false)
          ModalService.open((modalProps) => 
          <SuccessModal 
            close={() => {
              modalProps.close()
              logoutUser()
              localStorage.removeItem(KEYS.REMEMBER_ME)
            }} 
            desc="Password Update Successfully" />)
        } else {
          setOpenModal(false)
          ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={res?.error?.error?.message} />)
        }
      })
    }
  }

  const resetPasswordChange = (e) => {
    setReset(e.target.value)
    setPasswordError({ error: '', message: `` })
    let valid = checkPassword(e.target.value)
    if(!valid) {
      setPasswordError({ error: 'password', message: 'Password requires min 8 character with one uppercase, lowercase, number and a special character' })
    }
  }

  const resetNewPassword = (e) => {
    if (reset !== e.target.value) {
      setConfirmPasswordError(true)
      setPasswordError({ error: 'passwordDoesntMatch', message: `Password confirmation doesn't match` })
    } else {
      setConfirmPasswordError(false)
      setPasswordError({ error: '', message: `` })
    }
    setNewPassword(e.target.value)
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <Change
            onClick={() => {
              setOpenModal(false)
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.99974 5.58599L11.9497 0.635986L13.3637 2.04999L8.41374 6.99999L13.3637 11.95L11.9497 13.364L6.99974 8.41399L2.04974 13.364L0.635742 11.95L5.58574 6.99999L0.635742 2.04999L2.04974 0.635986L6.99974 5.58599Z" fill="#1C3963" />
            </svg>
          </Change>
          <Changepass>Change Password</Changepass>

          <ChangeSpan>Change your password now! </ChangeSpan>
        </div>
        <div>
          {!check ? (
            <Form1>
              <span>
                <Label1 htmlFor="PassWord">Old Password</Label1>
              </span>
              <PassWordWrapper>
                <Input1 onInput={setPassword} type={passType}></Input1>
                <PasswordEye onClick={() => setPassType(passType === 'text' ? 'password' : 'text')}>
                  <Image src={`/svgs/eye-${passType === 'text' ? 'open' : 'closed'}.svg`} alt={`PasswordEye`} width="22" height="22" />
                </PasswordEye>
              </PassWordWrapper>
              {error && <Errormsg>Please enter old password</Errormsg>}

              <BtnContainer>
                <CancelBtn
                  onClick={() => {
                    setOpenModal(false)
                  }}
                >
                  Cancel
                </CancelBtn>
                <ContiuneBtn onClick={passwordCheckHandler}>Continue</ContiuneBtn>
              </BtnContainer>
            </Form1>
          ) : (
            <PwdChange>
              <Form1>
                <InputWrapper>
                  <Label1 htmlFor="PassWord">New Password</Label1>
                  <PassWordWrapper>
                    <Input2 onInput={resetPasswordChange} type={passNew1Type}></Input2>
                    <PasswordEye onClick={() => setPassNew1Type(passNew1Type === 'text' ? 'password' : 'text')}>
                      <Image src={`/svgs/eye-${passNew1Type === 'text' ? 'open' : 'closed'}.svg`} alt={`PasswordEye`} width="22" height="22" />
                    </PasswordEye>
                  </PassWordWrapper>
                  {['password'].includes(passwordError?.error) && <Errormsg>{passwordError?.message}</Errormsg>}
                </InputWrapper>

                <InputWrapper>
                  <Label1 htmlFor="PassWord">Confirm Password</Label1>
                  <PassWordWrapper>
                    <Input1 onInput={resetNewPassword} type={passNew2Type}></Input1>
                    <PasswordEyeConfirm onClick={() => setPassNew2Type(passNew2Type === 'text' ? 'password' : 'text')}>
                      <Image src={`/svgs/eye-${passNew2Type === 'text' ? 'open' : 'closed'}.svg`} alt={`Confirm`} width="22" height="22" />
                    </PasswordEyeConfirm>
                  </PassWordWrapper>
                  {['confirmPassword', 'passwordDoesntMatch'].includes(passwordError?.error) && <Errormsg>{passwordError?.message}</Errormsg>}
                </InputWrapper>
                {/* {confirmPasswordError && <Errormsg>Password confirmation doesn't match</Errormsg>} */}
                <BtnContainer1>
                  <CancelBtn
                    onClick={() => {
                      setOpenModal(false)
                    }}
                  >
                    Cancel
                  </CancelBtn>
                  <ContiuneBtn onClick={resetCheckHandler} disabled={passwordError?.error ? true : false}>
                    Change Password
                  </ContiuneBtn>
                </BtnContainer1>
              </Form1>
            </PwdChange>
          )}
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default PasswordModel
