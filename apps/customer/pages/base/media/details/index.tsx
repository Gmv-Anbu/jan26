import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import homePageImg from '../../../../public/images/customer/Media/Rectangle 2731@2x.png'
import homePageImgMr from '../../../../public/images/customer/Media/img-1-sm.png'
import facebookIcon from '../../../../public/images/customer/Social/facebook-icon.png'
import img1 from '../../../../public/images/customer/Media/media-img-1.png'
import img2 from '../../../../public/images/customer/Media/media-img-2.png'
import img3 from '../../../../public/images/customer/Media/media-img-3.png'
import CardComponent from '@apps/customer/components/card/card'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import playBtn from '../../../../public/images/customer/playbtn.png'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import Icons from '../../../../modules/shared/components/icon/icon'
import Link from 'next/link'

const Container = styled.div`
  width: 100%;
`
const Container2 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 33rem;
    background-image: url('/images/customer/Media/media-stories-details-bg-image.png');
    background-repeat: no-repeat;
    background-size: 100%;
    left: 0;
    bottom: 0%;
    opacity: 1;
    @media screen and (max-width: 798px) {
      background-image: url('/images/customer/Media/md-mr-FUTUREGRAIL.png');
      background-repeat: no-repeat;
      background-size: 100% 18rem;
      bottom: -0%;
      left: -1%;
      height: 18rem;
    }
  }
`
const StoriesDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  padding: 16rem 0 16rem 0;
  @media screen and (max-width: 1360px) {
    max-width: 118rem;
  }
  @media screen and (max-width: 1199px) {
    max-width: 114rem;
  }
  @media screen and (max-width: 991px) {
    max-width: 96rem;
  }
  @media screen and (max-width: 767px) {
    justify-content: flex-start;
    padding: 10.8rem 2rem 5rem;
    max-width: 72rem;
  }
  @media screen and (max-width: 575px) {
    max-width: 54rem;
  }
`
const DetailsBox = styled.div`
  width: 100%;
  max-width: 1114px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem 0;
  @media screen and (max-width: 798px) {
    gap: 0 0;
  }
  .story-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem 0;
    padding: 3rem 0;
    .p-1 {
      color: #4e4e4e;
      font-style: normal;
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 125%;
    }
    h2 {
      font-style: normal;
      font-weight: 400;
      font-size: 4.8rem;
      line-height: 120%;
      color: #0e1818;
    }
    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 3rem;
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 125%;
        color: #4e4e4e;
      }
      p:last-child {
        font-weight: 600;
        color: #2a7575;
      }
    }
    @media screen and (max-width: 798px) {
      padding: 32px 0 16px 0;
      gap: 0;
      .p-1 {
        color: #848a8b;
        font-size: 1.5rem;
        margin-bottom: 16px;
      }
      h2 {
        font-weight: 600;
        font-size: 3rem;
        margin-bottom: 24px;
      }
      .date {
        p {
          color: #848a8b;
          font-weight: 600;
          font-size: 1.5rem;
        }
        p:last-child {
          font-weight: 500;
        }
      }
    }
  }
  .image-box {
    max-width: 1114px;
    max-height: 416px;
    position: relative;
    width: 100%;
    .play-btn {
      width: 5rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
      cursor: pointer;
    }
    @media screen and (max-width: 768px) {
      max-width: 342px;
      max-height: 200px;
      min-width: 342px;
      min-height: 200px;
      margin-bottom: 24px;
    }
  }
  .paragraph {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem 0;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 1.8rem;
      line-height: 142.5%;
      letter-spacing: -0.015em;
      color: #7c7c7c;
      @media screen and (max-width: 798px) {
        font-weight: 500;
        font-size: 1.5rem;
      }
    }
  }
`
export const BackButn = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 2rem;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.5rem;
  letter-spacing: -0.24px;
  color: #848a8b;
  svg {
    height: 0.8rem;
    width: 0.8rem;
  }
  @media screen and (max-width: 798px) {
    display: none;
  }
`
const FooterSocial = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 30px 0 0px 0;
  z-index: 1;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 120%;
    color: #0e1818;
    text-transform: capitalize;
    margin: 0px 0 20px 0;
  }
  .d-flex {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
    .fb-icon {
      transform: translate(2px, -2px);
    }
    li {
      a:hover {
        opacity: 0.8;
      }
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    margin: 60px 0 0px 0;
    h1 {
      font-size: 16px;
      line-height: 116%;
      margin: 0px 0 24px 0;
    }
    .d-flex {
      .fb-icon {
        transform: translate(2px, -4px);
      }
      li {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`

const MediaDetails: NextPage = () => {
  const router = useRouter()
  const { width } = useWindowSize()

  const backBtnHandler = () => {
    router.push('/base/media')
    return
  }

  return (
    <Container>
      <Container2>
        <StoriesDetailsBox>
          <DetailsBox>
            <BackButn onClick={backBtnHandler}>
              <svg width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.45563 3.20108L4.00391 0.711238L3.27597 6.21784e-08L-0.00024147 3.20108L3.27597 6.40215L4.00391 5.69091L1.45563 3.20108Z" fill="#000000" />
              </svg>
              Back
            </BackButn>
            <div className="story-details">
              <p className="p-1">DBC News</p>
              <h2>Futuregrail CEO Ali Nael to hold Singapore town hall with employees on Monday</h2>
              <span className="date">
                <p>May 5, 2022</p>
                <p>13 Min Watch</p>
              </span>
            </div>
            <div className="image-box">
              <Image src={width > 768 ? homePageImg : homePageImgMr} alt={'image'} width={width > 768 ? 1114 : 342} height={width > 768 ? 416 : 200} />
              <div className="play-btn">
                <a className="read-link" href="/base/video" target="_blank">
                  <Image className="play-img" src={playBtn} alt="ICO" />
                </a>
              </div>
            </div>

            <div className="paragraph">
              <p className="one">
                Duis vel varius quam. Vivamus facilisis massa at quam interdum scelerisque. Morbi ullamcorper ante elit, vel condimentum ipsum eleifend eu. Suspendisse potenti. Aliquam vestibulum massa at lorem porttitor imperdiet. Nulla eleifend sem
                purus, in convallis nisl dapibus eget. Nam accumsan sem nec ligula varius tincidunt. Vivamus at nibh eros. Ut augue quam, ullamcorper et rutrum id, pellentesque eu magna. Maecenas at dui non quam fermentum efficitur eu in lectus.
                Fusce sed nisi accumsan, placerat lorem eu, aliquet risus. Vestibulum quis convallis velit, ut dapibus magna. Aliquam elit nisl, cursus ac vestibulum eu, egestas non magna. Fusce et volutpat metus. Fusce interdum vel enim ac euismod.
                Fusce faucibus ligula eget efficitur tincidunt.
              </p>
              <p className="two">
                Maecenas at dui non quam fermentum efficitur eu in lectus. Fusce sed nisi accumsan, placerat lorem eu, aliquet risus. Vestibulum quis convallis velit, ut dapibus magna. Aliquam elit nisl, cursus ac vestibulum eu, egestas non magna.
                Fusce et volutpat metus. Fusce interdum vel enim ac euismod. Fusce faucibus ligula eget efficitur tincidunt.
              </p>
              <p className="three">
                Duis vel varius quam. Vivamus facilisis assa at quam interdum scelerisque. Morbi ullamcorper ante elit, vel condimentum ipsum eleifend eu. Suspendisse potenti. Aliquam vestibulum massa at lorem porttitor imperdiet. Nulla eleifend sem
                purus, in convallis nisl dapibus eget. Nam accumsan sem nec ligula varius tincidunt. Vivamus at nibh eros. Ut augue quam, ullamcorper et rutrum id, pellentesque eu magna. Maecenas at dui non quam fermentum efficitur eu in lectus.
                Fusce sed nisi accumsan, placerat lorem eu, aliquet risus. Vestibulum quis convallis velit, ut dapibus magna. Aliquam elit nisl, cursus ac vestibulum eu, egestas non magna. Fusce et volutpat metus. Fusce interdum vel enim ac euismod.
                Fusce faucibus ligula eget efficitur tincidunt.
              </p>
            </div>
            <FooterSocial>
              <h1>Share Now</h1>
              <ul className="d-flex">
                {/* <li className="fb-icon">
                  <Link href="/">
                    <a>
                      <Image src={facebookIcon} width={27} height={27} alt="ICO" />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>
                      <Icons name="twitter" />
                    </a>
                  </Link>
                </li> */}
                <li>
                  <Link href="#">
                  <a className="read-link" href={'https://www.instagram.com/futuregrailofficial/?igshid=NmNmNjAwNzg%3D'} target="_blank" rel="noreferrer">
                      <Icons name="insta" />
                    </a>
                  </Link>
                </li>
              </ul>
            </FooterSocial>
          </DetailsBox>
        </StoriesDetailsBox>
      </Container2>
      <RelatedStories />
      <Newsletter />
    </Container>
  )
}

const RelatedStoriesBox = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-image: url('/images/customer/Media/related-stories-bg.png');
    background-size: 100%;
    z-index: -1;
    @media screen and (max-width: 768px) {
      background: url('/images/customer/Media/md-mr-bg-img.png');
      background-size: 100%;
    }
  }
`

const RelatedListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem 0;
  padding: 15rem 10rem;
  z-index: 1;
  .heading-2 {
    width: 100%;
    font-style: normal;
    font-size: 6rem;
    line-height: 104%;
    font-weight: 400;
    text-transform: uppercase;
    color: #ffffff;
  }
  @media screen and (max-width: 1395px) {
    padding: 12rem 15rem;
  }
  @media screen and (max-width: 798px) {
    padding: 6rem 2.5rem;
    gap: 0;
    .heading-2 {
      font-size: 3rem;
    }
  }
`
const GridContianer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 2rem 0rem;
  gap: 2rem;
  /* place-content: center; */
  @media screen and (max-width: 1528px) {
    grid-template-columns: auto auto;
  }
  @media screen and (max-width: 1018px) {
    grid-template-columns: auto;
  }
  @media screen and (max-width: 798px) {
    grid-template-columns: auto;
    gap: 5rem;
  }
`
const dummy_data = [
  {
    image: { src: img2, alt: 'storie-2', w: 550, h: 250 },
    subText: 'Times News',
    title: 'The future of Vault is in Singapore — and it costs...',
    description: 'Consectetur Interdum adipiscing non ornare purus sed. Lacus tortor massa amet varius sit Id  elit id.',
    date: 'June 23, 2022',
    min: '07 Min Read',
    isVideo: false,
  },
  {
    image: { src: img3, alt: 'storie-3', w: 550, h: 250 },
    subText: 'ET News',
    title: 'Futuregrail CEO Ali Nael to hold Singapore town hall with employees...',
    description: 'Consectetur Interdum adipiscing non ornare purus sed. Lacus tortor massa amet varius sit Id  elit id.',
    date: 'May 14, 2022',
    min: '09 Min Read',
    isVideo: false,
  },
  {
    image: { src: img1, alt: 'storie-1', w: 550, h: 250 },
    subText: 'DBC News',
    title: 'Members Club: The Way of Futuregrail gets...',
    description: 'Consectetur Interdum adipiscing non ornare purus sed. Lacus tortor massa amet varius sit Id  elit id.',
    date: 'May 14, 2022',
    min: '17 Min Watch',
    isVideo: true,
  },
]

function RelatedStories() {
  return (
    <RelatedStoriesBox>
      <RelatedListBox>
        <h1 className="heading-2">Related Stories</h1>
        <GridContianer>
          {dummy_data.map((item, key) => (
            <CardComponent
              isColor={'#FFFFFF'}
              key={key}
              image={item.image}
              subText={item.subText}
              title={item.title}
              description={item.description}
              date={item.date}
              min={item.min}
              link={'/base/media/details'}
              isVideo={item.isVideo}
              isPTagColor={'#BDC0C0'}
            />
          ))}
        </GridContianer>
      </RelatedListBox>
    </RelatedStoriesBox>
  )
}

export default MediaDetails
