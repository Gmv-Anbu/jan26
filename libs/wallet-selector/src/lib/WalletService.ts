import { provider as TypeProvider } from 'web3-core'
const uniqueId = () => {
  const dateString = Date.now().toString(36)
  const randomness = Math.random().toString(36).substr(2)
  return dateString + randomness
}
export interface IWalletService {
  providerName?: string | null
  provider?: TypeProvider
  firstTimeLoggedIn?: boolean
  metamaskInstalled?: boolean
}
export const WalletService = {
  on(event: string, callback: (d: IWalletService) => void) {
    document.addEventListener(event, (e: CustomEventInit) => callback(e.detail))
  },
  off(event: string, callback: (d: IWalletService) => void) {
    document.removeEventListener(event, (e: CustomEventInit) => callback(e.detail))
  },
  dispatch(name: string, detail: IWalletService) {
    const randomId = uniqueId()
    document.dispatchEvent(new CustomEvent(name, { detail: detail }))
    return randomId
  },
}
