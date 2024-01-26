import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import playBtn from '../../public/images/customer/playbtn.png'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
interface StyleProps {
  isColor: string
  isPTagColor?: string
}

const CardWrapper = styled.div`
  max-width: 452px;
  transition: all 0.2s;
  padding: 0 0 0.5rem 0;
  border-radius: 0.4rem;
  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    transform: scale(1.05);
  }
  .image-wrapper {
    max-width: 452px;
    max-height: 242px;
    min-width: 452px;
    min-height: 242px;
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
  }
  @media screen and (max-width: 798px) {
    max-width: 342px;
    .image-wrapper {
      max-width: 342px;
      max-height: 200px;
      min-width: 342px;
      min-height: 200px;
      .play-btn {
        width: 4.65rem;
      }
    }
  }
`
const CardDetails = styled.div<StyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem 0;
  padding: 0 0.5rem 0 0.5rem;
  p {
    color: ${(props) => (props.isPTagColor ? props.isPTagColor : '#848a8b')};
  }
  .p-1 {
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 125%;
    padding: 1.5rem 0 0.5rem 0;
    @media screen and (max-width: 798px) {
      font-size: 1.5rem;
    }
  }
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 120%;
    color: ${(props) => (props.isColor ? props.isColor : '#fff')};
    &:hover {
      color: #2a7575;
    }
    @media screen and (max-width: 798px) {
      font-size: 2.25rem;
    }
  }
  .p-2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015rem;
    color: ${(props) => (props.isPTagColor ? props.isPTagColor : '#848a8b')};
    @media screen and (max-width: 798px) {
      font-size: 1.75rem;
    }
  }
  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 3rem;
    p {
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 600;
      line-height: 125%;
      color: ${(props) => (props.isPTagColor ? props.isPTagColor : '#848a8b')};
      @media screen and (max-width: 798px) {
        font-size: 1.5rem;
      }
    }
    p:last-child {
      color: #2a7575;
    }
  }
  @media screen and (max-width: 625px) {
    gap: 1.5rem 0;
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
`

interface CardProps {
  isColor?: string
  image?: any
  subText?: string
  title?: string
  description?: string
  date?: string
  min?: string
  link?: string
  isVideo?: boolean
  isPTagColor?: string
  isLink?: string
  isHref?: boolean
}
const CardComponent = ({ isColor, image, subText, title, description, date, min, link, isVideo, isPTagColor, isHref, isLink }: CardProps) => {
  const { width } = useWindowSize()

  return (
    <CardWrapper>
      <div className="image-wrapper">
        <Image src={image.src} alt={image.alt} layout='fill' objectFit='cover' width={width > 768 ? 452 : 342} height={width > 768 ? 242 : 200} />
        {isVideo && (
          <div className="play-btn">
            <a className="read-link" href="/base/video" target="_blank">
              <Image className="play-img" src={playBtn} alt="ICO" />
            </a>
          </div>
        )}
      </div>
      <CardDetails isColor={isColor} isPTagColor={isPTagColor}>
        <p className="p-1">{subText}</p>
        {isHref ? (
          <a className="read-link" href={isLink} target="_blank" rel="noreferrer">
            {' '}
            <h2> {title}</h2>
          </a>
        ) : (
          <Link href={link}>
            <a>
              {' '}
              <h2> {title}</h2>
            </a>
          </Link>
        )}

        <p className="p-2">{description}</p>
        <span className="date">
          <p>{date}</p>
          <p>{min}</p>
        </span>
      </CardDetails>
    </CardWrapper>
  )
}

export default CardComponent
