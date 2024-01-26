import Api from '../Api'
import { KEYS } from '../../utils/storage'
import config from '../../apiConfig'
import { getCookie } from '@nft-marketplace/js-cookie'
import axios from 'axios'

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

const token = getCookie(KEYS.ADMIN_TOKEN)

if (token) {
  headers['Authorization'] = `Bearer ${token}`
}

export function handleApiImage(str) {
  if (str.includes('https://')) {
    return str
  } else if(str) {
    return config?.S3_URL + str
  }
  return null
}

const { API_URL, ADMIN } = config

const Axois = new Api({
  baseURL: API_URL,
  timeout: 50000,
  headers: headers,
})

// increased timeout for larger files like videos/audios
const AxoisMultiPart = new Api({
  baseURL: API_URL,
  timeout: 100000,
  headers: headers,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // Image upload
  uploadImage(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return Axois.post(ADMIN.IMAGE_UPLOAD, payload, headers)
  },
  categoryImgUpload(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return Axois.post(ADMIN.CATEGORY_IMG_UPLOAD, payload, headers)
  },

  // currency
  getCurrency(params: any) {
    return Axois.get(ADMIN.CURRENCY + params)
  },
  // Bulk-upload
  addAssetBulk(payload: any) {
    return Axois.post(ADMIN.ASSETS.BULK_UPLOAD, payload)
  },

  // category
  getCategoryList(params: any) {
    return Axois.get(ADMIN.CATEGORY + params)
  },
  getActiveCategoryList(params: any) {
    return Axois.get(ADMIN.ACTIVE_CATEGORY + params)
  },
  getCategoryById(id: number) {
    return Axois.get(ADMIN.CATEGORY + '/' + id)
  },
  addCategory(payload: any) {
    return Axois.post(ADMIN.CATEGORY, payload)
  },
  updateCategory(id: number, payload: any) {
    return Axois.patch(ADMIN.CATEGORY + '/' + id, payload)
  },

  deleteCategory(id: number) {
    return Axois.delete(ADMIN.CATEGORY + '/' + 'remove' + '/' + id)
  },

  //SubCategory
  getSubCategoryList(params: any) {
    return Axois.get(ADMIN.SUBCATEGORY + params)
  },
  getSubCategoryById(id: number) {
    return Axois.get(ADMIN.ADDSUBCATEGORY + '/' + id)
  },
  addSubCategory(payload: any) {
    return Axois.post(ADMIN.ADDSUBCATEGORY, payload)
  },
  updateSubCategory(id: number, payload: any) {
    return Axois.patch(ADMIN.ADDSUBCATEGORY + '/' + id, payload)
  },

  // Collection
  getCollectionList(page: number, limit: number, filter?: any, search?: string) {
    const params: any = {
      page: page,
      items: limit,
      filter: filter,
    }
    if (search) {
      params.search = search
    }
    return Axois.get(ADMIN.COLLECTION, {
      params,
    })
  },
  getActiveCollectionList(filter?: any) {
    let params = {
      filter: filter,
    }
    return Axois.get(ADMIN.ACTIVE_COLLECTION, { params })
  },
  getCollectionById(id: number) {
    return Axois.get(ADMIN.COLLECTION + '/' + id)
  },

  deleteCollection(id: number) {
    return Axois.delete(ADMIN.COLLECTION + '/' + 'remove' + '/' + id)
  },
  addCollection(payload: any) {
    return Axois.post(ADMIN.COLLECTION, payload)
  },
  updateCollection(id: number, payload: any) {
    return Axois.patch(ADMIN.COLLECTION + '/' + id, payload)
  },

  // assets
  uploadAssetMainImage(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return AxoisMultiPart.post(ADMIN.ASSETS.MAIN_UPLOAD, payload, headers)
  },
  deleteImage: async (file: any) => {
    return axios.delete(API_URL + '/common/file', {
      data: { file: file },
      headers: headers,
    })
  },
  deleteSupportImage: async (file: any) => {
    return axios.delete(API_URL + '/common/file', {
      data: { file: file },
      headers: headers,
    })
  },
  uploadAuctionPDF(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return AxoisMultiPart.post(ADMIN.ASSETS.AUCTION_PDF, payload, headers)
  },
  addAsset(payload: any) {
    return Axois.post(ADMIN.ASSETS.CREATE, payload)
  },
  updateAsset(id: number, payload: any) {
    return Axois.patch(ADMIN.ASSETS.UPDATE + '/' + id, payload)
  },
  getAssetList(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
      filter: filter,
    }
    if (search) {
      params.search = search
    }
    return Axois.get(ADMIN.ASSETS.LIST, {
      params,
    })
  },
  subCategoryDataAll(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
      filter: filter,
    }
    if (search) params.search = search
    return Axois.get(ADMIN.SUBCATEGORY_ALL, {
      params,
    })
  },
  subCategoryData(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
      filter: filter,
    }
    if (search) params.search = search
    return Axois.get(ADMIN.SUBCATEGORY, {
      params,
    })
  },

  getAssetById(id: number) {
    return Axois.get(ADMIN.ASSETS.GET_BY_ID + '/' + id)
  },
  deleteAssetById(id: number) {
    return Axois.delete(ADMIN.ASSETS.DELETE + '/' + id)
  },
  uploadSupportImage(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return Axois.post(ADMIN.ASSETS.SUPPORT_IMAGE, payload, headers)
  },
  //Featured//

  getFeatured(id: any) {
    return Axois.patch(`/assets/featuredAsset?id=${id}`)
  },
  //Sale status
  updateSaleStatus(id: any) {
    return Axois.patch(`/assets/sale-status/${id}`)
  },

  // User
  getUsersList(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
      filter: filter,
    }
    if (search) {
      params.search = search
    }
    return Axois.get(ADMIN.USERS.GET_LIST, {
      params,
    })
  },
  addNewUser(payload: any) {
    return Axois.post(ADMIN.USERS.CREATE, payload)
  },
  updateAssetSale(id:number,payload:any){
    return Axois.patch(ADMIN.ASSETS.SALE+'/'+id, payload)
  },

  // sub-admin
  blockSubAdmin(id: number) {
    return Axois.patch(ADMIN.SUB_ADMIN.BLOCK_USER, { id: id })
  },

  unBlockSubAdmin(id: number) {
    return Axois.patch(ADMIN.SUB_ADMIN.UNBLOCK_USER, { id: id })
  },

  // apply as creator
  updateUserRole(id: number, params) {
    return Axois.post(ADMIN.USERS.UPDATE_USER_ROLE + '/' + id, params)
  },

  bulkUpdateUserRole(payload) {
    return Axois.patch(ADMIN.USERS.BULK_UPDATE_USER_ROLE, payload)
  },

  // block user
  blockUser(data: { [key: string]: any }) {
    return Axois.patch(ADMIN.USERS.BLOCK_USER, data)
  },

  bulkBlockUser(payload) {
    return Axois.patch(ADMIN.USERS.BULK_BLOCK_USER, payload)
  },

  // unblock user
  unblockUser(data: { [key: string]: any }) {
    return Axois.patch(ADMIN.USERS.UNBLOCK_USER, data)
  },
  transferNft(data: { [key: string]: any }) {
    return Axois.post(ADMIN.USERS.TRANSFER_NFT, data)
  },

  bulkUnblockUser(payload) {
    return Axois.patch(ADMIN.USERS.BULK_UNBLOCK_USER, payload)
  },
  // export CSV
  exportUserCSV() {
    return Axois.get(ADMIN.USERS.EXPORT_CSV)
  },
  resendEmailVerfication(id) {
    return Axois.post(`/admin/user/${id}/email/resend`)
  },


  // white list user
  whitelistUser(payload) {
    return Axois.patch(ADMIN.USERS.WHITELIST, payload)
  },
  whitelistUserBulk(payload) {
    return Axois.patch(ADMIN.USERS.WHITELIST_BULK, payload)
  },
  removeWhitelistUser(payload) {
    return Axois.patch(ADMIN.USERS.WHITELIST_REMOVE, payload)
  },

  // Newsletter Subscriptions
  getNewsletterSubscriptionsList(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
      filter: filter,
    }
    if (search) {
      params.search = search
    }
    return Axois.get(ADMIN.NEWSLETTER_SUBSCRIBERS.GET_SUBSCRIBERS_LIST, {
      params,
    })
  },
  exportNewsletterCSV() {
    return Axois.post(ADMIN.NEWSLETTER_SUBSCRIBERS.EXPORT_CSV)
  },

  // Creator Management
  getCreatorList(page: number, limit: number, filter: any, search: any = '', typeOfData: string) {
    const params: any = {
      page: page,
      items: limit,
    }
    if (filter) {
      params.filter = filter
    }
    if (search) {
      params.search = search
    }
    return Axois.get(typeOfData === 'creators' ? ADMIN.CREATOR_MANAGEMENT.GET_CREATOR_LIST : ADMIN.CREATOR_MANAGEMENT.GET_CREATOR_REQUESTS, {
      params,
    })
  },

  // Approve or Reject Action on Creator
  updateCreatorStatus(id: number, status: string, reason = '') {
    const params: any = {
      status,
    }

    if (status === 'declined') {
      params.reason = reason
    }

    return Axois.post(ADMIN.CREATOR_MANAGEMENT.UPDATE_STATUS + '/' + id, params)
  },

  //Dashboard
  getDashboardInfo(params: any) {
    return Axois.get(ADMIN.DASHBOARD.GET_WIDGET_INFO + params)
  },

  getRevenueGraphData(params: any) {
    return Axois.get(ADMIN.DASHBOARD.GET_REVENUE_GRAPH + params)
  },

  getPurchaseGraphData(params: any) {
    return Axois.get(ADMIN.DASHBOARD.GET_PURCHASE_GRAPH + params)
  },

  getVisitorsGraphData(params: any) {
    return Axois.get(ADMIN.DASHBOARD.GET_VISITORS_GRAPH + params)
  },

  getUsersGraphData(params: any) {
    return Axois.get(ADMIN.DASHBOARD.GET_USERS_GRAPH + params)
  },

  // Accounting
  getAccountingWidgetInfo(params: any) {
    return Axois.get(ADMIN.ACCOUNTING.GET_ACCOUNTING_WIDGET_INFO + params)
  },

  // Commissions
  getCommissions() {
    return Axois.get(ADMIN.ACCOUNTING.GET_COMMISSIONS, {})
  },
  // Commissions
  updateCommissions(params: { type: string; fee: number }) {
    return Axois.put(ADMIN.ACCOUNTING.UPDATE_COMMISSIONS, params)
  },

  getTransactionTableData(params: string) {
    return Axois.get(ADMIN.ACCOUNTING.GET_TRANSACTION_TABLE_DATA + params)
  },

  getTheme() {
    return Axois.get(ADMIN.THEME.GET_THEME)
  },
  UpdateThemeDetails(payload: any) {
    return Axois.post(ADMIN.THEME.UPDATE_THEME, payload)
  },

  uploadThemeImage(file: any) {
    const payload = new FormData()
    payload.append('file', file)
    const headers = { 'Content-Type': `multipart/form-data` }
    return Axois.patch(ADMIN.THEME.UPLOAD, payload, headers)
  },

  //Navigation - Menu Api's
  addMenuItem(payload: any) {
    return Axois.post(ADMIN.NAVIGATION.CREATE_UPDATE_DELETE_MENU, payload)
  },

  updateMenuItem(id: number, payload: any) {
    return Axois.put(ADMIN.NAVIGATION.CREATE_UPDATE_DELETE_MENU + `/${id}`, payload)
  },

  deleteMenuItem(id: number) {
    return Axois.delete(ADMIN.NAVIGATION.CREATE_UPDATE_DELETE_MENU + `/${id}`)
  },

  //Page
  addPage(payload: any) {
    return Axois.post(ADMIN.PAGE.ADD_PAGE, payload)
  },

  getAllPages(params: { [key: string]: any }) {
    return Axois.get(ADMIN.PAGE.GET_ALL_PAGES, { params })
  },

  updatePage(id: number, payload: { [key: string]: any }) {
    return Axois.patch(ADMIN.PAGE.UPDATE_PAGE + `/${id}`, payload)
  },

  deletePage(id: number) {
    return Axois.delete(ADMIN.PAGE.DELETE_PAGE + `/${id}`)
  },

  // Preferances
  getPreferances(params: { [key: string]: any }) {
    return Axois.get(ADMIN.PREFERANCE.GET_PREFERANCES, { params })
  },

  updatePreference(payload: any) {
    return Axois.post(ADMIN.PREFERANCE.UPDATE_PREFERANCES, payload)
  },

  getAdminConfig() {
    return Axois.get(ADMIN.CONFIG)
  },

  // // assets
  // uploadAssetMainImage(file: any) {
  //   const payload = new FormData();
  //   payload.append('file', file);
  //   const headers = { 'Content-Type': `multipart/form-data` };
  //   return Axois.post(ADMIN.ASSETS.MAIN_UPLOAD, payload, headers);
  // },
  // addAsset(payload: any) {
  //   return Axois.post(ADMIN.ASSETS.CREATE, payload);
  // },
  // updateAsset(id: number, payload: any) {
  //   return Axois.patch(ADMIN.ASSETS.UPDATE + '/' + id, payload);
  // },
  // getAssetList(params: any) {
  //   return Axois.get(ADMIN.ASSETS.LIST + params);
  // },
  // getAssetById(id: number) {
  //   return Axois.get(ADMIN.ASSETS.GET_BY_ID + '/' + id);
  // },
  // deleteAssetById(id: number) {
  //   return Axois.delete(ADMIN.ASSETS.DELETE + '/' + id);
  // },
  // uploadSupportImage(file: any) {
  //   const payload = new FormData();
  //   payload.append('file', file);
  //   const headers = { 'Content-Type': `multipart/form-data` };
  //   return Axois.post(ADMIN.ASSETS.SUPPORT_IMAGE, payload, headers);
  // },

  // events
  uploadEventImage(file: any) {
    const payload = new FormData();
    payload.append('file', file);
    const headers = { 'Content-Type': `multipart/form-data` };
    return Axois.put(ADMIN.EVENTS.CRUD, payload, headers);
  },
  addEvent(payload: any) {
    return Axois.post(ADMIN.EVENTS.CRUD, payload);
  },
  updateEvent(id: number, payload: any) {
    return Axois.patch(ADMIN.EVENTS.CRUD + '/' + id, payload);
  },
  addFaq(payload:any){
    return Axois.post(ADMIN.FAQ.ADD, payload);
  },
  updateFaq(payload:any,id:any){
    return Axois.patch(ADMIN.FAQ.UPDATE+'/'+id, payload);
  },
  getFAQbyId(id:any) {
    return Axois.get(ADMIN.FAQ.GET+'/'+id)
  },
  deleteFAQ(id:any){
    return Axois.delete(ADMIN.FAQ.GET+'/'+id)
  },
  getFAQ(page: number, limit: number, type: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (type) params.type = type
    return Axois.get(ADMIN.FAQ.GET, { params })
  },
  getEventList(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (filter?.startDate) params.startDate = filter?.startDate
    if (filter?.endDate) params.endDate = filter?.endDate
    if (filter?.type) params.type = filter?.type
    return Axois.get(ADMIN.EVENTS.CRUD, {
      params,
    })
  },
  getEventRequestList(page: number, limit: number, filter: any, search: any = '') {
    let params: any = {
      page: page,
      items: limit,
      filter: {
        prefferedFrom: '',
        prefferedTo: ''
      }
    }
    if (search) params.search = search
    if (filter?.from) params.filter.prefferedFrom = filter?.from
    if (filter?.to) params.filter.prefferedTo = filter?.to
    if (filter?.type) params.type = filter?.type
    return Axois.get(ADMIN.EVENT_REQUEST.GET, {
      params,
    })
  },
  // auction registration
  getAuctionRegistration(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (filter) params.filter = filter
    return Axois.get(ADMIN.AUCTION_REG.LIST, {
      params,
    })
  },
  updateAuctionRegistration(regId, payload){
    return Axois.put(ADMIN.AUCTION_REG.UPDATE+'/'+regId, payload)
  },
  exportAuctionRegCSV(search, filter) {
    let params = {
      search: null,
      filter: {
        status: null
      }
    }
    if (search) params.search = search
    if (filter) params.filter.status = filter?.type
    return Axois.get(ADMIN.AUCTION_REG.EXPORT_CSV, { params })
  },



  getMyTransfers(page: number, limit: number, filter: any, search: any = '') {
    const params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (filter?.start) params.start = filter?.start
    if (filter?.end) params.end = filter?.end
    return Axois.get(ADMIN.MY_TRANSFERS.GET, {
      params,
    })
  },
  approveEventRequest(id: number){
    return Axois.patch(ADMIN.EVENT_REQUEST.APPROVE+'/'+id+'/approved')
  },
  rejectEventRequest(id: number,body){
    return Axois.patch(ADMIN.EVENT_REQUEST.REJECT+'/'+id+'/rejected',body)
  },
  getEventById(id: number) {
    return Axois.get(ADMIN.EVENTS.CRUD + '/' + id);
  },
  deleteEventById(id: number) {
    return Axois.delete(ADMIN.EVENTS.CRUD + '/' + id);
  },

  // company approval
  getCompanyList(page: number, limit: number, filter: any, search: any = '') {
    let params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (filter) params.filter = filter
    return Axois.get(ADMIN.COMPANY.LIST, {
      params,
    })
  },
  getCompanyById(id: number) {
    return Axois.get(`/company/${id}/admin`);
  },
  updateCompanyStatus(companyId, payload){
    return Axois.put(`/company/${companyId}/admin`, payload)
  },

  // bid management
  getBidAuctionList(page: number, limit: number, filter: any, search: any = '') {
    let params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (filter) params.filter = { ...filter, sortBy: 'createdAt'}
    return Axois.get(ADMIN.BID_MANAGEMENT.AUCTION_LIST, {
      params,
    })
  },
  getBidList(auctionId: any, page: number, limit: number, filter: any, search: any = '') {
    let params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (filter) params.filter = { ...filter, sortBy: 'createdAt'}
    return Axois.get(`/admin/auction/${auctionId}/bids`, {
      params,
    })
  },
  exportBids(date) {
    let params = {
      targetDate: date || null
    }
    return Axois.get(ADMIN.BID_MANAGEMENT.EXPORT_CSV, { params })
  },

  // sell request
  sellList(page: number, limit: number, filter: any, search: any = '') {
    let params: any = {
      page: page,
      items: limit,
    }
    if (search) params.search = search
    if (filter) params.filter = filter
    return Axois.get(ADMIN.SELL, {
      params,
    })
  },
  updateSellRequest(id, payload){
    return Axois.put(`/sell/${id}/admin`, payload)
  },

  // accounting
  getAcountingCardCounts() {
    return Axois.get(ADMIN.ACCOUNTING.CARDS_COUNTS)
  },
  getRevenueChart(params: any) {
    return Axois.get(ADMIN.ACCOUNTING.REVENUE_CHART + params)
  },
  getTransactions(params){
    return Axois.get(ADMIN.ACCOUNTING.TRANSACTIONS + params)
  },

  // archive offers
  getArchiveOffers(params: any) {
    return Axois.get(ADMIN.ARCHIVE_OFFERS + params)
  },
}
