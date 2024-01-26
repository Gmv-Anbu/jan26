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

import { ArtworkImage, Container, Container_1, CreateButton, FilterButton, Icon, InputField, InputPath, SearchIcon, SpaceBetween } from 'libs/table/src/lib/tableStyles'
import MenuAction from 'libs/table/src/lib/MenuAction'
import { ModalService } from 'libs/modal/src/lib/ModalService'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'
import ConfirmationModal from '@apps/admin/modules/admin/shared/modal/confirmationModal'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch'

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

const CateogryListing: NextPage = () => {
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
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const meta = {
    title: 'NFT | Admin Artwork Listing',
    description: 'Admin Artwork Listing for NFT',
  }

  const goToAddPage = () => {
    router.push('/category/add')
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    setconfirmationModal(false)
    setErrorModal(false)
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  const getCategoryListData = (page: number, limit = 10) => {
    setShowLoader(true);
    let query = `?page=${page}&items=${limit}`
    if (search) query = `${query}&search=${search}`
    API.getCategoryList(query)
      .then((res) => {
        setPage(page)
        setShowLoader(false);
        if (res?.data?.data) {
          setCategoryData(res?.data?.data)
          setMetaData(res?.data?.data?.pageMeta)
        }
      })
      .catch((err) => {
        setShowLoader(false);
        console.log(err)
      })
  }

  const handleCategoryDelete = (id: number) => {
    API.deleteCategory(id)
      .then((res) => {
        if (res?.status === 200) {
          const success = ModalService.open((modalProps: any) => <SuccessModal desc="SuccessFully deleted category" close={modalProps.close} />)
          // setErrorMsg(null)
          getCategoryListData(1, pageLimit)
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
      getCategoryListData(page, pageLimit)
    }, 600)

    return () => clearTimeout(getData)
  }, [search, page])

  useEffect(() => {
    getCategoryListData(page, pageLimit)
  }, [])

  return (
    <AdminLayout meta={meta} pageTitle={`Category Management`}>
      <Container>
        <SpaceBetween>
          <h2>Total Categories({metaData?.totalItems})</h2>
          <Container_1>
            <TableSearch
              value={search || ''}
              onChange={(e) => {
                setSearch(e?.target?.value)
                setPage(1)
              }}
            />
            {/* <CreateButton onClick={goToAddPage} className="add_icon">
              <Plus>
                <Image src={`/svgs/icons/Vector.svg`} alt={`add`} width="11px" height="11px" />
              </Plus>
              Create Category
            </CreateButton> */}
          </Container_1>
        </SpaceBetween>
        <Table
          columns={[
            {
              id: 1,
              title: 'Category Name',
              key: 'name',
              hasNestedObject: false,
              render: (key: any) => (
                <>
                  <FlexRow>
                    {/* <ArtImage src={key?.imageUrl} alt="art" /> */}
                    <Label>{key?.name?.length > 25 ? `${key?.name.slice(0,25)}...` : key?.name}</Label>
                  </FlexRow>
                </>
              ),
            },
            {
              id: 2,
              title: 'Type',
              key: 'type',
              
            },
            {
              id: 3,
              title: 'No of Asset',
              key: 'assetCount',
            },
            {
              id: 4, 
              title: ' Created Date',
              key: 'creator',
              render: (key: any) => (
                <>
                  <FlexRow>
                    <Label>{moment(key?.updatedAt).format('DD-MM-YYYY')}</Label>
                  </FlexRow>
                </>
              ),
            },

            // {
            //   title: 'Actions',
            //   key: 'actions',
            //   render: (key: any) => (
            //     <>
            //       <MenuAction
            //         data={[
            //           {
            //             name: 'Edit Category',
            //             path: '/category/update',
            //             purpose: 'edit',
            //             data: key,
            //             action: () => router.push(`/category/update?id=${key?.id}`),
            //           },
            //           {
            //             name: 'Delete Category',
            //             path: '',
            //             purpose: 'delete',
            //             data: key,
            //             action: () => deleteClicked(key.id),
            //           },
            //         ]}
            //       ></MenuAction>
            //     </>
            //   ),
            // },
          ]}
          data={categoryData?.categoryList}
          showLoader={showLoader}
        />
        {categoryData?.categoryList?.length ? <TablePagination total={metaData?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
      </Container>
    </AdminLayout>
  )
}

export default CateogryListing
