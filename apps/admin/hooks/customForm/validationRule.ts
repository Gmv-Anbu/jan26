import { IFormData, IValidRuleType } from './model'

function createValidationRule(ruleName: string, errorMessage: string, validateFunc: (inputValue: string, formObj?: object) => boolean) {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc,
  }
}
export function requiredRule(inputName: string): IValidRuleType {
  return createValidationRule('required', `${inputName} required`, (inputValue, formObj) => {
    return inputValue?.length !== 0
  })
}


export function requiredRuleForWalletId(inputName: string): IValidRuleType {
  return createValidationRule('required', `${inputName} required`, (inputValue, formObj) => {
    return typeof inputValue != 'undefined'
  })
}

export function minLengthRule(inputName: string, minCharacters: number): IValidRuleType {
  return createValidationRule('minLength', `${inputName} should contain atleast ${minCharacters} characters`, (inputValue, formObj) => inputValue?.length >= minCharacters)
}

export function maxLengthRule(inputName: string, maxCharacters: number): IValidRuleType {
  return createValidationRule('maxLength', `${inputName} cannot contain more than ${maxCharacters} characters`, (inputValue, formObj) => inputValue?.length <= maxCharacters)
}

export const validateEmail = (inputName: string): IValidRuleType => {
  return createValidationRule(
    'validateEmail',
    `${inputName} is not a valid email address`,
    (inputValue, formObj) =>
      !!String(inputValue)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/)
  )
}

export const validateEmail2 = (inputName: string): IValidRuleType => {
  const emailRegx = /^([a-z0-9][a-z0-9.]*)?(john)([a-z0-9.]*[a-z0-9])?@mycompany\.com$/
  return createValidationRule('validateEmail', `${inputName} is not a valid email address`, (inputValue, formObj) => emailRegx.test(inputValue))
}

export const validatePassword = (inputName: string): IValidRuleType => {
  //min 8 letter password, with at least a symbol, upper and lower case letters and a number
  const regPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return createValidationRule('validateEmail', `${inputName} must contain atleast: 1 Uppercase: 1 special character: 1 numeric `, (inputValue, formObj) => regPassword.test(inputValue))
}

export const validPhoneNumber = (inputName: string): IValidRuleType => {
  return createValidationRule('validPhoneNumber', `${inputName} is not valid`, (inputValue, formObj) => !!String(inputValue).match('[0-9]{10}'))
}

export const validTextNoSpecialCharacters = (inputName: string): IValidRuleType => {
  const specialCharacterRegx = /^[a-zA-Z0-9\s]*$/
  return createValidationRule('validTextNoSpecialCharacters', `Special character not allowed in ${inputName}`, (inputValue, formObj) => specialCharacterRegx.test(inputValue))
}

export const validateNames = (inputName: string): IValidRuleType => {
  return createValidationRule(
    'validateNames',
    `${inputName} does not accept special characters`,
    (inputValue, formObj) =>
      !!String(inputValue)
        .toLowerCase()
        .match(/^[- a-zA-Z0-9]+$/)
  )
}
