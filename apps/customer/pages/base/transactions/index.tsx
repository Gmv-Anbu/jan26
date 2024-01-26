import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { RootState } from '@apps/customer/redux/store'
import { useSelector } from 'react-redux'
import API from '@apps/customer/api/customer/index'
import { formatToUSD, handleApiImage, truncateEllipsisMiddle } from '@apps/customer/utils/helper'
import NotFound from '@apps/customer/components/NotFound'
import { useWeb3Context } from '@nft-marketplace/wallet-selector'
import AuctionCard from '@apps/customer/components/cardDesigns/auctionCard'
import moment from 'moment'
import Link from 'next/link'
import Select from 'react-select'
import Pagination from '@apps/customer/components/pagination/pagination'
import TransactionFilter from '@apps/customer/components/filterModal/transactionFilter'

const MainContainer = styled.div`
  width: 100%;
  margin: 20rem 0 70px 0;
  @media screen and (max-width: 780px) {
    margin: 13rem 0 4rem;
  }
`
const WrapperContainer = styled.div`
    width: 100%;
    max-width: 144rem;
    margin: 0 auto;
    @media screen and (max-width: 1450px) {
      max-width: 154rem;
  }
    @media screen and (max-width: 1360px) {
        max-width: 135rem;
    }
    @media screen and (max-width: 1240px) {
      max-width: 125rem;
  }
    @media screen and (max-width: 991px) {
        max-width: 115rem;
    }
    @media screen and (max-width: 780px) {
        padding: 0px 24px;
    }
    @media screen and (max-width: 575px) {
        max-width: 54rem;
    }
    h1 {
        color: #111727;
        margin-bottom: 15px;
    }
`
const TransactionTableWrapper = styled.div`

`
const TableHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    h3 {
        font-size: 24px;
        font-weight: 600;
        line-height: 29px;
        color: #111727;
        margin-right: 24px;
    }
    input {
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        color: #5C5C5C;
        padding: 12px 18px;
        border: 1px solid #E0E0E0;
    }
    .react-select__control {
        width: 214px;
        height: 44px;
        border-radius: 0;
        .react-select__placeholder, .react-select__single-value {
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            color: #5C5C5C;
        }
    }
    .react-select__menu {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .react-select__menu-list {
        margin: 0;
        padding: 10px;
        overflow: hidden;
    }
    .react-select__option {
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.25px;     
        color: #21393A;    
    }
    .react-select__option--is-selected {
        color: #2A7575;
        background: #F4F9F9;
        font-weight: 700;
    }
    .react-select__option--is-focused {
        background: #F4F9F9;
    }
`
const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 9px;
  max-height: 44px;
  max-width: 44px;
  border: 1.5px solid #D1E0E2;
  margin-left: 24px;
  p {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
  }
  @media screen and (max-width: 549px) {
    margin-left: 10px;
  }
`

const TableContent = styled.div`
  width: 100%;
  table {
    border-collapse: collapse;
    width: 100%;
    tr {
        border-collapse: collapse;
    }
    td, th {
        padding: 24px 32px;
        text-align: left;
        border-collapse: collapse;
    }
    th {
        background: #B8C8CA;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #272727;
    }
    td {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: #000335;
    }
  }
`

const MyTransactionsPage = () => {

    const [transactions, setTransactions] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    let filterOG = {
        start: '',
        end: ''
    }
    const [filterData, setFilterData] = useState(filterOG)
    const [displayFilter, setDisplayFilter] = useState(false);
    const openFilter = () => setDisplayFilter(true)
    const closeFilter = () => setDisplayFilter(false) 

    const updateFilter = () => {
        closeFilter()
    }

    const options = [
        { value: 'art', label: 'Art' },
        { value: 'music', label: 'Music' },
        { value: 'sports', label: 'Sports' },
    ]

    const handleSelect = (e) => {
        console.log('asdasdasd', e)
    }

    const updatePage = useCallback((page) => {
        setCurrentPage(page)
        window?.scrollTo(0, 0);
    }, [])

    const getTransactionsData = () => {
        let limit = 8
        API.getUserTransactions(currentPage, limit, filterData)
        .then(res => {
            console.log('getTransactionsData asdasd', res)
            if(res?.data?.data?.list?.rows) {
                setTransactions(res?.data?.data?.list?.rows)
                setTotalPage(Math.ceil(res?.data?.data?.pageMeta?.totalCount / limit))
            }
        })
        .catch(res => {
            console.log('asdasd', res)
        })
    }
    
    useEffect(() => {
        if(filterData?.start === '' && filterData?.end === '') {
            getTransactionsData()
        } else if(filterData?.start && filterData?.end) {
            getTransactionsData()
        }
    },[currentPage, filterData])

    console.log('filterData', filterData)

    return (
        <MainContainer>
            {displayFilter ? <TransactionFilter show={displayFilter} applyFilter={updateFilter} filterData={filterData} setFilterData={setFilterData} closeFilter={closeFilter} /> : null}
            <WrapperContainer>
                <h1>My Transactions</h1>
                <TransactionTableWrapper>
                    <TableHeader>
                        <div className='d-flex-aic'>
                            <h3>All Transactions</h3>
                            {/* <input type="text" placeholder='Search' /> */}
                        </div>
                        <div className='d-flex-aic'>
                            {/* <Select
                                placeholder="Sort by"
                                classNamePrefix="react-select"
                                menuPlacement="auto"
                                maxMenuHeight={300}
                                options={options}
                                isSearchable={false}
                                name="sort"
                                onChange={handleSelect}
                            /> */}
                            <FilterWrapper onClick={openFilter}>
                                <Icon name="filter" />
                            </FilterWrapper>
                        </div>
                    </TableHeader>
                    {transactions?.length 
                    ? <TableContent>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    {/* <th>Image</th>
                                    <th>Brand name</th>
                                    <th>Ref. Number</th>
                                    <th>Ref. Name</th>
                                    <th>Category</th> */}
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>No. of Orders</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.length 
                                ?  transactions.map(el => {
                                    return (
                                        <tr key={el?.id}>
                                            <td>{el?.id}</td>
                                            <td>
                                                {el?.type === "eventTicketPurchase" 
                                                ? 'Event Ticket'
                                                : el?.type === "assetBuy" 
                                                    ? 'Buy' 
                                                    : 'Auction'}
                                            </td>
                                            <td>{formatToUSD(el?.amount, 2)}</td>
                                            <td>{el?.orderData?.length}</td>
                                            <td>{moment(el?.createdAt).format('MM/DD/YYYY')}</td>
                                            <td>
                                                <div className='d-flex-aic-jcsb'>
                                                    {el?.status === "payment_complete" 
                                                    ? <div className='d-flex-aic'>
                                                        <Image width={16} height={16} src={`/svgs/success-green.svg`} />
                                                        &nbsp;Payment Complete
                                                    </div>
                                                    : <div className='d-flex-aic'>
                                                        <Image width={16} height={16} src={`/svgs/pending.svg`} />
                                                        &nbsp;Pending
                                                    </div>}
                                                    {/* <ButtonPrimary>Track your Order</ButtonPrimary> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                : null}
                            </tbody>
                     </table>
                        {transactions?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
                    </TableContent>
                    : <NotFound padding="0" mrPadding="0" />}
                </TransactionTableWrapper>
            </WrapperContainer>
        </MainContainer>
    )
}

export default MyTransactionsPage