import Link from 'next/link'
import React, { useState, useEffect, useCallback } from 'react'
import {
  FollowButtonWrapper,
  TabSection,
  EditIconWrapper2,
  InfoWrapper,
  CardFlexContainer,
  FavoriteNftContainer,
  SocialMediaCountBox,
  SocialMediaSection,
  SocialMediaCountValueSection,
  ProfileWrapper,
  ProPicWrapper,
  Title,
  FlexContainer,
  SocialIcon,
  ProfileDataContainer,
  TabContent,
} from './profile.styled'
import ProfileTab from '../shared/tab/profileTab'
import Card from '../shared/card/card'
import ActivityList from '../shared/activityList/activityList'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import UserService from '../../../api/customer/UserService'
import PurchasedNFTCard from '../shared/PurchasedNFTCard/PurchasedNFTCard'
import Loader from '../../shared/components/Loader'
import { InfiniteScroll } from '@nft-marketplace/infinite-scroll'
import { getCookie } from '@nft-marketplace/js-cookie'
import { getItem, KEYS, removeItem, setItem } from '../../../utils/storage'
import useAuthConnect from '../shared/ConnectWallet/useAuthConnect'
import { ButtonGradientOutlined } from '../../shared/components/button/button'
import { useRouter } from 'next/router'
import { useInfiniteScroll } from '@nft-marketplace/infinite-scroll'
import { getFiatAmount, handleApiImage } from '../../../utils/helper'
import useTab from '../../../modules/customer/shared/tab/useTab'
import { ModalService } from '@nft-marketplace/modal'
import WarningModal from '../shared/modal/WarningModal'
import Empty from '../../Empty'
import ICard from '../shared/card/card.interface'
import { APP_ENV } from '../../../config'
import SuccessModal from '../shared/modal/SuccessModal'
import ErrorModal from '../shared/modal/ErrorModal'
import Error from 'next/error'
import { ICancelResaleAsset } from '@apps/customer/api/customer/IuserService'
import { useWeb3Context } from '@nft-marketplace/wallet-selector'
import MarketService from '@apps/customer/api/customer/MarketService'
import { PROFILE_TAB, USER_ROLE } from '@apps/customer/constants/constants'
import Avatar from '../shared/avatar/avatar'
import API from '../../../api/common'
import ConfirmationModal from '../shared/modal/ConfirmationModal/ConfirmationModal'

interface IModalStructure {
  status: boolean
  id: number
}

const creatorProfileTabs = [
  { id: 'collected', name: 'Collected' },
  { id: 'created', name: 'Created' },
  { id: 'favorite', name: 'Favorite' },
  { id: 'onSales', name: 'On Sales' },
  { id: 'activity', name: 'Activity' },
]
const userProfileTabs = [
  { id: 'collected', name: 'Collected' },
  { id: 'favorite', name: 'Favorite' },
  { id: 'onSales', name: 'On Sales' },
  { id: 'activity', name: 'Activity' },
]
const otherProfileTabs = [
  { id: 'collected', name: 'Collected' },
  { id: 'created', name: 'Created' },
  { id: 'onSales', name: 'On Sales' },
  // { id: 'activity', name: "Activity" },
]

const initialModalData = { status: false, id: 0 }

const Profile = () => {
  const router = useRouter()
  const { userName } = router.query
  const tab = router?.query?.tab?.toString().trim() || PROFILE_TAB.COLLECTED
  const { selectedTab, changeTab } = useTab(tab)
  const [confirmationModal, setConfirmationModal] = useState<IModalStructure>(initialModalData)
  const [favoriteList, setFavoriteList] = useState<Array<any>>([])
  const [onSaleList, setOnSaleList] = useState<Array<any>>([])
  const [userDetails, setUserDetails] = useState<any>(null)
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [collectionList, setCollectionList] = useState<any>([])
  const [createdList, setCreatedList] = useState<any>([])
  const [showLoader, setShowLoader] = useState(false)
  const [userStats, setUserStats] = useState<any>(null)
  const [activityData, setActivityData] = useState<any>(null)
  const [followStatus, setFollowStatus] = useState<any>(false)
  const { scrollData, updateScrollData, scrollToNextPage } = useInfiniteScroll()
  const { scrollData: onSaleScrollData, updateScrollData: onSaleScrollUpdateData, scrollToNextPage: onSaleScrollToNext } = useInfiniteScroll()
  const { scrollData: collectedScrollData, updateScrollData: collectedUpdateScollData, scrollToNextPage: collectScrollToNext } = useInfiniteScroll()
  const { scrollData: createdScrollData, updateScrollData: createdUpdateScollData, scrollToNextPage: createdScrollToNext } = useInfiniteScroll()
  const { scrollData: activityScrollData, updateScrollData: activityScrollDataUpdateScollData, scrollToNextPage: activityScrollDataScrollToNext } = useInfiniteScroll()
  const { web3, accountInfo } = useWeb3Context()

  // const [resaleListData, setResaledListData] = useState<any>([])
  // stores follow functionality
  // const [data, setData] = useState<any>(null)
  const [edit, setEdit] = useState(false)
  const { connectToWallet } = useAuthConnect()
  const [show404Page, setShow404Page] = useState(false)

  // method to fetch the followers count
  const getFollowers = useCallback(async (id: number) => {
    const result = await UserService.getFollowerCount(id)
    if (result?.status === 200 && result?.data) {
      //represents the data regarding followers
      setUserStats(result?.data?.data)
    } else {
      if (result?.error) {
        // setError(result?.error)
      }
    }
  }, [])
  /****canceling the Onsaled Assets */
  const cancelOnsaledAssets = useCallback(
    async (params: ICancelResaleAsset) => {
      // const loaderId = ModalService.open(() => <Loader width="100" height="60" />, {
      //   disableOutsideClick: true,
      //   closeIcon: false,
      // })
      const res = await UserService.cancelResaledAsset(params)
      if (res?.status === 200 && res.data && web3) {
        const { data } = res.data
        try {
          await web3.eth
            .sendTransaction({
              from: accountInfo?.activeAccount,
              to: data?.txnBuild?.to,
              value: data?.txnBuild?.value,
              gasPrice: data?.txnBuild.gasPrice,
              nonce: data?.txnBuild.nonce,
              gas: data?.txnBuild.gasLimit,
              data: data?.txnBuild.data,
            })
            .on('transactionHash', (receipt) => {
              console.log(receipt)
            })
            .on('receipt', async (receipt) => {
              const updateRes = await MarketService.updateTransaction({
                txnId: data.txnId,
                txnHash: receipt.transactionHash,
                status: 'confirmed',
              })
              if (updateRes.status === 200) {
                ModalService.open((modalProps) => <SuccessModal desc="Successfully canceled the resaled asset" close={modalProps.close} />)
                setOnSaleList((prev) => prev.filter((i) => i.id?.toString() !== params.tokenId?.toString()))
              }
              // ModalService.close(loaderId)
            })
          // .on('error', (error) => {
          // ModalService.close(loaderId)
          // })
        } catch (error) {
         ModalService.open((modalProps) => <ErrorModal desc={error?.message} close={modalProps.close} />)
           
          
        }
      } else {
        // ModalService.close(loaderId)
        ModalService.open((modalProps) => <WarningModal close={modalProps.close} title="Warning" desc="Failed to cancel the resell" />)
      }
    },
    [accountInfo?.activeAccount, web3]
  )
  /***** */
  /****canceling the Onsaled Assets for Hedera network */
  const cancelOnsaledAssetsHedera = useCallback(
    async (params: ICancelResaleAsset) => {
      const loaderId = ModalService.open(() => <Loader width="100" height="60" />, {
        disableOutsideClick: true,
        closeIcon: false,
      })
      const res = await UserService.cancelResaledAssetHedera(params)
      if (res?.status === 200 && res.data) {
        const { data } = res.data
        setOnSaleList((prev) => prev.filter((i) => i.id?.toString() !== params.tokenId?.toString()))
        ModalService.open((modalProps) => <SuccessModal desc="Successfully canceled the resaled asset" close={modalProps.close} />)
        ModalService.close(loaderId)
      } else {
        ModalService.close(loaderId)
        ModalService.open((modalProps) => <WarningModal close={modalProps.close} title="Warning" desc="Failed to cancel the resell" />)
      }
    },
    [accountInfo?.activeAccount, web3]
  )
  /***** */

  /**
   * fetch all OnSales NFTS
   */
  const getOnsaledNfts = useCallback(
    async (page: number, limit = 9) => {
      const res = await UserService.getOnsaleAssetList({
        userId: userDetails?.id,
        page,
        items: limit,
      })
      if (res.status === 200) {
        const { data } = res
        // if (data?.data?.pageMeta && data?.data?.pageMeta?.page === 1) {
        onSaleScrollUpdateData({
          page: data?.data?.pageMeta?.page || 1,
          totalItems: data?.data?.pageMeta?.totalItems,
          limit: data?.data?.pageMeta?.items || limit,
        })
        // }
        const neOnSaleList = data?.data?.assetList.map((newData) => {
          const { assetsData, userAssetEdition, saleType, auctionsData } = newData

          const assetListObj =
            profileData?.id === userDetails?.id
              ? {
                id: newData?.id,
                name: assetsData?.name || newData?.id,
                price: `${parseFloat(newData?.resellPrice)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
                userName: userAssetEdition?.firstName && userAssetEdition?.lastName ? userAssetEdition?.firstName + ' ' + userAssetEdition?.lastName : userAssetEdition?.userName || userAssetEdition?.email,
                image: userAssetEdition?.profilePicUrl ? `${APP_ENV.S3_ASSET_URL}/${userAssetEdition?.profilePicUrl}` : null,
                NFT: assetsData?.mainAssetUrl || null,
                mediaType: assetsData?.mainAssetType,
                isVerified: userAssetEdition?.role == 'creator',
                ...((saleType == 'fixed') && ({ saleType: saleType })),
                // bidderData: auctionsData?.[0]?.bidderData,
                // startTime: auctionsData?.[0]?.startTime,
                // endTime: auctionsData?.[0]?.endTime,
                // bidAmount: auctionsData?.[0]?.bidAmount,
                // status: auctionsData?.[0]?.status,
                // convertedbidAmount: `$ ${(parseFloat(auctionsData?.[0]?.bidAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
                convertedPrice: `$ ${(parseFloat(newData?.resellPrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
                btnLabel: 'Cancel Sale',
                getUpdatedNFTs: () => getOnsaledNfts(onSaleScrollData?.page),
                ...(saleType == 'fixed' && {
                  mainBtnAction: () =>
                    APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA'
                      ? cancelOnsaledAssetsHedera({
                        tokenId: newData.id,
                        saleType: 'FIXED_PRICE',
                      })
                      : cancelOnsaledAssets({
                        tokenId: newData.id,
                        saleType: 'FIXED_PRICE',
                      }),
                }),
                ...(saleType == 'auction' && {
                  mainBtnAction: () =>
                    APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA'
                      ? cancelOnsaledAssetsHedera({
                        tokenId: newData.id,
                        saleType: 'FIXED_PRICE',
                      })
                      : cancelOnsaledAssets({
                        tokenId: newData.id,
                        saleType: 'AUCTION',
                      }),
                }),

              }
              : {
                id: newData?.id,
                name: assetsData?.name || newData?.id,
                price: `${parseFloat(newData?.resellPrice)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
                userName: userAssetEdition?.firstName && userAssetEdition?.lastName ? userAssetEdition?.firstName + ' ' + userAssetEdition?.lastName : userAssetEdition?.userName || userAssetEdition?.email,
                image: userAssetEdition?.profilePicUrl ? `${APP_ENV.S3_ASSET_URL}/${userAssetEdition?.profilePicUrl}` : null,
                NFT: assetsData?.mainAssetUrl || null,
                mediaType: assetsData?.mainAssetType,
                isVerified: userAssetEdition?.role == 'creator',
                saleType: saleType,
                bidderData: auctionsData?.[0]?.bidderData,
                startTime: auctionsData?.[0]?.startTime,
                endTime: auctionsData?.[0]?.endTime,
                bidAmount: auctionsData?.[0]?.bidAmount,
                status: auctionsData?.[0]?.status,
                convertedbidAmount: `$ ${(parseFloat(auctionsData?.[0]?.bidAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
                convertedPrice: `$ ${(parseFloat(newData?.resellPrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
                // "btnLabel": 'Cancel Sale',
                // 'mainBtnAction': () => cancelOnsaledAssets({ tokenId: newData.id, saleType: "FIXED_PRICE" })
                getUpdatedNFTs: () => getOnsaledNfts(onSaleScrollData?.page)
              }

          return assetListObj
        })
        if (data?.data?.pageMeta?.page === 1) {
          setOnSaleList(neOnSaleList)
        } else
          setOnSaleList((prev) => {
            const prevIds = prev.map((g) => g.id)
            const newDatas = neOnSaleList.filter((i) => !prevIds.includes(i.id))
            return [...prev, ...newDatas]
          })
      }
    },
    [cancelOnsaledAssetsHedera, onSaleScrollUpdateData, userDetails?.id, profileData?.id]
  )
  /****** */

  /**
   * fetch all favorite NFTS
   */
  const getFavoriteNfts = useCallback(
    async (page: number, limit = 9) => {
      const res = await UserService.getFavoriteAssetList({
        page,
        items: limit,
        cursor: collectedScrollData?.cursor,
      })
      if (res.status === 200) {
        const { data } = res
        // if (data?.data?.pageMeta && data?.data?.pageMeta?.page === 1) {
        updateScrollData({
          page: data?.data?.pageMeta?.page || 1,
          totalItems: data?.data?.pageMeta?.totalItems,
          limit: data?.data?.pageMeta?.items || limit,
        })
        // }
        const newFavList = data?.data?.favoriteList.map((newData) => {
          // if(!newData?.editionData) return {}
          const { assetsData, userAssetEdition, auctionsData } = newData.editionData
          return {
            id: newData?.editionData?.id,
            name: assetsData?.name || '',
            firstName: userAssetEdition?.firstName,
            lastName: userAssetEdition?.lastName,
            price: `${parseFloat(newData?.editionData?.resellPrice)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
            userName: userAssetEdition?.userName || userAssetEdition?.email,
            image: userAssetEdition?.profilePicUrl ? `${APP_ENV.S3_ASSET_URL}/${userAssetEdition?.profilePicUrl}` : null,
            NFT: assetsData?.mainAssetUrl || null,
            mediaType: assetsData?.mainAssetType,
            isVerified: userAssetEdition?.role == 'creator',
            convertedPrice: `$ ${(parseFloat(newData?.editionData?.resellPrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
            isFavorite: true,
            editionId: newData?.editionData?.id,
            bidAmount: `${parseFloat(auctionsData?.[0]?.bidAmount)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
            convertedbidAmount: `$ ${(parseFloat(auctionsData?.[0]?.bidAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
            saleType: newData?.editionData?.saleType,
            bidderData: auctionsData?.[0]?.bidderData,
            startTime: auctionsData?.[0]?.startTime,
            endTime: auctionsData?.[0]?.endTime,
            status: auctionsData?.[0]?.status,
            getUpdatedNFTs: () => getFavoriteNfts(scrollData?.page),
          }
        })

        if (data?.data?.pageMeta?.page === 1) {
          setFavoriteList(newFavList)
        } else
          setFavoriteList((prev) => {
            const prevIds = prev.map((g) => g.id)
            const newDatas = newFavList.filter((i) => !prevIds.includes(i.id))
            return [...prev, ...newDatas]
          })
      }
    },
    [profileData?.id, updateScrollData, collectedScrollData?.cursor]
  )
  /****** */
  /***remove favorite list */
  const updateFavoriteDetail = useCallback(async ({ userId, editionId }) => {
    const res = await UserService.handlefavourite({ editionId, userId })
    if (res.status === 200) {
      setFavoriteList((prv) => {
        return prv.filter((i) => i.editionId !== editionId)
      })
      ModalService.open((mdalProps) => <SuccessModal close={mdalProps.close} title="Congratulations" desc="Favorite list updated" />)
      // getFavoriteNfts(scrollData?.page);
    }
  }, [])
  /******* */

  const getFollowStatus = useCallback(
    (id: number) => {
      //API call to Follow the cretor
      UserService.followStatus(id)
        .then((response) => {
          //contains data regarding follow functionality
          setFollowStatus(response?.data?.data)

          // To get the updated list of followers
          getFollowers(id)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [getFollowers]
  )

  //method to follow a user
  const handleFollow = useCallback(
    (id: number) => {
      //API call to Follow the cretor
      UserService.followCreator(id)
        .then((response) => {
          //contains data regarding follow functionality
          // setData(response?.data?.data)

          // To get the updated list of followers
          getFollowers(id)
          getFollowStatus(id)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [getFollowStatus, getFollowers]
  )

  /**
   * fetch all collected NFTS
   */
  const getCollectedNfts = useCallback(
    async (page: number, limit = 9) => {
      if (userDetails?.id) {
        const necursor = page === 1 ? undefined : getItem('cursor')
        const res = await UserService.getCollectedNftById({
          userId: userDetails?.id,
          items: limit,
          page,
          cursor: necursor,
        })

        if (res.status === 200) {
          const { data } = res
          // if (data?.data?.pageMeta && data?.data?.pageMeta?.page === 1) {
          collectedUpdateScollData({
            page: data?.data?.pageMeta?.page || 1,
            totalItems: data?.data?.pageMeta?.totalItems,
            limit: data?.data?.pageMeta?.items || limit,
          })
          setItem('cursor', data?.data?.pageMeta?.cursor)
          // }
          const newCollectionList = data?.data?.assetList.map((newData) => {
            const { assetsData } = newData
            return {
              id: newData?.id,
              assetId: assetsData?.id,
              profilePic: assetsData?.mainAssetUrl,
              assetImg: assetsData?.mainAssetUrl,
              mediaType: assetsData?.mainAssetType,
              userName: userDetails?.firstName && userDetails?.lastName ? userDetails?.firstName + ' ' + userDetails?.lastName : userDetails?.userName || '',
              name: assetsData?.name || '',
              price: newData?.displayData?.value,
              collectedOn: newData?.activityData?.updatedAt.substring(0, 10),
              // price:
              //   PROFILE_TAB.COLLECTED && newData?.activityData?.transactionData?.saleType === 'AUCTION'
              //     ? newData?.activityData?.auctionData?.bidAmount
              //     : PROFILE_TAB.COLLECTED && newData?.activityData?.transactionData?.saleType === 'FIXED_PRICE'
              //     ? newData?.activityData?.transactionData?.value
              //     : newData?.resellPrice,
              // collectedOn: newData?.activityData?.updatedAt.substring(0, 10),
            }
          })
          if (data?.data?.pageMeta?.page === 1) {
            setCollectionList(newCollectionList)
          } else
            setCollectionList((prev) => {
              const prevIds = prev.map((g) => g.id)
              const newDatas = newCollectionList.filter((i) => !prevIds.includes(i.id))
              return [...prev, ...newDatas]
            })
        }
      }
    },
    [userDetails?.id, userDetails?.userName, collectedUpdateScollData]
  )
  /****** */
  /**
   * fetch all created NFTS
   */
  const getCreatedNfts = useCallback(
    async (page: number, limit = 9) => {
      if (userDetails?.id) {
        const res = await UserService.getCreatedNftById({
          userId: userDetails?.id,
          items: limit,
          page,
        })

        if (res.status === 200) {
          const { data } = res

          createdUpdateScollData({
            page: data?.data?.pageMeta?.page || 1,
            totalItems: data?.data?.pageMeta?.totalItems,
            limit: data?.data?.pageMeta?.items || limit,
          })

          const newCreatedList = data?.data?.assetList.map((newData) => {
            const { assetsData } = newData
            return {
              id: newData?.id,
              assetId: assetsData?.id,
              profilePic: assetsData?.mainAssetUrl,
              mediaType: assetsData?.mainAssetType,
              assetImg: assetsData?.mainAssetUrl,
              userName: userDetails?.firstName && userDetails?.lastName ? userDetails?.firstName + ' ' + userDetails?.lastName : userDetails?.userName || '',
              name: assetsData?.name || '',
              price: newData?.resellPrice
            }
          })
          if (data?.data?.pageMeta?.page === 1) {
            setCreatedList(newCreatedList)
          } else
            setCreatedList((prev) => {
              const prevIds = prev.map((g) => g.id)
              const newDatas = newCreatedList.filter((i) => !prevIds.includes(i.id))
              return [...prev, ...newDatas]
            })
        }
      }
    },
    [userDetails?.id, userDetails?.userName, createdUpdateScollData]
  )
  /****** */

  const deleteNFT = (id: number) => {
    API.deleteAssetById(id).then(() => getCreatedNfts(1, 9))
  }

  //method to get collected Data
  // const getCollectedNFT = useCallback(async (page: any, id: number) => {
  //   //check for cursor it represents the next page
  //   if (cursor) {
  //     setCurrentPage(page);
  //     const result: any = await UserService.getPurchasedNFTById(id, page, 15, cursor)
  //     if (result?.data?.data?.assetList !== null) {
  //       const temp = result?.data?.data?.assetList;
  //       setCollectionList((prev: any) => [...prev, ...temp])
  //       setCursor(result?.data?.data?.pageMeta?.cursor)
  //     } else if (result?.error !== null) {
  //       setError(result?.error);
  //     }
  //   }
  //   else {
  //     setShowLoader(true);
  //     const result: any = await UserService.getPurchasedNFTById(id, page, 15)

  //     if (result?.data !== null) {
  //       setCollectionList(result?.data?.data?.assetList);
  //       setCursor(result?.data?.data?.pageMeta?.cursor);
  //       setShowLoader(false);
  //     } else if (result?.error !== null) {

  //       setError(result?.error);
  //       setShowLoader(false);
  //     }
  //   }
  // }, [cursor])

  // get activity

  const getActivityData = useCallback(
    async (page: number) => {
      try {
        const res: any = await UserService.getUserActivityById(userDetails?.id, page, 6)
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { pageMeta, list } = res?.data?.data
        activityScrollDataUpdateScollData({
          page: pageMeta.page,
          totalItems: pageMeta.totalCount,
          limit: pageMeta.size,
        })

        const newActivityList = list.rows.map((newData) => {
          return {
            id: newData?.id,
            userId: newData?.id,
            activity: newData?.activity,
            editionId: newData?.editionId,
            transactionId: newData?.transactionId,
            transactionData: newData?.transactionData,
            assetsData: newData?.assetsData,
            userData: newData?.userData,
          }
        })
        if (pageMeta.page === 1) {
          setActivityData(newActivityList)
        } else
          setActivityData((prev) => {
            const prevIds = prev.map((g) => g.id)
            const newDatas = newActivityList.filter((i) => !prevIds.includes(i.id))
            return [...prev, ...newDatas]
          })
      } catch (error) {
        console.log(error)
      }

      // setActivityData(res?.data?.data)
    },
    [userDetails?.id, userDetails?.userName, activityScrollDataUpdateScollData]
  )

  // const getCollectedNfts = useCallback(
  //   async (page: number, limit = 9) => {
  //     if (userDetails?.id) {
  //       const necursor = page === 1 ? undefined : getItem('cursor')
  //       const res = await UserService.getCollectedNftById({
  //         userId: userDetails?.id,
  //         items: limit,
  //         page,
  //         cursor: necursor,
  //       })
  //       if (res.status === 200) {
  //         const { data } = res
  //         // if (data?.data?.pageMeta && data?.data?.pageMeta?.page === 1) {
  //         collectedUpdateScollData({
  //           page: data?.data?.pageMeta?.page || 1,
  //           totalItems: data?.data?.pageMeta?.totalItems,
  //           limit: data?.data?.pageMeta?.items || limit,
  //         })
  //         setItem('cursor', data?.data?.pageMeta?.cursor)
  //         // }
  //         const newCollectionList = data?.data?.assetList.map((newData) => {
  //           const { assetsData } = newData
  //           return {
  //             id: newData?.id,
  //             assetId: assetsData?.id,
  //             profilePic: assetsData?.mainAssetUrl,
  //             assetImg: assetsData?.mainAssetUrl,
  //             userName: userDetails?.userName || '',
  //             name: assetsData?.name || '',
  //           }
  //         })
  //         if (data?.data?.pageMeta?.page === 1) {
  //           setCollectionList(newCollectionList)
  //         } else
  //           setCollectionList((prev) => {
  //             const prevIds = prev.map((g) => g.id)
  //             const newDatas = newCollectionList.filter((i) => !prevIds.includes(i.id))
  //             return [...prev, ...newDatas]
  //           })
  //       }
  //     }
  //   },
  //   [userDetails?.id, userDetails?.userName, collectedUpdateScollData]
  // )

  //method to get different users profile
  const handleUser = useCallback(async () => {
    // if (userName !== undefined) {
    const currentUserName = Array.isArray(userName) ? userName[0] : userName
    //API call to get user data
    await UserService.getUserProfile(currentUserName).then((response) => {
      if (response.status === 200) {
        if (response?.data) {
          setUserDetails(response?.data?.data)
          //User data as per different profiles
          if (response?.data?.data?.id === profileData?.id) {
            // setUserDetails(profileData)
            setEdit(true)
          } else {       
            setEdit(false)
          }
          getFollowers(response?.data?.data?.id)
          getFollowStatus(response?.data?.data?.id)
          // getActivityData(response?.data?.data?.id, 1)
          // getCollectedNFT(currentPage, response?.data?.data?.id)
        }
      } else {
        setShow404Page(true)
      }
    })
  }, [getFollowers, handleFollow, profileData, userName]) //eslint-disable-line react-hooks/exhaustive-deps

  const followClicked = () => {
    const token = getCookie(KEYS.CUSTOMER_TOKEN)
    if (token) {
      handleFollow(userDetails?.id)
    } else {
      ModalService.open(
        (modalProps) => (
          <WarningModal
            key={1}
            btnLabel="Connect Wallet"
            title="Connect your Wallet"
            desc="Connect wallet to Follow User"
            close={async () => {
              modalProps.close()
              await connectToWallet()
            }}
          />
        ),
        { closeIcon: false, width: '31.25rem' }
      )
      // setShowLogin(true)
    }
  }

  useEffect(() => {
    handleUser()
  }, [handleUser])

  // while changing of the tabs, it set to inital page
  useEffect(() => {
    if ([PROFILE_TAB.FAVORITE].includes(selectedTab)) {
      updateScrollData({
        page: 1,
        hasMore: false,
      })
    }
  }, [selectedTab, updateScrollData, userName])
  useEffect(() => {
    if ([PROFILE_TAB.COLLECTED].includes(selectedTab)) {
      collectedUpdateScollData({
        page: 1,
        hasMore: false,
      })
    }
  }, [selectedTab, collectedUpdateScollData, userName])
  useEffect(() => {
    if ([PROFILE_TAB.CREATED].includes(selectedTab)) {
      createdUpdateScollData({
        page: 1,
        hasMore: false,
      })
    }
  }, [selectedTab, createdUpdateScollData, userName])
  useEffect(() => {
    if ([PROFILE_TAB.ON_SALES].includes(selectedTab)) {
      onSaleScrollUpdateData({
        page: 1,
        hasMore: false,
      })
    }
  }, [selectedTab, onSaleScrollUpdateData, userName])
  useEffect(() => {
    if ([PROFILE_TAB.ACTIVITY].includes(selectedTab)) {
      activityScrollDataUpdateScollData({
        page: 1,
        hasMore: false,
      })
    }
  }, [selectedTab, activityScrollDataUpdateScollData])

  useEffect(() => {
    if (selectedTab === PROFILE_TAB.COLLECTED) getCollectedNfts(collectedScrollData?.page)
  }, [getCollectedNfts, collectedScrollData?.page, selectedTab])
  useEffect(() => {
    if (selectedTab === PROFILE_TAB.CREATED) getCreatedNfts(createdScrollData?.page)
  }, [getCreatedNfts, createdScrollData?.page, selectedTab])
  useEffect(() => {
    if (selectedTab === PROFILE_TAB.FAVORITE) getFavoriteNfts(scrollData?.page)
  }, [scrollData?.page, getFavoriteNfts, selectedTab])
  useEffect(() => {
    if (selectedTab === PROFILE_TAB.ON_SALES) getOnsaledNfts(onSaleScrollData?.page)
  }, [getOnsaledNfts, onSaleScrollData?.page, selectedTab])
  useEffect(() => {
    if (selectedTab === PROFILE_TAB.ACTIVITY) {
      getActivityData(activityScrollData?.page)
    }
  }, [getActivityData, activityScrollData?.page, selectedTab])

  const profilePicUrl = userDetails?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userDetails?.profilePicUrl}` : '/images/customer/avatar.png'
  const url = userDetails?.bannerImage ? handleApiImage(userDetails?.bannerImage) : '/images/customer/profile-bg.png'
  const isVerified = userDetails?.role == 'creator' || userDetails?.role == 'admin' || userDetails?.role == 'subadmin';
  const selectedTabData = (id: string) => {
    switch (id) {
      case PROFILE_TAB.COLLECTED:
        return Array.isArray(collectionList) && collectionList?.length > 0 ? (
          <InfiniteScroll dataLength={collectionList?.length || collectedScrollData.limit} next={collectScrollToNext} hasMore={collectedScrollData.hasMore}>
            <CardFlexContainer>
              {collectionList?.map((data: any) => (
                <PurchasedNFTCard
                  data={{
                    id: data?.id,
                    assetImg: data?.assetImg,
                    profilePic: profilePicUrl,
                    name: data.name,
                    userName: data.userName,
                    price: data.price,
                    collectedOn: data?.collectedOn,
                    mediaType: data?.mediaType
                  }}
                  key={data?.id}
                  showPrimaryBtn={profileData?.userName === userDetails?.userName}
                  primaryBtnAction={(e) => {
                    e.stopPropagation()
                    router.push({
                      pathname: `/base/resellArtwork`,
                      query: {
                        id: data?.id,
                      },
                    })
                  }}
                  showEditButton={false}
                  onClick={() => { router.push(`/base/assetDetails?id=${data?.id}`) }}
                />
              ))}
            </CardFlexContainer>
          </InfiniteScroll>
        ) : (
          <Empty />
        )
      case PROFILE_TAB.CREATED:
        return Array.isArray(createdList) && createdList?.length > 0 ? (
          <InfiniteScroll dataLength={createdList?.length || createdScrollData.limit} next={createdScrollToNext} hasMore={createdScrollData.hasMore}>
            <ConfirmationModal title={"Are you sure to delete the asset...?"} show={confirmationModal.status} closeModal={() => setConfirmationModal(initialModalData)} onConfirmation={() => deleteNFT(confirmationModal.id)} />
            <CardFlexContainer>
              {createdList?.map((data: any) => (
                <PurchasedNFTCard
                  data={{
                    id: data?.id,
                    assetImg: data?.assetImg,
                    profilePic: profilePicUrl,
                    name: data.name,
                    userName: data?.userName,
                    price: data.price,
                    mediaType: data?.mediaType
                  }}
                  key={data?.id}
                  // showPrimaryBtn={profileData?.userName === userDetails?.userName}
                  showPrimaryBtn={true}
                  primaryBtnLabel={'View Asset'}
                  primaryBtnAction={() => {
                    router.push({
                      pathname: `/base/assetDetails`,
                      query: {
                        id: data?.id,
                      },
                    })
                  }}
                  showEditButton={userDetails?.id === profileData?.id}
                  editBtnAction={() => {
                    router.push({
                      pathname: `/base/creator/edit`,
                      query: {
                        id: data?.id,
                      },
                    })
                  }}
                  deleteBtnAction={() => setConfirmationModal({ status: true, id: data?.assetId })}
                  onClick={() => { router.push(`/base/assetDetails?id=${data?.id}`) }}
                />
              ))}
            </CardFlexContainer>
          </InfiniteScroll>
        ) : (
          <Empty />
        )

      case PROFILE_TAB.FAVORITE:
        return Array.isArray(favoriteList) && favoriteList?.length > 0 ? (
          <InfiniteScroll dataLength={favoriteList?.length || scrollData.limit} next={scrollToNextPage} hasMore={scrollData.hasMore}>
            <FavoriteNftContainer>
              {favoriteList?.map((data: ICard) => (
                <Card
                  favoriteBtnAction={() =>
                    updateFavoriteDetail({
                      userId: profileData?.id,
                      editionId: data.editionId,
                    })
                  }
                  key={data?.id}
                  vidHeight={24.2}
                  {...data}
                ></Card>
              ))}
            </FavoriteNftContainer>
          </InfiniteScroll>
        ) : (
          <Empty />
        )
      case PROFILE_TAB.ON_SALES:
        return Array.isArray(onSaleList) && onSaleList?.length > 0 ? (
          <InfiniteScroll dataLength={onSaleList?.length || onSaleScrollData.limit} next={onSaleScrollToNext} hasMore={onSaleScrollData.hasMore}>
            <FavoriteNftContainer>
              {onSaleList?.map((data: ICard) => (
                <Card favoriteAction={false} key={data?.id} vidHeight={24.2} {...data}></Card>
              ))}
            </FavoriteNftContainer>
          </InfiniteScroll>
        ) : (
          <Empty />
        )

      case PROFILE_TAB.ACTIVITY:
        return activityData?.length > 0 ? (
          <InfiniteScroll dataLength={activityData?.length || activityScrollData.limit} next={activityScrollDataScrollToNext} hasMore={activityScrollData.hasMore}>
            <ActivityList listData={activityData} />
          </InfiniteScroll>
        ) : (
          <Empty />
        )

      default:
        return <Empty />
    }
  }
  const tabChange = useCallback(
    (id: string) => {
      changeTab(id)
      switch (id) {
        case PROFILE_TAB.FAVORITE:
          updateScrollData({
            page: 1,
          })
          break
        case PROFILE_TAB.ON_SALES:
          onSaleScrollUpdateData({
            page: 1,
          })
          break
      }
    },
    [changeTab, updateScrollData, onSaleScrollUpdateData]
  )
  if (show404Page) return <Error statusCode={404} />
  return (
    <ProfileWrapper url={url}>
      <FlexContainer>
        {/* <ProPicWrapper> */}
        {/* <Image src={profilePicUrl} width="107" height="107" className="pro-pic-image" alt="pro-pic-img" /> */}
        {/* </ProPicWrapper> */}
        <Avatar
          image={profilePicUrl}
          isVerified={isVerified}
          large={true}
          withBG={false}
          cause={'profilePic'}
        />

        <InfoWrapper>
          <ProfileDataContainer>
            <Title>{`${userDetails?.firstName || ''}  ${userDetails?.lastName || ''}`}</Title>
            <span>{userDetails?.userName ? `@${userDetails?.userName}` : ''} </span>
            {edit ? (
              <Link href="/base/profile/settings" passHref>
                <EditIconWrapper2>
                  <Image src="/svgs/pen-tool.svg" width="710" height="200" alt="setting-cover" />
                </EditIconWrapper2>
              </Link>
            ) : (
              <FollowButtonWrapper>
                <ButtonGradientOutlined fs="1.4" size="sm" onDoubleClick={()=>{}} onClick={() => followClicked()}>
                  {followStatus?.followed ? 'Following' : 'Follow'}
                </ButtonGradientOutlined>
              </FollowButtonWrapper>
            )}
          </ProfileDataContainer>

          <p>{userDetails?.description} </p>
        </InfoWrapper>
        <SocialMediaSection>
          <SocialMediaCountValueSection>
            <SocialMediaCountBox>
              <h3>{userStats && userStats?.followerCount}</h3>
              <p>Followers</p>
            </SocialMediaCountBox>
            <SocialMediaCountBox>
              <h3>{userStats && userStats?.followingCount}</h3>
              <p>Following</p>
            </SocialMediaCountBox>
            {profileData?.role === USER_ROLE?.CREATOR
              ? <SocialMediaCountBox>
                <h3>{userDetails?.createdNFTCount}</h3>
                <p>created</p>
              </SocialMediaCountBox>
              : null}
          </SocialMediaCountValueSection>

          <SocialIcon>
            {userDetails?.socialLinks && Object.getOwnPropertyNames(userDetails?.socialLinks).length !== 0 && (
              <>
                {userDetails?.socialLinks?.facebookUrl && (
                  <a target={'_blank'} className="icon" href={userDetails?.socialLinks?.facebookUrl} rel="noreferrer">
                    <img src="/svgs/facebook.svg" alt="Facebook" />
                  </a>
                )}
                {userDetails?.socialLinks?.twitterUrl && (
                  <a target={'_blank'} className="icon" href={userDetails?.socialLinks?.twitterUrl} rel="noreferrer">
                    <svg width="18" height="16" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.3385 0.998891C14.7001 1.44921 13.9933 1.79363 13.2452 2.01889C12.8437 1.55723 12.3101 1.23002 11.7166 1.08151C11.123 0.932998 10.4982 0.970355 9.9266 1.18853C9.35499 1.4067 8.86417 1.79516 8.52053 2.30137C8.17689 2.80758 7.99701 3.40712 8.00521 4.01889V4.68556C6.83363 4.71594 5.67272 4.4561 4.62588 3.92919C3.57904 3.40228 2.67875 2.62478 2.00521 1.66569C2.00521 1.66569 -0.661458 7.66556 5.33854 10.3322C3.96556 11.2642 2.32998 11.7315 0.671875 11.6656C6.67188 14.9989 14.0052 11.6656 14.0052 3.99889C14.0046 3.81319 13.9867 3.62795 13.9519 3.44556C14.6323 2.77455 15.1124 1.92737 15.3385 0.998891Z"
                        stroke="#D2D2D2"
                        strokeWidth="1.53333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
                {userDetails?.socialLinks?.instagramUrl && (
                  <a target={'_blank'} className="icon" href={userDetails?.socialLinks?.instagramUrl} rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 256 256" fill="none">
                      <path
                        stroke="white"
                        strokeWidth="10.83333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M128,84a44,44,0,1,0,44,44A44.04978,44.04978,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36.04061,36.04061,0,0,1,128,164ZM172,32H84A52.059,52.059,0,0,0,32,84v88a52.059,52.059,0,0,0,52,52h88a52.059,52.059,0,0,0,52-52V84A52.059,52.059,0,0,0,172,32Zm44,140a44.04978,44.04978,0,0,1-44,44H84a44.04978,44.04978,0,0,1-44-44V84A44.04978,44.04978,0,0,1,84,40h88a44.04978,44.04978,0,0,1,44,44ZM188,76a8,8,0,1,1-8-8A8.00917,8.00917,0,0,1,188,76Z"
                      />
                    </svg>
                  </a>
                )}
                {userDetails?.socialLinks?.websiteUrl && (
                  <a className="icon" target={'_blank'} href={userDetails?.socialLinks?.websiteUrl} rel="noreferrer">
                    <img src="/svgs/website.svg" alt="Website" />
                  </a>
                )}
              </>
            )}
          </SocialIcon>
        </SocialMediaSection>
      </FlexContainer>

      <TabSection>
        <ProfileTab data={userDetails?.id?.toString() === profileData?.id?.toString() && profileData?.role ? (profileData.role === USER_ROLE.CREATOR ? creatorProfileTabs : userProfileTabs) : otherProfileTabs} selectedTab={selectedTab} onChange={tabChange} />
      </TabSection>
      <TabContent>{showLoader ? <Loader width="100" height="60" /> : selectedTabData(selectedTab)}</TabContent>
    </ProfileWrapper>
  )
}
export default Profile
