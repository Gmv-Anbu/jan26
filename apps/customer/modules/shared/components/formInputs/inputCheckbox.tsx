import React, { useState } from "react";

import { InputWrapper, CheckboxWrapper } from "../../styled-components/formInputs";

const   InputCheckbox = (props: any) => {

    const { value, onChange, label, name, error, className } = props

    return (
        <InputWrapper className={`text-input-wrapper ${className || ''}`}>
            <CheckboxWrapper>
                <input type="checkbox" defaultChecked={value} checked={value} onChange={onChange} id={name} name={name} value={value} />
                <label htmlFor={name}>{label}</label>
            </CheckboxWrapper>
            {error ? <p className="error">{error}</p> : null}
        </InputWrapper>
    )
}

export default InputCheckbox