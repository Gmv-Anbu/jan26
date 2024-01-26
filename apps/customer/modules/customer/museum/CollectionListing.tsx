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

const ListWrapper = styled.section`
  position: relative;
  padding: 6rem 0 8rem;
  display: flex;
  flex-wrap: wrap;
  .no-data {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 36px;
  }
  @media screen and (max-width: 980px) {
    justify-content: center;
    gap: 20px;
  }
  @media screen and (max-width: 549px) {
    padding: 0.1rem 0 4rem;
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

const CollectionListing = ({ nftList, totalPage, currentPage, updatePage, refreshPage, loading }) => {
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
        <ListWrapper>
          {nftList?.length > 0 
          ? nftList.map(each => {
            return <NftCard key={each.id} {...each} updateFav={updateFav} />
          })
          : <NotFound padding="0" mrPadding="0" />}
        </ListWrapper>
        {nftList?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
      </>}
    </>
  )
}

export default CollectionListing
