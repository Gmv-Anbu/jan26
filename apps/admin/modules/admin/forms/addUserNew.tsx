import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Select from 'react-select'

import InputText from '../../shared/components/formInputs/inputText'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'
import InputCheckbox from '../../shared/components/formInputs/inputCheckbox'
import { ButtonGradientPrimary } from '../../shared/components/button/button'
import SuccessModal from '../modal/success'
import ErrorModal from '../modal/error'
import ArtworkInputFile from '../../shared/components/formInputs/artworkInputFile'

import API from '../../../api/admin'
import AUTH_API from '@apps/admin/api/admin/auth'
import { CharacterCount, acceptOnlyAlphabets, acceptOnlyNumbers, formatAPIError, handleApiImage, objectDeepClone, validateForm } from '../../../utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import { Loader } from '../../shared/components/Loader'
import BackButton from '../components/button/backButton'
import { InputWrapper, InputLabel } from '../../shared/styled-components/formInputs'

const FormWrapper = styled.form`
  width: 52%;
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
  border-radius: 8px;
  padding: 3rem;
  .inner-box {
    background: #fafafa;
    border-radius: 8px;
    padding: 2rem 3.5rem;
    margin-bottom: 18px;
  }
  button {
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    border-radius: 6px;
    max-width: 160px;
    margin-top: 1rem;
    font-size: 14px;
  }
  .btn-wrp {
    display: flex;
    justify-content: flex-end;
  }
`
const Container = styled.div`
  width: 100%;
`

const AddUserFormWrapper = styled.div`
  padding-left: 3rem;
`

const AddUserForm = (props: any) => {
    const { isEdit } = props
    const btnRef = useRef<HTMLInputElement | null>()

    const router = useRouter()
    const formOG = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        isWhitelisted: false,
        maxBidAmount: null,
        kycStatus: null
    }
    const formValidation = {
        firstName: '',
        lastName: '',
        "userName": "min:4|max:24",
        "email": "email",
    }
    const [showModal, setShowModal] = useState(false)
    const [userId, setuserId] = useState<any>(null)
    const [data, setData] = useState<any>({})
    const [form, setForm] = useState(formOG)
    const [errors, setErrors] = useState<any>({})
    const [apiError, setAPIError] = useState<any>(null)
    const [showErrors, setShowErrors] = useState(false)
    const kycOptions = [
      { value: 'In Review', label: 'In Review' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Rejected', label: 'Rejected' },
    ]

    const openModal = () => setShowModal(true)

    const closeModal = () => {
        setShowModal(false)
        if (!apiError) goToUserList()
    }

    const goToUserList = () => {
        router.push('/users')
    }

    const handleStatusChange = (e) => {
      setForm({
        ...form,
        ['kycStatus']: e?.value,
      })
    }

    const handleOnChange = (e: any) => {
      let { name, value, files, checked } = e.target
      if(name === 'maxBidAmount') {
        let val = acceptOnlyNumbers(value)
        setForm({
          ...form,
          [name]: val,
        })
      } else if(name === 'isWhitelisted') {
        setForm({
          ...form,
          [name]: checked,
        })
      } else {
        setForm({
          ...form,
          [name]: value,
        })
      }
    }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await validateForm(form, formValidation, form?.isWhitelisted ? ['isWhitelisted', 'maxBidAmount', 'kycStatus'] : ['isWhitelisted', 'kycStatus'])
    setShowErrors(true)
    if (result === true) {
      setErrors({})
      if (isEdit) {
        updateUser()
      } else {
        addNewUser()
      }
    } else {
      setAPIError(null)
      setErrors(result)
    }
  }

  const updateUser = () => {
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    let payload = objectDeepClone(form)
    if(form?.isWhitelisted) delete payload?.maxBidAmount
    if(form?.kycStatus === 'Pending') delete payload?.kycStatus
    AUTH_API.userAdminUpdateDetails(payload, userId)
      .then((res) => {
        ModalService.close(fullLoader)
        if (res?.data !== null) {
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else {
          openModal()
          setAPIError(res?.error?.error?.message || 'Error while updating category. Please try again.')
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        console.log('err', err?.response?.error)
      })
  }

  const addNewUser = () => {
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    let payload = objectDeepClone(form)
    if(form?.isWhitelisted) delete payload?.maxBidAmount
    delete payload?.kycStatus
    API.addNewUser(payload)
      .then((res) => {
        ModalService.close(fullLoader)
        if (res?.data !== null) {
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else {
          openModal()
          setAPIError(res?.error?.error?.message || 'Error while adding user, please try agin.')
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        console.log('err', err?.response?.error)
      })
  }

  const getUserDataById = () => {
    AUTH_API.userProfileDetails(userId)
      .then((res) => {
        console.log('res', res)
        if (res?.data?.data) {
          const data = res?.data?.data
          setForm({
            ...form,
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            userName: data?.userName,
            maxBidAmount: Number(data?.maxBidAmount),
            isWhitelisted: data?.isWhitelisted,
            kycStatus: data?.kycStatus
          })
        } else {
          goToUserList()
        }
      })
      .catch((err) => {
        console.log(err)
        goToUserList()
      })
  }

  useEffect(() => {
    if (router?.query?.id && Number(router?.query?.id)) {
      const id = Number(router?.query?.id)
      setuserId(id)
    }
  }, [router])

  useEffect(() => {
    if (userId && isEdit) {
      getUserDataById()
    }
  }, [userId, isEdit])

  useEffect(() => {
    (async () => {
      if (showErrors) {
        const result = await validateForm(form, formValidation, form?.isWhitelisted ? ['isWhitelisted', 'maxBidAmount', 'kycStatus'] : ['isWhitelisted', 'kycStatus'])
        if (result == true) {
          setErrors({})
        } else {
          setErrors(result)
        }
      }
    })()
  }, [form])

  console.log('errors', errors)

  return (
    <Container>
      <BackButton onClick={() => goToUserList()} /> 
      <FormWrapper>
        <div className="inner-box">
          <InputText label={`First Name`} error={errors?.firstName} onChange={handleOnChange} value={form?.firstName} name={`firstName`} placeholder={`Enter First Name`} required={true} />
          <InputText label={`Last Name`} error={errors?.lastName} onChange={handleOnChange} value={form?.lastName} name={`lastName`} placeholder={`Enter Last Name`} required={true} />
          <InputText label={`Username`} error={errors?.userName} onChange={handleOnChange} value={form?.userName} name={`userName`} placeholder={`Enter Username`} required={true} />
          <InputText label={`Email`} error={errors?.email} onChange={handleOnChange} value={form?.email} name={`email`} placeholder={`Enter Email`} required={true} />
          <InputCheckbox label={`Whitelist`} error={errors?.isWhitelisted} value={form?.isWhitelisted} onChange={handleOnChange} name={`isWhitelisted`} />
          {!form?.isWhitelisted 
          ? <InputText label={`Lock Amount`} error={errors?.maxBidAmount ? 'Lock Amount is required' : null} onChange={handleOnChange} value={form?.maxBidAmount} name={`maxBidAmount`} placeholder={`Enter Lock Amount`} required={true} /> 
          : null}
          {isEdit
          ? <InputWrapper>
              <InputLabel required={false}>KYC Status</InputLabel>
              <Select
                classNamePrefix="react-select"
                options={kycOptions}
                defaultValue={{ value: form?.kycStatus, label: form?.kycStatus }}
                value={{ value: form?.kycStatus, label: form?.kycStatus }}
                name="kycStatus"
                onChange={handleStatusChange}
                isDisabled={!isEdit}
              />
          </InputWrapper>
          : null}
          {/* <InputText label={`Password`} error={errors?.password} onChange={handleOnChange} value={form?.password} name={`password`} placeholder={`Enter Password`} required={true} /> */}
          <div className="btn-wrp">
            <ButtonGradientPrimary onClick={handleSubmit} onDoubleClick={()=>{}} blockBtn size={`md`}>
              {isEdit ? 'Update ' : 'Create '}User
            </ButtonGradientPrimary>
          </div>
        </div>
      </FormWrapper>
      {apiError ? <ErrorModal show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
    </Container>
  )
}

export default AddUserForm
