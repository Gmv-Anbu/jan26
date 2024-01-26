import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '@apps/customer/styles/CommonStyles'
import Pagination from '@apps/customer/components/pagination/pagination'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader'

import NotFound from '@apps/customer/components/NotFound'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import useMuseum from '@apps/customer/modules/customer/museum/useMuseum'
import CollectionListing from '@apps/customer/modules/customer/museum/CollectionListing'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'

import API from "@apps/customer/api/customer";
import { toast } from 'react-toastify'
import SellListing from '@apps/customer/modules/buy/sellListing'
import BuyFilter from '@apps/customer/components/filterModal/buyFilter'

const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 9px;
  max-height: 44px;
  max-width: 44px;
  border: 1.5px solid #D1E0E2;
  margin-left: 24px;
  p {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
  }
  @media screen and (max-width: 549px) {
    margin-left: 10px;
  }
`
const MyNftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12rem 0;
  @media screen and (max-width: 768px) {
    padding: 7.5rem 0 15.4rem;
  }
`
const HeadSection = styled.section`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  margin: 79px 0 56px;
  h1 {
    color: #111727;
    font-size: 60px;
    font-weight: 400;
    line-height: 62px;
    text-transform: uppercase;
  }
  @media screen and (max-width: 768px) {
    margin: 30px 0 33px;
    h1 {
      font-size: 24px;
      line-height: normal;
    }
  }
`
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  .react-select__control {
    width: 214px;
    height: 44px;
    border-radius: 0;
    .react-select__placeholder, .react-select__single-value {
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      color: #5C5C5C;
    }
  }
  .react-select__menu {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .react-select__menu-list {
      margin: 0;
      padding: 10px;
      overflow: hidden;
  }
  .react-select__option {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.25px;     
    color: #21393A;    
  }
  .react-select__option--is-selected {
      color: #2A7575;
      background: #F4F9F9;
      font-weight: 700;
  }
  .react-select__option--is-focused {
    background: #F4F9F9;
  }
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 16rem;
    z-index: 10;
    right: 0;
  }
`
const ListBox = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
`
const GridContianer = styled.div`
  padding: 0px 0 80px 0;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 6rem 4.5rem;
  /* place-content: center; */
  @media screen and (max-width: 1368px) {
    grid-template-columns: auto auto auto;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: 20px;
  }
  @media screen and (max-width: 594px) {
    grid-template-columns: auto;
  }
`
const Line = styled.div`
  display: block;
  width: 100%;
  height: 2px;
  background: #d5d5d5;
  background: radial-gradient(circle, rgba(100, 114, 112, 0.272) 0%, rgba(200, 199, 193, 0) 100%);
  margin-bottom: 4px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const TabSelector = styled.section`
  article {
    gap: 40px;
    margin-bottom: 30px;
  }
  input {
    /* visibility: hidden; */
    display: none;
  }
  label {
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    padding: 0 0px 16px 0px !important;
    transition: border-bottom 0.2s;
    white-space: nowrap;
    color: #898989;
  }
  [type='radio']:checked + label  {
    font-weight: 600;
    color: #2a7575;
    border-bottom: 4px solid #2a7575;
  }
  @media screen and (max-width: 500px) {
    article {
      padding-bottom: 7px;
    }
    label {
      padding: 0 0px 10px 0px !important
    }
  }
`
const TicTacSelector = styled.section`
  margin-bottom: 60px;
  overflow: auto;
  article {
    height: auto;
    gap: 0;
    overflow: auto;
  }
  input {
    /* visibility: hidden; */
    display: none;
  }
  label {
    font-size: 16px;
    font-weight: 400;
    line-height: 17px;
    color: #0E1818;
    padding: 18px 26px;
    white-space: nowrap;
    background-color: linear-gradient(0deg, #F4F9F9, #F4F9F9), linear-gradient(0deg, #D1E0E2, #D1E0E2);
    border-radius: 60px;
    border: 1.5px solid #D1E0E2;
    margin-right: 16px;
    display: block;
  }
  [type='checkbox']:checked + label   {    
    font-weight: 600;
  }
  @media screen and (max-width: 500px) {
    margin-top: 90px;
    label {
      padding: 12px 20px;
    }
  }
`
const TabSection = styled.section`
  margin: 5rem 0 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: #898989;
    cursor: pointer;
  }
  input {
    /* visibility: hidden; */
    display: none;
  }
  .section-wrapper {
    display: flex;
    gap: 4rem;
    label {
      padding: 1rem 1.5rem;
      border-radius: 59px;
      border: 1px solid #2a7575;
      color: ${({ theme }) => theme.colors.primary};
      background-color: #f4f9f9;
    }
    [type='radio']:checked + label {
      background-color: #2a7575;
      color: white;
    }
  }
  @media screen and (max-width: 549px) {
    gap: 0;
    margin: 34px 0 0 0;
    .tic-tac-container {
      margin-top: 80px;
    }
  }
`

const BuyPage = () => {

    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const { loading, nftList, TabRender, TabSectionRender, filter, totalPage, applyFilter, renderSort, refreshPage } = useMuseum({ currentPage, setCurrentPage, pageType : 'buy' })
    const [brands, setBrands] = useState([])
    const [currentBrand, setCurrentBrand] = useState('')
    let filterOG = {
      brand: '',
      minPrice: '',
      maxPrice: '',
      from: '',
      to: ''
    }
    const [filterData, setFilterData] = useState(filterOG)
    const [displayFilter, setDisplayFilter] = useState(false);
    const openFilter = () => setDisplayFilter(true)
    const closeFilter = () => setDisplayFilter(false) 

    const auctionCards = [
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-3.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-2.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-4.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-1.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-3.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-2.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-4.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-1.png'  },
    ]

    const getAllBrandData = async () => {
      const response = await API.getBrands()
      if (response.status === 200) {
        setBrands(response?.data?.data.map(el => { return { value: el, label: el } }))
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

    const updateFilter = () => {
      applyFilter('apply', filterData)
      closeFilter()
    }

    const updatePage = useCallback((page) => {
        setCurrentPage(page)
        window?.scrollTo(0, 0);
    }, [])

    useEffect(() => {
      closeFilter()
    }, [nftList])

    useEffect(() => {
      getAllBrandData()
    }, [])

    return (
        <MyNftWrapper>
            {displayFilter ? <BuyFilter show={displayFilter} applyFilter={updateFilter} filterData={filterData} setFilterData={setFilterData} brands={brands} closeFilter={closeFilter} /> : null}
            <Container>
                <HeadSection>
                    <h1>Buy</h1>
                    <FilterContainer>
                      {renderSort}
                      <FilterWrapper onClick={openFilter}>
                        <Icon name="filter" />
                      </FilterWrapper>
                    </FilterContainer>
                </HeadSection>
                <ListBox>
                {/* <TabSection>
                  <>
                    {TabRender && TabRender(filter.category)}
                    <div className='tic-tac-container'>
                      {TabSectionRender && TabSectionRender(filter.subCategory)}
                    </div>
                  </>
                </TabSection> */}
                <TabSelector>
                    {TabRender && TabRender(filter.category)}
                </TabSelector>
                <TicTacSelector>
                  {TabSectionRender && TabSectionRender(filter.subCategory)}
                </TicTacSelector>
                {/* <CollectionListing loading={loading} nftList={nftList} totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} refreshPage={refreshPage} /> */}
                <SellListing loading={loading} nftList={nftList} totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} refreshPage={refreshPage} />
                {/* {auctionCards?.length ? (
                   <ListItemsComp items={auctionCards} showArchiveModal={showArchiveModal} totalPage={5} currentPage={1} updatePage={updatePage} refreshPage={refreshPage} />
                ) : (
                    <NotFound padding="200px 0 156px" mrPadding="60px 0 0 0" />
                )} */}
                </ListBox>
            </Container>
        </MyNftWrapper>
    )
}

const CardWrapper = styled.div`
  flex: 0 0 100%;
  box-sizing: border-box;
  max-width: 320px;
  min-width: 320px;
  // max-height: 504px;
  // min-height: 504px;
  background: #ffffff;
  border: 1.09015px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px;
  gap: 25px;
  cursor: pointer;
  position: relative;
  .fav-icon {
    position: absolute;
    height: 0px;
    right: 30px;
  }
  .image-box {
    position: relative;
    width: 100%;
    max-width: 181px;
    max-height: 220px;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto 0;
    overflow: hidden;
    transition: all 0.7s ease-in-out;
  }
  &:hover {
    .image-box {
      transform: scale(1.1);
    }
  }
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    p {
      color: #121212;
      font-size: 16px;
      font-weight: 400;
      line-height: 180%;
    }
    strong {
      color: #898989;
      font-size: 15px;
      font-weight: 600;
      line-height: 180%;
    }
    h3 {
      color: #121212;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 180%;
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
    justify-content: space-between;
    h5 {
      color: #121212;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
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
        border-radius: 10px;
        margin-left: 10px;
        box-shadow: 0px 2px 6px 0px #0000000F;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 342px;
    min-width: 342px;
    .details {
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
      }
      strong {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
      }
      h3 {
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;
      }
    }
    .btn-box {
      h5 {
        font-size: 18px;
        font-weight: 700;
        line-height: 25px;
      }
    }
  }
`
const CardButton = styled.button`
    position: relative;
    z-index: 5;
    display: block;
    padding: 6px 14px;
    border: 1.09px solid #E0E0E0;
    background: #FFF;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #2A7575;
`

function ListItemsComp({ items, showArchiveModal, totalPage, currentPage, updatePage, refreshPage }) {

  const router = useRouter()
  const token = useSelector<RootState, any>((state) => state?.auth?.accessToken)

  const updateFav = useCallback(
    async (assetId) => {
      if (!token) {
        router.replace('/base/signin')
        return
      }
      const response = await API.createOrRemovefavorite({ assetId })
      if (response?.status === 200) {
        refreshPage()
      } else {
        toast.error(response?.error?.error?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            fontSize: '1.6rem',
          },
        })
      }
    },
    [refreshPage]
  )

  return (
    <>
      <GridContianer>
        {items.map((product, i) => {
          return <Card key={i} data={product} showArchiveModal={showArchiveModal} />
        })}
      </GridContianer>
      <Line></Line>
      {items?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
    </>
  )
}

function Card({ data, showArchiveModal }) {

  const router = useRouter()
  const [fav, setFav] = useState(data?.isFav)
  let user = { accessToken : ''}
  return (
    <CardWrapper>
      <span
        className={`fav-icon ${user?.accessToken ? 'cursor-pointer' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          if(user?.accessToken) {
            // setFav(!isFav)
            // updateFav(id)
          } 
        }}
      >
        <Icon name="heart-dark" fill={fav ? 'red' : 'none'} />
      </span>
      <div className="image-box" onClick={() => router.push(`/base/archive/355`)}>
        <Image src={data.image} alt="Product" width={250} height={303} objectFit="contain"/>
      </div>
      <div className="details">
        <p>{data.refName}</p>
        <strong>{data.refNo}</strong>
        <h3 onClick={() => router.push(`/base/archive/355`)}>{data.name}</h3>
      </div>
      {/* <div className="line"></div> */}
      <hr></hr>
      <div className="btn-box">
        <h5>$ {data.price}</h5>
        <CardButton onClick={() => showArchiveModal()}>Buy Now</CardButton>
      </div>
    </CardWrapper>
  )
}
export default BuyPage
