import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import AuthServices from '../../../../api/admin/auth'
import { validateForm } from '../../../../utils/helper'
import { getItem, KEYS, removeItem, setItem } from '../../../../utils/storage'
import { getCookie, setCookie } from '@nft-marketplace/js-cookie'
import actions from '../../../../redux/actions'
import { AppDispatch, RootState } from '../../../../redux/store'
import { ModalService } from '@nft-marketplace/modal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'

import LoginPageWrapper from '../../components/layout/loginWrapper'

import { InputSubmit, LinksAnchor, FormLinks, FormWrapper, InputWrapper, InputFeild, InputIcon, Input, InputError, InputCheckbox, BtnWrapper, PasswordEye } from '../../styled-components/formInputs'

const { loginUser } = actions

const LoginPage = () => {
  const [vaildPassword, setVaildPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const formOG = {
    email: '',
    password: '',
  }
  const formValidation = {
    email: 'email',
    password: 'min:6',
  }
  const [passType, setPassType] = useState<string>('password')
  const [apiError, setApiError] = useState<string>('')
  const [form, setForm] = useState(formOG)
  const [errors, setErrors] = useState<any>({})

  const handleInput = (e: any) => {
    const { name, value } = e?.target
    setErrors({})
    if (vaildPassword) setVaildPassword(false)
    if (name === 'password') {
      setVaildPassword(false)
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

  const adminLogin = () => {
    dispatch(loginUser(form))
      .then((res: any) => {
        if(rememberMe) {
          setItem(KEYS.REMEMBER_ME, form)
        } else {
          localStorage.removeItem(KEYS.REMEMBER_ME)
        }
        if (res?.error?.error?.data?.path?.[0] == 'password') {
          setVaildPassword(true)
          setErrors({})
        } else if (!res?.data?.data && res?.status == 401) {
          setErrors({ blocked: 'Account blocked !' })
          setVaildPassword(false)
          return false
        }
        const { qr } = res?.data?.data
        if (getCookie(KEYS.ADMIN_TOKEN)) {
          router.push('/artwork')
        } else if (qr === null || qr) {
          router.push('/auth/verification')
        } else {
          setVaildPassword(true)
        }
      })
      .catch((err: any) => {
        console.log('Admin Login error ', err)
        setVaildPassword(true)
      })
    // AuthServices.login(form)
    // .then(res => {
    //     if(res?.data?.data?.accessToken?.length) {
    //         setCookie(KEYS.ADMIN_TOKEN, res.data.data.accessToken)
    //         setCookie(KEYS.ADMIN_USER, res.data.data)
    //         router.push('/admin/dashboard')
    //     } else if (res?.error?.response?.data?.error?.code) {
    //         let errCode = res?.error?.response?.data?.error?.code
    //         let errMsg = res?.error?.response?.data?.error?.message
    //         showError(errMsg)
  
    //     } else {
    //         showError('Something went wrong !')
    //     }
    //     // console.log(res?.error)
    //     // console.log(res?.error?.response)
    //     // console.log(res?.error?.response?.data)
    //     // console.log(res?.error?.response?.data?.error)
    // })
    // .catch(err => {
    //     console.log(err?.response)
    //     console.log(err?.response?.error)
    // })
  }

  const handleSubmit = async (e: any) => {
    let result = await validateForm(form, formValidation)
    if (result === true) {
      setErrors({})
      adminLogin()
    } else {
      setErrors(result)
    }
  }

  useEffect(() => {
    if(getItem(KEYS.REMEMBER_ME)) {
      setForm(getItem(KEYS.REMEMBER_ME))
      setRememberMe(true)
    }
  },[])

  return (
    <LoginPageWrapper title={`Sign In`} subTitle={`Welcome back, you've been missed!`}>
      <FormWrapper>
        <InputWrapper>
          <InputFeild>
            <InputIcon className="at-the-rate"></InputIcon>
            <Input type="email" name="email" value={form?.email} onChange={handleInput} placeholder="Your Email" />
          </InputFeild>
          {errors?.email ? <InputError>{errors?.email}</InputError> : null}
        </InputWrapper>
        <InputWrapper>
          <InputFeild>
            <InputIcon className="lock"></InputIcon>
            <Input type={passType} name="password" value={form?.password} onChange={handleInput} placeholder="Password" />
            <PasswordEye onClick={() => setPassType(passType === 'text' ? 'password' : 'text')}>
              <Image src={`/svgs/eye-${passType === 'text' ? 'open' : 'closed'}.svg`} alt={`PasswordEye`} width="22" height="22" />
            </PasswordEye>
          </InputFeild>
          {vaildPassword && <InputError>The email or Password that you've entered is incorrect</InputError>}
          {errors?.blocked ? <InputError>{errors?.blocked}</InputError> : null}
          {errors?.password ? <InputError>{errors?.password}</InputError> : null}
        </InputWrapper>
        <InputWrapper>{apiError ? <InputError>{apiError}</InputError> : null}</InputWrapper>
        <FormLinks>
          <InputCheckbox>
            <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e?.target?.checked)} />
            <LinksAnchor htmlFor='remember'>Remember Me</LinksAnchor>
          </InputCheckbox>
          <Link href="/auth/forgot-password/" passHref>
            <a><LinksAnchor>Forgot Password?</LinksAnchor></a>
          </Link>
        </FormLinks>
        <BtnWrapper>
          <InputSubmit onClick={handleSubmit} onDoubleClick={()=>{}}>Login</InputSubmit>
        </BtnWrapper>
      </FormWrapper>
    </LoginPageWrapper>
  )
}

export default LoginPage
