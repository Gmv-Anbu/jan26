import Api from '../Api';
import config from '../../apiConfig';
import { getCookie } from '@nft-marketplace/js-cookie';
import { KEYS } from '@apps/customer/utils/storage';

const { API_URL } = config;
const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: '',
}

const token = getCookie(KEYS.CUSTOMER_USER)
if (token) {
  headers['Authorization'] = `Bearer ${token.accessToken}`
}
const AxoisInstance = new Api({
  baseURL: API_URL,
  timeout: 20000,
  headers: headers,
});

class WalletConnectService {
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
  connectWallet = async (data: { walletAddress: string; signature: string }) =>
    await AxoisInstance.post('/user/connect/wallet', data);

  connectWalletHedra = async (data: {
    walletAddress: string;
    signature: string;
    email?: string;
  }) => await AxoisInstance.post('/user/connect/wallet', data);
}

export default new WalletConnectService();
