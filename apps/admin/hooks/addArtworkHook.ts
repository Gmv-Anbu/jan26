import { getCookie } from '@nft-marketplace/js-cookie';
import React, { useState, useEffect, useRef } from 'react'
import API from '../api/admin'
import { KEYS } from '../utils/storage';

interface ICreatorData{
    label:string;
    value:string
}

const useDropdownData = (props: any) => {

    const { type } = props
    const [collection, setCollection] = useState<any>([])
    const [category, setCategory] = useState<any>([])
    const [currency, setCurrency] = useState<any>([])
    const [creators, setCreators] = useState<ICreatorData[]>([])
    const [activeCategory, setActiveCategory] = useState<any>([])
    const [activeCollection, setActiveCollection] = useState<any>([])
    const initRef = useRef(true)
    const getCollectionData = (creatorId:number = getCookie(KEYS.ADMIN_ID)) => {
        // const query = '?page=1&items=10'
        const page=1;
        const items=10;
        const filter = { creatorId: null }
        if (creatorId) {
          filter.creatorId = creatorId
        }
        API.getCollectionList(page,items,filter)
        .then(res => {
            if(res?.data?.data?.collectionList) {
                const arr = res?.data?.data?.collectionList
                const newArr = arr.map((el: any) => {
                    return {
                        ...el,
                        value: el?.id,
                        label: el?.name
                    }
                })
                setCollection(newArr)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getActiveCollectionData = (creatorId?:number) => {
        let filter = { creatorId: null }
        if (creatorId) {
          filter.creatorId = creatorId
        }
        API.getActiveCollectionList(filter)
        .then(res => {
            if(res?.data?.data) {
                const arr = res?.data?.data.filter(el => el?.collectionCreator !== null)
                const newArr = arr.map((el: any) => {
                    return {
                        ...el,
                        value: el?.id,
                        label: el?.name
                    }
                })
                setCollection(newArr)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getCategoryData = () => {
        const query = '?page=1&items=10&'
        API.getCategoryList(query)
        .then(res => {
            if(res?.data?.data?.categoryList) {
                const arr = res?.data?.data?.categoryList
                const newArr = arr.map((el: any) => {
                    return {
                        ...el,
                        value: el?.id,
                        label: el?.name
                    }
                })
                setCategory(newArr)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getCurrency = () => {
        const query = '?page=1&items=10'
        API.getCurrency(query)
        .then(res => {
            if(res?.data?.data?.currencyList) {
                const arr = res?.data?.data?.currencyList
                const newArr = arr.map((el: any) => {
                    return {
                        ...el,
                        value: el?.id,
                        label: el?.currencyCode
                    }
                })
                setCurrency(newArr)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getActiveCategoryData = () => {
        let query = ''
        if(type === 'buy') query = `?categoryType=buy`
        API.getActiveCategoryList(query)
        .then(res => {
            if(res?.data?.data) {
                const arr = res?.data?.data
                const newArr = arr.map((el: any) => {
                    return {
                        ...el,
                        value: el?.id,
                        label: el?.name
                    }
                })
                setActiveCategory(newArr)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getCreators = (page,search) => {

        let filter = { collectionId : null }

        if (search) {
            // let found = collection.find(el => el?.id === search)
            // if(found?.creatorId) filter['collectionCreator'] = found?.creatorId
            filter['collectionId'] = search
        }
        
        API.getCreatorList(page,10,filter,search,"creators")
        .then(res => {
            if(res?.data?.data?.userList) {
                const arr = res?.data?.data?.userList
                const newArr = arr.map((el: any) => {
                    return {
                        value: el?.id,
                        label: el?.firstName + " " + el?.lastName,
                    }
                })
                setCreators(newArr)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    // useEffect(()=>{
    //     const handler = setTimeout(() => {
    //         getCreators(1,props?.creatorSearchTerm)
    //     }, 600);
    //     return () => {
    //         clearTimeout(handler);
    //     };
    // },[props?.creatorSearchTerm])

    // useEffect(()=>{
    //     getActiveCollectionData(props?.creatorId)
    // },[props?.creatorId])
    
    // useEffect(()=>{
    //     if(initRef.current){
    //         initRef.current = false
    //         return
    //     }
    //     const handler = setTimeout(() => {
    //         getCollectionData(props?.collectionSearchTerm)
    //     }, 600);
    //     return () => {
    //         clearTimeout(handler);
    //     };
    // },[props?.collectionSearchTerm])
    
    // useEffect(()=>{
    //     if(props?.collectionId) {
    //         let found = collection.find(el => el?.id === props?.collectionId)
    //         if(found?.creatorId) {
    //             let arr = [{
    //                 value: found?.creatorId,
    //                 label: found?.collectionCreator?.firstName + ' ' + found?.collectionCreator?.lastName
    //             }]
    //             setCreators(arr)
    //         }
    //     } else {
    //         getCreators(1,props?.collectionId)
    //     }
    // },[props?.collectionId])
    
    useEffect(() => {
        // getCategoryData()
        // getCurrency()
        getActiveCategoryData()
        // getActiveCollectionData()
    },[type])

    return { collection, category, creators, currency, activeCategory, activeCollection }

}

export default useDropdownData;