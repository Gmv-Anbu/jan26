import Api from '../Api'
// import { getCookie } from '@nft-marketplace/js-cookie';
// import { KEYS } from '../../utlis/storage';
import config from '../../apiConfig'
import { IGlobalSearch, IUpdateFiatAmount, IUpdateTransaction } from './IMarketService'
import { injectedStore } from '@apps/customer/redux/store'
import { APP_ENV } from '@apps/customer/config'
import { getCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '@apps/customer/utils/storage'
const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

const token = injectedStore?.getState()?.auth?.accessToken
const tokenNew = getCookie(KEYS.CUSTOMER_USER)?.accessToken
if (tokenNew) {
  headers['Authorization'] = `Bearer ${tokenNew}`
}

const mockInstance = new Api({
  baseURL: 'http://localhost:3000',
  timeout: 20000,
})

const { API_URL, TRANSAK_API_URL } = config

const Axios = new Api({
  baseURL: API_URL,
  timeout: 20000,
  headers: headers,
})

const AxiosTransak = new Api({
  baseURL: TRANSAK_API_URL,
  timeout: 20000,
  headers: headers,
})

class MarketService {
  getSliderData = async () => await mockInstance.get('/sliderData')

  getSupportersData = async (page: any, items: any) =>
    await Axios.get('/contentManagementSystem/supporters', {
      page: page,
      items: items,
    })

  getFilterData = async () => await Axios.get('/filterData')
  // getSupportersData = async (page: any, items: any) =>
  //     await Axios.get('/page/supporters', { page: page, items: items });

  getNFTList = async (data: any) => await Axios.get('/assets', { params: data })

  // getCollectionData = async (page: number, limit: number, search?: string) => {
  //   const params: {
  //     page: number;
  //     items: number;
  //     search?: string;
  //   } = {
  //     page: page,
  //     items: limit,
  //   };
  //   if (search && search?.trim() !== '') params.search = search;
  //   return await Axios.get('/collection', {
  //     params,
  //   });
  // };

  getCollectionData = async (page: number, limit: number, search?: string) => {
    const params: {
      page: number
      items: number
      search?: string
      filter: {
        isActive: string
      }
    } = {
      page: page,
      items: limit,
      filter: { isActive: 'true' },
    }
    if (search && search?.trim() !== '') params.search = search
    return await Axios.get('/collection', {
      params,
    })
  }

  getCategoryList = async (page: number, limit: number, search?: string, type?: string, filterData?: any) => {
    const params: {
      page: number
      items: number
      search?: string
      categoryType?: string
      filter: {
        isActive: string
      }
    } = {
      page: page,
      items: limit,
      categoryType: type || null,
      filter: { isActive: 'true', ...filterData },
    }
    if (search && search?.trim() !== '') params.search = search
    return await Axios.get(`/category/dropdown`, { params })
  }

  getCurrencyList = async (page: number, limit: number, search?: string) => {
    const params: {
      page: number
      items: number
      search?: string
    } = {
      page: page,
      items: limit,
    }
    if (search && search?.trim() !== '') params.search = search
    return await Axios.get(`/currency`, { params })
  }

  // call for trending api
  getTrendingNFTList = async (page: number, limit: number) =>
    await Axios.get('/assets/trending/list', {
      params: {
        page: page,
        items: limit,
      },
    })

  // call for feature api
  getFeaturedNFTList = async (page: number, limit: number) =>
    await Axios.get('/assets/featuredAsset/list', {
      params: {
        page: page,
        items: limit,
      },
    })

  getTransferredNFTList = async (page: number, limit: number, cursor: any) =>
    await Axios.get('/assets/transferred', {
      params: {
        page: page,
        items: limit,
        cursor: cursor
      },
    })

  getAssetById = async (id: number | string) => await Axios.get('/assets/edition/' + id)

  buyNowHedera = async (id: string) =>
    await Axios.post('/order/hedera/buy-now', {
      assetId: id,
    })

  buyNowHederaResale = async (id: string) =>
    await Axios.post('/order/hedera/buy-now', {
      tokenId: id,
      type: 'resale',
    })

  //hedera-test
  getTransferFuction = async (from: string, to: string, amount: string) =>
    await Axios.post('order/hedera/transaction-test', {
      from: from,
      to: to,
      amount: amount,
    })

  updateTransaction = async (data: IUpdateTransaction) => await Axios.post('/order/updateTransaction', data)

  updateTransactionHedera = async (data: IUpdateTransaction) => await Axios.post('/order/hedera/update-transaction', data)

  buyFromSale = async (id: string) =>
    await Axios.post('/order/buyFromSale', {
      tokenId: id,
    })

  // Auction

  getAuctionAssetById = async (id: number | string) => await Axios.get('/auction/' + id)

  buyNow = async (id: string) =>
    await Axios.post('/order/buy', {
      assetId: id,
    })

  BidNow = async (id: number, price: number) =>
    await Axios.post('/order/hedera/auction-bid', {
      auctionId: id,
      price: price,
    })

  globalSearch = async ({ search }: IGlobalSearch) => await Axios.get(`/assets/search?search=${search}`)

  getUserTheme = async () => await Axios.get('/theme/user')

  getPreferances = async () => await Axios.get('/preferance/settings')

  getFiatCurrencies = async () => await AxiosTransak.get(`/currencies/fiat-currencies?partnerApiKey=${APP_ENV.TRANSAK_KEY}`)

  getFiatPrice = async ({ currency, method, cryptoAmount }: IUpdateFiatAmount) =>
    await AxiosTransak.get(
      `/currencies/price?apiKey=${APP_ENV.TRANSAK_KEY}&fiatCurrency=${currency}&cryptoCurrency=${
        APP_ENV.BASE_CRYPTO_CURRENCY
      }&paymentMethod=${method}&isBuyOrSell=BUY&cryptoAmount=${cryptoAmount}&network=${APP_ENV.NEXT_PUBLIC_NETWORK_TYPE?.toLowerCase()}`
    )

  createPrimaryFiatOrder = async (assetId: string) => await Axios.post('/transak/buyFiatFromPrimary', { assetId })

  createSecondaryFiatOrder = async (tokenId: number) => await Axios.post('/transak/buyFiatFromSecondary', { tokenId })

  createFiatOrder = async (orderData) => await Axios.post('/transak/checkout', orderData)

  updateFiatOrder = async (updateData) => await Axios.put('/transak/update-checkout', updateData)
}
export default new MarketService()
