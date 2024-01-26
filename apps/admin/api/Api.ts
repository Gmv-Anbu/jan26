import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {resolve} from './resolve'; 
import {KEYS} from '../utils/storage';
import { getCookie, removeCookie } from '@nft-marketplace/js-cookie';
class Api {
    client: AxiosInstance;
    constructor(config:AxiosRequestConfig) {
        this.client = axios.create({
            ...config,
            baseURL: config.baseURL,
            timeout: config.timeout || 20000
        })
        this.client.interceptors.request.use(
            (config:any) => {
                const token = getCookie(KEYS.ADMIN_TOKEN)
                if (token)
                    config.headers.Authorization = `Bearer ${token}`
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        this.client.interceptors.response.use((responseInter) => {
            if( responseInter?.data?.message === 'Authentication Error, Please try logging again' || 
                responseInter?.data?.message === "Link expired" || 
                responseInter?.data?.message === "Invalid access token!" ) {

                removeCookie(KEYS.ADMIN_TOKEN)
                removeCookie(KEYS.ADMIN_ID)
                removeCookie(KEYS.CUSTOMER_TOKEN)
                setTimeout(() => {
                    window.location.href = '/auth/login';
                }, 500)
                return
            }
            return responseInter
            },
            (error: any) => {
                if(error?.response && error?.response?.status === 401) {
                    removeCookie(KEYS.ADMIN_ID)
                    removeCookie(KEYS.ADMIN_TOKEN)
                    removeCookie(KEYS.CUSTOMER_TOKEN)
                    setTimeout(() => {
                        window.location.href = '/auth/login';
                    }, 500)
                }
                return Promise.reject(error)
            }
        );
    }

    async get(url:string, config:object={}) {
        return await resolve(this.client.get(url, config).then(res=>res));
    }
    async post(url:string, data:any= {}, headers?:any) {
        return await resolve(this.client.post(url, data, {headers: headers}).then(res=>res));
    }
    async put(url:string, data:any={}, headers?:any) {
        return await resolve(this.client.put(url, data, {headers: headers}).then(res=>res));
    }
    async patch(url:string, data:any={}, headers?:any) {
        return await resolve(this.client.patch(url, data, {headers: headers}).then(res=>res));
    }
    async delete(url:string) {
        return await resolve(this.client.delete(url).then(res=>res));
    }
}

export default Api;
