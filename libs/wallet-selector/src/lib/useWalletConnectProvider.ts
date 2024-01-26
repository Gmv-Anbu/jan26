import { useCallback, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { IuseWalletConnectProvider } from './useWalletConnectProvider.model'
import { WalletService } from './WalletService'
import providerNames from './providerConfig'
import { getCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '@apps/customer/utils/storage'

const useWalletConnectProvider = (infuraId: string): IuseWalletConnectProvider => {
  const [provider, setProvider] = useState<IuseWalletConnectProvider['provider']>(null)
  const [connected, setConnected] = useState<IuseWalletConnectProvider['connected']>(false)
  const createProvider = useCallback(async () => {
    if (provider) return provider
    try {
      const newProvder = await new WalletConnectProvider({
        infuraId: infuraId,
      })
      return newProvder
    } catch (error) {
      console.log({ error })
      return null
    }
  }, [infuraId, provider])

  const connectWallet = useCallback<IuseWalletConnectProvider['connectWallet']>(async () => {
    let newProvder = await createProvider()
    try {
      if (newProvder.connector.connected || !newProvder.isConnecting) {
        newProvder
          .enable()
          .then(() => {
            console.log('enabled the wallet connector')
          })
          .catch((err: any) => {
            console.log({ err })
            newProvder.connector.transportClose()
            newProvder = null
            setProvider(null)
            return null
          })
      }

      setProvider(newProvder)
    } catch (error) {
      console.error({ error })
    }
    // WalletService.dispatch("providerChanged",{provider:newProvder,providerName:providerNames['walletConnect'].id})
    return newProvder
  }, [createProvider])

  useEffect(() => {
    if (provider && provider !== null) {
      const currentProviderName = getCookie(KEYS.CURRENT_PROVIDER_NAME)
      WalletService.dispatch('providerChanged', { provider: provider, providerName: providerNames['walletConnect'].id, firstTimeLoggedIn: currentProviderName ? false : true })
      const disconnectWallet = () => {
        setProvider(null)
        WalletService.dispatch('providerChanged', { provider: null, providerName: null, firstTimeLoggedIn: true })
      }
      const connectedWallet = async (error: any) => {
        if (error) {
          setProvider(null)
          throw error
        }
        setConnected(true)
      }
      provider.connector.on('connect', connectedWallet)
      provider.connector.on('disconnect', disconnectWallet)
      return () => {
        provider.connector.off('connect', connectedWallet)
        provider.connector.off('disconnect', disconnectWallet)
        if (provider?.connector) {
          provider.connector.transportClose()
        }
        setProvider(null)
        setConnected(false)
      }
    } else {
      return () => null
    }
  }, [provider])
  return {
    connected,
    provider,
    connectWallet,
  }
}
export default useWalletConnectProvider
