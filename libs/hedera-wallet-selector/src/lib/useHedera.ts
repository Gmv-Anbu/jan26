import { useCallback, useState } from 'react'
import { providerNames } from './providerConfig'
import useHashPack from './useHashPack'
import { TransferTransaction } from '@hashgraph/sdk'

export const useHedera = (): any => {
  const {
    initHashConnect,
    hederaInstance,
    pairingData,
    setPairingData,
    connectionStatus,
    setConnectionStatus,
    hederaAccountInfo,
    getConnectInstance,
    getSigner,
    disconnectHederaWallet,
    signExecuteTransaction,
    associateTransaction,
    getAccountBalanceHedera,
    executeTransaction,
    reInitiateConnection,
  } = useHashPack()

  const [hedera, setHedera] = useState<any>(null)

  // Switching Hedera Wallet
  const switchHedera: any = useCallback(
    async (type, notAvailableAction = true) => {
      console.log('hash check >>> setting setHedera wrap', type)
      if (type == providerNames['hashPack'].id) {
        const hashConnect = await initHashConnect()
        console.log('hash check >>> setting setHedera', hashConnect)
        setHedera(hashConnect)
      } else {
        setHedera(null)
      }
    },
    [initHashConnect]
  )

  // reintiate hedera web socket connection
  // useEffect(() => {
  //   console.log('12111', hedera);
  //   if (!hedera) {
  //     reInitateConnection();
  //   }

  //   return () => {
  //     if (hedera) disconnectHedera();
  //   };
  // }, [hedera]);

  //Disconnect Wallet
  const disconnectHedera = async () => {
    console.log('1211 disconnected')
    try {
      const disconnect = hedera?.initedHashconnect?.disconnect(pairingData?.pairingData?.topic)
      setPairingData('')
      setConnectionStatus('disconnected')
      console.log('disconnected', disconnect)
    } catch (error) {
      console.log('Error while disconnecting wallet')
    }
  }

  const getSignerExcuteTransaction = async (from: string, to: string, amount: string) => {
    const { network, topic, accountIds } = pairingData
    try {
      // Getting provider
      const provider = await hedera?.initedHashconnect?.getProvider(network, topic, accountIds[0])

      console.log('=== 1 Inside excute === Provider', provider)

      //Getting signer
      const signer = await hedera?.initedHashconnect?.getSigner(provider)

      // await associateTransaction(signer);
      console.log('=== 2 Inside excute === signer', signer)
      // Getting transaction - Feed variables from, to address and amount from Backend api call.
      const trans = await new TransferTransaction().addHbarTransfer(from, -Number(amount)).addHbarTransfer(to, Number(amount)).freezeWithSigner(signer)

      console.log('=== 2 trans', trans)

      // This will trigger hashpack popup from extension and ask to transfer and will return transaction details object.
      const transactionReceipt = await trans.executeWithSigner(signer)

      console.log('=== 3 result Excute', transactionReceipt)

      return transactionReceipt
    } catch (error) {
      console.log('Error while Excuting', error)
      return null
    }
  }

  // Method to reintiate Hedera socket connect when page is hard reloaded/other. Then will update hedera and pairData
  const reInitateConnection = async () => {
    const foundData = localStorage.getItem('hashconnectData')
    const { encryptionKey, pairingData } = JSON.parse(foundData)
    const { accountIds, metadata } = pairingData[0]
    // const appData = {
    //   name: 'Hedera NFT 2.0',
    //   description: 'NFT MarketPlace',
    //   icon: 'https://cdn-icons-png.flaticon.com/512/6001/6001402.png',
    //   encryptionKey: encryptionKey,
    // };

    const getHederaInstance = await getConnectInstance()
    // setHedera((state) => ({ ...state, initedHashconnect: getHederaInstance }));
    console.log('ere 11', pairingData?.[0])
    const reintiatied = await getHederaInstance.init(metadata, 'testnet', false)
    console.log('ere reintiated details', reintiatied, reintiatied?.savedPairings?.[0])
    setHedera((state) => ({ ...state, initedHashconnect: getHederaInstance }))
    setPairingData(reintiatied?.savedPairings?.[0])
  }

  return {
    hedera,
    switchHedera,
    pairingData,
    getSigner,
    getSignerExcuteTransaction,
    disconnectHedera,
    connectionStatus,
    setConnectionStatus,
    hederaAccountInfo,
    associateTransaction,
    reInitateConnection,

    // accountInfo,
    // switchNetwork,
    hederaInstance,
    disconnectHederaWallet,
    signExecuteTransaction,
    getAccountBalanceHedera,
    executeTransaction,
    reInitiateConnection,
  }
}
