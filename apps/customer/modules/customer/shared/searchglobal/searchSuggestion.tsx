import { Key, ReactChild, ReactFragment, ReactNode, ReactPortal, SetStateAction, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import MarketService from '../../../../api/customer/MarketService'
import { getConfig, processCardData, processCollectionData, processFeaturedNFTData } from '../../../../utils/helper'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Avatar from '../avatar/avatar'
import { APP_ENV } from '@apps/customer/config'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { AudioComponent } from '@nft-marketplace/AudioComponent'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'

const SuggestionContainer = styled.div`
  width: 70.5rem;
  position: absolute;
  right: 0;
  // left:1rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  max-height: 71.6rem;
  padding: 1.43rem 3.68rem 5rem 3.68rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  line-height: 3rem;
  box-shadow: 0rem 0rem 20rem 9rem ${({ theme }) => theme.colors.avatarBg};
  overflow-y: auto;
  // box-shadow:"rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 10%) -2px 2px 6px 3px";

  color: ${({ theme }) => theme.colors.fonttitle};
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.navBorderBottom};
  // border: 1px solid white;
  & > svg {
    margin-right: 0.7rem;
  }
  @media screen and (max-width: 1400px) {
    margin: 0 1rem 0 0rem;
  }
  @media screen and (max-width: 768px) {
    width: 39rem;
    margin: 0;
    margin-bottom: 3rem;
  }
`
const NftContainer = styled.div`
  // border-top: 1px solid ${({ theme }) => theme.colors.buttoncolor};
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  padding: 1.2rem;
  font-size: 1.6rem;
  width: 50%;
  height: 40%;
  & {
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
  }
`

const CollectionContainer = styled.div`
  // border-top: 1px solid ${({ theme }) => theme.colors.buttoncolor};
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  padding: 1.2rem;
  font-size: 1.6rem;
`
const CategoryCreator = styled.div`
  // border-top: 1px solid ${({ theme }) => theme.colors.buttoncolor};
  // border-bottom: 1px solid ${({ theme }) => theme.colors.buttoncolor};
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  padding: 1.2rem;
  font-size: 1.6rem;
  // height:20rem;
  // display:flex;
  // flex-direction:column;

  flex-wrap: wrap;
`

const NftOuter = styled.div`
  display: flex;
  justify-content: flex-start;
  &:hover {
    cursor: pointer;
    // border:2px solid white;
    background: ${({ theme }) => theme.colors.copyFromClipboardbg};
    border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
    backdrop-filter: blur(18.0059px);
    // border-radius: 12.2183px;
  }
  padding: 0.8rem 1.5rem 0.8rem 1.5rem;
`
const CreatorThumbnailOuter = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1rem;
  & > :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.shareBtnBg};
    border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
    backdrop-filter: blur(18.0059px);
    // // border-radius: 12.2183px;
  }
`
const ColletionOuter = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1rem;
  span,
  img {
    border: 2px solid ${({ theme }) => theme.colors.shareBtnBorder};
    backdrop-filter: blur(1.5px);
    border-radius: 0.25rem;
  }
  &:hover {
    cursor: pointer;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.copyFromClipboardbg};
    border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
    backdrop-filter: blur(18.0059px);
  }
`
const VideoPreview = styled.div`
  width: 52px;
  height: 60px;
`
const CreateThumbnail = ({ userImg, userName, isVerified, id, totalNFTs, title }: any) => {
  const router = useRouter()
  return (
    <CreatorThumbnailOuter
      key={id}
      onClick={() => {
        router.push(`/base/profile/${userName}`)
      }}
    >
      {userImg ? (
        <Avatar collection={true} withBG={true} atTheRate={false} image={userImg} userName={userName} isVerified={isVerified} />
      ) : (
        <Avatar image={'https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60'} userName={userName} isVerified={isVerified} />
      )}
    </CreatorThumbnailOuter>
  )
}
const NftSearchThumbnail = ({ nftImage, mediaType, nftName, nftId, userName }: any) => {
  const router = useRouter()
  return (
    <ColletionOuter
      key={nftId}
      onClick={() => {
        router.push(`/base/assetDetails?id=${nftId}`)
      }}
    >
      {mediaType === 'video' ? (
        <VideoPreview>
          <VideoComponent filePath={nftImage} height={60} width={52} controls={false} mute={true} autoPlay={true} rounded={3} />
        </VideoPreview>
      ) : mediaType === 'audio' ? (
        <AudioComponent filePath={nftImage} height={49} width={53} controls={false} mute={true} autoPlay={false} imgSrc="/svgs/audio-white.svg" size="small" containerWidth={8} />
      ) : (
        <Image src={`${nftImage}`} className="image-view" alt={`${nftName}`} width={53} height={49} />
      )}
      <div>
        <h3 style={{ fontSize: '1.6rem' }}>{nftName}</h3>
        <p style={{ fontSize: '1.6rem' }}>{userName ? `@${userName}` : ''}</p>
      </div>
    </ColletionOuter>
  )
}
const CollectionSearchThumbnail = ({ id, coverImage, collectID, title, userName }: any) => {
  const router = useRouter()
  return (
    <ColletionOuter
      key={id}
      onClick={() => {
        router.push(`/base/collections/${collectID}`)
      }}
    >
      <Image className="image-view" src={`${coverImage}`} alt={`${coverImage}`} width={53} height={49} />
      <div key={id}>
        <h3 style={{ fontSize: '1.6rem' }}>{title}</h3>
        <p style={{ fontSize: '1.6rem' }}>{userName ? `@${userName}` : ''}</p>
      </div>
    </ColletionOuter>
  )
}
type TSearchResult = {
  collections?: Array<any>
  creators?: Array<any>
  nftAsset?: Array<any>
}

const SearchSuggestion = ({ targetedSearch }: { targetedSearch: string }) => {
  const [searchResult, setSearchResult] = useState<TSearchResult>({})
  const [creatorPermission, setCreatorPermission] = useState<boolean | any>(null)
  const userConfig = useSelector<RootState, any>((state) => state?.userData?.userConfig)

  useEffect(() => {
    const getCreatorConfig = async () => {
      const { permission } = await getConfig(userConfig, 'creator')
      setCreatorPermission(permission)
    }
    getCreatorConfig()
  })

  const globalSearchItems = useCallback(async () => {
    if (targetedSearch !== '') {
      const res = await MarketService.globalSearch({ search: targetedSearch })
      if (res?.status === 200) {
        const { data } = res.data
        setSearchResult(data)
      }
    }
  }, [targetedSearch])

  useEffect(() => {
    globalSearchItems()
  }, [globalSearchItems])

  return (
    <SuggestionContainer>
      <CollectionContainer>
        <CategoryTitle>Collections</CategoryTitle>
        <ListWrapper>
          {Array.isArray(searchResult?.collections) && searchResult.collections.length > 0
            ? searchResult.collections.map((el) => <CollectionSearchThumbnail key={el.id} id={el.id} coverImage={el?.bannerImage} collectID={el.id} title={el.name} userName={el.collectionCreatoruserName} />)
            : `No Collection's found`}
        </ListWrapper>
      </CollectionContainer>
      {creatorPermission && (
        <CategoryCreator className="ByCategoriesCreators">
          <CategoryTitle>{`Creator's`}</CategoryTitle>
          <CreatorWrapper>
            {Array.isArray(searchResult?.creators) && searchResult.creators.length > 0
              ? searchResult.creators.map((el) => <CreateThumbnail userImg={el?.profilePicUrl ? `${APP_ENV.S3_ASSET_URL}/${el?.profilePicUrl}` : null} userName={el?.userName} isVerified={el?.isVerified || false} id={el?.id} key={el?.id} />)
              : `No Creator's found`}
          </CreatorWrapper>
        </CategoryCreator>
      )}
      <CollectionContainer className="nftList">
        <CategoryTitle>Artworks</CategoryTitle>
        <ListWrapper>
          {Array.isArray(searchResult?.nftAsset) && searchResult.nftAsset.length > 0
            ? searchResult.nftAsset.map((el) => {
                return <NftSearchThumbnail key={el?.id} nftImage={el?.mainAssetUrl} mediaType={el?.mainAssetType} nftName={el?.name} nftId={el?.editionId} userName={el?.creatoruserName} />
              })
            : `No NFT's found`}
        </ListWrapper>
      </CollectionContainer>
    </SuggestionContainer>
  )
}

export default SearchSuggestion

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2rem;
  position: realtive;
`
export const ImagePreview = styled.div`
  position: relative;
  span {
    border-radius: 1.5rem;
  }
  height: 100%;
  width: 100%;
  &::after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.colors.gradientLayer};
    border-radius: 1.5rem;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`
const CreatorWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 1.2rem;
`
const CategoryTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.fontcolor};
  font-style: normal;
  font-weight: 400;
  font-size: 1.9rem;
  margin-bottom: 1.68rem;
`
