import { RootState } from '@apps/customer/redux/store'
import { handleApiImage } from '@apps/customer/utils/helper'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ButtonGradientPrimary } from '../../../shared/components/button/button'

interface IErrorModalProps {
  title?: string
  desc?: string
  imgSrc?: string
  close: () => void
}

const MetamaskNotFoundModal = ({ title = 'Warning', desc = 'Error', imgSrc = '/svgs/modal_warning.svg', close }: IErrorModalProps) => {
  // const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  // imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.warningImg) || "/svgs/modal-error.svg";
  return (
    <ErrorModalWrapper>
      <Image height={86} width={86} src={imgSrc} alt="success-img" />
      <Header>{title}</Header>     
      <Subhead>{desc}</Subhead>
      <ButtonGradientPrimary
        onClick={() => {
          window.open('https://metamask.io/download', '_blank')
        }}
        fs="1.4"
        size="sm"
      >
        Install Metamask
      </ButtonGradientPrimary>
    </ErrorModalWrapper>
  )
}
export default MetamaskNotFoundModal

const ErrorModalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 2.3rem 4.6rem;
  align-items: center;
  gap:6px;
  width: 640px;
  min-height: 416px;
  justify-content: center;
  img{
    padding-bottom: 3.6rem !important;
  }
  @media screen and (max-width:768px) {
    width: 275px;
    min-height: 300px;
  }
`
const Header = styled.h2`
    margin:0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.2rem;
`
const Subhead = styled.h4`
    color:  rgba(0, 0, 0, 0.45);
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    max-width: 435px;
    text-align: center;
    margin-bottom: 5rem;
`
