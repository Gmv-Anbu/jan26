import Api from '../Api'

import config from '../../apiConfig'
import { getCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '@apps/admin/utils/storage'

const { API_URL, ADMIN } = config

let headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
}
// const headers = {
//     Accept: 'application/json, text/plain, */*',
//     'Content-Type': 'application/json',
//     authorization: '',
//   };

const token = getCookie(KEYS.ADMIN_TOKEN)
if (token) {
  headers['Authorization'] = `Bearer ${token}`
}

const AxoisInstance = new Api({
  baseURL: API_URL,
  timeout: 20000,
  headers: headers,
})
interface InterfaceUpdateProfile {
  userName: string
  email: string
  id: number
}
class AuthServices {
  UpdateProfile() {
    throw new Error('Method not implemented.')
  }

  initHeaders(token: any) {
    // set token here
    // let header = AxoisInstance?.defaults?.headers
    // if (token) {
    //     header['authorization'] = `Bearer ${token}`;
    // }else{
    //     if(header.hasOwnProperty('authorization')){
    //         delete header['authorization']
    //     }
    // }
  }

  login = async (data: object) => await AxoisInstance.post(`/admin/login`, data)

  forgotPassword = async (data: object) => await AxoisInstance.post(ADMIN.AUTH.FORGOT_PASSOWRD, data)

  logout = async () => await AxoisInstance.post(`/api/logout/`)

  loginExtended = async (access_id: string) => await AxoisInstance.post(`/api/login-extended/?access_id=${access_id}`)

  updatedProfile = async (data: any, id: number) => await AxoisInstance.patch(`/admin/user/update/${id}`, data)
  getProfile = async (data: any) => await AxoisInstance.get(`/admin/user/${data}`)
  userProfileDetails = async (id?: string) => await AxoisInstance.get(`/admin/user/${id}`)
  userAdminUpdateDetails = async (data: any, id: any) => await AxoisInstance.patch(`/admin/user/update/${id}`, data)
  userAdminCreateSubAdmin = async (data: any) => await AxoisInstance.post(`/admin/create-sub-admin`, data)

  createUser = async (data: any) => await AxoisInstance.post(`/admin/create/user`, data)

  getAdminDetails = async (id: any, token?: any) => {
    if (token) headers['Authorization'] = `Bearer ${token}`
    return await AxoisInstance.get(`/admin/user/${id}`, { headers: headers })
  }

  updateProfileImg = async (data: any) => {
    const formData = new FormData()
    formData.append('file', data)
    return await AxoisInstance.post('/user/profile/image', formData)
  }
  updateUserProfileImg = async (data: any, id: any) => {
    const formData = new FormData()
    formData.append('file', data)
    return await AxoisInstance.post(`admin/user/profileImage/${id}`, formData)
  }
  updateUserBannerImg = async (data: any, id: any) => {
    const formData = new FormData()
    formData.append('file', data)
    return await AxoisInstance.post(`admin/user/bannerImage/${id}`, formData)
  }
  getFollowerCount = async (id: number) => await AxoisInstance.get(`/follows/count/${id}`)

  checkPassword = async (email: string, password: number) =>
    await AxoisInstance.post('/admin/checkPassword', {
      email: email,
      password: password,
    })

  resetPassword = async (email: string, password: any, newPassword: any, confirmPassword: any) =>
    await AxoisInstance.patch('/admin/resetPassword', {
      email: email,
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    })

  twoFactorAuthentication = async (data: object) => await AxoisInstance.post(`/admin/2FA/verify`, data)

  enable2fa = async (data: any) => await AxoisInstance.patch('/admin/2FA/update-2fa', data)

  changePassword = async (payload: any) => await AxoisInstance.patch(ADMIN.AUTH.CHANGE_PASSWORD, payload)

  getPermissionsListAdmin = async () => await AxoisInstance.get(`/permissions/all`)

  setPermissionAdmin = async (id: number, data: any) => await AxoisInstance.patch(`/permissions/modify/user/${id}`, data)

  getPermissionAdmin = async (id: number) => await AxoisInstance.get(`/permissions/user/${id}`)

  logoutAdmin = async () => await AxoisInstance.delete(`/admin/logout`)
}

export default new AuthServices()
