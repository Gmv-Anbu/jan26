export interface IPurchaseCardData {
  id: string | number
  profilePic: string
  assetImg: string
  userName: string
  name: string
  price: string | number
  collectedOn?: string
  mediaType?: string
}
export interface IPurchasedNFTCard {
    data: IPurchaseCardData,
    primaryBtnLabel?: string,
    primaryBtnAction?: (e) => void,
    showPrimaryBtn?: boolean,
    editBtnAction?: (e) => void,
    showEditButton?: boolean,
    deleteBtnAction?:(e)=>void,
    onClick?: () => void,
    mediaType?: string
}
