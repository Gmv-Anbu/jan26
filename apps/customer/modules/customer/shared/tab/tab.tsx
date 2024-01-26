import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import useTab from "./useTab";

const TabList = styled.ul`
  list-style: none;
  padding: 0.9rem 2.4rem;
  display: inline-flex;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 1.4rem;
  @media screen and (max-width: 480px) {
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0.5rem;
  }
`;

interface ITabItem {
  isSelected: boolean;
}

const TabItem = styled.li<ITabItem>`
  padding: 0.8rem 2rem;
  margin: 0 .4rem;
  min-width: 10rem;
  text-align: center;
  font-size:1.8rem;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? ({ theme }) => theme.colors.fontdark : "transparent")};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primaryButton : 'transparent'};
  color: ${({isSelected, theme}) => isSelected ? theme.colors.fontprimary : theme.colors.fontdark};
  border-radius: 1.4rem;

  &:hover {
    background: ${({theme}) => theme.colors.primaryButton};
    color: ${({theme}) => theme.colors.fontprimary};
    border: 1px solid ${({ theme }) => theme.colors.fontdark};
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

const Tab = ({ data , selectedTab,onChange }: AppProps) => {
  return (
    <TabList>
      {data.map((tabData: {id:string,name:string}) => (
        <TabItem onClick={() => { onChange(tabData?.id) }} isSelected={selectedTab === tabData?.id} key={tabData?.id}>
          {tabData?.name}
        </TabItem>
      ))}
    </TabList>
  );
};

export default Tab;
