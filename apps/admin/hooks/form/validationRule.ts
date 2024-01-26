import { IFormObjectType } from "./useForm";

export interface IValidRuleType{
    name:string,
    message:string,
    validate:(v:string,f:IFormObjectType)=>boolean
}
function createValidationRule(ruleName: string, errorMessage: string, validateFunc: (inputValue: string, formObj?: object) => boolean) {
    return {
        name: ruleName,
        message: errorMessage,
        validate: validateFunc,
    };
}

export function requiredRule(inputName: string):IValidRuleType {
    return createValidationRule(
        'required',
        `${inputName} required`,
        (inputValue, formObj) => inputValue.length !== 0
    );
}

export function minLengthRule(inputName: string, minCharacters: number):IValidRuleType {
    return createValidationRule(
        'minLength',
        `${inputName} should contain atleast ${minCharacters} characters`,
        (inputValue, formObj) => inputValue.length >= minCharacters
    );
}

export function maxLengthRule(inputName: string, maxCharacters: number):IValidRuleType {
    return createValidationRule(
        'maxLength',
        `${inputName} cannot contain more than ${maxCharacters} characters`,
        (inputValue, formObj) => inputValue.length <= maxCharacters
    );
}

export const validateEmail = (inputName: string):IValidRuleType => {
    return createValidationRule(
        'validateEmail',
        `${inputName} is not a valid email address`,
        (inputValue, formObj) => !!(String(inputValue).toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    );
}