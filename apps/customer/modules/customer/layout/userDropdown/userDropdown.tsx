import React, { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ConfirmationModal from '../../shared/modal/ConfirmationModal/ConfirmationModal'
import accountService from '../../../../api/customer/UserService'
import ErrorModal from '../../shared/modal/error'
import SuccessModal from '../../shared/modal/success'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { getConfig } from '@apps/customer/utils/helper'

const ProfileAction = styled.div`
  flex: 0 0 50%;
  position: relative;
`
const ProfileThumbFlex = styled.div`
  align-items: center;
  display: flex;
  a {
    width: 2.4rem;
    height: 2.4rem;
    transition: transform 0.5s;
    &.rotate {
      transform: rotate(180deg);
    }
  }
`
const ArrowLink = styled.a`
  position: absolute;
  right: -30%;
  top: 25%;
  width: 2.4rem;
  height: 2.4rem;
  transition: transform 0.5s;
  cursor: pointer;
  &.rotate {
    transform: rotate(180deg);
  }
`

const ProfileImage = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  margin: 0 1rem 0 0;
  img {
    border-radius: 50% !important;
  }
`
const ProfileOptions = styled.ul`
  width: 21rem;
  background: ${({ theme }) => theme.colors.profileOptionsbg};
  border-radius: 1em;
  list-style: none;
  margin: 0;
  padding: 3rem;
  position: absolute;
  right: -16px;
  display: block;
  z-index: 999;
`
const DropdownLi = styled.li`
  margin-bottom: 1.6rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const Profilehref = styled.a`
  color: ${({ theme }) => theme.colors.profilehrefColor};
  text-decoration: none;
  display: grid;
  align-items: center;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.1rem;
  grid-template-columns: 1fr 4fr;
  img {
    padding-right: 1rem !important;
  }
  &.active {
    color: ${({ theme }) => theme.colors.fontprimary};
  }
`

interface IModalProps {
  status: boolean
  message: string
}

const UserDropdown = (props: any) => {
  const router = useRouter()
  const [url, setURL] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [errorModal, setErrorModal] = useState<IModalProps>({ status: false, message: '' })
  const [successModal, setSuccessodal] = useState<IModalProps>({ status: false, message: '' })
  const userConfig = useSelector<RootState, any>((state) => state?.userData?.userConfig)

  const ref = useRef<null>(null)
  const { disconnectWallet } = props
  const userData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const profilePicUrl = userData?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.profilePicUrl}` : '/images/customer/avatar.png'

  const [openMenu, setOpenMenu] = useState(false)
  useOnClickOutside(ref, () => setOpenMenu(false))

  const handleOptionClick = () => {
    setOpenMenu(false);
  }

  const applyForCreator = () => {
    if (!userData?.socialLinks || Object.keys(userData?.socialLinks).length === 0) {
      setErrorModal({ message: 'At least one social media link is mandatory for applying as creator', status: true })
      return false
    }
    accountService.applyForCreator().then((res) => {
      if (res?.status === 200) {
        setSuccessodal({ message: res?.data?.message || 'Success', status: true })
      } else {
        setErrorModal({ message: res?.error?.error?.message || 'Failed...!!', status: true })
      }
      setModal(false)
    })
  }

  useEffect(() => {
    if (router?.pathname) setURL(router?.pathname)
  }, [router])

  const closeErrorModal = () => {
    if (!userData?.socialLinks || Object.keys(userData?.socialLinks).length === 0) {
      router.push('/base/profile/settings')
      setModal(false)
    }
    setErrorModal({ status: false, message: '' })
  }

  const getCreatorConfig = useMemo(
    () => () => {
      const { permission } = getConfig(userConfig, 'creator')
      return permission
    },
    [userConfig]
  )




  return (
    <ProfileAction>
      <ConfirmationModal title={'Do you want to apply as Creator?'} show={modal} closeModal={() => setModal(false)} onConfirmation={applyForCreator} />
      <ErrorModal show={errorModal.status} msg={errorModal.message} closeModal={closeErrorModal} />
      <SuccessModal show={successModal.status} title={successModal.message} closeModal={() => setSuccessodal({ status: false, message: '' })} />
      <ProfileThumbFlex>
        <ProfileImage>
          <Image src={profilePicUrl} alt="Profile Image" width="56" height="56" />
        </ProfileImage>
      </ProfileThumbFlex>
      <div ref={ref}>
        <ArrowLink
          // href="javascript:;"
          className={openMenu ? 'rotate' : ''}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Image src="/svgs/profile-arrow-down.svg" alt="profile-arrow-down" width="24" height="24" />
        </ArrowLink>
        {openMenu ? (
          <ProfileOptions>
            <DropdownLi>
              <Link passHref href={`/base/profile`}>
                <Profilehref className={url.includes('/base/profile') ? 'active' : ''} onClick={handleOptionClick}>
                  <Icon name="profile" fill={url.includes('/base/profile') ? 'white' : ''} />
                  Profile
                </Profilehref>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link passHref href="/base/wallet">
                <Profilehref className={url.includes('/base/wallet') ? 'active' : ''} onClick={handleOptionClick}>
                  <Icon name="wallet" fill={url.includes('/base/wallet') ? 'white' : ''} />
                  My wallet
                </Profilehref>
              </Link>
            </DropdownLi>
            {userData?.role === 'creator' && (
              <DropdownLi>
                <Link passHref href="/base/creator">
                  <Profilehref className={url.includes('/base/creator') ? 'active' : ''} onClick={handleOptionClick}>
                    <Icon name="penTool" fill={url.includes('/base/creator') ? 'white' : ''} />
                    Add Your Artwork
                  </Profilehref>
                </Link>
              </DropdownLi>
            )}
            <DropdownLi>
              <Link passHref href="/base/earnings">
                <Profilehref className={url.includes('/base/earnings') ? 'active' : ''} onClick={handleOptionClick}>
                  <Icon name="earnings" fill={url.includes('/base/earnings') ? 'white' : ''} />
                  Earnings
                </Profilehref>
              </Link>
            </DropdownLi>
            {userData?.role === 'creator' && (
              <DropdownLi>
                <Link passHref href="/base/myCollection">
                  <Profilehref className={url.includes('/base/myCollection') ? 'active' : ''} onClick={handleOptionClick}>
                    <Icon name="collection" fill={url.includes('/base/myCollection') ? 'white' : ''} />
                    My Collections
                  </Profilehref>
                </Link>
              </DropdownLi>
            )}
            {getCreatorConfig() && userData?.role === 'user' && (
              <DropdownLi>
                <Profilehref className={modal ? 'active' : ''} onClick={() =>{handleOptionClick(); setModal(true)}} style={{ cursor: 'pointer' }} >
                  <Icon name="creator" fill={modal ? 'white' : ''} />
                  Apply As Creator
                </Profilehref>
              </DropdownLi>
            )}
            <DropdownLi>
              <Profilehref onClick={disconnectWallet} href="#">
                <Icon name="logout" />
                Logout
              </Profilehref>
            </DropdownLi>
          </ProfileOptions>
        ) : null}
      </div>
    </ProfileAction>
  )
}

export default UserDropdown

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
