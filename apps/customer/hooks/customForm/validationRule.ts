import { IValidRuleType } from './model'

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
export const validPhoneNumber = (inputName: string): IValidRuleType => {
  const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/
  return createValidationRule('validPhoneNumber', `${inputName} is not valid`, (inputValue, formObj) => phoneRegex.test(inputValue))
}
export const validTextNoSpecialCharacters = (inputName: string): IValidRuleType => {
  const specialCharacterRegx = /^[a-zA-Z0-9\s]*$/
  return createValidationRule('validTextNoSpecialCharacters', `Special character not allowed in ${inputName}`, (inputValue, formObj) => specialCharacterRegx.test(inputValue))
}

export function minLengthRule(inputName: string, minCharacters: number): IValidRuleType {
  return createValidationRule('minLength', `${inputName} should contain atleast ${minCharacters} characters`, (inputValue, formObj) => {
    return inputValue.length >= minCharacters
  })
}

export function maxLengthRule(inputName: string, maxCharacters: number): IValidRuleType {
  return createValidationRule('maxLength', `${inputName} cannot contain more than ${maxCharacters} characters`, (inputValue, formObj) => inputValue.length <= maxCharacters)
}

export const TrimWhiteSpace = (inputName: string): IValidRuleType => {
  return createValidationRule('trimWhiteSpace', `White space not allowed in ${inputName}`, (inputValue, formObj) => !!String(inputValue).toLowerCase().match(/^\S*$/))
}
export function addressRequiredRule(inputName: string): IValidRuleType {
  return createValidationRule('required', `${inputName} required`, (inputValue, formObj) => {
    const addressRegex = /^\s*\S+(?:\s+\S+){2}/; // Regular expression for validating address text
    return inputValue && addressRegex.test(inputValue.trim());
  })
}
export const validateEmail = (inputName: string): IValidRuleType => {
  return createValidationRule(
    'validateEmail',
    `${inputName} is not a valid email address`,
    (inputValue, formObj) =>
      !!String(inputValue)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  )
}

export const specialCharacterCheck = (inputName: string): IValidRuleType => {
  return createValidationRule('validateEmail', `Special character not allowed`, (inputValue, formObj) => !/[^a-zA-Z0-9]/.test(inputValue))
}

export const validateEmail2 = (inputName: string): IValidRuleType => {
  return createValidationRule('validateEmail', `${inputName} is not a valid email address`, (inputValue, formObj) => {
    const re = /\S+@\S+\.\S+/
    return re.test(inputName)
  })
}

export const validateLink = (inputName: string): IValidRuleType => {
  return createValidationRule('validateLink', `${inputName} link is not valid`, (inputValue) => {
    if (!inputValue) return true
    return !!String(inputValue)
      .toLowerCase()
      .match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  })
}

export const validateFacebookLink = (inputName: string): IValidRuleType => {
  return createValidationRule('validateLink', `${inputName} link is not valid`, (inputValue) => {
    if (!inputValue) return true
    return !!String(inputValue)
      .toLowerCase()
      .match(/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i)
  })
}

export const validateTwitterLink = (inputName: string): IValidRuleType => {
  return createValidationRule('validateLink', `${inputName} link is not valid`, (inputValue) => {
    if (!inputValue) return true
    return !!String(inputValue)
      .toLowerCase()
      .match(/^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?twitter\.com\/(\w+)$/i)
  })
}

// export const validateInstagramLink = (inputName: string):IValidRuleType => {
//     return createValidationRule(
//         'validateLink',
//         `${inputName} link is not valid`,
//         (inputValue) => {
//             if(!inputValue) return true
//         return !!(String(inputValue).toLowerCase().match(
//             /^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?instagram\.com\/(\w+)$/i))
//         }

//     )
// }
export const validateInstagramLink = (inputName: string): IValidRuleType => {
  return createValidationRule('validateLink', `${inputName} link is not valid`, (inputValue) => {
    if (!inputValue) return true
    return !!String(inputValue)
      .toLowerCase()
      .match(/(?:instagram.com\/)[A-Za-z0-9_.]+/g)
  })
}
