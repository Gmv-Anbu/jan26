import Api from '../Api'
// import { getCookie } from '@nft-marketplace/js-cookie';
// import { KEYS } from '../../utlis/storage';
import config from '../../apiConfig'
import { IGlobalSearch, IUpdateFiatAmount, IUpdateTransaction } from './IMarketService'
import { injectedStore } from '@apps/customer/redux/store'
import { APP_ENV } from '@apps/customer/config'
const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

const token = injectedStore?.getState()?.auth?.accessToken
if (token) {
  headers['Authorization'] = `Bearer ${token}`
}

const mockInstance = new Api({
  baseURL: 'http://localhost:3000',
  timeout: 20000,
})

const { API_URL } = config

const Axios = new Api({
  baseURL: API_URL,
  timeout: 20000,
  headers: headers,
})

class MuseumService {
    getNFTList = async (data: {
        page: number
        items: number
        search?: string
        filter?: {
          collection?: []
          category?: []
          currency?: []
          orderBy?: string | 'asc' | 'desc'
          sortBy?: string | 'resellPrice' | 'createdAt'
        }
      }) => await Axios.get('/assets', { params: data })
}
export default new MuseumService()
