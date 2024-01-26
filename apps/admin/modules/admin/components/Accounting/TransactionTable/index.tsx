import React from 'react'
import { Header, HeaderTitle, Body, TabMenu, Tabs, TabList, TabBox, VerticalBar, StatusCircle, FlexRow, StatusText, ArtImage, Label, Container__2, Label_1, WebHref, FilterSection, VideoWrapper } from './tableStyle'
import { Table } from '@nft-marketplace/table'
import styled from 'styled-components'
import API from '../../../../../api/admin'
import { APP_ENV } from '../../../../../config'
import moment from 'moment'
import TablePagination from '@apps/admin/modules/shared/components/pagination'
import { DateSelectBox } from '../../../styled-components/dashboardStyle'
import TableSearch from '../../inputElements/tableSearch'
import { FilterButton, Icon } from 'libs/table/src/lib/tableStyles'
import ArtWorkFilterModel from '../../../artwork/artWorkFilterModel'
import { ModalService } from '@nft-marketplace/modal'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { AudioComponent } from '@nft-marketplace/AudioComponent'
import { formatToUSD } from '@apps/admin/utils/helper'

const { useState, useEffect } = React

// Avatar iamge
export function handleApiImage(str) {
  if (str) {
    return process.env.NEXT_PUBLIC_ASSET_S3 + '/' + str
  }
  return null
}

const TransactionTable = (props: any) => {
  const [ToggleState, setToggleState] = useState<string>('assetBuy')
  const [showModal, setShowModal] = useState(false)
  const [transactionsList, setTransactionsList] = useState<any>([])
  const [page, setPage] = useState<any>(1)
  const [transactionDateSelect, setTransactionDateSelect] = useState<string>('year')
  const [pageLimit] = useState(10)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterData, setFilterData] = useState(props?.filterData)
  const queryHandler = (e: any) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const getTransactionsData = (page: number, limit = 10) => {
    let start
    let end
    setShowLoader(true)

    if (props?.purpose == 'filter') {
      start = props?.filterData?.from
      end = props?.filterData?.to
    } else {
      const { startDate, endDate } = getFilters()
      start = startDate
      end = endDate
    }
    const filter = {
      type: ToggleState,
      orderBy: 'desc',
      sortBy: 'createdAt',
    }
    let query = `?page=${page}&items=${limit}&start=${start}&end=${end}&filter=${JSON.stringify(filter)}`
    if (searchQuery) {
      query += `&search=${searchQuery}`
    }
    API.getTransactions(query)
      .then((res) => {
        setPage(page)
        setShowLoader(false)
        console.log('res?.data?.dataasdasdasdasdads', res?.data?.data)
        if (res?.data?.data) {
          setTransactionsList(res?.data?.data)
        }
      })
      .catch((err) => {
        setShowLoader(false)
        console.log(err)
      })
  }

  const toggleTab = (type: string) => {
    setToggleState(type)
    setPage(1)
  }

  const applyFilter = (data: any) => {
    if (data.from) {
      data.from = moment(data.from).startOf('day').toString()
    }
    if (data.to) {
      data.to = moment(data.to).endOf('day').toString()
    }
    setFilterData(data)
    // getTransactionsData(page, 10);
  }

  const resetFilter = (data: any) => {
    setFilterData(data)
  }

  const getFilters = () => {
    // Common function to get startdate, enddate and groupby for date select box
    let startDate: any, endDate: any, groupby: string, type: string
    const today: any = moment()
    switch (transactionDateSelect) {
      case 'week':
        startDate = moment(today.startOf('week')).toString()
        endDate = moment(today.endOf('week')).toString()
        groupby = 'day'
        break

      case 'month':
        startDate = moment().startOf('month').toString()
        endDate = moment().endOf('month').toString()
        groupby = 'week'
        break
      case 'year':
        startDate = moment().startOf('year').toString()
        endDate = moment().endOf('year').toString()
        groupby = 'day'
        break

      case 'day':
        startDate = moment().startOf('day').toString()
        endDate = moment().endOf('day').toString()
        groupby = 'day'
        break

      default:
        startDate = moment(today.startOf('week')).toString()
        endDate = moment(today.endOf('week')).toString()
        groupby = 'day'
        break
    }
    return { startDate, endDate, groupby, type }
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  useEffect(() => {
    setPage(1)
  }, [props?.filterData])

  useEffect(() => {
    const getData = setTimeout(() => {
      getTransactionsData(page, pageLimit)
    }, 2000)

    return () => clearTimeout(getData)
  }, [searchQuery, page, props?.filterData])

  useEffect(() => {
    getTransactionsData(page)
  }, [transactionDateSelect, ToggleState, page])

  const tableContainer = (
    <>
      <Container__2>
        <Header>
          <HeaderTitle>Recent Transactions</HeaderTitle>
          <TabMenu>
            <Tabs>
              <TabBox>
                <TabList onClick={() => toggleTab('assetBuy')} active={ToggleState === 'assetBuy'} width={'42px'}>
                  Buy
                  {ToggleState === 'assetBuy' ? <VerticalBar></VerticalBar> : null}
                </TabList>
                <TabList onClick={() => toggleTab('auctionPayment')} active={ToggleState === 'auctionPayment'} width={'85px'}>
                  Auction
                  {ToggleState === 'auctionPayment' ? <VerticalBar></VerticalBar> : null}
                </TabList>
                {/* <TabList onClick={() => toggleTab('bid')} active={ToggleState === 'bid'} width={'30x'}>
                  Bid
                  {ToggleState === 'bid' ? <VerticalBar></VerticalBar> : null}
                </TabList> */}
              </TabBox>
            </Tabs>
            <FilterSection>
              <TableSearch placeholder="Search" value={searchQuery || ''} onChange={queryHandler} />
              <FilterButton
                onClick={(e) => {
                  e.preventDefault()
                  setModalOpen(true)
                  props.clicked(true)
                }}
              >
                <Icon xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="-287.75 385.885 27.219 21.063">
                  <path d="M-262.542 389.734h-11.625c-.442-1.618-1.91-2.817-3.667-2.817-1.756 0-3.224 1.199-3.667 2.817h-4.234a1 1 0 100 2h4.234c.443 1.617 1.91 2.816 3.667 2.816s3.224-1.199 3.667-2.816h11.625a1 1 0 100-2zm-15.292 2.816a1.817 1.817 0 110-3.633 1.817 1.817 0 010 3.633zM-286.735 402.109a1 1 0 001 1h11.625c.443 1.617 1.91 2.816 3.667 2.816 1.756 0 3.224-1.199 3.667-2.816h4.234a1 1 0 100-2h-4.234c-.443-1.618-1.91-2.817-3.667-2.817-1.756 0-3.225 1.199-3.667 2.817h-11.625a1 1 0 00-1 1zm14.475 0a1.817 1.817 0 113.634 0 1.817 1.817 0 01-3.634 0z"></path>
                </Icon>
                Filter
              </FilterButton>
              {/* <DateSelectBox
                name="date"
                id="revenuDate"
                onChange={(e) => {
                  setTransactionDateSelect(e.target.value)
                  setPage(1)
                }}
              >
                <option value="year">This year</option>
                <option value="month">This month</option>
                <option value="week">This week</option>
                <option value="day">Today</option>
              </DateSelectBox> */}
            </FilterSection>
          </TabMenu>
        </Header>
        <Body>
          {' '}
          <Table columns={listingTable} data={transactionsList?.list?.rows} showLoader={showLoader} />
        </Body>
        {transactionsList?.list?.rows?.length ? <TablePagination total={transactionsList?.pageMeta?.totalCount} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
      </Container__2>
      {modalOpen == true && <ArtWorkFilterModel data={filterData} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter}></ArtWorkFilterModel>}
    </>
  )

  return tableContainer
}

export default TransactionTable

const listingTable = [
  {
    id: 1, title: 'Transaction ID',  key: 'id',
    render: (key: any) => (
      <FlexRow>
        <Label_1>{key?.id}</Label_1>
      </FlexRow>
    ),
  },
  {
    id: 2,
    title: 'Username',
    key: 'artist_name',
    render: (key: any) => (
      <FlexRow>
        <ArtImage src={handleApiImage(key?.userData?.profilePicUrl) || '/images/shared/user-placeholder-black.png'} alt="art" />
        <Label_1>{key?.userData?.userName}</Label_1>
      </FlexRow>
    ),
  },
  // {
  //   id: 3,
  //   title: 'Asset Name',
  //   key: 'artwork_name',
  //   render: (key: any) => (
  //     <FlexRow>
  //       <FlexRow>
  //         <ArtImage src={key?.editionData?.assetsData?.mainAssetUrl} alt="art" />
  //         <Label>{key?.editionData?.assetsData?.name + ` (${key?.tokenId})`}</Label>
  //       </FlexRow>
  //     </FlexRow>
  //   ),
  // },
  // {
  //   id: 4, title: 'Brand Name',  key: 'brandName',
  //   render: (key: any) => (
  //     <FlexRow>
  //       <Label_1>{key?.id}</Label_1>
  //     </FlexRow>
  //   ),
  // },
  // {
  //   id: 5, title: 'Reference Number',  key: 'refNo',
  //   render: (key: any) => (
  //     <FlexRow>
  //       <Label_1>{key?.id}</Label_1>
  //     </FlexRow>
  //   ),
  // },
  // {
  //   id: 6, title: 'Reference Name',  key: 'refName',
  //   render: (key: any) => (
  //     <FlexRow>
  //       <Label_1>{key?.id}</Label_1>
  //     </FlexRow>
  //   ),
  // },
  {
    id: 7,
    title: 'Price',
    key: 'price',
    render: (key: any) => (
      <FlexRow>
        <Label_1>{formatToUSD(key?.amount, 2)}</Label_1>
      </FlexRow>
    ),
  },
  {
    id: 8,
    title: 'No. of orders',
    key: 'order',
    render: (key: any) => (
      <FlexRow>
        <Label_1>{key?.orderData?.length}</Label_1>
      </FlexRow>
    ),
  },
  // {
  //   id: 8,
  //   title: 'Royalty Commission',
  //   key: 'royalty_commission',
  //   render: (key: any) => (
  //     <>
  //       <FlexRow>
  //         <Label_1>
  //           {key?.saleCategory?.toUpperCase() === 'PRIMARY'
  //             ? '0'
  //             : ((Number(key?.childTxns?.find((data) => data.type ==="royalty")?.value)))?.toFixed(5) + ' ' + APP_ENV.BASE_CURRENCY_CODE + ' (' + key?.editionData?.assetsData?.royaltyPercentage + ' %)'}
  //         </Label_1>
  //       </FlexRow>
  //     </>
  //   ),
  // },
  // {
  //   id: 9,
  //   title: 'Platform Commission',
  //   key: 'platform_commission',
  //   render: (key: any) => {
  //     const platformValue = key?.childTxns?.find((data) => data.type === 'platform_fee')?.value
  //     return (
  //       <>
  //         <FlexRow>
  //           <Label_1>{platformValue ? `${Number(platformValue)?.toFixed(5)} ${APP_ENV.BASE_CURRENCY_CODE}` : '- - -'}</Label_1>
  //         </FlexRow>
  //       </>
  //     )
  //   },
  // },
  {
    id: 10,
    title: 'Date',
    key: 'registered_date',
    render: (key: any) => (
      <>
        <FlexRow>
          <Label>{moment(key?.updatedAt).format('DD-MM-YYYY')}</Label>
        </FlexRow>
      </>
    ),
  },
  {
    id: 11,
    title: 'Time',
    key: 'registered_time',
    render: (key: any) => (
      <>
        <FlexRow>
          <Label>{moment(key?.updatedAt).format('hh:mm:ss a')}</Label>
        </FlexRow>
      </>
    ),
  },
  {
    id: 12,
    title: 'Status',
    key: 'collection_name',
    render: (key: any) => (
      <>
        <FlexRow>
        {key?.status == 'paymentComplete' || key?.status == 'payment_complete' 
        ? <>
        <StatusCircle></StatusCircle>
        <StatusText>Success</StatusText>
        </> 
        : <StatusText>Pending</StatusText>}
        </FlexRow>
      </>
    ),
  },
]

const bidTable = [
  {
    id: 1,
    title: 'Transaction ID',
    key: 'token_id',
    render: (key: any) => (
      <>
        <FlexRow>
          <Label_1> {key?.id}</Label_1>
          {/* <ArtImage
            src={key?.editionData?.assetsData?.name}
            alt="art"
          /> */}
        </FlexRow>
      </>
    ),
  },
  {
    id: 2,
    title: 'Username',
    key: 'artist_name',
    render: (key: any) => (
      <>
        <WebHref href={`${APP_ENV.CUSTOMER_WEB_URL}base/profile/${key?.userData?.userName}`} target="_blank" rel="noopener">
          <FlexRow>
            <ArtImage
              // src={`${process.env.NEXT_PUBLIC_ASSET_S3}/${key?.userData?.bannerImage}`}
              src={handleApiImage(key?.userData?.profilePicUrl) || '/images/shared/user-placeholder-black.png'}
              alt="art"
            />
            <Label_1>{key?.userData?.userName}</Label_1>
          </FlexRow>
        </WebHref>
      </>
    ),
  },
  {
    id: 3,
    title: 'Asset Name',
    key: 'artwork_name',
    render: (key: any) => (
      <>
        <FlexRow>
          <WebHref href={`${APP_ENV.CUSTOMER_WEB_URL}base/assetDetails?id=${key?.editionData?.id}`} target="_blank" rel="noopener">
            <FlexRow>
              <ArtImage src={key?.editionData?.assetsData?.mainAssetUrl} alt="art" />
              <Label>{key?.editionData?.assetsData?.name + ` (${key?.tokenId})`}</Label>
            </FlexRow>
          </WebHref>
        </FlexRow>
      </>
    ),
  },
  {
    id: 4,
    title: 'Price',
    key: 'price',
    render: (key: any) => (
      <>
        <FlexRow>
          <Label_1>{Number(key?.value)?.toFixed(5) + ' ' + APP_ENV.BASE_CURRENCY_CODE}</Label_1>
        </FlexRow>
      </>
    ),
  },
  {
    id: 5,
    title: 'Date',
    key: 'registered_date',
    render: (key: any) => (
      <>
        <FlexRow>
          <Label_1>{moment(key?.updatedAt).format('DD-MM-YYYY')}</Label_1>
        </FlexRow>
      </>
    ),
  },
  {
    id: 6,
    title: 'Time',
    key: 'registered_time',
    render: (key: any) => (
      <>
        <FlexRow>
          <Label>{moment(key?.updatedAt).format('hh:mm:ss a')}</Label>
        </FlexRow>
      </>
    ),
  },
  {
    id: 7,
    title: 'Status',
    key: 'collection_name',
    render: (key: any) => (
      <>
        <FlexRow>
          <StatusCircle></StatusCircle>
          <StatusText>SUCCESS</StatusText>
        </FlexRow>
      </>
    ),
  },
]
