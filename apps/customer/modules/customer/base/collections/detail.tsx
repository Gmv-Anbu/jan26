import styled, { css } from 'styled-components'
import Card from '../../shared/card/card'
import Avatar from '../../shared/avatar/avatar'
import { useState, useEffect, useCallback } from 'react'
import { handleApiImage } from '@apps/customer/utils/helper'
import UserService from '@apps/customer/api/customer/UserService'
import { RootState } from '@apps/customer/redux/store'
import { useSelector } from 'react-redux'
import { ModalService } from '@nft-marketplace/modal'
import useAuthConnect from '../../shared/ConnectWallet/useAuthConnect'
import { useRouter } from 'next/router'
import SuccessModal from '../../shared/modal/SuccessModal'
import { APP_ENV } from '@apps/customer/config'
import { getCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '@apps/customer/utils/storage'
interface BGCover {
  bgUrl: string
}

const DetailContainer = styled.section<BGCover>`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:before {
    content: '';
    width: 100%;
    height: 72rem;
    left: 0;
    top: 0;
    position: absolute;
    z-index: -1;
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    background-image: url(/images/customer/colloction-bg.png);
    ${(props) =>
      props.bgUrl &&
      css`
        background-image: url(${props.bgUrl});
      `}
    @media screen and (max-width: 560px) {
      height: 80rem;
    }
  }
`
const CollectionContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
`
const CardRow = styled.div`
  margin: 10rem -1rem;
`
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin: 0rem 1rem 5rem;
  }
  @media screen and (max-width: 540px) {
    justify-content: center;
  }
`
const ProdutDetailWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 5.5rem 0 11rem 0;
  box-sizing: border-box;
  background-size: cover;
  position: relative;
`

const HeadSection = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: flex-start;
`
const Title = styled.h1`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 4.8rem;
  font-weight: 600;
  line-height: 5rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.fontprimary};
  margin-bottom: 1rem;
`
const SubTitle = styled.h3`
  margin: 0;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-style: normal;
  text-transform: uppercase;
  opacity: 0.66;
  color: ${({ theme }) => theme.colors.fontprimary};
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.5rem;
  margin-bottom: 2.5rem;
`
const ImageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.imageWrapperbg};
  border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
  backdrop-filter: blur(3px);
  border-radius: 1.2rem;
  width: 16rem;
  height: 15rem;
  padding: 1rem;
  margin-bottom: 3.5rem;
  span {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 1.2rem;
    display: block;
    width: 100%;
    height: 100%;
  }
`
const CountDownTimer = styled.div`
  background: ${({ theme }) => theme.colors.auctionBoxbg};
  backdrop-filter: blur(43.0769px);
  border-radius: 14px;
  padding: 1.5rem 3rem;
  color: ${({ theme }) => theme.colors.fontprimary};
  font-size: ${({ theme }) => theme.fontSizes.md};

  @media screen and (max-width: 575px) {
    padding: 1rem 2rem;
  }
`
const Description = styled.p`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-style: normal;
  color: ${({ theme }) => theme.colors.colorD2};
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.6rem;
  max-width: 57rem;
  margin-bottom: 3rem;
`

const NoData = styled.p`
  color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  justify-content: center;
  display: flex;
  font-size: 2.2rem;
  width: 100%;
`

const DetailPage = (props: any) => {
  const { collectionDetails, collectionAssets, getAssets, id } = props
  const { connectToWallet } = useAuthConnect()

  const [details, setDetails] = useState<any>(null)
  const [collectionCards, setCollectionCards] = useState<any>(null)
  const [exchangeRates, setExchangeRates] = useState<any>(null)
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const router = useRouter()
  const { itemId } = router.query

  const updateFavoriteDetail = useCallback(
    async ({ userId, editionId }) => {
      const token = getCookie(KEYS.CUSTOMER_TOKEN)
      if (token) {
        const res = await UserService.handlefavourite({ editionId, userId })
        if (res.status === 200) {
          getAssets(itemId)
          ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.data?.data?.isFavorite?"Added to the favorite list":"Removed From Favorite list"} />)
        }
      } else {
        connectToWallet()
      }
    },
    [connectToWallet, getAssets, itemId]
  )

  useEffect(() => {
    if (collectionDetails?.id) setDetails(collectionDetails)
    if (collectionAssets?.assetList) {
      setExchangeRates(collectionAssets.exchangeRates)
      setCollectionCards(collectionAssets?.assetList)
    }
  }, [props])
  
  return (
    <DetailContainer bgUrl={details?.bannerImage}>
      <ProdutDetailWrapper>
        <HeadSection>
          <ImageWrapper>
            <span
              style={{
                backgroundImage: details?.collectionImage ? `url(${details?.collectionImage})` : `url(/images/customer/demo-preview.png)`,
              }}
            ></span>
          </ImageWrapper>
          {/* <CountDownTimer>11h 33m 20s</CountDownTimer> */}
        </HeadSection>
        <Title>{details?.name}</Title>
        <SubTitle>{collectionAssets?.pageMeta?.totalItems} NFTs</SubTitle>
        <Description>{details?.description}</Description>
        <Avatar
          large={true}
          collection={true}
          withBG={true}
          atTheRate={false}
          image={handleApiImage(details?.collectionCreator?.profilePicUrl)}
          userName={`${details?.collectionCreator?.firstName || " "} ${details?.collectionCreator?.lastName || " "}` || details?.collectionCreator?.userName}
          isVerified={details?.collectionCreator?.role== 'creator'}
          onClick={() => router.push(`/base/profile/${details?.collectionCreator?.userName}`)}
        />
      </ProdutDetailWrapper>
      <CardRow>
        <CardContainer>
          {collectionCards?.length ? (
            collectionCards?.map((data: any) => {
              
              const el = {
                id: data?.id,
                NFT: data?.assetsData?.mainAssetUrl,
                mediaType: data?.assetsData?.mainAssetType,
                image: handleApiImage(data?.userAssetEdition?.profilePicUrl),
                name: data?.assetsData?.name,
                firstName: data?.userAssetEdition?.firstName || '',
                lastName: data?.userAssetEdition?.lastName || '',
                userName: data?.userAssetEdition?.userName || data?.userAssetEdition?.firstName + ' ' + data?.userAssetEdition?.lastName,
                creatorName: data?.assetsData?.assetCreator?.firstName + ' ' + data?.assetsData?.assetCreator?.lastName,
                creatorImage: `${APP_ENV.S3_ASSET_URL}/${data?.assetsData?.assetCreator?.profilePicUrl}`,
                creatorUserName:data?.assetsData?.assetCreator?.userName,
                isVerified: data?.userAssetEdition?.emailVerified,
                price: `${parseFloat(data?.resellPrice)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
                convertedPrice: `$ ${(parseFloat(data?.resellPrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRates?.HBAR?.USD : exchangeRates?.ETH?.USD))?.toFixed(3)}`,
                bidAmount: `${parseFloat(data?.auctionsData?.[0]?.bidAmount)?.toFixed(3)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
                convertedbidAmount: `$ ${(parseFloat(data?.auctionsData?.[0]?.bidAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRates?.HBAR?.USD : exchangeRates?.ETH?.USD))?.toFixed(3)}`,
                saleType: data?.saleType,
                bidderData:data?.auctionsData?.[0]?.bidderData,
                status: data?.auctionsData?.[0]?.status,
                endTime: data?.auctionsData?.[0]?.endTime,
                startTime: data?.auctionsData?.[0]?.startTime,
                getUpdatedNFTs:()=>setCollectionCards(collectionAssets?.assetList),
                isFavorite: data?.isFavorite,
                page:"collections",
                favoriteBtnAction: () =>
                  updateFavoriteDetail({
                    userId: profileData?.id,
                    editionId: data?.id,
                  }),
              }
              
              return <Card key={data.id} vidHeight={24.2} {...el} time={0}></Card>
            })
          ) : (
            <NoData>No data found</NoData>
          )}
        </CardContainer>
      </CardRow>
    </DetailContainer>
  )
}

export default DetailPage
