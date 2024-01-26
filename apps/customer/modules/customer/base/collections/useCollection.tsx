import UserService from '@apps/customer/api/customer/UserService'
import { KEYS } from '@apps/customer/utils/storage'
import { getCookie } from '@nft-marketplace/js-cookie'
import { ModalService } from '@nft-marketplace/modal'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MarketService from '../../../../api/customer/MarketService'
import { handleApiImage, processCollectionData } from '../../../../utils/helper'
import { RootState } from '../../../../redux/store'
import ICard from '../../shared/card/card.interface'
import useAuthConnect from '../../shared/ConnectWallet/useAuthConnect'
import SuccessModal from '../../shared/modal/SuccessModal'
import useTab from '../../shared/tab/useTab'
import { injectedStore } from '@apps/customer/redux/store'
import { APP_ENV } from '@apps/customer/config'
const itemsCount = 15

//Need to set it at pr
export const collectionTabs = [
  { id: 'artist', name: 'Artists' },
  { id: 'digitalArt', name: 'Digital Art' },
  { id: 'collectors', name: 'Collectors' },
]
const useCollection = (): {
  collectionData: Array<any>
  TabRender?: (dataList: Array<any>) => ReactNode
  hasMore: boolean
  currentPage: number
  getCollectionData: any
  featuredAssestData: Array<any>
  getFeaturedAssetData: any
} => {
  const [currentPage, setCurrentPage] = useState(1)
  const [collectionData, setCollectionData] = useState<any>([])
  const [hasMore, setHasMore] = useState(true)
  const [featuredAssestData, setFeaturedAssestData] = useState<any>([])
  const { connectToWallet } = useAuthConnect()
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const isAuthenticated = useSelector<RootState, any>((state) => state?.auth?.accessToken)
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const featured = ThemeConfiguration?.sections?.home?.featured

  const { selectedTab, render: TabRender } = useTab('artist')

  const getCollectionData = async (page: number) => {
    if (hasMore) {
      MarketService.getCollectionData(page, itemsCount)
        .then((res) => {
          if (res?.data?.data) {
            const collectionList = processCollectionData(res?.data?.data?.collectionList)
            const totalItems = res?.data?.data?.pageMeta?.totalItems
            const fetchedItems = collectionData.length + collectionList.length
            setCollectionData((prevCollectionList: any) => [...prevCollectionList, ...collectionList])
            if (totalItems === fetchedItems) {
              setHasMore(false)
            }
            setCurrentPage(page)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const updateFavoriteDetail = useCallback(async ({ userId, editionId }) => {
    const token = getCookie(KEYS.CUSTOMER_TOKEN)
    if (token) {
      const res = await UserService.handlefavourite({ editionId, userId })
      if (res.status === 200) {
        getFeaturedAssetData(currentPage)
        ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.data?.data?.isFavorite ? 'Added to the favorite list' : 'Removed From Favorite list'} />)
      }
    } else {
      connectToWallet()
    }
  }, [])

  const getFeaturedAssetData = async (page: number) => {
    // if (hasMore) {

    MarketService.getFeaturedNFTList(page, featured?.noOfNFTs)
      .then((res) => {
        if (res?.data?.data) {
          const assetList = processFeaturedNFTData(res?.data?.data?.assetList, res?.data?.data?.exchangeRates)
          const totalItems = res?.data?.data?.pageMeta?.totalItems
          const fetchedItems = featuredAssestData.length + assetList.length
          setFeaturedAssestData(
            // (prevAssetList: any) => [...prevAssetList, ...assetList]
            (prev: Array<any>) => {
              const prevIds = []
              const prevDatas = prev.map((g) => {
                const assetData = assetList.find((d) => d.id === g.id)
                prevIds.push(g.id)
                if (assetData) return assetData
                else return g
              })
              const newDatas = assetList.filter((i) => !prevIds.includes(i.id))
              return [...prevDatas, ...newDatas]
            }
          )
          // if (totalItems === fetchedItems) {
          //     setHasMore(!hasMore);
          // }
          setCurrentPage(page)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const processFeaturedNFTData = (featuredNFTS, exchangeRates) => {
    const featuredNFTList = []
    featuredNFTS.forEach((asset) => {
      featuredNFTList.push({
        id: asset?.id,
        name: asset?.assetsData?.name,
        price: `${asset?.assetsData?.primarySalePrice} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
        image: handleApiImage(asset?.userAssetEdition?.profilePicUrl),
        NFT: asset?.assetsData?.mainAssetUrl,
        mediaType: asset?.assetsData?.mainAssetType,
        convertedPrice: `$ ${(parseFloat(asset?.assetsData?.primarySalePrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRates?.HBAR?.USD : exchangeRates?.ETH?.USD))?.toFixed(4)}`,
        firstName: asset?.userAssetEdition?.firstName || '',
        lastName: asset?.userAssetEdition?.lastName || '',
        userName: asset?.userAssetEdition?.userName || `${asset?.userAssetEdition?.firstName || ''} ${asset?.userAssetEdition?.lastName || ''}`,
        isVerified: asset?.userAssetEdition?.role == 'creator' || asset?.userAssetEdition?.role == 'admin',
        description: asset?.assetsData?.shortDescription,
        bidAmount: `${parseFloat(asset?.auctionsData?.[0]?.bidAmount)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
        convertedbidAmount: `$ ${(parseFloat(asset?.auctionsData?.[0]?.bidAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRates?.HBAR?.USD : exchangeRates?.ETH?.USD))?.toFixed(4)}`,
        saleType: asset?.saleType,
        endTime: asset?.auctionsData?.[0]?.endTime,
        startTime: asset?.auctionsData?.[0]?.startTime,
        status: asset?.auctionsData?.[0]?.status,
        bidderData: asset?.auctionsData?.[0]?.bidderData,
        isFavorite: asset?.isFavorite,
        favoriteBtnAction: () => updateFavoriteDetail({ userId: profileData?.id, editionId: asset?.id }),
        getUpdatedNFTs: () => getFeaturedAssetData(currentPage),
      })
    })

    return featuredNFTList
  }

  useEffect(() => {
    getCollectionData(currentPage)
    getFeaturedAssetData(currentPage)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      getFeaturedAssetData(currentPage)
    } else {
      getFeaturedAssetData(currentPage)
    }
  }, [isAuthenticated])

  return { collectionData, TabRender, hasMore, currentPage, getCollectionData, featuredAssestData, getFeaturedAssetData }
}

export default useCollection
