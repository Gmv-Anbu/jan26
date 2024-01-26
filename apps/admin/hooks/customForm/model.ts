export interface IFormData{
    [index: string]: IFormField
}
export interface IUpdateFormData{
    [index: string]: IUpdateFormField
}
export interface IValidRuleType{
   
    name:string,
    message:string,
    validate:(v:string,f:IFormData)=>boolean
}
export interface IFormField{
    label?:string,
    value?:string,
    type?:string,
    valid?:boolean,
    errorMessage?:string,
    validationRules?:Array<IValidRuleType>
}
export interface IUpdateFormField{
    value:string,
}