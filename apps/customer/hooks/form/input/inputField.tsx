import React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps{
  show:boolean
}
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 15px;
`;
const Label = styled.label`
  margin: 0 0 6px 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.fontcolor};
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
`;
const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.secondary};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  box-sizing: border-box;
  margin: 0.5rem 0 1rem 0;
  border-radius: 0.75rem;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  color:${({theme})=>theme.colors.textInput};
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;

`;
const ErrorMessage = styled.span<ErrorMessageProps>`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  visibility: ${({ show }) => (show)?'show':'hidden' };
  height:1rem;
`;
type AppProps = {
  label: string,
  type: string,
  name: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  errorMessage: string,
  isValid: boolean,
  value: string,
};
export default function InputField({
  label,
  type,
  name,
  handleChange,
  errorMessage,
  isValid,
  value,
}:AppProps):JSX.Element {
  return (
    <FormItem>
      <Label>{label}</Label>
      <Input type={type} name={name} value={value} onChange={handleChange} />
      <ErrorMessage show={!!(errorMessage && !isValid)} >{errorMessage}</ErrorMessage>
    </FormItem>
  )
}
