import styled, { css } from 'styled-components';

interface ErrorProps {
  mb?: number;
}

export const InputWrapper = styled.div`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  margin-bottom: 1rem;
  p.error {
    color: ${({ theme }) => theme.colors.danger};
    // margin: 0.5rem 0 0 0.4rem;
    line-height: normal;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 500;
  }
  input[type='text'] {
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.6rem;
    padding: 1.6rem;
    height:6rem;
    color:  #0E1818 !important;
    background: #FFFFFF;
    border: 1.5px solid #D1E0E2;
    width: 100%;
  }
  textarea {
    height: 18rem;
    width: 100%;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.6rem;
    padding: 1.6rem;
    color:  #0E1818 !important;
    background:  #FFFFFF;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 1.2rem;
  }
  .react-select__control {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 1.2rem;
    padding: 0;
    box-shadow: none;
    &--is-focused,
    &--is-focused:hover {
      border-radius: 1.2rem 1.2rem 0 0;
      border: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
    .react-select__input-container,
    .react-select__single-value {
      font-size: 1.6rem;
      font-weight: 600 !important;
      line-height: normal;
      color:  #0E1818;
      padding: 0;
      margin: 0;
    }
    .react-select__value-container {
      padding: 1.6rem;
    }
    .react-select__placeholder {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: normal;
      color: #0E1818;
    }
    .react-select__indicator-separator {
      display: none;
    }
    .react-select__indicator {
      color: ${({ theme }) => theme.colors.fontdark};
      padding: 1.6rem;
    }
  }
  .react-select__menu {
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background-color: ${({ theme }) => theme.colors.mainBG} !important;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  .react-select__menu-list {
    margin: 0;
    padding: 0;
  }
  .react-select__option {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.colors.fontdark};
  }
  .react-select__option {
    color: ${({ theme }) => theme.colors.fontdark};
  }
  .react-select__option--is-selected {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
  }
  .react-select__option--is-focused {
    /* background: ${({ theme }) => theme.colors.selectBg}; */
  }
`;
export const RadioBtn = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 3rem;
    height: 3rem;
    display: none;
  }
  label {
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.4rem;
    position: relative;
    padding-left: 4.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
  }
  [type='radio']:checked + label:before,
  [type='radio']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3rem;
    height: 3rem;
    border: 0.8rem solid ${({ theme }) => theme.colors.radioButtonBorderColor};
    border-radius: 100%;
    background: ${({ theme }) => theme.colors.transparent};
  }
  [type='radio']:checked + label:after,
  [type='radio']:not(:checked) + label:after {
    content: '';
    width: 14px;
    height: 14px;
    background: ${({ theme }) => theme.colors.coolGrey};
    position: absolute;
    left: 0.8rem;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type='radio']:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  [type='radio']:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  input {
    width: 2rem;
    height: 2rem;
  }
  label {
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.4rem;
    position: relative;
    padding-left: 1rem;
  }
`;
export const SingleOption = styled.div`
  background: ${({ theme }) => theme.colors.singleOptionbg};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 1.2rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.2rem;
  margin-right: 3rem;
  position: relative;
  z-index: 2;
  opacity: 0.7;
  &.active {
    opacity: 1;
    border: 2px solid ${({ theme }) => theme.colors.optionActive};
  }
  @media screen and (max-width: 520px) {
    margin-bottom: 1rem;
  }
`;
export const InputLabel = styled.label`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
  @media screen and (max-width: 540px) {
    font-size: 1rem;
  }
`;
export const Error = styled.p<ErrorProps>`
  color: ${({ theme }) => theme.colors.danger};
  margin: 0.5rem 0 0 0.4rem;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
  ${(props) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb}rem;
    `}
`;
