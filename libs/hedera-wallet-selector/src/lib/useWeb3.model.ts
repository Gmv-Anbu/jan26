import Web3 from 'web3'
export interface IUseWebHedera {
  hedera: Web3 | null
  switchHedera: (type: string, notAvailableAction?: boolean) => Promise<void>
  disconnectWallet: (type: string) => Promise<void>
  getSigner: () => Promise<void>
  signExecuteTransaction: (from: string, to: string, amount: number | any) => Promise<any>
  associateTransaction: (data: { tokenAddress: string; walletAddres: string }) => Promise<any>
  reInitiateConnection: () => Promise<any>
  executeTransaction: (txnInstance: { tokenId: string; transaction: any }) => Promise<any>
  getAccountBalanceHedera: () => Promise<any>
  //   currentProviderName: string | null;
  accountInfo: IAccountDetails
  //   switchNetwork: (networkId: number | string) => Promise<void>;
}
export interface IAccountDetails {
  accounts: Array<string>
  activeAccount: string | undefined
  balance: number | string
  chainId: number | string
}
