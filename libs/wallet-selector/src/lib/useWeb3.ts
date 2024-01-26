import Web3 from 'web3'
import useMetamaskProvider from './useMetamaskProvider'
import { provider as TypeProvider } from 'web3-core'
import useWalletConnectProvider from './useWalletConnectProvider'
import { useCallback, useEffect, useState } from 'react'

import { APP_ENV } from '../../../../apps/customer/config'
import { providerNames, magicLinkProviderNames, magicLinkEmailProvider } from './providerConfig'
import { IAccountDetails, IUseWeb3 } from './useWeb3.model'
import { IuseMetamaskProvider } from './useMetamaskProvider.model'
import { IuseWalletConnectProvider } from './useWalletConnectProvider.model'
import useMagicLink from './useMagicLink'
import { WalletService } from './WalletService'
import { magic } from '../lib/magic'
const initialAccountDetail: IAccountDetails = {
  accounts: [],
  activeAccount: undefined,
  balance: 0,
  chainId: 0,
}
export const useWeb3 = (defaultProviderName?: string | null, infuraId?: any): IUseWeb3 => {
  const [web3, setWeb3] = useState<IUseWeb3['web3']>(null)
  const [magicData, setMagicData] = useState<any>(null)
  const [metamaskNotInstalled, setMetamaskNotInstalled] = useState<boolean>(false)
  const [accountInfo, setAccountInfo] = useState<IAccountDetails>(initialAccountDetail)
  const { connectMetamaskProvider, chainId: metaChainId }: IuseMetamaskProvider = useMetamaskProvider()
  const { provider: walletConnectProvider, connectWallet }: IuseWalletConnectProvider = useWalletConnectProvider(infuraId)
  const { handleLoginWithEmail, handleLoginWithSocial, handleLogout } = useMagicLink()
  const [currentProviderName, setCurrentProviderName] = useState<string | null>(null)
  const [selectedProviderName, setSelectedProviderName] = useState<string | null>(null)
  const [walletFirstTimeInit, setWalletFirstTimeInit] = useState(false)

  const switchWeb3: IUseWeb3['switchWeb3'] = useCallback(
    async (type, notAvailableAction = true, email = '') => {
      setSelectedProviderName(type)
      let meta
      switch (type) {
        case providerNames['metaMask'].id:
          setMetamaskNotInstalled(false)
          meta = await connectMetamaskProvider(notAvailableAction)
          if (meta) {
            console.log({ meta })
          }
          break

        case providerNames['walletConnect'].id:
          meta = await connectWallet()
          break

        case magicLinkProviderNames['facebook'].id:
          handleLoginWithSocial('facebook')
          break

        case magicLinkProviderNames['google'].id:
          await handleLoginWithSocial('google')
          break

        case magicLinkEmailProvider['email'].id:
          handleLoginWithEmail(email)
          break
        default:
          break
      }
    },
    [connectMetamaskProvider, connectWallet, handleLoginWithSocial, handleLoginWithEmail]
  )

  const addChainToNetwork = useCallback(async () => {
    const NETWORK_PARMS = {
      chainId: APP_ENV.NETWORK_ID,
      chainName: APP_ENV.NETWORK_NAME,
      rpcUrls: [`${APP_ENV.RPC_URL}/${infuraId}`],
      nativeCurrency: {
        name: APP_ENV.NETWORK_NATIVE_CURRENCY_NAME,
        symbol: APP_ENV.NETWORK_SYMBOL,
        decimals: APP_ENV.NETWORK_DECIMAL,
      },
      blockExplorerUrls: [APP_ENV.NETWORK_BLOCK_EXPLORE_URL],
    }
    // injected.getProvider().then((provider) => {
    const newWeb3: any = web3
    await newWeb3.currentProvider
      .request({
        method: 'wallet_addEthereumChain',
        params: [NETWORK_PARMS],
      })
      .catch((error) => {
        console.log('adding--error', { error })
      })
    // });
  }, [infuraId, web3])

  const switchNetwork = useCallback(
    async (chainId: number | string) => {
      if (web3) {
        const currentChainId = await web3.eth.net.getId()
        if (currentChainId !== chainId) {
          try {
            const newWeb3: any = web3
            await newWeb3.currentProvider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: Web3.utils.toHex(chainId) }],
            })
            return true
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              console.log('The requested chain is not found,, Trying to add that chain')
              addChainToNetwork()
            }
            return false
          }
        }
      }
      return
    },
    [addChainToNetwork, web3]
  )

  const disconnectWallet: IUseWeb3['disconnectWallet'] = useCallback(
    async (type) => {
      switch (type) {
        case providerNames['metaMask'].id:
          break
        case providerNames['walletConnect'].id:
          if (walletConnectProvider && walletConnectProvider.connector.connected) await walletConnectProvider.disconnect()
          break
        case magicLinkProviderNames['google'].id:
          handleLogout()
          break
        case magicLinkProviderNames['facebook'].id:
          handleLogout()
          break
        case magicLinkEmailProvider['email'].id:
          handleLogout()
          break
        default:
          break
      }
      setAccountInfo(initialAccountDetail)
    },
    [walletConnectProvider]
  )

  useEffect(() => {
    if (defaultProviderName && !currentProviderName) {
      switchWeb3(defaultProviderName)
    }
  }, [defaultProviderName, currentProviderName, switchWeb3])
  const updateAccountDetails = useCallback(async () => {
    if (web3) {
      try {
        // WalletService.dispatch('accountSwitched',{providerName:selectedProviderName})
        let balance: IAccountDetails['balance'] = 0
        let activeAccount: IAccountDetails['activeAccount']
        const accounts: IAccountDetails['accounts'] = await web3.eth.getAccounts()
        const chainId: IAccountDetails['chainId'] = await web3.eth.getChainId()
        if (accounts && Array.isArray(accounts) && accounts.length) {
          activeAccount = accounts[0]
          // web3.eth.defaultAccount = activeAccount;
          const balanceWeight = await web3.eth.getBalance(activeAccount)
          balance = await web3.utils.fromWei(balanceWeight, 'ether')
          console.log({ balanceWeight, balance })
          setAccountInfo({
            accounts: accounts,
            activeAccount: activeAccount,
            balance: parseFloat(balance?.toString())?.toFixed(4),
            chainId: chainId,
          })
        }
      } catch (error) {
        console.error('Web3-Account-Details', error)
      }
    }
  }, [web3, selectedProviderName])

  useEffect(() => {
    if (web3) {
      const povider: any = web3.currentProvider
      const chainChangeHandler = (chainId: number) => {
        updateAccountDetails()
      }
      const connectHandler = (chainId: any) => {
        updateAccountDetails()
      }
      const disconnectHandler = () => {
        setAccountInfo(initialAccountDetail)
      }
      updateAccountDetails()
      const handleAccountchanged = (accounts: Array<string>) => {
        // window.location.reload()
      }
      povider.on('chainChanged', chainChangeHandler)
      povider.on('connect', connectHandler)
      povider.on('disconnect', disconnectHandler)
      povider.on('accountsChanged', handleAccountchanged)
      return () => {
        povider.removeListener('chainChanged', chainChangeHandler)
        povider.removeListener('connect', connectHandler)
        povider.removeListener('disconnect', disconnectHandler)
        povider.removeListener('accountsChanged', handleAccountchanged)
      }
    } else {
      return () => null
    }
  }, [web3, updateAccountDetails])

  //for metamask not found case

  useEffect(() => {
    const providerChangeCallBack = (data) => {
      if (data?.provider && data?.providerName) {
        setCurrentProviderName(data?.providerName || null)
        setWeb3(new Web3(data?.provider))
        setMagicData(magic)
        if (data?.firstTimeLoggedIn) {
          console.log('providerChangeCallBack - here first time logged in')
          setWalletFirstTimeInit(true)
        }
      } else {
        setCurrentProviderName(null)
        setWeb3(null)
      }
    }
    const checkMetamaskInstalledCallback = (data) => {
      console.log('metamask Status', { data })
      if (!data?.metamaskInstalled) setMetamaskNotInstalled(true)
      if (data?.firstTimeLoggedIn) {
        console.log('checkMetamaskInstalledCallback - here first time logged in')
        setWalletFirstTimeInit(true)
      }
    }
    // WalletService.on("accountSwitched",eventCallback);
    WalletService.on('providerChanged', providerChangeCallBack)
    WalletService.on('metamaskInstalled', checkMetamaskInstalledCallback)
    return () => {
      // WalletService.off("accountSwitched",eventCallback)
      WalletService.off('providerChanged', providerChangeCallBack)
      WalletService.on('metamaskInstalled', checkMetamaskInstalledCallback)
    }
  }, [])

  return { metamaskNotInstalled, magicData, web3, switchWeb3, disconnectWallet, currentProviderName, accountInfo, switchNetwork, walletFirstTimeInit, setWalletFirstTimeInit }
}
