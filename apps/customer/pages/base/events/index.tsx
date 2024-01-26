import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import { NextPage } from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import img1 from '../../../public/images/customer/Events/events/venue-1.png'
import img2 from '../../../public/images/customer/Events/events/venue-2.png'
import img3 from '../../../public/images/customer/Events/events/venue-3.png'
import img4 from '../../../public/images/customer/Events/events/venue-4.png'
import img5 from '../../../public/images/customer/Events/events/venue-5.png'

import img1New from '../../../public/images/customer/Events/events/venue-from-top.png'
import img2New from '../../../public/images/customer/Events/events/venue-people.png'
import img3New from '../../../public/images/customer/Events/events/venue-meet.png'
import img4New from '../../../public/images/customer/Events/events/venue-screen.png'
import img5New from '../../../public/images/customer/Events/events/venue-chairs.png'

import venueImg1 from '../../../public/images/customer/Events/venue/venue-1.png'
import venueImg3 from '../../../public/images/customer/Events/venue/venue-3.png'
import venueImg4 from '../../../public/images/customer/Events/venue/venue-4.png'
import venueImg5 from '../../../public/images/customer/Events/venue/venue-5.png'

import event1 from '../../../public/images/customer/Events/events/venue-from-top.png'
import event2 from '../../../public/images/customer/Events/events/venue-people.png'
import event3 from '../../../public/images/customer/Events/events/venue-meet.png'
import event4 from '../../../public/images/customer/Events/events/venue-screen.png'
import event5 from '../../../public/images/customer/Events/events/venue-chairs.png'
import event6 from '../../../public/images/customer/Events/events/venue-chairs.png'

import icon1 from '../../../public/images/customer/Events/events/icon-1.png'
import icon2 from '../../../public/images/customer/Events/events/icon-2.png'
import icon3 from '../../../public/images/customer/Events/events/audio.png'
import icon4 from '../../../public/images/customer/Events/events/icon-4.png'
import icon5 from '../../../public/images/customer/Events/events/bespoke.png'
import icon4New from '../../../public/images/customer/Events/events/facility-user.svg'
import icon6 from '../../../public/images/customer/Events/events/venue.png'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import { useRouter } from 'next/router'
import { Loader } from '@apps/customer/modules/shared/components/Loader'
import { useState, useRef, useEffect } from 'react'
import PlayButtonImg from '../../../public/images/customer/playbtn.png'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import Link from 'next/link'

import API from '@apps/customer/api/customer'
import { handleApiImage } from '@apps/customer/utils/helper'
import moment from 'moment'
import EventNewCard from '@apps/customer/components/EventCard/eventCardNew'

interface StyleProps {
  isH1Color: string
  isPColor: string
  isMargin?: string
  pWidth?: string
  pHeight? : string
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
  gap: 4rem 0;
  padding: 10rem 0 14rem 0rem;
  background: #f4f9f9;
  @media screen and (max-width: 1464px) {
    padding: 10rem 0rem 100px 0rem;
  }
  @media screen and (max-width: 768px) {
    padding: 6rem 3rem 60px 3rem;
  }
  &:before {
    content: '';
    width: 100%;
    height: 557px;
    left: 0;
    top: -4rem;
    position: absolute;
    z-index: 0;
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    background-image: url(/images/customer/Events/venue-bg.png);
    @media screen and (max-width: 500px) {
      background-image: url(/images/customer/Events/venue-bg-mob.png);
      width: 380px;
      height: 240px;
      top: 2rem;
    }
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
    max-width: ${(props) => (props.pWidth ? props.pWidth : '#0e1818')};
    max-height: ${(props) => (props.pHeight ? props.pHeight : '5.2rem')};
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
      margin: ${(props) => (props.isMargin ? '0 0 16px 0' : '')};
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
  @media screen and (max-width: 1300px) {
    min-width: 1420px;
  }
  @media screen and (max-width: 1050px) {
    transform: scale(0.6);
    height: 420px;
  }
  @media screen and (max-width: 768px) {
    height: auto;
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
  @media screen and (max-width: 769px) {
    max-width: 341px;
    margin-bottom: 115px;
  }
  .video-wrapper {
    margin-bottom: 20px;
    // display: none;
    // @media screen and (max-width: 768px) {
    //   display: block;
    //   margin-bottom: 20px;
    // }
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
  // .video-wrapper {
  //   display: block;
  //   @media screen and (max-width: 768px) {
  //     display: none;
  //   }
  // }
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
  padding: 12rem 0rem 14rem 0rem;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-image: url('/images/customer/Events/events/new-bg-img.webp');
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
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
  @media screen and (max-width: 768px) {
    &::after {
      content: '';
      position: absolute;
      background: url(/images/customer/home/TextureM.svg);
      top: 0;
      right: 0;
      width: 50rem;
      height: 100%;
      background-size: contain;
      z-index: 2;
    }
    position: relative;
    &::before {
      opacity: 1;
      background-position: bottom left;
      background-size: auto;
      top: -10rem;
    }
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
  justify-content: center;
  align-items: center;
  padding: 2.5rem 5rem;
  border: 1px solid #3f3f3f;
  max-width: 40rem;
  max-height: 24rem;
  min-width: 40rem;
  min-height: 24rem;
  .facilities-image-box {
    max-width: 64px;
    margin-bottom: 20px;
  }
  p {
    max-width: 26rem;
    font-style: normal;
    font-weight: 400;
    font-size: 2.2rem;
    line-height: 2.6rem;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
  span {
    margin: 0.8rem 0 0 0;
    max-width: 30rem;
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
  padding: 13rem 5rem 12rem 5rem;
  @media screen and (max-width: 768px) {
    padding: 6rem 3rem 10rem 3rem;
  }
`
const ButtonPrimary = styled.button`
  position: relative;
  background: #2a7575;
  color: #fff;
  border: 1px solid #2a7575;
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
    height: 243px;
    border-radius: 4px;
    @media screen and (max-width: 470px) {
      object-fit: cover;
      width: 100%;
      height: 180px;
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
    @media screen and (max-width: 780px) {
      width: 100%;
    }
    @media screen and (max-width: 470px) {
      object-fit: cover;
      width: 100%;
      margin-bottom: -5px;
    }
    @media screen and (max-width: 330px) {
      width: 100%;
    }
  }
`
const PlayBtn = styled.a`
  width: 5rem;
  position: absolute;
  left: 50%;
  z-index: 1;
  top: 50%;
  border: none;
  transform: translate(-50%, -50%);
  display: block;
  //animation: pulse 1.5s cubic-bezier(0.29, 0.35, 0.94, 0.8) infinite alternate;
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
  .playBtn-img {
    width: 50px !important;
    height: 50px !important;
    cursor: pointer;
    @media screen and (max-width: 425px) {
      width: 36px !important;
      height: 36px !important;
    }
  }
`
const RealEventsWrapper = styled.div`
  padding: 7rem 3rem 10rem;
  background: #fff;
  max-width: 148rem;
  margin: auto;
  width: 100%;
  @media screen and (max-width: 480px) {
    padding: 4rem 3rem 6rem 2rem;
  }
`
const EventTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5rem;
  border-bottom: 1.5286px solid #e1e1e1;
  @media screen and (max-width: 480px) {
    justify-content: center;
  }
`
const EventTime = styled.a`
  font-size: 22px;
  font-weight: 400;
  line-height: 26px;
  color: #4e4e4e;
  width: 16.4rem;
  padding: 2rem 0;
  text-align: center;
  cursor: pointer;
  &.active {
    color: #0e1818;
    font-weight: 600;
    position: relative;
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 5px;
      border-radius: 10px 10px 0 0px;
      background: #2a7575;
    }
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`
const EventListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8rem 4.6rem;
  @media screen and (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-gap: 5rem;
  }
  .nodata {
    font-size: 2rem;
    font-weight: 500;
  }
`


const eventList = [
  {
    id: 1,
    title: 'Influencer Marketing Hub - Connect promises to be one of the best...',
    time: '8:00am - 10:00am',
    date: 'June 23, 2022',
    fee: '$58',
  },
  {
    id: 2,
    title: 'Influencer Marketing Hub - Connect promises to be one of the best...',
    time: '8:00am - 10:00am',
    date: 'June 23, 2022',
    fee: '$15',
  },
  {
    id: 3,
    title: 'The sixth annual Blockchain Expo event will be hosted in London at...',
    time: '8:00am - 10:00am',
    date: 'June 23, 2022',
    fee: 'Free',
  },
  {
    id: 4,
    title: 'The sixth annual Blockchain Expo event will be hosted in London at...',
    time: '8:00am - 10:00am',
    date: 'June 23, 2022',
    fee: 'Free',
  },
  {
    id: 5,
    title: 'Influencer Marketing Hub - Connect promises to be one of the best...',
    time: '8:00am - 10:00am',
    date: 'June 23, 2022',
    fee: '$58',
  },
  {
    id: 6,
    title: 'Influencer Marketing Hub - Connect promises to be one of the best...',
    time: '8:00am - 10:00am',
    date: 'June 23, 2022',
    fee: '$15',
  },
]

const facilitiesData = [
  { title: 'Venue Space for upto 80 pax', image: icon6, subHead: 'Our venue can comfortably seat 80 pax for half day or full day bookings' },
  { title: 'Private Guided Tour of the Museum', image: icon2, subHead: 'Our team can provide a personalised tour of our museum collection to educate & inspire' },
  { title: 'Drinks & Foods', image: icon1, subHead: 'A selection of the finest drinks & capanes - Customisable upon request ' },
  { title: 'Audio & Visual', image: icon3, subHead: 'Surround sound system, 4K projector, 4 metre wide museum screen & monitors' },
  { title: 'Comprehensive event management', image: icon4, subHead: 'Comprehensive event staffing, including professional bartenders, servers, waitstaff, and security personnel' },
  { title: 'Bespoke Business Development', image: icon5, subHead: 'Expand your audience and make meaningful new connections - Customisable upon request ' },
]

const NewEventPage: NextPage = () => {
  const router = useRouter()
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)
  const [upcomingList, setUpcomingList] = useState([])
  const [pastList, setPastList] = useState([])
  const [currentList, setCurrentList] = useState([])

  const getPastEvents = () => {
    API.getEventsList('past')
    .then(res => {
      console.log('getPastEvents', res)
      if(res?.data?.data?.list) {
        setPastList(res?.data?.data?.list)
      }
    })
    .catch(err => {
      console.log('err')
    })
  }

  const getCurrentEvents = () => {
    API.getEventsList('live')
    .then(res => {
      console.log('getCurrentEvents', res)
      if(res?.data?.data?.list) {
        setCurrentList(res?.data?.data?.list)
      }
    })
    .catch(err => {
      console.log('err')
    })
  }

  const getUpcomingEvents = () => {
    API.getEventsList('upcoming')
    .then(res => {
      console.log('getUpcomingEvents', res)
      if(res?.data?.data?.list) {
        setUpcomingList(res?.data?.data?.list)
      }
    })
    .catch(err => {
      console.log('err')
    })
  }

  const { width } = useWindowSize()
  const videoRef = useRef(null)

  const handlePlay = () => {
    setIsPlaying(true)
    videoRef.current.play()
  }

  const handlePause = () => {
    setIsPlaying(false)
    videoRef.current.pause()
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

  const handleTab = (val) => {
    setActiveEvent(val)
    localStorage.setItem('eventsIndex', val)
  }

  useEffect(() => {
    let val = localStorage.getItem('eventsIndex')
    if(val) {
      setActiveEvent(val)
    } else {
      setActiveEvent('live')
    }
  }, [])

  useEffect(() => {
    getPastEvents()
    getCurrentEvents()
    getUpcomingEvents()
  },[])
  
  return (
    <Container>
      <VisitWrap>
        {/* <VisitSecLeft>
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
                poster="/images/customer/home/event-thumbnail.png"
              >
                <source type="video/mp4" src={'/video/Futuregrail_teaser 10mb.mp4'} />
              </video>
            </div>
          </VideoWrapper>
        </VisitSecLeft> */}
        <Banner heading={'EVENTS'} description={'The FutureGrail Experience'} height={'450px'} />
        <RealEventsWrapper>
          <EventTimeContainer>
            <EventTime onClick={() => handleTab('past')} className={activeEvent === 'past' ? 'active' : ''}>
              Past
            </EventTime>
            <EventTime onClick={() => handleTab('live')} className={activeEvent === 'live' ? 'active' : ''}>
              Current
            </EventTime>
            <EventTime onClick={() => handleTab('upcoming')} className={activeEvent === 'upcoming' ? 'active' : ''}>
              Upcoming
            </EventTime>
          </EventTimeContainer>
          <EventListWrapper>
            {activeEvent === 'past' 
              ? <>
                  {pastList?.length 
                  ? pastList.map((el, key) => {
                    return (
                      <EventNewCard key={key} data={el} />
                    )
                  }) 
                  : <p className="nodata">No past events found.</p>}
                </> 
              : activeEvent === 'live' 
                ? <>
                  {currentList?.length 
                  ? currentList.map((el, key) => {
                    return (
                      <EventNewCard key={key} data={el} />
                    )
                  }) 
                  : <p className="nodata">No current events found.</p>}
                </> 
                : <>
                  {upcomingList?.length 
                  ? upcomingList.map((el, key) => {
                    return (
                      <EventNewCard key={key} data={el} />
                    )
                  })
                  : <p className="nodata">Upcoming events will be updated soon.</p>}
                </>
            }
          </EventListWrapper>
        </RealEventsWrapper>
        <VenueWrapper>
          <VenueContent>
            <Heading isH1Color="#0e1818" isPColor="#4e4e4e" pWidth="90rem" pHeight="fit-content" isMargin="0 0 1.6rem 0">
              <h1>VENUE</h1>
              <p>The home of Singapore's most immersive venue. A place where conversation, inspiration, celebration and connections converge. Whether you're looking to entertain, showcase a launch, host a celebration, bring a product to life or educate your partners and customers - there's no better place to host your next event.</p>
            </Heading>
            <FelxWrapper>
              <FlexBox1>
                {Number(width) < 769 ? (
                  <VideoWrapper className="video-wrapper">
                    <div className="videoComponent">
                      <PlayBtn>{!isPlaying && <Image onClick={handlePlay} className="playBtn-img" src={PlayButtonImg} alt="ICO" />}</PlayBtn>
                      <video
                        onClick={handleClick}
                        onPause={handlePause}
                        // // onPlay={handlePlay}
                        onEnded={handleStop}
                        ref={videoRef}
                        // muted
                        loop
                        playsInline
                        preload="metadata"
                        controls={isPlaying ? true : false}
                        controlsList="nodownload noplaybackrate"
                        poster="/images/customer/home/event-thumbnail.webp"
                      >
                        <source type="video/mp4" src={'https://d3uwo5oqixn6qw.cloudfront.net/Skype_Video.mp4'} />
                      </video>
                    </div>
                  </VideoWrapper>
                ) : null}
                <Image src={venueImg1} alt={'ICO'} width={645} height={995} />
              </FlexBox1>
              <FlexBox2>
                <div className="img-1">
                  {/* <Image src={img2New} alt={'ICO'} width={727} height={365} /> */}
                  {Number(width) > 768 ? (
                    <VideoWrapper className="video-wrapper">
                      <div className="videoComponent">
                        <PlayBtn>{!isPlaying && <Image onClick={handlePlay} className="playBtn-img" src={PlayButtonImg} alt="ICO" />}</PlayBtn>
                        <video
                          onClick={handleClick}
                          // // onPause={handlePause}
                          // // onPlay={handlePlay}
                          onEnded={handleStop}
                          ref={videoRef}
                          // muted
                          loop
                          playsInline
                          preload="metadata"
                          controls={isPlaying ? true : false}
                          controlsList="nodownload noplaybackrate"
                          poster="/images/customer/home/event-thumbnail.webp"
                        >
                          <source type="video/mp4" src={'https://d3uwo5oqixn6qw.cloudfront.net/Skype_Video.mp4'} />
                        </video>
                      </div>
                    </VideoWrapper>
                  ) : null}
                </div>
                <div className="img-2">
                  <Image src={venueImg3} alt={'ICO'} width={727} height={593} />
                </div>
              </FlexBox2>
              <FlexBox3>
                <div className="img-1">
                  <Image src={venueImg4} alt={'ICO'} width={712} height={553} />
                </div>
                <div className="img-2">
                  <Image src={venueImg5} alt={'ICO'} width={711} height={401} />
                </div>
              </FlexBox3>
            </FelxWrapper>
          </VenueContent>
        </VenueWrapper>

        <FacilitiesWrapper>
          <Heading isH1Color="#FFFFFF" isPColor="#BDC0C0" pWidth={'56.3rem'} isMargin="0 0 20px 0">
            <h1 className="fac-h1">Our facilities</h1>
            <p>Discover a unique event space that's one in a million</p>
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
          <Heading isH1Color="#0e1818" isPColor="#4e4e4e" pWidth={'51rem'} isMargin="0px 0 34px 0">
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

export default NewEventPage
