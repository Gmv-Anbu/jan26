import { useCallback, useEffect, useState } from 'react'
import providerNames from './providerConfig'
import { IuseMetamaskProvider, IConnectInfo, ProviderRpcError } from './useMetamaskProvider.model'
import { WalletService } from './WalletService'
declare let window: any

import { getCookie } from '../../../js-cookie/src/index'
import { KEYS } from '../../../../apps/customer/utils/storage'

const useMetamaskProvider = (): IuseMetamaskProvider => {
  const [provider, setProvider] = useState<IuseMetamaskProvider['provider']>(null)
  const [chainId, setChainId] = useState<IuseMetamaskProvider['chainId']>(null)
  const getMetamaskProvider = useCallback(async () => {
    if (typeof window !== 'undefined') {
      return await window.ethereum
    }
  }, [])
  const connectMetamaskProvider = useCallback<IuseMetamaskProvider['connectMetamaskProvider']>(
    async (installMetaMask = false) => {
      const currentProviderName = getCookie(KEYS.CURRENT_PROVIDER_NAME)
      try {
        const newProvder = await getMetamaskProvider()
        if (newProvder) {
          await newProvder.request({ method: 'eth_requestAccounts' }).then(async () => {
            const chain = await newProvder.request({ method: 'net_version' })
            setChainId(chain)
          })
          WalletService.dispatch('providerChanged', { provider: newProvder, providerName: providerNames['metaMask'].id, firstTimeLoggedIn: currentProviderName ? false : true })
          setProvider(newProvder)
          return newProvder
        } else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
          WalletService.dispatch('metamaskInstalled', { metamaskInstalled: false })
        }
      } catch (error) {
        console.error(error)
      }
    },
    [getMetamaskProvider]
  )
  useEffect(() => {
    if (provider && provider !== null) {
      const chainChangeHandler = (chainId: number) => {
        setChainId(chainId)
      }
      const handleConnect = (connectorInfo: IConnectInfo) => {
        console.log({ connectorInfo })
      }
      const handleDisconnect = (error: ProviderRpcError) => {
        console.log({ error })
        WalletService.dispatch('providerChanged', { provider: null, providerName: null, firstTimeLoggedIn: true })
      }
      provider.on('connect', handleConnect)
      provider.on('chainChanged', chainChangeHandler)
      provider.on('disconnect', handleDisconnect)
      return () => {
        provider.removeListener('connect', handleConnect)
        provider.removeListener('chainChanged', chainChangeHandler)
        provider.removeListener('disconnect', handleDisconnect)
      }
    } else {
      return () => null
    }
  }, [provider])
  return {
    connectMetamaskProvider,
    provider,
    chainId,
  }
}
export default useMetamaskProvider
