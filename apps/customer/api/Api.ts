import { getCookie, removeCookie } from '@nft-marketplace/js-cookie'
// import { ModalService } from '@nft-marketplace/modal';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { KEYS } from '../utils/storage'
import { resolve } from './resolve'
// import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'

class Api {
  client: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.client = axios.create({
      ...config,
      baseURL: config.baseURL,
      timeout: config.timeout || 20000,
    })
    this.client.interceptors.request.use(
      (config: any) => {
        const token = getCookie(KEYS.CUSTOMER_USER)?.accessToken
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.client.interceptors.response.use(
      function (successRes) {
        return successRes
      },
      async function (error) {
        const originalRequest = error.config
        // ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc="Only supports image files with jpeg, png or jpg" />)
        // const refreshToken = getCookie(KEYS.CUSTOMER_USER)?.refreshToken

        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          localStorage.clear()
          removeCookie(KEYS.CUSTOMER_USER)
          const pattern = /^(\/assets\/)\d{1,9}$/
          console.log(pattern.test(error.config?.url), '>>>>>>>>', error.config?.url)
          if (pattern.test(error.config?.url)) {
            window.location.href = '/base/signin'
            return
          } else {
            window.location.href = '/timeOut'
          }
          //   const accessToken = await getUpdatedToken()
          //
          //   if (accessToken) {
          //     originalRequest.headers.Authorization = `Bearer ${accessToken}`
          //     //
          //     return axios(originalRequest);
          //   }
          //    else {
          //     localStorage.clear();
          //     window.location.reload();
          //     return Promise.reject(error);
          //   }
        } else {
          return Promise.reject(error)
        }
      }
    )
  }

  async get(url: string, config: object = {}) {
    return await resolve(this.client.get(url, config).then((res) => res))
  }
  async post(url: string, data: any = {}, headers?: any) {
    return await resolve(this.client.post(url, data, { headers: headers }).then((res) => res))
  }
  async put(url: string, data: any = {}, headers?: any) {
    return await resolve(this.client.put(url, data, { headers: headers }).then((res) => res))
  }
  async patch(url: string, data: any = {}, headers?: any) {
    return await resolve(this.client.patch(url, data, { headers: headers }).then((res) => res))
  }
  async delete(url: string, config: object = {}) {
    return await resolve(this.client.delete(url, config).then((res) => res))
  }
}

export default Api
