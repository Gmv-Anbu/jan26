import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Image from 'next/image';
import { Table } from '@nft-marketplace/table';
import { ModalService } from '@nft-marketplace/modal';
import API from '@apps/admin/api/admin/index';
import TablePagination from '@apps/admin/modules/shared/components/pagination';
import InputCheckbox from '@apps/admin/modules/shared/components/formInputs/inputCheckbox';
import {
  Container,
  SpaceBetween,
  Label,
  Flex,
  SpanLight,
  ActionButtonsWrapper,
  ActionBtn,
} from './index.styled';
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success';
import TableSearch from '../inputElements/tableSearch';

const ListAllPages = () => {
  const [allPagesList, setAllPagesList] = useState<
    Array<{ [index: string]: any }>
  >([]);
  const [metaData, setMetaData] = useState<{ [key: string]: any }>({});
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<Array<number>>([]);
  const router = useRouter();
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const getAllPages = async () => {
    setShowLoader(true);
    const params: any = {
      page: page,
      items: 10,
    };

    if (searchText) {
      params.search = searchText;
    }

    API.getAllPages(params)
      .then((response) => {
        setShowLoader(false);
        if (response?.status === 200) {
          const data = response?.data?.data?.pageList;
          const pageMetaData = response?.data?.data?.pageMeta;
          setAllPagesList(data);
          setMetaData(pageMetaData);
        }
      })
      .catch((error) => {
        setShowLoader(false);
        console.log('Error in getAllPages: ', error);
      });
  };

  const onSearch = (e: { target: HTMLInputElement }) => {
    setPage(1);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getAllPages();
  }, [page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      getAllPages();
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const onChangeCheckbox = (e: { target: HTMLInputElement }, id: number) => {
    const { checked } = e.target;
    if (checked) {
      selectedRows.push(id);
      setSelectedRows([...selectedRows]);
    } else {
      const removed = selectedRows.filter((data) => data !== id);
      setSelectedRows([...removed]);
    }
  };

  const enableOrDisable = async (record: {[key: string]: any}) => {
    const body = {
        isActive: !record.isActive,
        name: record.name,
        content: record.content
    }
    API.updatePage(record?.id, body).then((response) => {
        if(response) {
            showSuccessModal(response?.data?.message)
        }
    }).catch((error) => {
        console.log('Error in enableOrDisable: ', error);
    })
  }

  const deletePage = async (id: number) => {
    API.deletePage(id).then((response) => {
        if(response) {
            showSuccessModal(response?.data?.message);
        }
    }).catch((error) => {
        console.log('Error in deletePage: ', error);
    })
  }

  const showSuccessModal = (message: string) => {
    const success = ModalService.open((modalProps: any) => (
        <SuccessModal
            title="Success"
            desc={message}
            close={() => handleClose(success)}
        />
    ));
  }

  const handleClose = (modal: any) => {
    ModalService.close(modal);
    getAllPages();
};

const goToEditPage = (record: {[key: string]: any}) => {
    router.push('/pages/add' + `?key=${record?.key}&id=${record?.id}`);
}

  return (
    <Container>
      <SpaceBetween>
        <h2>
          All Pages <SpanLight>({metaData?.totalItems})</SpanLight>
        </h2>
        <TableSearch placeholder="Search" value={searchText || ''} onChange={onSearch} />
      </SpaceBetween>
      <Table
        columns={[
          {
            id: 1,
            title: 'Page Name',
            key: 'name',
            render: (key: {[key: string]: any}) => (
              <Flex>
                <InputCheckbox
                  value={selectedRows.includes(key?.id)}
                  onChange={(e) => onChangeCheckbox(e, key?.id)}
                  name={`isSelected`}
                />
                <Label>{key?.name}</Label>
              </Flex>
            ),
          },
          {
            id: 2,
            title: 'Content',
            key: 'content',
            render: (key: {[key: string]: any}) => (
              <>
                <Label>{key?.content}</Label>
              </>
            ),
          },
          {
            id: 3,
            title: 'Updated At',
            key: 'updatedAt',
            render: (key: {[key: string]: any}) => (
              <>
                <Label>
                  {moment
                    .utc(key?.updatedAt)
                    .local()
                    .startOf('seconds')
                    .fromNow()}
                </Label>
              </>
            ),
          },
          {
            id: 4,
            title: '',
            key: 'actions',
            render: (key: {[key: string]: any}) => (
              <>
                {selectedRows.includes(key?.id) ? (
                  <ActionButtonsWrapper>
                    <Image
                      src={'/svgs/icons/delete-red.svg'}
                      width={10}
                      height={10}
                      alt={'delete'}
                      onClick={() => deletePage(key?.id)}
                    />
                    <ActionBtn borderRadius="3px" border='1px solid #2D5B9A' onClick={() => enableOrDisable(key)}>
                      <Image
                        src={
                          key?.isActive
                            ? '/svgs/eye-open.svg'
                            : '/svgs/eye-closed.svg'
                        }
                        width={14}
                        height={14}
                        alt={'info'}
                        className="pointer"
                      />{' '}
                      {key?.isActive ? 'Hide Page' : 'Enable'}
                    </ActionBtn>
                    <ActionBtn
                      borderRadius="3px"
                      color="blue"
                      textDecoration="underline"
                      onClick={() => goToEditPage(key)}
                    >
                      View Changes
                    </ActionBtn>
                  </ActionButtonsWrapper>
                ) : null}
              </>
            ),
          },
        ]}
        data={allPagesList}
        selectedRow={selectedRows}
        showLoader={showLoader}
      />
      {allPagesList.length ? <TablePagination
        total={metaData.totalItems}
        limit={10}
        currentPage={page}
        setCurrentPage={setPage}
      /> : null}
    </Container>
  );
};

export default ListAllPages;
