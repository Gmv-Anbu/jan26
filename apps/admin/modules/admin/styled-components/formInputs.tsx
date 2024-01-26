import styled, { css } from 'styled-components';

const InputSubmit = styled.a`
  background-color: ${({ theme }) => theme.colors.btnPrimary};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.5rem;
  box-sizing: border-box;
  font-family: Inter;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  border: 3px solid ${({ theme }) => theme.colors.langSelectBg};
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  border-radius: 1.5rem;
  &:focus {
    border: 3px solid ${({ theme }) => theme.colors.inputBorder};
  }
`;
const LinksAnchor = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.linkAnchor};
  text-decoration: none;
  font-family: Inter;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  &.primary {
    color: ${({ theme }) => theme.colors.btnPrimary};
  }
`;
const FormLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FormWrapper = styled.div`
  position: relative;
`;
const InputWrapper = styled.div`
  margin-bottom: 2.5rem;
`;
const InputFeild = styled.div`
  position: relative;
`;
const InputIcon = styled.span`
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  left: 1.5rem;
  transform: translateY(-50%);
  width: 1.8rem;
  height: 1.8rem;
  &.lock {
    background-image: url(/svgs/lock.svg);
  }
  &.at-the-rate {
    background-image: url(/svgs/at-the-rate.svg);
  }
`;
<InputIcon className="lock"></InputIcon>;
const Input = styled.input`
  width: 100%;
  padding: 1.2rem 4rem 1.2rem 4rem;
  transition: 0.5s;
  outline: none;
  font-family: Inter;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.9rem;
  color: black;
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.mainBG};
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.btnPrimary};
  }
  // &:-internal-autofill-selected {
  //     color: #B0B7C3;
  // }
`;
const InputError = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #ff0000;
  font-size: 1.2rem;
  visibility: visible;
  margin-top: 3px;
`;
const InputCheckbox = styled.div`
  display: flex;
  align-items: center;
  input {
    cursor: pointer;
    background: #fafbfc;
    border-radius: 0.8rem;
    border-color: #fafbfc;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`;
const BtnWrapper = styled.div`
  margin: 3rem 0 0 0;
  &.mb-3 {
    margin-bottom: 3rem;
  }
`;
const PasswordEye = styled.a`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  height: 22px;
`;

export {
  InputSubmit,
  LinksAnchor,
  FormLinks,
  FormWrapper,
  InputWrapper,
  InputFeild,
  InputIcon,
  Input,
  InputError,
  InputCheckbox,
  BtnWrapper,
  PasswordEye,
};
