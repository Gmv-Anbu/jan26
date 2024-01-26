import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import UserService from '../../customer/api/customer/UserService'
import SuccessModal from '@apps/customer/modules/customer/shared/modal/SuccessModal'
import { ModalService } from '@nft-marketplace/modal'
import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'
import { AppDispatch, RootState } from '@apps/customer/redux/store'
import { getProfile } from '@apps/customer/redux/reducer/userSlice'
import { getCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '@apps/customer/utils/storage'
import useAuthConnect from '@apps/customer/modules/customer/shared/ConnectWallet/useAuthConnect'

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.fontcolor};
`
const ParaContainer = styled.p`
  margin-top: 2.5rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 25rem;
  line-height: 21px;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.colorD2};
`

const Div = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  max-width: 90%;
`

const Container = styled.div`
  width: 100%;
  padding: 9rem 0 25rem;
`
const VerifyEmail = () => {
  const router = useRouter()
  const { pageKey } = router.query
  const [content, setContent] = useState()
  const dispatch = useDispatch<AppDispatch>()
  const [contentName, setContentName] = useState()

  const goToHome = () => {
    router.push('/')
  }
  const goToLogin = () => {
    router.push('/base/signin')
  }
  useEffect(() => {
    const { token } = router.query
    const reqBody = { token }
    UserService.verifyEmail(reqBody)
      .then((res) => {
        if (res.error === null) {
          if (res?.data?.message.toLowerCase() === 'email verified successfully') {
            ModalService.open(
              (modalProps: any) => (
                <SuccessModal
                  close={() => {
                    modalProps.close()
                    goToLogin()
                  }}
                  descHeading={'Congratulations'}
                  buttonText={'Login'}
                  desc={
                    <>
                      <p>Your account has been verified. Proceed to login to your account with your credentials.</p>
                    </>
                  }
                />
              ),
              { closeIcon: false }
            )
          } else {
            ModalService.open(
              (modalProps: any) => (
                <SuccessModal
                  close={() => {
                    modalProps.close()
                    goToHome()
                  }}
                  title={'Email verification'}
                  desc={res?.data?.message || ''}
                />
              ),
              { closeIcon: false }
            )
          }
        } else {
          ModalService.open(
            (modalProps: any) => (
              <ErrorModal
                close={() => {
                  modalProps.close()
                  goToHome()
                }}
                title={'Error'}
                desc={res?.error?.error?.message || 'Something went wrong'}
              />
            ),
            { closeIcon: false }
          )
        }
      })
      .catch((err) => {
        console.log('errror', err)
      })
  }, [pageKey])

  return (
    <Container>
      <Div>
        <Title dangerouslySetInnerHTML={{ __html: contentName }}></Title>
        <ParaContainer dangerouslySetInnerHTML={{ __html: content }}></ParaContainer>
      </Div>
    </Container>
  )
}

export default VerifyEmail
