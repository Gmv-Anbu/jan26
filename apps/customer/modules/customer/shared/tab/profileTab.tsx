import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTab from './useTab';

const TabList = styled.ul`
  list-style: none;
  padding: 1rem 0;
  flex: 0 0 100%;
  justify-content: center;
  display: inline-flex;
  //background-color: ${({ theme }) => theme.colors.secondary};
  //border-radius: 1.4rem;
  border-bottom: 0.1rem solid #0d1930;

  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0.5rem;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0.5rem;
    justify-content: unset;
    overflow-y: hidden;
  }
`;

interface ITabItem {
  isSelected: boolean;
}

const TabItem = styled.li<ITabItem>`
  padding: 0.8rem 2rem;
  position: relative;
  margin: 0 0.4rem;
  min-width: 10rem;
  text-align: center;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.8rem;
  letter-spacing: 0.0075rem;
  cursor: pointer;
  transition: all 0.3s;
  // border: 1px solid
  ${({ isSelected }) =>
    isSelected ? ({ theme }) => theme.colors.fontdark : 'transparent'};
  //background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primaryButton : 'transparent'};
  color: ${({ isSelected, theme }) => isSelected ? theme.colors.fontprimary : theme.colors.fontdark};
  border-radius: 1.4rem;
  &.active {
    &:after {
      background: ${({ theme }) => theme.colors.gradientBtnBG};
      border-radius: 17px;
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      opacity: 1;
      visibility: visible;
      height: 2px;
      width: 100%;
    }
  }

  @media screen and (max-width: 540px) {
    white-space: nowrap;
    width: 100%;
    min-width: fit-content;
  }
`;

type AppProps = {
  data: Array<any>,
  selectedTab:string,
  onChange:(value:string)=>void
};
const ProfileTab = ({ data , selectedTab,onChange }: AppProps) => {
  return (
    <TabList>
      {data.map((tabData: { id: string, name: string }) => (
        <TabItem className={tabData.id === selectedTab ? 'active' : ''} onClick={() => { onChange(tabData?.id) }} isSelected={selectedTab === tabData?.id} key={tabData?.id}>
          {tabData?.name}
        </TabItem>
      ))}
    </TabList>
  );
};

export default ProfileTab;
