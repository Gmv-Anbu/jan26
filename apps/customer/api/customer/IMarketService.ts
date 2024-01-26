export interface IUpdateTransaction{
    txnId:string,
    txnHash?:string,
    status:"sent"|"confirmed"|"failed"
}
export interface IGlobalSearch{
    search:string
}
export interface IUpdateFiatAmount{
    currency: string,
    method: string,
    cryptoAmount: string | number
}