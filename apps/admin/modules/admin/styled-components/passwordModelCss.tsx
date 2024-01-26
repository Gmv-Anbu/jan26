import styled from 'styled-components'

export const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ModalContainer = styled.div`
  width: 432px;
  height: 357px;
  background: #ffffff;
  border-radius: 6px;
`
export const Change = styled.div`
  display: flex;
  justify-content: end;
  padding: 2rem 2rem 0 2rem;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
`
export const Changepass = styled.div`
  padding-left: 4rem;
  padding-top: 1.5rem;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 550;
  font-size: 18px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 0.7rem;
`
export const ChangeSpan = styled.span`
  padding-left: 4rem;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #72809c;
`
export const Form1 = styled.form`
  padding: 0 4rem;
  margin-top: 5rem;
`
export const Label1 = styled.label`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #3c3c3c;
`
export const Input2 = styled.input`
  width: 365px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #bac6d9;
  border-radius: 6px;
  outline: none;
  padding: 1rem;
`
export const Input1 = styled.input`
  width: 365px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #bac6d9;
  border-radius: 6px;
  outline: none;
  padding: 1rem 1.2rem;
`
export const BtnContainer = styled.div`
  width: 365px;
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const BtnContainer1 = styled.div`
  width: 365px;
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const CancelBtn = styled.button`
  width: 161px;
  height: 40px;
  border-radius: 5px;
  padding: 1rem;
  border: 1.5px solid #305498;
  color: #23487b;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
`
export const ContiuneBtn = styled.button`
  padding: 1rem;
  width: 192px;
  border: none;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;

  text-align: center;

  color: #ffffff;
  height: 40px;
  left: 208px;
  top: 272px;
  background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
  border-radius: 6px;
  color: #ffffff;
`
export const PwdChange = styled.div`
  width: 432px;
  height: 300px;
  left: 0px;
  top: 0px;

  background: #ffffff;
  border-radius: 6px;
`
export const Errormsg = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #ff0000;
  font-size: 1.2rem;
  visibility: visible;
  margin-top: 3px;
`

export const PasswordEye = styled.a`
  position: absolute;
  right: 0.2rem;
  top: 50%;
  height: 22px;
  transform: translate(-50%, -50%);
  cursor: pointer;
`

export const PasswordEyeConfirm = styled.a`
  position: absolute;
  right: 0.2rem;
  top: 50%;
  height: 22px;
  transform: translate(-50%, -50%);
  cursor: pointer;
`

export const PassWordWrapper = styled.div`
  position: relative;
  margin-top: 0.7rem;
`
