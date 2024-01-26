import Web3 from 'web3'
export interface IUseWeb3 {
  metamaskNotInstalled: boolean
  magicData: any
  web3: Web3 | null | any
  switchWeb3: (type: string, notAvailableAction?: boolean, email?: string) => Promise<void>
  disconnectWallet: (type: string) => Promise<void>
  currentProviderName: string | null
  accountInfo: IAccountDetails
  switchNetwork: (networkId: number | string) => Promise<boolean | any>
  walletFirstTimeInit: boolean
  setWalletFirstTimeInit: (b: boolean) => void
}
export interface IAccountDetails {
  accounts: Array<string>
  activeAccount: string | undefined
  balance: number | string
  chainId: number | string
}
