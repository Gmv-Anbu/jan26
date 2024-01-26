import { IsImage } from '@apps/customer/utils/helper'
import { ButtonGradientPrimary } from '@apps/customer/modules/shared/components/button/button'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import Image from 'next/image'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { AssetInfoWrapper, CardContainer, EditionInfo, Footer, ImagePreview, ProfileContainer, ProfileImage, UserName, VideoPreview, AudioPreview } from './PruchasedNFTCard.styled'
import { IPurchasedNFTCard } from './PurchasedNFTCard.model'
import { useRouter } from 'next/router'
import { APP_ENV } from '@apps/customer/config'
import { AudioComponent } from '@nft-marketplace/AudioComponent'

const BtnWrapper = styled.div`
  margin: 3rem 0 0 0;
  &.mb-3 {
    margin-bottom: 3rem;
  }
`

const EditWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 2rem;
  top: 2rem;
`

const EditIconWrapper = styled.div`
  height: 3rem;
  width: 3rem;
  min-width: 3rem;
  min-height: 3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.auctionBoxbg};
  border: 1px solid ${({ theme }) => theme.colors.iconContainerColor};
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.11));
  border-radius: 100%;
  margin-left: 3px;
  cursor: pointer;
  img {
    width: 11px !important;
    height: 11px !important;
    min-width: 11px;
    max-width: 11px;
    min-height: 11px;
    max-height: 11px;
  }
`

const myLoader = ({ src }: any) => {
  return `${src}?w=${280}`
}

function PurchasedNFTCard({ data, primaryBtnAction, onClick, primaryBtnLabel = 'Resell NFT', showPrimaryBtn = true, showEditButton, editBtnAction, deleteBtnAction }: IPurchasedNFTCard) {
  const router = useRouter()

  return (
    <CardContainer
      key={data.id}
      // onClick={() => router.push({
      //     pathname: `/base/assetDetails`,
      //     query: {
      //       id: data?.id,
      //     },
      //   })}
    >
      {data?.mediaType === 'images' ? (
        <ImagePreview onClick={onClick}>
          <Image objectFit="cover" layout="responsive" className="nft-card-image" loader={myLoader} src={data?.assetImg || ''} width={300} height={285} alt="NFT" />
        </ImagePreview>
      ) : // <ImagePreview src={data?.assetImg || ''}/>
      // </ImagePreview>
      data?.mediaType === 'video' ? (
        <VideoPreview onClick={onClick}>
          <VideoComponent filePath={data?.assetImg} height={285} width={300} controls={false} mute={true} autoPlay={true} />
        </VideoPreview>
      ) : (
        <AudioPreview onClick={onClick}>
          <AudioComponent filePath={data?.assetImg} height={285} width={250} controls={false} mute={true} autoPlay={false} imgSrc="/svgs/audio-white.svg" />
        </AudioPreview>
        
      )}

      {showEditButton && (
        <EditWrapper>
          {/* <EditIconWrapper onClick={(e) => deleteBtnAction(e)}>
                    <Image src="/svgs/delete.svg" width="710" height="200" alt="setting-cover" />
                </EditIconWrapper> */}
          <EditIconWrapper onClick={(e) => editBtnAction(e)}>
            <Image src="/svgs/pen-tool.svg" width="710" height="200" alt="setting-cover" />
          </EditIconWrapper>
        </EditWrapper>
      )}

      <ProfileContainer>
        <ProfileImage src={data?.profilePic || '/images/shared/user-placeholder.png?w=34'} />
        <UserName>{data.userName || ''}</UserName>
      </ProfileContainer>

      {/* button reused onSale and collection tab_ sharing_common_container_ */}

      {showPrimaryBtn && (
        <BtnWrapper>
          <ButtonGradientPrimary
            blockBtn
            size={`xm`}
            onClick={primaryBtnAction}
            //         onClick={
            //             ()=>{
            //                     router.push({
            //                         pathname:`/base/resellArtwork`,
            //                         query:{
            //                             id:assetsData.id
            //                                 }

            //                         })
            //                 }
            // }
          >
            {primaryBtnLabel}
          </ButtonGradientPrimary>
        </BtnWrapper>
      )}
      <Footer>
        <AssetInfoWrapper>
          <p>{data?.name?.length > 15 ? data?.name.slice(0, 15) + '...' : data?.name}</p>
          <EditionInfo>{`Token ID : ${data?.id}`}</EditionInfo>
          <EditionInfo>{`${data?.price} ${APP_ENV.BASE_CRYPTO_CURRENCY}`}</EditionInfo>
          {data?.collectedOn ? <EditionInfo>{`Collected on ${data?.collectedOn}`}</EditionInfo> : null}
        </AssetInfoWrapper>
      </Footer>
    </CardContainer>
  )
}

export default PurchasedNFTCard
