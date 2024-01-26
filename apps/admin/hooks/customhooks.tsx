import { useState, useEffect } from "react";

import { objectDeepClone } from "../utils/helper";
enum Sort {
  LowToHigh,
  HighToLow,
  Newest,
  Oldest,
}

export function useSortHandler(data: any, sortType: string) {
  const [filteredArr, setFilteredArr] = useState([]);

  useEffect(() => {
    sortData();
  }, [data, sortType]);

  const sortLowPrice = (a: any, b: any) => {
    return Number(a?.price) - Number(b?.price);
  }

  const sortHighPrice = (a: any, b: any) => {
    return Number(b?.price) - Number(a?.price);
  }

  const sortNewest = (a: any, b: any) => {
    return (
      new Date(b?.timeStamp).valueOf() - new Date(a?.timeStamp).valueOf()
    );
  };

  const sortOldest = (a: any, b: any) => {
    return (
      new Date(a?.timeStamp).valueOf() - new Date(b?.timeStamp).valueOf()
    );
  };

  const sortData = () => {
    let arr = objectDeepClone(data);
    if (parseInt(sortType) === Sort.LowToHigh) {
      let sortedArr = arr.sort(sortLowPrice);
      setFilteredArr(sortedArr);
    } else if (parseInt(sortType) === Sort.HighToLow) {
      let sortedArr = data.sort(sortHighPrice);
      setFilteredArr(sortedArr);
    } else if (parseInt(sortType) === Sort.Newest) {
      let sortedArr = data.sort(sortNewest);
      setFilteredArr(sortedArr);
    } else if (parseInt(sortType) === Sort.Oldest) {
      let sortedArr = data.sort(sortOldest);
      setFilteredArr(sortedArr);
    } else {
      setFilteredArr(data);
    }
  };

 const loadMoreData = (filteredArr: any, defaultLimit: any) => {
    const counter = filteredArr.length + defaultLimit;
    const arr = [...data.slice(filteredArr.length, counter)];
    // setDisplayData([...filteredArr, ...arr])
  }

  return [filteredArr.length ? filteredArr : [], sortData, loadMoreData];
}

export function LoadMoreData(data: any, defaultLimit: any) {
  const [loadedArr, setLoadedArr] = useState([]);
}

export function useToggle(defaultValue: any) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value: any) {
    setValue((currentValue: any) =>
      typeof value === "boolean" ? value : !currentValue
    );
  }

  return [value, toggleValue];
}
