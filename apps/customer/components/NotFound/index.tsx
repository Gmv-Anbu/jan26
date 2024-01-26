import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

interface INotFound {
    padding?: string,
    mrPadding?: string,
    size?: string
}
interface IWrapProps{
    padding?: string,
    mrPadding?: string
}

const NotFoundWrapper = styled.div<IWrapProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || "5rem 0 5rem"};
  @media screen and (max-width: 768px) {
    padding: ${(props) => props.mrPadding || "2rem 0 2rem"} ;
  }
`
const ContentBox = styled.div`
  min-width: 530px;
  max-height: 696px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img-box {
    max-width: 241px;
    max-height: 320px;
    min-width: 241px;
    min-height: 320px;
    margin: 0 0 103px 0;
  }
  h4 {
    font-style: normal;
    font-weight: 300;
    font-size: 64px;
    line-height: 120%;
    color: #4e4e4e;
    text-transform: none;
    margin: 0 0 26px 0;
  }
  @media screen and (max-width:800px){
    h4{
      font-size: 8vw;
    }
  }
  p {
    width: 440px;
    height: 56px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #949494;
  }
  &.card-section {
    .img-box {
      max-width: 192px;
      max-height: 255px;
      min-width: 192px;
      min-height: 255px;
      margin: 0 0 30px 0;
    }
    h4 {
      font-size: 51px;
      font-weight: 300;
      line-height: 61px;
      color: #4E4E4E;
    }
    button {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    min-width: 330px;
    padding: 0 24px;
    .img-box {
      max-height: 320px;
      min-height: 320px;
      margin: 0 0 40px 0;
    }
    h4 {
      font-size: 34px;
      margin: 0 0 17px 0;
    }
    p {
      width: 342px;
      font-size: 18px;
    }
    &.card-section {
      margin: 30px 0 0 0;
      .img-box {
        max-width: 152px;
        max-height: 205px;
        min-width: 152px;
        min-height: 205px;
        margin: 0 0 10px 0;
      }
      h4 {
        font-size: 31px;
        margin: 0;
        line-height: normal;
      }
      button {
        display: none;
      }
    }
  }
  @media screen and (max-width: 500px) { 
    h4 {
      font-size: 30px;
      white-space: nowrap;
    }
  }
`
const ButtonPrimary = styled.button`
  cursor: pointer;
  width: 162px;
  height: 50px;
  max-width: 162px;
  max-height: 50px;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
  line-height: 114%;
  font-weight: 600;
  font-style: normal;
  line-height: 113%;
  text-align: center;
`
function NotFound({ padding, mrPadding, size }: INotFound) {
  const router = useRouter()

  return (
    <NotFoundWrapper padding={padding} mrPadding={mrPadding}>
      <ContentBox className={`${size === 'sm' ? 'card-section' : ''}`}>
        <div className={`img-box`}>
          <Image src={`/images/customer/myNFT/404.png`} width={241} height={320} alt={'ICO'} />
        </div>
        <h4>No product found...</h4>
        {/* <p>Sorry, the page you are looking for doesn’t exist or has been moved. Try searching our site :</p> */}
        {size === 'sm' ? <ButtonPrimary onClick={() => router.push('/')}>Back home</ButtonPrimary> : null}
      </ContentBox>
    </NotFoundWrapper>
  )
}

export default NotFound
