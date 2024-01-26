import { ChangeEvent } from "react";
import styled from "styled-components";
import { ButtonPrimary, ButtonSecondary } from "../button/button";
import MutiSelectFilterCheckbox from "./multi-select-filter-checkbox/muti-select-filter-checkbox";
import useFilter from "./useFilter";

const FilterContainer = styled.div`
    // border-radius: 1.3rem;
    // padding: 2.5rem 1rem;
    // background: ${({ theme }) => theme.colors.filterColor};
    // box-shadow: 0 8px 32px 0 ${({ theme }) => theme.colors.filterCardShadow};
    // backdrop-filter: blur( 4px );
    // -webkit-backdrop-filter: blur( 4px );
    // border: 1px solid ${({ theme }) => theme.colors.cardContainerColor};
`

const Filter = ({
  filterData,
  updateCategoryCheckedValues,
  searchBar=true,
  onSearchChange,
}: {
  updateCategoryCheckedValues:(id:string|number,value:Array<string|number>)=>void
  filterData: Array<any>;
  searchBar?:true|false;
  onSearchChange:(id:number|string,value:string|undefined)=>void
}) => {
  return <FilterContainer>
      {filterData && filterData.map((data:any, i:number) => {
          return <MutiSelectFilterCheckbox onChangeCheckedGroup={(value)=>{
            updateCategoryCheckedValues(data?.id,value)
          }} checkedList={data.checkedList||[]} onChangeSearch={(e:ChangeEvent<HTMLInputElement>)=>{onSearchChange(data?.id,e?.target?.value)}} searchBar={searchBar}  key={data.id} isToggle={true} {...data}></MutiSelectFilterCheckbox>
      })}
  </FilterContainer>
};

export default Filter;