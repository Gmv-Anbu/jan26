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
import { formatToUSD, handleApiImage } from '@apps/admin/utils/helper'

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
  text-transform: capitalize;
  margin-left: ${(props) => props.marginLeft || '0'};
`

const pageLimit = 10

const ArchiveOffers: NextPage = () => {
  const router = useRouter()
  const [archiveOffersData, setArchiveOffersData] = useState<any>([])
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
    title: 'NFT | Admin Archive Offers',
    description: 'Admin Archive Offers',
  }

  // Change page
  const paginate = (pageNumber) => setPage(pageNumber)

  const getArchiveOffersData = (page: number, limit = 10) => {
    setShowLoader(true);
    let query = `?page=${page}&items=${limit}`
    if (search) query = `${query}&search=${search}`
    API.getArchiveOffers(query)
      .then((res) => {
        console.log('asdasdasd', res)
        setPage(page)
        setShowLoader(false);
        if (res?.data?.data?.list?.rows) {
          setArchiveOffersData(res?.data?.data?.list?.rows)
          setMetaData(res?.data?.data?.pageMeta)
        }
      })
      .catch((err) => {
        setShowLoader(false);
        console.log(err)
      })
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      getArchiveOffersData(page, pageLimit)
    }, 600)
    return () => clearTimeout(getData)
  }, [search, page])

  useEffect(() => {
    getArchiveOffersData(page, pageLimit)
  }, [])

  return (
    <AdminLayout meta={meta} pageTitle={`Archive Offers`}>
      <Container>
        <SpaceBetween>
          <h2>Total Offers({metaData?.totalCount})</h2>
          <Container_1>
            <TableSearch
              value={search || ''}
              onChange={(e) => {
                setSearch(e?.target?.value)
                setPage(1)
              }}
            />
          </Container_1>
        </SpaceBetween>
        <Table
            columns={[
                { id: 1, title: 'Asset Id', key: 'assetId' },
                { id: 2, title: 'Asset Name', key: 'assetName',
                    render: (key: any) => (
                        <FlexRow>
                            <ArtImage src={handleApiImage(key?.assetsData?.thumbnailURL || key?.assetsData?.mainAssetUrl)} alt="art" />
                            &nbsp;<Label>{key?.assetsData?.name}</Label>
                        </FlexRow>
                    ),
                },
                { id: 3, title: 'Asset Price', key: 'assetPrice',
                    render: (key: any) => (
                        <FlexRow><Label>{formatToUSD(key?.assetsData?.primarySalePrice)}</Label>
                        </FlexRow>
                    ),
                },
                { id: 4, title: 'Offer Price', key: 'offerPrice',
                    render: (key: any) => (
                        <FlexRow>
                            <Label>{formatToUSD(key?.offerPrice)}</Label>
                        </FlexRow>
                    ),
                },
                { id: 5, title: 'Requested By', key: 'user',
                    render: (key: any) => (
                        <FlexRow>
                            <Label>{`${key?.userData?.firstName} ${key?.userData?.lastName} (${key?.userData?.email})`}</Label>
                        </FlexRow>
                    ),
                },
                { id: 6, title: 'Requested Date', key: 'date',
                    render: (key: any) => (
                        <FlexRow>
                            <Label>{moment(key?.createdAt).format('DD-MM-YYYY')}</Label>
                        </FlexRow>
                    ),
                },
                { id: 7, title: 'Status', key: 'status',
                    render: (key: any) => (
                        <FlexRow>
                            <Label>{key?.status}</Label>
                        </FlexRow>
                    ),
                },
            ]}
            data={archiveOffersData}
            showLoader={showLoader}
        />
        {archiveOffersData?.length ? <TablePagination total={metaData?.totalItems} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
      </Container>
    </AdminLayout>
  )
}

export default ArchiveOffers
