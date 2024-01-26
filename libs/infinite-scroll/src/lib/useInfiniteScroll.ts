import { useCallback, useState } from "react";

export interface IScrollData {
    page: number,
    limit: number,
    totalItems: number,
    hasMore: boolean,
    [index:string]:any
}
export interface IUpdateScrollData {
    page?: number,
    limit?: number,
    totalItems?: number,
    hasMore?: boolean,
    [index:string]:any
}
export const useInfiniteScroll = () => {
    const [scrollData, setScrollData] = useState<IScrollData>({ page: 1, limit: 6, totalItems: 6, hasMore: false });
    
    const updateScrollData = useCallback((data: IUpdateScrollData): void => {
        setScrollData((prev) => {
            const newState = { ...prev, ...data,hasMore:false }
            if(newState.totalItems>(newState.page*newState.limit))newState.hasMore = true;
            if (Object.is(JSON.stringify(newState), JSON.stringify(prev))) 
            return prev;
            return newState
        });
    }, []);
    const scrollToNextPage = useCallback(() => {
        updateScrollData({ page: (scrollData?.page + 1) })
    }, [scrollData?.page, updateScrollData])
    // useEffect(() => {
    //     const { totalItems, limit, page } = scrollData;
    //     updateScrollData({ hasMore: totalItems > (page * limit) ? true : false })
    // }, [scrollData, updateScrollData])
    return {
        scrollData,
        setScrollData,
        updateScrollData,
        scrollToNextPage
    }
}