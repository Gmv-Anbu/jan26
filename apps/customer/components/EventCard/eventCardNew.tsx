import React from "react";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import { handleApiImage } from "@apps/customer/utils/helper";

const EventCard = styled.div`
  max-width: 45.2rem;
  min-width: 45.2rem;
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
    // font-family: Proxima Nova;
    display: block;
    margin-bottom: 1.4rem;
    color: #0e1818;
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    min-height: 5rem;
    &.height-normal {
      min-height: auto;
    }
    // &:hover {
    //   color: #2a7575;
    // }
  }
  .event-desc {
    // font-family: Proxima Nova;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: -0.015em;
    margin-bottom: 2.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .read-more {
    // font-family: Proxima Nova;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: #2A7575;
  }
  .event-time {
    margin-bottom: 1.4rem;
  }
  .event-date {
    // font-family: Proxima Nova;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    display: inline-block;
    width: 17.3rem;
    &.w-100 {
      width: 100%;
    }
  }
  .event-fee {
    color: #2a7575;
  }
  @media screen and (max-width: 1588px) {
    min-width: 30rem;
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

const EventNewCard = (props) => {
    const { data } = props

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

    return (
        <EventCard key={data?.id}>
            <div className="event-img">
            {data?.image 
            ? <Link href={`/base/events/${data?.id}`} passHref>
              <a><Image src={handleApiImage(data?.image)} width={452} height={242} alt={data?.title} /></a>
            </Link> 
            : <Image objectFit='cover' src={`/images/shared/placeholder-image.png`} width={452} height={242} alt={data?.title} />}
            </div>
            <p className="event-time">
              {data?.startDate && data?.endDate
              ? getFormattedDate(data?.startDate, data?.endDate)
              : 'NA'}
            </p>
            <Link href={`/base/events/${data?.id}`} passHref>
              <a className="event-title height-normal">{data?.title}</a>
            </Link>
            <p className='event-desc'>{data?.description}</p>
            <p>
              <Link href={`/base/events/${data?.id}`} passHref>
                  <a className='read-more'>Read More</a>
              </Link>
            </p>
        </EventCard>
    );
};

export default EventNewCard;
