import { useState, useCallback } from 'react'
import { IFormData, IUpdateFormData } from './model'

function useForm(formObj: IFormData) {
  const [form, setForm] = useState(formObj)

  const isInputFieldValid = useCallback(
    (inputField) => {
      inputField.valid = true
      if (inputField.validationRules && Array.isArray(inputField.validationRules) && inputField.validationRules.length) {
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

  const isFormValid = useCallback(() => {
    const formCopy = { ...form }
    let isValid = true

    Object.entries(formCopy).forEach(([name, value]) => {
      const inputObj = isInputFieldValid(value)
      formCopy[name] = inputObj
      if (!inputObj.valid) {
        isValid = false
      }
    })

    return { isValid, form: formCopy }
  }, [form, isInputFieldValid])

  const onInputChange = useCallback(
    (event) => {
      const target = event.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name

      const inputObj = { ...form[name], value }
      const updatedInputObj = isInputFieldValid(inputObj)

      setForm((prevForm) => ({
        ...prevForm,
        [name]: updatedInputObj,
      }))
    },
    [form, isInputFieldValid]
  )

  return { isFormValid, form, updateForm, onInputChange, setForm }
}

export default useForm
