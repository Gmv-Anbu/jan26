import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader'
import { useState, useEffect } from 'react'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import Link from 'next/link'
import Icons from '../../../modules/shared/components/icon/icon'
import { FullPageLoader } from '@apps/customer/components/product-details'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import { pastEventsList, upcomingEventsList } from '@apps/customer/mock/newdb'

import API from '@apps/customer/api/customer'
import { handleApiImage } from '@apps/customer/utils/helper'
import moment from 'moment'
import { ModalService } from '@nft-marketplace/modal'
import EventTicketModal from '@apps/customer/components/FormModal/eventTicketsModal'

const MainContainer = styled.div`
  width: 100%;
  margin: 15.2rem 0;
  @media screen and (max-width: 767px) {
    margin: 13rem 0;
   
  }
`
const WrapperContainer = styled.div`
  width: 100%;
  max-width: 103rem;
  margin: 0 auto;
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
    max-width: 72rem;
    padding: 0px 24px;
  }
  @media screen and (max-width: 575px) {
    max-width: 54rem;
  }
  h2 {
    font-family: 'proxima_novaregular';
    font-size: 48px;
    font-weight: 600;
    line-height: 58px;
    margin-bottom: 1.6rem;
    color: #0E1818;
    @media screen and (max-width: 767px) {
      margin-bottom: 8px;
      font-size: 24px;
      font-weight: 600;
      line-height: 29px;
    }
  }
  .date-place {
    font-family: 'proxima_novaregular';
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 3.4rem;
    color: #4E4E4E;
    @media screen and (max-width: 767px) {
      font-size: 14px;
      font-weight: 600;
      line-height: 28px;
      margin-bottom: 24px;
    }
  }
`
const MainImageBox = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  @media screen and (max-width: 767px) {
    margin-bottom: 24px;
  }
  .bg-texture {
    position: absolute;
    /* background-image: url('/images/customer/Events/events-details/texture.png'); */
    background-repeat: no-repeat;
    background-size: 100% 150%;
    z-index: 2;
  }
  .bg-img {
    position: absolute;
    z-index: 1;
  }
  // @media screen and (max-width: 1199px) {
  //   max-height: 50rem;
  //   .bg-texture,
  //   .bg-img {
  //     width: 100%;
  //     max-height: 50rem;
  //   }
  // }
  @media screen and (max-width: 768px) {
    .bg-texture {
      /* background-image: url('/images/customer/Events/events-details/texture-mr.png'); */
    }
  }
`
const SubImageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.6rem 0 5rem 0;
  .sub-img-box {
    max-width: 58.4rem;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    .img-box,
    .img-box-active {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 168px;
      max-height: 126px;
      min-width: 168px;
      min-height: 126px;
      background: #fff;
      transition: transform 0.4s;
      overflow: hidden;
      opacity: 0.75;
      transition: all 0.4s;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .img-box-active ,.img-box-active span {
      border: 4px solid #06b6f0;
      opacity: 1;
      max-width: 200px;
      max-height: 150px;
      min-width: 200px;
      min-height: 150px;
    }
  }
  @media screen and (max-width: 1199px) {
    margin: 4rem 0 5rem 0;
  }
  @media screen and (max-width: 768px) {
    margin: 0.5rem 0 3.2rem 0;
    .sub-img-box {
      height: 92px;
      .img-box {
        max-width: 77.9px;
        max-height: 58.4px;
        min-width: 77.9px;
        min-height: 58.4px;
      }
      .img-box-active ,.img-box-active span {
        border: 2px solid #06b6f0;
        opacity: 1;
        max-width: 92.8px;
        max-height: 69.6px;
        min-width: 92.8px;
        min-height: 69.6px;
      }
    }
  }
`

const DetailsBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 66px;
  margin: 0 0 9.2rem 0;
  &.show-details {
    align-items: baseline;
  }
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      font-style: normal;
      font-weight: 400;
      font-size: 60px;
      line-height: 104%;
      color: #0e1818;
      text-transform: capitalize;
      margin: 0 0 3.2rem 0;
    }
    p {
      text-align: justify;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 142.5%;
      letter-spacing: -0.015em;
      color: #4e4e4e;
      margin-bottom: 24px;
      color: #7C7C7C;
      b {
        color: #4E4E4E;
      }
      .read-link {
        color: blue;
        /* text-decoration: underline; */
      }
      @media screen and (max-width: 768px) {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.015em;
        margin-bottom: 20px;
      }
    }
  }
  @media screen and (max-width: 995px) {
    flex-direction: column-reverse;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
    margin: 0 0 76px 0;
    gap: 53px;
    .details {
      h1 {
        text-align: start;
        text-transform: uppercase;
        font-size: 22px;
        margin: 0 0 10px 0;
      }
      p {
        font-size: 14px;
      }
    }
  }
`
const DetailsTab = styled.div`
  width: 48.5rem;
  height: 100%;
  background: #f4f9f9;
  padding: 30px;
  border: 1px solid #e8eded;
  button {
    cursor: pointer;
  }
  h2 {
    font-size: 22px;
    font-weight: 400;
    line-height: 26px;
    color: #0E1818;
    text-transform: uppercase;
    margin-bottom: 30px;
  }
  span {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 15px;
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: -0.015em;
      color: #7C7C7C;
    }
    .address {
      max-width: 31rem;
    }
  }
  .prize {
    margin-bottom: 20px;
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: -0.015em;
      color: #4E4E4E;
    }
    h4 {
      font-size: 32px;
      font-weight: 500;
      line-height: 33px;
      color: #0E1818;
    }
  }
  .last-span {
    margin: 20px 0 30px;
    gap: 10px;
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: -0.015em;
      max-width: 37.2rem;
      color: #4E4E4E;
      word-break: break-word;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #d9d9d9;
  }
  button {
    background: #2A7575;
    width: 42.5rem;
  }
  @media screen and (max-width: 995px) {
    width: 100%;
    min-width: 34.2rem;
    span p,
    .last-span p {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    min-height: 267px;
    padding: 24px;
    h2 {
      width: 100%;
      text-align: start;
      font-size: 22px;
      text-transform: uppercase;
    }
    span {
      margin: 10px 0 18px 0;
      p {
        font-size: 16px;
      }
    }
    .last-span,
    .line {
      display: none;
    }
  }
  @media screen and (max-width: 568px) {
    max-width: 342px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`
const ButtonPrimary = styled.button`
  width: 40rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #29898b;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 114%;
  text-transform: uppercase;
  color: #ffffff;
  border: 1px solid #29898b;
  text-transform: uppercase;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 295px;
    height: 50px;
    font-size: 16px;
  }
`

const FooterSocial = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 40px 0 0px 0;
  z-index: 1;
  .share-now {
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
    .share-now {
      font-size: 22px;
      line-height: 116%;
      margin: 0px 0 24px 0;
    }
  }
`

const BackButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 4.3rem;
  span {
    font-family: 'proxima_novaregular';
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.23999999463558197px;
    color: #848A8B;
    margin-left: 2rem;
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 19px;
  }
`

interface IEvents {
  id?: any
  title?: any
  address?: any
  time?: any
  dates?: any
  rsvpUrl?: any
  description?: any
  fee?: any
  images?: any
  location?: any
  footerNote?: any
}

const EventDetailsPage = () => {
  const router = useRouter()
  const { width } = useWindowSize()
  const [eventDetails, setEventDetails] = useState<any>({})
  const [activeImg, setActiveImg] = useState(0)
  const [mainSrc, setMainSrc] = useState('')
  const [desc, setDesc] = useState([])
  const [show, setShow] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showTicket, setShowTicket] = useState(false)
  const [cardVerified, setCardVerified] = useState(false)

  const getRapydStatus = () => {
    API.getRapydCardStatus()
    .then(res => {
      console.log('getRapydStatus res', res)
      setCardVerified(res?.data?.data?.paymentVerified)
    })
    .catch(err => {
      console.log('getRapydStatus errr', err)
    })
  }

  const getEventDetailsByID = () => {
    setIsLoading(true)
    API.getEventByID(router.query.eventId)
    .then(res => {
      console.log('getEventDetailsByID', res)
      if(res?.data?.data?.endDate) {
        let date1 = new Date();
        let date2 = new Date(res?.data?.data?.endDate);
        // console.log('difference in time',date1.getTime(), date2.getTime(), date1.getTime() > date2.getTime(), moment(moment(date1).format('YYYY-MM-DD')).isSameOrAfter(moment(res?.data?.data?.endDate).format('YYYY-MM-DD')))
        if (date1.getTime() < date2.getTime()) {
          setShowTicket(true)
        }
      }
      if(res?.data?.data) {
        setEventDetails(res?.data?.data)
        setMainSrc(handleApiImage(res?.data?.data?.image) || `/images/shared/placeholder-image.png`)
        if(res?.data?.data?.description) {
          let descNew = res?.data?.data?.description.split('\n')
          setDesc([...new Set(descNew)])
        }
        setIsLoading(false)
      } else {
        router.push('/base/events')
      }
    })
    .catch(err => {
      console.log('err')
      router.push('/base/events')
      setIsLoading(false)
    })
  }

  const getFormattedDate = (sDate, eDate) => {
    let startDate = moment(new Date(sDate)).format('DD MMM YYYY')
    let endDate = moment(new Date(eDate)).format('DD MMM YYYY')
    console.log('new Date(sDate)', new Date(sDate).getMonth(), new Date(eDate).getMonth())
    if(startDate === endDate) {
      return startDate
    } else if (sDate && eDate) {
      if(new Date(sDate).getMonth() !== new Date(eDate).getMonth()) {
        return `${startDate} - ${endDate}`
      } else {
        return `${moment(new Date(sDate)).format('DD')} - ${endDate}`
      }
    } else {
      return 'NA'
    }
  }

  const getFormattedTitleDate = (sDate, eDate) => {
    let startDate = moment(new Date(sDate)).format('DD MMM YYYY')
    let endDate = moment(new Date(eDate)).format('DD MMM YYYY')
    // console.log('getFormattedTitleDate', startDate, endDate)
    // console.log('new Date(sDate)', new Date(sDate).getMonth(), sDate, eDate, new Date(eDate).getMonth(), new Date(eDate).getFullYear())
    if(sDate && eDate) {
      if(startDate === endDate) {
        return moment(new Date(sDate)).format('MMMM DD, YYYY')
      } else if (sDate && eDate) {
        if(new Date(sDate).getFullYear() !== new Date(eDate).getFullYear()) {
          return `${moment(new Date(sDate)).format('MMMM DD YYYY')} - ${moment(new Date(eDate)).format('MMMM DD YYYY')}`
        } else if(new Date(sDate).getMonth() !== new Date(eDate).getMonth()) {
          return `${moment(new Date(sDate)).format('MMMM DD')} - ${moment(new Date(eDate)).format('MMMM DD, YYYY')}`
        } else {
          return `${moment(new Date(sDate)).format('MMMM DD')} - ${moment(new Date(eDate)).format('DD, YYYY')}`
        }
      }
    } else {
      return 'NA'
    }
  }

  const getFormattedTime = (sDate, eDate) => {
    let startDate = moment(new Date(sDate)).format('h:mma')
    let endDate = moment(new Date(eDate)).format('h:mma')
    if(startDate && endDate) {
      return `${startDate} - ${endDate}`
    } else {
      return 'NA'
    }
  }

  const showTicketModal = () =>
  ModalService.open((modalProps: any) =>
    <EventTicketModal eventId={router.query.eventId} close={modalProps.close} />,{ closeIcon: false}
  )

  useEffect(() => {
    if(router.query.eventId) {
      getEventDetailsByID()
      getRapydStatus()
    } 
  }, [router.query.eventId])

  if (isLoading) {
    return (
      <FullPageLoader>
        <Loader />
      </FullPageLoader>
    )
  }

  return (
    <MainContainer>
      <WrapperContainer>
        <Link href="/base/events" passHref>
          <BackButton>
            <Image src={'/svgs/arrow-left-black.svg'} width="5" height="10" />
            <span>Back</span>
          </BackButton>
        </Link>
        <h2>{eventDetails.title}</h2>
        <p className='date-place'> 
          {eventDetails?.startDate && eventDetails?.endDate
            ? getFormattedTitleDate(eventDetails?.startDate, eventDetails?.endDate)
            : 'NA'}&nbsp;/ {eventDetails?.location}
        </p>
        <MainImageBox>
          <div className="bg-texture"></div>
          <Image objectFit='cover' src={mainSrc} alt={'ICO'} width="1040" height="550" />
        </MainImageBox>
        {/* <SubImageBox>
          <div className="sub-img-box">
            {eventDetails.images.length &&
              eventDetails.images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setActiveImg(i)
                    setMainSrc(eventDetails.images[i])
                  }}
                  className={activeImg == i ? 'img-box-active' : 'img-box'}
                >
                  <Image src={image} objectFit="cover" alt={'ICO'} layout="fill" />
                </div>
              ))}
          </div>
        </SubImageBox> */}
        <DetailsBox className={show ? '' : ''}>
          <div className="details">
            <div>
              {/* <h1>{eventDetails.title}</h1> */}
              <p><b>Host Name: </b>{eventDetails.hostname}</p>
              {desc?.length 
              ? desc.map((el,i) => {
                if(el) return <p key={i}>{el}</p>
              })
              : null}
              {/* <p><b>Date: </b> {getFormattedDate(eventDetails?.startDate, eventDetails?.endDate)}</p>
              <p><b>Time:</b> {getFormattedTime(eventDetails?.startDate, eventDetails?.endDate)}</p>
              <p><b>Location:</b> {eventDetails?.location}</p>
              <p><b>Additional Info:</b> {eventDetails?.additionalInfo || 'NA'}</p> */}
              {/* {eventDetails?.footerNote
              ? <p>{eventDetails?.footerNote}</p>
              : null} */}
              {eventDetails?.rsvpUrl &&   
              <p><b>RSVP:</b>  
                <a className="read-link" href={eventDetails?.rsvpUrl} target="_blank" rel="noreferrer"> Event Information</a>
              </p>}
            </div>
            <FooterSocial>
              <h3 className="share-now">Share Now</h3>
              <ul className="d-flex">
                <li>
                  <a className="read-link" href={'https://www.instagram.com/futuregrailofficial/?igshid=NmNmNjAwNzg%3D'} target="_blank" rel="noreferrer">
                    <Icons name="insta" />
                  </a>
                </li>
              </ul>
            </FooterSocial>
          </div>
          {show 
          ? <DetailsTab>
            <h2>Events Details</h2>
            <span>
              <Image src={'/svgs/event-calender.svg'} width='24' height='24' alt={'event-date'} />
              <p>{getFormattedDate(eventDetails?.startDate, eventDetails?.endDate)}</p>
            </span>
            <span>
              <Image src={'/svgs/event-time.svg'} width='24' height='24' alt={'event-time'} />
              <p>{getFormattedTime(eventDetails?.startDate, eventDetails?.endDate)}</p>
            </span>
            <span>
              <Image src={'/svgs/event-location.svg'} width='24' height='24' alt={'event-location'} />
              <p className="address">{eventDetails.location}</p>
            </span>
            <span>
              <Image src={'/svgs/event-ticket.svg'} width='24' height='24' alt={'event-ticket'} />
              <p>{eventDetails?.availableTickets} Tickets Available</p>
            </span>
            <div className='prize'>
              <p>Price</p>
              <h4>$ {eventDetails?.prize}</h4>
            </div>
            {eventDetails?.additionalInfo 
            ? <>
              <div className="line"></div>
              <span className="last-span">
                <Image src={'/svgs/event-info.svg'} width={20} height={20} alt={'additionalInfo'} />
                <p>{eventDetails?.additionalInfo}</p>
              </span>
            </>
            : null}
            {showTicket 
            ? <>
            {cardVerified 
            ? <ButtonPrimary onClick={() => showTicketModal()}>
              Get tickets
            </ButtonPrimary> 
            : <ButtonPrimary onClick={() => router.push('/base/myProfile')}>
              Verify Card
            </ButtonPrimary>}
            </> 
            : null}
            
          </DetailsTab>
          : null}
        </DetailsBox>
      </WrapperContainer>
      {/* <RelatedEvents /> */}
      <Newsletter />
    </MainContainer>
  )
}

const RelatedBox = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-image: url('/images/customer/Events/events-details/related-bg-web.png');
    background-size: 100% 120%;
    background-repeat: no-repeat;
    z-index: -1;
    @media screen and (max-width: 1700px) {
      background-size: 100% 150%;
    }
    @media screen and (max-width: 768px) {
      background: url('/images/customer/Media/md-mr-bg-img.png');
      background-size: 100%;
    }
  }
  .heading-2 {
    width: 100%;
    font-style: normal;
    font-size: 6rem;
    line-height: 104%;
    font-weight: 400;
    text-transform: uppercase;
    color: #ffffff;
    padding: 15rem 0 5rem 0;
  }
  @media screen and (max-width: 798px) {
    gap: 0;
    .heading-2 {
      font-size: 3rem;
      padding: 15rem 24px 2rem 24px;
    }
  }
`

const GridContianer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 0rem 0 20rem 0;
  gap: 2rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: 5rem;
    padding: 0 24px 20rem 24px;
  }
  @media screen and (max-width: 424px) {
    grid-template-columns: auto;
  }
`
const EventCard = styled.div`
  max-width: 45.2rem;
  .event-img {
    margin-bottom: 3rem;
  }
  p,
  span {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: #848a8b;
  }
  .event-title {
    margin-bottom: 1.4rem;
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    cursor: pointer;
    min-height: 5rem;
    &:hover {
      color: #2a7575;
    }
  }
  .event-time {
    margin-bottom: 1.4rem;
  }
  .event-date {
    display: inline-block;
    width: 17.3rem;
  }
  .event-fee {
    color: #2a7575;
  }
  @media screen and (max-width: 768px) {
    p,
    span {
      font-size: 12px;
    }
    .event-title {
      font-size: 18px;
      margin-bottom: 13px;
    }
  }
`

function RelatedEvents() {
  return (
    <RelatedBox>
      <WrapperContainer>
        <h1 className="heading-2">Related Events</h1>
        <GridContianer>
          {pastEventsList.slice(3, 6).map((el, key) => (
            <EventCard key={key}>
              <div className="event-img">
                <Image src={el?.images?.[0] || `/images/customer/Events/current/event-${el?.id}.png`} width={452} height={242} alt={'ICO'} />
              </div>
              {/* <p className="event-time">{el?.time}</p> */}
              <Link href={`/base/events/${el.id}`}>
                <a>
                  <p className="event-title">{el?.title}</p>
                </a>
              </Link>
              <p>
                <span className="event-date">{el?.date}</span>
                <span className="event-fee">{el?.fee}</span>
              </p>
            </EventCard>
          ))}
        </GridContianer>
      </WrapperContainer>
    </RelatedBox>
  )
}

export default EventDetailsPage
