import React, { useState } from 'react'

import { InputWrapper, InputLabel } from '../../styled-components/formInputs'

const InputDateTime = (props: any) => {
  const { label, min, value, onChange, name, placeholder, error, inputRef, required, readOnly, disabled, maxLength = 100 } = props

  return (
    <InputWrapper>
      <InputLabel required={required}>{label}</InputLabel>
      <input
        type="datetime-local"
        min={min}
        value={value}
        onChange={onChange}
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
      />
      {error ? <p className="error">{error}</p> : null}
    </InputWrapper>
  )
}

export default InputDateTime
