import styled from 'styled-components'


interface IButton1 {
    disabledStatus?: boolean
}

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalContainer = styled.div`
  width: 348px;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 4.3rem 3.8rem;
  label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #323232;
    margin-top: 20px;
    margin-bottom: 2px;
    line-height: 21px;
  }
  .text-input-wrapper {
    margin: 3rem 0;
    div {
      display: flex;
      align-items: center;
    }
    label {
      color: #323232;
      margin-top: 20px;
      margin: 0;
      line-height: 21px;
      font-size: 14px;
    }
  }
`
const Errormsg = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  color: #a81717;
  font-size: 1.4rem;
  visibility: visible;
  padding-left: 3px;
  padding-top: 1rem;
`

const FilterHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
line-height: 1.19rem;
color: #172f53;
// margin-bottom: 3rem;
h3 {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: #172f53;
}
svg {
  cursor: pointer;
}
`

const ButtonComponent = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`

const Button1 = styled.button<IButton1>`
height: auto;
width: 100px;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
background: #ffffff;
color: #23487b;
padding: 10px;
border-radius: 8px;
border: 1px solid #bac6d9;
cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
const Button2 = styled.button`
padding: 10px;
background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
border-radius: 6px;
width: 154px;
height: auto;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
border: none;
cursor: pointer;
`
const Dropdown = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;

margin-top: 10px;
`
const DropdownDate = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
margin-top: 10px;
input[type='text'], input[type='time'], input[type='date'], input[type='datetime-local'] {
  position: relative;
}
input[type="date"]::-webkit-calendar-picker-indicator, input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  background-position: right;
  background-size: auto;
  height: auto;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 1rem;
  top: 0;
  width: auto;
  opacity: 1;
}
`
const DHead = styled.label`
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 14px;
display: flex;
align-items: center;
color: #323232;
margin-top: 20px;
margin-bottom: 2px;
line-height: 21px;
`
const DateL = styled.h3`
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 14px;
display: flex;
align-items: center;
color: #323232;
margin-top: 20px;
margin-bottom: 2px;
line-height: 21px;
small {
  font-size: 12px;
}
`
const Select = styled.select`
/* width: 100%;
padding: 10px;
background: #ffffff;
border: 1px solid #bac6d9;
border-radius: 6px; */

width: 100%;
padding: 10px;
font-size: 16px;
line-height: 1;
border: 1px solid #bac6d9;
border-radius: 5px;
background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right;
-webkit-appearance: none;
background-position-x: 94%;
background-size: 10px;
`

const SelectD = styled.input`
width: 100%;
padding: 10px;
background: #ffffff;
border: 1px solid #bac6d9;
border-radius: 6px;
`
const Option = styled.option`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
color: #3c3c3c;
width: 250px;
`

export const InputWrapper = styled.div`
  input {
    padding: 1rem 1.2rem;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    background: #FFFFFF;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    outline: none;
    width: 100%;
  }
`

const Line = styled.div`
width: 100%;
border-bottom: 1px solid #E3E3E3;
margin: 3rem 0;
`

export {
    ModalBackground,ModalContainer,Errormsg,FilterHeader,ButtonComponent,Button1,Button2,Dropdown,DropdownDate,DHead,DateL,Select,SelectD,Option,Line
}
