import styled, { css } from 'styled-components'

interface BtnProps {
  fs?: string
  blockBtn?: boolean
  size?: string
  margin?: string
  padding?: string
  marginBottom?: string
  isWidth?: string
  isWidthMax?: string
  isHeight?: string
  isMaxHeight?: string
  mrFontSize?: string
  mrFontWeight?: string
  fontFam?: string
  transform?:string
  fontWeight?:number
}

const Button = styled.button<BtnProps>`
  cursor: pointer;
  /* background-color: none;
  border: none;
  min-width: ${({ size, theme }) => theme.buttonSizes[size]};
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  &:hover {
    transform: translateY(-2px);
  }
  ${(props) =>
    props.blockBtn &&
    css`
      width: 100% !important;
      display: block !important;
      font-family: ${({ theme }) => theme.fontsFamily.primary};
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 2.7rem;
      margin: 0;
    `}
  ${(props) =>
    props.fs &&
    css`
      font-size: ${props.fs}rem;
    `}
    ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom}rem;
    `} */
`

// const Button2 = styled.button<BtnProps>`
//   background-color: none;
//   border: none;
//   min-width: ${({ size, theme }) => theme.buttonSizes[size]};
//   padding: 0.8rem 1rem;
//   border-radius: 1rem;
//   cursor: pointer;
//   transition: all 0.3s;
//   font-family: ${({ theme }) => theme.fontsFamily.primary};
//   &:hover {
//     transform: translateY(-2px);
//   }
//   ${(props) =>
//     props.blockBtn &&
//     css`
//       width: 100% !important;
//       display: block !important;
//       font-family: ${({ theme }) => theme.fontsFamily.primary};
//       font-size: 1.8rem;
//       font-weight: 500;
//       line-height: 2.7rem;
//       margin: 0;
//     `}
//   ${(props) =>
//     props.fs &&
//     css`
//       font-size: ${props.fs}rem;
//     `}
//     ${(props) =>
//     props.marginBottom &&
//     css`
//       margin-bottom: ${props.marginBottom}rem;
//     `}
// `;

const ButtonPrimary = styled(Button)<BtnProps>`
  cursor: pointer;
  padding: ${(props) => (props.padding ? props.padding : '14px 40px')};
  background: #2A7575;
  color: #fff;
  border: 1px solid #2A7575;
  text-transform: ${(props) => props.transform && props.transform};
  margin: ${(props) => props.margin};
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;  
  font-weight: ${(props) => props.fontWeight};
  @media screen and (max-width: 768px) {
    width: ${(props) => (props.isWidth ? props.isWidth : 'fit-content')};
    max-width: ${(props) => (props.isWidthMax ? props.isWidthMax : 'fit-content')};
    min-height: ${(props) => (props.isHeight ? props.isHeight : 'fit-content')};
    max-height: ${(props) => (props.isMaxHeight ? props.isMaxHeight : 'fit-content')};
    font-size: ${(props) => (props.mrFontSize ? props.mrFontSize : '1.6rem')};
    font-weight: ${(props) => (props.mrFontWeight ? props.mrFontWeight : '')};
    font-family: ${(props) => (props.fontFam ? props.fontFam : '')};
  }
  @media screen and (max-width: 328px) {
    min-width: 90px;
    min-height: 32px;
    padding: 0;
    margin: 0;
  }
`

const ButtonSecondary = styled(Button)<BtnProps>`
  border: 1px solid ${({ theme }) => theme.colors.buttoncolor};
  background-color: ${({ theme }) => theme.colors.mainBG};
  color: ${({ theme }) => theme.colors.white};
`

const ButtonGradientPrimary = styled(Button)<BtnProps>`
  padding: 1rem 3rem;
  background: #2A7575;
  border:none;
  color: ${({ theme }) => theme.colors.white};
`

const ButtonPrimaryOutline = styled(Button)<BtnProps>`
  background: transparent;
  border: 1px solid #2A7575;
  color: #2A7575;
  padding: 14px 40px;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
`
const ButtonGradient = styled(Button)<BtnProps>`
  padding: 1rem 1rem;
  background: ${({ theme }) => theme.colors.gradientBtnBG};
  color: ${({ theme }) => theme.colors.white};
`

const ButtonBid = styled(Button)<BtnProps>`
  border: 1px solid ${({ theme }) => theme.colors.borderprimary};
  background: ${({ theme }) => theme.colors.buttonBidbg};
  border-radius: 5rem;
  color: ${({ theme }) => theme.colors.white};
  width: ${({ size }) => size};
  padding: 1.2rem;
  height: 100%;
`

const ButtonTransparent = styled(Button)<BtnProps>`
  background: transparent;
  color: ${({ theme }) => theme.colors.artWorkText};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`

const ButtonGradientOutlined = styled(Button)<BtnProps>`
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 3px 0 rgba(157, 96, 212, 0.5);
  border: solid 1px transparent;
  background-image: ${({ theme }) => theme.colors.gradientBtnBG}, ${({ theme }) => theme.colors.gradientBtnBG};
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 1px 1000px 1px ${({ theme }) => theme.colors.secondary} inset;
  border-radius: 15px;
  padding: 10px 23px 11px 24px;
`

// const ButtonGradientOutlined = styled(Button)<BtnProps>`
//   color: ${({ theme }) => theme.colors.white};
//   box-shadow: 0 0 3px 0 rgba(157, 96, 212, 0.5);
//   border: solid 1px transparent;
//   background-image: linear-gradient(
//       rgba(0, 183, 233, 1),
//       rgba(201, 28, 195, 1),
//       rgba(200, 28, 197, 1),
//       rgba(218, 55, 148, 1)
//     ),
//     linear-gradient(
//       90.12deg,
//       #00b7e9 0.1%,
//       #c91cc3 99.88%,
//       #c81cc5 99.89%,
//       #da3794 99.89%
//     );
//   background-origin: border-box;
//   background-clip: content-box, border-box;
//   box-shadow: 1px 1000px 1px #050d1c inset;
//   border-radius: 15px;
//   padding: 10px 23px 11px 24px;
// `;

export { Button, ButtonPrimary, ButtonSecondary, ButtonPrimaryOutline, ButtonGradientPrimary, ButtonBid, ButtonTransparent, ButtonGradientOutlined, ButtonGradient }
