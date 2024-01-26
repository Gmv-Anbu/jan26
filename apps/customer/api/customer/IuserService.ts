export interface IGetFavoriteAssetList {
  page: number;
  items: number;
  cursor?: any;
}
export interface IHandlefavourite {
  userId: number;
  editionId: string | Array<string>;
}
export interface IHandlePlaceBid{
    auctionId:number,
    price:number
}
export interface IGetPrimarySaleEarnings{
    page:number,
    items:number,
    filter?:{
        type:string,
        orderBy:"desc"|"asc",
        sortBy:"createdAt"
    }
}
export interface ICancelResaleAsset {
  tokenId: string;
  saleType: 'FIXED_PRICE' | 'AUCTION';
}

//===Test===
export interface ITestHedera {
  accountId: any;
}
export interface IGetOnsaleAssetList {
  page: number;
  items: number;
  userId?: number;
}
export interface IGetPurchasedNFTById {
  userId: string;
  page: number;
  items: number;
  cursor?: string;
}
export interface IGetCreatedNFTById {
  userId: string;
  page: number;
  items: number;
}
export interface IGetPurchasedListForSale {
  tokenId: string;
  saleType?: 'FIXED_PRICE' | 'AUCTION' | string;
  basePrice: number;
  resalePrice: number;
}
