import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { LinkS, One, Page, Pages } from './tableStyles';
/* eslint-disable-next-line */
interface UsePaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: Function;
}

const StyledUsePagination = styled.div`
  color: pink;
`;

export function UsePagination(props: UsePaginationProps) {
  const { postsPerPage, totalPosts, paginate } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<number>(2);
  const [prevPrevPage, setPrevPrevPage] = useState<number>(1);
  const [activeBoxNumber, setActiveBoxNumber] = useState<number>(1);

  const pageNumbers: number[] = [];

  useEffect(() => {
    updatePaginationNumbers(currentPage);
  }, [currentPage]);

  const updatePaginationNumbers = (selectedPage: number) => {
    setPrevPrevPage(selectedPage - 2);
    setPrevPage(selectedPage - 1);
    setCurrentPage(selectedPage);
  };

  const getPageNumbers = (pageNumbers) => {
    if (pageNumbers?.length <= 4) {
      return (
        <One>
          <LinkS active={false} href="#">
            {pageNumbers}
          </LinkS>
        </One>
      );
    } else {
      return (
        <>
          <Pages>
            <Page>
              <span>
                <LinkS href="#" active={false}>
                  <svg
                    width="5"
                    height="7"
                    viewBox="0 0 5 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.45563 3.20108L4.00391 0.711238L3.27597 6.21784e-08L-0.00024147 3.20108L3.27597 6.40215L4.00391 5.69091L1.45563 3.20108Z"
                      fill="#23487B"
                    />
                  </svg>
                </LinkS>
              </span>

              <LinkS
                active={activeBoxNumber == 1 ? true : false}
                onClick={() => {
                  paginate(prevPrevPage > 0 ? prevPrevPage : 1);
                  setCurrentPage(prevPrevPage > 0 ? prevPrevPage : 1);
                  setActiveBoxNumber(1);
                }}
              >
                {prevPrevPage > 0 ? prevPrevPage : 1}
              </LinkS>

              <LinkS
                active={activeBoxNumber == 2 ? true : false}
                onClick={() => {
                  paginate(prevPage > 1 ? prevPage : 2);
                  setCurrentPage(prevPage > 1 ? prevPage : 2);
                  setActiveBoxNumber(2);
                }}
              >
                {prevPage > 1 ? prevPage : 2}
              </LinkS>
              <LinkS
                active={activeBoxNumber == 3 ? true : false}
                onClick={() => {
                  paginate(currentPage > 2 ? currentPage : 3);
                  setCurrentPage(currentPage > 2 ? currentPage : 3);
                  setActiveBoxNumber(3);
                }}
              >
                {currentPage > 2 ? currentPage : 3}
              </LinkS>
              <LinkS href="#" active={false}>
                ....
              </LinkS>
              <LinkS
                active={false}
                onClick={() => {
                  paginate(pageNumbers?.length - 1);
                  setCurrentPage(pageNumbers?.length - 1);
                  setActiveBoxNumber(pageNumbers?.length - 1);
                }}
              >
                {pageNumbers?.length - 1}
              </LinkS>
              <LinkS
                active={false}
                onClick={() => {
                  paginate(pageNumbers?.length);
                  setCurrentPage(pageNumbers?.length);
                  setActiveBoxNumber(pageNumbers?.length);
                }}
              >
                {pageNumbers?.length}
              </LinkS>
              <span>
                <LinkS
                  href="#"
                  active={false}
                  onClick={() => {
                    if (currentPage < pageNumbers?.length) {
                      paginate(currentPage + 1);
                      setCurrentPage(currentPage + 1);
                      setActiveBoxNumber(currentPage + 1);
                    }
                  }}
                >
                  {' '}
                  <svg
                    width="5"
                    height="7"
                    viewBox="0 0 5 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.54828 3.20127L-1.45953e-09 5.69111L0.727933 6.40234L4.00415 3.20127L0.727933 0.000193121L-1.16783e-08 0.711432L2.54828 3.20127Z"
                      fill="#23487B"
                    />
                  </svg>
                </LinkS>
              </span>
            </Page>
          </Pages>
        </>
      );
    }
  };

  for (let i: number = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledUsePagination>{getPageNumbers(pageNumbers)}</StyledUsePagination>
  );
}

export default UsePagination;
