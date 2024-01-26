import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components'

const Code = styled.div`
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    margin-bottom: 1rem;
    letter-spacing: 0.004em;
    color: #4e4e4e;
  }
  margin-top: 2rem;
  padding-left: 12rem;
  width: 85%;
  @media screen and (max-width: 1240px) {
    padding-left: 10rem;
  }
  @media screen and (max-width: 780px) {
    width: 94%;
    padding-left: 3rem;
  }

  @media screen and (max-width: 330px) {
    width: 94%;
    padding-left: 2.7rem;
  }

  .react-tel-input {
    width: 100%;
    input {
      @media screen and (max-width: 1240px) {
        height: 6rem !important;
      }
    }
  }
`

const CountryCode = ({ inputStyle = {}, country = 'sg', inputClass = '', value, onChange, onKeyDown }) => {
  return (
    <PhoneInput onKeyDown={onKeyDown} country={country} countryCodeEditable={false} inputStyle={inputStyle} value={value} onChange={onChange} inputClass={inputClass} />
  )
}

export default CountryCode
