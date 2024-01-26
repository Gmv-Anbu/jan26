import { useCallback, useEffect, useState } from 'react'
import { magic } from '../lib/magic'
import { useRouter } from 'next/router'
import { WalletService } from './WalletService'
import { magicLinkEmailProvider } from './providerConfig'

import { getCookie } from '../../../js-cookie/src/index'
import { KEYS } from '../../../../apps/customer/utils/storage'

const useMagicLink = () => {
  const router = useRouter()
  const [emailVerified, setEmailVerified] = useState(false)

  const handleLoginWithEmail = useCallback(async (email: string) => {
    if (magic) {
      const currentProviderName = getCookie(KEYS.CURRENT_PROVIDER_NAME)

      const isLoggedIn = await magic.user.isLoggedIn()
      if (isLoggedIn && !currentProviderName) {
        handleLogout()
        localStorage.setItem('magic status', 'initiated')
        try {
          await magic.auth.loginWithEmailOTP({
            email,
          })
          setEmailVerified(true)
        } catch (error) {
          console.log(error)
        }
      } else if (isLoggedIn && currentProviderName) {
        let provider
        const { rpcProvider } = magic
        provider = rpcProvider
        WalletService.dispatch('providerChanged', { provider, providerName: 'email', firstTimeLoggedIn: false })
      } else {
        localStorage.setItem('magic status', 'initiated')
        try {
          await magic.auth.loginWithEmailOTP({
            email,
          })
          setEmailVerified(true)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [])

  const handleLoginWithSocial = useCallback(async (providerName: any) => {
    try {
      if (magic) {
        const isLoggedIn = await magic.user.isLoggedIn()
        const currentProviderName = getCookie(KEYS.CURRENT_PROVIDER_NAME)
        console.log(isLoggedIn)
        if (isLoggedIn && !currentProviderName) {
          handleLogout()
          localStorage.setItem('magic status', 'loading')
          await magic.oauth.loginWithRedirect({
            provider: providerName,
            redirectURI: new URL('/', window.location.origin).href,
          })
        } else if (isLoggedIn && currentProviderName) {
          let provider
          const { rpcProvider } = magic
          provider = rpcProvider
          WalletService.dispatch('providerChanged', { provider, providerName, firstTimeLoggedIn: false })
        } else {
          localStorage.setItem('magic status', 'loading')
          await magic.oauth.loginWithRedirect({
            provider: providerName,
            redirectURI: new URL('/', window.location.origin).href,
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleLogout = useCallback(async () => {
    console.log('magic logged out instance')

    try {
      if (magic) {
        localStorage.removeItem('magic status')
        console.log('logged out magic')
        await magic.user.logout()
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getData = useCallback(async () => {
    try {
      if (magic) {
        const response: any = await magic.oauth.getRedirectResult()
        localStorage.setItem('magic status', 'completed')
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const completeMagicLink = useCallback(async () => {
    localStorage.setItem('magic status', 'loading')
    try {
      if (magic) {
        const isLoggedIn = await magic.user.isLoggedIn()
        if (isLoggedIn) {
          const user = await magic.user.getMetadata()
          console.log(user)
          localStorage.setItem('magic status', 'completed')
          return user
        }
      }
    } catch (err) {
      console.log(err)
      return err
    }
  }, [])

  useEffect(() => {
    const makeProvider = async () => {
      let data = await getData()
      let providerName = data?.oauth.provider
      let provider
      if (magic) {
        const { rpcProvider } = magic
        provider = rpcProvider
      }
      WalletService.dispatch('providerChanged', { provider: provider, providerName, firstTimeLoggedIn: true })
    }
    if (router.query['provider']) {
      localStorage.setItem('magic status', 'loading')
      makeProvider()
    }
  }, [getData, router.query['provider']])

  useEffect(() => {
    let provider
    if (magic) {
      const { rpcProvider } = magic
      provider = rpcProvider
    }
    const makeEmailProvider = async () => {
      await completeMagicLink()
      WalletService.dispatch('providerChanged', { provider, providerName: magicLinkEmailProvider['email'].id, firstTimeLoggedIn: true })
    }
    if (emailVerified) makeEmailProvider()
  }, [completeMagicLink, emailVerified])

  return {
    handleLoginWithEmail,
    handleLoginWithSocial,
    getData,
    completeMagicLink,
    handleLogout,
  }
}
export default useMagicLink
