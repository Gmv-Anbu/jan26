import React, { useState } from 'react'
import styled from 'styled-components'

interface TabProps {
  tabPos?: string
}
const TabHead = styled.div<TabProps>`
  width: 37%;
  position: relative;
  top: ${(props) => props.tabPos || "33px"};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  hr {
    width: 99%;
    margin-left: 0.5%;
    border-radius: 50%;
    background: linear-gradient(270deg,transparent 0%,#ffffff 85.11%,transparent 100.88%);
    height: 2px;
    border: 0;
    box-shadow: 0 0 3px #2a4c4e;
    border-bottom-right-radius: 60%;

  }
  @media screen and (max-width: 1024px) {
    margin: 5rem 0;
  }
`
const ButtonLink = styled.div`
  display: flex;
  align-items: center;
  height: 13rem;
  background: transparent;
  border: 0;
  font-size: 3rem;
  color: #848a8b;
  text-transform: uppercase;
  position: relative;
  width: 100%;
  text-align: left;
  padding-left: 8rem;
  cursor: pointer;

  span{
    z-index: 1;
  }

  &::after {
      content: '';
      position: absolute;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 85.11%, rgba(255, 255, 255, 0) 100.88%);
      opacity: 0.34;
      bottom: 0;
      left: -4px;
      width: 100%;
      height: 1px;
    }

  &.active {
    color: #fff;
    &::before {
      content: '';
      position: absolute;
      background: linear-gradient(180deg, rgba(32, 54, 55, 0) 0%, #2a4c4e 100%);
      opacity: 0.54;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &:last-child::before {
      transform: rotate(180deg);
      bottom: 0;
    }
    &::after {
      content: '';
      position: absolute;
      background: url("/images/customer/vault/line.png") no-repeat bottom;
      bottom: -4px;
      left: -4px;
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }
  /* &:before {
      content: "";
    position: absolute;
    background: url(/images/customer/home/img-line.png) no-repeat left center;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 11px;
    } */
  &:last-child::after {
    background: none;
  }
`

const Tab = ({tabPos, tabData, active, handleActive }: {tabPos:string, tabData: Array<string>; active: number; handleActive: (val: number) => void }) => {
  const renderTabs = tabData.map((tab, index) => (
    <>
      <ButtonLink onClick={() => handleActive(index + 1)} key={index} className={active === index + 1 ? 'active' : ''}>
        <span>{tab}</span>
      </ButtonLink>
      {/* <hr style={{ opacity: active !== index + 1 && '0.34' }} /> */}
    </>
  ))

  return (
    <>
      <TabHead tabPos={tabPos}>{renderTabs}</TabHead>
    </>
  )
}

export default Tab
