
import Image from 'next/image'
import React, { useState } from 'react'
import {
    InputWrapper,
    InputFeild,
    InputIcon,
    Input,
    InputError,
    PasswordEye, 
} from '../../styled-components/formInputs'

const PasswordInput = (props) => {

    const { value, name, error, placeholder, onChange } = props

    const [passType, setPassType] = useState<string>('password') 

    return (
        <InputWrapper>
          <InputFeild>
            <InputIcon className="lock"></InputIcon>
            <Input type={passType} name={name} value={value} onChange={onChange} placeholder={placeholder} />
            <PasswordEye onClick={() => setPassType(passType === 'text' ? 'password' : 'text')}>
              <Image src={`/svgs/eye-${passType === 'text' ? 'open' : 'closed'}.svg`} alt={`PasswordEye`} width="22" height="22" />
            </PasswordEye>
          </InputFeild>
          {error ? <InputError>{error}</InputError> : null}
        </InputWrapper>
    )
}

export default PasswordInput