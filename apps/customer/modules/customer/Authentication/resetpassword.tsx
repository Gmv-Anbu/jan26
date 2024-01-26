import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import accountService from '../../../api/customer/UserService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Router, useRouter } from 'next/router'
import Image from 'next/image'
import eyeIconSVG from '../../../public/images/customer/signup/eye.svg'
import eyeOpenIconSVG from '../../../public/images/customer/signup/eye-open.svg'
import tickIconSVG from '../../../public/images/customer/signup/tick.svg'
import { Dropdown, ProgressBar } from 'react-bootstrap'
import ProgressBarImage from '../../../public/images/customer/signup/ProgressBar.svg'
import ProgressBarGreyImage from '../../../public/images/customer/signup/ProgressBar-Grey.svg'
import Ellipse from '../../../public/images/customer/signup/Ellipse.svg'
import EllipseGrey from '../../../public/images/customer/signup/Ellipse-Grey.svg'
import WeakPassImage from '../../../public/images/customer/signup/WeakPassword.svg'
import FairPassImage from '../../../public/images/customer/signup/FairPassword.svg'

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
      height: 135px;
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
    min-height: 750px;
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
const SuccessMessage = styled.p`
  color: green;
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

const EyeIcon = styled.span`
  position: absolute;
  top: 60%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
`
const ProgressBarImageDiv = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`
const StyledImage = styled(Image)`
  margin-left: -0.3rem !important;
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
`

const ForgotPassword = ({ formData, setFormData, handleResetPassword }) => {
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
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    }
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
  const handlePasswordChange = (e) => {
    if (e.target.value.length > 0) {
      setShowStrength(true)
    } else {
      setShowStrength(false)
    }
    if(formData?.confirmPassword?.length) {
      if (e.target.value !== formData?.confirmPassword) {
        setConfirmPasswordError('Passwords do not match')
        setConfirmPasswordSuccess('')
      } else {
        setConfirmPasswordSuccess('Password Matched!')
        setConfirmPasswordError('')
      }
    }
    setFormData({ ...formData, password: e.target.value })
    if (!e.target.value) {
      setPasswordError('Please enter a password')
      setConfirmPasswordSuccess('')
    } else if (e.target.value) {
      const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
      if (passwordValidator.test(e.target.value)) {
        setPasswordError('')
      } else {
        setPasswordError('Invalid password')
        setConfirmPasswordSuccess('')
      }
    } else {
      setPasswordError('')
      setConfirmPasswordSuccess('')
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
    } else {
      setConfirmPasswordSuccess('Password Matched!')
      setConfirmPasswordError('')
    }
  }

  const handleValidate = () => {
    let hasError = false
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

    if (!formData.confirmPassword) {
      setConfirmPasswordError('Please confirm your password')
      hasError = true
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      hasError = true
    } else {
      setConfirmPasswordError('')
    }

    return !hasError
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
      <FormHeading>
        Reset Password<p>Setup your new password!</p>
      </FormHeading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleValidate()
          handleResetPassword()
        }}
      >
        <FormInputContainer>
          <div style={{ position: 'relative', width: '100% ' }} onClick={handleDivClick}>
            <FormLabel>Password:</FormLabel>
            <FormInput ref={inputRef} type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handlePasswordChange} />
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
          <Button>Save</Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  )
}

const ResetPassword = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const handleResetPassword = async () => {
    const data = {
      token: router.query.token,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }
    if (data) {
      const res = await accountService.resetPassword(data)
      if (res.status == 200) {
        toast.success(res.data.message, {
          toastId: 'resetSuccessToast',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          style: {
            fontSize: '1.6rem',
          },
        })
        setTimeout(() => {
          router.push('/base/signin')
        }, 2000)
      } else if (res.status == 400 || res.status == 401 || res.status == 500 || res.status == 412 || res.status == 500) {
        toast.error(res?.error?.error?.message, {
          toastId: 'resetErrroToast',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            fontSize: '1.6rem',
          },
        })
      } else {
        toast.error('Something went wrong!.Please try again', {
          toastId: 'resetToast',
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
      <ForgotPassword formData={formData} setFormData={setFormData} handleResetPassword={handleResetPassword} />
    </Container>
  )
}

export default ResetPassword
