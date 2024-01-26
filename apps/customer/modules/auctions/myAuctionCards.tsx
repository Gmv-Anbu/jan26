import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { formatToUSD, handleApiImage } from '@apps/customer/utils/helper'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'


const CardWrapper = styled.a`
  flex: 0 0 100%;
  box-sizing: border-box;
  position: relative;
//   max-width: 32rem;
//   min-width: 32rem;
  min-height: 420px;
  height: 100%;
  @media screen and (max-width: 1200px) {
    min-width: 280px;
  }
  background: #ffffff;
  border: 1.09015px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 26px;
  gap: 10px;
  cursor: pointer;
  .image-box {
    position: relative;
    width: 100%;
    max-width: 196px;
    max-height: 220px;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px auto 0;
    overflow: hidden;
    transition: all 0.7s ease-in-out;
  }
  &:hover {
    // .image-box {
    //   transform: scale(1.1);
    // }
    .details h3 {
      color: ${({ theme }) => theme.colors.secondary} !important;
    }
  }
  .details {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    .ref {
      font-size: 16px;
      font-weight: 500;
    }
    p, strong, h3 {
      width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      text-align: center;
      line-height: normal;
      max-width: 260px;
      @media screen and (max-width: 1500px) {
        max-width: 200px;
      }
      @media screen and (max-width: 1300px) {
        max-width: 230px;
      }
      @media screen and (max-width: 830px) {
        max-width: 250px;
      }
      @media screen and (max-width: 500px) {
        max-width: 280px;
      }
    }
    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      color: #121212;
    }
    strong {
      color: #898989;
      font-size: 18px;
      font-weight: 600;
      line-height: 20px;
    }
    h3 {
      font-size: 20px;
      font-weight: 600;
      line-height: 22px;
      color: #202A2A;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    margin: 2rem 0 1rem 0;
    padding: 1px;
    background: radial-gradient(circle, rgba(65, 173, 155, 0.2723214285714286) 0%, rgba(200, 199, 193, 0) 100%);
  }
  hr {
    position: relative;
    z-index: 2;
    border: 0px;
    height: 2px;
    padding: 1px;
    margin: 5px 0;
    width: 100%;
    background: linear-gradient(90deg, rgba(209, 224, 226, 0) 0%, rgb(209, 224, 226) 52.11%, rgba(209, 224, 226, 0) 100%) !important;
  }
  .btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .price-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
      h4 {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        color: #202A2A;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        line-height: 17px;
        color: #121212;
        span {
          font-size: 1.4rem;
        }
      }
    }
  }
  .card-header {
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #8A8A8A;
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    span {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        color: #000000;
        padding: 5px 12px;
        height: 24px;
        border-radius: 10px;
        box-shadow: 0px 2px 6px 0px #0000000F;
        text-transform: capitalize;
    }
  }
  @media screen and (max-width: 768px) {
    // max-width: 280px;
    // min-width: 280px;
    width: 100%;
    .details {
      p {
        font-size: 1.75rem;
        text-transform: capitalize;
      }
      strong {
        font-style: normal;
        font-weight: 600;
        font-size: 2rem;
        text-transform: capitalize;
      }
      h3 {
        font-weight: 600;
        font-size: 2.25rem;
        text-transform: capitalize;
      }
    }
    .btn-box {
      .price-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: flex-start;
        gap: 0.5rem;
        h4 {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
        }
        p {
          font-style: normal;
          font-weight: 300;
          font-size: 12px;
          line-height: 140%;
          color: #121212;
        }
      }
    }
  }
`

const CardButton = styled.a`
    position: relative;
    z-index: 5;
    display: block;
    padding: 6px 14px;
    background: #ffffff;
    border: 1px solid #2A7575;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #2A7575;
`
const CardMainWrapper = styled.a`
  position: relative;
  min-width: 320px;
  .fav-icon {
    position: absolute;
    right: 25px;
    top: 25px;
    z-index: 5;
    cursor: pointer;
  }
`

function MyAuctionCard({ auctionType, data, updateFav = () => {}, routerPush = null }) {
    const router = useRouter()
    const [fav, setFav] = useState(data?.assetEdition?.assetsData?.isFavorite)
    let user = JSON.parse(localStorage.getItem('user'))
    
    // const favClicked = (e) => {
    //   e.stopPropagation()
    //   setFav(!fav)
    //   updateFav(data?.assetEdition?.assetId, fav)
    // }

    return (
      <CardMainWrapper>
        {/* <span className={`fav-icon`} onClick={(e) => user?.accessToken ? favClicked(e) : router.push('/base/signin')}>
          <Icon name="heart-dark" fill={fav ? 'red' : 'none'} />
        </span> */}
        <Link href={routerPush || ''} passHref>
            <CardWrapper className={'auction-card'} onClick={() => routerPush ? router.push(routerPush) : null}>
            <div className='card-header'>
                <span>{data?.status === 'ended' && user?.id === data?.currentBidData?.userId || data?.status === 'paymentComplete' && user?.id === data?.currentBidData?.userId ? 'Won' 
                    : data?.status === 'live' ? 'Ongoing' : 'Closed'}</span>
                {data?.status === 'ended' && user?.id === data?.currentBidData?.userId || data?.status === 'paymentComplete' && user?.id === data?.currentBidData?.userId
                  ? <>{data?.status === 'paymentComplete' 
                    ? <span>
                        <Image src={`/svgs/payment-success.svg`} width={18} height={18} />
                        Payment Complete
                    </span> 
                    : <span>
                        <Image src={`/svgs/payment-pending-2.svg`} width={18} height={18} />
                        Payment Pending
                    </span>}
                  </>
                  : null}
            </div>
            <div className="image-box">
                <Image src={data?.image || data?.assetEdition?.assetsData?.mainAssetUrl ? handleApiImage(data?.assetEdition?.assetsData?.mainAssetUrl) : '/images/shared/placeholder-image-2.jpg'} objectFit='contain' alt="Product" width={196} height={220}/>
            </div>
            {/* <hr></hr> */}
            <div className="details">
                {data?.lotNumber ? <p className='lot-no'>Lot No. {data?.lotNumber}</p> : null}
                <h3>{data?.assetEdition?.assetsData?.name || 'NA'}</h3>
                <strong>{data?.assetEdition?.assetsData?.refNo || 'NA'}</strong>
                <p className='ref'>{data?.assetEdition?.assetsData?.refName || 'NA'}</p>
                {data?.assetEdition?.assetsData?.fourthLine ? <p>{data?.assetEdition?.assetsData?.fourthLine}</p> : null}
            </div>
            <hr></hr>
            <div className="btn-box">
                <div className="price-box">
                <p>{data?.status === 'ended' && user?.id === data?.currentBidData?.userId || data?.status === 'paymentComplete' && user?.id === data?.currentBidData?.userId ? 'Won' 
                    : data?.status === 'live' ? 'Ongoing' : 'Closed'} Bid</p>
                <h4>{formatToUSD(data?.currentBidData?.bidAmount || data?.bidAmount)}</h4>
                </div>
                {data?.status === 'ended' && user?.id === data?.currentBidData?.userId 
                ? <Link href={routerPush || ''} passHref>
                    <CardButton>Make payment</CardButton>
                </Link>
                : null}
            </div> 
            </CardWrapper>
        </Link>
      </CardMainWrapper>
    )
}

export default MyAuctionCard