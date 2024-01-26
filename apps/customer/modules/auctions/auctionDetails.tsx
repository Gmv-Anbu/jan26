import { useRouter } from 'next/router'
import { useEffect, useState, memo, useCallback, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import API from '../../api/customer/index'
import Loader from '@apps/customer/modules/shared/components/Loader'
import useMuseum from '@apps/customer/modules/customer/museum/useMuseum'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { formatToUSD, handleApiImage, objectDeepClone } from '@apps/customer/utils/helper'
import { toast } from 'react-toastify'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import { ModalService } from '@nft-marketplace/modal'
import ImageZOom from '@apps/customer/components/ImageZoom'
import NftCard from '@apps/customer/components/NftCard'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import AuctionDetails from '@apps/customer/components/Auction-details'
import moment from 'moment'
import { getCookie } from '@nft-marketplace/js-cookie'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'

interface IstyleProps {
  isPadding?: string
  isExpanded?: boolean
  isViewPort?: boolean
}
const MainContainer = styled.div`
  width: 100%;
  background-color: #f4f9f9;
`
const Container = styled.div<IstyleProps>`
  max-width: 144rem;
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => (props.isPadding ? props.isPadding : '16rem 0 7.6rem 0')};
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
    padding: ${(props) => (props.isPadding ? props.isPadding : '13.8rem 2rem 5rem')};
    max-width: 72rem;
  }
  @media screen and (max-width: 575px) {
    padding: ${(props) => (props.isPadding ? props.isPadding : '13.8rem 0rem 5rem')};
    max-width: 54rem;
  }
`
const ProductWrapper = styled.div`
  user-select: none;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 575px) {
    padding: 0rem 2rem;
  }
`
const BackButn = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22.5px;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 1.5rem;
  letter-spacing: -0.24px;
  color: #848a8b;
  margin: 0 0 7rem 0;
  @media screen and (max-width: 798px) {
    margin: 12px 0 33px 0;
  }
  @media screen and (max-width: 575px) {
    font-size: 14px;
    margin: 0 0 0.2rem 0;
  }
`
const DetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4rem;
  @media screen and (max-width: 1360px) {
    gap: 8rem;
    flex-direction: column;
  }
`
const ImagesBox = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.2rem;
  .sub-images-box {
    display: flex;
    align-items: space-evenly;
    flex-direction: column;
    /* max-height: 56.2rem; */
    gap: 8px;
    .arrow-up,
    .arrow-down {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      svg {
        min-width: 1.3rem;
        min-height: 0.6rem;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .arrow-up svg {
      transform: rotate(90deg);
      margin: 0 0 29px 0;
    }
    .arrow-down svg {
      transform: rotate(-90deg);
      margin: 29px 0 0 0;
    }
    .img-box,
    .img-box-active {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 150px;
      max-height: 150px;
      min-width: 150px;
      min-height: 150px;
      background: #fff;
      transition: transform 0.4s;
      overflow: hidden;
      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }
    }
    .img-box-active {
      border: 2px solid #d1e0e2;
    }
  }
  .main-img-box {
    cursor: pointer;
    position: relative;
    min-width: 607px;
    min-height: 562px;
    // background-color: #fff;
  }
  @media screen and (max-width: 1360px) {
    justify-content: flex-start;
  }
  @media screen and (max-width: 976px) {
    flex-direction: column-reverse;
    .sub-images-box {
      flex-direction: row;
      .arrow-up,
      .arrow-down {
        width: 20px;
      }
      .arrow-up svg {
        transform: rotate(0deg);
        margin: 0;
      }
      .arrow-down svg {
        margin: 0;
        transform: rotate(-180deg);
      }
    }
  }

  @media screen and (max-width: 694px) {
    .sub-images-box {
      gap: 1rem;
      .img-box,
      .img-box-active {
        max-width: 95px;
        max-height: 95px;
        min-width: 95px;
        min-height: 95px;
      }
    }
    .main-img-box {
      max-width: 440px;
      min-width: 342px;
      min-height: 337px;
      max-height: 337px;
    }
  }
  @media screen and (max-width: 374px) {
    .sub-images-box {
      gap: 1rem;
      .img-box,
      .img-box-active {
        max-width: 70.5px;
        max-height: 70.5px;
        min-width: 70.5px;
        min-height: 70.5px;
      }
    }
    .main-img-box {
      max-width: 342px;
      min-width: 250px;
      min-height: 307px;
    }
  }
`
const AuctionDBox = styled.div`
  min-height: 562px;
  min-width: 450px;
  @media screen and (max-width: 500px) {
     min-width: 100%;
  }
  .lot-no {
    font-size: 16px;
    font-weight: 600;
  }
  p.phase {
    background: #2A7575;
    padding: 3px 8px;
    font-size: 12px;
    border-radius: 12px;
    color: white;
    display: inline-block;
    line-height: normal;
  }
  .paddle-no {
    margin: 10px 0;
  }
  p.fourth-line {
    font-size: 16px;
    font-weight: 500;
    line-height: 29px;
    color: #0E1818;
    margin-top: 5px;
  }
  h4 {
    font-size: 44px;
    font-weight: 500;
    line-height: 58px;
    color: #0E1818;
    margin-bottom: 8px;
  }  
  p.ref {
    font-size: 24px;
    font-weight: 400;
    line-height: 29px;
    color: #4E4E4E;
    margin-bottom: 8px;
  }
  h3 {
    font-size: 20px;
    font-weight: 500;
    line-height: 29px;
    color: #0E1818;
  }
  .price-box {
    position: relative;
    a {
      cursor: pointer;
      background: #2A7575;
      color: #fff;
      border: 1px solid #2A7575;
      font-weight: 700;
      line-height: 20px;
      font-size: 12px;
      padding: 7px 15px;
    }
    .fav-box-mr {
      position: absolute;
      right: 0;
      top: 5px;
      span {
        cursor: pointer;
      }
    }
  }
  .label-price-box {
    margin-bottom: 24px;
  }
  .label {
    font-size: 14px;
    font-weight: 400;
    line-height: 28px;
    color: #0E1818;
  }
  h5 {
    font-size: 26px;
    font-weight: 600;
    line-height: 28px;
    color: #121212;
  }
  h6 {
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: #121212;
  }
  .label-2 {
    font-size: 16px;
    font-weight: 600;
    line-height: 21px;
    color: #8A8A8A;
    margin-right: 7px;
  }
  .d-flex-aic {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .gray-line {
    width: 100%;
    border: 1.5px solid #d1e0e2;
    margin: 2.4rem 0;
  }
`
const AuctionEnded = styled.div`
  margin-top: 120px;
  p.msg {
    color: #639A5B;
    font-size: 24px;
    font-weight: 500;
    line-height: 130%; /* 31.2px */
    letter-spacing: 0.12px;
  }
  button {
    margin-top: 2rem;
    width: 100%;
  }
  div {
    display: grid;
    grid-template-columns: 50px auto;
    grid-gap: 10px;
    padding: 15px 22px;
    margin-top: 10px;
    background: rgba(201, 224, 224, 0.40);
    p {
      color: #121212;
      font-size: 20px;
      font-weight: 400;
      line-height: 140%;
    }
    span {
      color: #121212;
      font-size: 20px;
      font-weight: 600;
      line-height: 140%;
    }
  }
`
const AuctionTimer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  p.msg {
    color: #639A5B;
    font-size: 24px;
    font-weight: 500;
    line-height: 130%; /* 31.2px */
    letter-spacing: 0.12px;
  }
  div.timer {
    display: flex;
    text-align: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
    div {
      background: #C9E0E066;
      width: 66px;
      height: 60px;
      display: grid;
      align-items: center;
      p {
        font-size: 22px;
        font-weight: 400;
        line-height: 26px;
        color: #121212;
        span {
          font-size: 13px;
          font-weight: 400;
          line-height: 13px;
          color: #424242;
          display: block;
          margin-top: 2px;
        }
      }
    }
  }
  span {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    color: #121212;
  }
  button {
    min-width: 420px;
    &.reg-btn {
      margin-top: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    div.timer {
      gap: 10px;
    }
    button {
      min-width: 100%;
    }
  }
`
const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  min-height: 100%;
  width: 56.3rem;
  .title-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .title-and-fav p,
    strong,
    h3 {
      max-width: 520px;
      /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
    }
    .title-and-fav {
      width: 56.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        min-width: 350px;
        font-style: normal;
        font-weight: 600;
        font-size: 4.8rem;
        line-height: 120%;
        color: #0e1818;
        margin: 0 0 0.8rem 0;
        text-transform: uppercase;
      }
      .fav-box {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        span {
          background-color: #fff;
          position: relative;
          width: 73px;
          height: 73px;
          cursor: pointer;
          border-radius: 50px;
          svg {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 33px;
            height: 33px;
          }
        }
      }
      @media screen and (max-width: 1360px) {
        .fav-box {
          display: none;
        }
      }
    }

    strong {
      font-size: 2.4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      color: #4e4e4e;
      margin: 0 0 1.6rem 0;
    }
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 120%;
      /* text-transform: lowercase; */
      color: #0e1818;
    }
  }
  .gray-line {
    width: 100%;
    border: 1.5px solid #d1e0e2;
    margin: 3.2rem 0;
  }
  @media screen and (max-width: 768px) {
    .title-box {
      .title-and-fav {
        p {
          font-size: 32px;
          margin: 0 0 5px 0;
        }
      }
      strong,
      h3 {
        font-size: 16px;
        margin: 0 0 5px 0;
      }
    }
    .gray-line {
      border: 0.6px solid #d1e0e2;
      margin: 1.6rem 0;
    }
  }
`

export const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;

`

interface DetailsProps {
  itemID?: any
  isPath?: string
  backBtnName?: string
  headerName?: string
  relatedProductsHeading?: string
}

const AuctionDetailsPage = ({ itemID, isPath, backBtnName, headerName, relatedProductsHeading }: DetailsProps) => {
  const router = useRouter()
  const { width } = useWindowSize()

  const [isLoading, setIsLoading] = useState(true)
  const [collectionDetails, setCollectionDetails] = useState<any>({
    brand: '',
    ref: '',
    title: '',
    details: '',
    movement: '',
    case: '',
    images: [],
  })
  const [mainImg, setMainImg] = useState('')
  let [activeImg, setActiveImg] = useState(0)
  const [imagesArr, setImagesArr] = useState([])
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [activeArr, setActiveArr] = useState(1);
  const [isFvrt, setIsFvrt] = useState(false)
  const [isImageZoom, setIsImageZoom] = useState(false)
  const [timer, setTimer] = useState({ days: '', hours: '', minutes: '', seconds: '' })
  const [auctionId, setAuctionId] = useState(null)
  const [assetId, setAssetId] = useState(null)
  const [auctionRegData, setAuctionRegData] = useState(null)
  const [auctionExpired, setAuctionExpired] = useState(false)
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [dynamicPhase, setDynamicPhase] = useState(false)
  const [live, setLive] = useState(false)
  const [cardVerified, setCardVerified] = useState(false)
  const reserveNotMet = ['183', '199', '203', '149']
  const noBids = ['47']

  const getDetailsById = async (Id = itemID) => {
    await API.getAuctionById(Id)
    .then(res => {
      if (res.status == 200 && res?.data?.data?.auction) {
        // console.log('getAuctionById',res)
        let auctionDetails = objectDeepClone(res?.data?.data?.auction)
        let assetDetails = objectDeepClone(auctionDetails?.assetEdition?.assetsData)
        setAuctionId(auctionDetails?.id)
        setAssetId(assetDetails?.id)
        setDynamicPhase(auctionDetails?.phase === 2 ? true : false)
        setIsFvrt(assetDetails?.isFavorite)
        let assetMediaFileData = auctionDetails?.assetEdition?.assetsData?.assetMediaFileData
        const slicedSubImgs = assetMediaFileData.length > 0 ? assetMediaFileData : []
        if(assetMediaFileData.length) setImagesArr(assetMediaFileData.slice(0, numberOfCards))
        setCollectionDetails({
          ...auctionDetails,
          id: auctionDetails?.id,
          assetId: assetDetails?.id,
          name: assetDetails?.name,
          refNo: assetDetails?.refNo,
          refName: assetDetails?.refName,
          fourthLine: assetDetails?.fourthLine,
          details: assetDetails?.description,
          biography: auctionDetails?.biography,
          conditionalReportUrl: auctionDetails?.conditionalReportUrl,
          images: slicedSubImgs,
          // isFavorite,
          minPrice: formatToUSD(auctionDetails?.minPrice),
          maxPrice: formatToUSD(auctionDetails?.maxPrice),
          bidAmount: formatToUSD(auctionDetails?.currentBidData?.bidAmount || auctionDetails?.bidAmount),
          startTime: auctionDetails?.startTime,
          endTime: auctionDetails?.endTime,
          expired: auctionDetails?.status,
        })
        setAuctionExpired(auctionDetails?.status ==="expired" ? true : false)
        const isMainImg = assetDetails?.mainAssetUrl?.includes('https')
        setMainImg(isMainImg ? slicedSubImgs[0]?.filePath : handleApiImage(assetDetails?.mainAssetUrl))
      } else {
        toast.error(res?.error?.error?.message || 'Something went wrong. Please try again later', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          style: {
            fontSize: '1.6rem',
          },
        })
        setTimeout(() => {
          router.push(`${isPath}`)
        }, 3000)
      }
    })
  }

  const getAuctionReg = () => {
    API.getAuctionRegistration(auctionId)
    .then(res => {
      setAuctionRegData(res?.data?.data)
    })
    .catch(err => {
      console.log('err', err)
    })
  }

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

  // add or remove fav
  const updateFav = useCallback(async (assetId) => {
    const response = await API.createOrRemovefavorite({ assetId })
    if (response?.status === 200) {
      getDetailsById()
      Toast.success(response?.data?.data?.isFavorite ? 'Added to favorite' : 'Removed from favorite')
    } else {
      Toast.error(response.error.error.message || 'Something went wrong try again later')
    }
  }, [])

  const imageViewHandler = (img, imgId) => {
    setMainImg(img)
    setActiveImg(imgId)
    return
  }

  const handleNextClick = () => {
    let value = activeImg + 1
    if(value >= imagesArr?.length) {
      let startFromNew = activeArr >= collectionDetails?.images?.length/numberOfCards
      let lastElems = value + numberOfCards > collectionDetails?.images?.length
      let visibleCards = []
      if(lastElems && !startFromNew) {
        visibleCards = collectionDetails?.images.slice(-3);
      } else {
        visibleCards = collectionDetails?.images.slice(startFromNew ? 0 : activeArr*3, (startFromNew ? 0 : activeArr*3) + numberOfCards);
      }
      setImagesArr(visibleCards)
      setMainImg(visibleCards[0].filePath)
      setActiveImg(0)
      setActiveArr(startFromNew ? 1 : activeArr+1)
    } else {
      setActiveImg(value);
      setMainImg(imagesArr[value].filePath)
    }
  };

  const handlePrevClick = () => {
    let value = activeImg - 1
    if(activeArr === 1 && value === -1) {
      const visibleCards = collectionDetails?.images.slice(-3);
      setImagesArr(visibleCards)
      setActiveImg(visibleCards?.length -1)
      setActiveArr(Math.ceil(collectionDetails?.images?.length / numberOfCards))
      setMainImg(visibleCards[visibleCards?.length -1].filePath)
    } else if(activeImg !== 0) {
      setActiveImg(value);
      setMainImg(imagesArr[value].filePath)
    } else {
      let spliceVal = (activeArr-2)*3
      const visibleCards = collectionDetails?.images.slice(spliceVal, spliceVal + numberOfCards);
      setImagesArr(visibleCards)
      setActiveImg(visibleCards?.length - 1)
      setActiveArr(activeArr - 1)
      setMainImg(visibleCards[visibleCards?.length -1].filePath)
    }
  };

  const backBtnHandler = () => {
    if(getCookie('auctionRedirect')) {
      router.push(`${isPath}`)
    } else {
      if(profileData?.id && isPath === '/auctions') {
        router.push(isPath)
      } else {
        router.back()
      }
    }
  }

  const heartClicked = () => {
    setIsFvrt(!isFvrt)
    updateFav(assetId)
  }

  const calculateRemainingTime = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60).toString();
    const minutes = Math.floor((total / 1000 / 60) % 60).toString();
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24).toString();
    const days = Math.floor(total / (1000 * 60 * 60 * 24)).toString();
    // console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s")
    setTimer({ days, hours, minutes, seconds })
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }

  useEffect(() => {
    if(isLoading) { 
        document.getElementsByTagName( 'html' )[0].setAttribute('class','overflow-hidden')
        document.body.classList.add('overflow-hidden');
    } else {
        document.getElementsByTagName( 'html' )[0].setAttribute('class','')
        document.body.classList.remove('overflow-hidden');
    }
  },[isLoading])

  useEffect(() => {
    if(auctionExpired && profileData?.id) getRapydStatus()
  }, [auctionExpired])

  useEffect(() => {
    if(router.query.itemId) getDetailsById()
  }, [router.query.itemId])

  useEffect(() => {
    if(auctionId && profileData?.id && profileData?.accessToken) getAuctionReg()
  }, [auctionId, profileData])

  // console.log('collectionDetails', collectionDetails)

  let intervalId

  useEffect(() => {
    let isLive = false
    if(collectionDetails?.startTime) {
      setLive(moment().isSameOrAfter(collectionDetails?.startTime))
      isLive = moment().isSameOrAfter(collectionDetails?.startTime)
      // console.log('collectionDetails?.startTime', collectionDetails?.startTime, moment().isSameOrAfter(collectionDetails?.startTime))
    }
    intervalId = setInterval(() => { calculateRemainingTime(!isLive ? collectionDetails?.startTime : collectionDetails?.endTime) }, 1000)
    if(auctionExpired) clearInterval(intervalId)
    return (() => {
      clearInterval(intervalId)
    })
  }, [collectionDetails, auctionExpired])

  useEffect(() => {
    if(Number(timer?.minutes) <= -1 && Number(timer?.seconds) <= -1) {
      // console.log('action has axpired', timer?.minutes, timer?.seconds)
      setAuctionExpired(true)
      clearInterval(intervalId)
    }
  }, [timer?.seconds, timer?.minutes])

  // console.log('reserveNotMet', reserveNotMet, auctionId, 183)

  return (
    <>
      {isLoading 
      ? <FullPageLoader>
        <Loader /> 
      </FullPageLoader>
      : null}
      <MainContainer style={{visibility: `${isLoading ? 'hidden': 'visible'}`}}>
        <Container>
          <ProductWrapper>
            <BackButn onClick={backBtnHandler}>
              {width > 768 ? (
                <svg width="9" height="13" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 1.375L1.6875 6.5L6.8125 11.625" stroke="#909499" strokeWidth="2.5625" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 1L1.5 4L4.5 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {backBtnName || 'Go Back'}
            </BackButn>
            <DetailsWrapper>
              <ImagesBox>
                {collectionDetails?.images?.length ? (
                  <div className="sub-images-box">
                    <div onClick={() => handlePrevClick()} className={collectionDetails?.images?.length ? 'arrow-up' : 'display-none'}>
                      <svg width={'8'} height={'15'} viewBox="0 0 3 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.45563 3.20108L4.00391 0.711238L3.27597 6.21784e-08L-0.00024147 3.20108L3.27597 6.40215L4.00391 5.69091L1.45563 3.20108Z" fill="#444444" />
                      </svg>
                    </div>
                    {imagesArr.map((image, i) => (
                      <div onClick={() => imageViewHandler(image?.filePath, i)} key={i} className={activeImg == i ? 'img-box-active' : 'img-box'}>
                        <Image src={image.filePath ? handleApiImage(image.filePath) : ''} objectFit="contain" alt={'ICO'} layout="fill" />
                      </div>
                    ))}
                    <div onClick={() => handleNextClick()} className={collectionDetails?.images?.length ? 'arrow-down' : 'display-none'}>
                      <svg width={'8'} height={'15'} viewBox="0 0 3 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.45563 3.20108L4.00391 0.711238L3.27597 6.21784e-08L-0.00024147 3.20108L3.27597 6.40215L4.00391 5.69091L1.45563 3.20108Z" fill="#444444" />
                      </svg>
                    </div>
                  </div>
                ) : null}
                <div
                  onClick={() => {
                    setIsImageZoom(true)
                  }}
                  className="main-img-box"
                >
                  {mainImg ? <Image onLoadingComplete={() => setTimeout(() => {setIsLoading(false)}, 1000) } src={mainImg ? handleApiImage(mainImg) : ''} layout="fill" alt={'ICO'} objectFit="contain" /> : null}
                </div>
              </ImagesBox>
              {/* <DetailsBox>
                <div className="title-box">
                  <div className="title-and-fav">
                    {' '}
                    <p>{collectionDetails.title}</p>
                    <div className="fav-box">
                      <span
                        onClick={() => {
                          setIsFvrt(!isFvrt)
                          updateFav(collectionDetails.id)
                        }}
                      >
                        <Icon name="heart-green" fill={isFvrt ? '#2A7575' : 'none'} />
                      </span>
                    </div>
                  </div>
                    {collectionDetails.ref 
                    ? <strong>{collectionDetails.ref}</strong> 
                    : null}
                  <h3>{collectionDetails.brand}</h3>
                </div>
                <div className="gray-line"></div>
              </DetailsBox> */}
              <AuctionDBox>
                <div className='d-flex-aic-jsb'>
                  <p className='phase'>{dynamicPhase ? 'Dynamic phase' : 'Regular phase'}</p>
                  {collectionDetails?.lotNumber ? <p className='lot-no'>Lot No. {collectionDetails?.lotNumber}</p> : null}
                </div>
                <h4>{collectionDetails.name}</h4>
                <p className='ref'>{collectionDetails?.refNo}</p>
                <h3>{collectionDetails?.refName}</h3>
                {collectionDetails?.fourthLine 
                ? <p className='fourth-line'>{collectionDetails?.fourthLine}</p>
                : null}
                <div className="gray-line"></div>
                <div className='price-box'>
                  <div className="fav-box-mr">
                    <span
                      onClick={() => profileData?.id && profileData?.accessToken ? heartClicked() : router.push('/base/signin')}
                    >
                      <Icon name="heart-green" fill={isFvrt ? 'red' : 'none'} />
                    </span>
                  </div>
                  {auctionRegData?.id ? <p className='paddle-no'>#PaddleNumber-{auctionRegData?.id}</p> : null}
                  <div className='label-price-box'>
                    <p className='label'>Estimate Price</p>
                    <h5>{collectionDetails?.minPrice} - {collectionDetails?.maxPrice}</h5>
                  </div>
                  {isLoading 
                  ? null 
                  : <div className='label-price-box'>
                    <p className='label'>
                      {auctionExpired
                        ? <>{!profileData?.accessToken ? <a onClick={() => router.push('/base/signin')}>Sign in to view details</a> 
                        : reserveNotMet?.includes(auctionId?.toString()) ? 'RESERVE NOT MET'
                              : noBids?.includes(auctionId?.toString()) ? 'NO BIDS' 
                              : collectionDetails?.currentBidData?.bidAmount ? 'Winning Bid' : 'PASS'} </>
                        : <>{collectionDetails?.currentBidData?.bidAmount ? 'Current Bid' : 'Starting Bid'}</>}
                    </p>
                    {auctionExpired && collectionDetails?.currentBidData?.bidAmount || !auctionExpired
                      ? <h5>{auctionExpired && !profileData?.accessToken ? null : collectionDetails?.bidAmount}</h5> : null}
                  </div>}
                  {/* {auctionExpired && !collectionDetails?.currentBidData?.bidAmount 
                    ? <div className='label-price-box'>
                      <p className='label'>{reserveNotMet?.includes(auctionId) ? 'RESERVE NOT MET'
                        : noBids?.includes(auctionId) ? 'NO BIDS' : 'PASS'}</p>
                    </div>
                  : null} */}
                </div>
                {isLoading 
                ? null 
                : <>
                {auctionExpired 
                ? <AuctionEnded>
                  {Number(profileData?.id) === Number(collectionDetails?.currentBidData?.userId) 
                    ? <>
                      <p className='msg'>Congratulations! You won the bid</p>
                      <div>
                        <Image className='img' src={`/svgs/success-green-bg-tick.svg`} width={49} height={49} />
                        <p>Link to complete the payment has been sent to your registered email id <span>xxxxxxxxxx@gmail.com </span></p>
                      </div>
                      {collectionDetails?.status === 'paymentComplete' 
                      ? <ButtonPrimary>Payment Successful</ButtonPrimary> 
                      : <>
                      {cardVerified 
                      ? <ButtonPrimary onClick={() =>  router.push(`/base/payment/${auctionId}`)}>Proceed to Payment</ButtonPrimary> 
                      : <ButtonPrimary onClick={() =>  router.push(`/base/myProfile`)}>Verify Card</ButtonPrimary>}
                      </>}
                      
                    </> 
                    : <p className='msg'>Auction has Ended !!!</p>}
                </AuctionEnded>
                : <AuctionTimer>
                  <p className='label'>Auction {live ? 'Ends' : 'Starts'} in</p>
                  <div className='timer'>
                    {Number(timer?.days)
                    ? <>
                    <div><p className=''>{timer?.days} <span>Days</span></p></div>
                    <span>:</span>
                    </>
                    : null}
                    {Number(timer?.hours) || Number(timer?.days)
                    ? <>
                      <div><p className=''>{timer?.hours} <span>Hours</span></p></div>
                      <span>:</span>
                    </>
                    : null}
                    <div><p className=''>{timer?.minutes} <span>Minutes</span></p></div>
                    <span>:</span>
                    <div><p className=''>{timer?.seconds} <span>Seconds</span></p></div>
                  </div>
                  {profileData?.id && profileData?.accessToken 
                  ? <>
                    {auctionRegData?.status === 'Accepted' 
                    ? live 
                      ? <ButtonPrimary onClick={() =>  router.push(`/auctions/bid-now/${auctionId}`)}>Bid now</ButtonPrimary> 
                      : <p className='msg'>Auction has not started yet !!!</p>
                    : auctionRegData?.status === 'Pending' 
                      ? <ButtonPrimary disabled>Pending Admin Approval</ButtonPrimary> 
                      : auctionRegData?.status === 'Rejected' 
                        ? <ButtonPrimary disabled> Request Rejected</ButtonPrimary>
                        : <ButtonPrimary className='reg-btn' onClick={() =>  router.push(`/auctions/registration/${collectionDetails?.assetId}`)}>Register Now</ButtonPrimary>}
                  </>
                  : <ButtonPrimary onClick={() =>  router.push(`/base/signin`)}>Sign In Now</ButtonPrimary>}
                </AuctionTimer>}
                </>}
                {/* <div className='label-price-box'>
                  <div className='d-flex-aic'>
                    <p className='label-2'>Buyer's Premium</p>
                    <Image src="/svgs/info-primary.svg" width="18" height="18" />
                  </div>
                  <h6>$1,040.00</h6>
                </div> */}
              </AuctionDBox>
            </DetailsWrapper>
          </ProductWrapper>
        </Container>
        <ProductDetailsContainer assetId={assetId} isHeading={relatedProductsHeading} onBack={backBtnHandler} onGetDetails={getDetailsById} details={collectionDetails} screenSize={width}></ProductDetailsContainer>
      </MainContainer>
      {isImageZoom && <ImageZOom image={mainImg} onClose={() => setIsImageZoom(false)} title={collectionDetails.title || ''} currentImg={activeImg} totalImgs={collectionDetails.images} />}
    </>
  )
}

const ProductDetailsWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 9.2rem 0 15rem 0;
  @media screen and (max-width: 767px) {
    padding: 5rem 0 15rem 0;
  }
  @media screen and (max-width: 444px) {
    padding: 8px 0;
  }
`
const DetailsTabContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 9rem;
  transition: all 0.2s;
  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`
const DetailsTabs = styled.div<IstyleProps>`
  position: ${(props) => (props.isViewPort ? 'fixed' : '')};
  top: 10%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Tab = styled.div`
  .h2,
  .h2-active {
    width: 27.7rem;
    height: 8.2rem;
    padding: 3rem 0 0 3.8rem;
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 130%;
    letter-spacing: 0.005em;
    color: #0e1818;
    cursor: pointer;
    border-left: 2px solid #e1e1e1;
    transition: all 0.2s;
  }
  .h2-active {
    box-shadow: 0px 20.7983px 41.5966px rgba(0, 0, 0, 0.09);
    font-weight: 800;
    border-left: 4px solid #2a7575;
  }
`
const DetailsContent = styled.div<IstyleProps>`
  min-width: 73.2rem;
  padding: ${(props) => (props.isViewPort ? '0 0 0 36.5rem' : '0')};
  display: flex;
  flex-direction: column;
  .condition-report {
    margin-top: 20px;
    a {
        font-size: 14px;
        text-decoration: underline;
        color: #0e1818;
        &:hover {
            color: blue;
        }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 0;
    min-width: 520px;
  }
  @media screen and (max-width: 600px) {
    min-width: 420px;
  }
  @media screen and (max-width: 444px) {
    max-width: 339px;
    min-width: 339px;
  }
`
const tabsDetails = [
  {
    name: 'Details',
    path: '#details',
  },
  // {
  //   name: 'Condition report',
  //   path: '#conditionReport',
  // },
  // {
  //   name: 'Biography',
  //   path: '#biography',
  // },
  {
    name: 'More From',
    path: '#related',
  },
]
function ProductDetailsContainer({ assetId, details, isHeading, onBack, onGetDetails, screenSize }) {
  const router = useRouter()
  const [nftList, setNFTList] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getAuctions = (type = 'live', category = '4,5') => {
    let filter = {
      categoryId: category
    };
    let limit = typeof window !== "undefined" && window.innerWidth > 800 ? 24 : 12
    API.getAuctions(1, limit, type, filter, '')
    .then((res) => {
      // console.log("res?.data", res?.data)
      if (res?.data && res?.data?.data?.auctions?.length) {
        console.log('getAuctions', res?.data?.data?.auctions)
        let arr = res?.data?.data?.auctions.filter(el => Number(el?.assetEdition?.assetId) !== Number(assetId))
        setNFTList(arr)
      } else {
        setNFTList([])
      }
    }).catch((err) => {
      console.log('getAuctions', err)
    })
  }

  const refreshPage = useCallback(() => {
    getRelatedAuctions()
  }, [refresh])

  const getRelatedAuctions = () => {
    let int = getCookie('auctionRedirect')
    if(int) {
      console.log('int', int, int.split('-')?.[0], int.split('-')?.[1], assetId)
      let type = int.split('-')?.[0]
      let category = int.split('-')?.[1]
      if(type && category && assetId) {
        getAuctions(type, category)
      }
    } else {
      getAuctions()
    }
  }

  useEffect(() => {
    getRelatedAuctions()
  },[assetId])

  const elementRef = useRef(null)
  const [isInViewport, setIsInViewport] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const tabOne = [
    { cardTitle: 'Details', cardContent: details?.details }, 
    { cardTitle: 'Lot Essay', cardContent: details?.lotAssay },
    { cardTitle: 'Condition report', cardContent: details?.conditionalReportUrl },
    { cardTitle: 'Biography', cardContent: details?.biography }
  ]
  

  useEffect(() => {
    function handleScroll() {
      const element = elementRef.current
      if (!element) {
        return
      }
      const bounding = element.getBoundingClientRect()
      const height = bounding.height
      if (bounding.y <= -height + 940) {
        setActiveTab(1)
      } else {
        setActiveTab(0)
      }
      const inViewport = bounding.y <= 113 && bounding.y >= -height + 113 ? true : false
      setIsInViewport(inViewport)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ProductDetailsWrapper>
      <Container isPadding="0">
        <DetailsTabContainer>
          {screenSize > 768 && (
            <DetailsTabs isViewPort={isInViewport}>
              {tabsDetails.map((tab, key) => (
                <Tab key={key}>
                  <h2
                    onClick={() => {
                      router.push(`${tab.path}`)
                      setActiveTab(key)
                    }}
                    className={activeTab == key ? 'h2-active' : 'h2'}
                  >
                    {tab.name}
                  </h2>
                </Tab>
              ))}
            </DetailsTabs>
          )}
          <DetailsContent id={'details'} ref={elementRef} isViewPort={isInViewport}>
            {tabOne.map((cardInfo, key) => (
              <Accordion key={key} {...cardInfo}></Accordion>
            ))}
            <div className='condition-report'>
              <a href={`/files/fg-auction-condition-report-important-notices.pdf`} target="_blank">
                FUTUREGRAIL AUCTION - A - Condition report and Important notices.
              </a>
            </div>
            <RelatedCollections isHeading={isHeading} onBack={onBack} onGetDetails={onGetDetails} list={nftList} refresh={refreshPage} />
          </DetailsContent>
        </DetailsTabContainer>
      </Container>
    </ProductDetailsWrapper>
  )
}

const AccordionWrapper = styled.div<IstyleProps>`
  width: 100%;
  max-width: 73rem;
  .accordion-tab {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${(props) => (props.isExpanded ? 'none' : '1px solid #d1e0e2')};
    padding: 2rem 0;
    cursor: pointer;
    .accordion-title {
      font-style: normal;
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 160%;
      letter-spacing: -0.011em;
      text-transform: capitalize;
      color: #0e1818;
    }
  }
  .accordion-content {
    white-space: break-spaces;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0 1rem;
    border-bottom: ${(props) => (!props.isExpanded ? 'none' : '1px solid #d1e0e2')};
    padding: 0 0 3.2rem 0;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 1.8rem;
      line-height: 142.5%;
      letter-spacing: -0.015em;
      color: #4e4e4e;
    }
  }
  @media screen and (max-width: 470px) {
    .accordion-tab {
      .accordion-title {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .accordion-content {
      p {
        font-weight: 400;
        font-size: 16px;
        word-break: break-all;
      }
    }
  }
`
function Accordion({ cardTitle, cardContent }) {
  const [expandCard, setExpandCard] = useState(cardTitle === 'Details')
  return (
    <AccordionWrapper isExpanded={expandCard}>
      <div className="accordion-tab" onClick={() => setExpandCard(!expandCard)}>
        <h2 className="accordion-title">{cardTitle}</h2> <Image src={expandCard ? '/images/customer/PD/m.png' : '/images/customer/PD/p.png'} alt={'ICO'} width={10} height={expandCard ? 5 : 10} />
      </div>
      {expandCard && (
        <div className="accordion-content">
          <p>{cardContent 
            ? cardTitle === 'Condition report123' ? <a href={cardContent} target="_blank">{cardContent}</a> : cardContent
            : 'No data.'}
          </p>
        </div>
      )}
    </AccordionWrapper>
  )
}

const RelatedWrapper = styled.div`
  position: relative;
  max-width: 105rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  padding: 15rem 0 0 0;
  .related-cards {
    .product-img {
      margin: 10px 0 20px;
    }
    h6, p {
      margin-bottom: 10px;
    }
  }
  h1 {
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 6rem;
    line-height: 104%;
    text-align: center;
    text-transform: uppercase;
    color: #1d1d1d;
  }
  button {
    background: #2a7575;
  }
  @media screen and (max-width: 1360px) {
    max-width: 85rem;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
    padding: 40px 0 40px 0px;
    h1 {
      margin: 0rem;
      text-align: center;
      font-size: 3rem;
      padding: 0 0 0 24px;
    }
  }
  @media screen and (max-width: 470px) {
    h1 {
      text-align: center;
      padding: 0;
    }
  }
`
const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 60px 0 80px 0;
  gap: 53px;
  overflow-x: auto;
  overflow-y: hidden;
  @media screen and (max-width: 1558px) {
    justify-content: flex-start;
    padding: 0 4rem;
  }

  ::-webkit-scrollbar {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    display: none; /* Safari and Chrome */
  }
  @media screen and (max-width: 768px) {
    gap: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    padding: 0;
  }
`
const DFlexCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const ButtonPrimary = styled.button`
  display: block;
  height: 54px;
  width: 187px;
  background: #2A7575;
  border: 1px solid #2A7575;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    height: 52px;
    width: 343px;
    font-style: normal;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }
`
function RelatedCollections({ list, refresh, isHeading, onBack, onGetDetails }) {
  const updateFav = useCallback(
    async (assetId) => {
      const response = await API.createOrRemovefavorite({ assetId })
      if (response?.status === 200) {
        Toast.success(response?.data?.data?.isFavorite ? 'Added to favorite' : 'Removed from favorite')
        refresh()
      } else {
        Toast.error(response.error.error.message || 'Something went wrong try again later')
      }
    },
    [refresh]
  )

  return (
    <RelatedWrapper id={'related'}>
      <h1>{isHeading || 'You May Also Like'}</h1>
      <FlexBox>
        {list.length > 0 && list.slice(0, 3).map((product, i) => {
          let details = objectDeepClone(product?.assetEdition?.assetsData)
          return (
            <NftCard className={`related-cards`} key={product.id} id={details.id} 
              image={handleApiImage(details?.mainAssetUrl)} 
              routerPush={`/auctions/${product.id}`}
              name={details?.name} refNo={details?.refNo} refName={details?.refName} 
              isFav={details?.isFavorite} updateFav={updateFav} />
          )
        })}
      </FlexBox>
      <DFlexCenter>
        <ButtonPrimary onClick={onBack}>View All</ButtonPrimary>
      </DFlexCenter>
    </RelatedWrapper>
  )
}

export default AuctionDetailsPage
