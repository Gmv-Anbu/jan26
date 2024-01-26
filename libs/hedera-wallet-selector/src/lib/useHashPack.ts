import { useState, useCallback, useEffect } from 'react'
import { HashConnect } from '../../../../node_modules/hashconnect/dist/hashconnect'
import { HashConnectTypes, MessageTypes } from 'hashconnect'
import { IUseWebHedera } from './useWeb3.model'
import { TransferTransaction, TokenAssociateTransaction } from '@hashgraph/sdk'

const appData: HashConnectTypes.AppMetadata = {
  name: 'Hedera NFT 2.0',
  description: 'NFT MarketPlace',
  icon: 'https://cdn-icons-png.flaticon.com/512/6001/6001402.png',
}

const env = 'testnet'

interface IaccountInfo {
  balance: number
}

// const hashConnect = new HashConnect();

const useHashPack = () => {
  const [pairingData, setPairingData] = useState<any>({})
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [hederaAccountInfo, setHederaAccountInfo] = useState<IaccountInfo>({
    balance: 0,
  })
  const [hederaInstance, setHederaInstance] = useState<any>(null)
  const [refreshEvents, setRefreshEvents] = useState<boolean>(false)

  const getConnectInstance = useCallback(() => {
    return new HashConnect(true)
  }, [])

  //Intializing HashPack wallet connect for first time
  const initHashConnect = useCallback(async () => {
    console.log('=== 1 Initialized Hashconnect usecallback')
    setConnectionStatus('initated')
    const initedHashconnect = await getConnectInstance()
    const initData = await initedHashconnect.init(appData, env, false)
    setRefreshEvents(!refreshEvents)
    console.log('=== 2 Data after intialization', initData)
    const { pairingString } = initData

    initedHashconnect.foundExtensionEvent.once((walletMetadata) => {
      setRefreshEvents(!refreshEvents)
      console.log('Wallet metadata', walletMetadata)
      // @ts-ignore
      initedHashconnect.connectToLocalWallet(pairingString, walletMetadata)

      //do something with metadata);
    })

    //Pairing Event

    //The pairing event is triggered when a user accepts a pairing. You can access the currently connected pairings from hashconnect.hcData.savedPairings.
    initedHashconnect.pairingEvent.once(async (pairingData) => {
      setRefreshEvents(!refreshEvents)
      setPairingData(pairingData)

      console.log('Paired ....  pairing Data', pairingData)
      setHederaInstance(initedHashconnect)
      // requestAccountInfo(pairingData, initedHashconnect)
      setConnectionStatus('hashPackConnected')
      //Fetch Hashpack account balance
      try {
        const provider = await initedHashconnect?.getProvider(pairingData?.network, pairingData?.topic, pairingData?.accountIds[0])
        const balance = await provider.getAccountBalance(pairingData?.accountIds[0])
        setHederaAccountInfo({
          ...hederaAccountInfo,
          balance: balance?.hbars?._valueInTinybar?.c?.[0] / 100000000,
        })
      } catch (error) {
        console.log('error while fetching hashpack balance')
      }
      if (pairingData) {
        setConnectionStatus('connected')
      }
    })

    initedHashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
      console.log('>>> hedera Acknoogment change event', connectionStatus)
      //do something with acknowledge response data
    })

    initedHashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
      //do something with connection status

      console.log('>>> hedera Connection status change event', connectionStatus)
    })

    return { initedHashconnect, pairingData }
  }, [])

  enum HashConnectConnectionState {
    Connected = 'Connected',
    Disconnected = 'Disconnected',
  }

  const onFoundExtension = (data: HashConnectTypes.WalletMetadata) => {
    console.log('>>> Found extension', data)
    // setState((exState) => ({ ...exState, availableExtension: data }));
  }

  const onParingEvent = (data: MessageTypes.ApprovePairing) => {
    console.log('>>> Paired with wallet', data)
    // setState((exState) => ({ ...exState, pairingData: data.pairingData }));
  }

  const onConnectionChange = (state: HashConnectConnectionState) => {
    console.log('>>> hashconnect state change event', state)
    // setState((exState) => ({ ...exState, state }));
  }

  //register events
  useEffect(() => {
    if (hederaInstance) {
      hederaInstance.foundExtensionEvent.on(onFoundExtension)
      hederaInstance.pairingEvent.on(onParingEvent)
      hederaInstance.connectionStatusChangeEvent.on(onConnectionChange)
      hederaInstance.acknowledgeMessageEvent.once((acknowledgeData) => {
        console.log('>>>> hedera Acknoogment change event', connectionStatus, acknowledgeData)
        //do something with acknowledge response data
      })
      hederaInstance.foundExtensionEvent.once((acknowledgeData) => {
        console.log('>>>> hedera foundExtension change event', connectionStatus, acknowledgeData)
        //do something with acknowledge response data
      })
      hederaInstance.transactionEvent.once((acknowledgeData) => {
        console.log('>>>> hedera transaction change event', connectionStatus, acknowledgeData)
        //do something with acknowledge response data
      })
  
     
    }
    return () => {
      if (hederaInstance) {
        hederaInstance.foundExtensionEvent.off(onFoundExtension)
        hederaInstance.pairingEvent.on(onParingEvent)
        hederaInstance.connectionStatusChangeEvent.off(onConnectionChange)
      }
    }
  }, [hederaInstance, refreshEvents])

  // New codes

  // Disconnection wallet.

  const disconnectHederaWallet = async () => {
    const { pairingData: { topic = null } = {} } = pairingData
    console.log('=*= Disconnect method ', topic, hederaInstance, hederaInstance?.disconnect)
    try {
      const disconnect = await hederaInstance?.disconnect(topic)
      setPairingData('')
      setConnectionStatus('disconnected')
      setHederaAccountInfo({ balance: 0 })
      setHederaInstance(null)
      console.log('=*= disconnected', disconnect)
      setRefreshEvents(!refreshEvents)
    } catch (error) {
      console.log('=*= Error while disconnecting wallet')
      setRefreshEvents(!refreshEvents)
    }
  }

  // const requestAccountInfo = async (pairingData, initedHashconnect) => {
  //   const { pairingData: { network = null, topic = null, accountIds = null } = {} } = pairingData
  //   const request: MessageTypes.AdditionalAccountRequest = {
  //     topic: topic,
  //     network: network,
  //     multiAccount: true,
  //   }

  //   const accountDetails = await initedHashconnect?.requestAdditionalAccounts(topic, request)
  //   console.log('>>> - Account Info', initedHashconnect, accountDetails)
  // }

  // Reinitiate connection
  const reInitiateConnection: IUseWebHedera['reInitiateConnection'] = useCallback(async () => {
    const foundData = localStorage.getItem('hashconnectData')
    const { pairingData } = JSON.parse(foundData)
    const { metadata } = pairingData[0]

    try {
      if (!hederaInstance && metadata) {
        const getHederaInstance = await getConnectInstance()
        // setHedera((state) => ({ ...state, initedHashconnect: getHederaInstance }));
        console.log('=== Reinitiated Pairiging Data 1', pairingData?.[0])
        const reintiatied = await getHederaInstance.init(metadata, env, false)
        console.log('=== Reinitiated Pairiging Data 2', getHederaInstance, reintiatied?.savedPairings?.[0])
        setHederaInstance(getHederaInstance)
        setPairingData({ pairingData: reintiatied?.savedPairings?.[0] })

        // Fetching account balance

        const provider = await getHederaInstance?.getProvider(reintiatied?.savedPairings?.[0]?.network, reintiatied?.savedPairings?.[0]?.topic, reintiatied?.savedPairings?.[0]?.accountIds[0])
        const balance = await provider.getAccountBalance(reintiatied?.savedPairings?.[0]?.accountIds[0])
        setHederaAccountInfo({
          ...hederaAccountInfo,
          balance: balance?.hbars?._valueInTinybar?.c?.[0] / 100000000,
        })
        setRefreshEvents(!refreshEvents)
      }
    } catch (error: any) {
      console.log('=== Error -- useHashPack -- Reinitiate connection ===', error)
      return null
    }
  }, [pairingData, hederaInstance])

  // Getting signer
  const getSigner: IUseWebHedera['getSigner'] = async () => {
    console.log('=== 55 d', pairingData)
    const { pairingData: { network = null, topic = null, accountIds = null } = {} } = pairingData
    try {
      console.log('=== 55', hederaInstance, network, topic, accountIds, pairingData)
      const provider = await hederaInstance?.getProvider(network, topic, accountIds?.[0])
      const signer = await hederaInstance?.getSigner(provider)
      return signer
    } catch (error: any) {
      console.log('=== Error -- useHashPack -- getSigner ===', error)
      return null
    }
  }

  // Sign and execute hedera Transaction using signer and return it's transaction receipt
  const signExecuteTransaction: IUseWebHedera['signExecuteTransaction'] = useCallback(
    async (from, to, amount) => {
      const signer: any = await getSigner()
      console.log('=== sign Excute 1 , signer', signer, amount, from, to)

      const { pairingData: { network = null, topic = null, accountIds = null } = {} } = pairingData
      try {
        console.log('=== 55', hederaInstance, network, topic, accountIds, pairingData)
        const trans = await new TransferTransaction().addHbarTransfer(from, -Number(amount)).addHbarTransfer(to, Number(amount)).freezeWithSigner(signer)

        console.log('=== 2 trans', trans)
        const transactionReceipt = await trans.executeWithSigner(signer)
        console.log('=== 3 result Excute', transactionReceipt)
        return transactionReceipt
      } catch (error: any) {
        console.log('=== Error -- useHashPack --sign excute Transaction ===', error)
        return null
      }
    },
    [pairingData]
  )

  // Sign and execute hedera Transaction using signer and return it's transaction receipt
  const executeTransaction: IUseWebHedera['executeTransaction'] = useCallback(
    async (txnInstance) => {
      const signer: any = await getSigner()
      console.log('=== sign Excute 1 , signer', signer, txnInstance)
      const { transaction } = txnInstance
      console.log('=== 2 useHackpack -- excuteTransaction ', transaction)
      try {
        const transactionRebuiltRaw = Buffer.from(transaction, 'base64')

        console.log('>>> 1  transactionRebuild -- useHackpack', transactionRebuiltRaw)

        const transactionRebuilt = TransferTransaction.fromBytes(transactionRebuiltRaw)

        console.log('>>> 2 transactionRebuilt1 -- useHackpack', transactionRebuilt)
        const transactionReceipt = await transactionRebuilt.executeWithSigner(signer)
        console.log('=== 3 result Excute', transactionReceipt)
        setRefreshEvents(!refreshEvents)
        return transactionReceipt
      } catch (error: any) {
        console.log('=== Error -- useHashPack -- excute Transaction ===', error)
        setRefreshEvents(!refreshEvents)
        return null
      }
    },
    [pairingData]
  )

  // Associate Token with wallet Id - In hedera we need to associate token to wallet id before doing transaction
  const associateTransaction: IUseWebHedera['associateTransaction'] = useCallback(
    async (data) => {
      const { tokenAddress, walletAddres } = data
      // const { pairingData: { network = null, topic = null, accountIds = null } = {} } = pairingData
      const signer: any = await getSigner()
      console.log('===1 sign Excute 1 , signer', signer)

      try {
        const associateReceiverTx = await new TokenAssociateTransaction().setAccountId(walletAddres).setTokenIds([tokenAddress]).freezeWithSigner(signer)

        console.log('=== 2 associateTx', associateReceiverTx)
        const associateReceiverTxSubmit = await associateReceiverTx.executeWithSigner(signer)
        console.log('=== 3 associateTx Excute', associateReceiverTxSubmit)
        return associateReceiverTxSubmit
        setRefreshEvents(!refreshEvents)
      } catch (error: any) {
        console.log('=== Error -- useHashPack --Associate Token Transaction ===', error)
        setRefreshEvents(!refreshEvents)
        return null
      }
    },
    [pairingData]
  )

  // Fetch account balance
  const getAccountBalanceHedera: IUseWebHedera['getAccountBalanceHedera'] = useCallback(async () => {
    const { pairingData: { network = null, topic = null, accountIds = null } = {} } = pairingData
    console.log('=== Error -- 1 -- useHashPack --getAccount BalanceHedera ===', network, topic, accountIds)
    try {
      const provider = await hederaInstance?.getProvider(network, topic, accountIds[0])
      console.log('=== Error -- 2 -- useHashPack --Provider ===', provider)
      let balance = await provider.getAccountBalance(accountIds[0])
      balance = balance?.hbars?._valueInTinybar?.c?.[0] / 100000000
      console.log('=== Error -- 3 -- useHashPack -- Balance ===', balance)
      return balance
    } catch (error: any) {
      console.log('=== Error -- useHashPack --Error while fetching balance ===', error)
      return null
    }
  }, [pairingData, hederaInstance])

  return {
    initHashConnect,
    pairingData,
    setPairingData,
    connectionStatus,
    setConnectionStatus,
    hederaAccountInfo,
    getConnectInstance,
    hederaInstance,
    disconnectHederaWallet,
    getSigner,
    signExecuteTransaction,
    reInitiateConnection,
    associateTransaction,
    executeTransaction,
    getAccountBalanceHedera,
  }
}

export default useHashPack
