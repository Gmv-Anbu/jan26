import { set } from 'immer/dist/internal';
import { useState, useCallback } from 'react';
import { formFieldConfig } from './input/createFormfield.helper';
import { IValidRuleType } from './validationRule';
export interface IFormObjectType {
    [index: string]: (formFieldConfig & {validationRules:Array<IValidRuleType>})
}
export interface updateFormObj {
  [index: string]: {
    value?:string|ArrayBuffer|null
  }
}
function useForm(formObj:IFormObjectType ) {
  const [form, setForm] = useState(formObj);
  const renderFormInputs = () => {
    return Object.values(form)
    .filter(i=> i.type!=='data' && i?.renderInput && typeof(i.renderInput)!== undefined)
    .map((inputObj) => {
      const { value, label, errorMessage, valid, renderInput } = inputObj;
      return renderInput&& renderInput(onInputChange, value, valid, errorMessage, label);
    });
  }
  const isInputFieldValid = useCallback(
    (inputField) => {
      inputField.valid = true;
      if(inputField.validationRules && Array.isArray(inputField.validationRules) && inputField.validationRules.length){
        for (const rule of inputField.validationRules) {
        if (!rule.validate(inputField.value, form)) {
          inputField.errorMessage = rule.message;
          inputField.valid = false;
          break;
        }
      }
    }
      return inputField;
    },
    [form]
  );
  const setFormValue = useCallback((updateFormObj:updateFormObj) =>{
    let formCopy:IFormObjectType = {...form};
    Object.entries(updateFormObj).forEach(([name,value])=>{
      let inputObj = { ...formCopy[name],...value };
      // inputObj = isInputFieldValid(inputObj);
      Object.assign(formCopy,{[name]: inputObj})
      // formCopy = { ...formCopy, [name]: inputObj };
    })
    setForm({ ...form, ...formCopy });
  },[form])
  const onInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      // copy input object whose value was changed
      let inputObj = { ...form[name] };
      // update value
      inputObj.value = value;
  
      // update input field's validity
      inputObj = isInputFieldValid(inputObj);
      // if input is valid and it was previously invalid
      // set its valid status to true
      // if (isValidInput && !inputObj.valid) {
      //   inputObj.valid = true;
      // } else if (!isValidInput && inputObj.valid) {
      //   // if input is not valid and it was previously valid
      //   // set its valid status to false
      //   inputObj.valid = false;
      // }
  
      // mark input field as touched
      inputObj.touched = true;
      setForm({ ...form, [name]: inputObj });
    },
    [form, isInputFieldValid]
  );
  const isFormValid = useCallback(() => {
    let isValid = true;
    let arr: any
    arr = Object.values(form);
    let formCopy = {...form};
    Object.entries(form).forEach(([name,value])=>{
      let inputObj = { ...formCopy[name] };
      inputObj = isInputFieldValid(value);
      formCopy = { ...formCopy, [name]: inputObj };
    })
    setForm({...form,...formCopy})
    for (let i = 0; i < arr.length; i++) {
      if (i && !arr[i].valid) {
        isValid = false;
        break;
      }
    }
  
    return isValid;
  }, [form,isInputFieldValid]);

  return { renderFormInputs,isFormValid,form,setFormValue };
}

export default useForm;

