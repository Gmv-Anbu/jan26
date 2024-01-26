import React, { useState } from 'react'

import { InputWrapper, InputLabel } from '../../styled-components/formInputs'

const InputDate = (props: any) => {
  const { label, value, onChange, className, name, placeholder, error, defaultValue, inputRef, disabled } = props

  return (
    <InputWrapper className={className || ''}>
      <InputLabel>{label}</InputLabel>
      <input type="date" value={value} ref={inputRef} onChange={onChange} name={name} placeholder={placeholder || 'DD/MM/YYYY'} defaultValue={defaultValue} disabled={disabled} />
      {error ? <p className="error">{error}</p> : null}
    </InputWrapper>
  )
}

export default InputDate
