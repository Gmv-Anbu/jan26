import { useCallback, useEffect, useState } from 'react'
import { ModalService } from '@nft-marketplace/modal'
import { useWeb3Context } from '@nft-marketplace/wallet-selector'
import { useHederaContext } from '@nft-marketplace/hedera-wallet-selector'
import WalletConnectModal from '../modal/WalletConnectModal'
import HedraConnectModal from '../modal/HedraConnectModal'
import { useDispatch } from 'react-redux'

import { MetaMaskInpageProvider } from '@metamask/providers'
// import actions from '../../../../redux/actions';
import router from 'next/router'
import { AppDispatch } from '../../../../redux/store'
import { getCookie, setCookie } from '@nft-marketplace/js-cookie'

import { KEYS } from '../../../../utils/storage'
import SuccessModal from '../modal/SuccessModal'
import Router from 'next/router'
import { APP_ENV } from '@apps/customer/config'

import { config } from 'process'

// const { connectWallet, logOutUser } = actions;

// import actions from '../../../../redux/actions';

import { connectWallet, disconnectWallet as disconnectWalletAction } from '@apps/customer/redux/reducer/authSlice'
import { setMagicLoader } from '@apps/customer/redux/reducer/magicSlice'
import { deleteProfileData, getProfile } from '@apps/customer/redux/reducer/userSlice'
import ErrorModal from '../modal/ErrorModal'
// const { connectWallet, logOutUser } = actions;

// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider
//   }
// }
declare global {
  interface Window {
    web3?: any
  }
}

const useAuthConnect = () => {
  const { magicData, web3, switchWeb3, disconnectWallet, currentProviderName, setWalletFirstTimeInit } = useWeb3Context()
  const { hedera, hederaInstance, switchHedera, pairingData, disconnectHedera, connectionStatus, setConnectionStatus, disconnectHederaWallet } = useHederaContext()

  const dispatch = useDispatch<AppDispatch>()
  const [hederaConnectionProcessing, setHederaConnectionProcessing] = useState(false)

  // for hedera
  const selectWalletTypeHedera = useCallback(
    (modalProps: any) => async (id: string) => {
      await switchHedera(id)
      modalProps.close()
      setHederaConnectionProcessing(true)
    },
    [switchHedera]
  )

  // For web3
  const selectWalletType = useCallback(
    async(id?: string) =>  {
      if (typeof window !== 'undefined' && window.screen.width < 768 && !window?.web3?.currentProvider?.isMetaMask) {
        window.location.href = APP_ENV.METAMASK_MOBILE_REDIRECTION
        return
      }
      await switchWeb3(id)
      // modalProps.close()
      setWalletFirstTimeInit(true)
      if (id === 'google' || id === 'facebook') {
        dispatch(setMagicLoader(true))
        setWalletFirstTimeInit(false)
      }
    },
    [switchWeb3, setWalletFirstTimeInit]
  )

  const connectMetamask = useCallback(() => {
    selectWalletType('metaMask')
  },[switchWeb3, selectWalletType])

  // For magicLink email
  const handleEmailSubmit = useCallback(
    (modalProps: any) => async (id: string, email: string) => {
      await switchWeb3(id, false, email)
      modalProps.close()
      dispatch(setMagicLoader(true))
    },
    [switchWeb3]
  )

  const connectToWallet = useCallback(() => {
    //  Write code here to switch between metamask and Hedera wallet integration - devX
    // Reading Env varable determine which network should be triggered.
    ModalService.open(
      (modalProps: any) =>
        APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? <HedraConnectModal onSelect={selectWalletTypeHedera(modalProps)} /> : <WalletConnectModal onSelect={selectWalletType} handleEmailSubmit={handleEmailSubmit(modalProps)} />,
      {
        width: "43.5rem",
        height: 'fit-content',
      }
    )
  }, [selectWalletType, selectWalletTypeHedera])

  const disconnectFromWallet = useCallback(
    async (id: string = 'walletConnect') => {
      await dispatch(disconnectWalletAction())
      await dispatch(deleteProfileData())
      // await disconnectHedera('hedera');
      APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? await disconnectHederaWallet() : await disconnectWallet(currentProviderName)
      await disconnectHederaWallet()
      Router.push('/')
      ModalService.open((modalProps: any) => <SuccessModal close={modalProps.close} title={'Logout'} desc={'You are sucessfully logged out'} />, { closeIcon: false })
    },
    [dispatch, disconnectHedera, disconnectWallet]
  )

  // Handle BE intration for Hedera
  const handleSignHedera = useCallback(async () => {
    if (hederaInstance && pairingData) {
      const param = {
        walletAddress: pairingData?.pairingData?.accountIds[0],
        signature: 'sample',
      }
      dispatch(connectWallet(param)).then(function (data: any) {
        if (data?.payload?.data) {
          setConnectionStatus('appConnected')
          setCookie(KEYS.CUSTOMER_TOKEN, data?.payload?.data?.accessToken)
          setCookie(KEYS.CURRENT_PROVIDER_NAME, currentProviderName)
          if (data?.payload?.data?.firstName == null || data?.payload?.data?.lastName == null || data?.payload?.data?.userName == null || data?.payload?.data?.description == null) {
            router.push('/base/profile/settings')
          }
          ModalService.open((modalProps: any) => <SuccessModal close={modalProps.close} />, { closeIcon: false })
        } else if (data?.payload?.error) {
          ModalService.open((modalProps: any) => <ErrorModal desc={data?.payload?.error?.message} close={modalProps.close} />, { closeIcon: false })
        }
      })
      setWalletFirstTimeInit(false)
    }
  }, [hedera, dispatch, pairingData])

  // Useeffect for Hedera
  useEffect(() => {
    if (pairingData && pairingData != '' && connectionStatus == 'hashPackConnected' && hederaInstance && hederaConnectionProcessing) {
      handleSignHedera()
      setHederaConnectionProcessing(false)
    }
  }, [connectionStatus])

  return {
    connectToWallet,
    disconnectFromWallet,
    connectMetamask
  }
}
export default useAuthConnect
