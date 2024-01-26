import React, { useState } from 'react'

import { InputWrapper, InputLabel } from '../../styled-components/formInputs'

const InputText = (props: any) => {
  const { label, value, onChange, name, placeholder, error, inputRef, required, readOnly, disabled, maxLength = 100 } = props

  return (
    <InputWrapper>
      <InputLabel required={required}>{label}</InputLabel>
      <input
        type="text"
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

export default InputText
