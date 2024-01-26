import React from 'react';
import InputField from './inputField';
export declare interface formFieldConfig {
    renderInput?:(handleChange:(event: React.ChangeEvent<HTMLInputElement>) => void, value:string, isValid:boolean, error:string, key:string)=>React.ReactNode,
    label:string,
    type:string,
    value:string,
    valid:boolean,
    errorMessage:string,
    touched:boolean,
}
const createFormFieldConfig = (
    label:string,
    name:string,
    type:string,
    defaultValue:string=''
):formFieldConfig=>{
    return {
        renderInput: (handleChange, value, isValid, error, key) => {
            if(type === 'data') return undefined;
            return (
              <InputField
                key={key}
                name={name}
                type={type}
                label={label}
                isValid={isValid}
                value={value}
                handleChange={handleChange}
                errorMessage={error}
              />
            );
          },
          label,
          type,
          value: defaultValue,
          valid: false,
          errorMessage: '',
          touched: false,
    }
}
export default createFormFieldConfig;