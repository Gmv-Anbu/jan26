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
import { handleApiImage } from '@apps/admin/utils/helper'
import ToggleButton from 'react-toggle-button';
import { Loader } from '@apps/admin/modules/shared/components/Loader'

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
  white-space: nowrap;
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

const AssetListing: NextPage = () => {
  const router = useRouter()
  // const navigate = useNavigate();
  const [assetData, setAssetData] = useState<any>([])
  const [metaData, setMetaData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [confirmationModal, setconfirmationModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<number>(0)
  const [flag, setFlag] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(null)
  const [bulkUploadModalOpen, setBulkUploadModalOpen] = useState(false)
  const [transferModel, setTransferModel] = useState(false)
  const [transferId, setTransferID] = useState()
  const [userData, setUserData] = useState<any>([])

  const [filterData, setFilterData] = useState({
    from: '',
    to: '',
    type: '',
    saleType: '',
  })
  const [showLoader, setShowLoader] = useState<boolean>(false)

  const applyFilter = (data: any) => {
    // if (!data.from && !data.to) {
    //   return false
    // }
    if (data.from) {
      data.from = moment(data.from).startOf('day').toString()
    }
    if (data.to) {
      data.to = moment(data.to).endOf('day').toString()
    }
    setFilterData(data)

    // getAssetListData(page, 10);
  }

  const resetFilter = (data: any) => {
    setModalOpen(false)
    setFilterData(data)
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    setconfirmationModal(false)
  }

  const goToAddPage = () => {
    router.push('/artwork/add')
  }
  const queryHandler = (e: any) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  //Featured Toggle button//

  const toggleHandler = (id: any, data: any) => {
    API.getFeatured(id)
      .then((res) => {
        if (res.error?.error) {
          ModalService.open((modalProps) => <ErrorModal title="Warning" close={modalProps.close} desc={res?.error?.error?.message} />)
        } else {
          if (!data.isFeaturedAsset) {
            ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Asset removed from featured list" />)
          } else {
            ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Asset added to featured list" />)
          }
          getAssetListData(page, 10)
        }
      })
      .catch((err) => {
        console.log(err)
        ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={err?.error?.message} />)
      })
  }

  // Asset sale status toggle function

  const toggleStatusHandler = (id: any, data: any) => {
    API.updateSaleStatus(id)
      .then((res) => {
        if (res.error?.error) {
          ModalService.open((modalProps) => <ErrorModal title="Warning" close={modalProps.close} desc={res?.error?.error?.message} />)
        } else {
          // if (!data.forSell) {
          ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Asset sale status changed" />)
          // }
          //  else {
          //   ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Asset activated" />)
          // }
          getAssetListData(page, 10)
        }
      })
      .catch((err) => {
        console.log(err)
        ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={err?.error?.message} />)
      })
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  const getAssetListData = (page: number, limit = 10) => {
    setShowLoader(true)
    let query = `?page=${page}&items=${limit}`
    if (searchQuery) {
      query += `&search=${searchQuery}`
    }
    API.getAssetList(page, limit, filterData, searchQuery)
      .then((res) => {
        setPage(page)
        setShowLoader(false)
        if (res) {
          setAssetData(res?.data?.data)
          setMetaData(res?.data?.data)
        }
        // setModalOpen(false)
      })
      .catch((err) => {
        console.log(err)
        setShowLoader(false)
      })
  }

  const handleClose = (modal: any) => {
    ModalService.close(modal)
  }

  const handleDeleteAsset = (id: number) => {
    API.deleteAssetById(id)
      .then((res) => {
        if (res?.data?.message === 'Removed asset successfully') {
          // openModal()
          const success = ModalService.open((modalProps: any) => <SuccessModal title="Success" desc={'Asset removed successfully'} close={() => handleClose(success)} />)
          getAssetListData(1, pageLimit)
        } else if (res?.error?.error?.code == 400) {
          const error = ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
        }
      })
      .catch((err: any) => {
        console.log(err, { err }, err?.error?.error)
      })
  }

  const onConfirmation = () => {
    setconfirmationModal(false)
    handleDeleteAsset(selectedAsset)
  }

  const transferHandle = (id) => {
    setTransferModel(true)
    setTransferID(id)
    getAssetListData(page, pageLimit)
  }

  const deleteClicked = (id: number) => {
    setconfirmationModal(true)
    setSelectedAsset(id)
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      getAssetListData(page, pageLimit)
    }, 2000)
    return () => clearTimeout(getData)
  }, [searchQuery, page])

  useEffect(() => {
    if (page === 1) {
      getAssetListData(page, pageLimit)
    } else {
      setPage(1)
    }
  }, [filterData])

  useEffect(() => {
    getAssetListData(page, pageLimit)
    getUsersListData(1, 500)
  }, [bulkUploadModalOpen])

  const updateSale=(id,value)=>{
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.updateAssetSale(id,{type:value})
      .then((res) => {
        ModalService.close(fullLoader)
        setShowLoader(false)
        if (res?.status==200) {
          getAssetListData(page, pageLimit)
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        console.log(err)
      })
  }

  const getUsersListData = (
    page: number,
    limit = 10
    // filter = { from: filterData.joinDate, type: filterData.userName }
  ) => {
    setShowLoader(true)
    let filter = {
      "isBlocked": false
    }
    API.getUsersList(page, limit, filter, searchQuery)
      .then((res) => {
        setPage(page)
        setShowLoader(false)
        if (res?.data?.data) {
          setUserData(res?.data?.data)
        }
      })
      .catch((err) => {
        setShowLoader(false)
        console.log(err)
      })
  }

  const renderCellContent = (key: any) => {
    switch (key) {
      case 'name':
        return (
          <>
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.99967 0.5C1.08301 0.5 0.333008 1.25 0.333008 2.16667C0.333008 3.08333 1.08301 3.83333 1.99967 3.83333C2.91634 3.83333 3.66634 3.08333 3.66634 2.16667C3.66634 1.25 2.91634 0.5 1.99967 0.5ZM1.99967 12.1667C1.08301 12.1667 0.333008 12.9167 0.333008 13.8333C0.333008 14.75 1.08301 15.5 1.99967 15.5C2.91634 15.5 3.66634 14.75 3.66634 13.8333C3.66634 12.9167 2.91634 12.1667 1.99967 12.1667ZM1.99967 6.33333C1.08301 6.33333 0.333008 7.08333 0.333008 8C0.333008 8.91667 1.08301 9.66667 1.99967 9.66667C2.91634 9.66667 3.66634 8.91667 3.66634 8C3.66634 7.08333 2.91634 6.33333 1.99967 6.33333Z"
                fill="#131313"
              />
            </svg>
          </>
        )
        break

      default:
        break
    }
  }

  const commonModalPopup = (type: string, msg: string) => {
    if (type === 'success') {
      ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={msg} />)
      setTimeout(() => {
        getAssetListData(page, pageLimit)
      }, 2000)
    } else {
      ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={msg} />)
    }
  }

  return (
    <>
      {modalOpen && <ArtWorkFilterModel data={filterData} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter}></ArtWorkFilterModel>}
      {bulkUploadModalOpen && <BulkUploadModel setOpenModal={setBulkUploadModalOpen}></BulkUploadModel>}
      {transferModel && (
        <TransferNft
          data={userData?.userList?.map((transfer) => ({
            label: transfer.firstName || transfer?.userName || transfer?.email || transfer.id,
            value: transfer.id,
          }))}
          tokenId={transferId}
          setOpenModal={setTransferModel}
          commonModalPopup={commonModalPopup}
        ></TransferNft>
      )}

      <AdminLayout meta={meta} pageTitle={`Asset Management`}>
        <Container className='pos-relative overflow-auto'>
          <SpaceBetween className='sticky'>
            <h2>Total Assets({metaData?.pageMeta?.totalItems})</h2>
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
                <CreateButton
                  onClick={(e) => {
                    e.preventDefault()
                    setBulkUploadModalOpen(true)
                  }}
                >
                  Bulk Upload
                </CreateButton>
              </div>

              <CreateButton onClick={goToAddPage} className="add_icon">
                {/* <Plus>
                  <Image src={`/svgs/icons/Vector.svg`} alt={`add`} width="12px" height="12px" />
                </Plus> */}
                Create Assets
              </CreateButton>
            </Container_1>
          </SpaceBetween>
          <Table
            columns={[
              { id: 1, title: 'Token ID', key: 'id', hasNestedObject: false },
              {
                id: 2,
                title: 'Brand Name',
                key: 'name',
                render: (key: any) => {
                  return (
                    <>
                      {/* <WebHref target="_blank" href={`${APP_ENV.CUSTOMER_WEB_URL}base/assetDetails?id=${key?.id}`}> */}
                      <FlexRow>
                        {key?.mainAssetType == 'images' ? (
                          <ArtImage src={handleApiImage(key?.thumbnailURL || key?.mainAssetUrl)} alt="art" />
                        ) : key?.mainAssetType == 'video' ? (
                          <VideoWrapper>
                            <VideoComponent filePath={key?.mainAssetUrl} mute={true} autoPlay={false} width={30} height={30} controls={false} />
                          </VideoWrapper>
                        ) : key?.mainAssetType == 'audio' ? (
                          <AudioComponent filePath={key?.mainAssetUrl} height={30} width={35} controls={false} mute={true} autoPlay={false} containerWidth="20" />
                        ) : null}
                        <Label marginLeft='8px'>{key?.name?.length > 14 ? key?.name?.slice(0, 15) + '...' : key?.name}</Label>
                      </FlexRow>
                      {/* </WebHref> */}
                    </>
                  )
                },
              },
              // {
              //   id: 3,
              //   title: 'Creator Name',
              //   key: 'creator',
              //   render: (key: any) => (
              //     <>
              //       <WebHref target="_blank" href={`${APP_ENV.CUSTOMER_WEB_URL}base/profile/${key?.userAssetEdition?.userName || '/images/shared/user-placeholder-black.png'}`}>
              //         <FlexRow>
              //           <ArtImage src={key?.userAssetEdition?.profilePicUrl ? `${APP_ENV.S3_ASSET_URL}/${key?.userAssetEdition?.profilePicUrl}` : '/images/shared/user-placeholder-black.png'} alt="art" />
              //           <Label>
              //             {key?.userAssetEdition?.firstName} {key?.userAssetEdition?.lastName}
              //           </Label>
              //         </FlexRow>
              //       </WebHref>
              //     </>
              //   ),
              // },
              {
                id: 3,
                title: 'Ref No',
                key: 'refNo',
                width: '200px',
                // hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>{key?.refNo}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 4,
                title: 'Ref Name',
                key: 'refName',
                width: '200px',
                // hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>{key?.refName}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 5,
                title: 'Category',
                key: 'category',
                // hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>{key?.categoryData?.name || '-'}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 6,
                title: 'Type',
                key: 'type',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label className='caps'>{key?.type || '-'}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 6,
                title: 'Sale Type',
                key: 'type',
                render: (key: any) => {
                  let auctionType = false
                  if(key?.editions?.[1]?.auctionsData?.[0]?.type) auctionType = true
                  return <>
                    <FlexRow>
                      <Label className='caps'>{key?.saleType || '-'}  {(key?.saleType && auctionType) ? `(${key?.editions?.[1]?.auctionsData?.[0]?.type})` : ''}</Label>
                    </FlexRow>
                  </>
                },
              },
              // { id: 1, title: 'Asset Weight', key: 'assetWeight', hasNestedObject: false },
              // { id: 1, title: 'Asset Width', key: 'assetWidth', hasNestedObject: false },
              // { id: 1, title: 'Asset Height', key: 'assetHeight', hasNestedObject: false },
              {
                id: 7,
                title: 'Royalty Percentage',
                key: 'royaltyPercentage',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>
                        {Number(key?.royaltyPercentage) || '0'}
                      </Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 8,
                title: 'Price',
                key: 'resellPrice',
                // hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>
                        {Number(key?.primarySalePrice) || '0'}
                      </Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 11,
                title: 'On-Sale',
                key: 'resellPrice',
                // hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <ToggleButton
                        inactiveLabel={""}
                        activeLabel={""}
                        value={key?.type=='buy' ? true:false
                        }
                        disabled={key?.type=='transferred' ? true:false}
                        onToggle={(value) => {
                          if(key?.type!='transferred'){
                            updateSale(key?.id,value ? 'museum':'buy')
                          }
                        }} />

                    </FlexRow>
                  </>
                ),
              },

              {
                id: 9,
                title: 'Registered Date',
                key: 'updatedAt',
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
              // {
              //   id: 7,
              //   title: 'Total Edition',
              //   key: 'totalEditionCount',
              //   render: (key: any) => (
              //     <>
              //       <FlexRow>
              //         <Label>{key?.assetsData?.totalEditionCount}</Label>
              //       </FlexRow>
              //     </>
              //   ),
              // },
              // {
              //   id: 8,
              //   title: 'Featured',
              //   key: 'isFeaturedAsset',
              //   render: (key: any) => (
              //     // let [key,setKey]=useState(key.isFeaturedAsset)
              //     <>
              //       <CheckBoxWrapper>
              //         <CheckBox
              //           checked={key.isFeaturedAsset}
              //           name={key.id}
              //           type="checkbox"
              //           onChange={(e: any) => {
              //             key.isFeaturedAsset = e.target.checked
              //             toggleHandler(key.id, key)
              //           }}
              //           id={key.id}
              //         ></CheckBox>
              //         <CheckBoxLabel htmlFor={key.id}></CheckBoxLabel>
              //       </CheckBoxWrapper>
              //     </>
              //   ),
              // },
              // {
              //   id: 9,
              //   title: 'Sale status',
              //   key: 'forSell',
              //   render: (key: any) => (
              //     // let [key,setKey]=useState(key.isFeaturedAsset)
              //     <>
              //       <CheckBoxWrapper>
              //         <CheckBox
              //           checked={key.forSell}
              //           name={key.assetId}
              //           type="checkbox"
              //           onChange={(e: any) => {
              //             key.forSell = e.target.checked
              //             toggleStatusHandler(key.id, key)
              //           }}
              //           id={key.assetId}
              //         ></CheckBox>
              //         <CheckBoxLabel htmlFor={key.assetId}></CheckBoxLabel>
              //       </CheckBoxWrapper>
              //     </>
              //   ),
              // },
              {
                id: 10,
                title: 'Actions',
                key: 'actions',
                render: (key: any) => {
                  let options = []
                  if (key?.type === "transferred") {
                    options = [{
                      name: 'No options',
                      id: 1,
                      action: () => { }
                    }]
                  } else {
                    options = [
                      {
                        name: 'Edit Asset',
                        id: 1,
                        action: () => router.push(`/artwork/update?id=${key?.id}`),
                        link: `/artwork/update?id=${key?.id}`
                      },
                      {
                        name: 'Delete Asset',
                        id: 2,
                        action: () => handleDeleteAsset(key?.id),
                        // ModalService.open((modalProps) => (
                        //   <div> Show me the menaing ${key.id}</div>
                        // )),
                      },
                      {
                        name: 'Transfer Asset',
                        id: 2,
                        action: () => transferHandle(key?.id),
                        // ModalService.open((modalProps) => (
                        //   <div> Show me the menaing ${key.id}</div>
                        // )),
                      },
                    ]
                  }
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
            data={assetData?.assetList}
            showLoader={showLoader}
          />
          {assetData?.assetList?.length ? <TablePagination total={metaData?.pageMeta?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}

          <ConfirmationModal show={confirmationModal} onConfirmation={onConfirmation} closeModal={closeModal} title={'Are you sure you want to delete asset ?'} />
        </Container>
      </AdminLayout>
    </>
  )
}

export default AssetListing
