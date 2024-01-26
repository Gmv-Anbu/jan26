import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { APP_ENV } from '@apps/customer/config'

// // Create client-side Magic instance
const createMagic = (key: string | undefined) => {
  return (
    typeof window != 'undefined' &&
    key &&
    new Magic(key, {
      extensions: [new OAuthExtension()],
      network: 'goerli',
    })
  )
}

export const magic = createMagic(APP_ENV?.MAGIC_API_KEY)
