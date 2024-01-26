import React, { useState } from 'react'

import { InputWrapper, InputLabel } from '../../styled-components/formInputs'

const InputText = (props: any) => {
  const { label, value, onChange, className, name, placeholder, error, defaultValue, inputRef, disabled } = props

  return (
    <InputWrapper className={`text-input-wrapper ${className || ''}`}>
      <InputLabel>{label}</InputLabel>
      <input type="text" value={value} ref={inputRef} onChange={onChange} name={name} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} />
      {error ? <p className="error">{error}</p> : null}
    </InputWrapper>
  )
}

export default InputText
