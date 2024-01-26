import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Table } from '@nft-marketplace/table'
import moment from 'moment'
import { ModalService } from '@nft-marketplace/modal'
import AdminLayout from '../../modules/admin/components/layout/layout'
import API from '../../api/admin'
import TablePagination from '@apps/admin/modules/shared/components/pagination'

import { ArtworkImage, Container, Container_1, CreateButton, FilterButton, Icon, InputField, InputPath, SearchIcon, SpaceBetween } from 'libs/table/src/lib/tableStyles'
import MenuAction from 'libs/table/src/lib/MenuAction'
import meta from '@apps/admin/modules/shared/components/meta'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'
import { formatToUSD, handleApiImage, localDateToUTC, localDateToUTCFilter } from '@apps/admin/utils/helper'
import DateTypeFilterModal from '@apps/admin/modules/admin/filterModal/dateTypeFilterModal'

import 'react-toastify/dist/ReactToastify.css';
import CompanyApprovalModal from '@apps/admin/modules/admin/modal/companyApprovalModal'
import Link from 'next/link'
import SellRequestModal from '@apps/admin/modules/admin/modal/sellRequestModal'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  a {
    padding: 0 3px;
  }
`

export const ArtImage = styled.img`
  max-width: 35px;
  maxh-height: 35px;
`

export const VideoWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`

export const Plus = styled.span`
  padding-right: -5px;
`

export const WebHref = styled.a`
  text-decoration: none;
`

interface LabelProps {
  marginLeft?: string
}

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
    white-space: nowrap;
  }
`

const CheckBoxWrapper = styled.div`
  position: relative;
`
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #0e0e0e;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.3s;
    }
  }
`

const CompanyApprovalPage: NextPage = () => {
    const router = useRouter()
    // const navigate = useNavigate();
    const [sellList, setSellList] = useState<any>([])
    const [metaData, setMetaData] = useState<any>([])
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(10)
    const [modalOpen, setModalOpen] = useState(false)
    const [requestModal, setRequestModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)
    const [selectedRequest, setSelectedRequest] = useState(null)

    const openStatusModal = (val) => {
        setSelectedRequest(val)
        setRequestModal(true)
    }
    const closeStatusModal = (val) => {
        setRequestModal(false)
        if(val) getSellList(page, pageLimit)
    }
    const [filterData, setFilterData] = useState({
        to: '',
        from: '',
        type: '',
    })
    const [showLoader, setShowLoader] = useState<boolean>(false)

    const filterOptions = [
        {value: 'Approved', label: 'Approved'},
        {value: 'In Review', label: 'Under Review'},
        {value: 'Pending', label: 'Pending'},
        {value: 'Rejected', label: 'Rejected'}
    ]

    const applyFilter = (data: any) => {
        setFilterData(data)
    }

    const resetFilter = (data: any) => {
        setModalOpen(false)
        setFilterData(data)
    }
    const queryHandler = (e: any) => {
        setSearchQuery(e.target.value)
        setPage(1)
    }

    // Change page
    const paginate = (pageNumber) => setPage(pageNumber)

    const getSellList = (page: number, limit = 10) => {
        setShowLoader(true)
        let query = `?page=${page}&items=${limit}`
        if (searchQuery) {
            query += `&search=${searchQuery}`
        }
        let filter = {
            // startDate: localDateToUTCFilter(filterData.from),
            // endDate: localDateToUTCFilter(filterData.to),
            kybStatus: filterData.type
        }
        console.log('filter', filter)
        API.sellList(page, limit, filter, searchQuery)
        .then((res) => {
            console.log('res sdfasdasd', res)
            setPage(page)
            setShowLoader(false)
            if (res) {
                setSellList(res?.data?.data?.companies)
                setMetaData(res?.data?.data)
            }
        })
        .catch((err) => {
            console.log(err)
            setShowLoader(false)
        })
    }

    useEffect(() => {
        const getData = setTimeout(() => {
            getSellList(page, pageLimit)
        }, 2000)
        return () => clearTimeout(getData)
    }, [searchQuery, page])

    useEffect(() => {
        if(page === 1) {
            getSellList(page, pageLimit)
        } else {
            setPage(1)
        }
    },[filterData])

    console.log('sellList', sellList)

    return (
        <>
        {modalOpen && <DateTypeFilterModal dateFilter={false} data={filterData} filterOptions={filterOptions} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter} />}
        {requestModal && <SellRequestModal data={selectedRequest} closeModal={closeStatusModal} />}
        <AdminLayout meta={meta} pageTitle={`Sell Requests`}>
            <Container>
            <SpaceBetween>
                <h2>Total Sell Requests({metaData?.pageMeta?.totalItems})</h2>
                <Container_1>
                <TableSearch placeholder="Search" value={searchQuery || ''} onChange={queryHandler} />
                {/* <div>
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
                </div> */}
                </Container_1>
            </SpaceBetween>
            <Table
                columns={[
                { id: 1, title: 'Id', key: 'id', hasNestedObject: false },
                { id: 2, title: 'Name', key: 'name', hasNestedObject: false },
                {
                    id: 3,
                    title: 'Main Image',
                    key: 'images',
                    render: (key: any) => {
                      return (
                        <>
                          <FlexRow>
                            <Link href={handleApiImage(key?.mainAssetUrl)} passHref>
                                <a target='_blank'><ArtImage src={handleApiImage(key?.mainAssetUrl)} alt="art" /></a>
                            </Link>
                          </FlexRow>
                        </>
                      )
                    },
                },
                {
                    id: 4,
                    title: 'Supporting Images',
                    key: 'images',
                    render: (key: any) => {
                      return (
                        <>
                          <FlexRow>
                            {key?.supportAssetUrl?.length 
                            ? key?.supportAssetUrl.map(el => {
                                return (<Link href={handleApiImage(el)} passHref>
                                <a target='_blank'><ArtImage src={handleApiImage(el)} alt="art" /></a>
                            </Link>)
                            })
                            : 'NA'}
                          </FlexRow>
                        </>
                      )
                    },
                },
                { id: 5, title: 'Price', key: 'price', hasNestedObject: false,
                    render: (key: any) => (<FlexRow><Label className='caps'>{Number(key?.price)}</Label></FlexRow>),
                },
                { id: 6, title: 'Address', key: 'address', hasNestedObject: false },
                {
                    id: 7,
                    title: 'Request Created',
                    key: 'createdAt',
                    render: (key: any) => {
                        return (<FlexRow><Label>{key?.createdAt ? moment(key?.createdAt).format('DD-MM-YYYY') : '-'}</Label></FlexRow>)
                    },
                },
                { id: 8, title: 'Status', key: 'status', },
                {
                    id: 9,
                    title: 'Actions',
                    key: 'actions',
                    render: (key: any) => {
                    let options = [
                        // {
                        //     name: 'View Company',
                        //     id: 1,
                        //     action: () => router.push(`/company/${key?.id}`),
                        // },
                        {
                            name: 'Update Status',
                            id: 1,
                            action: () => openStatusModal(key),
                        },
                    ]
                    return (
                        <>
                        <MenuAction
                            data={options}
                        ></MenuAction>
                        </>
                    )
                    },
                },
                ]}
                data={sellList}
                showLoader={showLoader}
            />
            {sellList?.length ? <TablePagination total={metaData?.pageMeta?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
            </Container>
        </AdminLayout>
        </>
    )
}

export default CompanyApprovalPage
