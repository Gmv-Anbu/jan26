import getConfig from 'next/config'

const {
  publicRuntimeConfig: { NEXT_PUBLIC_API_URL, S3_IMG_URL }, // Available both client and server side
} = getConfig()

const endpoints = {
  API_URL: NEXT_PUBLIC_API_URL,
  S3_URL: S3_IMG_URL,
  ADMIN: {
    AUTH: {
      LOGIN: '/admin/login',
      FORGOT_PASSOWRD: '/admin/forgotPassword',
      CHANGE_PASSWORD: '/admin/changePassword',
    },
    CONFIG: '/app-config/admin',
    CURRENCY: '/currency',
    CATEGORY: '/category',
    SUBCATEGORY: '/category/sub-categories',
    SUBCATEGORY_ALL: '/category/sub-categories/all',
    ADDSUBCATEGORY: '/category/sub-category',
    COLLECTION: '/collection',
    ACTIVE_CATEGORY: '/category/dropdown',
    ACTIVE_COLLECTION: 'collection/dropdown',
    IMAGE_UPLOAD: '/collection/bannerImage',
    CATEGORY_IMG_UPLOAD: '/category/image',
    ASSETS: {
      LIST: '/assets/all',
      GET_BY_ID: '/assets',
      CREATE: '/assets/create',
      MAIN_UPLOAD: 'assets/mainAsset/upload',
      UPDATE: '/assets/update',
      DELETE: '/assets/remove',
      SUPPORT_IMAGE: '/assets/supportAsset/upload',
      BULK_UPLOAD:'/assets/bulk-upload',
      AUCTION_PDF: '/assets/auction/pdf',
      SALE:'/assets/status'
    },
    AUCTION_REG: {
      LIST: '/auction/registration/admin',
      UPDATE: '/auction/registration',
      EXPORT_CSV: '/auction/registration/admin/csv',
    },
    BID_MANAGEMENT: {
      AUCTION_LIST: '/admin/auction',
      EXPORT_CSV: 'auction/bids/csv'
    },
    COMPANY: {
      LIST: '/company/admin',
      UPDATE: '/company/:companyId/admin'
    },
    SELL: '/sell/admin',
    FAQ:{
      GET:'/faq',
      ADD:'/faq',
      UPDATE:'/faq'
    },
    EVENTS: {
      CRUD: '/event',
    },
    EVENT_REQUEST:{
      GET:'/event/submission',
      APPROVE:'/event/submission',
      REJECT:'/event/submission'
    }, 
    MY_TRANSFERS:{
      GET:'/admin/nftTransfers'
    },
    DASHBOARD: {
      GET_WIDGET_INFO: '/dashboard',
      GET_REVENUE_GRAPH: '/dashboard/charts/transactions',
      GET_PURCHASE_GRAPH: '/dashboard/charts/transaction-count',
      GET_VISITORS_GRAPH: '/analytics/charts/visitors',
      GET_USERS_GRAPH: '/dashboard/charts/users',
    },
    USERS: {
      CREATE: '/admin/create/user',
      GET_LIST: '/user',
      TRANSFER_NFT:'/admin/user/transferNft',
      UPDATE_USER_ROLE: '/creator/admin',
      BULK_UPDATE_USER_ROLE: '/creator/admin/bulkupdate',
      BLOCK_USER: '/admin/user/block',
      BULK_BLOCK_USER: '/admin/user/block/bulk',
      UNBLOCK_USER: 'admin/user/unblock',
      BULK_UNBLOCK_USER: '/admin/user/unblock/bulk',
      EXPORT_CSV: '/admin/user/csv',
      WHITELIST: '/admin/user/whitelist',
      WHITELIST_BULK: '/admin/user/whitelist/bulk',
      WHITELIST_REMOVE: '/admin/user/removeWhitelist'
    },
    SUB_ADMIN: {
      BLOCK_USER: '/admin/user/block',
      UNBLOCK_USER: '/admin/user/unblock',
    },
    CREATOR_MANAGEMENT: {
      GET_CREATOR_LIST: '/creator',
      GET_CREATOR_REQUESTS: '/creator/admin/requests',
      UPDATE_STATUS: '/creator/admin/response',
    },
    NEWSLETTER_SUBSCRIBERS: {
      GET_SUBSCRIBERS_LIST: '/subscriber',
      EXPORT_CSV: '/subscriber/export',
    },
    THEME: {
      GET_THEME: '/theme',
      UPDATE_THEME: '/theme',
      UPLOAD: '/theme/image',
    },
    ACCOUNTING: {
      // old - not in use
      GET_ACCOUNTING_WIDGET_INFO: '/accounting/stats',
      GET_TRANSACTION_TABLE_DATA: '/order/transactions/all',
      GET_COMMISSIONS: '/accounting/platform-fee',
      UPDATE_COMMISSIONS: '/accounting/update-platform-fee',
      // new
      CARDS_COUNTS: '/accounting/transactions/dashboard',
      REVENUE_CHART: '/accounting/transactions/chart',
      TRANSACTIONS: '/accounting/get/transactions'
    },
    NAVIGATION: {
      GET_MENU: '/menu',
      CREATE_UPDATE_DELETE_MENU: '/menu',
    },
    PAGE: {
      ADD_PAGE: '/page',
      GET_ALL_PAGES: '/page',
      UPDATE_PAGE: '/page/update',
      DELETE_PAGE: '/page',
    },
    PREFERANCE: {
      GET_PREFERANCES: '/preferance',
      UPDATE_PREFERANCES: '/preferance',
    },
    ARCHIVE_OFFERS: '/offer/admin'
  },
}
export default endpoints
