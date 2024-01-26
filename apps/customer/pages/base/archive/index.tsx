import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Container } from '@apps/customer/styles/CommonStyles'
import Pagination from '@apps/customer/components/pagination/pagination'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader'

import NotFound from '@apps/customer/components/NotFound'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'
import useNft from '../my-nft/useNFt'
import { ModalService } from '@nft-marketplace/modal'
import ArchiveModal from '@apps/customer/components/FormModal/archiveModal'

const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyNftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 21rem 0 10rem;
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
    text-transform: uppercase;
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
  padding: 0px 0 80px 0;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 6rem 4.5rem;
  /* place-content: center; */
  @media screen and (max-width: 1368px) {
    grid-template-columns: auto auto auto;
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

const Archive = () => {
    const router = useRouter()

    const [currentPage, setCurrentPage] = useState(1)
    const { nftList, totalPage, refreshPage, isLoading, totalNFT } = useNft({ currentPage })
    const [activeTab, setActiveTab] = useState(1)

    const auctionCards = [
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-3.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-2.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-4.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-1.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-3.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-2.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-4.png'  },
        { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-1.png'  },
    ]

    const showArchiveModal = () =>
    ModalService.open((modalProps: any) =>
      <ArchiveModal close={modalProps.close} />
    )

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
                    <h1>Archive</h1>
                </HeadSection>
                <ListBox>
                {auctionCards?.length ? (
                   <ListItemsComp items={auctionCards} showArchiveModal={showArchiveModal} totalPage={5} currentPage={1} updatePage={updatePage} />
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
  // max-height: 504px;
  // min-height: 504px;
  background: #ffffff;
  border: 1.09015px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px;
  gap: 15px;
  cursor: pointer;
  .image-box {
    position: relative;
    width: 100%;
    max-width: 148px;
    max-height: 220px;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
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
    justify-content: space-between;
    .price-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
      h4 {
        color: #121212;
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
      }
      p {
        font-size: 16px;
        font-weight: 300;
        line-height: 20px;        
        color: #6B6B6B;
      }
    }
  }
  .time-left {
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #8A8A8A;
    margin-bottom: 7px;
    span {
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        color: #000000;
        padding: 5px 12px;
        border-radius: 10px;
        margin-left: 10px;
        box-shadow: 0px 2px 6px 0px #0000000F;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 342px;
    min-width: 342px;
    .details {
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
      .price-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: flex-start;
        gap: 0.5rem;
        h4 {
          font-size: 18px;
          font-weight: 700;
          line-height: 25px;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
  }
`
const CardButton = styled.button`
    position: relative;
    z-index: 5;
    display: block;
    width: 102px;
    height: 29px;
    background: #ffffff;
    border: 1px solid #2A7575;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #2A7575;
`

function ListItemsComp({ items, showArchiveModal, totalPage, currentPage, updatePage }) {
  return (
    <>
      <GridContianer>
        {items.map((product, i) => {
          if(window.screen.availWidth < 549) {
            if(i < 4) {
              return <Card key={i} data={product} showArchiveModal={showArchiveModal} />
            }
          } else {
            return <Card key={i} data={product} showArchiveModal={showArchiveModal} />
          }
        })}
      </GridContianer>
      <Line></Line>
      {items?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
    </>
  )
}

function Card({ data, showArchiveModal }) {
  const router = useRouter()
  return (
    <CardWrapper>
      <div className="image-box" onClick={() => router.push(`/base/archive/355`)}>
        <Image src={data.image} alt="Product" width={250} height={303} objectFit="contain"/>
      </div>
      <div className="details">
        <p>{data.refName}</p>
        <strong>{data.refNo}</strong>
        <h3 onClick={() => router.push(`/base/archive/355`)}>{data.name}</h3>
      </div>
      {/* <div className="line"></div> */}
      <hr></hr>
      <div className="btn-box">
        <div className="price-box">
          {' '}
          <h4>$ {data.price}</h4>
          <p>ETH {data.ethPrice}</p>
        </div>
        <CardButton onClick={() => showArchiveModal()}>Make an offer</CardButton>
      </div>
    </CardWrapper>
  )
}
export default Archive
