import styled, { css } from 'styled-components'

interface ErrorProps {
  mb?: number
}

export const InputWrapper = styled.div`
  font-family: Poppins;
  margin-bottom: 3rem;
  p.error {
    color: red;
    margin: 0.5rem 0 0 0.4rem;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 500;
  }
  input[type='text'], input[type='time'], input[type='date'], input[type='datetime-local'] {
    position: relative;
    font-family: Poppins;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: #333333;
    background: #fff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    width: 100%;
    height: 48px;
    &::-webkit-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &::placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:disabled {
      background-color: #F3F3F3;
      cursor: not-allowed;
   }
  }
  input[type="date"]::-webkit-calendar-picker-indicator, input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    background-position: right;
    background-size: auto;
    height: 45px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    width: auto;
    opacity: 0;
  }
  // input[type="time"]::-webkit-calendar-picker-indicator {
  //   display: none;
  // }
  textarea {
    height: 18rem;
    width: 100%;
    font-family: Poppins;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: #333333;
    background: #fff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    resize: none;
    height: 200px;
    &::-webkit-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &::placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:disabled {
      background-color: #F3F3F3;
      cursor: not-allowed;
   }
  }
  .react-select__control {
    background: #fff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    padding: 0;
    box-shadow: none;
    &--is-focused,
    &--is-focused:hover {
      border-radius: 1.2rem 1.2rem 0 0;
      border: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
    &--is-disabled {
      background-color: #F3F3F3;
      cursor: not-allowed;
    }
    .react-select__input-container,
    .react-select__single-value {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: normal;
      color: #333333;
      padding: 0;
      margin: 0;
    }
    .react-select__value-container {
      padding: 0 1.6rem;
    }
    .react-select__placeholder {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: normal;
      color: #515151;
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
    overflow: auto;
  }
  .react-select__option {
    font-size: 1.4rem;
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
    background: ${({ theme }) => theme.colors.selectBg};
  }
`
export const RadioBtn = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 3rem;
    height: 3rem;
    display: none;
  }
  label {
    font-family: Poppins;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.4rem;
    position: relative;
    padding-left: 3.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  [type='radio']:checked + label:before,
  [type='radio']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 21px;
    height: 21px;
    border: 1px solid #979797;
    border-radius: 100%;
    background: ${({ theme }) => theme.colors.transparent};
  }
  [type='radio']:checked + label:after,
  [type='radio']:not(:checked) + label:after {
    content: '';
    width: 14px;
    height: 14px;
    background: #10b5e6;
    position: absolute;
    top: 3.5px;
    left: 3.5px;
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
  [type='radio']:checked + label:before {
    border: 1px solid #10b5e6;
  }
`
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  input {
    width: 2rem;
    height: 2rem;
  }
  label {
    font-family: Poppins;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.4rem;
    position: relative;
    padding-left: 1rem;
  }
`
export const SingleOption = styled.div`
  background: ${({ theme }) => theme.colors.singleOptionbg};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 1.2rem;
  font-family: Poppins;
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
`
interface IInputLabel {
  required: boolean
}

export const InputLabel = styled.label<IInputLabel>`
  font-family: Poppins;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
  &:after {
    ${(props) =>
      props.required &&
      css`
        content: ' *';
      `}
    color: red;
  }
`

export const Error = styled.p<ErrorProps>`
  color: red;
  margin: 0.5rem 0 0 0.4rem;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
  ${(props) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb}rem;
    `}
`
