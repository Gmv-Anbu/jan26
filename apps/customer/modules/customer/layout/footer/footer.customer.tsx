import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import UserService from '@apps/customer/api/customer/UserService'
import { useEffect, useState } from 'react'
import SuccessModal from '../../shared/modal/SuccessModal'
import { ModalService } from '@nft-marketplace/modal'
import { APP_ENV } from '@apps/customer/config'
import { useRouter } from 'next/router'
import { RootState } from '@apps/customer/redux/store'
import { useSelector } from 'react-redux'
import ErrorModal from '../../shared/modal/ErrorModal'
import Tooltip from '@apps/customer/modules/shared/components/tooltip/tooltip'
import { Container } from '@apps/customer/styles/CommonStyles'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { authNavLinks, navLinks } from '@apps/customer/data/footer'

interface NavProps {
  width: number
}
interface IProps {
  isBgFaded?: boolean
}

const FooterWrapper = styled.footer<IProps>`
  border-top: 1px solid #d1e0e2;
  @media screen and (min-width: 549px) {
    background: ${(props) => (props.isBgFaded ? "url('/images/customer/shared/faded-bg-footer-txt.png')" : "url('/images/customer/shared/bg-footer-txt.png')")} no-repeat top center;
    background-size: 100%;
  }
  h5 {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 120%;
  }
  .d-flex {
    display: flex;
    flex-wrap: wrap;
  }
`
const FooterTop = styled.div`
  padding: 19.9rem 0 7.7rem;
  @media screen and (max-width: 549px) {
    padding: 60px 0 50px 0;
  }
  @media screen and (max-width: 768px) {
    padding: 60px 0 50px 25px;
  }
`
const FooterTopInner = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  gap: 28px;
  &::after {
    content: '';
    position: absolute;
    /* background: url("/images/customer/shared/separator.png") no-repeat bottom left; */
    background: linear-gradient(90deg, rgba(218, 221, 221, 0) 0%, #dadddd 49.49%, rgba(218, 221, 221, 0) 100.66%);
    left: 0;
    right: 0;
    bottom: -67px;
    margin: auto;
    width: 100%;
    height: 2px;
  }

  a,
  address {
    color: ${({ theme }) => theme.colors.fontDarkGray};
    font-weight: 400;
    font-size: 32px;
    line-height: 130%;
  }
  @media screen and (max-width: 1124px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    a {
      font-size: 24px;
      line-height: 120%;
      text-decoration: underline;
    }
    address {
      font-size: 24px;
      line-height: 132%;
    }
  }
`

const FooterTopLeft = styled.div`
  width: 27%;
  h1 {
    max-width: 100%;
    line-height: 3.9rem;

    color: ${({ theme }) => theme.colors.primary};
    line-height: 104%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    h1 {
      font-size: 24px;
    }
  }
`
const FooterTopMid = styled.div`
  /* width: 30%; */
  .email {
    margin: 0 0 5.4rem 0;
    a {
      display: block;
    }
  }
  h5 {
    font-weight: 600;
    margin-bottom: 1.6rem;
  }
  p {
    color: #111727;
    font-size: 3.2rem;
  }
  .contact-mob {
    cursor: auto;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    h5 {
      font-size: 12px;
      margin-bottom: 0;
      line-height: 228.5%;
      letter-spacing: 0.02em;
    }
    a {
      color: #111727;
    }
    p {
      font-size: 24px;
    }
  }
  @media screen and (min-width: 1023px) and (max-width: 1024px) {
    width: 30.5% !important;
  }
`
const FooterTopRight = styled.div`
  /* width: 30%; */
  @media screen and (max-width: 768px) {
    width: 100%;
    address {
      color: black;
    }
  }
  @media screen and (min-width: 1023px) and (max-width: 1024px) {
    width: 35.5% !important;
  }
`
const FooterMid = styled.div`
  /* padding: 4.8125rem 0 4.8125rem; */
  padding: 7.7rem 0 14.6rem;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    background: url('/images/customer/home/footer-shadow.png') no-repeat bottom left;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  @media screen and (max-width: 768px) {
    padding-left: 25px;
    &::after {
      bottom: -13rem;
      background: url('/images/customer/home/footer-gradient-mob.png') no-repeat bottom left;
    }
  }

`
const FooterMidInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  .nav-div {
    width: 62%;
    display: flex;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 27px;
    .nav-div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      row-gap: 30px;
    }
  }
`
const Logo = styled.figure`
  width: 38%;
  position: relative;
  /* @media screen and (max-width: 1025px) {
    max-width: 180px;

       }
       @media screen and (max-width: 780px) {
        max-width: 125px;
        margin-left: 9rem
    
           } */

  /* img{
      max-width: 205px !important;
      transition: .4s cubic-bezier(0,0,.58,1) ;
      position: relative;
      top: 12px !important;
    }
    @media screen and (max-width:1199px) {
      img {
      max-width: 180px;
      }
    } */
  @media screen and (max-width: 768px) {
    width: 208px;
  }
`
const NavSection = styled.div<NavProps>`
  width: ${(props) => `${props.width}%`};
  .d-flex {
    display: flex;
    flex-wrap: wrap;
  }
  h5 {
    margin-bottom: 1.6rem;
  }
  li {
    padding-bottom: 1.25rem;
    a {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 160%;

      &:hover {
        color: #29898b;
      }
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    h5 {
      font-weight: 700;
      letter-spacing: 0.02em;
      font-size: 16px;
      line-height: 228.5%;
    }
  }
`

const FooterBottom = styled.div`
  background: #f4f9f9;
  padding: 4rem 0;

  .copyright {
    width: 47%;
  }

  .copyright p {
    font-size: 1rem;
    margin: 0;
  }
  h6 {
    margin: 0 10px 0 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 160%;
  }
`
const FooterBottomInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 26.3px;
    div {
      width: 100% !important;
      text-align: center;
    }
  }
`
const FooterSocial = styled.div`
  width: 50%;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
  li a:hover {
    opacity: 0.8;
  }
  li {
    padding: 0 1.25rem;
    &:first-child {
      padding-left: 0;
    }
  }
`
// interface IFooterProps {
//   fadedBgImg?: boolean
// }

const Footer = () => {
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)

  const footer = ThemeConfiguration?.sections?.home?.footer
  const newsletterSubscription = ThemeConfiguration?.sections?.home?.newsletterSubscription

  const logo = footer?.appLogo

  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [fadedBgImg, isFadedBgImg] = useState(false)
  const fadedBGImgPages = ['/base/my-nft', '/base/my-nft/[itemId]', '/base/museum/[itemId]', '/base/myFavourite/[itemId]', '/base/myProfile']
  const router = useRouter()
  const isLoggedIn = isMounted && localStorage.getItem('user')
  const footerLinks = isLoggedIn ? authNavLinks : navLinks

  const onClickHandler = (link) => {
    router.push(link)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (fadedBGImgPages.includes(router?.pathname)) {
      isFadedBgImg(true)
    } else {
      isFadedBgImg(false)
    }
  }, [router])

  return (
    <FooterWrapper isBgFaded={fadedBgImg}>
      <FooterTop>
        <Container>
          <FooterTopInner>
            <FooterTopLeft>
              <h1>Connect with us</h1>
            </FooterTopLeft>

            <FooterTopRight>
              <h5 style={{ marginBottom: '1.2rem' }}>Address :</h5>
              <address>
                100E Pasir Panjang Road, <br />
                B&D Building , 03-01/03-02, <br /> 118521, Singapore (Free parking <br />
                available at our carpark)
              </address>
            </FooterTopRight>
            <FooterTopMid>
              <div className="email">
                <h5>Email :</h5>
                <Link href="mailto:info@futuregrail.com">
                  <a>info@futuregrail.com</a>
                </Link>
                {router?.pathname === '/base/vault' ? (
                  <Link href="mailto:vault@futuregrail.com">
                    <a>vault@futuregrail.com</a>
                  </Link>
                ) : null}
              </div>
              <h5>Contact Us :</h5>
              <p className="contact-mob">+65 88032217</p>
            </FooterTopMid>
          </FooterTopInner>
        </Container>
      </FooterTop>

      <FooterMid>
        <Container>
          <FooterMidInner>
            <Logo>
              <Link href={'/'}>
                <a>
                  <Image src="/images/customer/new-logo/logo-b-2.png" alt="ICO" width={290} height={50} />
                </a>
              </Link>
              {/* <p>Platform for the Rare and Precious</p> */}
            </Logo>
            <div className="nav-div">
              {footerLinks.map((each, index) => (
                <NavSection key={index} width={each.width}>
                  <h5>{each.name}</h5>
                  <nav className="d-flex">
                    <ul>
                      {each.subLink.map((sub,i) => (
                        <>
                          <li>
                            <a key={i} href={sub.link}>{sub.subName}</a>
                          </li>
                        </>
                      ))}
                    </ul>
                  </nav>
                </NavSection>
              ))}
            </div>
          </FooterMidInner>
        </Container>
      </FooterMid>

      <FooterBottom>
        <Container>
          <FooterBottomInner>
            <div className="copyright">
              <h6>Copyright@2022 Futuregrail, All rights reserved.</h6>
            </div>
            <FooterSocial style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <h6>Follow Us :</h6>
              <ul className="d-flex">
                {/* <li>
                  <Link href="#">
                    <a href="https://www.telegram.com/" target="_blank" rel="noreferrer">
                      <Image src={'/svgs/facebook-green.svg'} alt="facebook" width={20} height={22} />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                      <Image src={'/svgs/linkedin.svg'} alt="linkedin" width={24} height={24} />
                    </a>
                  </Link>
                </li> */}
                <li>
                  <Link href="#">
                  <a className="read-link" href={'https://www.instagram.com/futuregrailofficial/?igshid=NmNmNjAwNzg%3D'} target="_blank" rel="noreferrer">
                      <Image src={'/svgs/insta-green.svg'} alt="instagram" width={23} height={23} />
                    </a>
                  </Link>
                </li>
              </ul>
            </FooterSocial>
          </FooterBottomInner>
        </Container>
      </FooterBottom>
    </FooterWrapper>
  )
}
export default Footer
