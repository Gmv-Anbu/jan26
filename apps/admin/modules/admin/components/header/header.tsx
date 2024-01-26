import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { getCookie, removeCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '../../../../utils/storage'
import Login from '@apps/admin/pages/auth/login'
import auth from '@apps/admin/api/admin/auth'
import TYPES from '@apps/admin/redux/types/types'

import actions from '../../../../redux/actions/index'
import { APP_ENV } from '@apps/admin/config'

const AdminHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 3rem;
  align-items: center;
  height: 84px;
`
const PageTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: normal;
`
const HeaderNavigation = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: flex-end;
`
const NavLink = styled.div`
  margin: 0 1rem;
  list-style: none;
  text-align: center;
  border-radius: 1.5rem;
  &:hover {
    background: ${({ theme }) => theme.colors.navLinkHover};
  }
  &.user {
    padding: 0rem;
    &:hover {
      background: transparent;
    }
  }
`
const ProjectAnchor = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  &.btn {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.btnPrimary};
    display: inline-block;
    padding: 1rem 2rem 1rem 3rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: 30px;
    background-image: url(images/icon-plus.png);
    background-repeat: no-repeat;
    background-position: 25px center;
  }
`
const ProfileOptions = styled.ul`
  width: 15rem;
  background: ${({ theme }) => theme.colors.profileOptionsbg};
  border-radius: 1em;
  list-style: none;
  margin: 0;
  position: absolute;
  right: 1rem;
  display: block;
  padding: 0.5rem 0;
  z-index: 1;
  top: 5rem;
`
const DropdownLi = styled.li`
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const Profilehref = styled.a`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: Poppins;
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  img {
    padding-right: 1rem !important;
  }
`
const UserName = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  margin-left: 15px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    right: -10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 1px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
`
const ArrowLink = styled.a`
  margin: 0;
  padding: 0;
  transition: transform 0.5s;
  cursor: pointer;
  &.rotate {
    transform: rotate(180deg);
  }
`

const ProfileDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 4rem;
`

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  text-align: right;
  a {
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.colors.fontprimary};
  }
  gap: 1.2rem;
`
const ProfileImage = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  margin: 0 1.6rem 0 0;
  img {
    border-radius: 50% !important;
  }
`
const WalletTitle = styled.h4`
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.fontdark};
`
const ProfileImageWrapper = styled.div`
  border-radius: 100%;
`
const ProfileName = styled.a`
  color: ${({ theme }) => theme.colors.fontprimary};
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  cursor: pointer;
`

const AdminHeader = (props: any) => {
  const userData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const profilePicUrl = userData?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.profilePicUrl}` : '/images/admin/avatar.png'
  const isAuthenticated = useSelector<RootState, any>((state) => state?.userData?.isAuthenticated)
  const { pageTitle } = props
  const { logOutUser } = actions
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  const ref = useRef()
  const [openMenu, setOpenMenu] = useState(false)
  useOnClickOutside(ref, () => setOpenMenu(false))

  // const headerIcons = ['/svgs/adminHeader/notification.svg']
  const headerIcons = []

  const logoutUser = () => {
    dispatch(logOutUser(null)).then((res) => {
      router.push('/auth/login')
      removeCookie(KEYS.ADMIN_TOKEN)
      removeCookie(KEYS.ADMIN_USER)
    })
  }

  useEffect(() => {
    const id = getCookie(KEYS.ADMIN_ID)
    // auth.getProfile(id).then((profile) => {
    //   const userData = profile?.data?.data
    //   if (userData && userData.firstName) {
    //     dispatch({
    //       type: TYPES.USER_DETAILS,
    //       payload: profile.data?.data,
    //     })
    //   }
    // })
    // auth.getPermissionAdmin(id).then((permission) => {
    //   const permissionData = permission?.data?.data
    //   if (permissionData) {
    //     dispatch({
    //       type: TYPES.SET_PERMISSION,
    //       payload: permissionData,
    //     })
    //   }
    // })
  }, [])

  return (
    <AdminHeaderWrapper>
      <PageTitle>{pageTitle}</PageTitle>
      <HeaderNavigation>
        {headerIcons.map((icon, i) => {
          return (
            <NavLink key={i}>
              <ProjectAnchor href="#">
                <Image src={icon} alt={icon} width="22" height="22" />
                {/* <SpanOnline></SpanOnline> */}
              </ProjectAnchor>
            </NavLink>
          )
        })}

        <ProfileDropdownWrapper ref={ref}>
          <ProfileImage>
            <Image src={profilePicUrl} alt="Profile Image" width="56" height="56" />
          </ProfileImage>
          <ProfileDetail>
            {userData?.userName || userData?.walletAddress ? (
              // <Link passHref href={`${APP_ENV.CUSTOMER_WEB_URL}base/profile/${userData?.userName || userData?.walletAddress}`}>
                <ProfileName target="_blank">{userData?.firstName + ' ' + userData?.lastName}</ProfileName>
              // </Link>
            ) : null}
            <ArrowLink className={openMenu ? 'rotate' : ''} onClick={() => setOpenMenu(!openMenu)}>
              <Image src="/svgs/chevron-down.svg" alt="chevron-down" width="7" height="7" />
            </ArrowLink>
          </ProfileDetail>
          {openMenu ? (
            <ProfileOptions>
              <DropdownLi>
                <Link passHref href={`/editprofile/editprofile`}>
                  <Profilehref>
                    <Image src="/images/customer/profile-dropdown/profile.svg" alt="My Profile" width="15" height="15" color="#000000" /> Profile
                  </Profilehref>
                </Link>
                <Profilehref onClick={logoutUser}>
                  <Image src="/images/customer/profile-dropdown/logout.svg" alt="Logout" width="15" height="15" />
                  Logout
                </Profilehref>
              </DropdownLi>
            </ProfileOptions>
          ) : null}
        </ProfileDropdownWrapper>
      </HeaderNavigation>
    </AdminHeaderWrapper>
  )
}

export default AdminHeader

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
