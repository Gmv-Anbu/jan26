import styled, { css } from 'styled-components';

interface BtnProps {
  fs?: string;
  blockBtn?: boolean;
  size?: string;
  marginBottom?: string;
}

const Button = styled.button<BtnProps>`
  background-color: none;
  border: none;
  min-width: ${({ size, theme }) => theme.buttonSizes[size]};
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: Poppins;
  &:hover {
    transform: translateY(-2px);
  }
  ${(props) =>
    props.blockBtn &&
    css`
      width: 100% !important;
      display: block !important;
      font-family: Poppins;
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
    `}
`;

const ButtonPrimary = styled(Button) <BtnProps>`
  background-color: ${({ theme }) => theme.colors.primaryButton};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderprimary};
  width: ${({ size }) => (size ? size : '12rem')};
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.7rem 2rem;
`;

const ButtonSecondary = styled(Button) <BtnProps>`
  border: 1px solid ${({ theme }) => theme.colors.buttoncolor};
  background-color: ${({ theme }) => theme.colors.mainBG};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonGradientPrimary = styled(Button) <BtnProps>`
  background: linear-gradient(
    90.12deg,
    #00b7e9 0.1%,
    #c91cc3 99.88%,
    #c81cc5 99.89%,
    #da3794 99.89%
  );
  color: ${({ theme }) => theme.colors.white};
  &:disabled {
    opacity:0.6;
    cursor:default !important;
  }
`;
const ButtonGradientSecondary = styled(Button) <BtnProps>`
  background: linear-gradient(
    90.12deg,
    #00b7e9 0.1%,
    #c91cc3 99.88%,
    #c81cc5 99.89%,
    #da3794 99.89%
  );
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonPrimaryOutline = styled(Button) <BtnProps>`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.buttoncolor};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonBid = styled(Button) <BtnProps>`
  border: 1px solid ${({ theme }) => theme.colors.borderprimary};
  background: ${({ theme }) => theme.colors.buttonBidbg};
  border-radius: 5rem;
  color: ${({ theme }) => theme.colors.white};
  width: ${({ size }) => size};
  padding: 1.2rem;
  height: 100%;
`;

const ButtonTransparent = styled(Button) <BtnProps>`
  background: transparent;
  color: ${({ theme }) => theme.colors.artWorkText};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const ButtonGradientOutlined = styled(Button) <BtnProps>`
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 3px 0 rgba(157, 96, 212, 0.5);
  border: solid 1px transparent;
  background-image: ${({ theme }) => theme.colors.gradientBtnBG};
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 1px 1000px 1px #050d1c inset;
  border-radius: 15px;
  padding: 10px 23px 11px 24px;
`;

const AdminGradientButton = styled(Button) <BtnProps>`
  font-family: Inter;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: white;
  background: linear-gradient(266.81deg, #305498 3.68%, #25C0F2 144.79%);
  border-radius: 6px;
  padding: 1.3rem 3rem;
  height: fit-content;
`

export {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  ButtonPrimaryOutline,
  ButtonGradientPrimary,
  ButtonGradientSecondary,
  ButtonBid,
  ButtonTransparent,
  ButtonGradientOutlined,
  AdminGradientButton,
};
