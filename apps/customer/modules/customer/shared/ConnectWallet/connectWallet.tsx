import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../../redux/store'
import { ButtonGradientOutlined } from '../../../shared/components/button/button'
import useAuthConnect from './useAuthConnect'

interface ConnectWalletInterface<T = React.ReactNode> {
  type?: string
  data?: string
  width?: string
  height?: string
  setMenuOpen?: (b: boolean) => void
}

const WalletPopupContainer = styled.div`
  position: fixed;
  width: 25vw;
  min-height: 20rem;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: none;
  &.active {
    display: block;
  }
`

const ConnectWallet: React.FC<ConnectWalletInterface> = ({ type, data, width, height, setMenuOpen }): JSX.Element => {
  const isAuthenticated = useSelector<RootState, any>((state) => state?.auth?.accessToken)
  const { connectToWallet } = useAuthConnect()

  return (
    <div>
      {!isAuthenticated && (
        <ButtonGradientOutlined
          onClick={() => {
            setMenuOpen(false)
            connectToWallet()
          }}
          fs="1.4"
          size="sm"
        >
          Connect Wallet
        </ButtonGradientOutlined>
      )}
      {/* <HederaWalletSelector /> */}
    </div>
  )
}

export default ConnectWallet
