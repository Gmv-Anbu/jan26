import WalletConnectProvider from "@walletconnect/web3-provider";
export interface IuseWalletConnectProvider{
    connected:boolean,
    provider:WalletConnectProvider | null | any,
    connectWallet:()=>Promise<IuseWalletConnectProvider['provider']>
}