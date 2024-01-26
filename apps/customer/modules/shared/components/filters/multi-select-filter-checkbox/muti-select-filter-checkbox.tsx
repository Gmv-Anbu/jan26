import styled from 'styled-components'
import Image from 'next/image'

import Icon from '../../icon/icon'
import useToggleHoook from './useToggleHoook'
import useMultiSelectHook from './useMultiSelectHook'

import React, { ChangeEvent } from 'react'
import { InfiniteScroll } from '@nft-marketplace/infinite-scroll'

const FilterWrapper = styled.div`
  padding: 1.6rem 0;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.bordersecondary};
  }
`

const FilterHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`
const FilterTitle = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.fonttitle};
  min-width: 10rem;
`

interface IfilterList {
  toggle: boolean
}

const FilterList = styled.ul<IfilterList>`
  list-style: none;
  padding: 0;
  display: ${(props) => (props.toggle ? 'block' : 'none')};
`

const FilterListItem = styled.li`
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
`

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
`

const FilterCustomCheckbox = styled.span`
  position: relative;
  margin-right: 5px;
  display: inline-block;
  cursor: pointer;
  width: 15px;
  height: 15px;
  background: ${({ theme }) => theme.colors.mainBG};
  border: 1px solid ${({ theme }) => theme.colors.fontdark};
`

const FilterCheckbox = styled.input`
  display: none;

  &:checked + ${FilterCustomCheckbox}:after {
    background: radial-gradient(circle, rgb(5 206 247) 27%, #17637a 93%);
    position: absolute;
    width: 15px;
    height: 15px;
    content: ' ';
    left: -1px;
    top: -1px;
    border: 1px solid ${({ theme }) => theme.colors.fontdark};
  }
`

const FilterName = styled.label`
  color: ${({ theme }) => theme.colors.fontdark};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: 1rem;
`

const FilterSearchWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.fontdark};
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.8rem;
  margin: 1.5rem 0 1rem;
  input {
    margin-left: 0.7rem;
    background: transparent;
    border: none;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.7rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.fontdark};
    &:focus-visible {
      outline: none;
    }
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #FFF;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  font-weight: 600;
  margin: 1rem 0.4rem;
  min-width: 10rem;
`
const ResetButton = styled.span`
  color: #FFF;
  cursor: pointer;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  font-weight: 600;
  padding: 0.8rem 2rem;
  min-width: 10rem;
  text-align: center;
  font-size: 1.8rem;
  border: 1px solid #fff;
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.colorRed};
    border-radius: 3px;
  }
`

const MutiSelectFilterCheckbox = ({
  id,
  name,
  filterData,
  isToggle,
  searchBar,
  checkedList,
  onChangeCheckedGroup,
  onChangeSearch,
  onLoadMore,
  totalItems,
}: {
  id: string | number
  name: string
  filterData: Array<any>
  isToggle?: boolean
  searchBar?: boolean
  checkedList: Array<any>
  onChangeCheckedGroup: (checkedArray: Array<any>) => void
  onChangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void
  onLoadMore: () => void
  totalItems: number
}) => {
  const [toggle, toggleValue] = useToggleHoook(window.screen.width < 480 ? false : true)
  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    if (checked) {
      if (!checkedList?.includes(value)) onChangeCheckedGroup([...(checkedList || []), value])
    } else {
      const newCheckedValue = [...checkedList]
      newCheckedValue.splice(checkedList.indexOf(value), 1)
      onChangeCheckedGroup(newCheckedValue)
    }
  }

  return (
    <FilterWrapper>
      {checkedList.length ? (
        <ButtonWrapper>
          <ResetButton onClick={() => onChangeCheckedGroup([])}>Reset</ResetButton>
        </ButtonWrapper>
      ) : null}
      <FilterHeader
        onClick={() => {
          if (!isToggle) return
          toggleValue(toggle)
        }}
      >
        <FilterTitle>{name}</FilterTitle>
        {isToggle && <Icon name={toggle ? 'arrow-up' : 'arrow-down'}></Icon>}
      </FilterHeader>
      <FilterList toggle={toggle}>
        {searchBar ? (
          <FilterSearchWrapper>
            <Image src="/svgs/search.svg" alt="search" width="18" height="18" />
            <input type="text" placeholder="Search" onChange={onChangeSearch} />
          </FilterSearchWrapper>
        ) : null}
        <InfiniteScroll  next={()=>onLoadMore()} dataLength={filterData.length} hasMore={filterData.length!==totalItems} height={200} loader={"loading..."}>
        {filterData?.map((data: any,i:number) => {
          return (
            <FilterListItem key={`${data.id}_key_${i}`}>
              <FilterLabel>
                <FilterCheckbox
                  onChange={handleCheckInput}
                  id={id + data.id}
                  type="checkbox"
                  value={data.id}
                  checked={
                    checkedList?.includes(String(data.id)) ? true : false
                  }
                ></FilterCheckbox>
                <FilterCustomCheckbox></FilterCustomCheckbox>
                <FilterName htmlFor={id + data.id}>{data.name}</FilterName>
              </FilterLabel>
            </FilterListItem>
          );
        })}
       </InfiniteScroll>
      </FilterList>
    </FilterWrapper>
  )
}

export default MutiSelectFilterCheckbox
