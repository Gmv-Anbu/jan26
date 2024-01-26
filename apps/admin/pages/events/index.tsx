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

import ConfirmationModal from '../../modules/admin/modal/ConfirmationModal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { APP_ENV } from '../../config'

import { ArtworkImage, Container, Container_1, CreateButton, FilterButton, Icon, InputField, InputPath, SearchIcon, SpaceBetween } from 'libs/table/src/lib/tableStyles'
import MenuAction from 'libs/table/src/lib/MenuAction'
import ArtWorkFilterModel from '../../modules/admin/artwork/artWorkFilterModel'
import { Button } from '@apps/admin/modules/shared/components/button/button'
import meta from '@apps/admin/modules/shared/components/meta'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { AudioComponent } from '@nft-marketplace/AudioComponent'
import BulkUploadModel from '@apps/admin/modules/admin/modal/bulkUploader'
import TransferNft from '@apps/admin/modules/admin/modal/transferNft'
import { formatToUSD, handleApiImage, localDateToUTC, localDateToUTCFilter } from '@apps/admin/utils/helper'
import DateTypeFilterModal from '@apps/admin/modules/admin/filterModal/dateTypeFilterModal'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

export const ArtImage = styled.img`
  max-width: 80px;
  maxh-height: 80px;
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

const EventsList: NextPage = () => {
  const router = useRouter()
  // const navigate = useNavigate();
  const [eventData, setEventData] = useState<any>([])
  const [metaData, setMetaData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(null)

  const [filterData, setFilterData] = useState({
    to: '',
    from: '',
    type: '',
  })
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const filterOptions = [
    {value: 'past', label: 'Past'},
    {value: 'live', label: 'Live'},
    {value: 'upcoming', label: 'Upcoming'}
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

  const goToAddPage = () => {
    router.push('/events/add')
  }
  const queryHandler = (e: any) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  const getEventsListData = (page: number, limit = 10) => {
    setShowLoader(true)
    let query = `?page=${page}&items=${limit}`
    if (searchQuery) {
      query += `&search=${searchQuery}`
    }
    let filter = {
      startDate: localDateToUTCFilter(filterData.from),
      endDate: localDateToUTCFilter(filterData.to),
      type: filterData.type
    }
    API.getEventList(page, limit, filter, searchQuery)
      .then((res) => {
        console.log('res sdfasdasd', res)
        setPage(page)
        setShowLoader(false)
        if (res) {
          setEventData(res?.data?.data)
          setMetaData(res?.data?.data)
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
    if(startDate === endDate) {
      return startDate
    } else if (sDate && eDate) {
      if(new Date(sDate).getMonth() !== new Date(eDate).getMonth()) {
        return `${startDate} - ${endDate}`
      } else {
        return `${moment(new Date(sDate)).format('DD')} - ${endDate}`
      }
    } else {
      return 'NA'
    }
  }

  const getFormattedTime = (sDate, eDate) => {
    let startDate = moment(new Date(sDate)).format('h:mmA')
    let endDate = moment(new Date(eDate)).format('h:mmA')
    if(startDate && endDate) {
      return `${startDate} - ${endDate}`
    } else {
      return 'NA'
    }
  }

  const handleClose = (modal: any) => {
    ModalService.close(modal)
    getEventsListData(1, pageLimit)
  }

  const deleteEvent = (id) => {
    console.log('deleteEvent', id)
    API.deleteEventById(id)
    .then((res) => {
      console.log('res', res)
      if (res?.status === 200) {
        // openModal()
        const success = ModalService.open((modalProps: any) => <SuccessModal title="Success" desc={'Event removed successfully'} close={() => handleClose(success)} />)
      } else if (res?.error?.error?.code == 400) {
        ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
      } else {
        ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={'Something went wrong. Try again later'} close={modalProps.close} />)
      }
    })
    .catch((err: any) => {
      console.log(err, { err }, err?.error?.error)
    })
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      getEventsListData(page, pageLimit)
    }, 2000)
    return () => clearTimeout(getData)
  }, [searchQuery, page])

  useEffect(() => {
    if(page === 1) {
      getEventsListData(page, pageLimit)
    } else {
      setPage(1)
    }
  },[filterData])

  useEffect(() => {
    getEventsListData(page, pageLimit)
  }, [])

  return (
    <>
      {modalOpen && <DateTypeFilterModal data={filterData} filterOptions={filterOptions} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter} />}
      <AdminLayout meta={meta} pageTitle={`Events Management`}>
        <Container>
          <SpaceBetween>
            <h2>Total Events({metaData?.pageMeta?.totalItems})</h2>
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

              <CreateButton onClick={goToAddPage} className="add_icon">
                Create Event
              </CreateButton>
            </Container_1>
          </SpaceBetween>
          <Table
            columns={[
              { id: 1, title: 'Title', key: 'title', hasNestedObject: false },
              {
                id: 2,
                title: 'Banner',
                key: 'name',
                render: (key: any) => {
                  return (
                    <>
                      <FlexRow>
                        <ArtImage src={handleApiImage(key?.image)} alt="art" />
                      </FlexRow>
                    </>
                  )
                },
              },
              { id: 3, title: 'Host Name', key: 'hostname', hasNestedObject: false },
              {
                id: 4,
                title: 'Date',
                key: 'refNo',
                // hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>
                        {key?.startDate && key?.endDate
                        ? getFormattedDate(key?.startDate, key?.endDate)
                        : 'NA'}
                      </Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 5,
                title: 'Time',
                key: 'refName',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>
                        {key?.startDate && key?.endDate
                        ? getFormattedTime(key?.startDate, key?.endDate)
                        : 'NA'}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 6,
                title: 'Location',
                key: 'location',
              },
              {
                id: 6,
                title: 'Type',
                key: 'type',
                render: (key: any) => (<FlexRow><Label className='caps'>{key?.type || 'NA'}</Label></FlexRow>),
              },
              {
                id: 7,
                title: 'Available Tickets',
                key: 'availableTickets',
                render: (key: any) => (<FlexRow><Label>{key?.availableTickets || 'NA'}</Label></FlexRow>),
              },
              {
                id: 8,
                title: 'Price',
                key: 'price',
                render: (key: any) => (<FlexRow><Label>{formatToUSD(key?.prize)}</Label></FlexRow>),
              },
              {
                id: 9,
                title: 'Actions',
                key: 'actions',
                render: (key: any) => {
                  let options = [
                    {
                      name: 'Edit Event',
                      id: 1,
                      action: () => router.push(`/events/update?id=${key?.id}`),
                    },
                    {
                      name: 'Delete Event',
                      id: 1,
                      action: () => deleteEvent(key?.id),
                    }
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
            data={eventData?.list}
            showLoader={showLoader}
          />
          {eventData?.list?.length ? <TablePagination total={metaData?.pageMeta?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
        </Container>
      </AdminLayout>
    </>
  )
}

export default EventsList
