import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import AddFundsModal from '../../modules/customer/shared/modal/addFunds'
import SuccessModal from '../../modules/customer/shared/modal/success'
import UserService from '../../api/customer/UserService'
import { useWeb3Context } from '@nft-marketplace/wallet-selector'
import Meta from '../../modules/shared/components/meta'
import { APP_ENV } from '../../config'
import { useHederaContext } from '@nft-marketplace/hedera-wallet-selector'
import Loader from '@apps/customer/modules/shared/components/Loader'

const WalletWrapper = styled.div`
  max-width: 50rem;
  width: 100%;
  padding: 6rem 0 16rem;
  margin: auto;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  .heading {
    font-size: 3rem;
    font-weight: 500;
    line-height: 6rem;
    color: #ffffff;
    white-space: nowrap;
  }
`
const WalletHeader = styled.div`
  text-align: center;
  left: 71.4rem;
  margin-bottom: 6rem;
  h2 {
    font-size: 4rem;
    font-weight: 500;
    line-height: 6rem;
    color: ${({ theme }) => theme.colors.white};
  }
  p {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.fontdark};
    max-width: 49.2rem;
    margin: 0 auto;
  }
`

const WalletType = styled.div`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.fontdark};
  padding-left: 7.7rem;
  @media screen and (max-width: 640px) {
    padding-left: 4rem;
  }
  span {
    width: 4.3rem;
    height: 4.3rem;
    background-color: ${({ theme }) => theme.colors.fontdark};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.8rem;
  }

  h3 {
    width: 10.5rem;
    height: 3rem;
    left: 85.8rem;
    top: 48rem;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 3rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.fontdark};
  }
`
const WalletAmountDetails = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-left: 7.81rem;
  margin-right: 7.81rem;
`

const WalletInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48rem;
  height: 33.2rem;
  left: 72rem;
  top: 36.7rem;
  margin-left: 3rem;
  background: ${({ theme }) => theme.colors.copyFromClipboardbg};
  backdrop-filter: blur(2.8rem);
  border-radius: 1rem;
  margin: 0 auto;
  @media screen and (max-width: 640px) {
    width: 100%;
    margin-left: 0;
    left: inherit;
    top: inherit;
  }
`

const CopyFromClipboard = styled.div`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.fontdark};
  gap: 1.5rem;
  span {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    max-width: 30rem;
    color: ${({ theme }) => theme.colors.clipboardSpan};
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 520px) {
      max-width: 24rem;
    }
  }
  a {
    cursor: pointer;
  }
`

const AddFundLink = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.colors.gradientBtnBG};
  width: 100%;
  height: 5.2rem;
  border-radius: 0rem 0rem 1rem 1rem;
  border: 0 none;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.fontprimary};
  @media (max-width: 640px) {
    width: 100%;
    border-radius: 0rem 0rem 0.7125rem 0.7125rem;
    border: 0 none;
  }
`

const WalletHeading = styled.div`
  height: 7.1rem;
  display: flex;
  justify-content: space-around;
  align-items: end;
  border-bottom: 1px solid #252f43;
  align-items: center;
`

interface IWalletBody {
  networkType: string
}

const WalletBody = styled.div<IWalletBody>`
  margin-bottom: ${(props) => (props.networkType == 'HEDERA' ? '84px' : '0')}; ;
`

const WalletFooter = styled.div`
  width: 48rem;
  height: 5.2rem;
  left: 72rem;
  top: 64.7rem;
  background: ${({ theme }) => theme.colors.gradientBtnBG};
  border-radius: 0rem 0rem 1rem 1rem;
  @media screen and (max-width: 640px) {
    width: 100%;
  }
`
const Text = styled.p`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.colorD2};
`
const WalletAmountWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  gap: 0.125rem;

  &.right {
    align-items: flex-end;
  }
`
const EthAmountTxt = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  color: ${({ theme }) => theme.colors.fontcolor};
`
const EthAmountLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.31rem;
  color: ${({ theme }) => theme.colors.clipboardSpan};
`
const UsdAmountLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 0.88rem;
  line-height: 1.31rem;
  color: ${({ theme }) => theme.colors.fontdark};
`
const UsdAmountTxt = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.colors.fontcolor};
`

const LoaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyWallet: NextPage = () => {
  const { accountInfo, web3 } = useWeb3Context()
  const { pairingData, getAccountBalanceHedera, hederaInstance } = useHederaContext()
  const [rate, setRate] = useState(null)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [error, setError] = useState(null)
  const [balance, setBalance] = useState<number>()
  const getExchange = () => {
    UserService.getExchangeRate().then((res) => {
      if (res?.data) {
        setRate(res?.data?.data)
      }
    })
  }

  useEffect(() => {
    const getWalletBalance = async () => {
      if (APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' && hederaInstance) {
        const { pairingData: { network = null, topic = null, accountIds = null } = {} } = pairingData
        try {
          const provider = await hederaInstance?.getProvider(network, topic, accountIds[0])
          let balance = await provider.getAccountBalance(accountIds[0])
          balance = balance?.hbars?._valueInTinybar?.c?.[0] / 100000000
          setBalance(balance)
        } catch (error) {
          console.log('error while fetching hashpack balance', error)
        }
      } else if (APP_ENV.NEXT_PUBLIC_NETWORK_TYPE != 'HEDERA' && web3) {
        try {
          setShowLoader(true)
          const account = await web3.eth.getAccounts()
          web3.eth.getBalance(account[0]).then(async (data) => {
            if (data) {
              const temp = await web3.utils.fromWei(data, 'ether')
              setBalance(Number.parseFloat(temp))
              setShowLoader(false)
              setError(null)
              // getUSDPrice()
            }
          })
        } catch (error) {
          console.log('error while fetching  balance', error)
          setShowLoader(false)
          setError(error)
        }
      }
    }
    getWalletBalance()
  }, [hederaInstance, web3])

  useEffect(() => {
    getExchange()
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const CopyTextToClipboard = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? pairingData?.pairingData?.accountIds?.[0] : accountInfo?.activeAccount)
      setCopied(true)
    }
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    setCopied(false)
  }

  return (
    <>
      <Meta />
      <WalletWrapper>
        <WalletHeader>
          <h2>My Wallet</h2>
          <p>See your wallet details here{APP_ENV.NETWORK_TYPE != 'HEDERA' && ' and add funds to your wallet for success transactions'}</p>
        </WalletHeader>
        {showLoader === true ? (
          <LoaderSection>
            <Loader />
          </LoaderSection>
        ) : balance || balance === 0 ? (
          <>
            <WalletInnerWrapper>
              <WalletHeading>
                <Text>My Wallet</Text>
                <CopyFromClipboard>
                  <span>{APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? pairingData?.pairingData?.accountIds?.[0] : accountInfo?.activeAccount}</span>
                  <a title="Copy To Clipboard" onClick={CopyTextToClipboard} className="">
                    <Image src={'/svgs/copy-to-clipboard.svg'} alt={`copy-to-clipboard`} width="20" height="20" />
                  </a>
                </CopyFromClipboard>
              </WalletHeading>
              <WalletBody networkType={APP_ENV.NETWORK_TYPE}>
                <WalletType>
                  <span className="wallet-img">
                    <Image src={`/svgs/ethereum.svg`} alt={`eth`} width="30" height="30" />
                  </span>
                  <h3>{APP_ENV?.BASE_CRYPTO_CURRENCY} Wallet</h3>
                </WalletType>
                <WalletAmountDetails>
                  <WalletAmountWrapper>
                    <EthAmountTxt>{balance?.toFixed(4) || ''}</EthAmountTxt>
                    <EthAmountLabel>{APP_ENV?.BASE_CRYPTO_CURRENCY} balance</EthAmountLabel>
                  </WalletAmountWrapper>
                  <WalletAmountWrapper className="right">
                    {APP_ENV?.BASE_CRYPTO_CURRENCY == 'HBAR' ? (
                      <UsdAmountTxt>
                      {
                        isNaN(balance * parseFloat(rate?.HBAR?.USD))
                        ? "0.00 $"
                        : `${(balance * parseFloat(rate?.HBAR?.USD)).toFixed(4)} $`
                      }
                    </UsdAmountTxt>
                    
                    ) : (
                      <UsdAmountTxt>
                      {
                        isNaN(balance * parseFloat(rate?.ETH?.USD))
                        ? "0.00 $"
                        : `${(balance * parseFloat(rate?.ETH?.USD)).toFixed(4)} $`
                      }
                    </UsdAmountTxt>
                    
                    )}
                    <UsdAmountLabel>USD</UsdAmountLabel>
                  </WalletAmountWrapper>
                </WalletAmountDetails>
              </WalletBody>
              {APP_ENV.NEXT_PUBLIC_NETWORK_TYPE !== 'HEDERA' && (
                <WalletFooter>
                  <AddFundLink onClick={openModal}>Add fund to wallet</AddFundLink>
                </WalletFooter>
              )}
            </WalletInnerWrapper>
          </>
        ) : (
          error &&
          <p className="heading">Currently unable to fetch details...</p>
        )}
      </WalletWrapper>
      <AddFundsModal show={showModal} closeModal={closeModal} />
      {copied && <SuccessModal show={copied} closeModal={closeModal} title={'Address is Successfully Copied to Clipboard'} />}
    </>
  )
}

export default MyWallet
