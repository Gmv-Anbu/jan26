import MarketService from '@apps/customer/api/customer/MarketService'
import useTab from '@apps/customer/components/Menu/useTab'
import useTabSection from '@apps/customer/components/MenuSection/useTabSection'
import { handleApiImage } from '@apps/customer/utils/helper'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import Select from 'react-select'

interface IUseNft {
  nftList?: Array<any>
  categoryList?: Array<any>
  TabRender?: (dataList: Array<any>) => ReactNode
  TabSectionRender?: (dataList: Array<any>) => ReactNode
  filter: Record<string, any>
  totalPage: number
  totalNFT: number
  applyFilter?: (type: string, price: any) => void
  renderSort?: ReactNode
  refreshPage?: () => void
  isLoading?: boolean
}
interface INftProps {
  currentPage: number
}

const sortOptions = [
  { label: 'Alphabetical order (A - Z)', value: 'asc' },
  { label: 'Alphabetical order (Z - A)', value: 'desc' },
]

const useNft = ({ currentPage }: INftProps): IUseNft => {
  const [nftList, setNFTList] = useState<any>([])
  const [refresh, setRefresh] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [totalNFT, setTotalNFT] = useState(0)
  const [cursor, setCursor] = useState(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [filter, setFilter] = useState({
    category: [],
    subCategory: [],
    sortBy: 'createdAt',
    orderBy: '',
    // brand : [],
  })
  // const { render: TabRender, selectedTab } = useTab({ id: '', name: '' })
  // const { render: TabSectionRender, selectedSection } = useTabSection([])

  useEffect(() => {
    getFilteredNfts()
    // makeCategoryFilter()
  }, [filter, currentPage, refresh])

  // useEffect(() => {
  //   getFilteredNfts()
  // }, [selectedTab, selectedSection, filter, currentPage, refresh])

  const handleSelect = (sort) => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        orderBy: sort.value,
        sortBy: 'refName',
      }
    })
  }

  const refreshPage = useCallback(() => {
    setRefresh(!refresh)
  }, [refresh])

  const renderSort = (
    <Select
      placeholder="Sort by"
      classNamePrefix="react-select"
      menuPlacement="auto"
      maxMenuHeight={300}
      options={sortOptions}
      isSearchable={false}
      // value={form?.creatorObj}
      name="sort"
      // onInputChange={(value) => setCreatorSearchTerm(value)}
      onChange={handleSelect}
    />
  )

  // const createFilter = useCallback(
  //   (price) => {
  //     let filterObj = { category: [], subCategory: [], sortBy: 'createdAt', orderBy: '' }
  //     filterObj.category = selectedTab.id ? [selectedTab.id] : []
  //     filterObj.subCategory = selectedSection.map(section => section.id && section.id)
  //     filterObj.sortBy = filter.sortBy
  //     filterObj.orderBy = filter.orderBy
  //     if (price) filterObj = { ...filterObj, ...price }

  //     return filterObj
  //   },
  //   [selectedTab, selectedSection, filter]
  // )

  const getFilteredNfts = useCallback(
    async (price?: Record<number, any>) => {
      setLoading(true)
      const limit = window?.screen?.availWidth >= 549 ? 8 : 4
      const result = await MarketService.getTransferredNFTList(currentPage, limit, cursor)
      if (result?.status === 200) {
        const { data } = result.data
        const { exchangeRates, pageMeta } = data
        setCursor(pageMeta?.cursor)
        setTotalNFT(pageMeta?.totalItems)
        setTotalPage(Math.ceil(pageMeta?.totalItems / limit))
        const assetList = data?.assetList?.map((i) => {
          const transformedName = i?.name.toLowerCase()
          const transformedRefNo = i?.refNo.toLowerCase()
          const transformedRefName = i?.refName.toLowerCase()
          return {
            id: i?.id,
            name: transformedName.charAt(0).toUpperCase() + transformedName.slice(1),
            refNo: transformedRefNo.charAt(0).toUpperCase() + transformedRefNo.slice(1),
            refName: transformedRefName,
            image: handleApiImage(i?.mainAssetUrl),
            price: i?.primarySalePrice
          }
        })
        setNFTList(assetList)
      }
      setLoading(false)
    },
    [currentPage]
  )

  const makeCategoryFilter = useCallback(async () => {
    const result = await MarketService.getCategoryList(1, 12)
    const category = result?.data?.data
    const updatedCategory = category?.map((item) => {
      if (item.name === 'Wrist Watches') {
        let count = 0
        item.subCategories.map((sub) => (count = Number(sub?.assetCount) + count))

        return { ...item, subCategories: [{ name: 'All', assetCount: count || 0 }, ...item.subCategories] }
      }
      return { ...item }
    })
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        category: updatedCategory,
      }
    })
  }, [])

  const applyFilter = useCallback((type, price) => {
    if (type === 'apply') getFilteredNfts(price)
    else getFilteredNfts()
  }, [])

  return {
    nftList,
    // TabRender,
    // TabSectionRender,
    totalNFT,
    filter,
    totalPage,
    applyFilter,
    renderSort,
    refreshPage,
    isLoading: loading,
  }
}

export default useNft
