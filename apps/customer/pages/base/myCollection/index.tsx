import useCollection from '@apps/customer/modules/customer/base/collections/useCollection'
import ICard from '@apps/customer/modules/customer/shared/card/card.interface'
import CollectionCard from '@apps/customer/modules/customer/shared/collectionCard'
import { ButtonGradientPrimary } from '@apps/customer/modules/shared/components/button/button'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import API from '../../../api/customer/index'

const SectionComp = styled.section`
  padding: 10rem 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  @media screen and (max-width: 768px) {
    padding: 6rem 0;
  }
`
const SectionHeading = styled.h2`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 4rem;
  font-weight: 600;
  line-height: 6rem;
  margin: 0;
  @media screen and (max-width: 600px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`
const FLexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  @media screen and (max-width: 520px) {
    margin-bottom: 1rem;
    display: block;
  }
  @media screen and (max-width: 524px) {
    display: flex;
    flex-wrap: wrap;
  }
`
const Data = styled.span`
  margin-left: 1rem;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.fontprimary};
`;
const CardRow = styled.div`
  margin: 0 -1rem;
`
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  & > div {
    margin: 0rem 1rem 7rem;
    @media screen and (max-width: 600px) {
      margin: 0 auto;
    }
  }
`
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Text = styled.span`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.fontdark};
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  @media screen and (max-width: 524px) {
    font-size: 12px;
  }
`

interface CollectionDetails {
  name: string
  id: number
  bannerImage: string
  assetCount: string
  collectionCreator: {
    profilePicUrl: string
    userName: string
    isVerified: boolean
  }
}
const MyCreateCollection = () => {
  const router = useRouter()
  const [collectionData, setCollectionData] = useState([])
  const [page, setPage] = useState(1)

  const goToDetailsPage = () => {
    router.push('/base/myCollection/collectionFormCustomer')
  }
  const items = 10

  useEffect(() => {
    API.getMyCollectionData(page, items).then((res) => {
      setCollectionData(res?.data?.data?.collectionList)
    })
  }, [])

  return (
    <>
      <SectionComp>
        <FLexSpaceBetween>
          <SectionHeading>My Collection</SectionHeading>
          <BtnWrapper>
            <ButtonGradientPrimary onClick={goToDetailsPage} fs="1.4" size="md">
              {'Create Collection'}
            </ButtonGradientPrimary>
          </BtnWrapper>
        </FLexSpaceBetween>
        <Text>Create and manage collections of unique NFTs to share and sell</Text>
        <CardRow>
          <CardContainer>
            <>
              {collectionData?.map((data: CollectionDetails, index: number) => (
                <CollectionCard
                  key={index}
                  onClick={() => {
                    router.push(`/base/collections/${data?.id}`)
                  }}
                  id={data?.id}
                  totalNFTs={data?.assetCount}
                  title={data?.name}
                  coverImg={data?.bannerImage}
                  userImg={`${process.env.NEXT_PUBLIC_ASSET_S3}/${data?.collectionCreator?.profilePicUrl}`}
                  userName={data?.collectionCreator?.userName}
                  isVerified={data?.collectionCreator?.isVerified}
                ></CollectionCard>
              ))}
            </>

            {!collectionData?.length && <Data>No Data Found</Data>}
          </CardContainer>
        </CardRow>
      </SectionComp>
    </>
  )
}

export default MyCreateCollection
