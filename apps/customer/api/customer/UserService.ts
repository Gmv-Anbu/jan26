import axios from 'axios'

import Api from '../Api'

import { injectedStore } from '@apps/customer/redux/store'
import config from '../../apiConfig'
import { ICancelResaleAsset, IGetCreatedNFTById, IGetFavoriteAssetList, IGetOnsaleAssetList, IGetPrimarySaleEarnings, IGetPurchasedListForSale, IGetPurchasedNFTById, IHandlefavourite, IHandlePlaceBid } from './IuserService'

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

const headers2 = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

const token = injectedStore?.getState()?.auth?.accessToken

if (token) {
  headers['Authorization'] = `Bearer ${token}`
  headers2['Authorization'] = `Bearer UUcJHAeea0ff4aec93562d183bc5c85f9d251`
}

const { API_URL, ADMIN, CUSTOMER } = config

const AxiosInstance = new Api({
  baseURL: API_URL,
  timeout: 20000,
  headers: headers,
})

// increased timeout for larger files like videos/audios
const AxoisMultiPart = new Api({
  baseURL: API_URL,
  timeout: 100000,
  headers: headers,
})

const AxiosInstance2 = new Api({
  baseURL: 'http://localhost:3000',
  timeout: 20000,
  headers: headers2,
})

//

interface InterfaceUpdateProfile {
  firstName: string
  lastName: string
  userName: string
  email: string
  phone: string
}

const userAxios = axios.create({
  baseURL: API_URL,
  headers: headers,
})

class AccountService {
  [x: string]: any

  initHeaders(token: any) {
    // set token here
    // let header = AxiosInstance?.defaults?.headers
    // if (token) {
    //     header['authorization'] = `Bearer ${token}`;
    // }else{
    //     if(header.hasOwnProperty('authorization')){
    //         delete header['authorization']
    //     }
    // }
  }

  updateProfile = async (data: any) => {
    return await AxiosInstance.patch('/user/profile', data, this.setToken())
  }

  setToken() {
    let token = JSON.parse(localStorage.getItem('user'))?.accessToken
    let headers = {}
    if (token) {
      headers = { Authorization: `Bearer ${token}` }
    }
    return headers
  }

  userLogout = async () => {
    return await AxiosInstance.delete('/user/logout', this.setToken())
  }

  getProfile(token: any) {
    return new Promise((resolve, reject) => {
      let headers = {}
      if (token) {
        headers = { Authorization: `Bearer ${token}` }
      }
      userAxios
        .get('/user/profile', { headers: headers })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getKycSubmissionDetails=async(data)=>{
    return await AxiosInstance.post('/kyc/status/request', data, this.setToken())
  }

  restartKYC = async(data)=>{
    return await AxiosInstance.post('/kyc/reset', data, this.setToken())
  }

  getKycStatus=async()=>{
    return await AxiosInstance.get('/kyc/accessToken', this.setToken())
  }

  updateProfileImage = async (data: any) => {
    const formData = new FormData()
    formData.append('file', data)
    return await AxiosInstance.post('/user/profile/image', formData, this.setToken())
  }
  updateCoverImage = async (data: any) => {
    const formData = new FormData()
    formData.append('file', data)
    return await AxiosInstance.post('/user/profile/bannerImage', formData)
  }

  deleteProfileImage = async () => await AxiosInstance.delete('/user/profile/image')

  deleteCoverImage = async () => await AxiosInstance.delete('/user/profile/bannerImage')

  resendEmailVerification = async (data: { [key: string]: any }) => await AxiosInstance.post('/user/email/resend', data)

  // AxiosInstance2
  getFilterData = async () => await AxiosInstance2.get('/filterData')

  getNFTList = async () => await AxiosInstance2.get('/nftItems')

  getCollectionData = async () => await AxiosInstance2.get('/collectionsData')

  getProfileCollectionData = async () => await AxiosInstance2.get('/profileCollectionsData')

  getSliderData = async () => await AxiosInstance2.get('/sliderData')

  getExchangeRate = async () => await AxiosInstance.get('/exchange/rate')

  getPurchasedNFT = async (page: number, limit: number, cursor?: any) => {
    if (cursor) {
      return await AxiosInstance.get('/assets/purchased', {
        params: {
          page: page,
          items: limit,
          cursor: cursor,
        },
      })
    } else {
      return await AxiosInstance.get('/assets/purchased', {
        params: {
          page: page,
          items: limit,
        },
      })
    }
  }

  getPurchasedNFTById = async (id: number, page: number, limit: number, cursor?: any) => {
    if (cursor) {
      return await AxiosInstance.get(`/assets/purchased/${id}`, {
        params: {
          page: page,
          items: limit,
          cursor: cursor,
        },
      })
    } else {
      return await AxiosInstance.get(`/assets/purchased/${id}`, {
        params: {
          page: page,
          items: limit,
        },
      })
    }
  }

  getCollectedNftById = async ({ userId, page, items, cursor }: IGetPurchasedNFTById) => {
    return await AxiosInstance.get(`/assets/purchased/${userId}`, {
      params: { page, items, cursor },
    })
  }
  getCreatedNftById = async ({ userId, page, items }: IGetCreatedNFTById) => {
    return await AxiosInstance.get(`/assets/created/${userId}`, {
      params: { page, items },
    })
  }

  getNftResaledList = async (page: number, items: number) =>
    await AxiosInstance.get(`/assets/resale`, {
      params: {
        page,
        items,
      },
    })
  getPurchasedListForSale = async (data: IGetPurchasedListForSale) => await AxiosInstance.post(`/order/listForResale`, data)

  getPurchasedListForSaleHedera = async (data: IGetPurchasedListForSale) => await AxiosInstance.post(`/order/hedera/list-resale`, data)

  getFollowerCount = async (id: number) => await AxiosInstance.get(`/follows/count/${id}`)

  followCreator = async (data: any) => {
    return await AxiosInstance.post(`/follows/toggle-follow/${data}`)
  }
  SubscribeToNewsletter = async (email: any) => {
    return await AxiosInstance.post('/subscriber', {
      email: email,
    })
  } 

  AuctionInteresetedUser = async (payload) => {
    return await AxiosInstance.post('/auction/interested/user', payload)
  }

  followStatus = async (id: number) => await AxiosInstance.get(`/follows/status/${id}`)

  getUserProfile = async (id?: string, token?: string) => {
    if (id) return await AxiosInstance.get(`/user/profile/${id}`)
    else {
      if (token) headers['Authorization'] = `Bearer ${token}`
      return await AxiosInstance.get(`/user/profile`, { headers: headers })
    }
  }
  getFavIcon = async () => await AxiosInstance.get(API_URL + `/theme/user`)
  getAppLogo = async () => await AxiosInstance.get(API_URL + `/theme/user`)

  // getTermsAndConditions = async () => await AxiosInstance.get(`page/terms-&-conditions`)
  // getAboutUs = async () => await AxiosInstance.get(`page/about-us`)
  // getPrivacyPolicy = async () => await AxiosInstance.get(`page/privacy-policy`)
  getUserActivity = async () => await AxiosInstance.get(`/activity-log/user`)

  getPageContent = async (pageKey) => await AxiosInstance.get(`/page/${pageKey}`)

  getUserActivityById = async (id: number, page: number, limit: number) =>
    await AxiosInstance.get(`/activity-log/user/${id}`, {
      params: {
        page: page,
        items: limit,
      },
    })

  verifyEmail = async (data: { [key: string]: any }) => await AxiosInstance.post('/user/email/verify', data)
  getAssetActivityById = async (id: number, page: number, limit: number, isParent: boolean) =>
    await AxiosInstance.get(`/activity-log/${isParent ? 'asset' : 'edition'}/${id}`, {
      params: {
        page: page,
        items: limit,
      },
    })

  handlefavourite = async (data: IHandlefavourite) => await AxiosInstance.post(`/favorite`, data)
  getFavoriteAssetList = async (data: IGetFavoriteAssetList) => await AxiosInstance.get('/favorite', { params: data })
  getOnsaleAssetList = async (data: IGetOnsaleAssetList) => {
    const { page, items, userId } = data
    if (userId)
      return await AxiosInstance.get(`/assets/resale/${userId}`, {
        params: { page, items },
      })
    return await AxiosInstance.get('/assets/resale', {
      params: { page, items },
    })
  }
  getPrimarySaleEarnings = async (data: IGetPrimarySaleEarnings) => await AxiosInstance.get('/order/transactions/earnings', { params: data })
  cancelResaledAsset = async (data: ICancelResaleAsset) => await AxiosInstance.delete('/order/cancel', { data })
  cancelResaledAssetHedera = async (data: ICancelResaleAsset) => await AxiosInstance.post('/order/hedera/cancel-resale', data)

  handlePlaceBid = async (data: IHandlePlaceBid) => await AxiosInstance.post(`/order/bid`, data)

  bidDetails = async (id: number, page: number, limit: number) =>
    await AxiosInstance.get(`/activity-log/auction/${id}/bids`, {
      params: {
        page: page,
        items: limit,
      },
    })
  uploadAssetMainImage(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return AxoisMultiPart.post('assets/mainAsset/upload', payload)
  }
  uploadSupportImage(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return AxiosInstance.post('/assets/supportAsset/upload', payload)
  }
  addAsset(payload: any) {
    return AxiosInstance.post('/assets/create', payload)
  }
  applyForCreator = async () => await AxiosInstance.post(`/creator/apply`, {})

  async getConfigs() {
    return await AxiosInstance.get(ADMIN.CONFIGURATIONS)
  }
  deleteImage = async (file: any) => {
    return AxiosInstance.delete('common/file', {
      data: { file: file },
      headers: headers,
    })
  }
  visitorCount = async () => {
    let result = await axios.get('https://api.ipify.org?format=json')
    if (result?.data?.ip) {
      const payload = {
        ip: result?.data?.ip,
      }
      return AxiosInstance.post(CUSTOMER.VISITORS_COUNT, payload)
    }
  }

  //Signup APIs
  registerUser = async (data) => {
    return await AxiosInstance.post('/user/signup', data)
  }
  //SignIn APIs
  signInUser = async (data) => {
    return await AxiosInstance.post('/user/signin', data)
  }
  //Forgot password APIs
  forgotPassword = async (data) => {
    return await AxiosInstance.post('/user/forgotPassword', data)
  }
  //Reset Password
  resetPassword = async (data) => {
    return await AxiosInstance.patch('/user/resetPassword', data)
  }

  //Change Password
  changePassword = async (data) => {
    return await AxiosInstance.patch('/user/changePassword', data, this.setToken())
  }
  changeAddress = async (data) => {
    return await AxiosInstance.post('/userAddress', data, this.setToken())
  }
  editAddress = async (data, id) => {
    return await AxiosInstance.patch('/userAddress/' + id, data, this.setToken())
  }
  getAddress = async () => await AxiosInstance.get('/userAddress', { headers: this.setToken() })

  //Our collections
  getCollectionCount = async () => {
    return await AxiosInstance.get('category/dropdown', this.setToken())
  }
}
export default new AccountService()
