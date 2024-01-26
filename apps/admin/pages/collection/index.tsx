import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Table } from '@nft-marketplace/table'
import moment from 'moment'

import AdminLayout from '../../modules/admin/components/layout/layout'
import API from '../../api/admin'
import { APP_ENV } from '../../config'
import TablePagination from '@apps/admin/modules/shared/components/pagination'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'
import ConfirmationModal from '@apps/admin/modules/admin/shared/modal/confirmationModal'

import { ArtworkImage, Container, Container_1, CreateButton, FilterButton, Icon, InputField, InputPath, SearchIcon, SpaceBetween } from 'libs/table/src/lib/tableStyles'
import MenuAction from 'libs/table/src/lib/MenuAction'
import { ModalService } from 'libs/modal/src/lib/ModalService'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'
import FilterModel from '@apps/admin/modules/admin/modal/userFilterModel'

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

export const Plus = styled.span`
  padding-right: -5px;
`
export const Label = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  margin-left: 0.6em;
`

const pageLimit = 10
const VideoWrapper = styled.div`
  width: 10rem;
`

interface IWebHref {
  link: boolean
}

const WebHref = styled.a<IWebHref>`
  text-decoration: none;
  cursor: ${(props) => (props.link ? 'pointer' : 'default')};
`

const CollectionListing: NextPage = () => {
  const router = useRouter()
  const [collectionData, setCollectionData] = useState<any>([])
  const [metaData, setMetaData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [confirmationModal, setconfirmationModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<number>(0)
  const [flag, setFlag] = useState(true)
  const [search, setSearch] = useState<string>('')
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [filtermodalOpen, setFilterModalOpen] = useState(false)
  const [filterData, setFilterData] = useState({
    from: '',
    to: '',
    role: '',
  })
  const meta = {
    title: 'NFT2.0 | Admin Artwork Listing',
    description: 'Admin Artwork Listing for NFT',
  }

  const applyFilter = (data: any) => {
    if (data?.to && data?.from) {
      data.from = moment(data?.from).startOf('day').toString()
      data.to = moment(data?.to).endOf('day').toString()
      getCollectionListData(page, pageLimit, data)
    }
  }

  const resetFilter = (data: any) => {
    getCollectionListData(page, pageLimit, data)
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    setconfirmationModal(false)
    setErrorModal(false)
  }

  const goToAddPage = () => {
    router.push('/collection/add')
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  const getCollectionListData = (page: number, limit = 10, filter?: any) => {
    setShowLoader(true)
    API.getCollectionList(page, limit, filter, search)
      .then((res) => {
        setPage(page)
        setShowLoader(false)
        if (res?.data?.data) {
          setCollectionData(res?.data?.data)
          setMetaData(res?.data?.data?.pageMeta)
        }

        if (filtermodalOpen) {
          setFilterModalOpen(false)
        }
      })
      .catch((err) => {
        setShowLoader(false)
        console.log(err)
      })
  }

  const handleCollectionDelete = (id: number) => {
    API.deleteCollection(id)
      .then((res) => {
        if (res?.status === 200) {
          const success = ModalService.open((modalProps: any) => <SuccessModal desc="SuccessFully Deleted Collection" close={modalProps.close} />)
          getCollectionListData(1, pageLimit)
        } else {
          if (res?.error) {
            const error = ModalService.open((modalProps: any) => <ErrorModal title="Warning" desc={res?.error?.error?.message} close={modalProps.close} />)
          }
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const onConfirmation = (data: any, id: any) => {
    ModalService.close(data)
    handleCollectionDelete(id)
  }

  const deleteClicked = (id: number) => {
    const confirm = ModalService.open((modalProps: any) => <ConfirmationModal title={'Delete collection'} close={modalProps.close} onConfirmation={() => onConfirmation(confirm, id)} desc={'Are you sure you want to delete this collection?'} />)
  }

  useEffect(() => {
    getCollectionListData(page, pageLimit)
  }, [])

  useEffect(() => {
    const getData = setTimeout(() => {
      getCollectionListData(page, pageLimit)
    }, 600)

    return () => clearTimeout(getData)
  }, [search, page])

  return (
    <>
      {filtermodalOpen && <FilterModel setFilterData={setFilterData} data={filterData} onApplyFilter={applyFilter} setOpenModal={setFilterModalOpen} onResetFilter={resetFilter}></FilterModel>}
      <AdminLayout meta={meta} pageTitle={`Collection Management`}>
        <Container>
          <SpaceBetween>
            <h2>Total Collections({metaData?.totalItems})</h2>
            <Container_1>
              <TableSearch
                value={search || ''}
                onChange={(e) => {
                  setSearch(e?.target?.value)
                  setPage(1)
                }}
              />
              <div>
                <FilterButton
                  onClick={(e) => {
                    e.preventDefault()
                    setFilterModalOpen(true)
                  }}
                >
                  <Icon xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="-287.75 385.885 27.219 21.063">
                    <path d="M-262.542 389.734h-11.625c-.442-1.618-1.91-2.817-3.667-2.817-1.756 0-3.224 1.199-3.667 2.817h-4.234a1 1 0 100 2h4.234c.443 1.617 1.91 2.816 3.667 2.816s3.224-1.199 3.667-2.816h11.625a1 1 0 100-2zm-15.292 2.816a1.817 1.817 0 110-3.633 1.817 1.817 0 010 3.633zM-286.735 402.109a1 1 0 001 1h11.625c.443 1.617 1.91 2.816 3.667 2.816 1.756 0 3.224-1.199 3.667-2.816h4.234a1 1 0 100-2h-4.234c-.443-1.618-1.91-2.817-3.667-2.817-1.756 0-3.225 1.199-3.667 2.817h-11.625a1 1 0 00-1 1zm14.475 0a1.817 1.817 0 113.634 0 1.817 1.817 0 01-3.634 0z"></path>
                  </Icon>
                  Filter
                </FilterButton>
              </div>

              <CreateButton onClick={goToAddPage} className="add_icon">
                <Plus>
                  <Image src={`/svgs/icons/Vector.svg`} alt={`add`} width="12px" height="12px" />
                </Plus>
                Create Collection
              </CreateButton>
            </Container_1>
          </SpaceBetween>
          <Table
            columns={[
              {
                id: 1,
                title: 'Collection Name',
                key: 'name',
                render: (key: any) => (
                  <>
                    <WebHref
                      href={key?.isActive ? `${APP_ENV.CUSTOMER_WEB_URL}base/collections/${key?.id}` : '#'}
                      link={key?.isActive ? true : false}
                      target="_blank"
                      onClick={(e) => {
                        if (!key?.isActive) e.preventDefault()
                      }}
                    >
                      <FlexRow>
                        <ArtImage src={key?.collectionImage} alt="art" />
                        <Label>{key.name}</Label>
                      </FlexRow>
                    </WebHref>
                  </>
                ),
              },
              {
                id: 2,
                title: 'Creator Name',
                key: 'creatorName',
                render: (key: any) => (
                  <>
                    <WebHref
                      href={key?.collectionCreator?.userName ? `${APP_ENV.CUSTOMER_WEB_URL}base/profile/${key?.collectionCreator?.userName}` : `#`}
                      target="_blank"
                      link={key?.collectionCreator?.userName ? true : false}
                    >
                      <FlexRow>
                        <ArtImage src={key?.collectionCreator?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${key?.collectionCreator?.profilePicUrl}` : '/images/shared/user-placeholder-black.png'} alt="art" />
                        <Label>
                          {key?.collectionCreator?.firstName} {key?.collectionCreator?.lastName}
                        </Label>
                      </FlexRow>
                    </WebHref>
                  </>
                ),
              },
              {
                id: 3,
                title: 'No of Assets',
                key: 'creator',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>{key?.assetCount}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 4,
                title: 'Registration Date',
                key: 'creator',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>{moment(key?.createdAt).format('DD-MM-YYYY')}</Label>
                    </FlexRow>
                  </>
                ),
              },

              {
                title: 'Actions',
                key: 'actions',
                render: (key: any) => (
                  <>
                    <MenuAction
                      data={[
                        {
                          name: 'Edit Collection',
                          path: '/category/update',
                          purpose: 'edit',
                          data: key,
                          action: () => router.push(`/collection/update?id=${key?.id}`),
                        },
                        {
                          name: 'Delete Collection',
                          path: '',
                          purpose: 'delete',
                          data: key,
                          action: () => deleteClicked(key.id),
                        },
                      ]}
                    ></MenuAction>
                  </>
                ),
              },
            ]}
            data={collectionData?.collectionList}
            showLoader={showLoader}
          />
          {collectionData?.collectionList?.length ? <TablePagination total={metaData?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
        </Container>
      </AdminLayout>
    </>
  )
}

export default CollectionListing
