import MarketService from '@apps/customer/api/customer/MarketService'
import useTab from '@apps/customer/components/Menu/useTab'
import useTabSection from '@apps/customer/components/MenuSection/useTabSection'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import { handleApiImage } from '@apps/customer/utils/helper'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import { useRouter } from 'next/router'
interface IUseMuseum {
  loading: boolean
  nftList?: Array<any>
  categoryList?: Array<any>
  TabRender?: (dataList: Array<any>) => ReactNode
  TabSectionRender?: (dataList: Array<any>) => ReactNode
  filter: Record<string, any>
  totalPage: number
  //   applyFilter?: (type: string, price: any) => void
  applyFilter?: (type: string, filterData: any) => void
  renderSort?: ReactNode
  refreshPage?: () => void
}
interface IMuseumProps {
  currentPage: number
  setCurrentPage?: any
  pageType?: any
}

const sortOptions = [
  { label: 'Alphabetical order (A - Z)', value: 'asc' },
  { label: 'Alphabetical order (Z - A)', value: 'desc' },
]
const buySortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Earliest', value: 'earliest' },
  { label: 'Alphabetical order (A - Z)', value: 'asc' },
  { label: 'Alphabetical order (Z - A)', value: 'desc' },
]

const useMuseum = ({ currentPage, setCurrentPage, pageType }: IMuseumProps): IUseMuseum => {
  const router = useRouter()
  const [nftList, setNFTList] = useState<any>([])
  const [refresh, setRefresh] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [filter, setFilter] = useState({
    category: [],
    subCategory: [],
    brand: [],
    minPrice: '',
    maxPrice: '',
    from: '',
    to: ''
  })
  const [sort, setSort] = useState({
    type: pageType === 'buy' ? 'buy' : 'museum',
    sortBy: 'createdAt',
    orderBy: 'desc',
  })
  const [initialTab, setInitialTab] = useState({})
  const { render: TabRender, selectedTab } = useTab(initialTab)
  const { render: TabSectionRender, selectedSection, changeSection } = useTabSection([{id: 0, name: 'All'}])
  const { width } = useWindowSize()

  useEffect(() => {
    makeCategoryFilter()
  }, [])

  useEffect(() => {
    changeSection(0, 'All')
  },[selectedTab])

  useEffect(() => {
    if (currentPage === 1) {
      getFilteredNfts()
    } else {
      setCurrentPage(1)
    }
  }, [selectedSection])

  useEffect(() => {
    getFilteredNfts()
  }, [sort, currentPage])

  useEffect(() => {
    if(refresh) getFilteredNfts('', refresh)
  }, [refresh])

  const handleSelect = (sort) => {
    setSort((prevSort) => {
      return {
        ...prevSort,
        orderBy: sort.value,
        sortBy: 'name',
      }
    })
  }

  const refreshPage = useCallback(() => {
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false)
    }, 2000)
  }, [refresh])

  const renderSort = (
    <Select
      styles={{
        indicatorSeparator: (styles) => ({ display: 'none' }),
      }}
      placeholder="Sort by"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={300}
      options={pageType === 'buy' ? buySortOptions : sortOptions}
      isSearchable={false}
      // value={form?.creatorObj}
      name="sort"
      // onInputChange={(value) => setCreatorSearchTerm(value)}
      onChange={handleSelect}
    />
  )
  const createFilter = useCallback(
    // (price) => {
    //   let filterObj = { category: [], subCategory: [], sortBy: 'createdAt', orderBy: '' }
    //   filterObj.category = selectedTab.id ? [selectedTab.id] : []
    //   filterObj.subCategory = selectedSection.map((section) => section.id && section.id)
    //   filterObj.sortBy = sort.sortBy
    //   filterObj.orderBy = sort.orderBy
    //   if (price) filterObj = { ...filterObj, ...price }

    //   return filterObj
    // },
    (filterData) => {
      let filterObj = { category: [], subCategory: [], sortBy: 'createdAt', orderBy: '', type: '', brand: filterData?.brand }
      filterObj.category = selectedTab.id ? [selectedTab.id] : []
      filterObj.subCategory = selectedSection.find((each) => each.id !== 0) ? selectedSection.map((section) => section.id && section.id) : []
      filterObj.type = sort.type
      filterObj.sortBy = sort.sortBy
      filterObj.orderBy = sort.orderBy
      if(pageType === 'buy') filterObj["saleType"] = "fixed"
      if(pageType === 'buy') {
        if(filterData?.minPrice && filterData?.maxPrice) {
          filterObj["minPrice"] = filterData?.minPrice
          filterObj["maxPrice"] = filterData?.maxPrice
        }
        if(filterData?.from && filterData?.to) {
          filterObj["from"] = filterData?.from
          filterObj["to"] = filterData?.to
        }
      }
      if(sort?.orderBy === "earliest") {
        filterObj["sortBy"] = 'createdAt'
        filterObj["orderBy"] = 'asc'
      }
      if(sort?.orderBy === "latest") {
        filterObj["sortBy"] = 'createdAt'
        filterObj["orderBy"] = 'desc'
      }
      if (filterData?.brand) filterObj = { ...filterObj }
      return filterObj
    },
    [selectedTab, selectedSection, filter, sort]
  )

  const getFilteredNfts = useCallback(
    async (filterData?: any, load?: boolean) => {
      if(filter?.category?.length === 0) return
      let limit = 0
      if(pageType === 'buy') {
        limit = window.screen.availWidth > 549 ? 8 : 4
      } else {
        limit = window.screen.availWidth > 549 ? 12 : 4
      }
      if(!load) setLoading(true)
      const result = await MarketService.getNFTList({
        page: currentPage,
        items: limit,
        filter: createFilter(filterData),
      })

      if (result?.status === 200) {
        const { data } = result.data
        const { exchangeRates, pageMeta, subCategories } = data
        setTotalPage(Math.ceil(pageMeta?.totalItems / limit))
        const updatedSub = [{ id: 0, name: 'All', assetCount: selectedTab.assetCount }, ...subCategories.filter((sub) => +sub?.assetCount !== 0)]
        setFilter((prevFilter) => {
          return {
            ...prevFilter,
            subCategory: updatedSub,
          }
        })
        const assetList = data?.assetList?.map((i: { primarySalePrice: string; id: string; name: any; refNo: string; refName: string; isFavorite: boolean; mainAssetUrl: string; auctionsData: any }) => {
          const transformedName = i?.name
          const transformedRefNo = i?.refNo.replace('REF.', '')
          const transformedRefName = i?.refName
          return {
            id: i?.id,
            name: transformedName,
            refNo: transformedRefNo,
            refName: transformedRefName,
            image: handleApiImage(i?.mainAssetUrl)+`?v=${i?.id}`,
            isFav: i?.isFavorite,
            price: i?.primarySalePrice
          }
        })
        setNFTList(assetList)
        setLoading(false)
      } else {
        setLoading(false)
      }
      
    },
    [createFilter, currentPage, selectedTab]
  )

  const setCustomTab = (arr) => {
    if (router?.asPath === '/base/museum?tab=2#collection') {
      setInitialTab(arr?.[1])
    } else if (router?.asPath === '/base/museum?tab=3#collection') {
      setInitialTab(arr?.[2])
    } else {
      setInitialTab(arr?.[0])
    }
  }

  const makeCategoryFilter = useCallback(async () => {
    let query = {}
    if(pageType === 'buy') {
      query['type'] = 'buy'
      query['saleType'] = 'fixed' 
    } else {
      query['type'] = 'museum'
    }
    const result = await MarketService.getCategoryList(1, 12, '', pageType === 'buy' ? 'buy' : '', query)
    const categoryData = result?.data?.data
    if (categoryData) {
      await setCustomTab(categoryData)
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          category: categoryData,
        }
      })
    }
  }, [])

  const applyFilter = useCallback(
    (type, filterData) => {
      if (type === 'apply') {
        getFilteredNfts(filterData)
      } else {
        getFilteredNfts()
      }
    },
    [getFilteredNfts]
  )

  return {
    loading,
    nftList,
    TabRender,
    TabSectionRender,
    filter,
    totalPage,
    applyFilter,
    renderSort,
    refreshPage,
  }
}

export default useMuseum
