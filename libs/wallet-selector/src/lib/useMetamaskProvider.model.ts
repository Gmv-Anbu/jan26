import { provider as TypeProvider } from 'web3-core';

export interface IuseMetamaskProvider {
    connectMetamaskProvider: (installMetaMask?: boolean) => Promise<TypeProvider>,
    provider: TypeProvider | null | any,
    chainId: number|null
}
export interface IConnectInfo {
    chainId: string;
}
export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}