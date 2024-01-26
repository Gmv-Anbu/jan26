import Api from '../Api'
import { KEYS } from '../../utils/storage'
import config from '../../apiConfig'
import { getCookie } from '@nft-marketplace/js-cookie'
import { injectedStore } from '@apps/customer/redux/store'
const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

//const tokenNew = getCookie(KEYS.CUSTOMER_TOKEN)
const tokenNew = getCookie(KEYS.CUSTOMER_USER)
//const tokenNew = JSON.parse(localStorage.getItem('user')).accessToken
const token = injectedStore?.getState()?.auth?.accessToken

if (tokenNew) {
  headers['Authorization'] = `Bearer ${tokenNew.accessToken}`
}

const { API_URL, CUSTOMER } = config

const Axois = new Api({
  baseURL: API_URL,
  timeout: 20000,
  headers: headers,
})

const CUSTOMERAPI = {

  getUserDetails() {
    return Axois.get('/user/profile')
  },

  uploadImage(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return Axois.post(CUSTOMER.IMAGE_UPLOAD, payload, headers)
  },

  // collection
  getCollectionList(params: any) {
    return Axois.get(CUSTOMER.COLLECTION.URL + params)
  },
  getCollectionById(id: number) {
    return Axois.get(CUSTOMER.COLLECTION.URL + '/' + id)
  },
  getCollectionAssetsById(id: number, params: any) {
    return Axois.get(CUSTOMER.COLLECTION.GET_COLLECTION_ASSETS + '/' + id + params)
  },
  getAssetById(id: any) {
    return Axois.get(`/assets/${id}`)
  },
  getAssets(params: any) {
    return Axois.get(`/assets?${params}`)
  },
  getBrands() {
    return Axois.get(`/assets/brands`)
  },
  hostAnEvent(data) {
    return Axois.post(`/common/event`, data)
  },
  eventRequest(data) {
    return Axois.post(`/event/submission`, data)
  },
  addCollection(payload: any) {
    return Axois.post(CUSTOMER.COLLECTION.URL, payload)
  },
  updateCollection(id: number, payload: any) {
    return Axois.patch(CUSTOMER.COLLECTION.URL + '/' + id, payload)
  },
  getMyCollectionData(page: number, limit: number) {
    const params: {
      page: number
      items: number
    } = {
      page: page,
      items: limit,
    }
    return Axois.get('/collection/myCollection', {
      params,
    })
  },
  getAuctions(page: number, limit: number, autionType:any,filter:any, search = '') {
    const params=filter ? {filter}:''
    return Axois.get('/auction/'+autionType+'?page='+page+'&items='+limit+'&search='+search,{params})
  },

  //Favourites
  getMyFavoritesData(page: number, limit: number) {
    const params: {
      page: number
      items: number
    } = {
      page: page,
      items: limit,
    }
    return Axois.get('/favorite', {
      params,
      tokenNew,
    })
  },
  createOrRemovefavorite(data: any) {
    return Axois.post('/favorite', data)
  },
  bulkAddToFav(payload: any) {
    return Axois.post('/favorite/bulk', payload)
  },
  bulkRemoveToFav(payload: any) {
    return Axois.post('/favorite/bulk/remove', payload)
  },

  getEventsList(type: any) {
    return Axois.get(`/event?page=1&items=1000&type=${type}`)
  },

  getEventByID(id: any) {
    return Axois.get(`/event/${id}`)
  },

  //dashboard
  getDashboardCounts() {
    return Axois.get(CUSTOMER.DASHBOARD.COUNTS)
  },
  getLatestAssets(page: number, limit: number) {
    const params = {
      page: page,
      items: limit,
    }
    return Axois.get(CUSTOMER.DASHBOARD.LATEST, { params })
  },
  getEventTickets() {
    return Axois.get(CUSTOMER.DASHBOARD.EVENT_TICKETS)
  },

  // faqs
  getFaqs() {
    return Axois.get(CUSTOMER.FAQs+'?page=1&items=100')
  },

  // sell
  sellWatch(data: any) {
    return Axois.post(CUSTOMER.SELL.WATCH, data)
  },
  sellImgUpload(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return Axois.post(CUSTOMER.SELL.IMG_UPLOAD, payload, headers)
  },
  // auction
  getAuctionById(id: any) {
    return Axois.get(`/auction/${id}`)
  },
  checkoutApi(id: any, payload: any) {
    return Axois.post(`/auction/payment/${id}`, payload)
  },
  auctionOrderSummary(id: any, payload: any) {
    return Axois.post(`/auction/payment/${id}/summary`, payload)
  },
  bidsGenerator(payload: any) {
    return Axois.post(`/common/auction-bid-increments`, payload)
  },
  submitBid(id: any, payload: any) {
    return Axois.post(`/auction/bids/${id}`, payload)
  },
  getBidHistory(id: any) {
    return Axois.get(`/auction/bids/${id}?page=1&items=50`)
  },
  // auction registration 
  getAuctionRegistration(auctionId: any) {
    return Axois.get(`/auction/${auctionId}/registration`)
  },
  requestAuctionReg(data: any, auctionId: any) {
    return Axois.post(`/auction/${auctionId}/registration`, data)
  },

  // company
  getCompanies() {
    return Axois.get(`${CUSTOMER.COMPANY.ALL}?search=&page=1&items=50`)
  },
  companyUpload(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return Axois.post(CUSTOMER.COMPANY.UPLOAD, payload, headers)
  },
  addCompany(data: any) {
    return Axois.post(CUSTOMER.COMPANY.ALL, data)
  },

  // my auction
  getMyAuction(page: number, limit: number) {
    const params = { page: page, items: limit }
    return Axois.get(CUSTOMER.MY_AUCTION.MY, { params })
  },
  getMyWonAuction(page: number, limit: number) {
    const params = { page: page, items: limit }
    return Axois.get(CUSTOMER.MY_AUCTION.WON, { params })
  },
  getMyPastAuction(page: number, limit: number) {
    const params = { page: page, items: limit }
    return Axois.get(CUSTOMER.MY_AUCTION.PAST, { params })
  },
  getMyLiveAuction(page: number, limit: number) {
    const params = { page: page, items: limit }
    return Axois.get(CUSTOMER.MY_AUCTION.LIVE, { params })
  },

  // rapyd
  getRapydCardStatus() {
    return Axois.get(CUSTOMER.RAPYD.GET_STATUS)
  },
  postRapydVerifyCard() {
    return Axois.post(CUSTOMER.RAPYD.VERIFY_CARD)
  },


  // cart
  addToCart(id) {
    return Axois.post(CUSTOMER.CART.CART+'/'+id)
  },
  removeFromCart(id) {
    return Axois.delete(CUSTOMER.CART.CART+'/'+id)
  },
  getCart() {
    return Axois.get(CUSTOMER.CART.CART+`?page=1&items=20`)
  },
  clearCart() {
    return Axois.delete(CUSTOMER.CART.CLEAR_ALL)
  },

  // buy checkout
  buycheckoutApi(id: any, payload: any) {
    return Axois.post(`/cart/asset/${id}/checkout`, payload)
  },
  buyOrderSummary(id: any, payload: any) {
    return Axois.post(`/cart/asset/${id}/summary`, payload)
  },
  cartOrderSummary(payload: any) {
    return Axois.post(`/cart/payment/summary`, payload)
  },
  cartCheckoutApi(payload: any) {
    return Axois.post(`/cart/payment/checkout`, payload)
  },

  // transactions
  getUserTransactions(page, limit, filter) {
    return Axois.get(CUSTOMER.TRANSACTIONS.LIST, {
      params: {
        page: page,
        items: limit,
        filter: filter
      },
    })
  },

  // buy tickets
  buyEventTickets(id: any, payload: any) {
    return Axois.post(`/cart/event/${id}/checkout`, payload)
  },
  eventTicketSummary(id: any, payload: any) {
    return Axois.post(`/cart/event/${id}/summary`, payload)
  },

  // make an offer
  makeAnOffer(payload: any) {
    return Axois.post(`/offer`, payload)
  },

  // Verify email or username
  verifyUserName(payload: any) {
    return Axois.post(`/user/signup/verify`, payload)
  },

}
export default CUSTOMERAPI
