import React, { useState } from "react";

import { InputWrapper, RadioBtn } from "../../styled-components/formInputs";

const InputRadio = ({ id,value, onChange, label, name, ...props }:any) => {

    return (
        <InputWrapper>
            <RadioBtn>
                <input value={value} onChange={onChange} type="radio" name={name} id={id || name} {...props} />
                <label htmlFor={id || name}>{label}</label>
            </RadioBtn>
        </InputWrapper>
    )
}

export default InputRadio