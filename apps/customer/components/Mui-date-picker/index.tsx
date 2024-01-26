import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopTimePicker } from '@mui/x-date-pickers'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styled from 'styled-components'
import Image from 'next/image'

interface StyleProps {
  isError?: boolean
}
const Wrapper = styled.div<StyleProps>`
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  flex-basis: 56rem;
  /* margin-top: -5px; */
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
    color: #121212;
  }
  .input {
    position: relative;
    width: 100%;
    height: 5.2rem;
    // border: ${(props) => (props.isError ? '1.5px solid red' : ' ')};
    background: none;
    border-radius: 0;
    box-sizing: border-box;
    div {
      border : none !important;
    }
    fieldset {
      border: 1.5px solid #d0d0d0 !important;
    }
    div,
    input {
      z-index: 3;
      cursor: pointer;
      border-radius: 0;
      border: transparent;
      width: 100%;
      height: 100%;
      position: absolute;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: ${({ theme }) => theme.fontSizes.md};
      overflow: hidden;
    }
    .time-icon {
      z-index: 1;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 17px 0 0;
    }
  }

  @media screen and (max-width: 768px) {
    label {
      font-size: 1.75rem;
    }
    .input {
      min-height: 52px;
    }
  }
`

function CustomTimePicker({ isLabel, isName, onchange, isValue, isError, isDisabled }) {
  const [value, setValue] = React.useState('')
  const [inputFocus, setInputFocus] = React.useState(0)
  React.useEffect(() => {
    if (isError) {
      setValue('')
    }
  }, [isError])

  const setSection = (val) => {
    let el = document.querySelectorAll('.input input')
    let str = el?.[0]['value']
    console.log('uat str', val, str)
    if(str === 'hh:mm aa' || str === 'hh:mm⁩ ⁦aa') {
      setInputFocus(0)
    } else if(str.includes(':mm aa') || str.includes(':mm⁩ ⁦aa')) {
      setInputFocus(1)
    } else if(str.includes('aa') || str.includes('⁦aa')) {
      setInputFocus(2)
    } else if(!str.includes('aa') || !str.includes('⁦aa')) {
      setInputFocus(val)
    }
  }

  return (
    <Wrapper isError={isError}>
      <label>{isLabel}</label>
      <div className="input">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopTimePicker
          autoFocus={true}
          value={value}
          disableOpenPicker={true}
          selectedSections={inputFocus}
          onSelectedSectionsChange={(newValue: any) => setSection(newValue)}
          disabled={isDisabled}
          onChange={(newValue: any) => {
            setValue(newValue)
            if (newValue?.$d) {
              const selectedDate = new Date(newValue.$d)
              const currentDate = new Date()
              const timeArr = newValue.$d.toLocaleTimeString()
              onchange({ target: { name: isName, value: timeArr, isPrevDate: selectedDate < currentDate } })
            }
          }}
        />
        {/* <MobileTimePicker
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue)
              if (newValue.$d) {
                const selectedDate = new Date(newValue.$d)
                const currentDate = new Date()
                const timeArr = newValue.$d.toLocaleTimeString()
                onchange({ target: { name: isName, value: timeArr, isPrevDate: selectedDate < currentDate } })
              }
            }}
          /> */}
      </LocalizationProvider>
      <div className="time-icon">
          {' '}
          <Image src={'/images/customer/Events/time-img.png'} width={18} height={18} alt={'ICO'} />
        </div>
      </div> 
    </Wrapper>
  )
}

export default CustomTimePicker
