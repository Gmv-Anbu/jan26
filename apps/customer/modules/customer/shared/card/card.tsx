import { APP_ENV } from '@apps/customer/config'
import useTimeLeftHook from '@apps/customer/hooks/useTimeLeftHook'
import Loader from '@apps/customer/modules/shared/components/Loader'
import { IsImage } from '@apps/customer/utils/helper'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { AudioComponent } from '@nft-marketplace/AudioComponent'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from '../../../shared/components/button/button'
import TimeLeftSmall from '../../../shared/components/timeLeftCard/timeLeftSmall'
import Avatar from '../avatar/avatar'
import ICard from './card.interface'

interface VidProps {
  vidHeight?: string | number
}
interface CardProps {
  type: string
}

const CardContainer = styled.div<CardProps>`
  width: 33rem;
  min-height: 40rem;
  background: ${({ theme }) => theme.colors.secondary};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 1rem;
  // border: 1px solid ${({ theme }) => theme.colors.cardBorderColor};
  color: ${({ theme }) => theme.colors.fontprimary};
  padding: 1.4rem;
  // margin-right: 2rem;
  &.m-10 {
    margin: 1rem;
  }
  &:nth-child(even) {
    margin-right: 0rem;
  }
  @media screen and (max-width: 1500px) {
    width: 28.5rem;
  }
  @media screen and (max-width: 1024px) {
    max-height: ${({ type }) => (type === 'slider' ? '45rem' : 'initital')};
    overflow-y: ${({ type }) => (type === 'slider' ? 'auto' : 'initital')};
  }
  &.shop-page-card {
    width: 33rem;
    @media screen and (max-width: 1500px) {
      width: 29.5rem;
      margin: 0 1.2rem 3rem;
      .preview-container {
        max-height: 25rem;
      }
      .small-time span {
        font-size: 1.2rem;
      }
    }
  }
`

const PreviewContainer = styled.div`
  position: relative;
  border-radius: 1.5rem;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  max-height: 28rem;
  .nft-card-image {
    position: relative;
  }
`

const GradientLayer = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.gradientLayer};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const Preview = styled.image`
  border-radius: 1.5rem;
`

const ProductHeadWrapper = styled.h2`
  font-size: 1.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordersecondary};
  padding: 1rem 0;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
`

const CardFooter = styled.div`
  padding: 1.5rem 0;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordersecondary};
`

const ButtonContainter = styled(CardFooter)`
  border-bottom: none;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  button {
    // margin-left: 1.2rem;
    &.block-btn {
      margin: 0;
      width: 100%;
    }
  }
`

const BidContainer = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
  grid-gap: 10px;
`

const PriceLabel = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  line-height: 1.5rem;
  font-weight: 400;
`

const Price = styled.span`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ConvertedPrice = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.3rem;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const IconContainer = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.auctionBoxbg};
  filter: drop-shadow(0px 4px 12px ${({ theme }) => theme.colors.iconShadowColor});
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.iconContainerColor};
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const AvatarContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 10px;
`

const VideoPreview = styled.div<VidProps>`
  @media screen and (min-width: 375px) and (max-width: 540px) {
    video {
      /* width: 100% !important; */
      height: 18rem;
    }
  }
  @media screen and (min-width: 541px) and (max-width: 767px) {
    video {
      /* width: 100% !important; */
      height: 20.2rem;
    }
  }

  @media screen and (min-width: 767px) and (max-width: 1120px) {
    video {
      /* width: 100% !important; */
      height: ${(props) => (props?.vidHeight ? `${props.vidHeight}rem` : '22.2rem')};
    }
  }

  @media screen and (min-width: 1121px) and (max-width: 1500px) {
    video {
      /* width: 100% !important; */
      height: ${(props) => (props?.vidHeight ? `${props.vidHeight}rem` : '22.2rem')};
    }
  }
`

const myLoader = ({ src }: any) => {
  return `${src}?w=${280}`
}
const Card = (
  {
    id,
    NFT,
    mediaType,
    image,
    name,
    userName,
    creatorUserName,
    isVerified,
    price,
    convertedPrice,
    time,
    blockBtn,
    firstName,
    lastName,
    saleType,
    status,
    endTime,
    bidAmount,
    cardClass,
    convertedbidAmount,
    btnLabel = 'Buy Now',
    mainBtnAction,
    isFavorite,
    favoriteBtnAction,
    bidderData,
    startTime,
    favoriteAction = true,
    getUpdatedNFTs,
    creatorImage,
    creatorName,
    creatorVerified,
    page,
    vidHeight,
    type,
  }: ICard,
  selectedTab?: string
) => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const TimerState = status === 'confirmed' ? startTime : endTime
  const purpose = status === 'confirmed' ? 'startTime' : 'endTime'
  const [daysLeft, hoursLeft, minutesLeft, secondsLeft, timeUp, setTimeUp] = useTimeLeftHook(TimerState)
  const Calculatedtime = {
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    timeUp,
  }
  const ownerName = page === 'market' || page === 'collections' ? (APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? userName : creatorName) : firstName && lastName !== null ? `${firstName} ${lastName}` : userName
  // const ownerName = page === "market" || page ==="collections" ? creatorName : firstName && lastName !== null ? `${firstName} ${lastName}` : userName
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    //function call to check whether the file is image or video
    const value = IsImage(NFT)
    setFlag(value)
  }, [NFT])

  useEffect(() => {
    if (timeUp == true) {
      getUpdatedNFTs()
      if (purpose == 'startTime') {
        setTimeUp(false)
      }
    }
  }, [timeUp])

  const mainButtonTrigger = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    if (mainBtnAction) {
      mainBtnAction().then(() => setLoading(false))
    } else router.push(`/base/assetDetails?id=${id}`)
  }
  const mainCardClickTrigger = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    router.push(`/base/assetDetails?id=${id}`)
  }

  return (
    <CardContainer className={`card ${cardClass || ''}`} onClick={mainCardClickTrigger} type={type}>
      <PreviewContainer className="preview-container">
        {NFT &&
          (mediaType === 'images' ? (
            <Image objectFit="cover" layout="responsive" className="nft-card-image" loader={myLoader} src={NFT} width="300px" height="285px" alt={name || 'NFT'} />
          ) : mediaType === 'video' ? (
            <VideoPreview vidHeight={vidHeight}>
              <VideoComponent filePath={NFT} height={285} width={280} controls={false} mute={true} autoPlay={true} />
            </VideoPreview>
          ) : mediaType === 'audio' ? (
            <AudioComponent filePath={NFT} height={285} width={280} controls={false} mute={true} autoPlay={false} imgSrc="/svgs/audio-white.svg" />
          ) : null)}
        <GradientLayer />
        {favoriteAction ? (
          <IconContainer
            title="Heart"
            onDoubleClick={() => {}}
            onClick={(e) => {
              e.stopPropagation()
              favoriteBtnAction()
            }}
          >
            <Image width={15} height={15} src={isFavorite === true ? '/svgs/red-heart.svg' : '/svgs/heart-outlined.svg'} alt="favorite-image" />
          </IconContainer>
        ) : (
          ''
        )}

        <AvatarContainer>
          <Avatar
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/base/profile/${page === 'market' || (page === 'collections' && APP_ENV?.NEXT_PUBLIC_NETWORK_TYPE !== 'HEDERA') ? creatorUserName : userName}`)
            }}
            image={page === 'market' || page === 'collections' ? (creatorImage ? creatorImage : image) : image}
            userName={ownerName}
            isVerified={page === 'market' ? creatorVerified : isVerified}
          />
        </AvatarContainer>
      </PreviewContainer>
      <ProductHeadWrapper>
        <span>{name?.length > 15 ? name.slice(0, 15) + '...' : name}</span>
        <span>{saleType == 'fixed' ? 'fixed' : 'auction'}</span>
      </ProductHeadWrapper>
      <CardFooter>
        <PriceLabel> {saleType === 'fixed' ? 'Buy now' : bidderData == null ? 'Base Price' : 'Current Bid'}</PriceLabel>

        <BidContainer>
          <Price title={price}>{saleType == 'auction' ? bidAmount : price}</Price>

          <ConvertedPrice title={convertedPrice}>{saleType == 'auction' ? convertedbidAmount : convertedPrice}</ConvertedPrice>
        </BidContainer>
      </CardFooter>
      <ButtonContainter>
        {saleType === 'auction' &&
          status === 'live' &&
          (timeUp !== true ? (
            <TimeLeftSmall time={Calculatedtime} />
          ) : (
            <ButtonPrimary className={blockBtn ? 'block-btn' : ''} size={'100%'}>
              Expired
            </ButtonPrimary>
          ))}
        {saleType === 'auction' && status == 'confirmed' && (
          <p>
            <small>auction start soon</small>
          </p>
        )}
        {/* {saleType === 'auction' && !status && (
          <ButtonPrimary className={blockBtn ? 'block-btn' : ''} size={'100%'}>
            Expired
          </ButtonPrimary>
        )} */}
        {/* <Link href={{
          pathname: `/base/assetDetails`,
          query: { id: id }
        }} passHref> */}
        {/* temporary fix in ButtonPrimary button action to reuse this card component to s/m wide*/}

        {!(status == 'live' && timeUp == true) && (
          <ButtonPrimary
            disabled={loading || timeUp === true}
            onClick={(e) => {
              setLoading(true)
              mainButtonTrigger(e)
            }}
            className={blockBtn || status === 'expired' || timeUp === true ? 'block-btn' : ''}
            size={saleType == 'auction' ? '120px' : '100%'}
          >
            {status === 'expired' ? 'Auction Expired' : saleType === 'auction' && timeUp !== true ? 'Place Bid' : ''}
            {saleType !== 'auction' && !loading && btnLabel}
            {loading && (
              <>
                {'Loading...'} <Loader width="25" height="25" />
              </>
            )}
          </ButtonPrimary>
        )}

        {/* </Link> */}
      </ButtonContainter>
    </CardContainer>
  )
}

export default Card
