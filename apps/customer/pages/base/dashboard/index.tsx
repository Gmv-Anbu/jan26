import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { RootState } from '@apps/customer/redux/store'
import { useSelector } from 'react-redux'
import API from '@apps/customer/api/customer/index'
import { formatToUSD, handleApiImage, truncateEllipsisMiddle } from '@apps/customer/utils/helper'
import NotFound from '@apps/customer/components/NotFound'
import { useWeb3Context } from '@nft-marketplace/wallet-selector'
import AuctionCard from '@apps/customer/components/cardDesigns/auctionCard'
import moment from 'moment'
import Link from 'next/link'

const MainContainer = styled.div`
  width: 100%;
  margin: 20rem 0 70px 0;
  @media screen and (max-width: 780px) {
    margin: 13rem 0 4rem;
  }
`
const WrapperContainer = styled.div`
    width: 100%;
    max-width: 144rem;
    margin: 0 auto;
    @media screen and (max-width: 1450px) {
      max-width: 154rem;
  }
    @media screen and (max-width: 1360px) {
        max-width: 135rem;
    }
    @media screen and (max-width: 1240px) {
      max-width: 125rem;
  }
    @media screen and (max-width: 991px) {
        max-width: 115rem;
    }
    @media screen and (max-width: 780px) {
        padding: 0px 24px;
    }
    @media screen and (max-width: 575px) {
        max-width: 54rem;
    }
    h1 {
        color: #111727;
        margin-bottom: 15px;
    }
`
const DashboardInfo = styled.div`
    margin-bottom: 60px;
    h1 {
        font-size: 36px;
        font-weight: 400;
        line-height: 29px;
        text-transform: none;
        font-family: 'proxima_novalight';
        margin-bottom: 60px;
        span {
            font-weight: 700;
            font-family: 'proxima_novaregular';
        }
    }
    h4 {
        font-size: 28px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0.0124em;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 575px) {
      margin-bottom: 40px;
      h1 {
        font-size: 24px;
        margin-bottom: 34px;
      }
      h4 {
        font-size: 24px;
      }
    }
`
const DashboardCardsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 30px;
    @media screen and (max-width: 1300px) {
      justify-content: flex-start;
      flex-wrap: wrap
    }
    @media screen and (max-width: 780px) {
      flex-wrap: wrap;
      gap: 20px;
      justify-content: left;
    }
`
const DashboardCard = styled.div`
    width: 264px;
    height: 144px;
    display: flex;
    justify-content: space-between;
    background: #EAF2F2;
    align-items: flex-end;
    .hover {
      display: none;
    }
    &:hover {
      background: url('/images/customer/dashboard/card-bg.png');
      background-size: 120% 120%;
      background-repeat: no-repeat;
      .hover {
        display: block;
      }
      .no-hover {
        display: none;
      }
      h3 {
        color: white;
      }
      p {
        color: #F4F9F9;
      }
    }
    div {
        padding: 20px 25px;
        text-align: right;
        h3 {
            font-size: 38px;
            font-weight: 700;
            line-height: 40px;
            color: #2A7575;
            margin-bottom: 8px;
        }
        p {
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            color: #696969;
        }
    }
    @media screen and (max-width: 400px) {
      width: 100%;
      div p {
        font-size: 18px;
      }
    }
`
const MultiCardContainer = styled.div`
    display: grid;
    grid-template-columns: 102rem 38rem;
    grid-gap: 40px;
    &.single {
      grid-template-columns: auto;
    }
    @media screen and (max-width: 1500px) {
      grid-template-columns:auto auto;
      grid-gap: 20px;
    }
    @media screen and (max-width: 1360px) {
      grid-template-columns: auto;
    }
    @media screen and (max-width: 900px) {
      grid-gap: 0;
      display: flex;
      flex-direction: column;
      &.firstsection {
        display: flex;
        flex-direction: column-reverse;
      }
    }
`
const CardSectionContainer = styled.div`
  margin-bottom: 50px;
  @media screen and (max-width: 780px) {
    margin-bottom: 40px;
  }
`
const DFlexAic = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #1D1D1D;
    h4 {
        font-size: 28px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0.0124em;
        text-transform: uppercase;
        @media screen and (max-width: 575px) {
          font-size: 22px;
        }
    }
    a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            font-size: 18px;
            font-weight: 600;
            line-height: 22px;
            letter-spacing: -0.0024em;
            margin-right: 12px;
        }
    }
`
const GridCardContianer = styled.div`
  padding: 25px 0 0px 0;
  width: 100%;
  display: grid;
  justify-content: flex-start;
  grid-template-columns: auto auto auto;
  &.four {
    grid-template-columns: auto auto auto auto;
  }
  &.no-card {
    grid-template-columns: auto;
    justify-content: center;
    min-height: 460px;
  }
  gap: 2rem;
  @media screen and (max-width: 1000px) {
    justify-content: flex-start;
  }
  @media screen and (max-width: 900px) {
    padding: 16px 24px 0px 0;
    display: flex;
    gap: 20px;
    overflow-x: auto;
    width: calc(100% + 24px);
    &.no-card {
      min-height: auto;
    }
    &::-webkit-scrollbar {
      width: 3px;
      display: none;
    }
  }
`

const CardWrapper = styled.div`
  flex: 0 0 100%;
  box-sizing: border-box;
  max-width: 320px;
  min-width: 320px;
  min-height: 420px;
  @media screen and (max-width: 1200px) {
    min-width: 280px;
  }
  background: #ffffff;
  border: 1.09015px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px 30px;
  gap: 10px;
  cursor: pointer;
  .image-box {
    position: relative;
    width: 100%;
    max-width: 148px;
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
    p, strong, h3 {
      width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      text-align: center;
      line-height: normal;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 28px;
      color: #121212;
    }
    strong {
      color: #898989;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
    }
    h3 {
      font-size: 18px;
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
    width: 100%;
    background: linear-gradient(90deg, rgba(209, 224, 226, 0) 0%, rgb(209, 224, 226) 52.11%, rgba(209, 224, 226, 0) 100%) !important;
  }
  .btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .price-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
      h4 {
        font-size: 18px;
        font-weight: 700;
        line-height: 29px;
        color: #090909;
      }
      .p-tag {
        font-style: normal;
        font-size: 1.4rem;
        color: #121212;
        span {
          font-size: 1.4rem;
        }
      }
    }
  }
  .time-left {
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #8A8A8A;
    margin-bottom: 7px;
    span {
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        color: #000000;
        padding: 5px 12px;
        height: 24px;
        border-radius: 10px;
        margin-left: 10px;
        box-shadow: 0px 2px 6px 0px #0000000F;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 280px;
    min-width: 280px;
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
        .p-tag {
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
const RHSSection = styled.div`
  background: #EAF2F2;
  padding: 24px;
  margin-bottom: 50px;
  max-width: 378px;
  min-width: 300px;
  &.plan {
    min-height: 522px;
  }
  &.event {
    min-height: 490px;
    padding: 24px 24px 33px;
    h4 {
      margin-bottom: 25px;
    }
  }
  &.news {
    min-height: 475px;
    padding: 24px 24px 26px;
    h4 {
      margin-bottom: 25px;
    }
  }
  .no-data {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #000000;
  }
  h4 {
    font-size: 22px;
    font-weight: 400;
    line-height: 26px;
    color: #1D1D1D;
    margin-bottom: 16px;
    text-transform: uppercase;
  }
  .mt-4 {
    margin-top: 40px;
  }
  .mb-2 {
    margin-bottom: 20px;
  }
  .wallet-details {
    padding: 20px;
    background: #FFFFFF;
    .d-flex-aic {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 36px;
      div {
        width: 75%;
      }
      a {
        width: 34px;
        height: 34px;
      }
    }
    .min-title {
      font-size: 10px;
      font-weight: 400;
      line-height: 14px;      
      color: #656565;
      margin-bottom: 3px;
      text-transform: uppercase;
    }
    .wallet-no {
      font-size: 16px;
      font-weight: 600;
      line-height: 19px;
      color: #000000;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
    .balance {
      font-size: 28px;
      font-weight: 700;
      line-height: 39px;  
      color: #2A7575;    
    }
  }
  @media screen and (max-width: 830px) {
    max-width: 100%;
    &.plan {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 100%;
      grid-gap: 28px;
      min-height: auto;
      .mt-4 {
        margin-top: 0;
      }
      .wallet-details {
        height: 80%;
      }
    }
    &.event, &.news {
      min-height: auto;
    }
  }
  @media screen and (max-width: 780px) {
    padding: 20px 16px 16px;
    margin-bottom: 40px;
    &.event, &.news {
      padding: 20px 16px 30px;
    }
  }
  @media screen and (max-width: 575px) {
    &.plan {
      min-height: auto;
      display: block;
      .mt-4 {
        margin-top: 20px;
      }
      .wallet-details {
        height: 100%;
      }
    }
  }
`
const EventCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #D1E0E299;
  margin-bottom: 20px;
  gap: 20px;
  &:last-child {
    border: none; 
    margin: 0;
    padding: 0;
  }
  .date {
    max-width: 65px;
    height: 65px;
    width: 100%;
    color: white;
    .month {
      background: #2A7575;
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 12px;
      }
    }
    .year {
      font-size: 12px;
      font-weight: 400;
      line-height: 12px;
      background: #206565;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .desc {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #000000;
  }
`
const NewsCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #D1E0E299;
  &:last-child {
    border: none; 
    margin: 0;
    padding: 0;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.30000001192092896px;
    margin-bottom: 7px;
  }
  .info {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.23999999463558197px;
    color: #5F646C;
    span {
      font-family: Poppins;
      font-size: 13px;
      font-weight: 500;
      line-height: 20px;
      width: 54px;
      height: 22px;
      letter-spacing: -0.1733333319425583px;
      color: #2A7575;
      padding: 5px;
      border-radius: 5px;
      background: #E6F0F0;
    }
  }
`

function Card({ price = true, time = false, data, onClick = () => {} }) {
    const router = useRouter()
    return (
      <CardWrapper className={time ? '' : 'normal'} onClick={() => onClick()}>
        {time ? <p className='time-left'>Ends In: <span>00h  12m  10s</span></p> : null}
        <div className="image-box">
          <Image src={data?.image || handleApiImage(data.mainAssetUrl || data?.assetEdition?.assetsData?.mainAssetUrl)} objectFit='cover' alt="Product" width={148} height={220}/>
        </div>
        <hr></hr>
        <div className="details">
          <p>{data.refName || data?.assetEdition?.assetsData?.refName}</p>
          <strong>{data.refNo || data?.assetEdition?.assetsData?.refNo}</strong>
          <h3>{data.name || data?.assetEdition?.assetsData?.name}</h3>
        </div>
        {price 
        ? <div className="btn-box">
          <div className="price-box">
            {' '}
              <h4>{data.primarySalePrice ? formatToUSD(data.primarySalePrice) : formatToUSD(data?.currentBidData?.bidAmount || data?.bidAmount || data?.price) || 'NA'}</h4>
          </div>
        </div> 
        : null}
      </CardWrapper>
    )
}

const CustomerDashboard = () => {

    const router = useRouter()
    const { web3, accountInfo } = useWeb3Context()
    const userData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
    const [counts, setCounts] = useState(null)
    const [latest, setLatest] = useState([])
    const [myAuctions, setMyAuctions] = useState([])
    const [totalMyAuctions, setTotalMyAuctions] = useState(null)
    const [favorite, setFavorite] = useState([])
    const [favoriteCount, setFavoriteCount] = useState(null)
    const [highlightData, setHighlightData] = useState(null);
    const [eventTickets, setEventTickets] = useState([])

    console.log('userData', userData, web3, accountInfo, favorite)

    const dashCards = [
      { title: 'Live Auctions', count: 102, key: 'liveAuctionCount', imgSrc: '/images/customer/dashboard/cards/auctions' },
      { title: 'My Fractions', count: 64, key: 'fractionCount', imgSrc: '/images/customer/dashboard/cards/fractions' },
      { title: 'My Watch Vault', count: '08', key: 'myVaultCount', imgSrc: '/images/customer/dashboard/cards/vault' },
      { title: 'My NFTs', count: 23, key: 'myNftCount', imgSrc: '/images/customer/dashboard/cards/nft' },
      { title: 'My Safety box', count: '06', key: 'safetyBoxCount', imgSrc: '/images/customer/dashboard/cards/safety-box' },
    ]

    console.log('userData', userData)

    const auctionCards = [
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '$25,400', image: '/images/customer/dashboard/watch-1.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '$25,400', image: '/images/customer/dashboard/watch-2.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '$25,400', image: '/images/customer/dashboard/watch-3.png'  },
    ]

    const newsLetters = [
      { title: 'Ultimate football watch', time: 30, desc: 'watches that footballer', imgSrc: '/images/customer/dashboard/news-1.png' },
      { title: 'History of the soccer timer', time: 20, desc: 'tense anticipation...', imgSrc: '/images/customer/dashboard/news-2.png' },
      { title: 'Watch collecting takes', time: 24, desc: 'watch did Charlto...', imgSrc: '/images/customer/dashboard/news-3.png' },
      { title: "The master's choice", time: 30, desc: 'Drawing tutorial classes', imgSrc: '/images/customer/dashboard/news-4.png' },
    ]

    const calculateRemainingTimeForEachItem = (tempArray) => {
    if (tempArray.length > 0) {
      tempArray.forEach((obj) => {
        obj['remainingTime'] = moment(obj?.endTime).format('DD-MMM-YYYY')
      })
      setMyAuctions(tempArray)
    }
  }

    const getMyAuctionData = () => {
      let limit = 8
      API.getMyAuction(1, limit)
        .then(res => {
          console.log('res get my acution', res)
          if (res?.data?.data?.auctions) {
            calculateRemainingTimeForEachItem(res?.data?.data?.auctions)
            setTotalMyAuctions(res?.data?.data?.pageMeta?.totalItems)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }

    const getCounts = () => {
      API.getDashboardCounts()
      .then(res => {
        console.log('getCounts', res)
        if(res?.data?.data) {
          setCounts(res?.data?.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    const getAuctionHighlights = () => {
      let filter = '';
      API.getAuctions(1, 4, 'highlight', filter)
      .then((res) => {
        console.log("res?.data tess", res?.data)
        if (res?.data) {
          setHighlightData(res?.data?.data?.auctions)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    }

    const getLatestList = () => {
      API.getLatestAssets(1, 3)
      .then(res => {
        console.log('getLatestList', res)
        if(res?.data?.data) {
          setLatest(res?.data?.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    const getEventTicketsData = () => {
      API.getEventTickets()
      .then(res => {
        console.log('getEventTicketsData', res)
        if(res?.data?.data?.eventTickets) {
          setEventTickets(res?.data?.data?.eventTickets)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    const getFavoritesList = () => {
      API.getMyFavoritesData(1, 4)
      .then(res => {
        console.log('getMyFavoritesData', res)
        if(res?.data?.data?.favoriteList) {
          setFavorite(res?.data?.data?.favoriteList)
          setFavoriteCount(res?.data?.data?.pageMeta?.totalItems)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    useEffect(() => {
      getCounts()
      getMyAuctionData()
      getEventTicketsData()
      // getLatestList()
      getAuctionHighlights()
      getFavoritesList()
    },[])

    return (
        <MainContainer>
            <WrapperContainer>
                <DashboardInfo>
                    <h1><span>Hello, {userData?.firstName || userData?.userName}</span> Welcome back!</h1>
                    <div>
                        <h4>dashboard</h4>
                        <DashboardCardsWrapper>
                            {dashCards?.map(el => {
                                return (
                                    <DashboardCard key={el?.title}>
                                        <span className='no-hover'>
                                          <Image src={`${el?.imgSrc}.png`} width={95} height={141} />
                                        </span>
                                        <span className='hover'>
                                          <Image src={`${el?.imgSrc}-hover.png`} width={95} height={141} />
                                        </span>
                                        <div>
                                            <h3>{counts?.[el?.key] || '0'}</h3>
                                            <p>{el?.title}</p>
                                        </div>
                                    </DashboardCard>
                                )
                            })}
                        </DashboardCardsWrapper>
                    </div>
                </DashboardInfo>
                <MultiCardContainer className='firstsection single'>
                  <div>
                    <CardSectionContainer>
                      <DFlexAic>
                          <h4>My auctions ({totalMyAuctions || 0})</h4>
                          <Link href={'/auctions/my'}>
                            <a><span>View All</span><Icon name="arrow-right" /></a>
                          </Link>
                      </DFlexAic>
                      <GridCardContianer className={`four ${myAuctions?.length === 0 ? 'no-card' : ''}`}>
                          {myAuctions?.length 
                          ? myAuctions.map((el, i) => {
                            if (i < 4) return (
                              // <AuctionCard auctionType={null} data={el} updateFav={() => { }} routerPush={`/auctions/${el?.id}`} key={i} />
                              <Card data={el} key={i} onClick={() => router.push(`/auctions/${el.id}`)} />
                            )
                          }) 
                          : <NotFound size="sm" padding="55px 0 0" mrPadding="0" />}
                      </GridCardContianer>
                    </CardSectionContainer>
                  </div>
                  {/* <div>
                    <RHSSection className='plan'>
                      <div>
                        <h4>My Plan</h4>
                        <Image src={'/images/customer/dashboard/no-plan-card.svg'} width={330} height={180} />
                      </div>
                      <div>
                        <h4 className='mt-4'>My wallet</h4>
                        <div className='wallet-details'>
                          <div className='d-flex-aic'>
                            <div>
                              <p className='min-title'>Account 1</p>
                              <p className='wallet-no'>{truncateEllipsisMiddle(userData?.walletAddress || accountInfo?.activeAccount) || 'NA'}</p>
                            </div>
                            <a>
                              <Image src={'/svgs/empty-wallet.svg'} width={38} height={38} />
                            </a>
                          </div>
                          <div>
                            <p className='min-title'>current Balance</p>
                            <p className='balance'>${accountInfo?.balance || '0'}</p>
                          </div>
                        </div>
                      </div>
                    </RHSSection>
                  </div> */}
                </MultiCardContainer>
                <MultiCardContainer>
                    <div>
                        <CardSectionContainer>
                            <DFlexAic>
                                <h4>Highlights ({highlightData?.length || '0'})</h4>
                                {highlightData?.length ? <a><span>View All</span><Icon name="arrow-right" /></a> : null}
                            </DFlexAic>
                            <GridCardContianer className={`${highlightData?.length === 0 ? 'no-card' : ''}`}>
                                {highlightData?.length 
                                ? highlightData.map((product, i) => {
                                  if (i < 3) return <Card key={i} data={product} onClick={() => router.push(`/base/my-nft/${product.id}`)} />
                                })
                                : <NotFound size="sm" padding="55px 0 0" mrPadding="0" />}
                            </GridCardContianer>
                        </CardSectionContainer>
                        {/* <CardSectionContainer>
                            <DFlexAic>
                                <h4>My favourites ({favoriteCount})</h4>
                                {favoriteCount ? <a onClick={() => router.push('/base/myFavourite')}><span>View All</span><Icon name="arrow-right"/></a> : null}
                            </DFlexAic>
                            <GridCardContianer className={`${favorite?.length === 0 ? 'no-card' : ''}`}>
                                {favorite?.length 
                                ? favorite.map((product, i) => (
                                  <Card price={false} key={i} data={product?.asset} onClick={() => router.push(`/base/myFavourite/${product?.asset?.id}`)} />
                                ))
                                : <NotFound size="sm" padding="55px 0 0" mrPadding="0" />}
                            </GridCardContianer>
                        </CardSectionContainer> */}
                    </div>
                    <div>
                      <RHSSection className='event'>
                        <h4>My Events Schedules</h4>
                        {eventTickets?.length 
                        ? <>
                          {eventTickets.map(el => {
                            // console.log('asdasdasdasdad', el?.eventData?.startDate, moment(el?.eventData?.startDate).format('DD-MMM-YYYY'))
                            return (
                              <EventCard key={el?.id}>
                              <div className='date'>
                                <p className='month'><span>{moment(el?.eventData?.startDate).format('MMM')}&nbsp;</span>{moment(el?.eventData?.startDate).format('DD')}</p>
                                <p className='year'>{moment(el?.eventData?.startDate).format('YYYY')}</p>
                              </div>
                              <p className='desc'>{el?.eventData?.description?.length > 75 ? `${el?.eventData?.description.slice(0, 75)}...` : el?.eventData?.description}</p>
                            </EventCard>
                            )
                          })}
                        </>
                        : <EventCard>
                          <Image src={`/images/customer/dashboard/watch-cancel.png`} width={70} height={70} />
                          <p className='no-data'>No Events Scheduled!!!</p>
                        </EventCard>}
                      </RHSSection>
                      {/* <RHSSection className='news'>
                        <h4>Latest Newsletter</h4>
                        {newsLetters?.map(el => {
                          return (
                            <NewsCard>
                              <Image src={el?.imgSrc} width={70} height={70} />
                              <div>
                                <p className='title'>{el?.title}</p>
                                <p className='info'><span>{el?.time}MIN</span> {el?.desc}</p>
                              </div>
                            </NewsCard>
                          )
                        })}
                        <NewsCard>
                          <Image src={`/images/customer/dashboard/watch-cancel.png`} width={70} height={70} />
                          <div>
                            <p className='no-data'>No News Available!!!</p>
                          </div>
                        </NewsCard>
                      </RHSSection> */}
                    </div>
                </MultiCardContainer>
                <MultiCardContainer className='firstsection single'>
                  <div>
                    <CardSectionContainer>
                      <DFlexAic>
                          <h4>My favourites ({favoriteCount})</h4>
                          {favoriteCount ? <a onClick={() => router.push('/base/myFavourite')}><span>View All</span><Icon name="arrow-right"/></a> : null}
                      </DFlexAic>
                      <GridCardContianer className={`four ${favorite?.length === 0 ? 'no-card' : ''}`}>
                          {favorite?.length 
                          ? favorite.map((product, i) => (
                            <Card price={false} key={i} data={product?.asset} onClick={() => router.push(`/base/myFavourite/${product?.asset?.id}`)} />
                          ))
                          : <NotFound size="sm" padding="55px 0 0" mrPadding="0" />}
                      </GridCardContianer>
                    </CardSectionContainer>
                  </div>
                </MultiCardContainer>
            </WrapperContainer>
        </MainContainer>
    )
}

export default CustomerDashboard