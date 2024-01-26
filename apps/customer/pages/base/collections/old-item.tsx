import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Detail from '../../../modules/customer/base/collections/detail'
import { useEffect, useState } from 'react'

import API from '../../../api/customer/index'
import Meta from '../../../modules/shared/components/meta'
import { RootState } from '@apps/customer/redux/store'
import { useSelector } from 'react-redux'
import Loader from '@apps/customer/modules/shared/components/Loader'
import styled from 'styled-components'

const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DetailPage: NextPage = () => {
  const router = useRouter()
  const { itemId } = router.query
  const [isLoading, setIsLoading] = useState(false)
  const [collectionId, setCollectionId] = useState<any>(null)
  const [collectionDetails, setCollectionDetails] = useState<any>(null)
  const [collectionAssets, setCollectionAssets] = useState<any>(null)
  const [assetLoading, setAssetLoading] = useState<boolean>(true)
  const isAuthenticated = useSelector<RootState, any>((state) => state?.auth?.accessToken)
  const meta = {
    title: 'NFT2.0 | NFT Collection Details',
    description: 'NFT Market place 2.0 | NFT Collection Details',
  }

  const getDetailsById = () => {
    API.getCollectionById(Number(itemId))
      .then((res) => {
        if (res?.data?.data) {
          setCollectionDetails(res?.data?.data)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const getCollectionAssets = () => {
    const query = '?page=1&items=10'
    API.getCollectionAssetsById(Number(itemId), query)
      .then((res) => {
        if (res?.data?.data) {
          setCollectionAssets(res?.data?.data)
        }
        setAssetLoading(false)
      })
      .catch((err) => {
        setAssetLoading(false)
      })
  }

  const goToCategoryList = () => {
    router.push('/base/collections')
  }

  useEffect(() => {
    if (collectionId) {
      getDetailsById()
      getCollectionAssets()
    }
  }, [collectionId])

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setIsLoading(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isLoading) {
      getDetailsById()
      getCollectionAssets()
    }
  }, [isLoading])

  useEffect(() => {
    if (router?.query?.itemId && Number(router?.query?.itemId)) {
      const id = Number(router?.query?.itemId)
      setCollectionId(id)
    } else {
      goToCategoryList()
    }
  }, [router])

  return (
    <>
      <Meta />
      {assetLoading ? (
        <FullPageLoader>
          <Loader width="100" height="60" />
        </FullPageLoader>
      ) : (
        <Detail collectionDetails={collectionDetails} collectionAssets={collectionAssets} getAssets={getCollectionAssets} id={Number(itemId)} />
      )}
    </>
  )
}

export default DetailPage
