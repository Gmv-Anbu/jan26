import { handleActivityType, handleApiImage, handleNaming, isImage } from '@apps/customer/utils/helper'
import { AudioComponent } from '@nft-marketplace/AudioComponent'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import styled from 'styled-components'
import Image from 'next/image'
import Router from 'next/router'

import { FlexCenter, Table, TableBody, TableHead, TableImgWrapper, TableRow, TableTD, TableTH, TableWarpper } from '../../styled-components/table'
import { APP_ENV } from '@apps/customer/config'

const VideoPreview = styled.div`
  width: 52px;
  height: 60px;
`
const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`
const ProfilePicAvatar = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  cursor: pointer;
`

const ActivityList = ({ listData }: any) => {
  const myLoader = ({ src, width }: any) => {
    return `/images/customer/demo-preview.png?w=${40}`
  }

  const handleClick = (id: number) => {
    Router.push(`/base/assetDetails?id=${id}`)
  }
  const gotoThisUserProfile = (userName: string) => {
    Router.push(`/base/profile/${userName}`)
  }
  return (
    <TableWarpper>
      <Table>
        <TableHead>
          <TableRow>
            <TableTH>Art Name</TableTH>
            <TableTH>Actions</TableTH>
            <TableTH>Quantity</TableTH>
            <TableTH>From</TableTH>
            <TableTH>To</TableTH>
            <TableTH>Date</TableTH>
          </TableRow>
        </TableHead>
        <TableBody>
          {listData?.map((listItem: any, i: number) => {
            const username = APP_ENV?.NETWORK_TYPE == 'HEDERA' ? listItem?.userData?.userName : listItem?.transactionData?.userData?.userName
            const walletAddress = APP_ENV?.NETWORK_TYPE == 'HEDERA' ? listItem?.userData?.walletAddress : listItem?.transactionData?.userData?.walletAddress
            const firstName = APP_ENV?.NETWORK_TYPE == 'HEDERA' ? listItem?.userData?.firstName : listItem?.transactionData?.userData?.firstName
            const lastName = APP_ENV?.NETWORK_TYPE == 'HEDERA' ? listItem?.userData?.lastName : listItem?.transactionData?.userData?.lastName

            return (
              <TableRow key={i}>
                <TableTD>
                  <FlexCenter onClick={() => handleClick(listItem?.editionId)}>
                    <TableImgWrapper>
                      {isImage(listItem?.assetsData?.mainAssetUrl) == true || listItem?.assetsData?.mainAssetType === 'images' ? (
                        <Image src={listItem?.assetsData?.mainAssetUrl} alt="Img" width="52" height="52" />
                      ) : listItem?.assetsData?.mainAssetType === 'video' ? (
                        <VideoComponent width={60} height={50} filePath={listItem?.assetsData?.mainAssetUrl} mute={true} autoPlay={true} />
                      ) : listItem?.assetsData?.mainAssetType === 'audio' ? (
                        <AudioComponent filePath={listItem?.assetsData?.mainAssetUrl} height={40} width={40} controls={false} mute={true} autoPlay={false} imgSrc="/svgs/audio-white.svg" size="small" />
                      ) : null}
                    </TableImgWrapper>
                    <span>{listItem?.assetsData?.name}</span>
                  </FlexCenter>
                </TableTD>
                <TableTD>
                  <ActionWrapper>
                    <div>
                      <ProfilePicAvatar onClick={() => gotoThisUserProfile(listItem?.transactionData?.userData?.userName)}>
                        <Image src={listItem?.transactionData?.userData?.profilePicUrl ? handleApiImage(listItem?.transactionData?.userData?.profilePicUrl) : '/images/customer/avatar.png'} alt="Product Image" width="40" height="40" className="img" />
                      </ProfilePicAvatar>
                    </div>
                    <div>
                      <p style={{ marginRight: 5 }}>{handleActivityType(listItem?.activity)}</p>
                      <p className="user-amount">
                        {`${handleNaming(firstName, lastName, username, walletAddress)}`}
                        <span>{listItem.amount}</span>
                      </p>
                    </div>
                  </ActionWrapper>
                </TableTD>
                <TableTD>
                  <p>{listItem?.transactionData?.quantity}</p>
                </TableTD>
                <TableTD>
                  <p>{APP_ENV.NETWORK_TYPE == 'HEDERA' ? `${listItem?.transactionData?.from}` : `${listItem?.transactionData?.from.substring(0, 5)}...`}</p>
                </TableTD>
                <TableTD>
                  <p>{APP_ENV.NETWORK_TYPE == 'HEDERA' ? `${listItem?.transactionData?.to}` : `${listItem?.transactionData?.to.substring(0, 5)}...`}</p>
                </TableTD>
                <TableTD>
                  <p>{listItem?.transactionData?.updatedAt.substring(0, 10)}</p>
                </TableTD>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableWarpper>
  )
}

export default ActivityList
