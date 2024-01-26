import Router from 'next/router'

import styled, { ThemeProvider } from 'styled-components'
import React, { useCallback, useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import GlobalStyle from '../styles/globalstyle'
import { getDefaultTheme } from '../styles/themes/customer'
import '../styles/globals.css'
import { RootState, wrapper } from '../redux/store'
import { initialize } from '../utils/utils'
import { ModalRoot, ModalService } from '@nft-marketplace/modal'
import { Web3ContextProvider } from '../../../libs/wallet-selector/src/index'
import { HederaContextProvider } from '@nft-marketplace/hedera-wallet-selector'
import CustomerLayout from '../modules/customer/layout/layout'
import Meta from '../modules/shared/components/meta'
import { APP_ENV } from '../config'
import { getCookie, removeCookie, setCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '../utils/storage'
import { getThemeDetails, getPreferenceDetails } from '../redux/reducer/appSlice'
import { connectWallet, loginUser, updateConnection } from '../redux/reducer/authSlice'
import SuccessModal from '../modules/customer/shared/modal/SuccessModal'
import ErrorModal from '../modules/customer/shared/modal/ErrorModal'
import MetamaskNotFoundModal from '../modules/customer/shared/modal/MetamaskNotFoundModal'
import router from 'next/router'
import { setMagicLoader } from '../redux/reducer/magicSlice'
import { getConfig, updateUserDetails } from '../redux/reducer/userSlice'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginSuccess } from '../redux/actions/auth'
import Modal from '../components/Modal'
import { getItem } from '@apps/admin/utils/storage'

const ToasterBox = styled.div`
  display: block;
  height: fit-content;
  position: fixed;
  top: 0%;
  width: 100%;
 z-index: 9999;
`
const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const currentProviderName = getCookie(KEYS.CURRENT_PROVIDER_NAME)
  const customerTheme = getDefaultTheme(store?.getState()?.app?.themeData?.setting?.color, store?.getState()?.app?.themeData?.setting?.typography)
  const router = useRouter()
  const magicStatusFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('magic status')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const status = localStorage.getItem('connectStatus')
    if (user) {
      store.dispatch(loginUser(user.accessToken))
      store.dispatch(updateUserDetails(user))
    }
    if(status){
      store.dispatch(updateConnection(status))
    }
  }, [])

  useEffect(() => {
    if (router.query['provider']) {
      if (magicStatusFromLocalStorage === 'loading') {
        store?.dispatch?.(setMagicLoader(true))
      }
    } else {
      if (typeof window !== 'undefined') {
        store?.dispatch?.(setMagicLoader(false))
        localStorage.removeItem('magic status')
      }
    }
  }, [router.query['provider'], store?.dispatch])

  const handleMetamaskNotConnected = async (Web3) => {
    const { metamaskNotInstalled, walletFirstTimeInit } = Web3
    if (walletFirstTimeInit) {
      if (metamaskNotInstalled) {
        ModalService.open((modalProps: any) => <MetamaskNotFoundModal title="Metamask Not Installed" desc="Please install metamask" close={modalProps.close} />, { closeIcon: false })
      }
    }
  }

  const handleSignMessage = async (Web3) => {
    const { magicData, web3, switchNetwork, walletFirstTimeInit, setWalletFirstTimeInit, currentProviderName: cpName } = Web3

    if (walletFirstTimeInit)
      try {
        let userData

        let isNetworkSwitched = await switchNetwork?.(APP_ENV.NETWORK_ID)
        if (isNetworkSwitched || cpName === 'google' || cpName === 'facebook' || cpName === 'email') {
          const account = await web3.eth.getAccounts()
          const signature = await web3.eth.personal.sign(APP_ENV.SIGN_MESSAGE, account[0], '')
          if (cpName === 'google' || cpName === 'facebook' || cpName === 'email') userData = await magicData.user.getMetadata()
          const param = {
            walletAddress: account[0],
            signature: signature,
            email: getCookie(KEYS.CUSTOMER_USER)?.email,
          }
          
          store?.dispatch?.(connectWallet(param)).then(function ({ payload }: any) {
            if (payload) {
              if(payload?.error){
                ModalService.open((modalProps: any) => <ErrorModal title="Wrong Link" desc={'Kindly link the wallet that was previously connected' || payload?.error?.message || "Failed to connect to metamask"} buttonText={`Connect Now`} close={modalProps.close} />, { closeIcon: false })
                return;
              }
              // <Modal isShow={true} img="/svgs/congrats.svg" title="Congratulations" content="Your wallet is connected successfully!" btnText="Continue" onClose={() => router.push("/")}  />
              // const { data } = payload
              // setCookie(KEYS.CUSTOMER_TOKEN, data?.accessToken)
              // setCookie(KEYS.CURRENT_PROVIDER_NAME, cpName)
              // if (data?.firstName == null || data?.lastName == null || data?.userName == null || data?.description == null) {
              //   router.push('/base/profile/settings')
              // }
              // if (currentProviderName !== 'metaMask') store?.dispatch?.(setMagicLoader(false))
              localStorage.setItem("connectStatus","metamask")
              store?.dispatch?.(updateConnection("metamask"))
              ModalService.open((modalProps: any) => <SuccessModal title='Successfully connected to wallet' desc={`Wallet address ${account[0]}. Cloud server configuration takes 1-5 minutes, please wait.`} close={modalProps.close} buttonText="Go to wallet" />, { closeIcon: false })
            } else {
              // store?.dispatch?.(setMagicLoader(false))
              ModalService.open((modalProps: any) => <ErrorModal title="Login Failed" desc="Failed to connect to metamask" close={modalProps.close} />, { closeIcon: false })
            }
          })
        } else {
          ModalService.open((modalProps: any) => <ErrorModal title="Network Switch Failed" desc={`${APP_ENV.NETWORK_NAME} network required`} close={modalProps.close} />, { closeIcon: false })
        }
        setWalletFirstTimeInit(false)
      } catch (error) {
        console.log(error)
        store?.dispatch?.(setMagicLoader(false))
        const msg = error?.message.split(':')
        ModalService.open((modalProps: any) => <ErrorModal title={'User rejected signature.' || msg[1]} desc="Please sign in to connect to the network." close={modalProps.close} buttonText="ok" />, { closeIcon: false })
      }
  }

  const loginPages = [
    '/base/signin', '/base/signup', '/base/forgotpassword', '/reset-password', '/timeOut', '/linkExpired', 
    '/verify-email', '/coming-soon', '/base/passwordUpdate',
  ]

  useEffect(() => {
    if(!loginPages.includes(router?.pathname)) {
      setCookie('redirect', router?.asPath)
    } else {
      // console.log('dont store value here')
    }
    if (getCookie('CUSTOMER_USER') && loginPages.indexOf(router?.pathname) !== -1) {
      router.push('/')
    }
    if(!router.asPath.includes('auction')) {
      removeCookie('auctionRedirect')
      removeCookie('myAuctionRedirect')
    }
    if(loginPages.includes(router?.pathname) && localStorage.getItem('user')) {
      router.push('/')
    }
    // console.log('router', router, localStorage.getItem('user'))
  },[router])

  if (Component.getLayout) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={customerTheme}>
          <GlobalStyle />
          {Component.getLayout(<Component {...props.pageProps} />)}
        </ThemeProvider>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={customerTheme}>
        <Web3ContextProvider handleMetamaskNotConnected={handleMetamaskNotConnected} handleSignMessage={handleSignMessage} activeProvider={currentProviderName} infuraId={APP_ENV.INFURA_ID}>
          <HederaContextProvider activeProvider={currentProviderName} infuraId={APP_ENV.INFURA_ID}>
            <GlobalStyle />
            <ModalRoot />
            <CustomerLayout noContainer={true}>
              <Meta />
              <Component {...props.pageProps} />
            </CustomerLayout>
          </HederaContextProvider>
        </Web3ContextProvider>
      </ThemeProvider>
      <ToasterBox> 
        <ToastContainer limit={1}/>
      </ToasterBox>
    </Provider>
  )
}
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  await initialize(ctx, store)

  // for browser, window object will be present
  if (typeof window === 'undefined') {
    // await store.dispatch(getThemeDetails())
    // await store.dispatch(getConfig())
    // await store.dispatch(getPreferenceDetails())
  }

  const accessToken = store.getState().auth?.accessToken
  // console.log('getInitialProps', isAuthenticated, userType)
  const { res, pathname } = ctx

  // const PUBLIC_ROUTES = ['/', '/admin/auth/login', '/admin/auth/forgot-password', '/admin/auth/verification']
  const LOGIN_PAGES = [
    '/base/signin', '/base/signup', '/base/forgotpassword', '/reset-password', '/timeOut', '/linkExpired', 
    '/verify-email', '/coming-soon', '/base/passwordUpdate',
  ]
  // pages which user can view only after login
  const CUSTOMER_PROTECTED_ROUTES = ['/base/profile', '/base/profile/settings', '/base/wallet', '/base/earnings', '/base/myCollection', '/base/myCollection/collectionFormCustomer', '/base/creator', '/base/resellArtwork']

  const commonRedirect = (redirect: any) => {
    if (typeof window === 'undefined') {
      res?.writeHead(302, { Location: redirect })
      res?.end()
    } else {
      Router.push(redirect)
    }
  }
  if (accessToken && LOGIN_PAGES.indexOf(pathname) !== -1) {
    commonRedirect('/')
  }
  if (!accessToken && CUSTOMER_PROTECTED_ROUTES.indexOf(pathname) !== -1) {
    commonRedirect('/')
  }

  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps({
            ...ctx,
            store,
          })
        : {}),
    },
  }
})
export default MyApp
