import UserService from '@apps/customer/api/customer/UserService'
import CountryCode from '@apps/customer/components/countryCode/countryCode'
import { Model, useForm, ValidateRule } from '@apps/customer/hooks/customForm'
import SuccessModal from '@apps/customer/modules/customer/shared/modal/SuccessModal'
import { getProfile } from '@apps/customer/redux/reducer/userSlice'
import { AppDispatch, RootState } from '@apps/customer/redux/store'
import { ModalService } from 'libs/modal/src/lib/ModalService'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import LeftArrow from '../../../public/images/customer/home/leftArrow.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { objectDeepClone } from '@apps/customer/utils/helper'

const EditWrapper = styled.div`
  color: black;
  width: 100%;
  height: auto;

  padding: 15rem 7rem 20rem 41rem;
  @media screen and (max-width: 1240px) {
    margin-top: 5rem;
    padding: 10rem 7rem 20rem 35rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: 5rem;
    padding: 10rem 7rem 20rem 22rem;
  }

  @media screen and (max-width: 480px) {
    margin-top: 8rem;
    padding: 4rem 0rem 20rem 0rem;
    margin-left: 0rem;
    width: 100%;
    height: auto;
    padding-bottom: 1rem;
    margin-bottom: 0;
    background: #f4f9f9;
  }
  h1 {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 60rem;
    line-height: 104%;
    text-transform: uppercase;
    color: #1d1d1d;
    margin-bottom: 2rem;
  }
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 90%;

  margin-top: 2rem;
  margin-right: 2rem;
  padding: 0, 0.5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
export const FormDiv = styled.div`
  display: flex;
  width: 80.4%;
  align-items: center;
  padding-top: 2rem;
  margin: 0 auto;
  flex-direction: column;
  .react-tel-input {
    margin-bottom: 1rem;
  }
  @media screen and (max-width: 480px) {
    width: 88%;
  }
  input {
    background: #ffffff;
    border: 1.5px solid #d1e0e2;

    width: 100%;
    height: 6.4rem;
    font-size: 1.6rem;
    padding: 2rem;
    font-weight: 600;
    margin-top: 0.5rem;
    line-height: 16px;
    margin-bottom: 1rem;
    outline: none;
    color: #0e1818;
  }
  label {
    font-size: 1.4rem;
    width: 100%;
    font-weight: 400;
    line-height: 2.4rem;
    text-transform: capitalize;
    letter-spacing: 0rem;
    text-align: left;
    color: #4e4e4e;
  }
  .my-class {
    background: #ffffff;
    border: 1.5px solid #d1e0e2;
    width: 100%;
    height: 6.4rem;
    font-size: 1.6rem;
    padding-left: 6rem;
    padding: 1rem 6rem;
    font-weight: 600;
    line-height: 16px;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    outline: none;
    color: #0e1818;

    @media only screen and (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`

export const BasicInfo = styled.span`
  display: flex;
  button {
    width: 5.7rem;
    height: 3.2rem;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #ffffff;
    background: #2a7575;
    border: none;
    outline: none;
    cursor: pointer;
  }
`
export const Basic = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 104%;
  text-transform: uppercase;
  color: #1d1d1d;
  width: 90%;
  margin-top: 2rem;

  @media screen and (max-width: 430px) {
    width: 90%;
    margin-bottom: 1rem;
    padding-left: 3rem;
    font-size: 24px;
  }
  @media screen and (max-width: 380px) {
    margin-bottom: 3rem;
    padding-left: 3rem;
  }
  @media screen and (max-width: 330px) {
    margin-bottom: 3rem;
    padding-left: 2.5rem;
  }
`
export const IconContainer = styled.div`
  display: flex;
  gap: 0 2rem;
  margin-left: 1rem;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 430px) {
    width: 100%;
    padding-left: 3rem;
  }
  @media screen and (max-width: 380px) {
    margin-bottom: 3rem;
    padding-left: 2rem;
  }
  @media screen and (max-width: 330px) {
    margin-bottom: 3rem;
    padding-left: 1.5rem;
  }
  span {
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.8rem;
    display: flex;
    align-items: center;
    letter-spacing: -0.24px;
    color: #848a8b;
    @media screen and (max-width: 430px) {
      color: #0e1818;
    }
    .img {
      cursor: pointer;
    }
  }
`
export const FormContainer = styled.div`
  // background: #F4F9F9;
  // width:75%;
  // height:57rem;
`
export const ButtonContainer = styled.div`
  width: 92%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  margin-top: 4rem;
  gap: 0 3rem;
  @media screen and (max-width: 780px) {
    width: 100%;
    justify-content: space-around;
    gap: 0 8rem;
  }
  @media screen and (max-width: 430px) {
    gap: 0 2rem;
    padding: 0rem 3rem;
  }
`
export const Button1 = styled.button`
  width: 14.1rem;
  font-style: normal;
  border: none;
  font-weight: 700;
  background: #f4f9f9;
  font-size: 1.8rem;
  line-height: 1.8rem;
  color: #2a7575;
  height: 5rem;
  border: 1px solid #2a7575;
  cursor: pointer;
  @media screen and (max-width: 430px) {
    width: 50%;
    height: 6.1rem;
  }
`
export const Button2 = styled.button`
  background: #2a7575;
  width: 14.1rem;
  outline: none;
  cursor: pointer;
  font-family: 'Proxima Nova';
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;

  color: #ffffff;
  height: 5rem;
  @media screen and (max-width: 430px) {
    width: 50%;
    height: 6.1rem;
  }
`

export const ProfileButton = styled.button`
  width: 14.1rem;
  outline: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
  height: 5rem;
  @media screen and (max-width: 430px) {
    width: 50%;
    height: 6.1rem;
  }
  &.greenBtn {
    color: #ffffff;
    border: none;
    background: #2a7575;
  }
  &.whiteBtn {
    color: #2a7575;
    background: #ffffff;
    border: 1px solid #2a7575;
  }
`

export const FormEdit = styled.div`
  background: #f4f9f9;
  width: 75%;
  height: auto;
  padding-top: 4rem;
  padding-bottom: 5rem;
  @media screen and (max-width: 780px) {
    width: 80%;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
    padding-top: 0rem;
    margin-top: -2rem;
  }
`
export const ErrorMsg = styled.div`
  font-size: 1.4rem;
  color: red;
  width: 100%;
  display: flex;
`
const ErrorMessage = styled.p`
  color: red;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: -1rem;
  align-self: flex-start;
`
// export const ErrorMsg1 = styled.div`
//   font-size: 10rem;
//   color: red;
//   width: 100%;
//   margin-left: 10rem;
//   margin-top: 1rem;
//   display: flex;
// `
const SettingFormData: Model.IFormData = {
  firstName: {
    label: 'First Name',
    validationRules: [ValidateRule.requiredRule('First Name'), ValidateRule.minLengthRule('First Name', 3), ValidateRule.maxLengthRule('First Name', 25), ValidateRule.validTextNoSpecialCharacters('First Name')],
  },
  lastName: {
    label: 'Last Name',
    validationRules: [ValidateRule.requiredRule('Last Name'), ValidateRule.minLengthRule('Last Name', 3), ValidateRule.maxLengthRule('Last Name', 25), ValidateRule.validTextNoSpecialCharacters('Last Name')],
  },
  userName: {
    label: 'Username*',
    value: '',
    validationRules: [ValidateRule.requiredRule('Username'), ValidateRule.minLengthRule('Username', 4), ValidateRule.maxLengthRule('Username', 25), ValidateRule.validTextNoSpecialCharacters('Username')],
  },
  countryCode: {},
  phone: {
    label: 'Phone',
    value:'',
    validationRules: [ValidateRule.requiredRule('phone'), ValidateRule.validPhoneNumber('phone')],
  },
  email: {
    label: 'Email address',
     value:'',
    validationRules: [ValidateRule.requiredRule('Email ID'), ValidateRule.validateEmail('Email ID')],
  },
}
const EditProfile = () => {
  const { isFormValid, form, updateForm, onInputChange } = useForm(SettingFormData)
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const userData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumWithoutDialCode, setPhoneNumWithoutDialCode] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [userDetails, setUserDetails] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [mobileError, setMobileError] = useState('')
  const openModal = () => setShowModal(true)

  const handleOnChange = (value, country) => {
    const phoneNumWithoutDialCode = value.split(country.dialCode)[1]
    setCountryCode(country?.dialCode || '')
    let val = objectDeepClone(value)
    if(country?.dialCode !== countryCode || countryCode == '') {
      setPhoneNumWithoutDialCode('')
      val = country?.dialCode
    } else {
      setPhoneNumWithoutDialCode(phoneNumWithoutDialCode)
    }
    const updatedForm = {
      ...form,
      phone: {
        ...form.phone,
        value: val,
      },
      countryCode: {
        ...form.countryCode,
        value: `+${countryCode}`,
      },
    }

    updateForm(updatedForm)
    if (!value) {
      setMobileError('Please enter your mobile number')
    } else if (value) {
      const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/
      if (phoneRegex.test(value)) {
        setMobileError('')
      } else {
        setMobileError('Invalid Mobile Number')
      }
    } else {
      setMobileError('')
    }
  }

  const handleUser = useCallback(async () => {
    // if (userName !== undefined) {
    //API call to get user data
    let token = JSON.parse(localStorage.getItem('user'))?.accessToken
    await UserService.getProfile(token)
    .then((response: any) => {
      setPhoneNumber(response?.data?.phone)
      if (response?.data) {
        setUserDetails(response?.data)
        let formatedData = {}
        Object.entries(response.data).forEach(([key, value]) => {
          if(key === 'userName' || key === 'email' || key === 'phone' || key === 'countryCode' || key === 'firstName' || key === 'lastName') {
            formatedData[key] = { label: key, value: key == 'phone' ? response.data.countryCode + ' ' + value : value || '' }
          }
        })
        updateForm(formatedData)
        //User data as per different profiles
        if (response?.data?.id === userData?.id) {
          // setUserDetails(profileData)
          setEdit(true)
        } else {
          setEdit(false)
        }
        // getActivityData(response?.data?.data?.id, 1)
        // getCollectedNFT(currentPage, response?.data?.data?.id)
      }
    })
  }, [userData]) //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleUser()
  }, [handleUser])

  useEffect(() => {
    console.log('userData', userData)
    updateForm({
      // firstName: {
      //   value: userData?.firstName || '',
      // },
      userName: {
        value: userData?.userName || '',
      },
      countryCode: {
        value: userData?.countryCode || '',
      },
      phone: {
        value: countryCode + userData?.phone || '',
      },
      email: {
        value: userData?.email || '',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const updateProfile = async () => {
    let result = await isFormValid()
    // console.log('result', result, form)
    if (form?.userName?.valid && form?.email?.valid && form?.firstName?.valid && form?.lastName?.valid && form?.phone.value?.length > 8) {
      const data = {
        firstName: form?.firstName?.value || '',
        lastName: form?.lastName?.value || '',
        userName: form?.userName?.value || '',
        countryCode: form?.countryCode?.value || '',
        phone: phoneNumWithoutDialCode || form?.phone.value.split(' ')[1] || '',
        email: form?.email?.value || '',
      }
      const res = await UserService.updateProfile(data)
      if (res.status == 200) {
        openModal()
        ModalService.open((modalProps) => 
          <SuccessModal 
            close={() => {
              modalProps.close()
            }} 
            desc="Successfully profile updated" />
        )
        backBtnHandler()
      } else if (res.status == 401 || res.status == 404 || res.status == 412 || res.status == 500) {
        toast.error(res?.error?.error?.message, {
          toastId: 'ErrorToast',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            fontSize: '1.6rem',
          },
        })
      }  
      // else {
      //   toast.error('Something went wrong.Please try again!', {
      //     toastId: 'WentWrongErrorToast',
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 3000,
      //     style: {
      //       fontSize: '1.6rem',
      //     },
      //   })
      // }
    } else if(form.countryCode.value === '+') {
      setMobileError('Please enter your mobile number')
    }
  }

  const backBtnHandler = () => {
    router.push('/base/myProfile')
    return
  }

  const onKeyDown = (e) => {
    if(e?.code === 'Enter') {
      updateProfile()
    }
  }

  return (
    <EditWrapper>
      <IconContainer onClick={backBtnHandler}>
        <Image className="img" src={LeftArrow}></Image>
        <span>Edit Profile</span>
      </IconContainer>
      <FormContainer>
        <FormContent>
          <BasicInfo>
            <Basic>Basic Info</Basic>
          </BasicInfo>
          <FormEdit>
            <form onSubmit={(e) => {
              e.preventDefault()
            }}>
              {['firstName', 'lastName', 'userName', 'email'].map((eachItem, i) => (
                <>
                  <FormDiv key={eachItem + i}>
                    {eachItem == 'email' ? <label>Email Address</label> : <label htmlFor={eachItem}>{form?.[eachItem]?.label}</label>}
                    {/* {eachItem == 'phone' ? (
                      <CountryCode value={form.phone.value} onChange={(value, country) => handleOnChange(value, country)} inputClass="my-class" />
                    ) : ( */}
                    <input type="text" id={eachItem + i} readOnly={eachItem == 'email'} name={eachItem} value={form?.[eachItem]?.value || ''} onChange={(e) => onInputChange(e)} />
                    {/* )} */}
                    {!form[eachItem].valid && <ErrorMsg>{form[eachItem]?.errorMessage}</ErrorMsg>}
                  </FormDiv>
                </>
              ))}
              <FormDiv key={'phone'}>
                <label>Mobile number</label>
                <CountryCode value={form?.phone?.value || ''} onKeyDown={onKeyDown} onChange={(value, country) => handleOnChange(value, country)} inputClass="my-class" />
                {mobileError && <ErrorMsg>{mobileError}</ErrorMsg>}
              </FormDiv>
              <ButtonContainer>
                <ProfileButton className="greenBtn" onClick={updateProfile}>
                  Update
                </ProfileButton>
                <ProfileButton
                  className="whiteBtn"
                  onClick={() => {
                    router.push('/base/myProfile')
                  }}
                >
                  Cancel
                </ProfileButton>
              </ButtonContainer>
            </form>
          </FormEdit>
        </FormContent>
      </FormContainer>
    </EditWrapper>
  )
}

export default EditProfile
