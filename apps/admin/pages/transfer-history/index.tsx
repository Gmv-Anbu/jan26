import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import AdminLayout from '../../modules/admin/components/layout/layout'
import meta from '@apps/admin/modules/shared/components/meta'
import { ArtworkImage, Container, Container_1, CreateButton, FilterButton, Icon, InputField, InputPath, SearchIcon, SpaceBetween } from 'libs/table/src/lib/tableStyles'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'
import { useRouter } from 'next/router'
import { Table } from '@nft-marketplace/table'
import MenuAction from 'libs/table/src/lib/MenuAction'
import TablePagination from '@apps/admin/modules/shared/components/pagination';
import { handleApiImage, localDateToUTC } from '@apps/admin/utils/helper';
import API from '../../api/admin';
import moment from 'moment';
import SubCateforyFilterModel from '../../modules/admin/subCategory/subCategoryFilterModel';
export const ArtImage = styled.img`
  max-width: 80px;
  maxh-height: 80px;
`
interface LabelProps {
  marginLeft?: string
}
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`
export const Label = styled.div<LabelProps>`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  margin-left: ${(props) => props.marginLeft || '0'};
  &.caps {
    text-transform: capitalize;
  }
`
const TransferHistory: NextPage = () => {
  const router = useRouter()
  const [eventData, setEventData] = useState<any>([])
  const [metaData, setMetaData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [searchQuery, setSearchQuery] = useState(null)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterData, setFilterData] = useState({
    from: '',
    to: '',
  })
  const applyFilter = (data: any) => {
    if (data.from) {
      data.from = moment(data.from).startOf('day').toISOString()
    }
    if (data.to) {
      data.to = moment(data.to).endOf('day').toISOString()
    }
    setFilterData(data)
  }

  const resetFilter = (data: any) => {
    setFilterData(data)
    setModalOpen(false)
  }


  useEffect(() => {
    const getData = setTimeout(() => {
      getTransferData(page, pageLimit)
    }, 2000)
    return () => clearTimeout(getData)
  }, [searchQuery, page])

  useEffect(() => {
    if (page === 1) {
      getTransferData(page, pageLimit)
    } else {
      setPage(1)
    }
  }, [filterData])

  useEffect(() => {
    getTransferData(page, pageLimit)
  }, [])

  const queryHandler = (e: any) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const getTransferData = (page: number, limit = 10) => {
    setShowLoader(true)
    let query = `?page=${page}&items=${limit}`
    if (searchQuery) {
      query += `&search=${searchQuery}`
    }
    let filter = {
      start: localDateToUTC(filterData.from),
      end: localDateToUTC(filterData.to)
    }
    // let expires = moment.utc(filterData.from).valueOf()
    // console.log('moment.utc(date).valueOf()',  moment(expires).toISOString(), moment(expires).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), moment.utc(filterData.to).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
    API.getMyTransfers(page, limit, filter, searchQuery)
      .then((res) => {
        console.log('res sdfasdasd', res)
        setPage(page)
        setShowLoader(false)
        if (res) {
          setEventData(res?.data?.data)
          setMetaData(res?.data?.data?.pageMeta)
        }
        // setModalOpen(false)
      })
      .catch((err) => {
        console.log(err)
        setShowLoader(false)
      })
  }

  const getFormattedDate = (sDate, eDate) => {
    let startDate = moment(new Date(sDate)).format('DD MMM YYYY')
    let endDate = moment(new Date(eDate)).format('DD MMM YYYY')
    console.log('new Date(sDate)', new Date(sDate).getMonth(), new Date(eDate).getMonth())
    if (startDate === endDate) {
      return startDate
    } else if (sDate && eDate) {
      if (new Date(sDate).getMonth() !== new Date(eDate).getMonth()) {
        return `${startDate} - ${endDate}`
      } else {
        return `${moment(new Date(sDate)).format('DD')} - ${endDate}`
      }
    } else {
      return 'NA'
    }
  }

  return (
    <>
      {modalOpen && <SubCateforyFilterModel data={filterData} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter}></SubCateforyFilterModel>}
      <AdminLayout meta={meta} pageTitle={`Transfer History`}>
        <Container>
          <SpaceBetween>
            <h2>Total Transfers({metaData?.totalCount})</h2>
            <Container_1>

              <FilterButton
                onClick={(e) => {
                  e.preventDefault()
                  setModalOpen(true)
                }}
              >
                <Icon xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="-287.75 385.885 27.219 21.063">
                  <path d="M-262.542 389.734h-11.625c-.442-1.618-1.91-2.817-3.667-2.817-1.756 0-3.224 1.199-3.667 2.817h-4.234a1 1 0 100 2h4.234c.443 1.617 1.91 2.816 3.667 2.816s3.224-1.199 3.667-2.816h11.625a1 1 0 100-2zm-15.292 2.816a1.817 1.817 0 110-3.633 1.817 1.817 0 010 3.633zM-286.735 402.109a1 1 0 001 1h11.625c.443 1.617 1.91 2.816 3.667 2.816 1.756 0 3.224-1.199 3.667-2.816h4.234a1 1 0 100-2h-4.234c-.443-1.618-1.91-2.817-3.667-2.817-1.756 0-3.225 1.199-3.667 2.817h-11.625a1 1 0 00-1 1zm14.475 0a1.817 1.817 0 113.634 0 1.817 1.817 0 01-3.634 0z"></path>
                </Icon>
                Filter
              </FilterButton>
              <TableSearch placeholder="Search" value={searchQuery || ''} onChange={queryHandler} />
            </Container_1>
          </SpaceBetween>
          <Table
            columns={[
              {
                id: 1, title: 'Asset Name', key: 'name',
                render: (key: any) => {
                  return key?.assetData?.name

                },
                width: "12.5%",
                hasNestedObject: true
              },
              {
                id: 2, title: 'Ref Name', key: 'name',
                render: (key: any) => {
                  return key?.assetData?.refName

                },
                width: "12.5%",
                hasNestedObject: true
              },
              {
                id: 3, title: 'Ref No', key: 'name',
                render: (key: any) => {
                  return key?.assetData?.refNo

                },
                width: "10%",
                hasNestedObject: true
              },
              {
                id: 4,
                title: 'Asset Thumbnail Image',
                width: "10%",
                key: 'mainAssetUrl',
                render: (key: any) => {
                  return (
                    <>
                      <FlexRow>
                        <ArtImage src={handleApiImage(key?.assetData?.mainAssetUrl)} alt="art" />
                      </FlexRow>
                    </>
                  )
                },
                hasNestedObject: true
              },
              {
                id: 5, title: 'Price', key: 'primarySalePrice',
                width: "10%",
                hasNestedObject: false,
                render: (key: any) => {
                  return key?.assetData?.primarySalePrice == null ? 0 : key?.assetData?.primarySalePrice
                },
              },
              {
                id: 6, title: 'User Name', key: 'userName',
                width: "10%",
                hasNestedObject: false,
                render: (key: any) => {
                  return key?.userData?.userName == null ? (key?.userData?.firstName ? 'Username not available, First name : '+key?.userData?.firstName:'-') : key?.userData?.userName
                },
              },
              {
                id: 7, title: 'From', key: 'from', hasNestedObject: false,
                whiteSpaceBreak: true,
                breakAnywhere: true,
                width: "10%",
              },
              {
                id: 8, title: 'To', key: 'walletAddress', hasNestedObject: false,
                width: "10%",
                whiteSpaceBreak: true,
                breakAnywhere: true,
                render: (key: any) => {
                  return key?.userData?.walletAddress
                },
              },
              {
                id: 9,
                title: 'Date',
                width: "15%",
                key: 'refNo',
                // hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>
                        {(key?.createdAt && !key?.updatedAt) && moment(key?.createdAt).format('DD-MM-YYYY')}
                        {(key?.updatedAt) && moment(key?.updatedAt).format('DD-MM-YYYY')}
                        {!key?.createdAt && !key?.updatedAt && 'NA'}
                      </Label>
                    </FlexRow>
                  </>
                ),
              },
            ]}
            data={eventData?.list?.rows}
            showLoader={showLoader}
          />
          {eventData?.list?.rows?.length ? <TablePagination total={metaData?.totalCount} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
        </Container>
      </AdminLayout>
    </>
  )
}

export default TransferHistory