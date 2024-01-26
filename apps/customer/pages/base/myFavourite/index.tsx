import React, { useEffect, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import API from '../../../api/customer/index'
import Pagination from '@apps/customer/components/pagination/pagination'
// import { Container } from '@apps/customer/styles/CommonStyles'
import Image from 'next/image'
import LineSeparator from '../../../public/svgs/line.svg'
import closeMyFavourite from '../../../public/svgs/close.svg'
import ConfirmationModal from '../../../modules/customer/shared/modal/ConfirmationModalCustomer/confirmationModal'
import { toast } from 'react-toastify'
import { handleApiImage } from '@apps/customer/utils/helper'
import NotFound from '@apps/customer/components/NotFound'

export const Container = styled.div`
  width: 100%;
  max-width: 150rem;
  margin: 0 auto;
  @media screen and (max-width: 1360px) {
    max-width: 124rem;
  }
  @media screen and (max-width: 1199px) {
    max-width: 120rem;
  }
  @media screen and (max-width: 991px) {
    max-width: 102rem;
  }
  @media screen and (max-width: 767px) {
    padding: 0 1rem;
    max-width: 78rem;
  }
  @media screen and (max-width: 575px) {
    padding: 0 2rem;
    max-width: 60rem;
  }
`
const Wrapper = styled.div`
  width: 100%;
  padding: 10rem 0rem;
  background: url(/images/customer/home/favourite.png);

  background-size: 100% 100rem;
  background-repeat: no-repeat;
`
const Head = styled.div`
  display: flex;
  algin-items: center;
  justify-content: center;
  span {
    height: 6.2rem;
    display: flex;
    align-items: center;
    padding-top: 12rem;
    font-weight: 400;
    font-size: 6rem;
    line-height: 6.24rem;
    text-transform: uppercase;
    color: #ffffff;
    font-style: normal;

    @media (max-width: 768px) {
      padding-top: 6rem;
      height: 12rem;
      font-size: 4rem;
    }
    @media (max-width: 425px) {
      padding-top: 6rem;
      height: 8rem;
      font-size: 3rem;
    }
  }
`
const CollectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 8rem;

  @media screen and (max-width: 992px) {
    padding: 6rem 4rem;
  }
  @media screen and (max-width: 768px) {
    padding: 6rem 2rem;
  }
  @media (max-width: 425px) {
    padding: 3rem 0rem;
  }
`

const ListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .noProductClass {
    margin-top: -20rem;
    @media screen and (max-width: 768px) {
      margin-top: -10rem;
    }
    @media screen and (max-width: 425px) {
      margin-top: -5rem;
    }
  }
  @media screen and (max-width: 992px) {
    padding: 3rem;
  }
  @media screen and (max-width: 549px) {
    padding: 0.1rem 0 4rem;
  }
`

const CardWrapper = styled.div`
  position: relative;
  border: 1.5px solid #d1e0e2;
  padding: 2rem;
  width: 320px;
  min-height: 502px;
  background: #ffffff;
  margin: 0 2.3rem 4.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  .product-img {
    position: relative;
    width: 100%;
    min-width: 181px;
    max-height: 230px;
    min-height: 220px;
    overflow: hidden;
    align-self: center;
    transition: all 0.7s ease-in-out;
  }
  &:hover {
    .product-img {
      transform: scale(1.1);
    }
    .modelDisplay {
      color: ${({ theme }) => theme.colors.secondary} !important;
    }
  }

  @media screen and (max-width: 992px) {
    padding: 2.5rem;
    width: max-content;
    margin: 1rem;
    max-width: calc(50% - 2rem);
    flex-basis: calc(50% - 2rem);
  }
  @media screen and (max-width: 768px) {
    padding: 2rem;
    width: max-content;
    margin: 1rem;
    max-width: calc(50% - 2rem);
    flex-basis: calc(50% - 2rem);
  }

  @media (max-width: 425px) {
    width: 342px;
    height: 487px;
    margin: auto;
    margin-top: 2rem;
    max-width: 100%;
    flex-basis: 100%;
  }
  @media (max-width: 375px) {
    margin: auto;
    margin-top: 2rem;
    max-width: 100%;
    flex-basis: 100%;
  }

  .cancelContainer {
    display: flex;
    align-self: end;
    margin-bottom: 3.86rem;
  }
`

const ProductDetails = styled.div`
  padding: 1rem;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 54px;
  // overflow: auto;
  // max-width: 100%;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // word-break: break-all;
  ::-webkit-scrollbar {
    display: none;
  }
  p {
    max-width: 250px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    &.nameDisplay {
      /* font-family: Poppins; */
      color: #121212;
      font-size: 1.6rem;
      line-height: 2.88rem;
      font-weight: 400;
      word-break: break-all;
    }
    &.refDisplay {
      color: #898989;
      font-size: 18px;
      line-height: 2.7rem;
      font-weight: 700;
      word-break: break-all;
    }
    &.modelDisplay {
      /* font-family: Open Sans; */
      color: ${({ theme }) => theme.colors.primary};
      font-size: 18px;
      line-height: 3.24rem;
      font-weight: 700;
      /* text-transform: uppercase; */
      word-break: break-all;
    }
  }
`

const CardBottom = styled.div`
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  p {
    text-align: start;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 140%;
    color: #121212;
  }
`
const Button = styled.button`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 140.02%;
  color: #2a7575;
  padding: 0.6rem 1.4rem;
  background: #fff;
  border: 1px solid #2a7575;
`
const LoadingContainer = styled.div`
  font-weight: 400;
  font-size: 5rem;
  color: #2a7575;
`

const Myfavorite = () => {
  const router = useRouter()
  const [favoritesData, setFavoritesData] = useState([])
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [selectedAssetId, setSelectedAssetId] = useState(0)
  const [showPagination, setShowPagination] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    function handleResize() {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }
    if (window.innerWidth > 0 && window.innerHeight > 0) {
      handleResize()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const itemsPerPage = screenSize.width > 549 ? 12 : 4
  const totalItems = favoritesCount
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const handlePageChange = async (page) => {
    setCurrentPage(page)
    const response = await API.getMyFavoritesData(page, itemsPerPage)
    if (response.status === 200) {
      setFavoritesData(response?.data?.data?.favoriteList)
      setFavoritesCount(response?.data?.data?.pageMeta.totalItems)
      setLoading(false)
      window.scrollTo({ top: 0 })
    }
  }

  useEffect(() => {
    getAllFavoritesData()
    setProcessing(false)
  }, [selectedAssetId, screenSize, processing])

  const getAllFavoritesData = async () => {
    const response = await API.getMyFavoritesData(currentPage, itemsPerPage)
    if (response.status === 200) {
      setFavoritesData(response?.data?.data?.favoriteList)
      setFavoritesCount(response?.data?.data?.pageMeta.totalItems)
      response?.data?.data?.favoriteList.map((f) => {
        if (f.asset) {
          setShowPagination(true)
        }
      })
      setLoading(false)
    } else if (response.status === 400 || response.status === 401 || response.status === 500 || response.status === 412 || response.status === 404) {
      toast.error(response.error.error.message, {
        toastId: 'getAllErrorToast',
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
    }
  }
  const handleConfirm = async (assetId) => {
    const data = {
      assetId: assetId,
    }
    setSelectedAssetId(assetId)
    const response = await API.createOrRemovefavorite(data)
    if (response.status === 200) {
      setLoading(false)
      setProcessing(true)
      setModal(false)
      // router.reload()
    } else {
      setProcessing(false)
      toast.error(response.error.error.message, {
        toastId: 'confirmErrorToast',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
    }
  }
  const [modal, setModal] = useState<boolean>(false)
  return (
    <>
      <Wrapper>
        <Head>
          <span>My Favourites ({favoritesCount})</span>
        </Head>
      </Wrapper>
      <CollectionWrapper>
        <Container>
          <ListWrapper>
            {/* {loading && <LoadingContainer>Loading...</LoadingContainer>} */}
            {favoritesData.length > 0 ? (
              !loading &&
              favoritesData?.map((fav) => {
                let transformedName = fav?.asset?.name.toLowerCase()
                let transformedRefNo = fav?.asset?.refNo.toLowerCase()
                let transformedRefName = fav?.asset?.refName.toLowerCase()
                transformedName = transformedName.charAt(0).toUpperCase() + transformedName.slice(1)
                transformedRefNo = transformedRefNo.charAt(0).toUpperCase() + transformedRefNo.slice(1)
                transformedRefName = transformedRefName.charAt(0).toUpperCase() + transformedRefName.slice(1)
                return (
                  <CardWrapper key={fav.id} onClick={() => router.push(`/base/myFavourite/${fav?.assetId}`)}>
                    <div className="cancelContainer">
                      <Image
                        className="closeImg"
                        src={closeMyFavourite}
                        alt="Close-Image"
                        style={{
                          cursor: 'pointer',
                        }}
                        height={14.85}
                        width={14.85}
                        onClick={(e) => {
                          e.stopPropagation()
                          !processing && setModal(fav.id)
                        }}
                      />
                      {modal === fav?.id && (
                        <ConfirmationModal
                          message="Are you sure you want to remove this product?"
                          onConfirm={(e) => {
                            e.stopPropagation()
                            handleConfirm(fav?.assetId)
                          }}
                          onCancel={(e) => {
                            e.stopPropagation()
                            setModal(null)
                          }}
                          confirmText="Yes, remove"
                          cancelText="Cancel"
                        />
                      )}
                    </div>
                    <div className="product-img">
                      <Image src={handleApiImage(fav?.asset?.mainAssetUrl)} alt="Product-Image" layout="fill" objectFit="contain" />
                    </div>

                    <ProductDetails>
                      <p className="nameDisplay">{transformedRefName}</p>
                      <p className="refDisplay">{transformedRefNo}</p>
                      <p className="modelDisplay">{transformedName}</p>
                    </ProductDetails>
                    {/* <Image src={LineSeparator} alt="Line" /> */}
                    {/* <CardBottom>
                    <p>{fav.asset?.primarySalePrice}</p>
                    <Button onClick={() => goToDetailsPage()}>View Detais</Button>
                  </CardBottom> */}
                  </CardWrapper>
                )
              })
            ) : loading ? (
              <LoadingContainer>Loading...</LoadingContainer>
            ) : (
              <div className="noProductClass">
                <NotFound padding="200px 0 156px" mrPadding="60px 0 0 0" />
              </div>
            )}
          </ListWrapper>
        </Container>
        {favoritesData.length && totalPages > 1 ? <Pagination totalPage={totalPages} currentPage={currentPage} updatePage={handlePageChange} /> : null}
      </CollectionWrapper>
    </>
  )
}

export default Myfavorite
