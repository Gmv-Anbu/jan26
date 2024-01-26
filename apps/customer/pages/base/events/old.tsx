import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import { NextPage } from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import img1 from '../../../public/images/customer/Events/events/venue-1.png'
import img2 from '../../../public/images/customer/Events/events/venue-2.png'
import img3 from '../../../public/images/customer/Events/events/venue-3.png'
import img4 from '../../../public/images/customer/Events/events/venue-4.png'
import img5 from '../../../public/images/customer/Events/events/venue-5.png'
import icon1 from '../../../public/images/customer/Events/events/icon-1.png'
import icon2 from '../../../public/images/customer/Events/events/icon-2.png'
import icon3 from '../../../public/images/customer/Events/events/audio.png'
import icon4 from '../../../public/images/customer/Events/events/icon-4.png'
import icon5 from '../../../public/images/customer/Events/events/bespoke.png'
import icon6 from '../../../public/images/customer/Events/events/venue.png'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import { useRouter } from 'next/router'
import { Loader } from '@apps/customer/modules/shared/components/Loader'
import { useState, useRef } from 'react'
import PlayButtonImg from '../../../public/images/customer/playbtn.png'

interface StyleProps {
  isH1Color: string
  isPColor: string
  isMargin?: string
}
interface PageProps {
  page: string
}
const Container = styled.div`
  width: 100%;
`
const VenueWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-image: url('/images/customer/Media/media-all-stories-bg-image.png');
    background-repeat: no-repeat;
    background-size: 100% 34rem;
    z-index: -1;
    @media screen and (max-width: 768px) {
      background-image: url('/images/customer/Media/FUTUREGRAIL-MR.png');
      background-repeat: no-repeat;
      background-size: 100% 15rem;
      opacity: 0;
    }
  }
`
const VenueContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem 0;
  padding: 120px 0rem 140px 0rem;
  @media screen and (max-width: 1464px) {
    padding: 10rem 0rem 100px 0rem;
  }
  @media screen and (max-width: 768px) {
    padding: 6rem 3rem 60px 3rem;
  }
`
const Heading = styled.div<StyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.isMargin ? '0' : '1.5rem')};
  z-index: 1;
  h1 {
    margin: ${(props) => (props.isMargin ? props.isMargin : '')};
    font-style: normal;
    font-weight: 400;
    font-size: 6rem;
    line-height: 104%;
    text-transform: uppercase;
    color: ${(props) => (props.isH1Color ? props.isH1Color : '#0e1818')};
  }
  p {
    max-width: 100.7rem;
    max-height: 5.2rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    text-align: center;
    letter-spacing: -0.015em;
    color: ${(props) => (props.isPColor ? props.isPColor : '#4e4e4e')};
  }
  @media screen and (max-width: 768px) {
    h1 {
      margin: ${(props) => (props.isMargin ? '0 0 4px 0' : '')};
      text-align: center;
      font-size: 3rem;
    }
    p {
      max-height: fit-content;
      font-size: 1.75rem;
    }
  }
  @media screen and (max-width: 380px) {
    h1 {
      display: flex;
      flex-direction: column;
    }
    .create-event-h1 {
      color: #4e4e4e;
    }
  }
`

const FelxWrapper = styled.div`
  width: 100%;
  display: flex;
  max-height: 663px;
  justify-content: center;
  gap: 29px;
  @media screen and (max-width: 1464px) {
    align-items: center;
    transform: scale(0.8);
    min-width: 900px;
  }
  @media screen and (max-width: 768px) {
    transform: scale(1);
    align-items: center;
    flex-direction: column;
    max-height: fit-content;
    gap: 20px;
  }
`
const FlexBox1 = styled.div`
  max-width: 429px;
  max-height: 663px;
  img {
    max-height: 663px !important;
  }
  @media screen and (max-width: 1464px) {
    img {
      max-height: 100% !important;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 341px;
  }
`
const FlexBox2 = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 484px;
  gap: 28px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    max-height: fit-content;
    max-width: 341px;
    gap: 20px;
  }
`
const FlexBox3 = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 474px;
  overflow: hidden;
  gap: 28px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    max-height: fit-content;
    max-width: 341px;
    gap: 20px;
  }
`

const FacilitiesWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* background-color: black; */
  gap: 20px 0;
  padding: 0rem 0rem 15rem 0rem;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-image: url('/images/customer/Events/events/new-bg-img.webp');
    background-repeat: no-repeat;
    background-size: 100% 120rem;
    /* z-index: 1; */
    @media screen and (max-width: 1268px) {
      background-size: 100% 148rem;
      /* z-index: 0; */
    }
    @media screen and (max-width: 768px) {
      background-image: url('/images/customer/Events/events/bg-img-mr.png');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: 100% 50%;
      opacity: 0.6;
      /* z-index: 0; */
    }
  }
  @media screen and (max-width: 768px) {
    background-color: black;
    padding: 60px 3rem 10rem 3rem;
  }
`

const GridContianer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  gap: 6rem;
  place-content: center;
  z-index: 1;
  margin: 8rem 0 0 0;
  @media screen and (max-width: 1260px) {
    grid-template-columns: auto auto;
  }
  @media screen and (max-width: 742px) {
    margin: 4rem 0 0 0;
    grid-template-columns: auto;
    gap: 2rem;
  }
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 5rem;
  border: 1px solid #3f3f3f;
  max-width: 40rem;
  max-height: 24rem;
  min-width: 40rem;
  min-height: 24rem;
  .facilities-image-box {
    max-width: 64px;
    margin-bottom: 30px;
  }
  p {
    max-width: 28rem;
    font-style: normal;
    font-weight: 400;
    font-size: 2.2rem;
    line-height: 120%;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
  span {
    margin: 0.8rem 0 0 0;
    max-width: 28rem;
    font-style: italic;
    font-weight: 200;
    font-size: 1.4rem;
    line-height: 120%;
    text-align: center;
    text-transform: capitalize;
    color: #bdc0c0;
  }
  @media screen and (max-width: 1268px) {
    .facilities-image-box {
      max-width: 54px;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 768px) {
    justify-content: center;
    padding: 2rem;
    min-height: 20rem;
    p {
      max-width: 30rem;
      font-size: 2.75rem;
    }
  }
`
const HostEventWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  gap: 5rem 0;
  padding: 12rem 5rem 15rem 5rem;
  @media screen and (max-width: 768px) {
    padding: 6rem 3rem 10rem 3rem;
  }
`

const ButtonPrimary = styled.button`
  position: relative;
  background: #29898b;
  color: #fff;
  border: 1px solid #29898b;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 114%;
  text-transform: uppercase;
  width: 282px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :disabled {
    filter: blur(0.6px);
    cursor: not-allowed;
  }
  .loader {
    position: absolute;
  }
  @media screen and (max-width: 768px) {
    width: 343px;
    height: 46px;
  }
`
const VisitWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .btn-border {
    width: 100%;
    margin-top: 5.5rem;
    position: relative;
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
    @media screen and (max-width: 1545px) {
      width: 96%;
    }
    @media screen and (max-width: 780px) {
      margin: 5rem 0 5rem 0;
    }
  }
  @media screen and (max-width: 470px) {
    display: flex;

    flex-direction: column;
  }
  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: column;
  }

  // &.museumPage {
  .right-content {
    width: 55%;
    .clock {
      transform: scale(1.5);
      left: 17rem;
    }
    .loc {
      top: 10rem;
      right: -3rem;
    }
  }
  @media screen and (max-width: 780px) {
    .right-content {
      width: 100%;
      .clock {
        transform: scale(1);
        left: 17rem;
      }
      .loc {
        transform: scale(1);
        right: 2rem;
      }
    }
  }
  // }
`
const VisitSecLeft = styled.div`
  width: 100%;
  @media screen and (max-width: 470px) {
    width: 100%;
  }
  @media screen and (max-width: 780px) {
    width: 100%;
  }
`
const VideoWrapper = styled.div`
  cursor: pointer;
  video {
    object-fit: cover;
    width: 100%;
    height: 800px;
    margin-bottom: -5px;
    @media screen and (max-width: 470px) {
      object-fit: cover;
      width: 100%;
      height: 45rem;
      margin-bottom: -5px;
    }
  }
  video::-webkit-media-controls-play-button {
    display: none;
  }
  video::-webkit-media-controls-start-playback-button {
    display: none;
  }
  video::-webkit-media-controls-play {
    display: none;
  }
  video::-webkit-media-controls-enclosure {
    overflow: hidden;
  }
  video::-moz-media-controls-play-button {
    display: none;
  }

  .videoComponent {
    position: relative;
    @media screen and (max-width: 470px) {
      object-fit: cover;
      width: 100%;

      margin-bottom: -5px;
    }
    @media screen and (max-width: 330px) {
      width: 100%;
      video {
        height: 47rem !important;
      }
    }
    @media screen and (max-width: 780px) {
      width: 100%;
      video {
        height: 60rem;
      }
    }
  }
`

const PlayBtn = styled.div`
  @media screen and (max-width: 470px) {
    width: 6.5em;
    left: 42.8%;
    top: 45%;
  }
  width: 8.6em;
  position: absolute;

  left: 47.8%;
  z-index: 1;
  top: 46%;
  border: none;
  transform: translate(-50%, -50%);
  display: block;
  transform: scale(1);
  animation: pulse 1.5s cubic-bezier(0.29, 0.35, 0.94, 0.8) infinite alternate;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 transparent;
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px transparent;
    }
  }

  // @keyframes playBtnAnim {
  //   from {
  //     transform: scale(0);
  //     opacity: 0;
  //   }
  //   to {
  //     transform: scale(1);
  //     opacity: 1;
  //   }
  // }
  .playBtn-img {
    width: 86px !important;
    height: 86px !important;
    cursor: pointer;
    @media screen and (max-width: 425px) {
      width: 36px !important;
      height: 36px !important;
    }
  }
`

const facilitiesData = [
  { title: 'Venue Space for upto 80 pax', image: icon6, subHead: 'Our venue can comfortably seat 80 pax for half day or full day bookings' },
  { title: 'Private Guided Tour of the Museum', image: icon2, subHead: 'Our team can provide a personalised tour of our museum collection to educate & inspire' },
  { title: 'Drinks & Foods', image: icon1, subHead: 'A selection of the finest drinks & capanes - Customisable upon request ' },
  { title: 'Audio & Visual', image: icon3, subHead: 'Surround sound system, 4K projector, 4 metre wide museum screen & monitors' },
  { title: 'Full Event Staff', image: icon4, subHead: 'Full service bartenders, servers, waiters and security' },
  { title: 'Bespoke Business Development', image: icon5, subHead: 'Expand your audience and make meaningful new connections - Customisable upon request ' },
]
const EventsPage: NextPage = () => {
  const router = useRouter()
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)
  const handlePlay = () => {
    setIsPlaying(true)
    videoRef.current.play()
  }
  const handlePause = () => {
    setIsPlaying(false)
  }
  const handleClick = () => {
    if (isPlaying) {
      setIsPlaying(false)
      videoRef.current.pause()
    }
  }
  const handleStop = () => {
    setIsPlaying(false)
    videoRef.current.currentTime = 0
    videoRef.current.pause()
  }
  return (
    <Container>
      <VisitWrap>
        <VisitSecLeft>
          <VideoWrapper>
            <div className="videoComponent">
              <PlayBtn>{!isPlaying && <Image onClick={handlePlay} className="playBtn-img" src={PlayButtonImg} alt="ICO" />}</PlayBtn>

              <video
                onClick={handleClick}
                onPause={handlePause}
                onPlay={handlePlay}
                onEnded={handleStop}
                ref={videoRef}
                // muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                controlsList="nodownload noplaybackrate"
                poster="/images/customer/home/event-thumbnail.webp"
              >
                <source type="video/mp4" src={'/video/Futuregrail_teaser 10mb.mp4'} />
              </video>
              {/* <WatchesCount page={page}>
              <span>200</span>
              <h2>historical watches</h2>
            </WatchesCount>
            {page === 'museum' && <Divider />}
            <Collection page={page}>
              <span>1800’s</span>
              <h2>dated collections</h2>
            </Collection> */}
            </div>
          </VideoWrapper>
        </VisitSecLeft>
        {/* <Banner heading={'EVENTS'} description={'The FutureGrail Experience'} height={'484px'} /> */}
        <VenueWrapper>
          <VenueContent>
            <Heading isH1Color="#0e1818" isPColor="#4e4e4e">
              <h1>VENUE</h1>
              <p>
                {
                  "The home of Singapore's most immersive venue. A place where conversation, inspiration, celebration and connections converge. Whether you're looking to entertain, showcase a launch, host a celebration, bring a product to life or educate your partners and customers - there's no better place to host your next event. "
                }
              </p>
            </Heading>
            <FelxWrapper>
              <FlexBox1>
                <Image src={img1} alt={'ICO'} width={645} height={995} />
              </FlexBox1>
              <FlexBox2>
                <div className="img-1">
                  {' '}
                  <Image src={img2} alt={'ICO'} width={727} height={365} />
                </div>
                <div className="img-2">
                  {' '}
                  <Image src={img3} alt={'ICO'} width={727} height={584} />
                </div>
              </FlexBox2>
              <FlexBox3>
                <div className="img-1">
                  <Image src={img4} alt={'ICO'} width={712} height={553} />
                </div>
                <div className="img-2">
                  <Image src={img5} alt={'ICO'} width={711} height={401} />
                </div>
              </FlexBox3>
            </FelxWrapper>
          </VenueContent>
        </VenueWrapper>

        <FacilitiesWrapper>
          <Heading isH1Color="#FFFFFF" isPColor="#BDC0C0" isMargin="120px 0 20px 0">
            <h1 className="fac-h1">Our facilities</h1>
            <p>{"Discover a unique event space that's one in a million"}</p>
          </Heading>

          <GridContianer>
            {facilitiesData.map((item, key) => (
              <Box key={key}>
                <div className="facilities-image-box">
                  <Image src={item.image} alt={'ICO'} />
                </div>
                <p>{item.title}</p>
                <span>{item.subHead}</span>
              </Box>
            ))}
          </GridContianer>
        </FacilitiesWrapper>

        <HostEventWrapper>
          <Heading isH1Color="#0e1818" isPColor="#4e4e4e">
            <h1 className="create-event-h1">
              customize <span>your own event</span>
            </h1>
            <p>Tailored to Perfection: Create Your Dream Event with Us. Contact us today at events@futuregrail.com</p>
          </Heading>
          <ButtonPrimary
            disabled={isBtnLoading}
            onClick={() => {
              setIsBtnLoading(true)
              router.push('/base/events/create')
            }}
          >
            {isBtnLoading && (
              <div className="loader">
                <Loader width="40" opacity="0.5" />
              </div>
            )}{' '}
            Host an event
          </ButtonPrimary>
        </HostEventWrapper>

        <Newsletter />
      </VisitWrap>
    </Container>
  )
}

export default EventsPage
