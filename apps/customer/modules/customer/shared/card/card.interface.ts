interface Ibidderdata {
  id: number
  firstName: string
  lastName: string
  userName: string
  role: string
  profilePicUrl: string
  walletAddress: string
  emailVerified: boolean
  isBlocked: boolean
  description: string
  socialLinks: any
  bannerImage: string
  isActive?: any
  is2Fa: boolean
  isScan: boolean
  secretKey?: any
  createdAt: Date
  updatedAt: Date
  deletedAt?: any
}
interface ICard {
  id: number
  editionId?: number
  NFT: string
  mediaType?: string
  image: string
  name: string
  isVerified: boolean
  userName: string
  creatorUserName?: string
  price: string
  convertedPrice: string
  time?: number
  blockBtn?: boolean
  btnLabel?: string
  mainBtnAction?: () => Promise<void>
  isFavorite?: boolean
  favoriteBtnAction?: () => void
  firstName?: string
  lastName?: string
  saleType?: string
  status?: string
  endTime?: string
  bidAmount?: string
  convertedbidAmount?: string
  auctionsData?: any
  cardClass?: string
  bidderData: Ibidderdata
  favoriteAction?: boolean
  startTime?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  getUpdatedNFTs?: Function;
  page?: string,
  creatorImage?: string,
  creatorName?: string,
  creatorVerified?: boolean,
  vidHeight?: string | number
  type?: string
}

export default ICard
