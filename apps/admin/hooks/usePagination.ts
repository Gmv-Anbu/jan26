import {
    useState,
    useEffect,
    useCallback
} from "react";

const usePagination = (fetchData:(page:number,pageSize:number)=>Promise<void>, limit = 10) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const onPaginationChange = useCallback(
        (fetchPage, fetchPageSize) => {
            setLoading(true);
            return fetchData(fetchPage, fetchPageSize)
            .then(() => {
                    setPage(fetchPage)
                    setLoading(false);
                })
                .catch((error:any) => {
                    console.log("error", error);
                    setLoading(false);
                });
        },
        [fetchData]
    );
    useEffect(() => {
        onPaginationChange(1, limit);
    }, [onPaginationChange,limit])
    return {
        page,
        loading,
        onPaginationChange
    }
};
export default usePagination;