import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import accountService from '../../../api/customer/UserService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const ImageContainer = styled.div`
  width: 50%;
  background-image: url('/images/customer/signup/reset.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  img {
    margin: 12%;
    width: 35%;
    cursor: pointer;

    @media (max-width: 768px) {
      margin: 1rem;
      width: 100%;
      display: flex;
      margin: 0 auto;
      max-width: 90%;
      height: 25%;
    }
    @media (max-width: 425px) {
      margin: 3rem;
      display: flex;
      // margin: 0 auto;
      width: 342px;
      height: 137px;
    }
    @media (max-width: 320px) {
      width: 250px;
      height: 95px;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    background-image: url('/images/customer/signup/reset-mobile.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 425px) {
    min-height: 700px;
  }
`

const FormContainer = styled.div`
  width: 50%;
  background-color: white;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 50%;
  height: 100%;
  justify-content: center;
  align-content: center;

  /* responsive styles */
  @media only screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    max-width: max-content;
    margin-top: 20%;
    padding: 5rem;
    height: max-content;
    overflow-y: auto;
    align-self: center;
  }
  @media only screen and (max-width: 425px) {
    position: absolute;
    max-width: 90%;
    width: 100%;
    top: 18%;
    transform: translateX(-50%);
    left: 50%;
    background: #ffffff;
    box-shadow: 0px 5px 29px rgba(0, 0, 0, 0.11);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`

const FormHeading = styled.div`
  font-size: 4.8rem;
  margin-bottom: 0.5rem;
  color: #111727;
  font-weight: 400;
  line-height: 120%;
  width: 46rem;

  p {
    font-size: 1.6rem;
    margin-bottom: 4.4rem;
    color: #4e4e4e;
    font-weight: 400;
    line-height: 104%;
    margin-top: 0.4rem;
  }
  @media only screen and (max-width: 425px) {
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    text-transform: uppercase;
    margin-bottom: 1.4rem;
    width: 296px;
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      width: 289px;
      margin-bottom: 4rem;
      margin-top: 1.4rem;
      text-transform: initial;
    }
  }
`

const FormLabel = styled.label`
  font-size: 1.4rem;
  color: #0e1818;
  font-weight: 600;
  letter-spacing: 0.004em;
  margin-bottom: 0.4rem;
  /* align label text at start of input field */
  display: flex;
  align-items: flex-start;
  line-height: 22px;
  align-self: flex-start;

  @media only screen and (max-width: 425px) {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.004em;
  }
  @media only screen and (max-width: 320px) {
    font-size: 12px;
    line-height: 22px;
    letter-spacing: 0.004em;
  }
`

const FormInput = styled.input`
  &:focus {
    border: 1.5px solid #2a7575;
    background: #f4f9f9;
    outline: none;
  }
  border: 1.5px solid #d1e0e2;
  font-size: 1.6rem;
  padding: 1.3rem;
  margin-bottom: 1.6rem;
  width: 45.9rem;
  height: 5.2rem;
  // color: #cacece;
  color: #000;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.004em;

  &:-webkit-autofill {
    -webkit-text-fill-color: #000 !important;
    transition: #fff 5000s ease-in-out 0s;
    background-color: white !important;
  }

  @media only screen and (max-width: 425px) {
    font-size: 1.6rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
    color: #bdc0c0;
    width: 294px;
    height: 46px;
    margin-bottom: 2rem;
  }
  @media only screen and (max-width: 320px) {
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
    color: #bdc0c0;
    width: 270px;
  }
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: -1rem;
  align-self: flex-start;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  // width: 100%;
  width: 46rem;

  @media only screen and (max-width: 425px) {
    width: 294px;
  }
  @media only screen and (max-width: 320px) {
    width: 270px;
  }
`

const Button = styled.button`
  color: white;
  border: none;
  font-size: 1.8rem;
  padding: 1.5rem 2rem;
  line-height: 120%;
  background: #2a7575;
  // width: 100%;
  width: 46.1rem;
  height: 5.4rem;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 400;
  @media only screen and (max-width: 425px) {
    width: 294px;
    height: 54px;
    align-self: flex-start;
  }
  @media only screen and (max-width: 320px) {
    width: 270px;
  }
`
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  @media only screen and (max-width: 425px) {
    margin-bottom: 4rem;
  }
`
const ForgotPassword = ({ formData, setFormData, handleSignIn }) => {
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value })
    if (!e.target.value) {
      setEmailError('Please enter your email')
    } else if (e.target.value) {
      const emailValidator = new RegExp('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$')
      if (emailValidator.test(e.target.value)) {
        setEmailError('')
      } else {
        setEmailError('Invalid email address')
      }
    } else {
      setEmailError('')
    }
  }

  const handleValidate = () => {
    let hasError = false
    if (!formData.email) {
      setEmailError('Please enter your email')
      hasError = true
    } else if (formData.email) {
      const emailValidator = new RegExp('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$')
      if (emailValidator.test(formData.email)) {
        setEmailError('')
      } else {
        setEmailError('Invalid email address')
      }
    } else {
      setEmailError('')
    }

    return !hasError
  }

  return (
    <FormContainer>
      <FormHeading>
        Forgot Password<p>Please enter your registered Email address. You will receive a link to create a new password</p>
      </FormHeading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleValidate()
          handleSignIn()
        }}
      >
        <FormInputContainer>
          <FormLabel>Email Address:</FormLabel>
          <FormInput type="email" value={formData.email} onChange={handleEmailChange} />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </FormInputContainer>
        <ButtonContainer>
          <Button>Send Reset Link</Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  )
}

const LostPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  })
  const router = useRouter()
  const handleSignIn = async () => {
    const data = {
      email: formData.email,
    }
    if (data) {
      const res = await accountService.forgotPassword(data)
      if (res.status == 200) {
        toast.success(res.data.data.message, {
          toastId: 'forgotSuccessToast',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            fontSize: '1.6rem',
          },
        })
        // setTimeout(() => {
        //   router.push('/reset-password')
        // }, 1500)
      } else if (res.status == 400 || res.status == 401 || res.status == 500 || res.status == 404 || res.status == 412 || res.status == 429) {
        toast.error(res?.error?.error?.message, {
          toastId: 'forgotErrroToast',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            fontSize: '1.6rem',
          },
        })
      } else {
        toast.error('Something went wrong!.Please try again', {
          toastId: 'forgotToast',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            fontSize: '1.6rem',
          },
        })
      }
    }
  }

  return (
    <Container>
      <ImageContainer>
        <img src="/images/customer/signup/Logo.png" alt="ICO" onClick={() => router.push('/')} />
      </ImageContainer>
      <ForgotPassword formData={formData} setFormData={setFormData} handleSignIn={handleSignIn} />
    </Container>
  )
}

export default LostPassword
