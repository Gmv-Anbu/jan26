import { useState } from 'react'

import { RootState } from '@apps/customer/redux/store'

import { useSelector } from 'react-redux'
import Image from 'next/image'
import styled from 'styled-components'
import { providerNames, magicLinkProviderNames } from '@nft-marketplace/wallet-selector'
import { InputField, InputPath } from 'libs/table/src/lib/tableStyles'
import { ButtonGradientPrimary } from '@apps/customer/modules/shared/components/button/button'

interface WalletConnectModalProps {
  onSelect: (id: string) => void
  handleEmailSubmit: (id: string, email: string) => void
}

const WalletConnectModal = ({ onSelect, handleEmailSubmit }: WalletConnectModalProps) => {
  const userConfig = useSelector<RootState, any>((state) => state?.userData?.userConfig)

  const [connectMagicLink, setConnectMagicLink] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  const magicGlobalStatus = (): boolean => {
    let magicConfig = false
    userConfig.find(({ config, value }) => {
      if (config === 'auth.magiclink' && value === 'true') magicConfig = true
    })
    return magicConfig
  }

  return (
    <WalletConnectModalWrapper>
      {connectMagicLink ? (
        <>
          <Header>Connect with the magic link</Header>
          <Subhead>Connect your preferred wallet account</Subhead>
          <ItemListWrapper>
            {Object.values(magicLinkProviderNames).map((item) => (
              <WalletItem key={item.id} id={item.id} title={item.label} src={item.icon} onSelect={onSelect} imgWidth={item.iconWidth} imgHeight={item.iconHeight} />
            ))}
          </ItemListWrapper>
          <MagicLink>
            <Separator />
            <SeparatorText>Or</SeparatorText>
            <Separator />
          </MagicLink>
          <Label>Enter Email</Label>
          <EmailPath
            value={email}
            placeholder="Email"
            type="text"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setError('')
              } else if (!validateEmail(e.target.value)) setError('Invalid Email')
              else setError('')

              setEmail(e.target.value)
            }}
          />
          <ErrorMessage>{error}</ErrorMessage>

          <ButtonGradientPrimary
            onDoubleClick={()=>{}}
            onClick={() => {
              if (email.length === 0) {
                setError('This field is required')
              } else if (!validateEmail(email)) setError('Invalid Email')
              else handleEmailSubmit('email', email)
            }}
            fs="1.4"
            size="md"
          >
            Login/Sign Up
          </ButtonGradientPrimary>
        </>
      ) : (
        <>
          <Header>Connect your wallet</Header>
          <Subhead>Connect your preferred wallet account</Subhead>
          <ItemListWrapper>
            {Object.values(providerNames).map((item) => (
              <WalletItem key={item.id} id={item.id} title={item.label} src={item.icon} onSelect={onSelect} imgWidth={item.iconWidth} imgHeight={item.iconHeight} />
            ))}
          </ItemListWrapper>
          {magicGlobalStatus() && (
            <>
              <MagicLink>
                <Separator />
                <SeparatorText>Or</SeparatorText>
                <Separator />
              </MagicLink>
              <LinkText>
                connect with the<Link onClick={() => setConnectMagicLink(true)}> Magic Link</Link>
              </LinkText>
            </>
          )}
        </>
      )}
    </WalletConnectModalWrapper>
  )
}
export default WalletConnectModal
interface WalletItemProps {
  id: string
  title: string
  src: string
  imgWidth?: number
  imgHeight?: number
  onSelect: (id: string) => void
}
const WalletItem = ({ id = 'metaMask', title = 'Metamask', src = '/svgs/metamask.svg', imgWidth = 30, imgHeight = 30, onSelect }: WalletItemProps) => {
  return (
    <ItemContainer key={id} onClick={() => onSelect(id)}>
      <Image src={src} alt={id} width={imgWidth} height={imgHeight} />
      <ItemText>{title}</ItemText>
    </ItemContainer>
  )
}
const WalletConnectModalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 4rem;
`
const Header = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  color: ${({ theme }) => theme.colors.fontcolor};
  margin-bottom: 0.3rem;
`
const Subhead = styled.h4`
  margin: 0;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.fontdark};
  margin-bottom: 4.1rem;
`
const ItemListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2rem;
`
const ItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.web3Modalbg};
  border-radius: 0.9rem;
  gap: 1.4rem;
  height: 5rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }
`
const ItemText = styled.span`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.colors.fontprimary};
`

const MagicLink = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  margin 2rem auto 0 auto;
`

const Separator = styled.div`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.activeBeforeColor};
`

const SeparatorText = styled.p`
  color: ${({ theme }) => theme.colors.fontdark};
  padding: 0 2rem;
`
const LinkText = styled.p`
  color: ${({ theme }) => theme.colors.fontdark};
  margin: 3rem auto 0 auto;
`

const Link = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fontcolor};
`

const Label = styled.label`
  margin: 20px 0 10px 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.fontcolor};
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
`

const EmailPath = styled(InputPath)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.fontdark};
  border-radius: 6px;
  outline: none;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.web3Modalbg};
`

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
