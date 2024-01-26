import styled from 'styled-components';

export const ErrorMsg = styled.div`
  font-size: 10px;
  color: red;
`;

export const EditContainer = styled.div`
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
  border-radius: 8px;
  padding: 0 2rem;
  height: 42rem;
`;

export const Editpro = styled.div`
  display: flex;
  padding-top: 2rem;
`;

export const ImgContent = styled.div`
  height: 100px;
  width: 100px;
  box-shadow: 0px 99.3889px 112.82px -42.979px rgba(0, 0, 0, 0.25);
  border-radius: 263.246px;
  border: 1px solid;
`;
export const ImgContainer = styled.div`
  height: 100px;
  width: 100px;
`;
export const BtnContent = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    margin-top: 10px;

    color: #656565;
  }
`;
export const FormContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2rem;
  padding: 0, 0.5rem;
`;

export const FormBtn = styled.button`
  background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
  border-radius: 6px;
  width: 123px;
  height: 34px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  border: none;
  cursor: pointer;
  color: #ffffff;
`;

export const Form1 = styled.form``;
export const Content1 = styled.div`
  padding-top: 3rem;
  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    margin-top: 10px;

    color: #656565;
  }
`;

export const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  input {
    background: rgba(253, 253, 253, 0.82);
    border: 1.5px solid #ededed;
    border-radius: 6px;
    width: 32rem;
    height: 4rem;
    padding: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    outline: none;
    color: #72809c;
  }
  label {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: #000000b2;
  }
`;

export const PwdContent = styled.div`
  height: 20rem;
  margin-top: 2rem;
  background: #ffffff;
  box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;
export const PwdContent1 = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;

  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #656565;
  }
`;
export const PwdForm = styled.div`
  display: flex;
  padding-left: 3rem;
  padding-top: 3rem;

  input {
    background: rgba(253, 253, 253, 0.82);
    border: 1.5px solid #ededed;
    border-radius: 6px;
    width: 25rem;
    height: 4rem;
    margin-top: 0.5rem;
    outline: none;
    padding: 2rem;
    color: #72809c;
  }
  button {
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    border-radius: 6px;
    color: white;
    width: 164px;
    height: 34px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border: none;
    margin-left: 3rem;
    cursor: pointer;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const ChangeContent = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 1rem;
`;

export const Cancel = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 106px;
  height: 40px;
  border-radius: 5px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  border: 1.5px solid #305498;
  color: #23487b;
`;
export const Save = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 156px;
  height: 40px;
  border: transparent;
  background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
  border-radius: 6px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
`;

export const ChangeHead = styled.h4`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #1b1b1b;
`;
export const LoaderDiv = styled.div`
  transform: translate(-5%, 20%);
`;

export const DropUl = styled.div`
  position: relative;
  top: -65px;
  left: 30px;
`;
export const DropLi = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #ffffff;
  cursor: pointer;

  margin-bottom: 1.2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProfileDetailsContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;
export const ProfileImageContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  left: 3.3rem;
  bottom: -3.4rem;
`;
export const ProfileImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  img,
  span {
    width: 100% !important;
    height: 100% !important;
  }
  img {
    border: 0.5rem solid rgba(114, 128, 156, 0.68) !important;
    border-radius: 50%;
  }
`;
export const EditIconWrapper2 = styled.div`
  position: absolute;
  top: 23.6rem;
  left: 44rem;
  width: 2.3rem;
  height: 2.3rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 0.16rem solid ${({ theme }) => theme.colors.fontdark};
  backdrop-filter: blur(6.93rem);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img,
  span {
    width: 1.1rem !important;
    height: 1.1rem !important;
  }
`;

export const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  height: 95px;
  width: 95px;
  border-radius: 50%;
  position: relative;
  top: -31px;
  left: -27px;
`;
export const Ficon = styled.svg`
  position: absolute;
  top: 35%;
  left: 30%;
`;

export const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-contents: center;
  padding: 2rem 3rem;
`;
export const CheckBoxLabel = styled.label`
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
