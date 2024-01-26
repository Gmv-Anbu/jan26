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
import { handleApiImage, localDateToUTC } from '@apps/admin/utils/helper'
import EventReqConfirmDetails from '@apps/admin/modules/admin/modal/eventRequestConfirmDetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '@apps/admin/modules/shared/components/Loader'
import PopupSuccessModal from '../../modules/admin/modal/success';
import UserFilterModel from '@apps/admin/modules/admin/modal/filterModel'

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

const EventRequest: NextPage = () => {
  const router = useRouter()
  // const navigate = useNavigate();
  const [eventData, setEventData] = useState<any>([])
  const [metaData, setMetaData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectionData,setSelectionData]= useState(null);
  const [confirmationModal,setconfirmationModal]=useState(false);
  const [showApproveConfirmDetails,setshowApproveConfirmDetails]=useState(false);
  const [reason,setReason]=useState('')
  const [showModal,setShowModal]=useState(false);
  const [message,setMessage]=useState(false);
  const [filterData, setFilterData] = useState({
    to: '',
    from: '',
    saleType: '',
  })
  const [showLoader, setShowLoader] = useState<boolean>(false)

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

  const onConfirmation = () => {
    setconfirmationModal(false);
  const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.rejectEventRequest(selectionData.id,{reason:reason}).then((res) => {
      ModalService.close(fullLoader)
      if(res.status==200){
        // Toast.success(res?.data?.message || 'Rejected Successfully')
        getEventsListData(page, pageLimit);
        setMessage(res?.data?.message || 'Rejected Successfully');
        setShowModal(true)
        // toast.success(res?.data?.message || 'Rejected Successfully', {
        //   position: toast.POSITION.TOP_RIGHT
        // });
       
      }
    }).catch((err)=>{
      ModalService.close(fullLoader)
      // Toast.error(err?.response?.message || 'Something went wrong!')
      toast.error(err?.response?.message || 'Something went wrong!', {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  const onEventReqConfirmation=()=>{
    setshowApproveConfirmDetails(false);
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.approveEventRequest(selectionData.id).then((res) => {
      ModalService.close(fullLoader)
      if(res.status==200){
        // Toast.success(res?.data?.message || 'Rejected Successfully')
        getEventsListData(page, pageLimit);
        setMessage(res?.data?.message || 'Approved Successfully');
        setShowModal(true)
        // toast.success(res?.data?.message || 'Approved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT
        // });
        
      }
    }).catch((err)=>{
      ModalService.close(fullLoader)
      // Toast.error(err?.response?.message || 'Something went wrong!')
      toast.error(err?.response?.message || 'Something went wrong!', {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  const closeModal = () => {
    setconfirmationModal(false)
  }

  const closeEventApproveModal = ()=>{
    setshowApproveConfirmDetails(false)
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
      from: localDateToUTC(filterData.from),
      to: localDateToUTC(filterData.to)
    }
    // let expires = moment.utc(filterData.from).valueOf()
    // console.log('moment.utc(date).valueOf()',  moment(expires).toISOString(), moment(expires).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), moment.utc(filterData.to).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
    API.getEventRequestList(page, limit, filter, searchQuery)
      .then((res) => {
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

  const getFormattedTime = (sDate, eDate) => {
    let startDate = moment(new Date(sDate)).format('h:mm A')
    let endDate = moment(new Date(eDate)).format('h:mm A')
    if (startDate && endDate) {
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

  const closeSuccessModal=()=>{
    setShowModal(false);
    setMessage(null);
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      getEventsListData(page, pageLimit)
    }, 2000)
    return () => clearTimeout(getData)
  }, [searchQuery, page])

  useEffect(() => {
    if (page === 1) {
      getEventsListData(page, pageLimit)
    } else {
      setPage(1)
    }
  }, [filterData])

  return (
    <>
      {modalOpen && <UserFilterModel onData={filterData} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter}></UserFilterModel>}
      <AdminLayout meta={meta} pageTitle={`Event Requests`}>
        <Container className='pos-relative overflow-auto'>
          <SpaceBetween className='sticky'>
            <h2>Total Event Requests({metaData?.pageMeta?.totalItems})</h2>
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

              {/* <CreateButton onClick={goToAddPage} className="add_icon">
                Create Event
              </CreateButton> */}
            </Container_1>
          </SpaceBetween>
          <Table
            columns={[
              { id: 1, title: 'Full name of the Requestee', key: 'name',
            hasNestedObject: false,
            whiteSpaceBreak:true,
            whiteSpaceNoBreakRow:true
            },
              { id: 2, title: 'Company Name', key: 'company', hasNestedObject: false,
              whiteSpaceBreak:true
            },
              { id: 3, title: 'Email ID', key: 'email', hasNestedObject: false,
              whiteSpaceBreak:true,
              whiteSpaceNoBreakRow:true
            },
              { id: 4, title: 'Mobile Number', key: 'phone', hasNestedObject: false,
              whiteSpaceBreak:true,
              whiteSpaceNoBreakRow:true
            },
            // {
            //   id: 5, title: 'Request Created at Date', key: 'hostname',
            //   whiteSpaceBreak:true,
            //   whiteSpaceNoBreakRow:true,
            //   render: (key: any) => <p>{moment(key?.createdAt).format('DD-MM-YYYY')}</p>,
            //   hasNestedObject: false
            // },
              {
                id: 5, title: 'Preferred Date(s)', key: 'hostname',
                whiteSpaceBreak:true,
                whiteSpaceNoBreakRow:true,
                render: (key: any) => (<>
                  {key?.preferredDate!=null && <p>{moment(key?.preferredDate).format('DD-MM-YYYY')}</p>}
                  {key?.preferredDate2!=null && <p>{moment(key?.preferredDate2).format('DD-MM-YYYY')}</p>}
                  {key?.preferredDate3!=null &&  <p>{moment(key?.preferredDate3).format('DD-MM-YYYY')}</p>}
                </>),
                hasNestedObject: false
              },
              {
                id: 6, title: 'Preferred Timing(s)', key: 'preferredTime',
                whiteSpaceNoBreakRow:true,
                whiteSpaceBreak:true,
                render: (key: any) => (<>
                  <p>{key?.preferredTime && moment(key?.preferredTime, ["HH:mm:ss"]).format('hh:mm A')}</p>
                  <p>{key?.preferredTime2 && moment(key?.preferredTime2, ["HH:mm:ss"]).format('hh:mm A')}</p>
                  <p>{key?.preferredTime3 && moment(key?.preferredTime3, ["HH:mm:ss"]).format('hh:mm A')}</p>
                </>),
                hasNestedObject: false
              },
              { id: 7, title: 'Number of participants', key: 'participantCount',
              whiteSpaceBreak:true,
              hasNestedObject: false },
              {
                id: 8, title: 'Drinks', key: 'drinks',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                render: (key: any) => (<>
                  {key?.drinks == true ? 'Yes' : 'No'}
                </>)
              },
              {
                id: 9, title: 'Food', key: 'food',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                render: (key: any) => (<>
                  {key?.food == true ? 'Yes' : 'No'}
                </>)
              },
              {
                id: 10, title: 'Private Guided Tour of the FG Museum', key: 'hostname',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                render: (key: any) => (<>
                  {key?.privateGuidedTourFGMuseum == true ? 'Yes' : 'No'}
                </>)
              },
              {
                id: 11, title: 'On-Site DJ', key: 'hostname',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                render: (key: any) => (<>
                  {key?.dj == true ? 'Yes' : 'No'}
                </>)
              },
              {
                id: 12, title: 'Background Lounge Music', key: 'hostname',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                render: (key: any) => (<>
                  {key?.backgroundLoungeMusic == true ? 'Yes' : 'No'}
                </>)
              },
              {
                id: 13, title: 'Projector for presentations', key: 'hostname',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                render: (key: any) => (<>
                  {key?.projector == true ? 'Yes' : 'No'}
                </>)
              },
              {
                id: 14, title: 'Personalized Branding on 4 Meter Museum Screen', key: 'hostname',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                render: (key: any) => (<>
                  {key?.personalizedBranding == true ? 'Yes' : 'No'}
                </>)
              },
              {
                id: 15, title: 'Other Notes', key: 'otherNotes',
                whiteSpaceBreak:true,
                hasNestedObject: false,
                width: '200px'
              },
              {
                id: 16,
                title: 'Actions',
                whiteSpaceBreak:true,
                key: 'actions',
                render: (key: any) => (
                  <>
                  {key?.status=='pending' ? ( <>
                    <MenuAction
                        data={[
                            {
                                name: 'Approve Request',
                                id: 1,
                                action: () => {
                                  setSelectionData({ id: key?.id });
                                  setshowApproveConfirmDetails(true);
                                }
                            },
                            {
                                name: 'Reject Request',
                                id: 2,
                                action: () => {
                                    setSelectionData({ id: key?.id })
                                    setconfirmationModal(true);
                                }
                      
                            },
                        ]}
                    ></MenuAction>
                </>):<>
                {key?.status=="approved" && <p className='color-green'>Approved</p>}
                {key?.status=="rejected" && <p className='color-red'>Rejected</p>}
                </>}
                </>
                ),
            },

            ]}
            data={eventData?.eventRequests}
            showLoader={showLoader}
          />
          {eventData?.eventRequests?.length ? <TablePagination total={metaData?.pageMeta?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
          <ConfirmationModal show={confirmationModal}  showReason={true} reason={reason} setReason={setReason} onConfirmation={onConfirmation} closeModal={closeModal} title={'Are you sure,Do you want to reject ?'} />
          <ConfirmationModal show={showApproveConfirmDetails} onConfirmation={onEventReqConfirmation} closeModal={closeEventApproveModal} title={'Are you sure,Do you want to approve ?'} />
          {/* <EventReqConfirmDetails show={showApproveConfirmDetails} onConfirmation={onEventReqConfirmation} closeModal={closeEventApproveModal} ></EventReqConfirmDetails> */}  
        <PopupSuccessModal show={showModal} closeModal={closeSuccessModal} title={message} />
        </Container>
      </AdminLayout>
    </>
  )
}

export default EventRequest
