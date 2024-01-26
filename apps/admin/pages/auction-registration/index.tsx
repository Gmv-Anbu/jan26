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
import AuctionRegStatusModal from '@apps/admin/modules/admin/modal/auctionRegStatusModal'

import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'

import 'react-toastify/dist/ReactToastify.css';

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
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

const AuctionRegistrationList: NextPage = () => {
    const router = useRouter()
    // const navigate = useNavigate();
    const [auctionRegData, setAuctionRegData] = useState<any>([])
    const [metaData, setMetaData] = useState<any>([])
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(10)
    const [modalOpen, setModalOpen] = useState(false)
    const [auctionModal, setAuctionModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)
    const [selectedAuction, setSelectedAuction] = useState(null)

    const openStatusModal = (val) => {
        setSelectedAuction(val)
        setAuctionModal(true)
    }
    const closeStatusModal = (val) => {
        setAuctionModal(false)
        if(val) getAuctionRegList(page, pageLimit)
    }
    const [filterData, setFilterData] = useState({
        to: '',
        from: '',
        type: '',
    })
    const [showLoader, setShowLoader] = useState<boolean>(false)

    const filterOptions = [
        {value: 'Pending', label: 'Pending'},
        {value: 'Accepted', label: 'Accepted'},
        {value: 'Rejected', label: 'Rejected'}
    ]

    const applyFilter = (data: any) => {
        // if (data.from) {
        //   data.from = moment(data.from).startOf('day').toString()
        // }
        // if (data.to) {
        //   data.to = moment(data.to).endOf('day').toString()
        // }
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

    
  const downloadCSV = () => {
        if(auctionRegData?.length === 0) return
        API.exportAuctionRegCSV(searchQuery, filterData)
        .then((res)=>{
            if(res?.data) {
                const csv = res?.data
                var hiddenElement = document.createElement('a');  
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);  
                hiddenElement.download = 'auction-registration.csv';  
                hiddenElement.click();  
                ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={'Auction Registration CSV downloaded successfully'} />)
            } else {
                ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Unable to download csv'} />)
            }
        })
        .catch((err)=>{
            ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Unable to download csv'} />)
        })
    }

    const getAuctionRegList = (page: number, limit = 10) => {
        setShowLoader(true)
        let query = `?page=${page}&items=${limit}`
        if (searchQuery) {
            query += `&search=${searchQuery}`
        }
        let filter = {
            // startDate: localDateToUTCFilter(filterData.from),
            // endDate: localDateToUTCFilter(filterData.to),
            status: filterData.type
        }
        API.getAuctionRegistration(page, limit, filter, searchQuery)
        .then((res) => {
            console.log('res sdfasdasd', res)
            setPage(page)
            setShowLoader(false)
            if (res) {
                setAuctionRegData(res?.data?.data?.auctionRegistrations)
                setMetaData(res?.data?.data)
            }
            // setModalOpen(false)
        })
        .catch((err) => {
            console.log(err)
            setShowLoader(false)
        })
    }

    useEffect(() => {
        const getData = setTimeout(() => {
            getAuctionRegList(page, pageLimit)
        }, 2000)
        return () => clearTimeout(getData)
    }, [searchQuery, page])

    useEffect(() => {
        if(page === 1) {
            getAuctionRegList(page, pageLimit)
        } else {
            setPage(1)
        }
    },[filterData])

    console.log('auctionRegData', auctionRegData)

    return (
        <>
        {modalOpen && <DateTypeFilterModal dateFilter={false} data={filterData} filterOptions={filterOptions} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter} />}
        {auctionModal && <AuctionRegStatusModal data={selectedAuction} closeModal={closeStatusModal} />}
        <AdminLayout meta={meta} pageTitle={`Auction Registration`}>
            <Container>
            <SpaceBetween>
                <h2>Total Auction Registration({metaData?.pageMeta?.totalItems})</h2>
                <Container_1>
                    <TableSearch placeholder="Search" value={searchQuery || ''} onChange={queryHandler} />
                    <div>
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
                    </div>
                    <CreateButton onClick={() => downloadCSV()} className="add_icon mr-10">
                        Export CSV
                    </CreateButton>
                </Container_1>
            </SpaceBetween>
            <Table
                columns={[
                { id: 1, title: 'Auction Id', key: 'id', hasNestedObject: false },
                { id: 2, title: 'Type', key: 'type', hasNestedObject: false },
                {
                    id: 3,
                    title: 'UserName',
                    key: 'userName',
                    render: (key: any) => (
                    <>
                        {/* <WebHref href={`${APP_ENV.CUSTOMER_WEB_URL}base/profile/${key?.userName}`}> */}
                        <FlexRow>
                            <ArtImage src={handleApiImage(key?.User?.profilePicUrl) || '/images/shared/user-placeholder-black.png'} alt="art" />
                            <Label marginLeft="6px">{key?.User?.userName || key?.User?.email}</Label>
                        </FlexRow>
                        {/* </WebHref> */}
                    </>
                    ),
                },
                {
                    id: 4,
                    title: 'Request Created',
                    key: 'createdAt',
                    render: (key: any) => {
                    return (
                        <>
                        <FlexRow>
                            <Label>{key?.createdAt ? moment(key?.createdAt).format('DD-MM-YYYY') : '-'}</Label>
                        </FlexRow>
                        </>
                    )
                    },
                },
                {
                    id: 5, title: 'Anticipated Bid Amount', key: 'lockAmount',
                    render: (key: any) => (<FlexRow><Label className='caps'>{Number(key?.lockAmount) || '-'}</Label></FlexRow>),
                },
                {
                    id: 6, title: 'Company Name', key: 'name',
                    render: (key: any) => (<FlexRow><Label className='caps'>{key?.Company?.name || '-'}</Label></FlexRow>),
                },
                {
                    id: 7, title: 'Registration Status', key: 'name',
                    render: (key: any) => (<FlexRow><Label className='caps'>{key?.status || '-'}</Label></FlexRow>),
                },
                {
                    id: 8,
                    title: 'Actions',
                    key: 'actions',
                    render: (key: any) => {
                    let options = [
                        {
                        name: 'Update Auction Reg',
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
                data={auctionRegData}
                showLoader={showLoader}
            />
            {auctionRegData?.length ? <TablePagination total={metaData?.pageMeta?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
            </Container>
        </AdminLayout>
        </>
    )
}

export default AuctionRegistrationList
