import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import HomeVisitMusuem from '@apps/customer/modules/customer/section/homeVisitMusuem'
import { Container } from '@apps/customer/styles/CommonStyles'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import CollectionListing from '../../../modules/customer/museum/CollectionListing'
import styled from 'styled-components'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import dynamic from 'next/dynamic'
import useMuseum from '../../../modules/customer/museum/useMuseum'
import useComponentVisible from '@apps/customer/hooks/useComponentVisible'

const FilterModal = dynamic(() => import('../../../modules/customer/museum/FilterModal'))

const CollectionWrapper = styled.div`
  padding: 14rem 0 15.4rem;

  @media screen and (max-width: 549px) {
    padding: 5rem 0 11.4rem;
  }
`
const HeadSection = styled.section`
  display: flex;
  justify-content: space-between;
  position: relative;
  h1 {
    color: ${({ theme }) => theme.colors.primary};
  }
  .filter-section {
    display: flex;
    align-items: center;
    gap: 3.2rem;
  }
  .outside-ref {
    display: contents;
  }
  .ref-modal {
    position: fixed;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .react-select__control {
    min-height: 44px;
    width: 180px;
    border-radius: 0;
    border: 1.5px solid #D1E0E2;
  }
  .react-select__option {
    font-size: 1.4rem;
    font-weight: 400;
  }
  .react-select__placeholder{
    font-size: 1.6rem;
    line-height: 2rem;
    color: #5C5C5C;
    white-space: nowrap;
  }
  @media screen and (max-width: 549px) {
    align-items: center;
    h1 {
      font-size: 22px;
      line-height: 120%;
    }
    .filter-section {
      gap: 0.8rem;
    }
    .react-select__control {
        min-height: 44px;
        width: 155px;
        
    }
    .react-select__indicator-separator{
      width: 0;
    }
    @media screen and (max-width: 549px) {
      align-items: center;
      h1{
        font-size: 22px;
        line-height: 120%;
      }
      .filter-section{
        gap: 0.8rem;
      }
      .react-select__control{
        width: 84px;
        height: 40px;
        min-height: 35px;
      }
      .react-select__placeholder{
        font-size: 1rem;
        white-space: nowrap;
      }
    }
  }
`
const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 22px;
  max-height: 44px;
  border: 1.5px solid #D1E0E2;
  p {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
  }
  @media screen and (max-width: 549px) {
    padding: 10px 12px;
  }
`
const TabSection = styled.section`
  margin: 5rem 0 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: #898989;
    cursor: pointer;
  }
  input {
    /* visibility: hidden; */
    display: none;
  }
  .section-wrapper {
    display: flex;
    gap: 4rem;
    label {
      padding: 1rem 1.5rem;
      border-radius: 59px;
      border: 1px solid #2a7575;
      color: ${({ theme }) => theme.colors.primary};
      background-color: #f4f9f9;
    }
    [type='radio']:checked + label {
      background-color: #2a7575;
      color: white;
    }
  }
  @media screen and (max-width: 549px) {
    gap: 0;
    margin: 34px 0 0 0;
  }
`
const Museum = () => {
  
  const [currentPage, setCurrentPage] = useState(1)
  const [brandFilter, setBrandFilter] = useState('')
  const { loading, nftList, TabRender, TabSectionRender, filter, totalPage, applyFilter, renderSort, refreshPage } = useMuseum({ currentPage, setCurrentPage })
  const { width } = useWindowSize()

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const toggle = () => {
    setIsComponentVisible(!isComponentVisible)
  }

  const updatePage = useCallback((page) => {
    setCurrentPage(page)
    setTimeout(() => {
      const element = document.getElementById("our-collections");
      if(element) element.scrollIntoView({ behavior: "smooth", });
    }, 100)
  }, [])

  return (
    <>
      <HomeVisitMusuem page="museum" />
      <CollectionWrapper id="collection">
        <Container>
          <HeadSection>
            <h1 id="our-collections">Our Collections</h1>
            <div className="filter-section">
              {renderSort}
              <FilterWrapper onClick={toggle}>
                <Icon name="filter" width={width < 549 ? '20' : null} height={width < 549 ? '16' : null} />
                {width > 600 && <p>Filter by</p>}
              </FilterWrapper>
            </div>
            {isComponentVisible ? <div className='ref-modal'></div> : null}
            <div className='outside-ref' ref={ref}>
              <FilterModal toggle={toggle} visible={isComponentVisible} brandFilter={brandFilter} setBrandFilter={setBrandFilter} applyFilter={applyFilter} />
            </div>
          </HeadSection>
          <TabSection>
            <>
              {TabRender && TabRender(filter.category)}
              {TabSectionRender && TabSectionRender(filter.subCategory)}
            </>
          </TabSection>
          <CollectionListing loading={loading} nftList={nftList} totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} refreshPage={refreshPage} />
        </Container>
      </CollectionWrapper>
      <Newsletter />
    </>
  )
}

export default Museum
