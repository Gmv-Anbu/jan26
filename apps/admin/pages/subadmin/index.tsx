import React, { useState, useEffect } from 'react'
import { handleApiImage } from '@apps/admin/utils/helper'
import AdminLayout from '@apps/admin/modules/admin/components/layout/layout'
import TablePagination from '@apps/admin/modules/shared/components/pagination'
import MenuAction from 'libs/table/src/lib/MenuAction'
import { Table } from '@nft-marketplace/table'
import { Container_1, InputField, SearchIcon, InputPath, FilterButton, Icon, CreateButton } from 'libs/table/src/lib/tableStyles'
import Styled from 'styled-components'
import moment from 'moment'
import { NextPage } from 'next'
import FilterModal from '../../modules/admin/modal/CreatorFilterModal'
import API from '../../api/admin'
import { render } from '@testing-library/react'
import RejectModal from '../../modules/admin/modal/CreatorRejectModal'
import { APP_ENV } from '@apps/admin/config'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { ModalService } from '@nft-marketplace/modal'
import ConfirmationModal from '@apps/admin/modules/admin/shared/modal/confirmationModal'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'
import Image from 'next/image'
import { useRouter } from 'next/router'

const initialFilterData = { from: '', to: '', role: 'subAdmin' }
const pageLimit = 10
const meta = {
  title: 'NFT2.0 | Admin Creator Management',
  description: 'Admin Creator Management for NFT',
}

const SubAdminListing: NextPage = () => {
  const [userData, setUserData] = useState<any>([])
  const [requestsToggle, setRequestsToggle] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [call, setCall] = useState<Boolean>(false)
  const [metaData, setMetaData] = useState<any>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [filterData, setFilterData] = useState(initialFilterData)
  const [rejectModal, setRejectModal] = useState<Boolean>(false)
  const [rejectionData, setRejectionData] = useState<object>({ id: Number, reason: String })
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const router = useRouter()

  const applyFilter = (data: any) => {
    setFilterData(data)
    setModalOpen(false)
  }

  const resetFilter = (data: any) => {
    setFilterData(data)
  }

  const goToAddPage = () => {
    router.push('/subadmin/add')
  }

  const handleReject = (data: any) => {
    const ConfirmModal = ModalService.open(
      (modalProps: any) => (
        <ConfirmationModal
          title="Alert"
          desc={'Are you sure to reject creator request?'}
          close={modalProps.close}
          onConfirmation={() => {
            RejectApiCall(data)
            ModalService.close(ConfirmModal)
          }}
        />
      ),
      { closeIcon: false }
    )
  }
  const RejectApiCall = (data: any) => {
    API.updateCreatorStatus(data?.id, 'declined', data?.reason).then(() => {
      ModalService.open((modalProps: any) => <SuccessModal desc={'Successfully Rejected'} close={modalProps.close} />)
      setCall(!call)
    })
  }

  const handleAccept = (data: any) => {
    API.updateCreatorStatus(data?.id, 'approved').then(() => {
      ModalService.open((modalProps: any) => <SuccessModal desc={'Successfully Accepted'} close={modalProps.close} />)
      setCall(!call)
    })
  }

  //   const getUsersListData = (
  //     page: number,
  //     limit = 10
  //     // filter = { from: filterData.joinDate, type: filterData.userName }
  //   ) => {
  //     setShowLoader(true)
  //     API.getUsersList(page, limit, filterData, query)
  //       .then((res) => {
  //         setPage(page)
  //         setShowLoader(false)
  //         if (res?.data?.data) {
  //           setUserData(res?.data?.data)
  //           setMetaData(res?.data?.data?.pageMeta)
  //         }
  //       })
  //       .catch((err) => {
  //         setShowLoader(false)
  //         console.log(err)
  //       })
  //   }

  const getUsersListData = (page: number, limit = 10, filter = { from: filterData.from, to: filterData.to, role: filterData.role }) => {
    setShowLoader(true)
    API.getUsersList(page, limit, filterData, query)
      .then((res) => {
        setPage(page)
        setShowLoader(false)
        if (res?.data?.data) {
          res?.data?.data?.userList?.map((item) => {
            item.openRejectModal = () => setRejectModal(true)
            item.handleAccept = handleAccept
            item.setRejectionData = setRejectionData
          })
          setUserData(res?.data?.data)
          setMetaData(res?.data?.data?.pageMeta)
        }
      })
      .catch((err) => {
        setUserData([])
        setShowLoader(false)
        console.log('Error>>>', err)
      })
  }

  const handleBlockUnblockSubAdmin = (id: number, isBlocked: boolean) => {
    if (isBlocked) {
      API.unBlockSubAdmin(id)
        .then((res) => {
          if (res?.data?.message === 'Successfully unblocked') {
            // openModal()
            const success = ModalService.open((modalProps: any) => <SuccessModal desc={'User has been Unblocked sucessfully'} close={modalProps.close} />)
            getUsersListData(1, pageLimit)
          } else if (res?.error?.error?.code == 400) {
            const error = ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
          }
        })
        .catch((err: any) => {
          console.log(err, { err }, err?.error?.error)
        })
    } else {
      API.blockSubAdmin(id)
        .then((res) => {
          if (res?.data?.message === 'Successfully blocked') {
            // openModal()
            const success = ModalService.open((modalProps: any) => <SuccessModal desc={'Subadmin has been blocked sucessfully'} close={modalProps.close} />)
            getUsersListData(1, pageLimit)
          } else if (res?.error?.error?.code == 400) {
            const error = ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
          }
        })
        .catch((err: any) => {
          console.log(err, { err }, err?.error?.error)
        })
    }
  }

  useEffect(() => {
    query === '' && getUsersListData(page, 10)
  }, [requestsToggle, filterData, page, call, query])

  //Debouncing search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        getUsersListData(page, 10)
      }
    }, 2000)

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<< CONSTANTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const creatorsColumn = [
    { id: 1, title: 'Sub-Admin ID', key: 'id', hasNestedObject: false },
    {
      id: 2,
      title: 'Name',
      key: 'name',
      render: (key: any) => (
        <>
          <WebHref onClick={() => window.open(`${APP_ENV.CUSTOMER_WEB_URL}/base/profile/${key?.userName}`)}>
            <FlexRow
              onClick={() => {
                //   profileNavigate(key);
              }}
            >
              <ArtImage src={handleApiImage(key?.profilePicUrl) || '/images/shared/user-placeholder-black.png'} alt="art" />
              <Label>{key?.userName || '-'}</Label>
            </FlexRow>
          </WebHref>
        </>
      ),
    },
    {
      id: 3,
      title: 'Email',
      key: 'email',
      // hasNestedObject: false,
      render: (key: any) => (
        <>
          <FlexRow>
            <Label>{key?.email}</Label>
          </FlexRow>
        </>
      ),
    },

    {
      id: 4,
      title: 'Joined Date',
      key: 'updatedAt',
      render: (key: any) => (
        <>
          <FlexRow>
            <Label>{moment(key?.createdAt).format('DD-MM-YYYY')}</Label>
          </FlexRow>
        </>
      ),
    },
    // {
    //   id: 5,
    //   title: 'Permission',
    //   key: 'Wallet address',
    //   render: (key: any) => (
    //     <>
    //       <FlexRow>
    //         <WalletLabel>Read</WalletLabel>
    //       </FlexRow>
    //     </>
    //   ),
    // },
    {
      id: 6,
      title: 'Actions',
      key: 'actions',
      render: (key: any) => (
        <>
          <MenuAction
            data={[
              {
                name: 'Edit Profile',
                id: 1,
                action: () => router.push(`/subadmin/update?id=${key?.id}`),
              },
              {
                name: key.isBlocked ? 'Activate Profile' : 'Deactivate Profile',
                id: 2,
                action: () => handleBlockUnblockSubAdmin(key?.id, key.isBlocked),
                // ModalService.open((modalProps) => (
                //   <div> Show me the menaing ${key.id}</div>
              },
            ]}
          ></MenuAction>
        </>
      ),
    },
  ]

  return (
    <>
      {/* {modalOpen && <FilterModal data={filterData} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter} requestsToggle={requestsToggle} />}
      {rejectModal && <RejectModal setRejectModal={setRejectModal} rejectionData={rejectionData} setRejectionData={setRejectionData} handleReject={handleReject} />} */}
      <AdminLayout meta={meta} pageTitle={`Sub-admin Management `}>
        <Container>
          <SpaceBetween>
            <h2>Total Subadmins({metaData?.totalItems})</h2>

            <Container_1>
              <TableSearch
                value={query || ''}
                onChange={(e) => {
                  setPage(1)
                  setQuery(e.target.value)
                }}
              />
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
              <CreateButton onClick={goToAddPage} className="add_icon">
                <Plus>
                  <Image src={`/svgs/icons/Vector.svg`} alt={`add`} width="12px" height="12px" />
                </Plus>
                Create Sub-Admin
              </CreateButton>
            </Container_1>
          </SpaceBetween>
          <Table columns={creatorsColumn} data={userData?.userList} showLoader={showLoader} />
          {userData?.list?.length || userData?.userList?.length ? <TablePagination total={userData?.pageMeta?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
        </Container>
      </AdminLayout>
    </>
  )
}

export default SubAdminListing

const Container = Styled.div`
  padding: 1.5rem;
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 10%);
  border-radius: 8px;
  margin-left: 15px;
`
const SpaceBetween = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  .add_icon {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`

const ActiveButton = Styled.button`  
    padding: 1rem 2.5rem;
    border-radius: 10px;
    background: linear-gradient(266.81deg, #305498 3.68%, #25C0F2 144.79%);
    border: none;
    color: white;
    cursor: pointer;`

const InActiveButton = Styled.button` 
    padding: 1rem 2.5rem;
    border-radius: 10px;
    color: black;
    border: none;
    background: #deddd9;
    cursor: pointer;
`

const ToggleButton = Styled.div`
  background: #deddd9;
  border: 1px solid #EBEBEB;
  display: flex;
  border-radius: 10px;`

const ArtImage = Styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`

const FlexRow = Styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

const WebHref = Styled.a`
  text-decoration: none;
`

const Label = Styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  margin-left: 0.6em;
`

const WalletLabel = Styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  inline-size: 30rem;
  overflow-wrap: break-word;
`

export const Plus = Styled.span`
  padding-right: -5px;
`
