import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getCookie } from '@nft-marketplace/js-cookie'
import { Table } from '@nft-marketplace/table'
import moment from 'moment'
import { handleApiImage, objectDeepClone } from '../../utils/helper'
import TablePagination from '@apps/admin/modules/shared/components/pagination'
import { ModalService } from '@nft-marketplace/modal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'

import AdminLayout from '../../modules/admin/components/layout/layout'
// import {
//   TableWarpper,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableTH,
//   TableTD,
//   FlexCenter,
//   TableImgWrapper,
// } from "../../modules/customer/styled-components/table";
import { ButtonPrimary } from '../../modules/shared/components/button/button'

import API from '../../api/admin'
import Tooltip from '../../modules/shared/components/tooltip/tooltip'
// import Pagination from '../../modules/shared/components/pagination/Pagination';
import ConfirmationModal from '../../modules/admin/modal/ConfirmationModal'
import { Container, Container_1, FilterButton, Icon, SpaceBetween, CreateButton } from 'libs/table/src/lib/tableStyles'
import MenuAction from 'libs/table/src/lib/MenuAction'
import { VideoComponent } from '@nft-marketplace/VideoComponent'
import { IsImage } from '@apps/admin/utils/helper'
import { APP_ENV } from '../../config'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'
import BulkCreatorApply from '@apps/admin/modules/admin/modal/bulkCreatorApply'
import BulkBlockUser from '@apps/admin/modules/admin/modal/bulkBlockUser'
import BulkUnblockUser from '@apps/admin/modules/admin/modal/bulkUnblockUser'
import UserFilterModel from '@apps/admin/modules/admin/modal/filterModel'
import WhiteListUser from '@apps/admin/modules/admin/modal/whiteListUser'

export const WebHref = styled.a`
  text-decoration: none;
`

const BulkOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 3.5rem 2rem;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

export const ArtImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`

export const Plus = styled.span`
  padding-right: -5px;
`
interface LabelProps {
  marginLeft?: string
}
export const Label = styled.div<LabelProps>`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  margin-left: ${(props) => props.marginLeft || '0'};
`

const pageLimit = 10
const VideoWrapper = styled.div`
  width: 10rem;
`
const UserNavList = styled.div`
  display: flex;
  padding: 1.5rem 2.5rem 0;
  border-bottom: 1.5px solid #D1E0E2;
  a {
    cursor: pointer;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    min-width: 150px;
    text-align: center;
    color: #4E4E4E;
    padding: 12px;
    &.active {
      font-weight: 600;
      color: #000;
      border-bottom: 3px solid #000;
    }
  } 
`

const UserListing: NextPage = () => {
  const router = useRouter()
  const [userData, setUserData] = useState<any>([])
  const [metaData, setMetaData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [bulkCreator, setBulkCreator] = useState(false)
  const [unblockUser, setUnblockUser] = useState(false)
  const [blockUser, setBlockUser] = useState(false)
  const [whitelistUser, setWhitelistUser] = useState(false)
  const [whitelistDropdown, setWhitelistDropdown] = useState([])
  const [filterData, setFilterData] = useState({
    from: '',
    to: '',
    role: '',
  })
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<any>(1)
  // const profileNavigate = (user) => {
  //   router.push('/users/' + user.id)
  // }

  const queryHandler = (e: any) => {
    setQuery(e.target.value)
    setPage(1)
  }
  const applyFilter = (data: any) => {
    if (data.from) {
      data.from = moment(data.from).startOf('day').toString()
    }
    if (data.to) {
      data.to = moment(data.to).endOf('day').toString()
    }
    if (data?.to && data?.from) setFilterData(data)
  }

  const resetFilter = (data: any) => {
    setModalOpen(false)
    setFilterData(data)
  }

  const meta = {
    title: 'NFT2.0 | Admin User Management',
    description: 'Admin User Management for NFT',
  }

  const commonModalPopup = (type: string, msg: string) => {
    if(type === 'success') {
      ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={msg} />)
      setTimeout(() => {
        getUsersListData(page, pageLimit)
        getDropdownData()
      }, 2000)
    } else {
      ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={msg} />)
    }
  }

  const getUsersListData = (
    page: number,
    limit = 10
    // filter = { from: filterData.joinDate, type: filterData.userName }
  ) => {
    console.log('filterData', filterData)
    let filter = objectDeepClone(filterData)
    if(activeTab === 3) filter['isBlocked'] = true 
    if(activeTab === 2) filter['isWhitelisted'] = true
    setShowLoader(true)
    API.getUsersList(page, limit, filter, query)
      .then((res) => {
        setPage(page)
        setShowLoader(false)
        if (res?.data?.data) {
          setUserData(res?.data?.data)
          setMetaData(res?.data?.data?.pageMeta)
        }
      })
      .catch((err) => {
        setShowLoader(false)
        console.log(err)
      })
  }

  const getDropdownData = () => {
    let query = ''
    let filter = {
        ['isWhitelisted'] : false
    }
    API.getUsersList(1, 10, filter, query)
    .then((res) => {
        if (res?.data?.data) {
          setWhitelistDropdown(res?.data?.data?.userList)
        }
    })
    .catch((err) => {
        console.log(err)
    })
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  useEffect(() => {
    const getData = setTimeout(() => {
      getUsersListData(page, pageLimit)
    }, 2000)

    return () => clearTimeout(getData)
  }, [query, page])

  useEffect(() => {
    if(page === 1) {
      getUsersListData(page, pageLimit)
    } else {
      setPage(1)
    }
    setUserData([])
  },[filterData, activeTab])

  // const applyAsCreator = (data) => {
  //   API.updateUserRole(data.id, { role: 'creator' }).then((res) => {
  //     if (res.status === 200) {
  //       ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.message || 'User role updated'} />)
  //     } else {
  //       ModalService.open((modalProps) => <ErrorModal close={modalProps.close} title="Warning" desc={res?.error?.error?.message || 'Role update failed'} />)
  //     }
  //     getUsersListData(page, pageLimit)
  //   })
  // }

  const goToAddPage = () => {
    router.push('/users/addUser')
  }

  useEffect(() => {
    getDropdownData()
  },[])

  const blockOrUnblockUser = (data: { [key: string]: any }) => {
    const body = {
      id: data?.id,
    }
    if (data?.isBlocked) {
      API.unblockUser(body).then((res) => {
        if (res.status === 200) {
          ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.message || 'User Unblocked'} />)
        } else {
          ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Unblock failed try again later'} />)
        }

        getUsersListData(page, pageLimit)
      })
    } else {
      API.blockUser(body).then((res) => {
        if (res.status === 200) {
          ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.message || 'User Blocked'} />)
        } else {
          ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Block failed try again later'} />)
        }

        getUsersListData(page, pageLimit)
      })
    }
  }

  const userResendEmailVerfication = (id) => {
    API.resendEmailVerfication(id)
    .then((res) => {
      if (res.status === 200) {
        ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.message || 'Email verification link sent successfully'} />)
      } else {
        commonModalPopup('error', res?.data?.message || 'Something went wrong try again later')
      }
    })
    .catch(err => {
      commonModalPopup('error', err?.error?.error?.data?.message || 'Something went wrong try again later')
    })
  }

  const removeFromWhitelist = (data: { [key: string]: any }) => {
    let payload = { id : data?.id }
    API.removeWhitelistUser(payload)
    .then((res) => {
      if (res.status === 200) {
        ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={res.message || 'User removed from WhiteList'} />)
      } else {
        commonModalPopup('error', res?.data?.message || 'Whitelisting failed try again later')
      }
      getUsersListData(page, pageLimit)
    })
    .catch(err => {
      commonModalPopup('error', err?.error?.error?.data?.message || 'Whitelisting failed try again later')
    })
  }

  const downloadCSV = ()=>{
    API.exportUserCSV()
    .then((res)=>{
      if(res?.data) {
        const csv = res?.data
        var hiddenElement = document.createElement('a');  
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);  
        hiddenElement.download = 'users.csv';  
        hiddenElement.click();  
        ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={'Users CSV downloaded successfully'} />)
      } else {
        ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Unable to download csv'} />)
      }
    })
    .catch((err)=>{
      ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Unable to download csv'} />)
    })
  }
  
  return (
    <>
      {modalOpen && <UserFilterModel onData={filterData} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter}></UserFilterModel>}
      {bulkCreator ? <BulkCreatorApply data={userData?.userList || []} commonModalPopup={commonModalPopup} setOpenModal={setBulkCreator}></BulkCreatorApply> : null}
      {whitelistUser && whitelistDropdown?.length ? <WhiteListUser data={whitelistDropdown || []} commonModalPopup={commonModalPopup} setOpenModal={setWhitelistUser} /> : null}
      {blockUser && userData?.userList?.length ? <BulkBlockUser data={userData?.userList.filter(el => el?.isBlocked === false) || []} commonModalPopup={commonModalPopup} setOpenModal={setBlockUser} /> : null}
      {unblockUser && userData?.userList?.length ? <BulkUnblockUser data={userData?.userList.filter(el => el?.isBlocked === true) || []} commonModalPopup={commonModalPopup} setOpenModal={setUnblockUser} /> : null}
      <AdminLayout meta={meta} pageTitle={`User Management `}>
        <Container className='pos-relative overflow-auto'>
          <UserNavList>
            <a className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>All users</a>
            <a className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>Whitelisted</a>
            <a className={activeTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>Blocked</a>
          </UserNavList>
          <SpaceBetween className='sticky'>
            <h2>TotalUsers({metaData?.totalItems})</h2>
            <Container_1>
              <TableSearch placeholder="Search" value={query || ''} onChange={queryHandler} />
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
              {APP_ENV?.NETWORK_TYPE == 'HEDERA' && (
                <CreateButton onClick={goToAddPage} className="add_icon">
                 
                  Create User
                </CreateButton>
              )}
            </Container_1>
          </SpaceBetween>
          <BulkOptions>
            <Container_1>
              {/* <CreateButton onClick={() => setBulkCreator(true)} className="add_icon mr-10">
                  Apply as creator
              </CreateButton> */}
              {activeTab === 1 
              ? <>
                <CreateButton onClick={goToAddPage} className="add_icon mr-10">
                  Add New User
                </CreateButton>
                <CreateButton onClick={() => downloadCSV()} className="add_icon mr-10">
                    Export CSV
                </CreateButton>
              </>
              : null}
              {activeTab === 2 
              ? <>
                <CreateButton  onClick={() => setWhitelistUser(true)} className="add_icon mr-10">
                  Whitelist User
                </CreateButton>
              </>
              : null}
              {/* <CreateButton onClick={() => setBlockUser(true)} className="add_icon mr-10">
                  Block Users
              </CreateButton>
              <CreateButton onClick={() => setUnblockUser(true)} className="add_icon">
                  Unblock Users
              </CreateButton> */}
            </Container_1>
          </BulkOptions>
          <Table
            columns={[
              { id: 1, title: 'User ID', key: 'id', hasNestedObject: false },
              {
                id: 2,
                title: 'UserName',
                key: 'name',
                render: (key: any) => (
                  <>
                    {/* <WebHref href={`${APP_ENV.CUSTOMER_WEB_URL}base/profile/${key?.userName}`}> */}
                      <FlexRow>
                        <ArtImage src={handleApiImage(key?.profilePicUrl) || '/images/shared/user-placeholder-black.png'} alt="art" />
                        <Label marginLeft="6px">{key?.userName}</Label>
                      </FlexRow>
                    {/* </WebHref> */}
                  </>
                ),
              },
              { id: 3, title: 'First Name', key: 'firstName',
                render: (key: any) => <FlexRow><Label>{key?.firstName}</Label></FlexRow>,
              },
              { id: 4, title: 'Last Name', key: 'lastName',
                render: (key: any) => <FlexRow><Label>{key?.lastName}</Label></FlexRow>,
              },
              { id: 5, title: 'Email', key: 'email',
                render: (key: any) => <FlexRow><Label>{key?.email}</Label></FlexRow>,
              },
              { id: 6, title: 'Phone Number', key: 'phone',
                render: (key: any) => <FlexRow><Label>{key?.countryCode && key?.phone ? key?.countryCode+' '+key?.phone : '-'}</Label></FlexRow>,
              },
              // {
              //   id: 6,
              //   title: 'Wallet address',
              //   key: 'Wallet address',
              //   render: (key: any) => (
              //     <>
              //       <FlexRow>
              //         <Label>{key?.walletAddress || '-'}</Label>
              //       </FlexRow>
              //     </>
              //   ),
              // },
              {
                id: 7,
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
              {
                id: 8,
                title: 'KYC Status',
                key: 'kycStatus',
              },
              {
                id: 9,
                title: 'Status',
                key: 'updatedAt',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>
                        {activeTab === 3 
                          ? 'Blocked' 
                          : activeTab === 2 
                            ? 'Whitelisted' 
                            : key?.isWhitelisted 
                              ? 'Whitelisted' 
                              : key?.isBlocked 
                                ? 'Blocked' 
                                : key?.emailVerified ? 'Active' : 'Inactive'}
                      </Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 10,
                title: 'Actions',
                key: 'actions',
                render: (key: any) => {
                  const dropDownData = [
                    {
                      name: 'Edit User',
                      id: 1,
                      action: () => router.push(`/users/update?id=${key?.id}`),
                    },
                  ]
                  let dataToBePushed
                  if(!key?.emailVerified) {
                    dataToBePushed = {
                      name: 'Resend Email Verification Link',
                      id: 2,
                      action: () => userResendEmailVerfication(key?.id),
                    },
                    dropDownData.push(dataToBePushed)
                  }
                  let whiteListAction
                  if (key?.isBlocked) {
                    dataToBePushed = {
                      name: 'Unblock',
                      id: 3,
                      action: () => blockOrUnblockUser(key),
                    }
                    dropDownData.push(dataToBePushed)
                  } else {
                    dataToBePushed = {
                      name: 'Block',
                      id: 3,
                      action: () => blockOrUnblockUser(key),
                    }
                    dropDownData.push(dataToBePushed)
                  }
                  if(activeTab === 2) {
                    whiteListAction = {
                      name: 'Remove',
                      id: 4,
                      action: () =>  removeFromWhitelist(key),
                    }
                    dropDownData.push(whiteListAction)
                  }
                  return (
                    <>
                      <MenuAction data={dropDownData} />
                    </>
                  )
                },
              },
            ]}
            data={userData?.userList}
            showLoader={showLoader}
          />
          {userData?.userList?.length ? <TablePagination total={userData?.pageMeta?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
        </Container>
      </AdminLayout>
    </>
  )
}

export default UserListing
