import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Table } from '@nft-marketplace/table'
import moment from 'moment'

import AdminLayout from '../../modules/admin/components/layout/layout'
import API from '../../api/admin'
import TablePagination from '@apps/admin/modules/shared/components/pagination'
import SubCateforyFilterModel from '../../modules/admin/subCategory/subCategoryFilterModel'
import { ArtworkImage, Container, Container_1, CreateButton, FilterButton, Icon, InputField, InputPath, SearchIcon, SpaceBetween } from 'libs/table/src/lib/tableStyles'
import MenuAction from 'libs/table/src/lib/MenuAction'
import { ModalService } from 'libs/modal/src/lib/ModalService'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'
import ConfirmationModal from '@apps/admin/modules/admin/shared/modal/confirmationModal'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'
import { handleApiImage } from '@apps/admin/utils/helper'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  &.mx-250px {
    max-width: 250px;
  }
`

export const ArtImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 5px;
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
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  margin-left: ${(props) => props.marginLeft || '0'};
`

const pageLimit = 10

const SubCateogryListing: NextPage = () => {
  const router = useRouter()
  const [assetData, setAssetData] = useState<any>([])
  const [categoryData, setCategoryData] = useState<any>([])
  const [metaData, setMetaData] = useState<any>([])
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [confirmationModal, setconfirmationModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<number>(0)
  const [flag, setFlag] = useState(true)
  const [search, setSearch] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [errorModal, setErrorModal] = useState(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterData, setFilterData] = useState({
    from: '',
    to: '',
    sortBy:'createdAt',
    orderBy:'desc'
  })
  const meta = {
    title: 'NFT | Admin Artwork Listing',
    description: 'Admin Artwork Listing for NFT',
  }

  const goToAddPage = () => {
    router.push('/subcategory/add')
  }
  const applyFilter = (data: any) => {
    // if (!data.from && !data.to) {
    //   return false
    // }
    if (data.from) {
      data.from = moment(data.from).startOf('day').toISOString()
    }
    if (data.to) {
      data.to = moment(data.to).endOf('day').toISOString()
    }
    setFilterData(data)
    // getSubCategoryListData(page, pageLimit)
    // getAssetListData(page, 10);
  }

  const resetFilter = (data: any) => {
    setFilterData(data)
    setModalOpen(false)
  }
  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    setconfirmationModal(false)
    setErrorModal(false)
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  const getSubCategoryListData = (page: number, limit = 10) => {
    setShowLoader(true)
    let query = `?page=${page}&items=${limit}&sortBy=createdAt&orderBy=desc`
    if (search) query = `${query}&search=${search}&`
    API.subCategoryDataAll(page, limit, filterData, search)
      .then((res) => {
        setPage(page)
        setShowLoader(false)
        if (res?.data?.data) {
          setCategoryData(res?.data?.data)
          setMetaData(res?.data?.data?.pageMeta)
        }
      })
      .catch((err) => {
        setShowLoader(false)
        console.log(err)
      })
  }

  const handleCategoryDelete = (id: number) => {
    API.deleteCategory(id)
      .then((res) => {
        if (res?.status === 200) {
          const success = ModalService.open((modalProps: any) => <SuccessModal desc="SuccessFully deleted category" close={modalProps.close} />)
          // setErrorMsg(null)
          getSubCategoryListData(1, pageLimit)
        } else {
          if (res?.error) {
            setErrorMsg(res?.error?.error?.message)
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
    handleCategoryDelete(id)
  }

  const deleteClicked = (id: number) => {
    const confirm = ModalService.open((modalProps: any) => <ConfirmationModal title={'Delete category'} close={modalProps.close} onConfirmation={() => onConfirmation(confirm, id)} />)
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      getSubCategoryListData(page, pageLimit)
    }, 600)

    return () => clearTimeout(getData)
  }, [search, page])

  useEffect(() => {
    if(page === 1) {
      getSubCategoryListData(page, pageLimit)
    } else {
        setPage(1)
    }
  },[filterData])

  useEffect(() => {
    getSubCategoryListData(page, pageLimit)
  }, [])

  return (
    <>
      {modalOpen && <SubCateforyFilterModel data={filterData} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter}></SubCateforyFilterModel>}
      <AdminLayout meta={meta} pageTitle={`Sub Category Management`}>
        <Container>
          <SpaceBetween>
            <h2>Total Sub Categories({metaData?.totalItems})</h2>
            <Container_1>
              <TableSearch
                value={search || ''}
                onChange={(e) => {
                  setSearch(e?.target?.value)
                  setPage(1)
                }}
              />
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
              <CreateButton onClick={goToAddPage} className="add_icon">
                <Plus>
                  <Image src={`/svgs/icons/Vector.svg`} alt={`add`} width="11px" height="11px" />
                </Plus>
                Create Sub Category
              </CreateButton>
            </Container_1>
          </SpaceBetween>
          <Table
            columns={[
              {
                id: 1,
                title: 'Sub Category Name',
                key: 'name',
                hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      {/* <ArtImage src={key?.imageUrl || '/images/shared/placeholder-image-2.jpg'} alt="art" /> */}
                      <Label>{key?.name?.length > 25 ? `${key?.name.slice(0, 25)}...` : key?.name}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 1,
                title: 'Image',
                key: 'name',
                hasNestedObject: false,
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <ArtImage src={key?.imageUrl || '/images/shared/placeholder-image-2.jpg'} alt="art" />
                      {/* <Label>{key?.name?.length > 25 ? `${key?.name.slice(0, 25)}...` : key?.name}</Label> */}
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 2,
                title: 'No of Asset',
                key: 'assetCount',
              },
              {
                id: 3,
                title: ' Created Date',
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
                id: 4,
                title: ' Status',
                key: 'status',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>{key?.isActive ? 'Active' : 'Inactive'}</Label>
                    </FlexRow>
                  </>
                ),
              },
              {
                id: 5,
                title: 'Description',
                key: 'description',
                width: '24%',
                render: (key: any) => (
                  <>
                    <FlexRow>
                      <Label>{key?.description || 'NA'}</Label>
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
                          name: 'Edit Sub Category',
                          path: '/subcategory/update',
                          purpose: 'edit',
                          data: key,
                          action: () => router.push(`/subcategory/update?id=${key?.id}`),
                        },
                        //   {
                        //     name: 'Inactivate Subcategory',
                        //     path: '',
                        //     purpose: 'delete',
                        //     data: key,
                        //     action: () => deleteClicked(key.id),
                        //   },
                      ]}
                    ></MenuAction>
                  </>
                ),
              },
            ]}
            data={categoryData?.subCategoryList}
            showLoader={showLoader}
          />
          {categoryData?.subCategoryList?.length ? <TablePagination total={metaData?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
        </Container>
      </AdminLayout>
    </>
  )
}

export default SubCateogryListing
