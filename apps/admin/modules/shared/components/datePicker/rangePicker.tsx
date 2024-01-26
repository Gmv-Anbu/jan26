import React, { forwardRef, useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import Image from 'next/image'

import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import moment from 'moment'

const CustomInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 1.6rem;
  border-radius: 1.2rem;
  label {
    font-family: Poppins;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.1rem;
    color: ${({ theme }) => theme.colors.artWorkText};
  }
  span {
    color: ${({ theme }) => theme.colors.fontdark};
    font-family: Poppins;
    font-size: 1.4rem;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
const DatePickerWrapper = styled.div`
  max-width: 50rem;
  min-width: 25rem;
`

const DateRangePicker = (props: any) => {
  const { label, disabled, setEndDate } = props
  const now = new Date()
  const Currentdate = now
  const [startDate, setStartDate] = useState(Currentdate)
  const datePicker = useRef(null)

  const filterTime = (date) => {
    const isPastTime = new Date().getTime() > date.getTime()
    return !isPastTime
  }

  const CustomInput = ({ value, onClick, onChange }: any) => {
    return (
      <CustomInputWrapper onChange={onChange} onClick={onClick} ref={datePicker}>
        <label>{label}</label>
        <span>{value}</span>
        <Image src={`/svgs/calender.svg`} alt={`calender`} width="16" height="16" />
      </CustomInputWrapper>
    )
  }

  return (
    <DatePickerWrapper>
      <DatePicker
        selectsRange
        minDate={new Date()}
        selected={startDate}
        onChange={(date: Date) => {
            if(date[0]) setStartDate(date)
            if(date[1]) setEndDate(date)
            console.log('date', date, date[1], date[0])
        }}
        dateFormat="yyyy-MM-dd"
        disabled={disabled}
      />
    </DatePickerWrapper>
  )
}

export default DateRangePicker
