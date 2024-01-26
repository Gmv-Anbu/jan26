/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable no-unsafe-optional-chaining */
import MarketService from '@apps/customer/api/customer/MarketService'
import UserService from '@apps/customer/api/customer/UserService'
import { APP_ENV } from '@apps/customer/config'
import { handleApiImage } from '@apps/customer/utils/helper'
import { injectedStore, RootState } from '@apps/customer/redux/store'
import { KEYS } from '@apps/customer/utils/storage'
import { getCookie } from '@nft-marketplace/js-cookie'
import { ModalService } from '@nft-marketplace/modal'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useAuthConnect from '../shared/ConnectWallet/useAuthConnect'
import SuccessModal from '../shared/modal/SuccessModal'

// interface for our hook
interface ITrendingData {
  nftList: Array<any>
}

// Hook contains all the data manipulation logic for trending section
const useTrendingData = (): ITrendingData => {
  const { connectToWallet } = useAuthConnect()
  //stores list of trending nfts
  const [nftList, setNFTList] = useState<any>([])
  const isAuthenticated = useSelector<RootState, any>((state) => state?.auth?.accessToken)
  //current logged user's data
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const trending = ThemeConfiguration?.sections?.home?.trending
  /***update favorite list */
  const updateFavoriteDetail = useCallback(async ({ userId, editionId }) => {
    const token = getCookie(KEYS.CUSTOMER_TOKEN)
    if (token) {
      const res = await UserService.handlefavourite({ editionId, userId })
      if (res.status === 200) {
        getTrendingNFTItems(1)
        ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.data?.data?.isFavorite?"Added to the favorite list":"Removed From Favorite list"} />)
      } else {
        //need to integrate error scenerio
      }
    } else {
      connectToWallet()
    }
  }, [])
  /******* */

  const getTrendingNFTItems = async (page: number) => {
    await MarketService.getTrendingNFTList(page, trending?.noOfNFTs)
      .then((res) => {
        const trendingList = processCardData(res?.data?.data?.assetList, res?.data?.data?.exchangeRates)
        setNFTList((prev: Array<any>) => {
          const prevIds = []
          const prevDatas = prev.map((g) => {
            const assetData = trendingList.find((d) => d.id === g.id)
            prevIds.push(g.id)
            if (assetData) return assetData
            else return g
          })
          const newDatas = trendingList.filter((i) => !prevIds.includes(i.id))
          return [...prevDatas, ...newDatas]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const processCardData = (assetList, exchangeRate) => {
    const assetFinalList = []
    assetList.forEach((el) => {
      const user = el?.userAssetEdition
      assetFinalList.push({
        id: el.id,
        name: el?.assetsData?.name,
        price: `${el.assetsData?.primarySalePrice} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        userName: user?.userName || '',
        image: handleApiImage(user?.profilePicUrl),
        NFT: el?.assetsData?.mainAssetUrl,
        mediaType: el?.assetsData?.mainAssetType,
        convertedPrice: `$ ${(parseFloat(el.assetsData?.primarySalePrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRate?.HBAR?.USD : exchangeRate?.ETH?.USD || 1))?.toFixed(2)} `,
        isVerified: user?.role== 'creator' || user?.role== 'admin',
        bidAmount: `${parseFloat(el?.auctionsData?.[0]?.bidAmount)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
        convertedbidAmount: `$ ${(parseFloat(el?.auctionsData?.[0]?.bidAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRate?.HBAR?.USD : exchangeRate?.ETH?.USD))?.toFixed(3)}`,
        saleType: el?.saleType,
        bidderData:el?.auctionsData?.[0]?.bidderData,
        isFavorite: el?.isFavorite,
        startTime: el?.auctionsData?.[0]?.startTime,
        endTime: el?.auctionsData?.[0]?.endTime,
        status:el?.auctionsData?.[0]?.status,
        favoriteBtnAction: () => updateFavoriteDetail({ userId: profileData?.id, editionId: el?.id }),
        getUpdatedNFTs:()=>getTrendingNFTItems(1)
      })
    })
    return assetFinalList
  }
  useEffect(() => {
    isAuthenticated ? getTrendingNFTItems(1) : getTrendingNFTItems(1)
  }, [isAuthenticated])

  return { nftList }
}

export default useTrendingData
