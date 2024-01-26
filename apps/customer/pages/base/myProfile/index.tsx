import UserService from '@apps/customer/api/customer/UserService'
import { Model, useForm, ValidateRule } from '@apps/customer/hooks/customForm'
import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'
import { AppDispatch, RootState } from '@apps/customer/redux/store'
import { ModalService } from '@nft-marketplace/modal'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import PlusImg from '../../../public/images/customer/home/Plus.svg'
import EditImg from '../../../public/images/customer/home/edit.svg';
import snsWebSdk from '@sumsub/websdk';
import Loader from '@apps/customer/modules/shared/components/Loader'
import AddCompanyModal from '@apps/customer/components/FormModal/addCompanyModal'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import API from '@apps/customer/api/customer'

const ProfileContainer = styled.div`
  color: black;
  width: 100%;
  height: auto;
  padding: 18rem 7rem 20rem 13rem;
  @media screen and (max-width: 1350px) {
    padding: 0 0 20rem 0;
    margin: 18rem auto;
    max-width: 82%;
  }
  @media screen and (max-width: 850px) {
    max-width: 90%;
  }
  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    padding: 0;
    margin-bottom: 10rem;
    margin: 0 auto;
    max-width: 100%;
  }
  @media screen and (max-width: 480px) {
    padding: 4rem 0rem 20rem 0rem;
    margin-left: 0rem;
    width: 100%;
    height: auto;
    padding-bottom: 1rem;
    margin-bottom: 0;
    background: #f4f9f9;
  }
  h1 {
    // font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 60px;
    line-height: 104%;
    text-transform: uppercase;
    color: #1d1d1d;
    margin-bottom: 2rem;
    @media screen and (max-width: 600px) {
      margin-top: 10rem;
      margin-left: 3rem;
      font-size: 3rem;
    }
    @media screen and (max-width: 375px) {
      margin-left: 2rem;
      font-size: 3.5rem;
    }
  }
`
const Container = styled.div`
  background: #f4f9f9;
  width: 90%;
  height: auto;
  padding-top: 10rem;
  display: flex;
  padding-bottom: 5rem;
  @media screen and (max-width: 1350px) {
    width: 100%;
  }
  @media screen and (max-width: 780px) {
    height: auto;
    display: flex;
    padding-top: 0;
    flex-direction: column;
  }
  @media screen and (max-width: 550px) {
    margin-left: 0;
    width: 100%;
    height: auto;
  }
  @media screen and (max-width: 375px) {
    margin-left: 0;
  }
`
const Imgdiv = styled.div`
  width: 180px;
  height: 180px;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 11rem;
  border-radius: 50%;
  position: relative;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  &.active {
    border: 7px solid white;
  }
  @media screen and (max-width: 780px) {
    width: 140px;
    height: 140px;
    min-width: 140px;
    display: flex;
    align-items: center;
    margin-left: 0;
    justify-content: center;
  }
  .img {
    all: revert;
    border-radius: 50%;
  }
`
const Kyc = styled.div`
  border: 0.5px solid #d1e0e2;
  width: 85%;
  margin-top: 4rem;
  padding: 16px;
  margin-left: 6rem;
  margin-right: 12rem;
  @media screen and (max-width: 600px) {
    margin-left: 2rem;
    width: 70%;
    margin-right: 2rem;
  }
  h5 {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    color: #0E1818;
  }
`
const StatusBar = styled.div`
  width: 100%;
  height: 6px;
  background: #F0C9C9;
  border-radius: 28px;
  margin: 15px 0;
  &:before {
    content: '';
    height: 6px;
    display: block;
    border-radius: 28px;
    width: 100%;
  }
  &.red-bar:before {
    background: #FF5555;
    width: 80%;
  }
  &.green-bar:before {
    background: #2A7575;
  }
`
const Status = styled.div`
   {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 12px;
      color: #21393A;
    }
    span {
      font-size: 12px;
      font-weight: 700;
      line-height: 13px;  
      color: #2A7575;
      text-decoration: underline;
    }
    .no-u {
      text-decoration: auto;
    }
  }
`
const Icon = styled.div`
  position: absolute;
  top: 80%;
  right: 10%;
  cursor: pointer;
  background: #2a7575;
  box-shadow: inset 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  width: 3rem;
  height: 3rem;
  @media screen and (max-width: 780px) {
    top: 75%;
    right: 0%;
  }
  @media screen and (max-width: 600px) {
    top: 70%;
    right: 0%;
  }

  input {
    z-index: 1;
  }
`
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  :last-child {
    margin-bottom: 0;
  }
`
export const FormDiv = styled.form`
  display: flex;
  width: 80%;
  align-items: center;
  border-bottom: 1px solid #d1e0e2;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
    width: 98%;
  }
  input {
    background: transparent;
    border: transparent;

    width: 50%;
    height: 4rem;
    padding: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    outline: none;
    padding-left: 6rem;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #0e1818;
    @media screen and (max-width: 1350px) {
      font-size: 1.6rem;
    }
    @media screen and (max-width: 600px) {
      padding: 0;
      height: 3.4rem;
      margin-bottom: 0.3rem;
      font-size: 1.4rem;
      padding-left: 0rem;
    }
  }
  label {
    font-style: normal;
    font-size: 1.4rem;
    width: 50%;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
    text-transform: capitalize;
    color: #7c7c7c;
    @media screen and (max-width: 1350px) {
      font-size: 1.3rem;
    }
    @media screen and (max-width: 600px) {
      font-size: 1.4rem;
    }
  }
`
export const FormPassword = styled.form`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d1e0e2;
  width: 80%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    background: transparent;
    border: transparent;

    width: 50%;
    font-size: 2rem;
    height: 4rem;
    padding: 2rem;
    padding-left: 6rem;
    padding-top: 2.6rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    outline: none;
    color: #0e1818;
    @media screen and (max-width: 1350px) {
      font-size: 1.8rem;
    }
    @media screen and (max-width: 600px) {
      padding: 0;
      font-size: 1.6rem;
      height: auto;
    }
  }
  label {
    font-family: Poppins;
    font-size: 1.4rem;
    width: 50%;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
    color: #7c7c7c;
    @media screen and (max-width: 1350px) {
      font-size: 1.3rem;
    }
    @media screen and (max-width: 600px) {
      font-size: 1.4rem;
    }
  }
`
export const Addressline = styled.div`
  display: flex;
  width: 52%;
  flex-direction: column;
  margin-bottom: 1.5rem;
  padding-left: 8rem;
  span {
    word-break: break-word;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 0.5rem;
    padding-left: 0rem;
  }
  span:first-child {
    margin-top: 2.7rem;
    @media screen and (max-width: 600px) {
      margin-top: 0rem;
    }
  }
  span:last-child {
    @media screen and (max-width: 600px) {
      margin-bottom: 0.5rem;
    }
  }
  span {
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    /* margin-bottom: 0.6rem; */
    margin-bottom: 0.3rem;
    line-height: 1.9rem;
    color: #0e1818;
  }
`

export const AddressHead = styled.div`
  span {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    width: 48%;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 6.7rem;
    color: #7c7c7c;
    @media screen and (max-width: 1350px) {
      font-size: 1.6rem;
    }
    @media screen and (max-width: 600px) {
      line-height: 3.7rem;
    }
  }
`
export const AddressShipping = styled.div`
  span {
    margin-top: 0.5rem;
    margin-bottom: 1rem;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 6.7rem;
    color: #7c7c7c;
    @media screen and (max-width: 1350px) {
      font-size: 1.3rem;
    }

    @media screen and (max-width: 600px) {
      line-height: 3.7rem;
    }
  }
`
export const AddressContent = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d1e0e2;
  width: 80%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 2rem;
    width: 98%;
  }
`

export const ErrorMsg = styled.div`
  font-size: 10px;
  color: red;
`
export const ProContent = styled.div`
  width: 30%;
  @media screen and (max-width: 780px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem 3rem 7rem;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    padding: 3rem;
  }
`
export const Basic = styled.span`
  // font-family: 'Proxima Nova';
  font-style: normal;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 29px;
  width: 90%;
  color: #0e1818;
  @media screen and (max-width: 1350px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 480px) {
    text-transform: uppercase;
    font-weight: 400;
    padding-bottom: 2rem;
  }
`
export const Address = styled.span`
  // font-family: 'Proxima Nova';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  width: 83%;
  color: #0e1818;
  @media screen and (max-width: 1350px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 480px) {
    text-transform: uppercase;
    font-weight: 400;
    padding-bottom: 2rem;
  }
`
export const Account = styled.span`
  // font-family: 'Proxima Nova';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  width: 90%;
  color: #0e1818;
  @media screen and (max-width: 1350px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 480px) {
    text-transform: uppercase;
    font-weight: 400;
    padding-bottom: 2rem;
  }
`
export const Bar = styled.span`
  width: 1px;
  background: #d1e0e2;
  display: flex;
  margin-left: 7.5rem;
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 88%;
    height: 1px;
    margin: 4rem 3rem 2.5rem 3rem;
  }
`
export const FormContainer = styled.div`
  width: 100%;
  padding: 0 5rem;
`
export const BasicInfo = styled.span`
  display: flex;
  justify-content: space-between;
  button {
    width: 5.7rem;
    height: 3.2rem;
    // font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    background: #2a7575;
    border: none;
    outline: none;
    cursor: pointer;
    @media screen and (max-width: 1350px) {
      font-size: 1.3rem;
    }
  }
`
export const PasswordInfo = styled.span`
  display: flex;
  justify-content: space-between;
  button {
    width: 5.7rem;
    height: 3.2rem;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    background: #2a7575;
    border: none;
    outline: none;
    cursor: pointer;
    @media screen and (max-width: 1350px) {
      font-size: 1.3rem;
    }
  }
`
const CompanyList = styled.div`
margin-top: 15px;
  table {
    width: 100%;
    tr {
      margin-bottom: 4px;
    }
    td, th {
      text-align: left;
      font-size: 14px;
      padding: 4px 0;
    }
  }
`
export const AddressInfo = styled.span`
  display: flex;
  justify-content: space-between;
  .d-flex {
    display: flex;
  }
  button {
    width: 5.7rem;
    height: 3.2rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #ffffff;
    background: #2a7575;
    border: none;
    outline: none;
    cursor: pointer;
    @media screen and (max-width: 1350px) {
      font-size: 1.3rem;
    }
    &.not-allowed {
      cursor: not-allowed;
    }
  }
`

export const Plus = styled.div`
  margin-right: 1rem;
  span {
    display: inline-block;
    width: 5.7rem;
    height: 3.2rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #2a7575;
    background: #f4f9f9;
    border: 1px solid #2a7575;
    outline: none;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    line-height: 3.2rem;
    @media screen and (max-width: 780px) {
      font-size: 1.2rem;
    }
  }
  &.not-allowed span {
    cursor: not-allowed;
  }
`

export const AddressContainer = styled.div`
  margin-bottom: 3rem;
`
export const PasswordContainer = styled.div`
  margin-bottom: 3rem;
`
export const GoToProfile = styled.button`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    background: #2a7575;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 5px 10px;
`

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
    label: 'Username',
    validationRules: [ValidateRule.requiredRule('Username'), ValidateRule.minLengthRule('Username', 3), ValidateRule.maxLengthRule('Username', 25), ValidateRule.validTextNoSpecialCharacters('Username')],
  },
  email: {
    label: 'Email address',
    validationRules: [ValidateRule.requiredRule('Email ID'), ValidateRule.validateEmail('Email ID')],
  },
  phone: {
    label: 'Phone',
    validationRules: [ValidateRule.requiredRule('phoneNumber'), ValidateRule.minLengthRule('phoneNumber', 10), ValidateRule.maxLengthRule('phoneNumber', 10), ValidateRule.validPhoneNumber('phoneNumber')],
  },
  PrimaryResidential: {
    label: ' PrimaryResidential',
    validationRules: [ValidateRule.requiredRule('Address'), ValidateRule.addressRequiredRule('Address')],
  },
  PrimaryShipping: {
    label: ' PrimaryShipping',
    validationRules: [ValidateRule.requiredRule('Address'), ValidateRule.addressRequiredRule('Address')],
  },
  PrimaryBilling: {
    label: 'PrimaryBilling',
    validationRules: [ValidateRule.requiredRule('Address'), ValidateRule.addressRequiredRule('Address')],
  },
  Password: {
    label: 'Password',
  },
}

const myProfile = () => {

  const fileInput = useRef<HTMLInputElement>(null)
  const [loader, setLoader] = useState<boolean>(false)
  const { isFormValid, form, updateForm, onInputChange } = useForm(SettingFormData)
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [userDetails, setUserDetails] = useState(null)
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const { userName } = router.query
  const [show404Page, setShow404Page] = useState(false)
  const [residential, setResidential] = useState<any>(null)
  const [shipping, setShipping] = useState<any>(null)
  const [billing, setBilling] = useState<any>(null)
  const [showAddEditButton, setShowAddEditButton] = useState(false)
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [accessTkn, setAccessTkn] = useState('');
  const [snsWebSdkInstance, setsnsWebSdkInstance] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [rapydData, setRapydData] = useState(null);

  console.log('form', form)

  const closeCompanyModal = (close, val) => {
    close()
    if(val) getCompanies()
  }

  const openAddCompanyModal = () => {
    ModalService.open((modalProps: any) => 
      <AddCompanyModal close={(val) => closeCompanyModal(modalProps.close, val)} />, 
      { closeIcon: false, height: 'inherit',  }
    )
  }

  const editProfile = () => {
    router.push('/base/editProfile')
    return
  }
  const addressChange = (val) => {
    router.push(`/base/addressBook${val}`)
    return
  }
  const passwordChange = () => {
    router.push('/base/passwordUpdate')
    return
  }

  const handleUser = useCallback(async () => {
    let token = JSON.parse(localStorage.getItem('user'))?.accessToken
    await UserService.getProfile(token).then((response: any) => {
      if (response?.data) {
        console.log('response?.data', response?.data)
        setUserDetails(response?.data)
        let formatedData = {}
        Object.entries(response.data).forEach(([key, value]) => {
          if(key === 'phone' && value && response?.data?.countryCode) {
            value = response?.data?.countryCode + ' ' + value
          } else if (key === 'phone') {
            value = ''
          } 
          formatedData[key] = { label: key, value: value || '' }
        })
        updateForm({
          ...formatedData,
          profilePic: {
            value: response?.data?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${response?.data?.profilePicUrl}` : '',
          },
        })

        if (response?.data?.id === profileData?.id) {
          setEdit(true)
        } else {
          setEdit(false)
        }
      }
    })
  }, [profileData, userName]) //eslint-disable-line react-hooks/exhaustive-deps

  const handleGetAddress = async () => {
    try {
      const fetchData = async () => {
        const fetchedUsers = await UserService.getAddress()
        const addressData = fetchedUsers?.data?.data

        setResidential(addressData?.find((item) => item.addressType === 'PRIMARY_RESIDENTIAL'))
        setShipping(addressData?.find((item) => item.addressType === 'PRIMARY_SHIPPING'))
        setBilling(addressData?.find((item) => item.addressType === 'PRIMARY_BILLING'))
        if (addressData?.length !== 0) {
          setShowAddEditButton(true)
        }
        if (addressData?.length >= 3) {
          setShowAddBtn(false)
        }
      }

      if (typeof window !== 'undefined') {
        fetchData()
      }
    } catch (error) { }
  }

  // useEffect(() => {
  //   if(router?.asPath.includes('#addCompany')) {
  //     let el = document.getElementById('company')
  //     if(el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", }), 1500)
  //   }
  // },[router])

  const initiateKyc = () => {
    setShowProfileDetails(true);
    setTimeout(() => launchWebSdk(accessTkn), 100)
  }

  const closeKyc = () => {
    setShowProfileDetails(false);
    snsWebSdkInstance.destroy();
  }

  const checkKycStatus = () => {

  }

  const launchWebSdk = (accessToken: string) => {
    setsnsWebSdkInstance(snsWebSdk.init(
      accessToken,
      // token update callback, must return Promise
      // Access token expired
      // get a new one and pass it to the callback to re-initiate the WebSDK
      () => getKycDetails()
    )
      .withConf({
        lang: 'en', //language of WebSDK texts and comments (ISO 639-1 format)
        uiConf: {
          customCss: "https://url.com/styles.css"
          // URL to css file in case you need change it dynamically from the code
          // the similar setting at Customizations tab will rewrite customCss
          // you may also use to pass string with plain styles `customCssStr:`
        },
      })
      .withOptions({ addViewportTag: false, adaptIframeHeight: true })
      // see below what kind of messages WebSDK generates
      .on('idCheck.stepCompleted', (payload) => {
        console.log('idCheck.stepCompleted', payload)
      })
      .on('idCheck.onError', (error) => {
        console.log('idCheck.onError', error)
      })
      .onMessage((type, payload) => {
        console.log('onMessage', type, payload);
        if (type == 'idCheck.onApplicantLoaded') {
          if(form?.['kycStatus']?.value === 'Pending') {
            UserService.getKycSubmissionDetails(payload)
            .then((res) => {
              console.log('onRes', res);
            })
          } else {
            UserService.restartKYC(payload)
            .then((res) => {
              console.log('onRes', res);
            })
          }
        }
      })
      .build());
    // you are ready to go:
    // just launch the WebSDK by providing the container element for it


  }

  const getCompanies = async () => {
    const res = await API.getCompanies();
    console.log("ressss", res);
    setCompanies(res?.data?.data?.companies || [])
  }

  const getKycDetails = async () => {
    const res = await UserService.getKycStatus();
    console.log("ressss", res);
    return res['data']['data']['token'];
  }

  const initialGetKycDetails = async () => {
    const res = await UserService.getKycStatus();
    // launchWebSdk(res['data']['data']['token'])
    if(res?.data?.data?.token) {
      setAccessTkn(res?.data?.data?.token);
      checkKycStatus();
    }
  }

  const fileUploadCoverPicHandler = async (e: any) => {
    setLoader(true)
    const fileType = e.target.files?.[0]?.type
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png']
    if (validExtensions.includes(fileType)) {
      const res: any = await UserService.updateProfileImage(e.target.files?.[0])
      updateForm({
        ...form,
        profilePic: {
          value: res?.data?.data.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${res?.data?.data.profilePicUrl}` : '',
        },
      })
      setLoader(false)
    } else {
      setLoader(false)
      ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc="Upload a valid image file (png,jpg.jpeg)" />)
    }
  }

  const getRapydStatus = () => {
    API.getRapydCardStatus()
    .then(res => {
      console.log('getRapydStatus res', res)
      setPaymentVerified(res?.data?.data?.paymentVerified)
    })
    .catch(err => {
      console.log('getRapydStatus errr', err)
    })
  }

  const verifyCardRapyd = () => {
    API.postRapydVerifyCard()
    .then(res => {
      console.log('verifyCardRapyd res', res)
      if(res?.data?.data?.data) {
        setRapydData(res?.data?.data?.data)
        router.push(res?.data?.data?.data?.redirect_url)
      }
    })
    .catch(err => {
      console.log('verifyCardRapyd errr', err)
    })
  }

  useEffect(() => {
    getCompanies()
    getRapydStatus()
    handleGetAddress();
    initialGetKycDetails();
  }, [])

  useEffect(() => {
    handleUser();
  }, [handleUser])

  useEffect(() => {
    if (snsWebSdkInstance) {
      snsWebSdkInstance.launch('#sumsub-websdk-container');
    }
  }, [snsWebSdkInstance])

  return (
    <ProfileContainer>
      <h1>My profile</h1>
      {showProfileDetails ?
        (
          <>
            <GoToProfile onClick={() => { closeKyc() }}>Go To Profile Details</GoToProfile>
            <div id="sumsub-websdk-container"></div>

          </>
        )
        : (<Container>
          <ProContent>
            <Imgdiv className={form?.profilePic?.value ? 'active' : ''}>
              {loader 
              ? <Loader />
              :  <Image className="img" src={form?.profilePic?.value || '/images/customer/profile-placeholder.png'} height={180} width={180}></Image>}
              <Icon
                onClick={() => {
                  if (null !== fileInput?.current) fileInput?.current?.click()
                }}
              >
                
                <input type="file" hidden ref={fileInput} onChange={fileUploadCoverPicHandler} value="" disabled={loader ? true : false} />
                <Image className="img" src={'/images/customer/home/camera.svg'} height={30} width={30}></Image>
              </Icon>
            </Imgdiv>

            {(form?.['kycStatus']?.value == 'Pending' || form?.['kycStatus']?.value == 'Rejected') && (
              <Kyc className='cursor-pointer' onClick={() => {
                initiateKyc();
              }}>
                <h5>Identity Verification</h5>
                {form?.['kycStatus']?.value == 'Rejected' &&  <StatusBar className='red-bar'></StatusBar>}
                {form?.['kycStatus']?.value == 'Pending' && <StatusBar className='red-bar'></StatusBar>}
                <Status>
                  <p>80%</p>{(form?.['kycStatus']?.value == 'Pending' || form?.['kycStatus']?.value == 'Rejected') && <span className='cursor-pointer' >Complete Now to Bid</span>}
                </Status>
              </Kyc>
            )}
            {(form?.['kycStatus']?.value != 'Pending' && form?.['kycStatus']?.value != 'Rejected') &&
              (
                <Kyc>
                  <h5>Identity Verification</h5>
                  {form?.['kycStatus']?.value == 'Completed' && <StatusBar className='green-bar'></StatusBar>}
                  <Status>
                    <p>100%</p><span className='no-u'>{form?.['kycStatus']?.value}</span>
                  </Status>
                </Kyc>
              )
            }
              <Kyc className={!paymentVerified ? 'cursor-pointer' : ''} onClick={() => !paymentVerified ? verifyCardRapyd() : {}}>
                <h5>Payment Verfication</h5>
                {paymentVerified ? <StatusBar className='green-bar'></StatusBar> : <StatusBar className='red-bar'></StatusBar>}
                <Status>
                  <p>{paymentVerified ? '100' : '80'}%</p>
                  <span className='no-u'>{paymentVerified ? 'Completed' : 'Pending'}</span>
                </Status>
              </Kyc>
          </ProContent>
          <Bar>
            <span></span>
          </Bar>
          <FormContainer>
            <FormContent>
              {/* <BasicInfo>
            <Basic>Basic Info</Basic>

            <button onClick={editProfile}>
              <Image className="img" src={EditImg}></Image> Edit
            </button>
          </BasicInfo> */}
              <BasicInfo>
                <Basic>Basic Info</Basic>
                <button onClick={editProfile}>
                  <Image className="img" src={EditImg}></Image> Edit
                </button>
              </BasicInfo>
              {['firstName', 'lastName', 'userName', 'email', 'phone'].map((eachItem, i) => (
                <>
                  <FormDiv key={eachItem + i}>
                    {eachItem == 'email' ? <label>Email Address</label> : <label htmlFor={eachItem}>{form?.[eachItem]?.label}</label>}
                    <input readOnly={!edit} type="text" id={eachItem + i} name={eachItem} value={form?.[eachItem]?.value || ''} onChange={(e) => onInputChange(e)} />

                    {/* {!form[eachItem].valid && <ErrorMsg>{form[eachItem]?.errorMessage}</ErrorMsg>} */}
                  </FormDiv>
                </>
              ))}
            </FormContent>
            <AddressContainer>
              <FormContent>
                <AddressInfo>
                  <Address>Address Book</Address>
                  <div className='d-flex'>
                    <Plus className={showAddBtn ? '' : 'not-allowed'}>
                      <span onClick={() => showAddBtn ? addressChange('?add=true') : {}}>
                        <Image className="img" src={PlusImg}></Image> Add
                      </span>
                    </Plus>
                    <button className={showAddEditButton ? '' : 'not-allowed'} disabled={!showAddEditButton} onClick={() => addressChange('')}>
                      <Image className="img" src={EditImg}></Image> Edit
                    </button>
                  </div>
                </AddressInfo>

                <>
                  {residential && (
                    <AddressContent>
                      <AddressHead>
                        <span>PRIMARY RESIDENTIAL</span>
                      </AddressHead>
                      <Addressline>
                        <span>{residential.buildingName}</span>
                        <span>{residential.addressLine2}</span>
                        <span>{residential.country}</span>
                      </Addressline>
                    </AddressContent>
                  )}
                  {shipping && (
                    <AddressContent>
                      <AddressShipping>
                        <span>PRIMARY SHIPPING</span>
                      </AddressShipping>
                      <Addressline>
                        <span>{shipping.buildingName}</span>
                        <span>{shipping.addressLine2}</span>
                        <span>{shipping.country}</span>
                      </Addressline>
                    </AddressContent>
                  )}
                  {billing && (
                    <AddressContent>
                      <AddressHead>
                        <span>PRIMARY BILLING</span>
                      </AddressHead>
                      <Addressline>
                        <span>{billing.buildingName}</span>
                        <span>{billing.addressLine2}</span>
                        <span>{billing.country}</span>
                      </Addressline>
                    </AddressContent>
                  )}
                </>
                {/* {!form[eachItem].valid && <ErrorMsg>{form[eachItem]?.errorMessage}</ErrorMsg>} */}
              </FormContent>
            </AddressContainer>
            <PasswordContainer>
              <FormContent>
                <PasswordInfo>
                  <Account id='company'>Add Company</Account>
                  <Plus className='m-0'>
                    <span onClick={() => openAddCompanyModal()}>
                      <Image className="img" src={PlusImg}></Image> Add
                    </span>
                  </Plus>
                </PasswordInfo>
                <CompanyList>
                  {companies?.length 
                  ? <table>
                    <thead>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registration Number</th>
                      <th>KYB Status</th>
                    </thead>
                    <tbody>
                      {companies.map(el => {
                        return (
                          <tr key={el?.id}>
                            <td>{el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.registrationNumber}</td>
                            <td>{el?.kybStatus}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  : <p>No Companies found.</p>}
                </CompanyList>
              </FormContent>
            </PasswordContainer>
            <PasswordContainer>
              <FormContent>
                <PasswordInfo>
                  <Account>Account Security</Account>
                  <button onClick={passwordChange}>
                    <Image className="img" src={EditImg}></Image> Edit
                  </button>
                </PasswordInfo>
                {['Password'].map((eachItem, i) => (
                  <>
                    <FormPassword key={eachItem + i}>
                      <label htmlFor={eachItem}>{form?.[eachItem]?.label}</label>
                      <input readOnly={!edit} type="password" value="password123" disabled id={eachItem + i} name={eachItem} onChange={(e) => onInputChange(e)} />

                      {/* {!form[eachItem].valid && <ErrorMsg>{form[eachItem]?.errorMessage}</ErrorMsg>} */}
                    </FormPassword>
                  </>
                ))}
              </FormContent>
            </PasswordContainer>
          </FormContainer>
        </Container>)}


    </ProfileContainer>
  )
}

export default myProfile
