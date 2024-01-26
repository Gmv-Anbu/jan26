import { ChangeEvent, useCallback, useReducer } from "react";
import Filter from "./filter";
const ACTIONS = {
    "SET_FILTER_DATA":"SET_FILTER_DATA",
    "UPDATE_INDIVIDUAL_CATEGORY_CHECKED_VALUE":"UPDATE_INDIVIDUAL_CATEGORY_CHECKED_VALUE",
    "UPDATE_SEARCH_TEXT":"UPDATE_SEARCH_TEXT",
    "UPDATE_INDIVIDUAL_CATEGORY":"UPDATE_INDIVIDUAL_CATEGORY"
}
const reducer = (state:any,action:{type:string,payload:any})=>{
    const {payload} = action;
    switch(action.type){
        case ACTIONS.SET_FILTER_DATA:
            return payload;
        case ACTIONS.UPDATE_INDIVIDUAL_CATEGORY:
            const currCatIndex = state.findIndex((x:any)=>x.id === payload?.id);
            state[currCatIndex] = {...state[currCatIndex],...payload?.value};
            return [...state];
        case ACTIONS.UPDATE_INDIVIDUAL_CATEGORY_CHECKED_VALUE:
            const selectedCategoryIndex = state.findIndex((x:any)=>x.id === payload?.id);
            state[selectedCategoryIndex].checkedList = payload.value;
            return [...state];
        case ACTIONS.UPDATE_SEARCH_TEXT:
            const selectedGroup = state.findIndex((x:any)=>x.id === payload?.id);
            state[selectedGroup].searchValue = (payload.value)?payload.value?.trim():"";
            return [...state];
        default:
            return state;
    }
}

const useFilter = (filterData:Array<any>) => {
    const [state, dispatch] = useReducer(reducer,filterData);
    const updateCategory =  useCallback((id:string|number,value:{[index:string|number]:any})=>{
        dispatch({type:ACTIONS.UPDATE_INDIVIDUAL_CATEGORY,payload:{id,value}})
    },[dispatch])
    const updateCategoryCheckedValues = useCallback((id:string|number,value:Array<string|number>)=>{
        dispatch({type:ACTIONS.UPDATE_INDIVIDUAL_CATEGORY_CHECKED_VALUE,payload:{id,value}})
    },[dispatch])
    const setFilterData = useCallback((value:Array<any>)=>{
        dispatch({type:ACTIONS.SET_FILTER_DATA,payload:value})
    },[dispatch]);
    const updateSearchValue = useCallback((id:string|number,value:string|undefined)=>{
        dispatch({type:ACTIONS.UPDATE_SEARCH_TEXT,payload:{id,value}})
    },[dispatch])
    return {
        state,
        dispatch,
        setFilterData,
        updateCategoryCheckedValues,
        updateCategory,
        render:()=><Filter searchBar onSearchChange={updateSearchValue} updateCategoryCheckedValues={updateCategoryCheckedValues} filterData={state} />
    }
}

export default useFilter;