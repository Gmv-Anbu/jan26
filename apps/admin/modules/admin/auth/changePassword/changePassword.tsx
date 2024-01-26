import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import AuthServices from '../../../../api/admin/auth';
import { checkPassword, validateForm } from '../../../../utils/helper';
import { AppDispatch, RootState } from '../../../../redux/store';
import { ModalService } from '@nft-marketplace/modal';
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error';
import SuccessModal from '../../shared/modal/success';

import LoginPageWrapper from '../../components/layout/loginWrapper'

import {
  InputSubmit,
  LinksAnchor,
  FormLinks,
  FormWrapper,
  InputWrapper,
  InputFeild,
  InputIcon,
  Input,
  InputError,
  InputCheckbox,
  BtnWrapper,
  PasswordEye,
} from '../../styled-components/formInputs';
import PasswordInput from '../../components/inputElements/passwordInput'

const ChangePasswordPage = () => {

  const [vaildPassword, setVaildPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const formOG = {
    password: '',
    confirmPassword: ''
  }
  const formValidation = {
    password: 'min:6',
    confirmPassword: 'min:6',
  }
  const [apiError, setApiError] = useState<string>('')
  const [form, setForm] = useState(formOG)
  const [errors, setErrors] = useState<any>({})

  const handleInput = (e: any) => {
    const { name, value } = e?.target
    setErrors({})
    if(vaildPassword) setVaildPassword(false)
    if (name === 'password') {
      setVaildPassword(false)
      let valid = checkPassword(value)
      if(!valid) {
        setErrors({password : 'Password requires min 8 character with one uppercase, lowercase, number and a special character'})
      }
    }
    setForm({
      ...form,
      [name]: value,
    })
  }

  const showError = (str: string) => {
    setApiError(str)
    setTimeout(() => setApiError(''), 5000)
  }

  const changeAdminPassword = () => {
    let payload = {
        ...form, 
        token: router?.query?.token
    }
    AuthServices.changePassword(payload)
    .then((res) => {
        if(res?.error === null && res?.data?.message) {
            ModalService.open((modalProps: any) =>
                <SuccessModal title="Success" desc={res?.data?.message || 'Admin Password updated successfully'} close={() => {modalProps.close(); router.push('/auth/login')}} />
            )
        } else {
            ModalService.open((modalProps: any) =>
                <ErrorModal title="Error" desc={'Invalid token !!!'} close={() => {modalProps.close(); router.push('/auth/login')}} />
            )
        }
    })
    .catch((err) => {
        ModalService.open((modalProps: any) =>
            <ErrorModal title="Error" desc={'Invalid token !!!'} close={modalProps.close} />
        )
    });
  }

  const handleSubmit = async (e: any) => {
    let result = await validateForm(form, formValidation)
    let valid = checkPassword(form?.password)
    if(!valid && form?.password?.length) {
      result.password = 'Password requires min 8 character with one uppercase, lowercase, number and a special character'
      // setErrors({})
      // return
    }
    if (result === true) {
        if(form?.password === form?.confirmPassword && form?.password?.length >= 8) {
            setErrors({})
            changeAdminPassword()
        } else {
            setErrors({confirmPassword : 'Confirm Password should be same as new password'})
        }
    } else {
      setErrors(result)
    }
  }

  useEffect(() => {
    if(!router?.query?.token) {
        router.push('/auth/login')
    }
  },[router])

  return (
    <LoginPageWrapper title={`Reset Password`} subTitle={`Fill New Password and Confirm Password field for procceding.`}>
      <FormWrapper>
        <PasswordInput placeholder={`New Password`} value={form?.password} name={`password`} onChange={handleInput} error={errors?.password} />
        <PasswordInput placeholder={`Confirm Password`} value={form?.confirmPassword} name={`confirmPassword`} onChange={handleInput} error={errors?.confirmPassword} />
        {/* <InputWrapper>
          <InputFeild>
            <InputIcon className="lock"></InputIcon>
            <Input type={passType} name="password" value={form?.password} onChange={handleInput} placeholder="Password" />
            <PasswordEye onClick={() => setPassType(passType === 'text' ? 'password' : 'text')}>
              <Image src={`/svgs/eye-${passType === 'text' ? 'open' : 'closed'}.svg`} alt={`PasswordEye`} width="22" height="22" />
            </PasswordEye>
          </InputFeild>
          {vaildPassword && <InputError>The email or Password that you've entered is incorrect</InputError>}
          {errors?.password ? <InputError>{errors?.password}</InputError> : null}
        </InputWrapper> */}
        <InputWrapper>{apiError ? <InputError>{apiError}</InputError> : null}</InputWrapper>
        <BtnWrapper>
          <InputSubmit onClick={handleSubmit} onDoubleClick={()=>{}}>Reset Password</InputSubmit>
        </BtnWrapper>
      </FormWrapper>
    </LoginPageWrapper>
  )
}

export default ChangePasswordPage
