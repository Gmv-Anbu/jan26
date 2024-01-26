import { ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import ClockImg from '../../public/images/customer/coming soon/clock.png'
import ClockImgMR from '../../public/images/customer/coming soon/clock-mr.png'
import logo from '../../public/images/customer/new-logo/logo-white.png'
import { useEffect, useState } from 'react'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import UserService from '@apps/customer/api/customer/UserService'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Meta from '@apps/customer/modules/shared/components/meta'

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: #000000;
  @media screen and (max-width: 480px) {
    min-height: 100vh;
  }
`
const ContentWrapper = styled.div`
  padding-top: 8rem;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left: 0%;
    bottom: 0%;
    background-image: url('/images/customer/coming soon/background-texture.webp');
    background-size: 100%;
    z-index: 4;
    @media screen and (max-width: 770px) {
      background: url('/images/customer/coming soon/background-texture-mr.png') no-repeat bottom;
      background-size: 100%;
    }
  }
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    bottom: 0;
    background: url('/images/customer/coming soon/background-gradient.webp') no-repeat bottom;
    background-size: 100%;
    z-index: 3;
    @media screen and (max-width: 770px) {
      background: url('/images/customer/coming soon/background-gradient-mr.png') no-repeat bottom;
      background-size: 100%;
    }
  }
  .Toastify {
    position: fixed;
    z-index: 1000000;
    .Toastify__toast {
      position: fixed;
      width: -webkit-fill-available;
      z-index: 1000000;
      border-radius: 4px;
      margin-right: 20px;
    }
  }
  @media screen and (max-width: 770px) {
    .Toastify {
      .Toastify__toast {
        margin: 20px;
      }
    }
  }
  @media screen and (max-width: 480px) {
    height: 100%;
    min-height: 100vh;
    justify-content: space-between;
  }
`
const ClockImageBox = styled.div`
  width: 100%;
  bottom: 0%;
  z-index: 4;
  margin-top: 6rem;
  .md-img {
    display: none;
  }
  .lg-img {
    display: block;
  }
  @media screen and (max-width: 770px) {
    .md-img {
      display: block;
    }
    .lg-img {
      display: none;
    }
  }
`
const Content = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 6% 0 0 0;
  z-index: 5;
  @media screen and (max-width: 1500px) {
    height: auto;
  }
  .headings {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    h1,
    p {
      font-style: normal;
      font-weight: 400;
      text-align: center;
    }
    h1 {
      font-size: 4rem;
      line-height: 130%;
      letter-spacing: 0.005em;
      text-transform: uppercase;
      background: linear-gradient(93.09deg, #ffffff 47.53%, rgba(255, 255, 255, 0.22) 106.7%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    p {
      font-size: 2rem;
      line-height: 2.7rem;
      letter-spacing: 0.01em;
      color: #e8e8e8;
    }
  }
  form {
    position: relative;
    max-width: 406px;
    .input-wrapper {
      margin: 0 0 30px;
      display: flex;
      position: relative;
    }
    input {
      width: 100%;
      background: transparent;
      border: 1px solid #737373;
      border-radius: 100px;
      color: #737373;
      padding: 2.5rem 16rem 2.6rem 3rem;
      height: 5.9rem;
      font-size: 14px;
      font-weight: 400;
      line-height: 30px;
      width: 406px;
      &::-webkit-input-placeholder {
        /* Edge */
        min-width: 170px;
        color: #737373;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        min-width: 170px;
        color: #737373;
      }
      &::placeholder {
        min-width: 170px;
        color: #737373;
      }
      &:focus-visible {
        outline: none;
      }
    }
    .red-border {
      border: 1px solid red;
    }
    button {
      background: ${({ theme }) => theme.colors.secondary};
      text-transform: uppercase;
      min-height: 4.9rem;
      min-width: 13.4rem;
      position: absolute;
      right: 0.5rem;
      border: 0;
      bottom: 0.5rem;
      padding: 1rem 3.2rem 0.9rem 3.3rem;
      font-style: normal;
      font-weight: 700;
      font-size: 1.4rem;
      color: #fff;
      background: linear-gradient(90.42deg, #16545d 7.09%, #1d2426 99.73%);
      border-radius: 100px;
      &:hover {
        background: #29898b;
      }
    }
  }
  @media screen and (max-width: 770px) {
    height: auto;
    padding: 20% 0 0 0;
    .headings {
      padding: 7rem 0 5rem 0;
      h1 {
        font-size: 40px;
        font-weight: 400;
        line-height: 52px;
        font-style: normal;
        font-size: 40px;
        font-weight: 400;
        line-height: 130%;
        letter-spacing: 0.005em;
      }
      p {
        font-weight: 400;
        font-size: 2.5rem;
      }
    }

    form {
      input {
        touch-action: none;
        font-size: 1.65rem !important;
        min-width: 300px;
        width: 100%;
        padding: 2.5rem 16rem 2.5rem 2.5rem;
      }
      button {
        font-size: 12px;
        padding: 1rem 2.2rem;
      }
    }
  }
  @media screen and (max-width: 480px) {
    form input {
      width: 300px;
      font-size: 14px !important;
      &:focus {
        font-size: 14px !important;
      }
    }
  }
`
const Logo = styled.figure`
  img {
    max-width: 206px !important;
    min-width: 206px !important;
    max-height: 53.77px;
    min-height: 53.77px;
    transition: 0.4s cubic-bezier(0, 0, 0.58, 1);
    @media screen and (max-width: 770px) {
      max-width: 210px !important;
      min-width: 210px !important;
    }
  }
`

const ErrorMessageBox = styled.span`
  position: absolute;
  color: red;
  width: fit-content;
  margin-top: 4px;
  line-height: 2.5rem;
  display: inline-block;
  left: 24px;
  bottom: -24px;
  font-size: 1.5rem;
`

const ComingSoon: any = () => {
  const [email, setEmail] = useState<string>()
  const [error, setError] = useState(false)
  const [name, setName] = useState<string>('')
  const [error2, setError2] = useState<any>(false)
  const [show, setShow] = useState<any>(false)
  const [loading, setLoading] = useState(false)

  const handleName = (e) => {
    const { value, name } = e?.target
    let pattern = /^(?![\s-])[\w\s-]+$/
    let val = pattern.test(value)
    if(val || !val && value?.length === 0) setName(value)
  }

  const inputChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const validate = () => {
    let nameV = false
    let emailV = false
    if(name.trim()?.length && name.trim()?.length < 3) {
      setError2('Name should be minimum 3 characters')
    } else if(name.trim()?.length > 24) {
      setError2('Name maximum characters limit is 24')
    } else {
      setError2(false)
      nameV = true
    }
    var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/
    console.log('pattern.test(email)', pattern.test(email)) 
    if(pattern.test(email)) {
      emailV = true
      setError(false)
    } else {
      setError(true)
      emailV = false
    }
    if(nameV && emailV) {
      return true
    } else {
      return false
    }
  }

  const emailClickHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setShow(true)
    let result = await validate()
    console.log('result', result)
    if (result) {
      try {
        let payload = { email : email }
        if(name?.length) payload['name'] = name
        UserService.AuctionInteresetedUser(payload)
        .then((response) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (response?.data) {
            Toast.success(response?.data?.data || 'Thanks, You will get notified')
          }
          if (response?.error?.error?.message === 'Already notified to admin') {
            Toast.info(response?.error?.error?.message)
          } else {
            Toast.error(response?.error?.error?.message || `Something went wrong. Please try later`)
          }
          setError(false)
          setError2(false)
          setEmail('')
          setName('')
          setShow(false)
          setLoading(false)
        })
      } catch (err) {
        setLoading(false)
        Toast.error(`Something went wrong`)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    (async () => {
      if (show) {    
        const result = await validate()
      }
    })()
  }, [name, email])

  return (
    <MainContainer>
      <Meta />
      <Header />
      <ContentWrapper>
        <Content>
          <Logo>
            <Link href={'/'}>
              <a>
                <Image src={logo} alt="ICO" width={205} height={50} />
              </a>
            </Link>
          </Logo>
          <div className="headings">
            <h1>COMING SOON!!</h1>
            <p>Be the first to know</p>
          </div>
          <form action="" method="post">
            <div className='input-wrapper'>
              <input value={name} onChange={handleName} type="text" className={error2 ? 'red-border' : ''}  placeholder="Enter name" />
              {show && <ErrorMessageBox>{error2}</ErrorMessageBox>}
            </div>
            <div className='input-wrapper'>
              <input value={email} onChange={inputChangeHandler} type="email" className={`mt-15 ${error ? 'red-border' : ''}`} id="email" placeholder="Enter email address" />
              <ButtonPrimaryOutline disabled={loading} onClick={emailClickHandler} className="btn-subscribe">
                Notify Me
              </ButtonPrimaryOutline>
              {show && error ? <ErrorMessageBox>{email?.length ? 'Enter valid email address' : 'Enter email address'}</ErrorMessageBox> : null}
            </div>
          </form>
        </Content>
        <ClockImageBox>
          <div className="lg-img">
            <Image src={ClockImg} alt={'ICO'} width={1920} height={446} layout="responsive" />
          </div>
          <div className="md-img">
            {' '}
            <Image src={ClockImgMR} alt={'ICO'} width={390} height={111} layout="responsive" />
          </div>
        </ClockImageBox>
        <ToastContainer />
      </ContentWrapper>
    </MainContainer>
  )
}

export default ComingSoon

ComingSoon.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
