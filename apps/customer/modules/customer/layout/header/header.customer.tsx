import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { providerNames, useWeb3Context } from '@nft-marketplace/wallet-selector'
import Icon from '../../../shared/components/icon/icon'
import { MetaMask } from '../../shared/ConnectWallet'
import { useHederaContext } from '@nft-marketplace/hedera-wallet-selector'

//End of testing
import SearchSuggestion from '../../shared/searchglobal/searchSuggestion'
import Menu from '../menu/menu.customer'
import useAuthConnect from '../../shared/ConnectWallet/useAuthConnect'
import UserDropdown from '../userDropdown/userDropdown'
import { APP_ENV } from '@apps/customer/config'
import { Container, Flex } from '@apps/customer/styles/CommonStyles'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import DropDown from '../../../../components/dropdown/dropdown'
import { authNavData, navData, navData2 } from '@apps/customer/data/header'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { KEYS } from '../../../../utils/storage'
import { getCookie, removeCookie } from '@nft-marketplace/js-cookie'
import path from 'path'
import mrLogo from '../../../../public/images/customer/home/Logo.png'
import blackLogo from '../../../../public/images/customer/home/black-logo.png'
import ConfirmationModal from '../../../customer/shared/modal/ConfirmationModalCustomer/confirmationModal'
import ProfileImg from '../../../../public/svgs/profile.svg'
import LogoutImg from '../../../../public/svgs/logout.svg'
import ProfileArrowImg from '../../../../public/svgs/profile-arrow.svg'
import UserService from '../../../../api/customer/UserService'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import { useLocation } from 'react-router-dom';
interface HeaderProps {
  isBgWhite?: boolean,
  windowValue?:any
}
const NavHeader = styled.header<HeaderProps>`
  .header {
    // padding: 1.5625rem 0;
    width: 100%;
    height: 12rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    background: ${(props) => (props.isBgWhite ? `#fff` : ((props?.windowValue=='/auctions') ? 'linear-gradient(#173b3e, #174347)':`linear-gradient(180deg, #152526 -21.79%, rgba(21, 37, 38, 0) 110.71%)`))};
    border-bottom: 1.5px solid #96ACAE;
    transition: 0.4s cubic-bezier(0, 0, 0.58, 1);
    @media screen and (max-width: 991px) {
      display: none;
    }
  }
  .hide-header {
    display: none;
  }
  .fixed-header {
    -webkit-box-shadow: 0 7px 7px 0 rgb(0 0 0 / 3%);
    box-shadow: 0 7px 7px 0 rgb(0 0 0 / 3%);
    background: #0e1818;
    // padding: 15px 0;
    img {
      max-width: 180px;
    }
  }
  .icon-wrapper {
    width: 15%;
    img {
      cursor: pointer;
    }
  }
  ul {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .drop-down-menu {
      position: relative;
      display: flex;
      justify-content: center;
      gap: 0 0.9rem;
      color: ${(props) => (props.isBgWhite ? '#0E1818' : '#fff')};
      text-transform: uppercase;
      cursor: pointer;
      span {
        color: #fff;
        &:active,
        &:hover {
          color: #2a7575;
        }
        .arrow-down {
          transition: all 0.2s;
          svg {
            transform: rotate(-90deg);
          }
        }
        .arrow-up {
          transition: all 0.2s;
          svg {
            transform: rotate(90deg);
          }
        }
      }
    }
    li {
      display: flex;
      align-items: center;
    }
  }

  @media screen and (max-width: 991px) {
    /* padding: 15px 0; */
    -webkit-box-shadow: 0 7px 7px 0 rgb(0 0 0 / 3%);
    box-shadow: 0 7px 7px 0 rgb(0 0 0 / 3%);
  }
`

const Logo = styled.figure`
  width: 15%;
  img {
    max-width: 205px !important;
    transition: 0.4s cubic-bezier(0, 0, 0.58, 1);
    position: relative;
    top: 1px !important;
  }
  @media screen and (max-width: 1499px) {
    img {
      max-width: 160px;
      max-height: 25px;
    }
  }
  @media screen and (max-width: 991px) {
    min-width: 133px !important;
    min-height: 35px !important;
    padding: 15px 0;
    img {
      top: 12px !important;
      margin: 0 0 15px 0 !important;
      min-width: 133px !important;
      min-height: 25px !important;
    }
  }
  @media screen and (max-width: 458px) {
    padding: 0;
    img {
      top: 1px !important;
      margin: 0px 0 8px 0 !important;
      min-width: 133px !important;
      min-height: 25px !important;
    }
  }
`

const NavInnerHeader = styled.div`
  height: 100%;
  width: 70%;
  // width: 65%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1199px) {
    flex-wrap: nowrap;
    width: 60%;
  }
  @media screen and (max-width: 991px) {
    margin-top: 78px;
    display: none;
    position: fixed;
    max-width: 100%;
    top: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow: auto;
    opacity: 0;
    z-index: 3;
    padding: 5% 40px 71px;
    transition: all ease-in-out 0.3s;
    -o-transition: all ease-in-out 0.3s;
    -webkit-transition: all ease-in-out 0.3s;
    -webkit-transform: scaleY(0);
    -ms-transform: scaleY(0);
    transform: scaleY(0);
    -webkit-transition: opacity 0.3s ease-in, transfrom 0.3s ease-out;
    -o-transition: opacity 0.3s ease-in, transfrom 0.3s ease-out;
    transition: opacity 0.3s ease-in, transfrom 0.3s ease-out;
    background: linear-gradient(184.57deg, #051936 18.97%, #023082 96.19%);
  }
`

const NavContent = styled.nav<HeaderProps>`
  height: 100%;

  @keyframes move-right-to-left {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  @keyframes move-left-to-right {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  ul li {
    position: relative;
    height: 100%;
    padding: 0 2rem;
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.035em;
    &::before {
      content: '';
      position: absolute;
      transition: transform 0.5s ease;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(64, 185, 185, 1), rgba(64, 185, 185, 0));
      transform: scaleX(0);
    }
    &:hover:before {
      transform: scaleX(1);
    }
    &.nav-active:before {
      transform: scaleX(1);
    }
    a {
      color: ${(props) => (props.isBgWhite ? '#0E1818' : '#fff')};
      text-transform: uppercase;
    }
  }
  .nav-active {
    font-weight: 600;
  }
  @media screen and (max-width: 1300px) {
    ul {
      flex-wrap: nowrap;
      li {
        font-size: 12px;
        padding: 0 12px;
      }
    }
  }
  @media screen and (max-width: 991px) {
    ul {
      flex-direction: column;
      li {
        padding: 15px 0;
        a {
          color: #fff;
          font-size: 20px;
        }
      }
    }
  }
`
const NavBtnHolder = styled.div`
  justify-content: flex-end;
  width: 15%;
  display: flex;
`

const SearchContainer = styled.div`
  &.none {
    position: relative;
    padding: 1.2rem;
    margin: 0 7rem 0 10.67rem;
    display: flex;
    align-items: center;
    border-radius: 1.2rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: none;
    & > svg {
      margin-right: 0.7rem;
    }
    @media screen and (max-width: 1500px) {
      margin: 0 4rem 0 1rem;
    }
    @media screen and (max-width: 768px) {
      margin: 0;
      margin-bottom: 3rem;
    }
  }
  &.show {
    position: relative;
    padding: 1.2rem;
    width: 72rem;
    margin: 0 7rem 0 10.67rem;
    display: flex;
    align-items: center;
    border-radius: 1.2rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: none;
    & > svg {
      margin-right: 0.7rem;
    }
    & > input {
      width: 78.5rem;
    }
    @media screen and (max-width: 1500px) {
      margin: 0 4rem 0 1rem;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      margin: 0;
      margin-bottom: 3rem;
    }
  }
`

const SearchBar = styled.input`
  border: none;
  background: none;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.colors.fontdark};
  &:focus-visible {
    outline: none;
  }
`

const SearchSuggestionWrapper = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.fontdark};
  top: 4rem;
  left: 0rem;
  &.show {
    display: block;
  }
  &.none {
    display: none;
  }
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
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
  gap: 0.3rem;
`
const WalletTitle = styled.h4`
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.fontdark};
`

const ProfileName = styled.span`
  color: ${({ theme }) => theme.colors.fontprimary};
  font-size: 1.6rem;
  display: inline-block;
`

const ProfileImageWrapper = styled.div`
  border-radius: 100%;
`

const WalletDetail = styled.span`
  display: inline-block;
  margin-top: 0.3rem;
  color: ${({ theme }) => theme.colors.pink};
  cursor: pointer;
`

const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // width : 86.063rem;
  // height: 3.5rem;
  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    top: 0;
    display: block;
    background-color: ${({ theme }) => theme.colors.mainBG};
    padding: 3rem;
    z-index: 15;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: start;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95), opacity 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95), visibility 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95), -webkit-transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95);
    will-change: transform, opacity, visibility;
    &.sm-nav-closed {
      visibility: hidden;
      opacity: 0;
    }
    &.sm-nav-opened {
      transform: translateX(0);
      visibility: visible;
      opacity: 1;
    }
  }
`

const MenuWrapper = styled(Menu)``

const HamburgerMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`

const NavbarCloseBtn = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
`

const CloseIcon = styled.div`
  height: 20px;
  width: 20px;
  &:hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.primaryButton};
    cursor: pointer;
  }
`

const MobileResponsive = styled.div<HeaderProps>`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .navbar-mr {
    @media screen and (min-width: 991px) {
      display: none;
    }
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 0 5rem;
    background: ${(props) => (props.isBgWhite ? `#fff` :((props?.windowValue=='/auctions') ? 'linear-gradient(#173b3e, #174347)': `linear-gradient(180deg, #152526 -21.79%, rgba(21, 37, 38, 0) 110.71%)`))};
    border-bottom: 1.5px solid rgba(201, 224, 224, 0.4);
    transition: 0.4s cubic-bezier(0, 0, 0.58, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 458px) {
      padding: 0 2rem 12px 2rem;
      align-items: flex-end;
      background: ${(props) => (props.isBgWhite ? '#fff' : '#0E1818')};
    }
    @media screen and (max-width: 328px) {
      padding: 5px 10px;
    }
  }
  .hide-navbar-mr {
    display: none;
  }
`
const BtnAndMenuBarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px 20px;
  button {
    white-space: nowrap;
  }
  .menu-icon-box {
    margin-right: 4px;
    margin-bottom: -2px;
    cursor: pointer;
  }
  .user-in-menu-icon-box {
    padding: 10px 0px 10px 25px;
    cursor: pointer;
    @media screen and (max-width: 460px) {
      padding: 10px 0px 1rem 20px;
    }
  }
  @media screen and (max-width: 460px) {
    padding: 18px 0px 1.5rem 0px;
  }
  @media screen and (max-width: 290px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`
const DropDownMenu = styled.div`
  @media screen and (min-width: 991px) {
    display: none;
  }
  width: 100%;
  max-height: 878px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 0px 5rem;
  background: url('/images/customer/home/nav-header-mr-bg.webp');
  background-size: 100% 100vh;
  background-repeat: no-repeat;
  border-bottom: 1.5px solid rgba(201, 224, 224, 0.4);
  transition: 0.4s cubic-bezier(0, 0, 0.58, 1);
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: flex-start;
  z-index: 999999;
  overflow: scroll;
  ::-webkit-scrollbar {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    display: none; /* Safari and Chrome */
  }
  .menu-close-icon {
    margin-right: 4px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 69px 0 40px 0;
    gap: 32px;
    animation: fadeIn 3s;
    li {
      font-style: normal;
      font-weight: 400;
      font-size: 4rem;
      line-height: 104%;
      color: #fff;
      text-transform: uppercase;
      a {
        &:active,
        &:hover {
          color: #29898b;
        }
      }
    }
  }
  @media screen and (max-width: 458px) {
    padding: 18px 2rem;
  }
  @media screen and (max-width: 374px) {
    ul {
      padding: 25px 0;
      li {
        font-size: 2.5rem;
      }
    }
  }
`
const CntrlFlex = styled.div`
  display: flex;
  gap: 28px;
  /*Please Don't change  the margin*/
  margin: 0 0 -8px 0;
  @media screen and (max-width: 767px) {
    gap: 20px;
    /*Please Don't change  the margin*/
    margin: 0 0 -12px 0;
  }
  @media screen and (max-width: 374px) {
    gap: 15px;
    /*Please Don't change  the margin*/
  }
  @media screen and (max-width: 299px) {
    flex-wrap: wrap;
  }
`
const FooterSocial = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem 0;
  .d-flex {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 33px;
    padding: 1.5rem 0 0 0;
    li {
      a:hover {
        opacity: 0.8;
      }
    }
  }
  .p-tag {
    font-style: normal;
    font-weight: 400;
    font-size: 1.75rem;
    line-height: 2.8rem;
    color: #d1e0e2;
    padding: 1rem 0;
  }
`

const Avatar = styled.div`
  height: 32px;
  width: 32px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 143.68%;
  letter-spacing: 0.105em;
  cursor: pointer;
  position: relative;
  @media screen and (max-width: 767px) {
    margin: 0;
  }
  &.Pending, &.Rejected, &.Review {
    span {
      display: block;
    }
  }
  span {
    display: none;
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: red;
    right: 0px;
    bottom: 0px;
  }
`
//Modal-CSS
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`
const ModalContainer = styled.div`
  background-color: #fff;
  width: 64rem;
  height: 33.4rem;
  padding: 2.5rem;
  text-align: center;
  border-radius: 1.4rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .heading {
    font-weight: 600;
    font-size: 2.8rem;
    line-height: 120%;
    text-transform: capitalize;
    color: #111727;
  }
  .subtext {
    font-weight: 400;
    font-size: 2rem;
    line-height: 160%;
    text-align: center;
    letter-spacing: -0.011em;
    color: #7c7c7c;
    margin-top: 1.4rem;
    @media screen and (max-width: 320px) {
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 425px) {
    width: 42rem;
    height: 30.4rem;
  }
  @media screen and (max-width: 375px) {
    width: 42rem;
    height: 30.4rem;
  }
  @media screen and (max-width: 320px) {
    width: 35rem;
    height: 25.4rem;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4.4rem;
  width: 100%;
`

const CancelButton = styled.button`
  background: #ffffff;
  border: 1px solid #aaaaaa;
  width: 13.7rem;
  height: 5rem;
  padding: 1.4rem 4rem;
  margin-right: 2.9rem;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
  color: #717171;
  cursor: pointer;
`
const YesButton = styled.button`
  background: #e84242;
  width: 13.4rem;
  height: 5rem;
  padding: 1.4rem 4rem;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
  color: #ffffff;
  border: none;
  cursor: pointer;
`

const MobileScreen = ({ connectStatus, router, isLoggedIn, userDetails, avatarName, onLogOut, onConnectMetaMask }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [profileActive, setProfileActive] = useState(false)
  const [isBgWhite, setIsBgWhite] = useState(false)
  const [locationPath,setLocationPath]=useState('');
  const mobileWhiteBGHeader = [
    '/base/my-nft', '/base/my-nft/[itemId]', '/base/museum', '/base/museum/[itemId]', 
    '/base/vault', '/base/myFavourite/[itemId]', '/base/myProfile', '/base/addressBook', 
    '/base/editProfile', '/base/passwordUpdate','/base/safetyBox', '/base/buy'
  ]
  const handleScroll = () => {
    const header = document.getElementsByClassName('navbar-mr')[0]
    if (window.scrollY > 150) {
      header.classList.add('hide-navbar-mr')
    } else if (window.scrollY < 90) {
      header.classList.remove('hide-navbar-mr')
    }
  }

  useEffect(() => {
    if (mobileWhiteBGHeader.includes(router?.pathname)) {
      setIsBgWhite(true)
    } else {
      setIsBgWhite(false)
    }
  }, [router])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    setLocationPath(window.location.pathname)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const [modal, setModal] = useState(false)
  const isModalOpen = () => {
    setModal(true)
  }
  return (
    <MobileResponsive isBgWhite={isBgWhite} windowValue={(locationPath) ? locationPath:''}>
      <div className="navbar-mr">
        <Logo>
          <Link href={'/'}>
            <a>
              <Image src={isBgWhite ? '/images/customer/new-logo/logo-b-2.png' : '/images/customer/new-logo/logo-w-2.png'} alt="ICO" width={212} height={30} />
            </a>
          </Link>
        </Logo>
        {isLoggedIn ? (
          <CntrlFlex>
            {!(connectStatus === 'metamask') && <Image style={{ cursor: 'pointer' }} onClick={onConnectMetaMask} src={isBgWhite ? '/svgs/wallet-black.svg' : '/svgs/wallet.svg'} alt="ICO" width={20} height={20} />}
            <Image style={{ cursor: 'pointer' }} onClick={() => router.push('/base/myFavourite')} src={isBgWhite ? '/svgs/heart-black.svg' : '/svgs/heart.svg'} alt="ICO" width={20} height={20} />
            {/* <Image src="/svgs/cart.svg" alt="ICO" width={20} height={20} /> */}
            <ul>
              <li
                style={{ position: 'relative' }}
                onClick={() => {
                  setProfileActive(!profileActive)
                }}
              >
                <div className="drop-down-menu">
                  <Avatar className={userDetails?.kycStatus}>
                    {avatarName}
                    <span></span>
                  </Avatar>
                  <DropDown
                    items={[
                      { name: 'My dashboard', link: '/base/dashboard', imgSrc: '/images/customer/dashboard.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                      // { name: 'Buy', link: '/base/buy', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                      // { name: 'Sell', link: '/base/buy/sell', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                      { name: 'My Cart', link: '/base/cart', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                      { name: 'My Transactions', link: '/base/transactions', imgSrc: '/images/customer/dashboard.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                      // { name: 'My safety box', link: '/base/safetyBox', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                      { name: 'My profile', link: '/base/myProfile', imgSrc: ProfileImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                      { name: 'Log out', link: '/', onClick: isModalOpen, imgSrc: '/svgs/logout-green.svg' },
                    ]}
                    onDeativate={() => setProfileActive(false)}
                    textTransform={'initial'}
                    isActive={profileActive}
                    left="-5.5rem"
                  />
                </div>
              </li>
              <li>
                <BtnAndMenuBarBox>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenu(true)
                    }}
                    className="user-in-menu-icon-box"
                  >
                    <Image src={'/svgs/hamburger.svg'} alt="ICO" width={18} height={16} />
                  </div>
                </BtnAndMenuBarBox>
              </li>
            </ul>
          </CntrlFlex>
        ) : (
          <BtnAndMenuBarBox>
            <ButtonPrimary onClick={() => router.push('/base/signin')} mrFontSize={'11.5px'} padding={'8.5px 30.5px 8.5px 30.5px'}>
              Sign In
            </ButtonPrimary>
            <div
              onClick={(e) => {
                e.stopPropagation()
                setOpenMenu(true)
              }}
              className="menu-icon-box"
            >
              <Image src={'/svgs/hamburger.svg'} alt="ICO" width={18} height={16} />
            </div>
          </BtnAndMenuBarBox>
        )}
        {openMenu && (
          <DropDownMenu>
            <div onClick={() => setOpenMenu(false)} className="menu-close-icon">
              <Logo>
                <Link href={'/'}>
                  <a>
                    <Image src={'/images/customer/new-logo/logo-w-2.png'} alt="ICO" width={135} height={31} />
                  </a>
                </Link>
              </Logo>
              <Image src={'/images/customer/home/close-menu.png'} alt="ICO" width={17} height={17} />
            </div>

            <ul>
              {/* {isLoggedIn && ( */}
              <li onClick={() => setOpenMenu(false)}>
                <Link href={'/base/museum'}>
                  <a>Museum</a>
                </Link>
              </li>
              {/* )} */}
              {navData2.map((navItem, index) => (
                <li onClick={() => setOpenMenu(false)} key={index}>
                  <Link href={navItem.link}>
                    <a>{navItem.name}</a>
                  </Link>
                </li>
              ))}
              {/* {isLoggedIn && (
                <li onClick={() => setOpenMenu(false)}>
                  <Link href={'/coming-soon'}>
                    <a>Auction</a>
                  </Link>
                </li>
              )} */}
              {isLoggedIn && (
                <li onClick={() => setOpenMenu(false)}>
                  <Link href={'/base/my-nft'}>
                    <a>My NFT</a>
                  </Link>
                </li>
              )}
            </ul>

            <FooterSocial>
              <ul className="d-flex">
                <li onClick={() => setOpenMenu(false)}>
                  <Link href="/">
                    <a className="read-link" href={'https://www.instagram.com/futuregrailofficial/?igshid=NmNmNjAwNzg%3D'} target="_blank" rel="noreferrer">
                      <Image src={'/svgs/insta.svg'} alt="instagram" width={25} height={25} />
                    </a>
                  </Link>
                </li>
              </ul>
              <p className="p-tag">@2022 Futuregrail</p>
            </FooterSocial>
          </DropDownMenu>
        )}
      </div>
      {modal && (
        <ModalWrapper>
          <ModalContainer>
            <p className="heading">Are you sure?</p>
            <p className="subtext">Do you really wish to leave and log out?</p>
            <ButtonContainer>
              <CancelButton onClick={() => setModal(null)}>Cancel</CancelButton>
              <YesButton onClick={onLogOut}>Yes</YesButton>
            </ButtonContainer>
          </ModalContainer>
        </ModalWrapper>
      )}
    </MobileResponsive>
  )
}

const Header = () => {
  const router = useRouter()
  const isAuthenticated = useSelector<RootState, any>((state) => state?.auth?.accessToken)
  const userData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const logo = ThemeConfiguration?.sections?.home?.header?.appLogo
  const searchPlaceholder = ThemeConfiguration?.sections?.home?.header?.search
  const connectStatus = useSelector<RootState, any>((state) => state?.auth?.connectStatus)
  const [isMounted, setIsMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [queryPlacer, setQueryPlacer] = useState('')
  const [searchVisibility, setSearchVisibility] = useState(false)
  const [dropDownActive, setDropDownActive] = useState(false)
  const [profileActive, setProfileActive] = useState(false)
  const [auctionActive, setAuctionActive] = useState(false)
  const [modal, setModal] = useState(false)
  const [isBgWhite, setIsBgWhite] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const whiteBGPages = [
    '/base/events/[eventId]', '/base/buy',
    '/base/dashboard', '/base/safetyBox', '/base/safetyBox/buy', '/base/safetyBox/noBoxes', 
    '/base/my-nft', '/base/my-nft/[itemId]', '/base/museum/[itemId]', '/base/myFavourite/[itemId]', '/base/myProfile'
  ]
  const [buysellDropdown, setbuysellDropdown] = useState(false)

  // const { disconnectWallet } = useConnectMetaMask();
  const { disconnectFromWallet } = useAuthConnect()
  // const { currentProviderName } = useWeb3Context()
  const { reInitiateConnection, hederaInstance } = useHederaContext()
  const { connectMetamask } = useAuthConnect()

  const isLoggedIn = isMounted && localStorage.getItem('user')
  const headerData = isLoggedIn ? authNavData : navData
  const avatarName = userData?.userName?.slice(0, 1) || userData?.email?.slice(0, 1) || userData?.firstName?.slice(0, 1) || ''

  const getUserProfile = () => {
    let token = JSON.parse(localStorage.getItem('user'))?.accessToken
    if(!token) return
    UserService.getProfile(token)
    .then((res: any) => {
      console.log('res', res)
      if(res?.data?.id) {
        setUserDetails(res?.data)
      }
    })
    .catch(err => {
      console.log('err')
    })
  }

  const handleScroll = () => {
    const header = document.getElementsByClassName('header')[0]
    if (window.scrollY > 10) {
      header.classList.add('hide-header')
    } else if (window.scrollY < 10) {
      header.classList.remove('hide-header')
    }
  }

  useEffect(() => {
    getUserProfile()
    setIsMounted(true)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!hederaInstance && isAuthenticated && APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA') {
      reInitiateConnection()
    }
  }, [hederaInstance, isAuthenticated])

  const openMenu = () => {
    setMenuOpen(true)
    document.body.classList.add('overflow-hidden')
  }
  const closeMenu = () => {
    setMenuOpen(false)
    setSearchVisibility(false)
    setQueryPlacer('')
    document.body.classList.remove('overflow-hidden')
  }
  // const disconnect =()=>{
  //   discWeb3("walletConnect");
  //   disconnectWallet();
  // }
  const changing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setQueryPlacer(value)
    if (value != '') {
      setSearchVisibility(true)
    } else {
      setSearchVisibility(false)
    }
  }
  const cancelQuery = (e: any) => {
    setQueryPlacer('')
    setSearchVisibility(false)
  }
  useEffect(() => {
    if (whiteBGPages.includes(router?.pathname)) {
      setIsBgWhite(true)
    } else {
      setIsBgWhite(false)
    }
    closeMenu()
    if(!router?.asPath.includes('/base/museum')) localStorage.removeItem('museumIndex')
    if(!router?.asPath.includes('/base/events')) localStorage.removeItem('eventsIndex')
  }, [router])

  const logOut = () => {
    UserService.userLogout()
      .then((res) => {
        Toast.success(res?.data?.message || 'Successfully logged out')
        removeCookie(KEYS.CUSTOMER_USER)
        localStorage.clear()
        router.reload()
        router.push('/')
        setModal(false)
      })
      .catch((err) => {
        Toast.error(err?.response?.message || 'Something went wrong!')
        setModal(false)
      })
  }

  const isModalOpen = () => {
    setModal(true)
  }
  return (
    <NavHeader isBgWhite={isBgWhite} windowValue={(isMounted && window.location.pathname) ? window.location.pathname:''}>
      <div className="header">
        <Container style={{ height: '100%' }}>
          <Flex align="center" justify="space-between" style={{ height: '100%' }}>
            <Logo>
              <Link href={'/'}>
                <a>
                  <Image src={isBgWhite ? '/images/customer/new-logo/logo-b-2.png' : '/images/customer/new-logo/logo-w-2.png'} alt="ICO" width={205} height={35} />
                </a>
              </Link>
            </Logo>
            <NavInnerHeader>
              <NavContent isBgWhite={isBgWhite}>
                <ul>
                  {headerData.map((navItem, index) => (
                    <li key={index} className={isMounted && window.location.pathname === navItem.link ? 'nav-active': ''}>
                      <Link href={navItem.link}>
                        <a>{navItem.name}</a>
                      </Link>
                    </li>
                  ))}
                  <li
                    onClick={() => {
                      setbuysellDropdown(!buysellDropdown)
                    }}
                  >
                    <div className="drop-down-menu">
                      Buy/Sell
                      <Image style={{ color: isBgWhite ? '#0E1818' : '#C0C0C0', bottom: '2px' }} src="/svgs/customerHeader/dropdown.svg" alt="ICO" width={10} height={5} />
                      <DropDown
                        items={[
                          { name: 'Buy', link: '/base/buy' },
                          { name: 'Sell', link: '/base/buy/sell' },
                        ]}
                        isActive={buysellDropdown}
                        onDeativate={() => setbuysellDropdown(false)}
                        left={!isLoggedIn ? '-2rem' : '-5rem'}
                      />
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      setDropDownActive(!dropDownActive)
                    }}
                  >
                    <div className="drop-down-menu">
                      {isLoggedIn ? 'More' : 'Company '}
                      <Image style={{ color: isBgWhite ? '#0E1818' : '#C0C0C0', bottom: '2px' }} src="/svgs/customerHeader/dropdown.svg" alt="ICO" width={10} height={5} />
                      <DropDown
                        items={
                          isLoggedIn
                            ? [
                                // { name: 'Services', link: '/base/services' },
                                { name: 'Media', link: '/base/media' },
                                // { name: 'Archive', link: '/base/archive' },
                                { name: 'FAQ', link: '/base/faq' },
                                { name: 'About us', link: '/base/aboutUs' },
                              ]
                            : [
                                { name: 'Media', link: '/base/media' },
                                // { name: 'Archive', link: '/base/archive' },
                                { name: 'FAQ', link: '/base/faq' },
                                { name: 'About us', link: '/base/aboutUs' },
                              ]
                        }
                        isActive={dropDownActive}
                        onDeativate={() => setDropDownActive(false)}
                        left={!isLoggedIn ? '-2rem' : '-5rem'}
                      />
                    </div>
                  </li>
                </ul>
              </NavContent>
            </NavInnerHeader>
            {!isLoggedIn ? (
              <NavBtnHolder>
                <ButtonPrimary onClick={() => router.push('/base/signin')}>Sign In</ButtonPrimary>
              </NavBtnHolder>
            ) : (
              <CntrlFlex>
                {!(connectStatus === 'metamask') && <Image style={{ cursor: 'pointer' }} src={isBgWhite ? '/svgs/wallet-black.svg' : '/svgs/wallet.svg'} alt="ICO" width={20} height={20} onClick={connectMetamask} />}
                <Image style={{ cursor: 'pointer' }} src={isBgWhite ? '/svgs/heart-black.svg' : '/svgs/heart.svg'} alt="ICO" width={20} height={20} onClick={() => router.push('/base/myFavourite')} />
                <ul>
                  <li
                    style={{ position: 'relative' }}
                    onClick={() => {
                      setProfileActive(!profileActive)
                    }}
                  >
                    <div className="drop-down-menu">
                      <Avatar className={userDetails?.kycStatus}>
                        {avatarName}
                        <span></span>
                      </Avatar>
                      <DropDown
                        items={[
                          { name: 'My dashboard', link: '/base/dashboard', imgSrc: '/images/customer/dashboard.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                          // { name: 'Buy', link: '/base/buy', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                          // { name: 'Sell', link: '/base/buy/sell', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                          { name: 'My Cart', link: '/base/cart', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                          { name: 'My Transactions', link: '/base/transactions', imgSrc: '/images/customer/dashboard.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                          // { name: 'My safety box', link: '/base/safetyBox', imgSrc: '/images/customer/safety-box.png', arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                          { name: 'My profile', link: '/base/myProfile', imgSrc: ProfileImg, arrowImgSrc: ProfileArrowImg, arrowIcon: '/images/customer/home/arrow-right.png' },
                          { name: 'Log out', link: '/', onClick: isModalOpen, imgSrc: '/svgs/logout-green.svg' },
                        ]}
                        textTransform={'initial'}
                        isActive={profileActive}
                        onDeativate={() => setProfileActive(false)}
                        left="-6.8rem"
                        bottom="-13rem"
                        isEdit={true}
                      />
                    </div>
                  </li>
                </ul>
              </CntrlFlex>
            )}
          </Flex>
        </Container>
        {modal && (
          <ModalWrapper>
            <ModalContainer>
              <p className="heading">Are you sure?</p>
              <p className="subtext">Do you really wish to leave and log out?</p>
              <ButtonContainer>
                <CancelButton onClick={() => setModal(null)}>Cancel</CancelButton>
                <YesButton onClick={logOut}>Yes</YesButton>
              </ButtonContainer>
            </ModalContainer>
          </ModalWrapper>
        )}
      </div>
      <MobileScreen connectStatus={connectStatus} userDetails={userDetails} avatarName={avatarName} router={router} isLoggedIn={isLoggedIn} onLogOut={logOut} onConnectMetaMask={connectMetamask} />
    </NavHeader>
  )
}

export default Header

function IconsFn({ name, fill }: { name: string; fill?: string }) {
  const displayIcon = () => {
    switch (name) {
      // ASN
      case 'hamburger':
        return (
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 14V16H2V14H13ZM18 7V9H0V7H18ZM16 0V2H5V0H16Z" fill="#D1E0E2" />
          </svg>
        )
      case 'send':
        return (
          <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5966 15.0823L10.1499 21.3657C10.7891 21.3657 11.0659 21.0911 11.3978 20.7614L14.3943 17.8977L20.6034 22.4448C21.7422 23.0794 22.5445 22.7452 22.8517 21.3972L26.9273 2.29953L26.9284 2.2984C27.2897 0.615036 26.3197 -0.0432328 25.2102 0.369732L1.25372 9.54161C-0.381258 10.1762 -0.356503 11.0877 0.975788 11.5007L7.1005 13.4057L21.327 4.50388C21.9965 4.06054 22.6053 4.30584 22.1045 4.74919L10.5966 15.0823Z"
              fill="#D1E0E2"
            />
          </svg>
        )
      case 'insta':
        return (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_4408_1364)">
              <path
                d="M24.4287 7.05901C24.3724 5.78326 24.1661 4.9062 23.8706 4.14621C23.5657 3.33951 23.0967 2.61726 22.4822 2.01686C21.8818 1.40711 21.1548 0.93331 20.3574 0.6332C19.593 0.33767 18.7205 0.131367 17.4448 0.0751192C16.1595 0.0141077 15.7515 0 12.4917 0C9.2319 0 8.82388 0.0141077 7.54337 0.0703555C6.26763 0.126603 5.39057 0.33309 4.63077 0.628436C3.82388 0.93331 3.10163 1.40235 2.50123 2.01686C1.89148 2.61726 1.41787 3.34427 1.11757 4.14163C0.822045 4.9062 0.615742 5.7785 0.559494 7.05424C0.498483 8.33951 0.484375 8.74754 0.484375 12.0073C0.484375 15.2672 0.498483 15.6752 0.55473 16.9557C0.610978 18.2314 0.817464 19.1085 1.11299 19.8685C1.41787 20.6752 1.89148 21.3974 2.50123 21.9978C3.10163 22.6076 3.82864 23.0814 4.626 23.3815C5.39057 23.677 6.26287 23.8833 7.53879 23.9396C8.81911 23.996 9.22732 24.0099 12.4871 24.0099C15.7469 24.0099 16.155 23.996 17.4355 23.9396C18.7112 23.8833 19.5883 23.677 20.3481 23.3815C21.9617 22.7576 23.2374 21.4819 23.8613 19.8685C24.1566 19.1039 24.3631 18.2314 24.4193 16.9557C24.4756 15.6752 24.4897 15.2672 24.4897 12.0073C24.4897 8.74754 24.4849 8.33951 24.4287 7.05901ZM22.2665 16.8619C22.2149 18.0345 22.0179 18.6677 21.8537 19.0898C21.4503 20.1358 20.6201 20.966 19.5742 21.3694C19.152 21.5336 18.5142 21.7305 17.3462 21.782C16.0798 21.8384 15.7 21.8524 12.4965 21.8524C9.29291 21.8524 8.90834 21.8384 7.64652 21.782C6.47393 21.7305 5.84073 21.5336 5.4186 21.3694C4.89808 21.177 4.42428 20.8721 4.03971 20.4735C3.64103 20.0841 3.33615 19.6151 3.14377 19.0946C2.97961 18.6724 2.78265 18.0345 2.73117 16.8666C2.67474 15.6002 2.66081 15.2202 2.66081 12.0167C2.66081 8.81313 2.67474 8.42856 2.73117 7.16692C2.78265 5.99433 2.97961 5.36113 3.14377 4.939C3.33615 4.41829 3.64103 3.94467 4.04447 3.55992C4.43362 3.16124 4.90266 2.85636 5.42336 2.66417C5.8455 2.5 6.48346 2.30304 7.65129 2.25138C8.91768 2.19513 9.29768 2.18102 12.501 2.18102C15.7094 2.18102 16.0892 2.19513 17.351 2.25138C18.5236 2.30304 19.1568 2.5 19.5789 2.66417C20.0994 2.85636 20.5732 3.16124 20.9578 3.55992C21.3565 3.94925 21.6614 4.41829 21.8537 4.939C22.0179 5.36113 22.2149 5.99891 22.2665 7.16692C22.3228 8.43332 22.3369 8.81313 22.3369 12.0167C22.3369 15.2202 22.3228 15.5955 22.2665 16.8619Z"
                fill="#D1E0E2"
              />
              <path
                d="M12.496 5.83984C9.09086 5.83984 6.32812 8.6024 6.32812 12.0077C6.32812 15.413 9.09086 18.1755 12.496 18.1755C15.9012 18.1755 18.6638 15.413 18.6638 12.0077C18.6638 8.6024 15.9012 5.83984 12.496 5.83984ZM12.496 16.0086C10.2869 16.0086 8.49504 14.2169 8.49504 12.0077C8.49504 9.79845 10.2869 8.00676 12.496 8.00676C14.7052 8.00676 16.4969 9.79845 16.4969 12.0077C16.4969 14.2169 14.7052 16.0086 12.496 16.0086Z"
                fill="#D1E0E2"
              />
              <path
                d="M20.3409 5.59616C20.3409 6.39133 19.6962 7.03607 18.9009 7.03607C18.1057 7.03607 17.4609 6.39133 17.4609 5.59616C17.4609 4.80081 18.1057 4.15625 18.9009 4.15625C19.6962 4.15625 20.3409 4.80081 20.3409 5.59616Z"
                fill="#D1E0E2"
              />
            </g>
            <defs>
              <clipPath id="clip0_4408_1364">
                <rect width="24.01" height="24.01" fill="white" transform="translate(0.445312)" />
              </clipPath>
            </defs>
          </svg>
        )
      case 'twitter':
        return (
          <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.4478 2.64862C26.4201 3.10323 25.3302 3.4018 24.2142 3.53443C25.3905 2.83094 26.2708 1.72379 26.6912 0.41928C25.5873 1.07624 24.3771 1.53664 23.1157 1.78569C22.2684 0.879121 21.1453 0.277878 19.921 0.0754352C18.6968 -0.127007 17.4399 0.0806939 16.3459 0.666249C15.2519 1.2518 14.3819 2.1824 13.8713 3.31338C13.3608 4.44435 13.2381 5.71232 13.5225 6.92018C11.2839 6.80798 9.0939 6.22623 7.0947 5.21272C5.09551 4.1992 3.3318 2.77658 1.9181 1.0372C1.4177 1.89669 1.15473 2.87375 1.15614 3.8683C1.15614 5.82032 2.14965 7.54483 3.66011 8.55449C2.76623 8.52635 1.89203 8.28495 1.11037 7.85042V7.92042C1.11064 9.22047 1.5605 10.4804 2.38369 11.4866C3.20687 12.4929 4.35271 13.1834 5.62694 13.4413C4.79715 13.6661 3.92707 13.6993 3.08258 13.5382C3.44184 14.6572 4.14207 15.6359 5.08521 16.3371C6.02835 17.0384 7.16719 17.4272 8.34226 17.449C7.17439 18.3662 5.83719 19.0442 4.4071 19.4443C2.97702 19.8444 1.4821 19.9587 0.0078125 19.7806C2.58138 21.4357 5.57726 22.3144 8.63709 22.3115C18.9936 22.3115 24.6571 13.7321 24.6571 6.29149C24.6571 6.04918 24.6504 5.80416 24.6396 5.56454C25.742 4.7678 26.6934 3.78082 27.4492 2.64997L27.4478 2.64862Z"
              fill="#D1E0E2"
            />
          </svg>
        )
      default:
        return <></>
    }
  }

  return displayIcon()
}
