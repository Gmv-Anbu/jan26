import { useRouter } from 'next/router'
import { useEffect, useState, memo, useCallback, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import API from '../../api/customer/index'
import Loader from '@apps/customer/modules/shared/components/Loader'
import useMuseum from '@apps/customer/modules/customer/museum/useMuseum'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { formatToUSD, handleApiImage } from '@apps/customer/utils/helper'
import { toast } from 'react-toastify'
import ImageZOom from '../ImageZoom'
import NftCard from '../NftCard'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import { ModalService } from '@nft-marketplace/modal'
import ArchiveModal from '../FormModal/archiveModal'
import { ButtonPrimary, ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import Toast from '../Toast-Popup/toast-popup'
import TYPES from '@apps/customer/redux/types/types'
import { addItemToRedux, updateDeviceType } from '@apps/customer/redux/reducer/appSlice'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@apps/customer/redux/store'
import { setCookie } from '@nft-marketplace/js-cookie'

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
  .fav-box-mr {
    display: none;
  }
  @media screen and (max-width: 1360px) {
    .fav-box-mr {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin: 0 0 2rem 0;
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
  }
  @media screen and (max-width: 798px) {
    .fav-box-mr {
      margin: 0 0 0.8rem 0;
      span {
        width: 48px;
        height: 48px;
        svg {
          position: absolute;
          top: 17px;
          left: 17px;
          width: 15px;
          height: 15px;
        }
      }
    }
  }
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
  justify-content: space-between;
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
    background-color: #fff;
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
const ArchiveDBox = styled.div`
  color: #111727;
  width: 100%;
  h4 {
    font-size: 29px;
    font-weight: 500;
    line-height: 41px;
  }
  .title-and-fav {
    width: 56.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ref {
    font-size: 24px;
    font-weight: 400;
    line-height: 34px;
    color: #898989;
  }
  h2 {
    font-size: 38px;
    font-weight: 600;
    line-height: 46px;
    margin-bottom: 40px;
  }
  h3 {
    font-size: 34px;
    font-weight: 700;
    line-height: 48px;
    color: #121212;
    margin-bottom: 40px;
    span {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      color: #848A8B;
    }
  }
  button {
    margin: 0;
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
const BuyMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  .price-box {
    color: #0E1818;
    label {
      font-size: 18px;
      font-weight: 600;
      line-height: 22px;      
    }
    h4 {
      font-size: 32px;
      font-weight: 500;
      line-height: 33px;
      margin-bottom: 30px;
    }
  }
  .btn-wrapper {
    display: grid;
    grid-gap: 14px;
    button {
      display: block;
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

const DetailsPage = ({ itemID, isPath, backBtnName, headerName, relatedProductsHeading }: DetailsProps) => {
  const router = useRouter()
  const { width } = useWindowSize()

  const [isLoading, setIsLoading] = useState(true)
  const [collectionDetails, setCollectionDetails] = useState<any>({
    refName: '',
    refNo: '',
    name: '',
    price: '$',
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
  const [archiveModal, setArchiveModal] = useState(false)
  const [buyData, setBuyData] = useState(null)
  const dispatch = useDispatch<AppDispatch>()
  const [cardVerified, setCardVerified] = useState(false)
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)

  const showArchiveModal = () =>
  ModalService.open((modalProps: any) =>
    <ArchiveModal price={formatToUSD(collectionDetails?.price)} assetId={collectionDetails?.id} close={modalProps.close} />
  )
  const hideArchiveModal = () => setArchiveModal(false)

  const addItemToCart = () => {
    API.addToCart(itemID)
    .then(res => {
        // console.log('addItemToCart res', res)
        if(res?.status === 200) {
          Toast.success(res?.data?.message || 'Item added!')
          getDetailsById()
        } else {
          Toast.info(res?.error?.error?.message || 'Something went wrong!')
        }
    })
    .catch(err => {
        console.log('addItemToCart err', err)
        Toast.error(err?.error?.message || 'Something went wrong!')
    })
  }

  const buyAssetNow = () => {
    console.log('collectionDetails', buyData)
    setCookie('buyItems', JSON.stringify(buyData))
    router.push('/base/buy/payment')
    dispatch(addItemToRedux(buyData))
  }

  const getDetailsById = async (Id = itemID) => {
    await API.getAssetById(Id)
    .then(res => {
      if (res.status == 200) {
        console.log('collectionDetails res', res)
        const { id, name, refName, inCart, refNo, shortDescription, primarySalePrice, mainAssetUrl, description, currencyData, assetMediaFileData, isFavorite } = res.data.data
        let Imgarr = []
        if(assetMediaFileData?.length) {
          assetMediaFileData.forEach(el => {
            Imgarr.push({ el, filePath: handleApiImage(el?.filePath)})
          })
        }
        const slicedSubImgs = Imgarr.length > 0 ? Imgarr : []
        if(Imgarr.length) setImagesArr(Imgarr.slice(0, numberOfCards))
        setBuyData([
          {
            id: id,
            name: name,
            refNo: refNo,
            refName: refName,
            price: primarySalePrice,
            mainImg: mainAssetUrl,
            isFavorite
          }
        ])
        setCollectionDetails({
          id: id,
          name: name,
          refNo: refNo,
          refName: refName,
          price: primarySalePrice,
          details: shortDescription,
          movement: description,
          dial: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex et, placeat nobis animi dignissimos asperiores pariatur magni`,
          images: slicedSubImgs,
          isFavorite,
          inCart,
        })
        setIsFvrt(isFavorite)
        const isMainImg = mainAssetUrl.includes('https')
        setMainImg(isMainImg ? slicedSubImgs[0]?.filePath : mainAssetUrl)
        // setIsLoading(false)
      } else {
        toast.error(res?.error?.error?.message || 'Something went wrong. Please try again later', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          style: {
            fontSize: '1.6rem',
          },
        })
        setTimeout(() => {
          router.push(`/base${isPath}`)
        }, 3000)
      }
    })
  }

  // add or remove fav
  const updateFav = useCallback(async (assetId) => {
    const response = await API.createOrRemovefavorite({ assetId })
    if (response?.status === 200) {
      getDetailsById(assetId)
    } else {
      toast.error(response.error.error.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
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
    router.push(`/base${isPath}`)
    return
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
    getDetailsById()
    if(profileData?.id) getRapydStatus()
  }, [router.query.itemId])

  // console.log('collectionDetails', collectionDetails, imagesArr)

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
            <div className="fav-box-mr">
              <span
                onClick={() => {
                  setIsFvrt(!isFvrt)
                  updateFav(collectionDetails?.id)
                }}
              >
                <Icon name="heart-green" fill={isFvrt ? '#2A7575' : 'none'} />
              </span>
            </div>
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
                  {mainImg ? <Image onLoadingComplete={() => setTimeout(() => {setIsLoading(false)}, 100) } src={mainImg ? handleApiImage(mainImg) : ''} layout="fill" alt={'ICO'} objectFit="contain" /> : null}
                </div>
              </ImagesBox>
              
              {isPath === '/archive' || isPath.includes('/museum')
              ? <ArchiveDBox>
                <div className="title-and-fav">
                  <h4>{collectionDetails?.name}</h4>
                    <div className="fav-box">
                      <span
                        onClick={() => {
                          setIsFvrt(!isFvrt)
                          updateFav(collectionDetails?.id)
                        }}
                      >
                        <Icon name="heart-green" fill={isFvrt ? '#2A7575' : 'none'} />
                      </span>
                    </div>
                  </div>
                
                <p className='ref'>{collectionDetails?.refNo}</p>
                <h2>{collectionDetails.refName}</h2>
                <h3>{formatToUSD(collectionDetails?.price)} 
                  {/* <span>(ETH 0.035)</span> */}
                </h3>
                <ButtonPrimary onClick={()=> showArchiveModal()}>Make an offer</ButtonPrimary>
              </ArchiveDBox>
              : <DetailsBox>
                <div className="title-box">
                  <div className="title-and-fav">
                    {' '}
                    <p>{collectionDetails?.name}</p>
                    <div className="fav-box">
                      <span
                        onClick={() => {
                          setIsFvrt(!isFvrt)
                          updateFav(collectionDetails?.id)
                        }}
                      >
                        <Icon name="heart-green" fill={isFvrt ? '#2A7575' : 'none'} />
                      </span>
                    </div>
                  </div>
                    {collectionDetails?.refNo 
                    ? <strong>{collectionDetails?.refNo}</strong> 
                    : null}
                  <h3>{collectionDetails.refName}</h3>
                </div>
                <div className="gray-line"></div>
                {/* <h4>{'--------' || 'collectionDetails.price'}</h4> */}
                {isPath === '/buy' 
                ? <BuyMainContent>
                  <div className='price-box'>
                    <label>Price</label>
                    <h4>{formatToUSD(collectionDetails?.price)}</h4>
                  </div>
                  <div className='btn-wrapper'>
                    {cardVerified 
                      ? <>
                        <ButtonPrimary onClick={() => buyAssetNow()}>Buy Now</ButtonPrimary>
                        {collectionDetails?.inCart 
                        ? <ButtonPrimaryOutline>Item is in Cart</ButtonPrimaryOutline>
                        : <ButtonPrimaryOutline onClick={() => addItemToCart()}>Add to cart</ButtonPrimaryOutline>}
                      </> 
                      : <ButtonPrimary onClick={() =>  router.push(`/base/myProfile`)}>Verify Card</ButtonPrimary>}
                  </div>
                </BuyMainContent>
                : null}
              </DetailsBox>}
            </DetailsWrapper>
          </ProductWrapper>
        </Container>
        <ProductDetailsContainer isHeading={relatedProductsHeading} onBack={backBtnHandler} onGetDetails={getDetailsById} details={collectionDetails.movement} screenSize={width}></ProductDetailsContainer>
      </MainContainer>
      {isImageZoom && <ImageZOom image={mainImg} onClose={() => setIsImageZoom(false)} title={collectionDetails?.name || ''} currentImg={activeImg} totalImgs={collectionDetails.images} />}
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
  {
    name: 'More From',
    path: '#related',
  },
]
function ProductDetailsContainer({ details, isHeading, onBack, onGetDetails, screenSize }) {
  const router = useRouter()
  const { nftList, refreshPage } = useMuseum({ currentPage: 1 })

  const elementRef = useRef(null)
  const [isInViewport, setIsInViewport] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const tabOne = [{ cardTitle: 'Details', cardContent: details }]

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
      }
    }
  }
`
function Accordion({ cardTitle, cardContent }) {
  const [expandCard, setExpandCard] = useState(true)
  return (
    <AccordionWrapper isExpanded={expandCard}>
      <div className="accordion-tab" onClick={() => setExpandCard(!expandCard)}>
        <h2 className="accordion-title">{cardTitle}</h2> <Image src={expandCard ? '/images/customer/PD/m.png' : '/images/customer/PD/p.png'} alt={'ICO'} width={10} height={expandCard ? 5 : 10} />
      </div>
      {expandCard && (
        <div className="accordion-content">
          <p>{cardContent}</p>
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
  h1 {
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 6rem;
    line-height: 104%;
    text-align: start;
    text-transform: uppercase;
    color: #1d1d1d;
    margin: 0 0 0 10rem;
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
function RelatedCollections({ list, refresh, isHeading, onBack, onGetDetails }) {
  const updateFav = useCallback(
    async (assetId) => {
      const response = await API.createOrRemovefavorite({ assetId })
      if (response?.status === 200) {
        refresh()
      } else {
        toast.error(response.error.error.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            fontSize: '1.6rem',
          },
        })
      }
    },
    [refresh]
  )

  return (
    <RelatedWrapper id={'related'}>
      <h1>{isHeading || 'You May Also Like'}</h1>
      <FlexBox>
        {list.length > 0 && list.slice(0, 3).map((product, i) => <NftCard key={product.id} id={product.id} image={product.image} name={product.name} refNo={product.refNo} refName={product.refName} isFav={product.isFav} updateFav={updateFav} />)}
      </FlexBox>
      <DFlexCenter>
        <ButtonPrimary onClick={onBack}>View All</ButtonPrimary>
      </DFlexCenter>
    </RelatedWrapper>
  )
}

export default memo(DetailsPage)
