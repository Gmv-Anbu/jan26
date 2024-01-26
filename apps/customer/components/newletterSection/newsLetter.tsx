import React, { useEffect, useState } from 'react'
import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'
import { ButtonPrimary, ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import { ModalService } from '@nft-marketplace/modal'
import UserService from '@apps/customer/api/customer/UserService'
import { useRouter } from 'next/router'
import { Loader } from '@apps/customer/modules/shared/components/Loader'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'

const SuccessModal = dynamic(() => import('@apps/customer/modules/customer/shared/modal/SuccessModal'))
const ErrorModal = dynamic(() => import('@apps/customer/modules/customer/shared/modal/ErrorModal'))

const NewsletterWrap = styled.div`
  background: url('/images/customer/home/news-bg.webp') no-repeat center center;
  padding: 13.4rem 0;
  background-size: cover;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  &.auctions-news {
    padding: 8rem 0;
  }
  .reg-btn-box {
    margin-bottom: 3rem;
    text-align: center;
    button {
      font-size: 16px;
    }
  }
  h4 {
    margin-bottom: 8px;
    font-size: 60px;
    font-weight: 400;
    line-height: 62px;
    color: #FFFFFF;
    text-transform: uppercase;
  }
  h3 {
    margin-bottom: 8px;
    font-size: 50px;
    font-weight: 400;
    line-height: 62px;
    color: #FFFFFF;
    text-transform: uppercase;
  }
  a {
    color: #bdc0c0;
    font-size: 16px;
    font-weight: 600;
    margin: 1.4rem auto;
    display: block;
  }
  p {
    color: #bdc0c0 !important;
    max-width: 309px;
    margin: 0 auto 4.4rem;
  }
  div {
    position: relative;
    max-width: 660px;
    margin: auto;
    input {
      width: 100%;
      background: transparent;
      border: 1px solid #b3b9b9;
      font-size: 1.6rem;
      color: #fff;
      padding: 0 13.5rem 0 1.6rem;
      height: 5.6rem;
      &::-webkit-input-placeholder {
        /* Edge */
        color: #848a8b;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #848a8b;
      }
      &::placeholder {
        color: #848a8b;
      }
    }
    .btn-subscribe {
      background: ${({ theme }) => theme.colors.secondary};
      text-transform: uppercase;
      max-height: 5rem;
      position: absolute;
      right: 3px;
      border: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 1.6rem 3.4rem 1.6rem 4.6rem;
      color: #fff;
      font-size: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      :disabled {
        filter: blur(0.6px);
        cursor: not-allowed;
      }
      .loader {
        position: absolute;
      }
      &:hover {
        background: #29898b;
      }
    }
  }
  @media screen and (max-width: 798px) {
    padding: 85px 0 100px;
    h4, h3 {
      font-size: 3rem;
      line-height: 116%;
    }
    span {
      display: flex;
    }
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      font-size: 12px !important;
      line-height: 140% !important;
      letter-spacing: -0.011em !important;
    }
  }
  @media screen and (max-width: 500px) {
    div {
      min-width: 343px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      input {
        width: 100%;
        max-width: 343px;
        height: 50px;
        top: 0;
        font-size: 1.75rem;
      }
      .btn-subscribe {
        width: 100%;
        max-width: 343px;
        min-height: 50px;
        top: 65px;
        left: 0.05px;
        padding: 0;
        margin-top: 1.5rem;
        font-size: 1.75rem;
      }
    }
    form {
      width: 100%;
      .btn-subscribe {
        top: 25px;
        position: relative;
      }
    }
  }
  @media screen and (max-width: 374px) {
    div {
      min-width: 250px;
    }
  }
  @media screen and (max-width: 285px) {
    div {
      min-width: 150px;
    }
  }
  &.light-theme {
    background : #F4F9F9;
    h4 {
      font-size: 48px;
      font-weight: 600;
      line-height: 58px;
      color: #111727;
    }
    input {
      color: #A9A9A9;
    }
    p {
      margin-bottom: 40px;
    }
    @media screen and (max-width: 500px) {
      padding: 40px 0;
      h4, h3 {
        font-size: 24px;
        font-weight: 400;
        line-height: 28px;
        margin-bottom: 24px;
      }
      // form {
      //   position: relative;
      //   width: 100%;
      // }
      // button.btn-subscribe {
      //   width: 135px;
      //   top: 0;
      //   margin: 0;
      //   left: 50%;
      //   position: absolute;
      //   right: 0;
      //   transform: translateX(36px);
      // }
    }
  }
`
const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 1.4rem;
  visibility: visible;
  height: 1rem;
  display: flex;
  width: 100%;
  margin-top: 1rem;
  align-items: flex-start;
`

const Newsletter = (props) => {

  const { theme, desc, page } = props

  const router = useRouter()
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [email, setEmail] = useState<string>()
  const [showModal, setShowModal] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState()
  const dynamicRoute = useRouter().asPath
  const [error, setError] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  const openModal = () => setShowModal(true)
  const handler = (e) => {
    setEmail(e.target.value)
    setError(false)
  }
  useEffect(() => {
    setError(false)
    setEmail('')
  }, [dynamicRoute])
  const emailClickHandler = () => {
    setBtnLoading(true)
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      try {
        UserService.SubscribeToNewsletter(email).then((response) => {
          if (response?.data) {
            setSubscribeStatus(response?.data?.data)
            openModal()
            setError(false)
            setEmail('')
            ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Successfully subscribed to newsletter" />)
          }
          if (response?.error) {
            ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={response?.error?.error?.message || `Something went wrong. Please try later`} />)
            setEmail('')
          }
        })
      } catch (err) {
        console.log('err', err)
      }
      setTimeout(() => setBtnLoading(false), 3500)
    } else {
      setError(true)
      setTimeout(() => setBtnLoading(false), 500)
      setTimeout(() => setError(false), 3000000)
    }
  }
  return (
    <NewsletterWrap className={`${theme === 'light' ? 'light-theme' : ''} ${page === 'auctions' ? 'auctions-news' : ''}`}>
      <Container>
        {page === 'auctions' 
        ? <>
        {profileData?.id && profileData?.accessToken
        ? null 
        : <div className='reg-btn-box'>
          <ButtonPrimary onClick={() => router.push('/base/signup')}>Create your account now</ButtonPrimary>
        </div>}
        {/* <a href={`/files/fg-how-to-register.pdf`} target="_blank">
            (How to Register for Auction)
        </a> */}
        <h3>STAY CONNECTED!</h3>
        <p></p>
        </>
        : <>
        <h4>Follow Our Journey</h4>
        {/* {theme === 'light' 
        ? <p>
          <span className="text">Stay connected! <br></br> Get news on watches, events and offers</span>
        </p>
        : <p><span className="text">{desc ? desc : 'STAY CONNECTED!'}</span></p>} */}
        <p><span className="text">{desc ? desc : 'STAY CONNECTED!'}</span></p>
        </>}
        <div style={{ maxWidth: '570px' }}>
          <form onSubmit={emailClickHandler}>
            <input onInput={handler} value={email} type="email" id="email" placeholder="Enter your Email" />
            <ButtonPrimaryOutline disabled={btnLoading} onClick={emailClickHandler} className="btn-subscribe">
              {btnLoading && (
                <div className="loader">
                  <Loader width="40" opacity="0.5" />
                </div>
              )}
              Subscribe
            </ButtonPrimaryOutline>
          </form>
        </div>
        <Error>{error && <ErrorMsg>Enter valid email address</ErrorMsg>}</Error>
      </Container>
    </NewsletterWrap>
  )
}

export default Newsletter

const Error = styled.div`
  max-width: 570px !important;
`
