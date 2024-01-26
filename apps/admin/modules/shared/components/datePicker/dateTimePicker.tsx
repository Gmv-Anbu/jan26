import React, { forwardRef, useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import Image from 'next/image'

import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import moment from 'moment'
import { InputWrapper, InputLabel } from '../../styled-components/formInputs'

const DateTimeWrapper = styled.div`
    .react-datepicker {
        width: 250px;
    }
    .react-datepicker__triangle {
        margin-left: -20px !important;
    }
    .react-datepicker__month-container {
        width: 100%;
    }
    .react-datepicker__current-month {
        font-size: 1.5rem;
    }
    .react-datepicker__navigation {
        top: 10px;
    }
    .react-datepicker__day-names {
        margin: 5px 0 0 0;
    }
    .react-datepicker__day-name {
        width: auto;
        margin: 0.5rem;
    }
    .react-datepicker__input-time-container {
        margin: 5px 0 10px 25px;
    }
    .react-datepicker__day {
        margin: 0.35rem;
        padding: 0.25rem;
        width: 24px;
    }
`

const DateTimePicker = (props: any) => {
  const { label, disabled, required, value, min, name, onChange, error } = props
  const now = new Date()

  return (
    <InputWrapper>
        <InputLabel required={required}>{label}</InputLabel>
        <DateTimeWrapper>
            <DatePicker
                selected={value}
                minDate={min || now}
                onChange={(date) => {
                    console.log(date, new Date(date).toISOString(), new Date(new Date(date).toISOString()))
                    onChange(date, name)
                }}
                timeInputLabel="Time:"
                dateFormat="dd-MM-yyyy h:mm aa"
                showTimeInput
            />
        </DateTimeWrapper>
        {error ? <p className="error">{error}</p> : null}
    </InputWrapper>
  )
}

export default DateTimePicker
