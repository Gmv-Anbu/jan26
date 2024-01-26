import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { Table } from '@nft-marketplace/table';
import moment from 'moment';
import TablePagination from '@apps/admin/modules/shared/components/pagination';
import AdminLayout from '../../modules/admin/components/layout/layout';

import API from '../../api/admin';
import {
    Container,
    Container_1,
    CreateButton,
    FilterButton,
    Icon,
    SpaceBetween,
} from 'libs/table/src/lib/tableStyles';
import FilterModal from '../../modules/admin/modal/userFilterModel';
import TableSearch from '@apps/admin/modules/admin/components/inputElements/tableSearch';
import UserFilterModel from '@apps/admin/modules/admin/modal/filterModel';
import { ModalService } from '@nft-marketplace/modal';
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

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
`;

const pageLimit = 10;

const SubscriberListing: NextPage = () => {
    const [subscriberData, setSubscriberData] = useState<any>([]);
    const [metaData, setMetaData] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [filterData, setFilterData] = useState({
        from: '',
        to: '',
        role: ''
    });
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const queryHandler = (e: any) => {
        setQuery(e.target.value);
        setPage(1)
    };
    const applyFilter = (data: any) => {
        if (data?.to && data?.from) setFilterData(data)
    };

    const resetFilter = (data: any) => {
        setFilterData(data)
        setModalOpen(false)
    };

    const downloadCSV = ()=>{
        API.exportNewsletterCSV()
        .then((res)=>{
          if(res?.data) {
            const csv = res?.data
            var hiddenElement = document.createElement('a');  
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);  
            hiddenElement.download = 'newsletter.csv';  
            hiddenElement.click();  
            ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc={'NewsLetter CSV downloaded successfully'} />)
          } else {
            ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Unable to download csv'} />)
          }
        })
        .catch((err)=>{
          ModalService.open((modalProps) => <ErrorModal close={() => modalProps.close} desc={'Unable to download csv'} />)
        })
    }

    const meta = {
        title: 'NFT2.0 | Admin Subscriptions',
        description: 'Admin User Subscriptions for NFT',
    };

    const getSubscriptionList = (
        page: number,
        limit = 10,
    ) => {
        setShowLoader(true);
        return API.getNewsletterSubscriptionsList(page, limit, filterData, query)
            .then((res) => {
                setPage(page);
                setShowLoader(false);
                if (res?.data?.data) {
                    setSubscriberData(res?.data?.data);
                    setMetaData(res?.data?.data?.pageMeta);
                }
            })
            .catch((err) => {
                setShowLoader(false);
                console.log(err);
            });
    };

    useEffect(() => {
        const getData = setTimeout(() => {
            getSubscriptionList(page, pageLimit)
        }, 500)

        return () => clearTimeout(getData)
    }, [query, page])

    useEffect(() => {
        if(page === 1) {
            getSubscriptionList(page, pageLimit)
        } else {
            setPage(1)
        }
    },[filterData])

    return (
        <>
            {modalOpen && (
                <UserFilterModel
                    onData={filterData}
                    onApplyFilter={applyFilter}
                    setOpenModal={setModalOpen}
                    onResetFilter={resetFilter}
                ></UserFilterModel>
            )}
            <AdminLayout meta={meta} pageTitle={`Newsletter Subscribers `}>
                <Container>
                    <SpaceBetween>
                        <h2>Total Subscriptions({metaData?.totalCount})</h2>
                        <Container_1>
                            <TableSearch placeholder="Search" value={query || ''} onChange={queryHandler} />
                            <div>
                                <FilterButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setModalOpen(true);
                                    }}
                                    className='m-0'
                                >
                                    <Icon
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="-287.75 385.885 27.219 21.063"
                                    >
                                        <path d="M-262.542 389.734h-11.625c-.442-1.618-1.91-2.817-3.667-2.817-1.756 0-3.224 1.199-3.667 2.817h-4.234a1 1 0 100 2h4.234c.443 1.617 1.91 2.816 3.667 2.816s3.224-1.199 3.667-2.816h11.625a1 1 0 100-2zm-15.292 2.816a1.817 1.817 0 110-3.633 1.817 1.817 0 010 3.633zM-286.735 402.109a1 1 0 001 1h11.625c.443 1.617 1.91 2.816 3.667 2.816 1.756 0 3.224-1.199 3.667-2.816h4.234a1 1 0 100-2h-4.234c-.443-1.618-1.91-2.817-3.667-2.817-1.756 0-3.225 1.199-3.667 2.817h-11.625a1 1 0 00-1 1zm14.475 0a1.817 1.817 0 113.634 0 1.817 1.817 0 01-3.634 0z"></path>
                                    </Icon>
                                    Filter
                                </FilterButton>
                            </div>
                            <CreateButton onClick={() => downloadCSV()} className="add_icon">
                                Export CSV
                            </CreateButton>
                        </Container_1>
                    </SpaceBetween>
                    <Table
                        columns={scubscriberColumns}
                        data={subscriberData?.list?.rows || []}
                        showLoader={showLoader}
                    />
                   <TablePagination
                        total={metaData?.totalCount}
                        limit={pageLimit}
                        currentPage={page}
                        setCurrentPage={setPage}
                    />
                </Container>
            </AdminLayout>
        </>
    );
};

export default SubscriberListing;


const scubscriberColumns = [
    {
        id: 1, title: 'Id ', key: 'id', hasNestedObject: false, render: (key: any) => (
            <>
                <FlexRow>
                    <Label>
                        {key?.id}
                    </Label>
                </FlexRow>
            </>
        ),
    },
    {
        id: 2,
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
        id: 5,
        title: 'Subscribed Date',
        key: 'updatedAt',
        render: (key: any) => (
            <>
                <FlexRow>
                    <Label>
                        {moment(key?.createdAt).format('DD-MM-YYYY')}
                    </Label>
                </FlexRow>
            </>
        ),
    },
]