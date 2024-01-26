import useWindowSize from '@apps/customer/hooks/useWindowSize'
import Image from 'next/image'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import arrow from '../../public/images/customer/pagination/right-arrow.png'

export const Page = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  gap: 2rem;
  @media screen and (max-width: 549px) {
    margin: 0rem;
  }
`

export const LinkS = styled.span`
  a {
    cursor: pointer;
    text-decoration: none;
    padding: 1rem 1.5rem;
    color: gray;
  }
  .first-a {
    text-decoration: none;
    padding: 0.4rem 1.25rem;
    border: 0.5px solid #D1E0E2;
    background-color: #f4f9f9;
    font-size: 18px;
    line-height: 120%;
    font-weight: 600;
    color: ${({theme}) => theme.colors.secondary}; 
  }
`
export const Btns = styled.a`
  text-decoration: none;
  padding: 2rem;
  cursor: pointer;
  &.default {
    cursor: default;
  }
  @media screen and (max-width: 549px) {
    padding: 0;
  }
  span {
    border: 1px solid #29898b;
    padding: 1rem 2rem;
    background-color: #2a7575;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
`

const PageWrapper = styled.div``

interface IPagination {
  totalPage?: number
  currentPage?:number
  updatePage?: (page: number) => void
}

export const One = styled.span``
const Pagination = ({ totalPage, currentPage, updatePage } : IPagination) => {
  const { width } = useWindowSize()
  const pages = useMemo(() => {
    return [...Array(totalPage).keys()].map(i => i+1)
  },[totalPage])

  // let visiblePages = [];
  // if (totalPage <= 6) {
  //   visiblePages = pages;
  // } else if (currentPage <= 4) {
  //   visiblePages = [...pages.slice(0, 5), '...............', totalPage];
  // } else if (currentPage >= totalPage - 3) {
  //   visiblePages = [1, '...', ...pages.slice(totalPage - 5)];
  // } else {
  //   visiblePages = [1, '...'];
  //   for (let i = currentPage - 2; i <= currentPage + 2; i++) {
  //     visiblePages.push(i);
  //   }
  //   visiblePages.push('...', totalPage);
  // }

  const maxPagesToShow = width <= 768 ? 4 : 6;
  let startPage = 1;
  let endPage = totalPage;
  const middlePage = Math.floor(maxPagesToShow / 2);
  
  // If there are too many pages to show, we need to replace the middle pages with a separator.
  if (totalPage > maxPagesToShow) {
    if (currentPage <= middlePage) {
      endPage = maxPagesToShow - 2;
    } else if (currentPage > totalPage - middlePage) {
      startPage = totalPage - maxPagesToShow + 3;
    } else {
      startPage = currentPage - middlePage + 2;
      endPage = currentPage + middlePage - 2;
    }
  }

  const handleUpdatePage = (val) => {
    if(val === 0 || totalPage < val) return
    updatePage(val)
  }

  return (
    <Page>
      <Btns className={currentPage-1 === 0 ? 'default' : ''} onClick={() => handleUpdatePage(currentPage-1)}>
        <span>
          <Image style={{
            transform:"rotate(180deg)"
          }} src={arrow} alt="ICO" />
          Prev
        </span>
      </Btns>
      <PageWrapper>
        {startPage > 1 && (
          <LinkS>
            <a className={currentPage === 1 ? "first-a": ''} onClick={() => handleUpdatePage(1)}>
              1
            </a>
          </LinkS>
        )}

        {startPage > 2 && <span className="separator">........</span>}

        {pages.slice(startPage - 1, endPage).map((page) => (
          <LinkS key={page}>
          <a className={currentPage === page ? "first-a": ''} onClick={() => handleUpdatePage(page)}>
            {page}
          </a>
        </LinkS>
        ))}

        {endPage < totalPage - 1 && <span className="separator">........</span>}

        {endPage < totalPage && (
          <LinkS>
          <a className={currentPage === totalPage ? "first-a": ''} onClick={() => handleUpdatePage(totalPage)}>
          {totalPage}
          </a>
        </LinkS>
        )}
        {/* {
          visiblePages.map(page => (
            <LinkS key={page}>
            <a className={currentPage === page ? "first-a": ''} onClick={() => handleUpdatePage(page)}>
              {page}
            </a>
          </LinkS>
          ))
        } */}
      </PageWrapper>

      <Btns className={totalPage < currentPage+1 ? 'default' : ''} onClick={() => handleUpdatePage(currentPage+1)}>
        <span>
          Next
          <Image src={arrow} alt="ICO" />
        </span>
      </Btns>
    </Page>
  )
}

export default React.memo(Pagination)
