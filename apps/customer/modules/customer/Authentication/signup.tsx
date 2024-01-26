import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import accountService from '../../../api/customer/UserService'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import RightBar from '../../../public/images/customer/signup/rightbar.svg'
import LeftBar from '../../../public/images/customer/signup/leftbar.svg'
import eyeIconSVG from '../../../public/images/customer/signup/eye.svg'
import eyeOpenIconSVG from '../../../public/images/customer/signup/eye-open.svg'
import tickIconSVG from '../../../public/images/customer/signup/tick.svg'
import { Dropdown, ProgressBar } from 'react-bootstrap'
import WeakPassImage from '../../../public/images/customer/signup/WeakPassword.svg'
import FairPassImage from '../../../public/images/customer/signup/FairPassword.svg'
import ProgressBarImage from '../../../public/images/customer/signup/ProgressBar.svg'
import ProgressBarGreyImage from '../../../public/images/customer/signup/ProgressBar-Grey.svg'
import Ellipse from '../../../public/images/customer/signup/Ellipse.svg'
import EllipseGrey from '../../../public/images/customer/signup/Ellipse-Grey.svg'
import SuccessModal from '@apps/customer/modules/customer/shared/modal/SuccessModal'
import { ModalService } from '@nft-marketplace/modal'
import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'
import { objectDeepClone, validateForm } from '@apps/customer/utils/helper'
import API from '@apps/customer/api/customer/index'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const ImageContainer = styled.div`
  width: 50%;
  background-image: url('/images/customer/signup/signup.png');
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
    background-image: url('/images/customer/signup/signup-mobile.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 425px) {
    min-height: 844px;
    &.long-bg {
      min-height: 1100px;
    }
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
const StyledPhoneInput = styled(PhoneInput)`
  margin-bottom: 1.5rem;
  .my-class {
    &:focus {
      //border: 1.5px solid #2a7575;
      background: #f4f9f9;
      outline: none;
    }
    // color: #cacece;
    color: #000;
    font-size: 1.6rem;
    border: 1.5px solid #d1e0e2;
    padding: 1rem 5rem;
    width: 45.9rem;
    height: 5.2rem;

    .react-tel-input {
      .flag-dropdown {
        &:focus-within {
          border-color: #2a7575;
          outline: none;
          background: #f4f9f9;
        }
      }
      &:focus-within {
        border-color: #2a7575;
        outline: none;
        background: #f4f9f9;
      }
    }

    @media only screen and (max-width: 425px) {
      width: 296px;
    }
    @media only screen and (max-width: 320px) {
      width: 270px;
    }
  }
`

const TwoStepsImages = styled.div`
  margin-bottom: 1rem;
  display: flex;
  margin-left: -2%;
  cursor: pointer;
  width: 46rem;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media only screen and (max-width: 425px) {
    width: 296px;
  }
  @media only screen and (max-width: 320px) {
    width: 270px;
  }
  img {
    @media (max-width: 2678px) {
      width: 430px !important;
    }
    @media (max-width: 2560px) {
      width: 410px !important;
    }
  }
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
  align-items: center;
  line-height: 1.8rem;
  align-self: center;
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
    width: 296px;
    overflow: hidden;
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

const FormFooterStep2 = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: #4e4e4e;
  font-weight: 400;
  width: 46rem;
  font-family: Poppins;
  p {
    font-size: 1.6rem;
    color: #2a7575;
    font-family: Poppins;
    cursor: pointer;
    margin-left: 0.5rem;
    display: inline;
  }
  @media only screen and (max-width: 425px) {
    p {
      font-size: 1.3rem;
    }
    font-size: 1.3rem;
    width: 294px;
  }
  @media only screen and (max-width: 320px) {
    p {
      font-size: 1.2rem;
      margin-left: 0.5rem;
    }
    font-size: 1.2rem;
    width: 270px;
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

const StyledFormInput = styled.input`
  &:focus {
    border: 1.5px solid #2a7575;
    background: #f4f9f9 !important;
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
    -webkit-text-fill-color: #cacece !important;
    transition: #fff 5000s ease-in-out 0s;
    background-color: white !important;
  }
  &:focus {
    border: 1.5px solid #2a7575;
    background: #f4f9f9;
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
  &.errors {
    margin: 0;
  }
`
const UsernameInfo = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  &.green {
    color: green;
  }
  &.red {
    color: red;
  }
`
const SuccessMessage = styled.p`
  color: green;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: -1rem;
  align-self: flex-start;
`

const List = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.8rem;
  letter-spacing: -0.24px;
  color: #4f525d;
`

const ListItem = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #4f525d;
  margin-left: 2.5rem;
  display: flex;
  align-items: center;
  height: 2rem;
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
  .input-wrapper {
    input {
      margin: 0 0 4px 0;
    }
    margin-bottom: 2rem;
  }
  @media only screen and (max-width: 425px) {
    margin-bottom: 4rem;
  }
  .grid-2fr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    input {
      width: 100%;
    }
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.7rem;
  margin-bottom: 0.3rem;
  width: 46rem;
  @media only screen and (max-width: 425px) {
    width: 294px;
    margin-top: 2.4rem;
    margin-bottom: 1.4rem;
  }
  @media only screen and (max-width: 320px) {
    width: 270px;
  }
`

const CheckboxInput = styled.input`
  border: 1.5px solid #2a7575;
  border-radius: 3px;
  width: 1.689rem;
  height: 1.6rem;
`

const CheckboxLabel = styled.label`
  color: #2a7575;
  font-size: 1.6rem;
  font-weight: 400;
  margin-left: 0.811rem;
  width: max-content;
  font-family: Poppins;
`

const EyeIcon = styled.span`
  position: absolute;
  top: 60%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
`
const StyledDropdown = styled(Dropdown)`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: max-content;
  padding: 2.4rem 3.2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  width: 46rem;
  @media only screen and (max-width: 425px) {
    width: 294px;
  }
`
const ProgressBarImageDiv = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`
const StyledImage = styled(Image)`
  margin-left: -0.3rem !important;
`
const StepOne = ({ formData, setFormData, handleNext, phoneNumber, setPhoneNumber, handleTabClick, step }) => {
  const [errors, setErrors] = useState<any>({})
  const [showErrors, setShowErrors] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [mobileError, setMobileError] = useState('')

  const formValidation = {
    firstName: '',
    lastName: '',
    userName: "min:4",
  }

  let notRequired = ['confirmPassword', 'email', 'isChecked', 'password']

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await validateForm(formData, formValidation, notRequired)
    const mobileResult = await validatePhone()
    console.log('handleValidate', result, mobileResult, result === true && mobileResult === true)
    setShowErrors(true)
    if (result === true && mobileResult === true && usernameAvailable) {
      setErrors({})
      handleNext()
    } else {
      setErrors(result)
    }
  }

  const handleOnChange = (e: any) => {
    let { name, value, files, checked } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleMobileChange = (value, country) => {
    const phoneNumWithoutDialCode = value.split(country.dialCode)[1]
    let val = objectDeepClone(value)
    if('+'+country?.dialCode !== formData?.countryCode) {
      val = country?.dialCode
    }
    setPhoneNumber(val)
    setFormData({ ...formData, phone: val, countryCode: '+' + country.dialCode })
    if('+'+country?.dialCode !== formData?.countryCode) {
      setMobileError('')
      return
    }
    if (!value) {
      setMobileError('Please enter your mobile number')
    } else if (value) {
      const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/
      if (phoneRegex.test(value)) {
        setMobileError('')
      } else {
        setMobileError('Invalid Mobile Number')
      }
    } else {
      setMobileError('')
    }
  }

  const validatePhone = () => {
    let hasError = false
    // if (!formData.userName) {
    //   setNameError('Please enter your first name')
    //   hasError = true
    // } else if (formData.userName) {
    //   const nameValidator = new RegExp('^[a-zA-Z0-9_ ]{3,25}$')
    //   if (nameValidator.test(formData.userName)) {
    //     setNameError('')
    //   } else {
    //     if (formData.userName.length < 3 || formData.userName.length > 25) {
    //       setNameError('First name must be between 3 to 25 characters')
    //     } else {
    //       setNameError('Only letters digits and underscore should be allowed')
    //     }
    //     hasError = true
    //   }
    // } else {
    //   setNameError('')
    // }
    if (!formData.phone) {
      setMobileError('Please enter your mobile number')
      hasError = true
    } else if (formData.phone) {
      const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/
      if (phoneRegex.test(formData.phone)) {
        setMobileError('')
      } else {
        setMobileError('Invalid Mobile Number')
        hasError = true
      }
    } else {
      setMobileError('')
    }
    if (hasError == false) {
      return true
    }
    return !hasError
  }

  console.log('formData', formData, errors)

  useEffect(() => {
    if(formData?.userName?.length > 3) {
      let payload = {
        userName: formData.userName
      }
      API.verifyUserName(payload)
      .then(res => {
        console.log('res', res)
        if(res?.status === 200 && res?.data?.data?.userNameTaken) {
          setUsernameAvailable(false)
        } else {
          setUsernameAvailable(true)
        }
      })
      .catch(err => {
        console.log('err', err)
      })
    }
  },[formData.userName])

  useEffect(() => {
    ;(async () => {
      if (showErrors) {
        const result = await validateForm(formData, formValidation, notRequired)
        if (result == true) {
          setErrors({})
        } else {
          setErrors(result)
        }
      }
    })()
  }, [formData])

  return (
    <>
      <FormContainer>
        <TwoStepsImages>
          <a onClick={() => handleTabClick(1)}>
            <Image src={LeftBar} />
            Step 1
          </a>
          <a onClick={() => handleTabClick(2)}>
            <Image src={RightBar} />
            Step 2
          </a>
        </TwoStepsImages>
        <FormHeading>
          Sign Up<p>Enter your basic details here</p>
        </FormHeading>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
        >
          <FormInputContainer>
            <div className='grid-2fr'>
              <div>
                <FormLabel>First Name:</FormLabel>
                <StyledFormInput type="text" name={`firstName`} value={formData.firstName} onChange={handleOnChange} />
                {errors?.firstName && <ErrorMessage>{errors?.firstName}</ErrorMessage>}
              </div>
              <div>
                <FormLabel>Last Name:</FormLabel>
                <StyledFormInput type="text" name={`lastName`} value={formData.lastName} onChange={handleOnChange} />
                {errors?.lastName && <ErrorMessage>{errors?.lastName}</ErrorMessage>}
              </div>
            </div>
            <div className='input-wrapper'>
              <FormLabel>Username:</FormLabel>
              <StyledFormInput type="text" name={`userName`} value={formData.userName} onChange={handleOnChange} />
              <div className='d-flex-aic-jcsb'>
                <ErrorMessage className='errors'>{errors?.userName}</ErrorMessage>
                {formData?.userName?.length > 3 ? <UsernameInfo className={usernameAvailable ? 'green' : 'red'}>{usernameAvailable ? 'Username is available' : 'Username already taken'}</UsernameInfo> : null}
              </div>
            </div>
            <FormLabel>Mobile Number:</FormLabel>
            <StyledPhoneInput
              country={'sg'}
              value={formData.phone}
              countryCodeEditable={false} 
              onChange={(value, country) => handleMobileChange(value, country)}
              inputClass="my-class"
              enableSearch
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            {mobileError && <ErrorMessage>{mobileError}</ErrorMessage>}
          </FormInputContainer>
          <ButtonContainer>
            <Button>Next</Button>
          </ButtonContainer>
        </form>
        <FormFooter>
          Already have an account?{' '}
          <Link href={'/base/signin'}>
            <p>Sign In</p>
          </Link>
        </FormFooter>
      </FormContainer>
    </>
  )
}
const StepTwo = ({ formData, setFormData, handleSignUp, phoneNumber, setPhoneNumber, handleTabClick, step }) => {
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showStrength, setShowStrength] = useState(false)
  const [totalScore, setTotalScore] = useState(false)
  const inputRef = useRef(null)

  const [showTick, setShowTick] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
    if (totalScore) {
      setShowTick(true)
      setTimeout(() => {
        setShowTick(false)
      }, 2000)
    }
  }

  useEffect(() => {
    // if (inputRef.current) {
    //   inputRef.current.focus()
    //   inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    // }
    const email = document.getElementById("email");
    if(email) email.focus();
    setTotalScore(false)
  }, [])

  const handleDivClick = () => {
    setShowStrength((prevShowStrength) => !prevShowStrength)
    // setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  // const toggleShowPassword = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword)
  // }
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)
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
    if (e.target.value.length > 0) {
      setShowStrength(true)
    } else {
      setShowStrength(false)
    }
    if (!e.target.value) {
      setPasswordError('Please enter a password')
      setConfirmPasswordError('')
      setTotalScore(false)
    } else if (e.target.value) {
      const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
      if (passwordValidator.test(e.target.value)) {
        setPasswordError('')
      } else {
        setPasswordError('Invalid password')
        setConfirmPasswordError('')
        setTotalScore(false)
      }
    } else {
      setPasswordError('')
    }

    if (formData.confirmPassword) {
      if (e.target.value) {
        if (e.target.value !== formData.confirmPassword) {
          setConfirmPasswordError('Passwords do not match')
          setConfirmPasswordSuccess('')
        } else if (e.target.value == formData.confirmPassword) {
          setConfirmPasswordSuccess('Password Matched!')
          setConfirmPasswordError('')
        } else {
          setConfirmPasswordError('')
        }
      } else {
        setPasswordError('Please enter a password')
        setConfirmPasswordSuccess('')
      }
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setFormData({ ...formData, confirmPassword: e.target.value })
    if (!e.target.value) {
      setConfirmPasswordError('Please confirm your password')
      setConfirmPasswordSuccess('')
    } else if (formData.password !== e.target.value) {
      setConfirmPasswordError('Passwords do not match')
      setConfirmPasswordSuccess('')
    } else if (formData.password == e.target.value) {
      setConfirmPasswordSuccess('Password Matched!')
      setConfirmPasswordError('')
    } else {
      setConfirmPasswordError('')
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
      setTotalScore(false)
      hasError = true
    } else if (formData.password) {
      const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
      if (passwordValidator.test(formData.password)) {
        setPasswordError('')
      } else {
        setPasswordError('Invalid password')
        setTotalScore(false)
      }
    } else {
      setPasswordError('')
    }

    if (!formData.confirmPassword) {
      setConfirmPasswordError('Please confirm your password')
      setConfirmPasswordSuccess('')
      hasError = true
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      setConfirmPasswordSuccess('')
      hasError = true
    } else if (formData.password == formData.confirmPassword) {
      setConfirmPasswordSuccess('Password Matched!')
      setConfirmPasswordError('')
    } else {
      setConfirmPasswordError('')
    }
    return !hasError
  }

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isChecked: e.target.checked })
  }

  const PasswordStrengthIndicator = ({ password }) => {
    const [weakIndicator, setWeakIndicator] = useState(false)
    const [mediumIndicator, setMediumIndicator] = useState(false)
    const [strongIndicator, setStrongIndicator] = useState(false)
    const scorePassword = (pass) => {
      let score = 0
      if (!pass) return score

      // award every unique letter until 5 repetitions
      const letters = {}
      for (let i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1
        score += 5.0 / letters[pass[i]]
      }

      // bonus points for mixing it up
      const variations = {
        length: pass.length == 8,
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
      }

      let variationCount = 0
      for (const check in variations) {
        variationCount += variations[check] ? 1 : 0
      }
      score += (variationCount - 1) * 20

      return Math.round(score)
    }

    const getScoreText = (score) => {
      if (totalScore !== false) {
        setTotalScore(false)
      }
      if (PasswordLetterValidityText == true && PasswordSymbolValidityText == true && PasswordLengthValidityText == true) {
        if (password.length > 8) {
          if (strongIndicator !== true) {
            setStrongIndicator(true)
            setMediumIndicator(true)
            setWeakIndicator(true)
          }
          return 'Strong'
        } else if (PasswordLetterValidityText == true && PasswordSymbolValidityText == true && PasswordLengthValidityText == true) {
          if (mediumIndicator !== true) {
            setMediumIndicator(true)
            setWeakIndicator(true)
          }
          return 'Fair'
        }
      } else {
        if (weakIndicator !== true) {
          setWeakIndicator(true)
        }
        return 'Weak'
      }
    }

    const getPasswordLengthValidityText = () => {
      if (password.length < 8) {
        return '  Minimum 8 characters'
      } else {
        return true
      }
    }
    const getPasswordLetterValidityText = () => {
      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return 'Upper & lower case letters'
      } else {
        return true
      }
    }
    const getPasswordSymbolValidityText = () => {
      if (!/\W/.test(password) || !/\d/.test(password)) {
        return 'A symbol and a number'
      } else {
        return true
      }
    }

    const PasswordLengthValidityText = getPasswordLengthValidityText()
    const PasswordLetterValidityText = getPasswordLetterValidityText()
    const PasswordSymbolValidityText = getPasswordSymbolValidityText()
    const scoreValue = scorePassword(password)
    const scoreText = getScoreText(scoreValue)
    const progressValue = Math.min(scoreValue, 100)

    if (PasswordLetterValidityText == true && PasswordSymbolValidityText == true && PasswordLengthValidityText == true) {
      setTotalScore(true)
    }

    const PasswordIndicatorStyles = {
      fontWeight: '800',
      fontSize: '1.6rem',
      lineHeight: '2.2rem',
      display: 'flex',
      alignItems: 'center',
      color: '#0f1016',
      marginBottom: '1rem',
    }
    return (
      <>
        <p style={PasswordIndicatorStyles}>{scoreText} Password</p>
        <ProgressBarImageDiv>
          {password.length > 0 && weakIndicator === true && mediumIndicator === false && strongIndicator === false ? (
            <>
              <StyledImage src={WeakPassImage} />
              <StyledImage src={WeakPassImage} />
              <StyledImage src={ProgressBarGreyImage} />
              <StyledImage src={ProgressBarGreyImage} />
              <StyledImage src={ProgressBarGreyImage} />
            </>
          ) : mediumIndicator === true && weakIndicator === true && strongIndicator === false ? (
            <>
              <StyledImage src={FairPassImage} />
              <StyledImage src={FairPassImage} />
              <StyledImage src={FairPassImage} />
              <StyledImage src={FairPassImage} />
              <StyledImage src={ProgressBarGreyImage} />
            </>
          ) : strongIndicator === true && weakIndicator === true && mediumIndicator === true ? (
            <>
              <StyledImage src={ProgressBarImage} />
              <StyledImage src={ProgressBarImage} />
              <StyledImage src={ProgressBarImage} />
              <StyledImage src={ProgressBarImage} />
              <StyledImage src={ProgressBarImage} />
            </>
          ) : (
            <>
              <StyledImage src={ProgressBarGreyImage} />
              <StyledImage src={ProgressBarGreyImage} />
              <StyledImage src={ProgressBarGreyImage} />
              <StyledImage src={ProgressBarGreyImage} />
              <StyledImage src={ProgressBarGreyImage} />
            </>
          )}
        </ProgressBarImageDiv>
        <List>
          It’s better to have:
          <ListItem>{PasswordLetterValidityText == true ? <Image src={EllipseGrey} /> : <Image src={Ellipse} />} &nbsp; Upper & lower case letters</ListItem>
          <ListItem> {PasswordSymbolValidityText == true ? <Image src={EllipseGrey} /> : <Image src={Ellipse} />} &nbsp; A symbol and a number</ListItem>
          <ListItem>{PasswordLengthValidityText == true ? <Image src={EllipseGrey} /> : <Image src={Ellipse} />} &nbsp; Minimum 8 characters</ListItem>
        </List>
      </>
    )
  }

  return (
    <FormContainer>
      <TwoStepsImages>
          <a onClick={() => handleTabClick(1)}>
            <Image src={RightBar} />
            Step 1
          </a>
          <a onClick={() => handleTabClick(2)}>
            <Image src={LeftBar} />
            Step 2
          </a>
        </TwoStepsImages>
      <FormHeading>
        Sign Up<p>Create your password here</p>
      </FormHeading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleValidate()
          handleSignUp()
        }}
      >
        <FormInputContainer>
          <FormLabel>Email Address:</FormLabel>
          <FormInput type="email" id="email" autoComplete="new-password" value={formData.email} onChange={handleEmailChange} />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <div style={{ position: 'relative', width: '100% ' }} onClick={handleDivClick}>
            <FormLabel>Password:</FormLabel>
            <FormInput ref={inputRef} autoComplete="new-password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handlePasswordChange} />
            {/* <EyeIcon onClick={toggleShowPassword}>{totalScore ? <Image src={tickIconSVG} alt="Tickmark" /> : <Image src={eyeIconSVG} alt="ICO" />}</EyeIcon> */}
            <EyeIcon onClick={toggleShowPassword}>{showTick ? <Image src={tickIconSVG} alt="Tickmark" /> : showPassword ? <Image src={eyeOpenIconSVG} alt="ICO" /> : <Image src={eyeIconSVG} alt="ICO" />}</EyeIcon>
          </div>
          {showStrength && (
            <StyledDropdown show={showStrength} onToggle={setShowStrength}>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <PasswordStrengthIndicator password={formData.password} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </StyledDropdown>
          )}
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <div style={{ position: 'relative', width: '100% ' }}>
            <FormLabel>Confirm Password:</FormLabel>
            <FormInput type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleConfirmPasswordChange} />
            <EyeIcon onClick={toggleShowConfirmPassword}>{showConfirmPassword ? <Image src={eyeOpenIconSVG} alt="ICO" /> : <Image src={eyeIconSVG} alt="ICO" />}</EyeIcon>
          </div>
          {confirmPasswordSuccess && <SuccessMessage>{confirmPasswordSuccess}</SuccessMessage>}
          {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}
        </FormInputContainer>
        <ButtonContainer>
          <Button>Sign Up</Button>
        </ButtonContainer>
        {/* <FormInputContainer> */}
        <CheckboxContainer>
          <CheckboxInput type="checkbox" checked={formData.isChecked} onChange={handleCheckboxChange} />
          <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
        </CheckboxContainer>
        <FormFooterStep2>
          Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
          <Link href={'/base/privacyPolicy'}>
            <p>Privacy Policy.</p>
          </Link>
        </FormFooterStep2>
        {/* </FormInputContainer> */}
      </form>
    </FormContainer>
  )
}

const SignUpForm = () => {
  const [step, setStep] = useState(1)

  const handleTabClick = (stepNumber) => {
    if(stepNumber === 2) {
      if (formData.userName?.length && formData.phone?.length && formData.firstName?.length && formData.lastName?.length) {
        setStep(stepNumber)
      }
    } else {
      setStep(stepNumber)
    }
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    countryCode: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    isChecked: '',
  })

  const handleNext = () => {
    setStep(step + 1)
  }
  const goToLogin = () => {
    router.push('/base/signin')
  }
  const [phoneNumber, setPhoneNumber] = useState('')
  const router = useRouter()
  const handleSignUp = async () => {
    let number = formData.countryCode?.length
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      countryCode: formData.countryCode,
      phone: phoneNumber.slice(number-1),
      email: formData.email,
      password: formData.password,
    }
    if (formData.isChecked) {
      const res = await accountService.registerUser(data)
      if (res.status == 200) {
        // toast.success(res.data.message, {
        //   toastId: 'SignUpSuccessToast',
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 1500,
        // })
        // setTimeout(() => {
        //   router.push('/base/signin')
        // }, 2000)
        ModalService.open(
          (modalProps: any) => (
            <SuccessModal
              close={() => {
                modalProps.close()
                goToLogin()
              }}
              title={'Thank you for signing up'}
              desc={
                <>
                  <p style={{ fontSize: ' 1.4rem', lineHeight: '2.2rem' }}>
                    The email verification link has been sent to your email.
                    <br />
                    <b style={{ color: '#000', fontWeight: '600' }}>Note:</b>&nbsp;
                    Please check your spam folder if email was not received
                  </p>
                </>
              }
            />
          ),
          { closeIcon: false }
        )
      } else if (res.status == 400 || res.status == 401 || res.status == 500 || res.status == 404 || res.status == 412) {
        toast.error(res?.error?.error?.message, {
          toastId: 'SignUpToast',
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
      if(res?.error?.error?.message === 'Email ID already in use') {
        setTimeout(() => router.push('/base/signin'), 5000)
      }
      // console.log('res', res?.error?.error?.message === 'Email ID already in use')
    } else {
      toast.error('Please accept the terms and conditions if you want to proceed', {
        toastId: 'TermandconditionToast',
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
      <ImageContainer className={step === 1 ? '' : 'long-bg'}>
        <img src="/images/customer/signup/Logo.png" alt="ICO" onClick={() => router.push('/')} />
      </ImageContainer>
      {step === 1 && <StepOne formData={formData} setFormData={setFormData} handleNext={handleNext} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} handleTabClick={handleTabClick} step={step} />}
      {step === 2 && <StepTwo formData={formData} setFormData={setFormData} handleSignUp={handleSignUp} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} handleTabClick={handleTabClick} step={step} />}
    </Container>
  )
}

export default SignUpForm
