import Api from '../Api'
import { KEYS } from '../../utils/storage'
import config from '../../apiConfig'
import { getCookie } from '@nft-marketplace/js-cookie'

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

const { API_URL, ADMIN, CUSTOMER } = config

const Axois = new Api({
  baseURL: API_URL,
  timeout: 20000,
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

  // currency
  getCurrency(params: any) {
    return Axois.get(ADMIN.CURRENCY + params)
  },

  // category
  getCategoryList(params: any) {
    return Axois.get(ADMIN.CATEGORY + params)
  },
  getActiveCategoryList() {
    return Axois.get(ADMIN.ACTIVE_CATEGORY)
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

  // Collection
  getCollectionList(params: any) {
    return Axois.get(ADMIN.COLLECTION + params)
  },
  getCreatorsCollectionList() {
    return Axois.get(ADMIN.ACTIVE_COLLECTION)
  },
  getCollectionById(id: number) {
    return Axois.get(ADMIN.COLLECTION + '/' + id)
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
    return Axois.post(ADMIN.ASSETS.MAIN_UPLOAD, payload, headers)
  },
  addAsset(payload: any) {
    return Axois.post(ADMIN.ASSETS.CREATE, payload)
  },
  updateAsset(id: number, payload: any) {
    return Axois.patch(ADMIN.ASSETS.UPDATE + '/' + id, payload)
  },
  getAssetList(params: any) {
    return Axois.get(ADMIN.ASSETS.LIST + params)
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
}
