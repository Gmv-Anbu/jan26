import { useState, useCallback } from 'react'
import { IFormData, IUpdateFormData } from './model'
function useForm(formObj: IFormData) {
  const [form, setForm] = useState(formObj)
  const isInputFieldValid = useCallback(
    (inputField) => {
      inputField.valid = true
      if (inputField.validationRules && Array.isArray(inputField.validationRules) && inputField.validationRules.length) {
        inputField.valid = true
        for (const rule of inputField.validationRules) {
          if (!rule.validate(inputField.value, form)) {
            inputField.errorMessage = rule.message
            inputField.valid = false
            break
          }
        }
      }
      return inputField
    },
    [form]
  )
  const updateForm = useCallback(
    (updateFormObj: IUpdateFormData) => {
      const formCopy: IFormData = { ...form }
      Object.entries(updateFormObj).forEach(([name, value]) => {
        const inputObj = { ...formCopy[name], ...value }
        // inputObj = isInputFieldValid(inputObj);
        Object.assign(formCopy, { [name]: inputObj })
        // formCopy = { ...formCopy, [name]: inputObj };
      })
      setForm({ ...form, ...formCopy })
    },
    [form]
  )
  const onInputChange = useCallback(
    (event) => {
      const target = event.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name
      // copy input object whose value was changed and new value
      let inputObj = { ...form[name], value: value }
      // update input field's validity
      inputObj = isInputFieldValid(inputObj)
      setForm({ ...form, [name]: inputObj })
    },
    [form, isInputFieldValid]
  )
  const isFormValid = useCallback(() => {
    let isValid = true
    const arr: any = Object.values(form)
    let formCopy = { ...form }
    Object.entries(form).forEach(([name, value]) => {
      let inputObj = { ...formCopy[name] }
      inputObj = isInputFieldValid(value)
      formCopy = { ...formCopy, [name]: inputObj }
    })
    setForm({ ...form, ...formCopy })
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].valid) {
        isValid = false
        break
      }
    }

    return isValid
  }, [form, isInputFieldValid])

  return { isFormValid, form, updateForm, onInputChange, setForm }
}

export default useForm
