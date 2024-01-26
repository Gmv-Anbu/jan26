import React, { useState } from 'react'

import { InputWrapper, InputLabel } from '../../styled-components/formInputs'
import CountryCode from '@apps/customer/components/countryCode/countryCode'

const InputMobile = (props: any) => {
  const { label, value, onChange, className, name, placeholder, error, defaultValue, inputRef, disabled } = props

  return (
    <InputWrapper className={`text-input-wrapper ${className || ''}`}>
      <InputLabel>{label}</InputLabel>
      <CountryCode value={value} onKeyDown={null} onChange={(value, country) => onChange(value, country)} inputClass="my-class" />
      {error ? <p className="error">{error}</p> : null}
    </InputWrapper>
  )
}

export default InputMobile
