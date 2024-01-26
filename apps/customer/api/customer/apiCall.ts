import Api from '../Api'
import { KEYS } from "../../utils/storage";
import config from "../../apiConfig";
import { getCookie } from "@nft-marketplace/js-cookie";
import { injectedStore } from '@apps/customer/redux/store';

const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'Authorization': ''
};

const tokenNew = getCookie(KEYS.CUSTOMER_TOKEN);
const token =  injectedStore?.getState()?.auth?.accessToken;

if (tokenNew) {
  headers["Authorization"] = `Bearer ${tokenNew}`;
}

const { API_URL, CUSTOMER } = config;

const AxiosInstance = new Api({
  baseURL: API_URL,
  timeout: 20000,
  headers: headers,
})

class AssetsApiCall {
  getAssetById = async (id: any) => {
    return await AxiosInstance.get(`/assets/${id}`)
  }
  getAssets = async () => {
    return await AxiosInstance.get(`/assets`)
  }
  hostAnEvent = async (data) => {
    // const formData = new FormData()
    // formData.append('file', data)
    return await AxiosInstance.post(`/common/event`, data)
  }
}
export default new AssetsApiCall()
