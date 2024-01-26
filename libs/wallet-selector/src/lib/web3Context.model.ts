export interface Web3ContextProviderPros {
  children: React.ReactNode
  activeProvider?: string
  infuraId?: string
  handleSignMessage?: (param: any) => any
  handleMetamaskNotConnected?: (param) => any
}
