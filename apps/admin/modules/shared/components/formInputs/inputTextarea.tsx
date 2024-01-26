import React from 'react'

import { InputWrapper, InputLabel } from '../../styled-components/formInputs'

const descriptionLimit = 2000
const shortDescriptionLimit = 250

const InputTextarea = (props: any) => {
  const { label, value, count = true, onChange, name, placeholder, error, type, descriptionCount, shortDescriptionCount, textareaRef, required, charLimit, charLimitCount,disabled } = props
  return (
    <InputWrapper>
      <InputLabel required={required}>{label}</InputLabel>
      <textarea value={value} onChange={onChange} name={name} placeholder={placeholder} ref={textareaRef} maxLength={count === false ? '' : name === 'description' ? descriptionLimit : charLimit ? charLimit : shortDescriptionLimit} disabled={disabled}/>
      {error ? <p className="error">{error}</p> : null}
      {count 
        ? <>
        {name === 'description' && type !== 'shortDesc' ? <p>{`${descriptionLimit - descriptionCount} characters remaining`}</p> : charLimit ? <p>{`${charLimit - charLimitCount} characters remaining`}</p> : <p>{`${shortDescriptionLimit - shortDescriptionCount} characters remaining`}</p>}
        </> 
        : null}
    </InputWrapper>
  )
}

export default InputTextarea
