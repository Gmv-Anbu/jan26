import React, { useEffect } from 'react'
import { useWeb3 } from './useWeb3'
import { IUseWeb3 } from './useWeb3.model'
import { Web3ContextProviderPros } from './web3Context.model'

export const Web3Context = React.createContext<IUseWeb3>({ web3: null } as IUseWeb3)

export const Web3ContextProvider = ({ children, activeProvider, infuraId, handleSignMessage, handleMetamaskNotConnected }: Web3ContextProviderPros) => {
  const web3 = useWeb3(activeProvider, infuraId)
  useEffect(() => {
    if (web3?.web3) handleSignMessage?.(web3)
  }, [web3?.web3])

  useEffect(() => {
    if (web3?.metamaskNotInstalled) {
      console.log(web3.metamaskNotInstalled);
      handleMetamaskNotConnected?.(web3)
    }
  }, [web3?.metamaskNotInstalled])

  return <Web3Context.Provider value={{ ...web3 }}>{children}</Web3Context.Provider>
}

export const useWeb3Context = () => React.useContext(Web3Context)
