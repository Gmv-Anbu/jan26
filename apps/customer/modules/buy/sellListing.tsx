import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import NftCard from '@apps/customer/components/NftCard'
import Pagination from '@apps/customer/components/pagination/pagination'
import API from '@apps/customer/api/customer'
import { toast } from 'react-toastify'
import NotFound from '@apps/customer/components/NotFound'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader'
import Icon from '../shared/components/icon/icon'
import Image from 'next/image'
import { formatToUSD } from '@apps/customer/utils/helper'

const ListWrapper = styled.section`
    padding: 0px 0 80px 0;
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 6rem 4.5rem;
    justify-content: flex-start;
    &.no-product {
      justify-content: center;
      grid-template-columns: auto;
      .img-box {
        margin: 0 0 50px 0;
      }
    }
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

const LoaderContainer = styled.div`
  width: 100%;
  padding: 6rem 0 8rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    font-size: 2rem;
    margin-right: 10px;
  }
`

const SellListing = ({ nftList, totalPage, currentPage, updatePage, refreshPage, loading }) => {
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
      {loading 
      ? <LoaderContainer>
          <div>
            <p>Loading data...</p> <Loader height="50" width="50" />
          </div>
        </LoaderContainer>
      : <>
        <ListWrapper className={`${nftList?.length === 0 ? 'no-product' : ''}`}>
          {nftList?.length > 0 
          ? nftList.map(each => {
            return <Card key={each.id} data={each} updateFav={updateFav} />
          })
          : <NotFound padding="0" mrPadding="0" />}
        </ListWrapper>
        {nftList?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
      </>}
    </>
  )
}

export default SellListing

function Card({ data, updateFav }) {

    const router = useRouter()
    const [fav, setFav] = useState(data?.isFav)
    let user = JSON.parse(localStorage.getItem('user'))

    return (
      <CardWrapper>
        <span
          className={`fav-icon ${user?.accessToken ? 'cursor-pointer' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            if(user?.accessToken) {
              setFav(!data?.isFav)
              updateFav(data?.id)
            } 
          }}
        >
          <Icon name="heart-dark" fill={fav ? 'red' : 'none'} />
        </span>
        <div className="image-box" 
          onClick={() => user?.accessToken ? router.push(`/base/buy/${data?.id}`) : router.push('/base/signin')}>
          {/* onClick={() => router.push(`/base/buy/${data?.id}`)}> */}
          <Image src={data.image} alt="Product" width={250} height={303} objectFit="contain"/>
        </div>
        <div className="details">
          <p>{data.refName}</p>
          <strong>{data.refNo}</strong>
          <h3 onClick={() => router.push(`/base/buy/${data?.id}`)}>{data.name}</h3>
        </div>
        <hr></hr>
        <div className="btn-box">
          <h5>{formatToUSD(data.price)}</h5>
          <CardButton onClick={() => user?.accessToken ? router.push(`/base/buy/${data?.id}`) : router.push('/base/signin')}>Buy Now</CardButton>
        </div>
      </CardWrapper>
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
    p, strong, h3 {
      width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      text-align: center;
      line-height: normal;
    }
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
      width: 65%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
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
        font-size: 24px;
        font-weight: 700;
        line-height: 34px;
      }
    }
  }
`
const CardButton = styled.button`
  position: relative;
  z-index: 5;
  display: block;
  padding: 6px 14px;
  border: 1.5px solid #2A7575;
  background: #FFF;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: #2A7575;
`
