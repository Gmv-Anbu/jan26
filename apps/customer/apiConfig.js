import getConfig from 'next/config'
import { APP_ENV } from './config'

const {
  publicRuntimeConfig: { NEXT_PUBLIC_API_URL, S3_IMG_URL }, // Available both client and server side
} = getConfig()

const endpoints = {
  API_URL: NEXT_PUBLIC_API_URL,
  TRANSAK_API_URL: APP_ENV.TRANSAK_API_URL,
  S3_URL: S3_IMG_URL,
  ADMIN: {
    CURRENCY: '/currency',
    CATEGORY: '/category',
    ACTIVE_CATEGORY: '/category/dropdown',
    COLLECTION: '/collection',
    CONFIGURATIONS: '/app-config/user',
    ACTIVE_COLLECTION: 'collection/dropdown',
    IMAGE_UPLOAD: '/collection/bannerImage',
    ASSETS: {
      LIST: '/assets/all',
      GET_BY_ID: '/assets/edition',
      CREATE: '/assets/create',
      MAIN_UPLOAD: 'assets/mainAsset/upload',
      UPDATE: '/assets/update',
      DELETE: '/assets/remove',
      SUPPORT_IMAGE: '/assets/supportAsset/upload',
    },
  },
  CUSTOMER: {
    GET_PROFILE: '/getProfile',
    CONNECT_WALLET: '/user/connect/wallet',
    CATEGORY: '/category',
    IMAGE_UPLOAD: '/collection/bannerImage',
    VISITORS_COUNT: '/analytics/ip/register',
    COLLECTION: {
      URL: '/collection',
      GET_COLLECTION_ASSETS: '/collection/assets',
    },
    SELL: {
      IMG_UPLOAD: '/sell/media/upload',
      WATCH: '/sell'
    },
    DASHBOARD: {
      COUNTS: '/dashboard/counts',
      LATEST: '/assets/latest/asset',
      EVENT_TICKETS: '/event/tickets'
    },
    FAQs: '/faq',
    COMPANY: {
      ALL: '/company',
      UPLOAD: '/company/document/upload'
    },
    MY_AUCTION: {
      MY: '/auction/my',
      WON: 'auction/my/bids',
      LIVE: '/auction/my/live',
      PAST: '/auction/my/past'
    },
    RAPYD: {
      GET_STATUS: '/rapyd',
      VERIFY_CARD: '/rapyd/verify-card'
    },
    CART: {
      CART: '/cart',
      CLEAR_ALL: '/cart/all'
    },
    TRANSACTIONS: {
      LIST: '/accounting/user/get/transactions'
    }
  },
}
export default endpoints
