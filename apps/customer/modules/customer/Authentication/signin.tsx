import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import accountService from '../../../api/customer/UserService'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/actions/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'
import eyeIconSVG from '../../../public/images/customer/signup/eye.svg'
import eyeOpenIconSVG from '../../../public/images/customer/signup/eye-open.svg'
import { getCookie, removeCookie, setCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '../../../utils/storage'
import { loginUser } from '@apps/customer/redux/reducer/authSlice'
import { updateUserDetails } from '@apps/customer/redux/reducer/userSlice'
import { ButtonPrimaryOutline } from '../../shared/components/button/button'
import { getItem, removeItem, setItem } from '@apps/admin/utils/storage'
import InputCheckbox from '../../shared/components/formInputs/inputCheckbox'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const ImageContainer = styled.div`
  width: 50%;
  background-image: url('/images/customer/signup/login.webp');
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
      height: 135px;
    }
    @media (max-width: 320px) {
      width: 250px;
      height: 95px;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    background-image: url('/images/customer/signup/signin-mobile.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 425px) {
    min-height: 844px;
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
  @media only screen and (max-width: 375px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20rem;
  }
  @media only screen and (max-width: 320px) {
    margin-top: 1rem;
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

const FormFooter = styled.div`
  font-size: 1.6rem;
  margin-top: 2.4rem;
  color: #b3b9b9;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8rem;
  align-self: center;
  width: 46.1rem;
  p {
    font-weight: bold;
    color: #2a7575;
    font-size: 1.6rem;
    margin-left: 0.5rem;
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 1rem;
    line-height: 1.5rem;
    p {
      font-size: 1.2rem;
      margin-left: 0.3rem;
    }
  }
  @media only screen and (max-width: 425px) {
    font-size: 1.6rem;
    margin-top: 2.4rem;
    p {
      font-size: 1.6rem;
      margin-left: 0.5rem;
    }
  }
  @media only screen and (max-width: 320px) {
    font-size: 1.4rem;
    margin-top: 2.4rem;
    p {
      font-size: 1.4rem;
      margin-left: 0.5rem;
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
  color: #000;
  // color: #cacece;
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
`
const ForgotPassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  position: relative;
  div {
    margin: 0;
  }
  label {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 160%;
    color: #2a7575;
  }
  input {
    width: 1.8rem;
    height: 1.8rem;
  }
  p {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 160%;
    letter-spacing: -0.011em;
    color: #2a7575;
    width: max-content;
  }
  @media only screen and (max-width: 425px) {
    margin-top: 1.2rem;
  }
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

const EyeIcon = styled.span`
  position: absolute;
  top: 60%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
`
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  @media only screen and (max-width: 425px) {
    margin-bottom: 4rem;
  }
`

const BgBorder = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  margin-bottom: 3rem;
  span {
    position: relative;
    z-index: 5;
  }
  &::before {
    content: '';
    position: absolute;
    height: 2px;
    width: 46rem;
    display: block;
    left: 50%;
    top: 50%;
    z-index: 2;
    background: #D1E0E2;
    transform: translate(-50%, -50%);
  }
  &::after {
    content: '';
    position: absolute;
    height: 3.4rem;
    width: 11rem;
    display: block;
    left: 50%;
    top: 50%;
    z-index: 3;
    background: white;
    transform: translate(-50%, -50%);
  }
`
const SignInButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid #D1E0E2;
  color: #0E1818;
  background: transparent;
  margin-bottom: 2rem;
  height: 5.4rem;
  span:first-child {
    margin-right: 0.6rem !important;
  }
`
const SignUpLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 7rem;
`

const Login = ({ formData, setFormData, rememberMe, setRememberMe, handleSignIn }) => {

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
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

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value })
    if (!e.target.value) {
      setPasswordError('Please enter a password')
    } else if (e.target.value) {
      const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
      if (passwordValidator.test(e.target.value)) {
        setPasswordError('')
      } else {
        setPasswordError('Invalid password')
      }
    } else {
      setPasswordError('')
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
    if (!formData.password) {
      setPasswordError('Please enter a password')
      hasError = true
    } else if (formData.password) {
      const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
      if (passwordValidator.test(formData.password)) {
        setPasswordError('')
      } else {
        setPasswordError('Invalid password')
      }
    } else {
      setPasswordError('')
    }

    return !hasError
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignIn()
    }
  }

  const handleCheckbox = (e) => {
    const { name, value, checked } = e?.target
    setRememberMe(checked)
  }

  useEffect(() => {
    if(getCookie(KEYS.REMEMBER_ME)) {
      setFormData(getCookie(KEYS.REMEMBER_ME))
      setRememberMe(true)
    }
  },[])

  return (
    <FormContainer>
      {/* <TwoStepsImages>
    <img src="/images/customer/signup/rightbar.svg" alt="ICO" width={195} />
    <img src="/images/customer/signup/leftbar.svg" alt="ICO" width={195} />
  </TwoStepsImages> */}
      <FormHeading>
        Sign in<p>Enter your Email & Password here</p>
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
          <div style={{ position: 'relative', width: '100% ' }}>
            <FormLabel>Password:</FormLabel>
            <FormInput type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handlePasswordChange} />
            <EyeIcon onClick={toggleShowPassword}>{showPassword ? <Image src={eyeOpenIconSVG} alt="ICO" /> : <Image src={eyeIconSVG} alt="ICO" />}</EyeIcon>
          </div>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <ForgotPassword>
            <InputCheckbox label={`Remember Me`} name='rememberMe' value={rememberMe} onChange={handleCheckbox} />
            <Link href={'/base/forgotpassword'}>
              <p>Forgot password?</p>
            </Link>
          </ForgotPassword>
        </FormInputContainer>
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
        </ButtonContainer>
      </form>
      <FormFooter>
        {/* <BgBorder><span>Or</span></BgBorder>
        <SignInButton>
          <Image src="/svgs/googleIcon.svg" width="24" height="24" />
          Sign in With Google
        </SignInButton>
        <SignInButton>
          <Image src="/svgs/facebookIcon.svg" width="24" height="24" />
          Sign in With Facebook
        </SignInButton> */}
        <SignUpLink>
          Don’t have an account?{' '}
          <Link href={'/base/signup'}>
            <p>Sign Up</p>
          </Link>
        </SignUpLink>
      </FormFooter>
    </FormContainer>
  )
}

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSignIn = async () => {
    const data = {
      email: formData.email,
      password: formData.password,
    }
    if(!formData.email?.length || !formData.password?.length) return
    const response = await accountService.signInUser(data)
    if (response.status == 200) {
      const user = response.data.data
      dispatch(loginUser(user?.accessToken))
      dispatch(updateUserDetails(user))
      if(rememberMe) {
        setCookie(KEYS.REMEMBER_ME, JSON.stringify(data))
      } else {
        removeCookie(KEYS.REMEMBER_ME)
      }
      // Save login details and token to local storage
      localStorage.setItem('user', JSON.stringify(user))
      setCookie(KEYS.CUSTOMER_USER, JSON.stringify(user))
      toast.success(response?.data?.message, {
        toastId: 'SignInSuccessToast',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        style: {
          fontSize: '1.6rem',
        },
      })
      setTimeout(() => {
        let val = getCookie('redirect')
        router.push(val || '/base/dashboard')
      }, 2000)
    } else if (response.status == 400 || response.status == 401 || response.status == 404 || response.status == 412 || response.status == 500) {
      toast.error(response.error.error.message, {
        toastId: 'SignInErrorToast',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
    } else {
      toast.error('Something went wrong.Please try again!', {
        toastId: 'wentWrongToast',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
    }
  }

  return (
    <Container>
      <ImageContainer>
        <img src="/images/customer/signup/Logo.png" alt="ICO" onClick={() => router.push('/')} />
      </ImageContainer>
      <Login formData={formData} setFormData={setFormData} rememberMe={rememberMe} setRememberMe={setRememberMe} handleSignIn={handleSignIn} />
    </Container>
  )
}

export default SignIn
