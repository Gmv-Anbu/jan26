import auth from '@apps/admin/api/admin/auth'

import { ModalService } from '@nft-marketplace/modal'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import UserService from '@apps/customer/api/customer/UserService'
import SuccessModal from '@apps/customer/modules/customer/shared/modal/SuccessModal'
import LeftArrow from '../../../public/images/customer/home/leftArrow.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie, removeCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '../../../utils/storage'

export const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ModalContainer = styled.div`
  width: 432px;
  height: 357px;
  background: #ffffff;
  border-radius: 6px;
`
export const Change = styled.div`
  display: flex;
  justify-content: end;
  padding: 2rem 2rem 0 2rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;

  color: #000000;
`
export const Changepass = styled.div`
  font-style: normal;
  font-weight: 400;
  line-height: 104%;
  text-transform: uppercase;
  padding-top: 1.5rem;
  font-size: 3.2rem;
  padding-bottom: 2rem;
  color: #1d1d1d;
  margin-bottom: 0.7rem;
  padding-bottom: 2rem;
  @media screen and (max-width: 1240px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 430px) {
    width: 90%;
    font-size: 2.4rem;
    padding-left: 3rem;
    margin-bottom: -1.8rem;
  }
  @media screen and (max-width: 380px) {
    padding-left: 3rem;
  }
  @media screen and (max-width: 330px) {
    padding-left: 3rem;
  }
`

export const ChangeSpan = styled.span`
  padding-left: 4rem;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  display: flex;
  align-items: center;
  color: #72809c;
`
export const Form1 = styled.div`
  padding: 0 4rem;
  padding-top: 5rem;
  @media screen and (max-width: 430px) {
    padding: 0 3rem;
    padding-top: 4rem;
  }
`
export const Label1 = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  padding-left: 2rem;
  line-height: 22px;
  letter-spacing: 0.004em;
  color: #4e4e4e;
  @media screen and (max-width: 430px) {
    padding-left: 0rem;
  }
`
export const Input2 = styled.input`
  width: 94.6%;
  height: 6.4rem;
  background: #ffffff;
  border: 1.5px solid #d1e0e2;
  margin-top: 0.7rem;
  outline: none;
  padding: 1rem;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  padding-left: 2rem;
  color: #0e1818;
  margin-bottom: 1rem;
  margin-left: 2rem;
  @media screen and (max-width: 430px) {
    width: 100%;
    margin-left: 0rem;
  }
`
export const Input1 = styled.input`
  width: 94.6%;
  height: 6.4rem;
  background: #ffffff;
  border: 1.5px solid #d1e0e2;
  margin-top: 0.7rem;
  outline: none;
  padding: 1rem;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #0e1818;
  padding-left: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  /* ::placeholder{
 font-size:2rem;
color: red;
height:2rem;
  } */
  @media screen and (max-width: 430px) {
    width: 100%;
    margin-left: 0rem;
  }
`
export const IconContainer = styled.div`
  display: flex;
  gap: 0 2rem;
  margin-left: 1rem;
  align-items: center;

  cursor: pointer;
  margin-bottom: 4rem;
  @media screen and (max-width: 430px) {
    width: 100%;
    padding-left: 3rem;
    padding-top: 3rem;
  }
  @media screen and (max-width: 380px) {
    margin-bottom: 3rem;
    padding-left: 3rem;
  }
  @media screen and (max-width: 330px) {
    margin-bottom: 3rem;
    padding-left: 2.5rem;
  }

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.8rem;
    display: flex;
    align-items: center;
    letter-spacing: -0.24px;
    color: #848a8b;
    @media screen and (max-width: 430px) {
      color: #0e1818;
    }
    .img {
      cursor: pointer;
    }
  }
`
export const BtnContainer = styled.div`
  width: 365px;
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const BtnContainer1 = styled.div`
  width: 97%;
  margin-top: 4rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  align-items: center;
  gap: 0 2rem;
  padding-bottom: 5rem;
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
    width: 100%;
    margin-top: 5rem;
  }
`
export const CancelBtn = styled.button`
  width: 13.7rem;
  height: 5rem;
  font-style: normal;
  background: #f4f9f9;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  padding: 1rem;
  border: 1px solid #2a7575;
  color: #2a7575;
  outline: none;
  cursor: pointer;
  @media screen and (max-width: 430px) {
    width: 100%;
    height: 6.2rem;
  }
`
export const ContiuneBtn = styled.button`
  padding: 1rem;
  width: 22.7rem;
  border: none;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  cursor: pointer;
  text-align: center;
  height: 5rem;
  background: #2a7575;
  color: #ffffff;
  @media screen and (max-width: 430px) {
    width: 100%;
    height: 6.2rem;
  }
`
export const PwdChange = styled.div`
  width: 432px;
  height: 300px;
  left: 0px;
  top: 0px;

  background: #ffffff;
  border-radius: 6px;
`
export const Errormsg = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.2rem;
  margin-left: 2rem;
  display: flex;
  letter-spacing: 0.004em;
  color: red;
  @media screen and (max-width: 430px) {
    margin-left: 0.5rem;
    display: flex;

    width: 90%;
    line-height: 22px;
    font-size: 1.4rem;
    letter-spacing: 0.004em;
  }
`
export const SuccessMessage = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  margin-left: 2rem;
  line-height: 2.2rem;
  letter-spacing: 0.004em;
  color: green;
  @media screen and (max-width: 430px) {
    margin-left: 0.5rem;
    display: flex;
  }
`

export const PasswordEye = styled.a`
  position: absolute;
  right: 4.5rem;
  top: 4rem;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;

  @media screen and (max-width: 430px) {
    right: 2.2rem;
    top: 4rem;
  }
`

export const PasswordEyeConfirm = styled.a`
  position: absolute;
  right: 4.5rem;
  top: 4rem;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;
  @media screen and (max-width: 430px) {
    right: 2.2rem;
    top: 4rem;
  }
  @media screen and (max-width: 1517) {
    right: 1rem;
    top: 3.9rem;
  }
`

export const PassWordWrapper = styled.div`
  position: relative;
  input[type='password'] {
    width: 94.6%;
    background: #ffffff;
    border: 1.5px solid #d1e0e2;
    margin-top: 0.7rem;
    outline: none;
    padding: 1rem;
    font-style: normal;
    font-weight: 600;
    font-size: 3rem;
    line-height: 16px;
    padding-left: 2rem;
    color: #0e1818;
    @media screen and (max-width: 430px) {
      width: 100%;
    }
  }
`
export const PasswordWrap = styled.div`
  margin-top: 15rem;
  width: 65%;
  height: 64.2rem;
  margin-left: 40rem;
  margin-bottom: 20rem;
  @media screen and (max-width: 1240px) {
    margin-top: 15rem;
  }
  @media screen and (max-width: 780px) {
    margin-top: 15rem;
    margin-left: 20rem;
  }
  @media screen and (max-width: 480px) {
    margin-top: 8rem;
    margin-left: 0rem;
    width: 100%;
    height: auto;
    padding-bottom: 1rem;
    margin-bottom: 0;
    background: #f4f9f9;
  }
`
export const PasswordContainer = styled.form`
  background: #f4f9f9;
  width: 72.5%;
  height: auto;
  @media screen and (max-width: 1240px) {
    width: 80%;
  }
  @media screen and (max-width: 1240px) {
    width: 85%;
  }
  @media screen and (max-width: 1240px) {
    width: 100%;
  }
`

const PasswordModel = ({ setOpenModal, userData }) => {
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [oldPassword, setOldPassword] = useState()
  const [check, setCheck] = useState<boolean>(false)
  const [reset, setReset] = useState()
  const [passType, setPassType] = useState<string>('password')
  const [passNew1Type, setPassNew1Type] = useState<string>('password')
  const [passNew2Type, setPassNew2Type] = useState<string>('password')
  // const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState('')
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('')
  const [passwordStrenghtClass, setPasswordStrengthClass] = useState('')
  const [newPasswordString, setNewPasswordString] = useState()
  const [newResetPasswordString, setNewResetPasswordString] = useState()

  const router = useRouter()
  const backBtnHandler = () => {
    router.push('/base/myProfile')
    return
  }
  const redirect = () => {
    router.push('/')
    return
  }

  const logOut = () => {
    UserService.userLogout()
      .then((res) => {
        removeCookie(KEYS.CUSTOMER_USER)
        localStorage.clear()
        router.push('/base/signin')
        setOpenModal(false)
      })
      .catch((err) => {})
  }
  // const setToken = () => {
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   let headers = {}
  //   if (user && user.accessToken) {
  //     headers = { Authorization: `Bearer ${user.accessToken}` }
  //   }
  //   return headers
  // }
  const handleValidate = (e) => {
    e.preventDefault()
    let hasError = false
    if (!oldPassword) {
      setPasswordError('Please enter current  password')
      hasError = true
    } else {
      setPasswordError('')
    }

    if (!newPasswordString) {
      setNewPasswordError('Please enter new password')
      hasError = true
    } else {
      setNewPasswordError('')
    }

    if (!newResetPasswordString) {
      setConfirmPasswordError('Please enter confirm password')
      hasError = true
    } else if (!newResetPasswordString == newPasswordString) {
      setConfirmPasswordError('Paswords do not match')
    } else {
      setConfirmPasswordError('')
    }
    return !hasError
  }
  const changepassword = (e) => {
    e.preventDefault()
    const data = {
      newPassword: newPasswordString,
      oldPassword: oldPassword,
    }

    if (passwordError == '' && newPasswordError == '' && confirmPasswordError == '') {
      UserService.changePassword(data).then((res) => {
        if (res?.data?.message === 'Password changed successfully') {
          ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Password Update Successfully" />)
          logOut()
        } else if (res.status == 400 || res.status == 404 || res.status == 500) {
          toast.error(res?.error?.error?.message, {
            toastId: 'ErrorToast',
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            style: {
              fontSize: '1.6rem',
            },
          })
        } else {
          toast.error('Something went wrong.Please try again!', {
            toastId: 'WentWrongErrorToast',
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            style: {
              fontSize: '1.6rem',
            },
          })
        }
      })
    }
  }

  const setPassword = (e) => {
    setOldPassword(e.target.value)
    setPasswordError('')
  }

  const newPassword = (e) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    const newPasswordValue = e.target.value

    const getPasswordLengthValidityText = () => {
      if (e.target.value.length < 8) {
        return '  Minimum 8 characters'
      } else {
        return true
      }
    }
    const getPasswordLetterValidityText = () => {
      if (!/[a-z]/.test(e.target.value) || !/[A-Z]/.test(e.target.value)) {
        return 'Upper & lower case letters'
      } else {
        return true
      }
    }
    const getPasswordSymbolValidityText = () => {
      if (!/\W/.test(e.target.value) || !/\d/.test(e.target.value)) {
        return 'A symbol and a number'
      } else {
        return true
      }
    }
    const PasswordLengthValidityText = getPasswordLengthValidityText()
    const PasswordLetterValidityText = getPasswordLetterValidityText()
    const PasswordSymbolValidityText = getPasswordSymbolValidityText()

    const getScoreText = () => {
      if (PasswordLetterValidityText == true && PasswordSymbolValidityText == true && PasswordLengthValidityText == true) {
        if (e.target.value.length > 8) {
          return 'Strong'
        } else if (PasswordLetterValidityText == true && PasswordSymbolValidityText == true && PasswordLengthValidityText == true) {
          return 'Medium'
        }
      } else {
        return 'Weak'
      }
    }
    const scoreText = getScoreText()
    // Password strength validation
    const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/ // Password pattern with minimum length of 8 and maximum length of 20 characters
    let passwordStrength = ''
    if (passwordStrengthRegex.test(newPasswordValue)) {
      if (newPasswordValue.length < 8) {
        passwordStrength = 'weak'
      } else {
        passwordStrength = 'strong'
      }
    }
    if (newPasswordValue) {
      if (!passwordRegex.test(newPasswordValue)) {
        setNewPasswordError('The password should be Atleast 8 characters long for strong. Use atleast one upper and lower case letters, numbers, and symbols like @ * ! ? $ % ^ &')
      } else {
        setNewPasswordString(newPasswordValue)
        setNewPasswordError('')
      }
    } else {
      setNewPasswordString(newPasswordValue)
      setNewPasswordError('Please enter new password')
    }

    //confirmPassword check
    if (newResetPasswordString) {
      if (newPasswordValue !== newResetPasswordString) {
        setConfirmPasswordError('Passwords do not match')
        setConfirmPasswordSuccess('')
      } else if (newPasswordValue == newResetPasswordString) {
        setConfirmPasswordSuccess('Password Matched!')
        setConfirmPasswordError('')
      } else {
        setConfirmPasswordError('')
      }
    }

    // Set password strength message and class
    if (scoreText) {
      setPasswordStrengthMessage(` ${scoreText}`)
      setPasswordStrengthClass(`password-strength ${scoreText}`)
    } else {
      setPasswordStrengthMessage('')
      setPasswordStrengthClass('password-strength')
    }
  }

  const resetNewPassword = (e) => {
    setNewResetPasswordString(e.target.value)
    if (newPasswordString !== e.target.value) {
      setConfirmPasswordError('Password do not match')
      setConfirmPasswordSuccess('')
    } else if (newPasswordString == e.target.value) {
      setConfirmPasswordSuccess('Password Matched!')
      setConfirmPasswordError('')
    } else {
      setConfirmPasswordError('')
    }
  }
  return (
    <PasswordWrap>
      <div>
        <IconContainer onClick={backBtnHandler}>
          <Image className="img" src={LeftArrow}></Image>
          <span>Edit Profile</span>
        </IconContainer>
        <Changepass>Change password</Changepass>
      </div>
      <PasswordContainer onSubmit={(e) => {
        e.preventDefault()
      }}>
        <Form1>
          <span>
            <Label1 htmlFor="PassWord">Current password</Label1>
          </span>
          <PassWordWrapper>
            <Input1 onInput={setPassword} type={passType}></Input1>
            <PasswordEye onClick={() => setPassType(passType === 'text' ? 'password' : 'text')}>
              <Image src={`/images/customer/home/eye-${passType === 'text' ? 'open' : 'closed'}.svg`} alt={`PasswordEye`} width="22" height="22" />
            </PasswordEye>
          </PassWordWrapper>
          {passwordError && <Errormsg>{passwordError}</Errormsg>}
        </Form1>

        <Form1>
          <span>
            <Label1 htmlFor="PassWord">Create new password</Label1>
          </span>
          <PassWordWrapper>
            <Input2 onInput={newPassword} type={passNew1Type}></Input2>
            <PasswordEye onClick={() => setPassNew1Type(passNew1Type === 'text' ? 'password' : 'text')}>
              <Image src={`/images/customer/home/eye-${passNew1Type === 'password' ? 'closed' : 'open'}.svg`} alt={`PasswordEye`} width="22" height="22" />
            </PasswordEye>
          </PassWordWrapper>
          {newPasswordError && <Errormsg>{newPasswordError}</Errormsg>}
        </Form1>
        <Form1>
          <span>
            <Label1 htmlFor="PassWord">Re-enter new password</Label1>
          </span>
          <PassWordWrapper>
            <Input1 onInput={resetNewPassword} type={passNew2Type}></Input1>
            <PasswordEyeConfirm onClick={() => setPassNew2Type(passNew2Type === 'text' ? 'password' : 'text')}>
              <Image src={`/images/customer/home/eye-${passNew2Type === 'text' ? 'open' : 'closed'}.svg`} alt={`Confirm`} width="22" height="22" />
            </PasswordEyeConfirm>
          </PassWordWrapper>
          {confirmPasswordSuccess && <SuccessMessage>{confirmPasswordSuccess}</SuccessMessage>}
          {confirmPasswordError && <Errormsg>{confirmPasswordError}</Errormsg>}
          <Strength>
            <div className={`${passwordStrenghtClass || ''}`}>
              <span>Password strength : </span>
              {passwordStrengthMessage}
            </div>
          </Strength>
          <BtnContainer1>
            <ContiuneBtn onClick={(e) => handleValidate(e) && changepassword(e)} disabled={passwordError ? true : false}>
              Change password
            </ContiuneBtn>
            <CancelBtn
              onClick={() => {
                router.push('/base/myProfile')
              }}
            >
              Cancel
            </CancelBtn>
          </BtnContainer1>
        </Form1>
      </PasswordContainer>
    </PasswordWrap>
  )
}

export default PasswordModel
const Strength = styled.div`
  margin-top: 1rem;
  span {
    font-style: normal;
    padding-left: 2rem;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.004em;
    color: #4e4e4e;
    @media screen and (max-width: 430px) {
      padding-left: 0.5rem;
    }
  }
  .password-strength {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.004em;
    color: #4e4e4e;
  }

  .password-strength.Weak {
    color: red;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
  }

  .password-strength.Medium {
    color: orange;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
  }

  .password-strength.Strong {
    color: green;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
  }
`
