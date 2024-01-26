
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next';
import styled from 'styled-components';
import AdminLayout from '../../modules/admin/components/layout/layout';
import meta from '@apps/admin/modules/shared/components/meta';
import { ArtworkImage, Container, Container_1, CreateButton, FilterButton, Icon, InputField, InputPath, SearchIcon, SpaceBetween } from 'libs/table/src/lib/tableStyles'
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch';
import TablePagination from '@apps/admin/modules/shared/components/pagination';
import { Table } from '@nft-marketplace/table';
import { useRouter } from 'next/router';
import MenuAction from 'libs/table/src/lib/MenuAction';
import { ModalService } from '@nft-marketplace/modal';
import ErrorModal from '../../modules/admin/modal/error';
import Image from 'next/image'
import {
  ButtonContainer,
  HeaderContainer,
  Plus,
  TableHeader,
} from 'libs/table/src/lib/tableStyles';
import { handleApiImage, localDateToUTC } from '@apps/admin/utils/helper';
import API from '../../api/admin';
import { Loader } from '@apps/admin/modules/shared/components/Loader';
import SuccessModal from '../../modules/admin/modal/success';
import TypeFilterModal from '@apps/admin/modules/admin/modal/typeFilterModal';

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
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

const FAQPage: NextPage = () => {
  const [metaData, setMetaData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [FAQData, setFAQData] = useState<any>([]);
  const [pageLimit, setPageLimit] = useState(10);
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const router = useRouter();
  const [data, setData] = useState<any>({})
  const [apiError, setAPIError] = useState<any>(null)
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setShowModal(true);
  const [filterType, setFilterType] = useState('')

  const queryHandler = (e: any) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const goToAddPage = () => {
    router.push('/FAQ/add')
  }

  useEffect(() => {
    getFaqs(page, pageLimit)
  }, [searchQuery,page, filterType])

  const getFaqs = (page: number, limit = 10) => {
    setShowLoader(true)
    let query = `?page=${page}&items=${limit}`
    if (searchQuery) {
      query += `&search=${searchQuery}`
    }
    API.getFAQ(page, limit, filterType, searchQuery)
      .then((res) => {
        console.log('FAQ res', res)
        setPage(page)
        setShowLoader(false)
        if (res) {
          setFAQData(res?.data?.data)
          setMetaData(res?.data?.data)
        }
        // setModalOpen(false)
      })
      .catch((err) => {
        console.log(err)
        setShowLoader(false)
      })
  }
  const closeModal = () => {
    setShowModal(false)
    if (!apiError) getFaqs(page, pageLimit)
  }
  const deleteClicked = (id) => {
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.deleteFAQ(id).then((res) => {
      if (res?.data !== null && res?.status === 200) {
        ModalService.close(fullLoader)
        setAPIError(null)
        openModal()
      } else if (res?.error?.error) {
        ModalService.close(fullLoader)
        ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
      }
    }).catch((err) => {
      ModalService.close(fullLoader)
    })
  }

  const applyFilter = (data: any) => {
    console.log('data')
    setFilterType(data)
  }

  const resetFilter = (data: any) => {
    setFilterType('')
    setModalOpen(false)
  }

  return (
    <>
    {modalOpen && <TypeFilterModal data={filterType} onApplyFilter={applyFilter} setOpenModal={setModalOpen} onResetFilter={resetFilter}></TypeFilterModal>}
      <AdminLayout meta={meta} pageTitle={`FAQ`}>
        <Container>
          <SpaceBetween>
            <h2>Total FAQs({metaData?.count})</h2>
            <Container_1>
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
              <TableSearch placeholder="Search" value={searchQuery || ''} onChange={queryHandler} />
              <ButtonContainer>
                <CreateButton className='flex-align-center' onClick={() => {
                  goToAddPage();
                }}>

                  {/* <Image src={`/svgs/icons/Vector.svg`} alt={`add`} width="20px" height="20px" /> */}
                  Create FAQ{' '}
                </CreateButton>
              </ButtonContainer>
            </Container_1>
          </SpaceBetween>
          <Table
            columns={[
              {
                id: 1, title: 'Type', key: 'type', hasNestedObject: false,
                width: '15%'
              },
              {
                id: 2, title: 'Question', key: 'question', hasNestedObject: false,
                width: '25%'
              },
              {
                id: 3,
                title: 'Answer',
                key: 'answer',
                width: '50%'
              },
              {
                id: 4,
                title: 'Actions',
                key: 'actions',
                width: '10%',
                render: (key: any) => (
                  <>
                    <MenuAction
                      data={[
                        {
                          name: 'Edit FAQ',
                          path: '/FAQ/add',
                          purpose: 'edit',
                          data: key,
                          action: () => router.push(`/FAQ/add?id=${key?.id}`),
                        },
                        {
                          name: 'Delete FAQ',
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
            data={FAQData?.rows}
            showLoader={showLoader}
          />
          {FAQData?.rows?.length ? <TablePagination total={metaData?.count} limit={pageLimit} currentPage={page} setCurrentPage={setPage} /> : null}
          {apiError ? <ErrorModal show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
        </Container>
      </AdminLayout>
    </>
  )
}

export default FAQPage