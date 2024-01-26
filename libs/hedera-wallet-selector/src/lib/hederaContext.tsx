import React, {useEffect} from 'react';
import {useHedera} from './useHedera';
// import { IUseHedera } from './useHedera.model';
// import { HederaContextProviderPros } from './web3Context.model';

export const HederaContext = React.createContext<any>({ hedera: null } as any);

export const HederaContextProvider = ({ children,activeProvider,infuraId}: any) => {
    useEffect(() => {
      console.log('1211 , Inside context provide usehedera' )
    }, [])
    
    const hedera = useHedera();
    return (
        <HederaContext.Provider value={{ ...hedera }}>
            {children}
        </HederaContext.Provider>
    )
}

export const useHederaContext = () => React.useContext(HederaContext);