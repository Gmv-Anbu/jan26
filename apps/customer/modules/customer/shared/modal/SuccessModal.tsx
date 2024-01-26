import Image from 'next/image'
import styled from 'styled-components'
import { ButtonGradientPrimary, ButtonPrimary } from '../../../shared/components/button/button'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import { handleApiImage } from '@apps/customer/utils/helper'
import Congrats from '../../../../public/svgs/congrats.svg'
interface ISuccessModalProps {
  title?: string
  desc?: any
  descHeading?: any
  imgSrc?: string
  close: () => void
  buttonText?: string
}

const SuccessModal = ({ title = 'Congratulations', desc = 'You are successfully connected', close, buttonText }: ISuccessModalProps) => {
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.successImg) || '/svgs/congrats.svg'

  return (
    <SuccessModalWrapper>
      <Image height={191} width={454} src={Congrats} alt="success-img" /> {/* default width was 329 */}
      <Header>{title}</Header>
      <Subhead>{desc}</Subhead>
      <ButtonPrimary onClick={close} padding="1.4rem 5rem">
        {buttonText || 'Done'}
      </ButtonPrimary>
    </SuccessModalWrapper>
  )
}
export default SuccessModal

const SuccessModalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 2.3rem 4.6rem;
  align-items: center;
  z-index:99;
  gap: 6px;
  width: 640px;
  min-height: 416px;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 275px;
    min-height: 300px;
  }
`
const Header = styled.h2`
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 3.2rem;
`
const Subhead = styled.h4`
  color: rgba(0, 0, 0, 0.45);
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.2rem;
  max-width: 435px;
  text-align: center;
  margin-bottom: 4.5rem;
`
