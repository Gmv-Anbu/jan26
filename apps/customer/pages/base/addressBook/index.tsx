import UserService from '@apps/customer/api/customer/UserService'
import { Model, useForm, ValidateRule } from '@apps/customer/hooks/customForm'
import InputText from '@apps/customer/modules/shared/components/formInputs/inputText'
import { RootState } from '@apps/customer/redux/store'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import styled from 'styled-components'
import axios from 'axios'
import { ModalService } from 'libs/modal/src/lib/ModalService'
import SuccessModal from '@apps/customer/modules/customer/shared/modal/SuccessModal'
import LeftArrow from '../../../public/images/customer/home/leftArrow.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputCheckbox from '@apps/customer/modules/shared/components/formInputs/inputCheckbox'

const EditWrapper = styled.div`
  color: black;
  width: 100%;
  height: auto;
  padding: 15rem 7rem 20rem 41rem;
  @media screen and (max-width: 1240px) {
    margin-top: 5rem;
    padding: 10rem 7rem 20rem 30rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: 5rem;
    padding: 10rem 7rem 20rem 22rem;
  }
  @media screen and (max-width: 480px) {
    padding: 9rem 0rem 20rem 0rem;
    margin-left: 0rem;
    width: 100%;
    height: auto;
    padding-bottom: 5rem;
    margin-bottom: 0;
    background: #f4f9f9;
  }

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 60px;
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
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`
export const FormDiv = styled.form`
  display: flex;
  width: 86%;
  align-items: center;
  padding-top: 2rem;
  margin: 0 auto;

  flex-direction: column;
  @media screen and (max-width: 480px) {
    width: 93%;
  }
  .sameAsShipping {
    margin-bottom: 24px;
    width: 100%;
    div {
      display: flex;
      align-items: center;
    }
    input {
      width: 20px;
      height: 20px;
      margin: 0;
    }
    label {
      white-space: nowrap;
    }
  }
  input {
    background: #ffffff;
    border: 1.5px solid #d1e0e2;

    width: 100%;
    height: 6rem;
    font-weight: 600;
    padding: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    outline: none;
    color: #72809c;
  }
  label {
    font-size: 14px;
    width: 50%;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
    color: #4e4e4e;
    @media screen and (max-width: 430px) {
      width: 100%;
    }
    @media screen and (max-width: 780px) {
      width: 100%;
    }
  }
`
export const BasicInfo = styled.span`
  display: flex;
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
    font-size: 2.4rem;
    margin-bottom: -0.5rem;
    padding-left: 4rem;
  }
  @media screen and (max-width: 380px) {
    margin-bottom: -1rem;
    padding-left: 3rem;
  }
  @media screen and (max-width: 330px) {
    margin-bottom: 3rem;
    padding-left: 2.5rem;
  }
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  gap: 0 2rem;
  cursor: pointer;
  @media screen and (max-width: 430px) {
    width: 100%;
    padding-left: 4rem;
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
    font-size: 14px;
    line-height: 18px;
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
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  margin-top: 4rem;
  gap: 0 3rem;

  @media screen and (max-width: 780px) {
    width: 100%;
    justify-content: space-around;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
    padding: 0 3rem;
    margin-top: 1rem;
  }
`
export const InputWrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  @media screen and (max-width: 480px) {
    padding-bottom: 2rem !important;
  }
  p.error {
    color: red;
    margin: 0.5rem 0 0 0.4rem;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 500;
  }
  input {
    font-size: 1.6rem;
    font-weight: 600;
    height: 6rem;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: #0e1818 !important;
    border: 1.5px solid #d1e0e2;
    width: 100%;
    height: 6.4rem;
    border-radius: 0 !important;
    &::-webkit-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &::placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:disabled {
      background-color: #f3f3f3;
      cursor: not-allowed;
    }
  }
  textarea {
    height: 18rem;
    width: 100%;

    font-size: 1.6rem;
    font-weight: 600;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: #0e1818 !important;
    background: #fff;
    border: 1px solid #bac6d9;

    resize: none;
    height: 200px;
    &::-webkit-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &::placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:disabled {
      background-color: #f3f3f3;
      cursor: not-allowed;
    }
  }
  .react-select__control {
    background: #fff;
    border: 1.5px solid #d1e0e2;
    padding: 0;
    height: 6.4rem;
    box-shadow: none;
    margin-bottom: 2rem;
    border-radius: 0 !important;
    &--is-focused,
    &--is-focused:hover {
      border: 1.5px solid #d1e0e2;
    }
    &--is-disabled {
      background-color: #f3f3f3;
      cursor: not-allowed;
    }
    .react-select__input-container,
    .react-select__single-value {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: normal;
      color: #0e1818 !important;

      padding: 0;
      margin: 0;
    }
    .react-select__value-container {
      padding: 0 1.6rem;
    }
    .react-select__placeholder {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: normal;
      color: #515151;
    }
    .react-select__indicator-separator {
      display: none;
    }
    .react-select__indicator {
      color: ${({ theme }) => theme.colors.fontdark};
      padding: 1.6rem;
    }
  }
  .react-select__menu {
    border: 1.5px solid #d1e0e2;
    background-color: #fff !important;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  .react-select__menu-list {
    margin: 0;
    padding: 0;
    overflow: auto;
  }
  .react-select__option {
    font-size: 1.6rem;

    font-style: normal;
    font-weight: 600;

    color: #0e1818;
  }
  .react-select__option {
    color: #0e1818;
    background-color: #fff;
    &:hover {
      background-color: #deeded !important;
    }
  }
  .react-select__option--is-selected {
    color: #0e1818;
    font-weight: 700;
  }

  .react-select__option--is-focused {
    background: #deeded !important;
  }
`
interface IInputLabel {
  required: boolean
}

const InputLabel = styled.label<IInputLabel>`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
`
export const Button1 = styled.button`
  width: 14.1rem;
  font-style: normal;
  font-weight: 700;

  background: #f4f9f9;
  outline: none;
  font-size: 18px;
  line-height: 18px;
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
  border: none;
  outline: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  padding: 1.4rem 4rem;
  color: #ffffff;
  height: 5rem;
  @media screen and (max-width: 430px) {
    width: 50%;
    height: 6.1rem;
  }
  &:disabled {
    cursor: not-allowed;
  }
`
export const FormEdit = styled.div`
  background: #f4f9f9;
  width: 75%;
  min-height: 72rem;
  // height: 72rem;
  padding-top: 4rem;
  @media screen and (max-width: 430px) {
    width: 100%;
    padding-top: 0rem;
    margin-top: -0.7rem;
  }
`
const ErrorMessage = styled.p`
  color: red;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: -1rem;
  align-self: flex-start;
`
// const SettingFormData: Model.IFormData = {
//     PrimaryResidential:{
//         label:' Choose Address Book',
//         validationRules:[ValidateRule.requiredRule('Address'),ValidateRule.addressRequiredRule('Address')]
//       },
//       PrimaryShipping:{
//         label:' Building Name',
//         validationRules:[ValidateRule.requiredRule('Address'),ValidateRule.addressRequiredRule('Address')]
//       },
//       PrimaryBilling:{
//         label:'Address Line 2',
//         validationRules:[ValidateRule.requiredRule('Address'),ValidateRule.addressRequiredRule('Address')]
//       },
// }
let addressType = [
  {
    name: 'PRIMARY RESIDENTIAL',
  },
  {
    name: 'PRIMARY SHIPPING',
  },
  {
    name: 'PRIMARY BILLING',
  },
]
const AddressBook = () => {
  // const { isFormValid, form, updateForm, onInputChange } = useForm()
  const [edit, setEdit] = useState(false)
  const { isFormValid, form, updateForm, onInputChange } = useForm({})
  const router = useRouter()
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [userDetails, setUserDetails] = useState(null)
  const [buildingName, setBuildingName] = useState('')
  const [address, setAddress] = useState('')
  const [countries, setCountries] = useState([])
  const [isAddressType, setISAddressType] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [editAddress, setEditAddress] = useState<any>({})
  const [showModal, setShowModal] = useState(false)
  const [addressId, setAddressId] = useState()
  const [residential, setResidential] = useState('PRIMARY RESIDENTAL')
  const [shipping, setShipping] = useState<any>(null)
  const [billing, setBilling] = useState<any>(null)
  const [addressTypeError, setAddressTypeError] = useState('')
  const [buildingNameError, setBuildingNameError] = useState('')
  const [address1Error, setAddress1Error] = useState('')
  const [address2Error, setAddress2Error] = useState('')
  const [countryError, setcountryError] = useState('')
  const openModal = () => setShowModal(true)
  const [addressArr, setAddressArr] = useState(addressType)
  const [sameAsShipping, setSameAsShipping] = useState(false)

  const { userName } = router.query
  const changeHandler = (e: any) => {
    if (e.target.value) {
      if (e.target.value.length > 60) {
        return
      }
      setBuildingNameError('')
    } else {
      setBuildingNameError('Please neter your building name')
    }

    setBuildingName(e.target.value)
  }

  const handleGetAddress = async () => {
    try {
      const fetchData = async () => {
        const fetchedUsers = await UserService.getAddress()
        const addressData = fetchedUsers?.data?.data
        if(addressData?.length) {
          let residental = addressData?.find((item) => item.addressType === 'PRIMARY_RESIDENTIAL')
          setResidential(residental)
          let shipping = addressData?.find((item) => item.addressType === 'PRIMARY_SHIPPING')
          setShipping(shipping)
          let billing = addressData?.find((item) => item.addressType === 'PRIMARY_BILLING')
          setBilling(billing)
          if(router?.asPath === '/base/addressBook') {
            let arr = []
            if(residental) arr.push(addressType[0])
            if(shipping) arr.push(addressType[1])
            if(billing) arr.push(addressType[2])
            setAddressArr(arr)
          }
        }
      }

      if (typeof window !== 'undefined') {
        fetchData()
      }
    } catch (error) {
      toast.error(error, {
        toastId: 'ErrorToast',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
    }
  }

  useEffect(() => {
    handleGetAddress()
  }, [])
  const addressTypeHandler = (e) => {
    if (e && e.label) {
      setISAddressType(e.label)
      setAddressTypeError('')
    } else if (e == null) {
      setISAddressType(null)
      setAddressTypeError('Please select your address type')
    }
    if (e && e.label && editAddress.length) {
      const selectedAddres: any = editAddress?.find((s) => s.addressType === e.label.replace(' ', '_'))
      if(selectedAddres) setAddressId(selectedAddres?.id)
      selectUserAddress(selectedAddres)
    }
    //  else {
    //   setAddressTypeError('Please select your address type')
    // }
  }

  const selectUserAddress = (val) => {
    if (val) {
      setBuildingName(val?.buildingName)
      setAddress(val?.addressLine2)
      setSelectedCountry({ label: val?.country, value: val?.country })
      setAddressTypeError('')
      setBuildingNameError('')
      setcountryError('')
      setAddress2Error('')
    } else {
      setBuildingName('')
      setAddress('')
      setSelectedCountry('')
    }
  }

  const addressChangeHandler = (e) => {
    if (e.target.value) {
      if (e.target.value.length > 60) {
        return
      }
      setAddress2Error('')
    } else {
      setAddress2Error('Please enter your address')
    }
    setAddress(e.target.value)
  }

  const backBtnHandler = () => {
    router.push('/base/myProfile')
    return
  }

  const handleUser = useCallback(async () => {
    // if (userName !== undefined) {
    //API call to get user data
    let token = JSON.parse(localStorage.getItem('user'))?.accessToken

    await UserService.getProfile(token).then((response: any) => {
      if (response?.data) {
        setEditAddress(response?.data)
        let formatedData = {}
        Object.entries(response.data).forEach(([key, value]) => {
          formatedData[key] = { label: key, value: value }
        })

        updateForm(formatedData)
        setEditAddress(response.data.addresses)

        //User data as per different profiles
        if (response?.data?.id === profileData?.id) {
          // setUserDetails(profileData)
          setEdit(true)
        } else {
          setEdit(false)
        }
        // getActivityData(response?.data?.data?.id, 1)
        // getCollectedNFT(currentPage, response?.data?.data?.id)
      }
    })
  }, [profileData, userName]) //eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    handleUser()
  }, [handleUser])

  const handleCountryChange = (selectedOption) => {
    if (selectedOption) {
      setcountryError('')
    } else {
      setcountryError('Please select your country')
    }
    setSelectedCountry(selectedOption)
  }

  useEffect(() => {
    // Fetch the list of countries from the REST Countries API

    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => {
        // Map the response data to an array of objects with 'label' and 'value' properties
        const countriesData = response.data.map((country) => ({
          label: country.name,
          value: country.name,
        }))
        setCountries(countriesData)
      })
      .catch((error) => {})
  }, [])

  const onCheckbox = (e) => {
    const { name, value, checked } = e?.target
    setSameAsShipping(checked)
    if(checked) {
      const selectedAddres: any = editAddress?.find((s) => s.addressType === "PRIMARY_SHIPPING")
      selectUserAddress(selectedAddres)
    } else {
      const selectedAddres: any = editAddress?.find((s) => s.addressType === "PRIMARY_BILLING")
      selectUserAddress(selectedAddres)
    }
  }

  const updateAddress = async () => {
    const data = {
      addressType: isAddressType.replace(' ', '_'),
      buildingName: buildingName,
      addressLine2: address,
      country: selectedCountry?.label, // make sure to send the alpha2Code instead of the label
    }
    try {
      const res = (await addressId) ? UserService.editAddress(data, addressId) : UserService.changeAddress(data)

      // handle success, e.g. show a success message and redirect to profile page
      if (res && editAddress.length) {
      }

      if (res) {
        openModal()
        ModalService.open((modalProps) => <SuccessModal close={() => {
          modalProps.close()
        }} desc="Successfully profile updated" />)
        backBtnHandler()
        return false
      }
    } catch (error) {
      toast.error(error, {
        toastId: 'ErrorToast',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
      // handle error, e.g. show an error message
    }
  }

  // console.log('addressArr', addressArr, editAddress, isAddressType)

  return (
    <EditWrapper>
      <IconContainer onClick={backBtnHandler}>
        <Image className="img" src={LeftArrow}></Image>
        <span>Edit Profile</span>
      </IconContainer>
      <FormContainer>
        <FormContent>
          <BasicInfo>
            <Basic>Address Book</Basic>
          </BasicInfo>
          <FormEdit>
            <>
              <FormDiv onSubmit={(e) => {
                e.preventDefault()
              }}>
                <InputWrapper>
                  <InputLabel required={true}>Choose Address Book</InputLabel>
                  <Select
                    // placeholder="PRIMARY RESIDENTIAL"
                    classNamePrefix="react-select"
                    menuPlacement="auto"
                    maxMenuHeight={300}
                    onChange={addressTypeHandler}
                    name="Choose Address Book"
                    // onInputChange={(value) => setCollectionSearchTerm(value)}
                    options={addressArr.map((option) => ({ label: option.name }))}
                    isClearable={true}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        '&:hover': { borderColor: 'gray' }, // border style on hover
                        border: '1px solid lightgray', // default border color
                        boxShadow: 'none', // no box-shadow
                      }),
                    }}
                  />
                  {addressTypeError && <ErrorMessage> {addressTypeError}</ErrorMessage>}
                  {/* <ErrorText text={errors?.collectionId} />
                  {errors?.collectionId && <Errormsg>Collection is required</Errormsg>} */}
                </InputWrapper>
                {isAddressType === 'PRIMARY BILLING' ? <InputCheckbox className={`sameAsShipping`} label={`Same as Shiiping address`} onChange={onCheckbox} value={sameAsShipping} /> : null}
                <InputWrapper>
                  <InputLabel required={false}>Building Name</InputLabel>
                  <InputText value={buildingName} onChange={changeHandler} name={`Building Name`} placeholder={``} />
                  {buildingNameError && <ErrorMessage> {buildingNameError}</ErrorMessage>}
                  {/* <ErrorText text={errors?.categoryId} /> */}
                  {/* {errors?.artistName && <Errormsg>Artist name is required </Errormsg>} */}
                </InputWrapper>
                <InputWrapper>
                  <InputLabel required={false}>Address Line 2</InputLabel>

                  <InputText value={address} onChange={addressChangeHandler} name={`Address Line 2`} placeholder={``} />
                  {address2Error && <ErrorMessage> {address2Error}</ErrorMessage>}
                  {/* <ErrorText text={errors?.categoryId} /> */}
                  {/* {errors?.artistName && <Errormsg>Artist name is required </Errormsg>} */}
                </InputWrapper>
                <InputWrapper>
                  <InputLabel required={true}>Country</InputLabel>
                  <Select
                    placeholder="Country"
                    classNamePrefix="react-select"
                    menuPlacement="auto"
                    maxMenuHeight={300}
                    name="Country"
                    onChange={handleCountryChange}
                    options={countries}
                    // onInputChange={(value) => setCollectionSearchTerm(value)}
                    value={selectedCountry}
                    isClearable={true}
                  />
                  {countryError && <ErrorMessage> {countryError}</ErrorMessage>}
                  {/* <ErrorText text={errors?.collectionId} /> */}
                  {/* {errors?.collectionId && <Errormsg>Collection is required</Errormsg>} */}
                </InputWrapper>
                <ButtonContainer>
                  <Button2 type="submit" disabled={!buildingName || !isAddressType || !address || !selectedCountry?.label} onClick={() => updateAddress()}>
                    Update
                  </Button2>
                  <Button1
                    onClick={() => {
                      router.push('/base/myProfile')
                    }}
                  >
                    Cancel
                  </Button1>
                </ButtonContainer>
              </FormDiv>
            </>
          </FormEdit>
        </FormContent>
      </FormContainer>
    </EditWrapper>
  )
}

export default AddressBook
