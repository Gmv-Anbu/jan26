import { RootState } from '@apps/customer/redux/store'
import { handleApiImage } from '@apps/customer/utils/helper'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ButtonGradientPrimary } from '../../../shared/components/button/button'
import ModalErrorImg from '../../../../public/svgs/modal-error.svg'
interface IErrorModalProps {
  title?: string
  desc?: string
  imgSrc?: string
  buttonText?: string
  close: () => void
}

const ErrorModal = ({ title = 'Alert', desc = 'Error', imgSrc = '/svgs/modal_warning.svg', close, buttonText }: IErrorModalProps) => {

  // const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  // console.log('ThemeConfiguration :>> ', ThemeConfiguration);
  // imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.warningImg) || "/svgs/modal-error.svg";
  return (
    <ErrorModalWrapper>
      <div className='error-img'>
        <Image height={86} width={86} src={imgSrc} alt="error-img" />
      </div>
      <Header>{title}</Header>
      {desc ? <Subhead>{desc}</Subhead> : null}
      <ButtonContainer>
        <Button onClick={close}>  {buttonText ? buttonText : 'Done'}</Button>
      </ButtonContainer>
    </ErrorModalWrapper>
  )
}
export default ErrorModal

const ErrorModalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 6.9rem 0 4.2rem;
  align-items: center;
  gap:6px;
  width: 640px;
  min-height: 416px;
  justify-content: center;
  box-shadow: 0px 24px 36px rgba(0, 0, 0, 0.09);
  @media screen and (max-width:768px) {
    width: 275px;
    min-height: 300px;
  }
  .error-img {
    margin-bottom: 4.5rem;
  }
`
const Header = styled.h2`
  margin: 0;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.85);
`
const Subhead = styled.h4`
    color:  rgba(0, 0, 0, 0.45);
    font-weight: 400;
    font-size: 14px;
    line-height: 2.2rem;
    max-width: 435px;
    text-align: center;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  margin-top: 4.5rem;
`
const Button = styled.button`
  color: #ffffff;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.2rem;
  text-align: center;
  background: #2a7575;
  width: 13.5rem;
  height: 5rem;
  border: 1px solid #2a7575;
  cursor: pointer;
`