import React, { useState } from 'react'

import { InputWrapper, InputLabel } from '../../styled-components/formInputs'

const InputTextarea = (props: any) => {
  const { label, value, onChange, name, placeholder, error, descriptionCount, textAreaRef, shortDescriptionCount, disabled } = props

  const [descriptionLimit, setDescriptionCount] = useState(250)
  const [shortDescriptionLimit, setShortDescriptionCount] = useState(90)

  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <textarea value={value} onChange={onChange} ref={textAreaRef} name={name} placeholder={placeholder} maxLength={name === 'description' ? descriptionLimit : shortDescriptionLimit} disabled={disabled} />
      {error ? <p className="error">{error}</p> : null}
      {name === 'description' ? <p>{`${descriptionLimit - descriptionCount} `}</p> : <p>{`${shortDescriptionLimit - shortDescriptionCount} characters remaining`}</p>}
    </InputWrapper>
  )
}

export default InputTextarea
