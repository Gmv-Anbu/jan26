import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Container } from '@apps/customer/styles/CommonStyles'
import Pagination from '@apps/customer/components/pagination/pagination'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader'
import useNft from './useNFt'
import NotFound from '@apps/customer/components/NotFound'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'
import { formatToUSD } from '@apps/customer/utils/helper'

const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyNftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 21rem 0;
  @media screen and (max-width: 768px) {
    padding: 7.5rem 0 15.4rem;
  }
`
const HeadSection = styled.section`
  display: flex;
  justify-content: space-between;
  position: relative;
  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 50px;
    font-style: normal;
    font-weight: 400;
    font-size: 6rem;
    line-height: 104%;
    text-transform: none;
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 24px;
      margin: 30px 0;
    }
  }
`
const ListBox = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
`

const Selector = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 47px;
  border-bottom: 0.2rem solid #e4e4e4;
  .active-h2,
  .not-active-h2 {
    font-style: normal;
    font-size: 1.6rem;
    text-align: center;
    cursor: pointer;
    padding: 0 10px 10px 10px;
    transition: border-bottom 0.2s;
  }
  .active-h2 {
    font-weight: 600;
    line-height: 120%;
    color: #2a7575;
    border-bottom: 0.5rem solid #2a7575;
  }
  .not-active-h2 {
    font-weight: 400;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: #898989;
  }
  @media screen and (max-width: 768px) {
    gap: 24px;
    .active-h2,
    .not-active-h2 {
      font-size: 16px;
      padding: 0 0 10px 0;
    }
  }
`
const GridContianer = styled.div`
  padding: 60px 0 120px 0;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 4.5rem;
  justify-content: flex-start;
  @media screen and (max-width: 1368px) {
    grid-template-columns: auto auto auto;
  }
  @media screen and (max-width: 1050px) {
    grid-template-columns: auto auto;
    justify-content: flex-start;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: 20px;
  }
  @media screen and (max-width: 594px) {
    grid-template-columns: auto;
  }
`
const Line = styled.div`
  display: block;
  width: 100%;
  height: 2px;
  background: #d5d5d5;
  background: radial-gradient(circle, rgba(100, 114, 112, 0.272) 0%, rgba(200, 199, 193, 0) 100%);
  margin-bottom: 4px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const MyNft = () => {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const { nftList, totalPage, refreshPage, isLoading, totalNFT } = useNft({ currentPage })
  const [activeTab, setActiveTab] = useState(1)

  const updatePage = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  if (isLoading) {
    return (
      <FullPageLoader>
        <Loader />
      </FullPageLoader>
    )
  }

  return (
    <MyNftWrapper>
      <Container>
        <HeadSection>
          <h1>MY NFTs</h1>
        </HeadSection>
        <ListBox>
          <Selector>
            <h2 onClick={() => setActiveTab(1)} className={activeTab == 1 ? 'active-h2' : 'not-active-h2'}>
              {`Watch NFTs ( ${totalNFT || 0} )`}
            </h2>
            <h2 onClick={() => setActiveTab(2)} className={activeTab == 2 ? 'active-h2' : 'not-active-h2'}>
              Transferred NFTs (0)
            </h2>
          </Selector>
          {nftList?.length > 0 ? (
            activeTab == 2 ? (
              <NotFound padding="200px 0 156px" mrPadding="60px 0 0 0" />
            ) : activeTab == 1 ? (
              <ListItemsComp items={nftList} totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} />
            ) : null
          ) : (
            <NotFound padding="200px 0 156px" mrPadding="60px 0 0 0" />
          )}
        </ListBox>
      </Container>
    </MyNftWrapper>
  )
}

const CardWrapper = styled.div`
  flex: 0 0 100%;
  box-sizing: border-box;
  max-width: 320px;
  min-width: 320px;
  max-height: 504px;
  min-height: 504px;
  background: #ffffff;
  border: 1.09015px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 50px 0 20px;
  gap: 15px;
  cursor: pointer;
  .image-box {
    position: relative;
    width: 100%;
    min-width: 181px;
    max-height: 230px;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 20px 0;
    overflow: hidden;
    transition: all 0.7s ease-in-out;
  }
  &:hover {
    .image-box {
      transform: scale(1.1);
    }
    .details h3 {
      color: ${({ theme }) => theme.colors.secondary} !important;
    }
  }
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: #111727;
      /* text-transform: uppercase; */
    }
    strong {
      font-weight: 600;
      font-size: 18px;
      color: rgba(132, 138, 139, 1);
      /* text-transform: uppercase; */
    }
    h3 {
      text-align: center;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      color: #111727;
      /* text-transform: uppercase; */
    }
  }
  .line {
    width: 100%;
    height: 1px;
    margin: 2rem 0 1rem 0;
    padding: 1px;
    background: radial-gradient(circle, rgba(65, 173, 155, 0.2723214285714286) 0%, rgba(200, 199, 193, 0) 100%);
  }
  hr {
    position: relative;
    z-index: 2;
    margin-top: 10px;
    border: 0px;
    height: 2px;
    padding: 1px;
    width: 100%;
    background: linear-gradient(90deg, rgba(209, 224, 226, 0) 0%, rgb(209, 224, 226) 52.11%, rgba(209, 224, 226, 0) 100%) !important;
  }
  .btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    .price-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
      gap: 0.5rem;
      h4 {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 140%;
        color: #121212;
      }
      .p-tag {
        font-style: normal;
        font-size: 1.4rem;
        line-height: 140%;
        color: #121212;
        span {
          font-size: 1.4rem;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 342px;
    min-width: 342px;
    min-height: 487px;
    padding: 20px 0;
    .image-box {
      margin: 0 0 0 0;
      max-height: fit-content;
    }
    .details {
      gap: 7px;
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
      }
      strong {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;        
      }
      h3 {
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;
      }
    }
    .btn-box {
      padding-top: 0;
      .price-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: flex-start;
        gap: 0.5rem;
        h4 {
          font-size: 24px;
          font-weight: 700;
          line-height: 34px;
        }
        .p-tag {
          font-style: normal;
          font-weight: 300;
          font-size: 12px;
          line-height: 140%;
          color: #121212;
        }
      }
    }
  }
`
const CardButton = styled.button`
  display: block;
  width: fit-content;
  padding: 1rem 2rem;
  background: #ffffff;
  border: 1px solid #29898b;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 140.02%;
  color: #2a7575;
  @media screen and (max-width: 768px) {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
  }
`

function ListItemsComp({ items, totalPage, currentPage, updatePage }) {
  return (
    <>
      <GridContianer>
        {items.map((product, i) => (
          <Card key={i} data={product} />
        ))}
      </GridContianer>
      <Line></Line>
      {items?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
    </>
  )
}

function Card({ data }) {
  const router = useRouter()
  return (
    <CardWrapper onClick={() => router.push(`/base/my-nft/${data.id}`)}>
      <div className="image-box">
        <Image src={data.image} alt="Product" width={250} height={303} objectFit="contain"/>
      </div>
      <div className="details">
        <p>{data.refName}</p>
        <strong>{data.refNo}</strong>
        <h3>{data.name}</h3>
      </div>
      {/* <div className="line"></div> */}
      <hr></hr>
      <div className="btn-box">
        <div className="price-box">
          {' '}
          <h4>{formatToUSD(data.price)}</h4>
          <p className="p-tag">{/* Avail. Fraction <span>{data.fraction}</span> */}</p>
        </div>
        {/* <CardButton >View Details</CardButton> */}
      </div>
    </CardWrapper>
  )
}
export default MyNft
