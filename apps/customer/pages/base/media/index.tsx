import CardComponent from '@apps/customer/components/card/card'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import img1 from '../../../public/images/customer/Media/media-img-1.png'
import img1sm from '../../../public/images/customer/Media/img-1-sm.png'
import img2 from '../../../public/images/customer/Media/media-img-2.png'
import img3 from '../../../public/images/customer/Media/media-img-3.png'
import s1 from '../../../public/images/customer/Media/storie-img-8.png'
import s2 from '../../../public/images/customer/Media/storie-img-2.png'
import s3 from '../../../public/images/customer/Media/storie-img-3.png'
import s4 from '../../../public/images/customer/Media/storie-img-4.png'
import s5 from '../../../public/images/customer/Media/storie-img-5.png'
import s6 from '../../../public/images/customer/Media/storie-img-7.png'
import playBtn from '../../../public/images/customer/playbtn.png'

import imgCard1 from '../../../public/images/customer/Museum/museum-video-thumbnail.webp'
import imgCard2 from '../../../public/images/customer/Media/img-2.jpg'
import imgCard3 from '../../../public/images/customer/Media/img-3.png'

import dbcNewsImg from '../../../public/images/customer/Media/dbc-news.webp'
import etNewsImg from '../../../public/images/customer/Media/et-news.webp'
import timesNewsImg from '../../../public/images/customer/Media/et-news.webp'

const MediaMainContainer = styled.section`
  width: 100%;
`
const MediaHomepage = styled.div`
  position: relative;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    background-image: url('/images/customer/Media/media-home-bg.webp');
    width: 100%;
    height: 100%;
    background-size: 100%;
  }
`
const MediaHomePageDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
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
  @media screen and (max-width: 769px) {
    justify-content: flex-start;
    padding: 13.8rem 2rem 5rem;
    max-width: 72rem;
  }
  @media screen and (max-width: 575px) {
    max-width: 54rem;
  }
  .heading-1 {
    width: 100%;
    padding: 2.5rem 0;
    h1 {
      color: rgba(255, 255, 255, 1);
      font-style: normal;
      font-weight: 200;
      font-size: 6rem;
      line-height: 104%;
      width: 49.5rem;
      @media screen and (max-width: 768px) {
        width: 100%;
        font-size: 5rem;
      }
      @media screen and (max-width: 625px) {
        font-size: 3rem;
        padding: 0 0 0 0;
        margin: 0 0 -0.4rem 0;
      }
    }
    @media screen and (max-width: 624px) {
      max-width: 342px;
    }
    @media screen and (max-width: 498px) {
      padding: 0rem 0;
    }
  }
`
const MediaDetailsBox = styled.div`
  display: flex;
  max-width: 144rem;
  justify-content: space-between;
  gap: 0 3rem;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem 0;
  }
  .box1,
  .box2 {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  .box1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem 0;
    @media screen and (max-width: 768px) {
      min-width: 100%;
      padding: 2.5rem 0;
    }
    .image-box {
      position: relative;
      width: 100%;
      max-width: 67.2rem;
      height: 27rem;
      @media screen and (min-width: 1748px) {
        max-width: 100%;
      }
      .play-btn {
        width: 5.5em;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: block;
        cursor: pointer;
      }
    }
    p {
      color: #bdc0c0;
    }
    .p-1 {
      max-width: 10rem;
      font-style: normal;
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 125%;
    }
    .box-1-heading {
      /* text-align: justify; */
      max-width: 63rem;
      font-style: normal;
      font-weight: 600;
      font-size: 4.8rem;
      line-height: 120%;
      color: #ffffff;
      &:hover {
        color: #2a7575;
      }
      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }
    .p-2 {
      /* text-align: justify; */
      max-width: 48rem;
      font-style: normal;
      font-weight: 400;
      font-size: 1.8rem;
      line-height: 142.5%;
      letter-spacing: -0.015rem;
      color: #bdc0c0;
      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }
    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 3rem;
      p {
        max-width: 15.2rem;
        font-style: normal;
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 125%;
        color: #bdc0c0;
      }
      p:last-child {
        color: #2a7575;
      }
    }
    @media screen and (max-width: 625px) {
      .p-1 {
        font-size: 1.5rem;
      }
      .box-1-heading {
        font-size: 2.25rem;
      }
      .p-2 {
        font-size: 1.75rem;
      }
      .date p {
        font-size: 1.5rem;
      }
      .date p:last-child {
        font-weight: 500;
      }
    }
    .image-md {
      display: block;
    }
    .image-sm {
      display: none;
    }
    @media screen and (max-width: 768px) {
      .image-box-sm {
        position: relative;
        width: 100%;
        .play-btn {
          width: 5.8em;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: block;
          cursor: pointer;
        }
      }
      .main-img-box {
        max-width: 342px;
        max-height: 200px;
        min-width: 342px;
        min-height: 200px;
      }
      .image-md {
        display: none;
      }
      .image-sm {
        max-width: 342px;
        max-height: 200px;
        display: block;
      }
    }
    @media screen and (max-width: 498px) {
      gap: 2.05rem 0;
    }
  }
  @media screen and (max-width: 624px) {
    max-width: 342px;
  }
  .box2 {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    gap: 5rem 0;
    .card {
      display: flex;
      flex-direction: row;
      gap: 0 2rem;
      .image-lg {
        display: block;
      }
      .image-sm {
        display: none;
      }
      @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 1rem 0;
        padding: 2.5rem 0;
        .image-lg {
          display: none;
        }
        .image-sm {
          max-width: 342px;
          max-height: 200px;
          min-width: 342px;
          min-height: 200px;
          display: block;
        }
      }
      div {
        width: 50%;
        @media screen and (max-width: 768px) {
          min-width: 100%;
        }
      }

      .detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem 0;
        @media screen and (max-width: 768px) {
          min-width: 342px;
        }
        @media screen and (max-width: 374px) {
          min-width: 282px;
        }
        p {
          color: #bdc0c0;
        }
        .p-1 {
          font-style: normal;
          font-weight: 600;
          font-size: 1.6rem;
          line-height: 125%;
        }
        h2 {
          /* text-align: justify; */
          font-style: normal;
          font-weight: 600;
          font-size: 2.2rem;
          line-height: 120%;
          color: #ffffff;
          &:hover {
            color: #2a7575;
          }
          @media screen and (max-width: 768px) {
            font-size: 4.2rem;
          }
        }
        .p-2 {
          /* text-align: justify; */
          font-style: normal;
          font-weight: 400;
          font-size: 1.8rem;
          line-height: 142.5%;
          letter-spacing: -0.015rem;
          color: #bdc0c0;
        }
        .date {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0 3rem;
          p {
            font-style: normal;
            font-weight: 600;
            font-size: 1.6rem;
            line-height: 125%;
            color: #bdc0c0;
          }
          p:last-child {
            color: #2a7575;
          }
        }
        @media screen and (max-width: 625px) {
          .p-1 {
            font-size: 1.5rem;
          }
          h2 {
            font-size: 2.25rem;
          }
          .p-2 {
            font-size: 1.75rem;
          }
          .date p {
            font-size: 1.5rem;
          }
          .date p:last-child {
            font-weight: 500;
          }
        }
      }
      @media screen and (max-width: 498px) {
        gap: 2.05rem 0;
      }
    }
    @media screen and (max-width: 498px) {
      gap: 4rem 0;
    }
  }
`
const ButtonPrimary = styled.button`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    width: fit-content;
    padding: 2rem 4.875rem;
    background: #29898b;
    color: #fff;
    font-size: 2rem;
    font-weight: 400;
    border: 1px solid #29898b;
    text-transform: uppercase;
    cursor: pointer;
  }
  @media screen and (max-width: 424px) {
    padding: 0;
    width: 154px;
    height: 50px;
  }
`

const MediaContainer: NextPage = () => {
  return (
    <MediaMainContainer>
      <MediaHomepage>
        <MediaHomePageDetailsBox>
          <div className="heading-1">
            <h1>Latest Stories</h1>
          </div>
          <MediaDetailsBox>
            <div className="box1">
              <div className="image-box image-md">
                <Image className="main-img" src={imgCard1} objectFit='cover' alt={'image'} width={672} height={270} />
                <div className="play-btn">
                  <a className="read-link" href="/base/video" target="_blank">
                    <Image className="play-img" src={playBtn} alt="ICO" />
                  </a>
                </div>
              </div>
              <div className="image-box-sm image-sm">
                <div className="main-img-box">
                  {' '}
                  <Image src={imgCard1} objectFit='cover' alt="media-img" width={342} height={200} />
                </div>

                <div className="play-btn">
                  <a className="read-link" href="/base/video" target="_blank">
                    <Image className="play-img" src={playBtn} alt="ICO" />
                  </a>
                </div>
              </div>
              <p className="p-1">DBC News</p>
              <Link href={'#'}>
                <a className="read-link" href={'https://www.bloomberg.com/press-releases/2023-04-05/watch-investment-advisory-firm-futuregrail-set-to-open-in-singapore-this-april-hosting-world-s-first-online-fractionalised'} target="_blank" rel="noreferrer">
                  {' '}
                  <h2 className="box-1-heading">Watch Investment Advisory Firm, FutureGrail, Set to Open in Singapore this April</h2>
                </a>
              </Link>
              <p className="p-2">FutureGrail was started by renowned watch collector and investor Ali Nael and business partner Mohsin Rizvi...</p>
              <span className="date">
                <p>April 5, 2023</p>
                {/* <a className="read-link" href="/base/video" target="_blank"> */}
                  {' '}
                  <p>10 Min Read</p>
                {/* </a> */}
              </span>
            </div>
            <div className="box2">
              <Card
                image={imgCard2}
                text1={'Times News'}
                text2={'FutureGrail, the premier investment advisory firm for high-end watches, announces the grand opening of its new location in Singapore'}
                text3={'The company offers expert advice and guidance to watch collectors and investors interested in this new and increasingly...'}
                text4={'April 5, 2023'}
                text5={'10 Min Read'}
                isHref={'https://finance.yahoo.com/news/watch-investment-advisory-firm-futuregrail-001500015.html'}
              />
              <Card
                image={imgCard3}
                text1={'ET News'}
                text2={'Watch Museum displaying over 200 ultra-rare vintage Patek Philippe and other historical timepieces from the 19th and 20th centuries'}
                text3={'FutureGrail is proud to unveil its highly anticipated Watch Museum, featuring one of the worlds rarest collections of....'}
                text4={'April 5, 2023'}
                text5={'7 Min Read'}
                isHref={'https://www.prnewswire.com/apac/news-releases/watch-investment-advisory-firm-futuregrail-set-to-open-in-singapore-this-april-hosting-worlds-first-online-fractionalised-auction-of-high-end-watches-museum-of-rare-timepieces-and-tax-free-storage-vaults-301789604.html'}
              />
            </div>
          </MediaDetailsBox>
        </MediaHomePageDetailsBox>
      </MediaHomepage>
      <MediaAllStoriesList />

      <Newsletter />
    </MediaMainContainer>
  )
}

function Card({ image, text1, text2, text3, text4, text5, isHref }) {
  return (
    <div className="card">
      <div className="image-lg">
        <Image src={image} alt="media-img" objectFit='cover' width={380} height={270} />
      </div>
      <div className="image-sm">
        <Image src={image} alt="media-img" objectFit='cover' width={342} height={200} />
      </div>

      <div className="detail">
        <p className="p-1">{text1}</p>
        <a className="read-link" href={isHref} target="_blank" rel="noreferrer">
          {' '}
          <h2>{text2}</h2>
        </a>
        <p className="p-2">{text3}</p>
        <span className="date">
          <p>{text4}</p>
          <p>{text5}</p>
        </span>
      </div>
    </div>
  )
}

const StoriesWrapper = styled.div`
  width: 100%;
  padding: 4.8rem 0;
  @media screen and (max-width: 768px) {
    padding: 2.5rem 0 7.5rem 0;
  }
`

const MediaAllStoriesContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/images/customer/Media/media-all-stories-bg-image.png');
  background-repeat: no-repeat;
  background-size: 100% 25%;
  @media screen and (max-width: 768px) {
    background-image: url('/images/customer/Media/FUTUREGRAIL-MR.png');
    background-repeat: no-repeat;
    background-size: 100% 25rem;
  }
`

const MediaStoriesListBox = styled.div`
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
    max-width: 130rem;
  }
  @media screen and (max-width: 991px) {
    max-width: 96rem;
  }
  @media screen and (max-width: 769px) {
    justify-content: flex-start;
    padding: 10.8rem 2rem 5rem;
    max-width: 72rem;
  }
  @media screen and (max-width: 575px) {
    max-width: 54rem;
  }
  .heading-2 {
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 6rem;
    line-height: 104%;
    text-transform: uppercase;
    color: #0e1818;
    margin: 0 0 50px 0;
  }
  @media screen and (max-width: 769px) {
    width: 100%;
    padding: 5rem 2rem 10rem;
    justify-content: flex-start;
    .heading-2 {
      font-size: 3rem;
      margin: 0 0 24px 0;
    }
  }
  @media screen and (max-width: 624px) {
    .heading-2 {
      max-width: 342px;
    }
  }
  @media screen and (max-width: 424px) {
    padding-bottom: 32px;
  }
`

const GridContianer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: flex-start;
  gap: 4.5rem;
  /* place-content: center; */
  @media screen and (max-width: 1498px) {
    grid-template-columns: auto auto;
  }
  @media screen and (max-width: 1100px) {
    
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: auto;
  }
  @media screen and (max-width: 625px) {
    max-width: 342px;
    grid-template-columns: auto;
  }
`
const Line = styled.div`
  display: block;
  width: 100%;
  height: 2px;
  background: rgb(65, 173, 155);
  background: radial-gradient(circle, rgba(65, 173, 155, 0.2723214285714286) 0%, rgba(200, 199, 193, 0) 100%);
  margin: -4rem 0 6rem 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const PaginationBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .pagination-box {
    display: block;
  }
  @media screen and (max-width: 768px) {
    .pagination-box {
      display: none;
    }
  }
`
const dummy_data = [
  {
    image: { src: dbcNewsImg, alt: 'storie-1', w: 0, h: 0 },
    subText: 'DBC News',
    title: 'Future Grail is premiering an exclusive museum and end-to-end vault service...',
    description: 'Future Grail services include authentication, grading, servicing, 3D scanning, minting the NFT’s...',
    date: 'October 10, 2022',
    min: '10 Min Read',
    isVideo: true,
    isHref: true,
    isLink: 'https://www.einnews.com/pr_news/594986198/future-grail-is-premiering-an-exclusive-museum-and-end-to-end-vault-service-with-fully-integrated-web3-capabilities',
  },
  {
    image: { src: etNewsImg, alt: 'storie-3', w: 0, h: 0 },
    subText: 'ET News',
    title: '5 exciting year-end lifestyle exhibitions and festivals to visit',
    description: 'Formerly presented as a part of JeweLuxe, the Singapore Watch Fair debuts as a stand- alone event at...',
    date: 'October 7, 2022',
    min: '7 Min Read',
    isVideo: false,
    isHref: true,
    isLink: 'https://www.thepeakmagazine.com.sg/gallery/lifestyle/year-end-events-exhibitions-festivals-2022-visit/',
  },
  {
    image: { src: timesNewsImg, alt: 'storie-2', w: 0, h: 0 },
    subText: 'Times News',
    title: 'Singapore Watch Fair 2022: An Occasion To Celebrate Time',
    description: 'Happening for the first time, Singapore Watch Fair will make its debut in the city’s ...',
    date: 'September 29, 2022',
    min: '07 Min Read',
    isVideo: false,
    isHref: true,
    isLink: 'https://www.luxuo.com/style/watches/singapore-watch-fair-2022-an-occasion-to-celebrate-time.html',
  },
  {
    image: { src: s4, alt: 'storie-4', w: 0, h: 0 },
    subText: 'ET News',
    title: 'The sixth annual Blockchain Expo event will be hosted in London at...',
    description: 'Consectetur Interdum adipiscing non ornare purus sed. Lacus tortor massa amet varius sit Id  elit id.',
    date: 'July 21, 2022',
    min: '07 Min Read',
    isVideo: false,
  },
  {
    image: { src: s5, alt: 'storie-5', w: 0, h: 0 },
    subText: 'Times News',
    title: 'Influencer Marketing Hub - Connect promises to be one of the best...',
    description: 'Consectetur Interdum adipiscing non ornare purus sed. Lacus tortor massa amet varius sit Id  elit id.',
    date: 'June 23, 2022',
    min: '11 Min Read',
    isVideo: false,
  },
  {
    image: { src: s6, alt: 'storie-6', w: 0, h: 0 },
    subText: 'ET News',
    title: 'Futuregrail COO Mohsin to hold Singapore town hall with employees...',
    description: 'Consectetur Interdum adipiscing non ornare purus sed. Lacus tortor massa amet varius sit Id  elit id.',
    date: 'July 21, 2022',
    min: '13 Min Watch',
    isVideo: true,
  },
]

function MediaAllStoriesList() {
  return (
    <StoriesWrapper>
      <MediaAllStoriesContainer>
        <MediaStoriesListBox>
          <h1 className="heading-2">All Stories</h1>
          <GridContianer>
            {dummy_data.slice(0,3).map((item, key) => (
              <CardComponent
                isColor={'#0e1818'}
                key={key}
                image={item.image}
                subText={item.subText}
                title={item.title}
                description={item.description}
                date={item.date}
                min={item.min}
                isHref={item.isHref}
                link={'/base/media/details'}
                isVideo={item.isVideo}
                isLink={item.isLink}
              />
            ))}
          </GridContianer>
        </MediaStoriesListBox>
        <Line></Line>
        {/* <PaginationBox>
          <ButtonPrimary
            onClick={() => {
              Toast.error('No page found!')
            }}
          >
            Load More
          </ButtonPrimary>
          <div className="pagination-box">
            <Pagination
              totalPage={1}
              currentPage={1}
              updatePage={() => {
                Toast.error('No page found!')
              }}
            />
          </div>
        </PaginationBox> */}
      </MediaAllStoriesContainer>
    </StoriesWrapper>
  )
}
export default MediaContainer
