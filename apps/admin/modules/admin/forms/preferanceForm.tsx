import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputText from '../../shared/components/formInputs/inputText'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'
import { ButtonGradientPrimary } from '../../shared/components/button/button'
import SuccessModal from '../modal/success'
import ErrorModal from '../modal/error'
import API from '../../../api/admin'
import { CharacterCount, validateForm } from '../../../utils/helper'
import { getFieldValue } from '@apps/admin/utils/helper'

const FormWrapper = styled.div`
  width: 70%;
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
  margin-left: 3rem;
  width: 100%;
`

const TextContainer = styled.div`
  margin-left: 3rem;
  width: 30%;
  .title {
    font-family: Poppins;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.7rem;
    margin: 0;
    margin-bottom: 1.1rem;
    display: block;
    }
    .description {
        font-family: Poppins;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2.7rem;
        margin: 0;
        margin-bottom: 1.1rem;
        display: block;
    }
}
`
const FormContent = styled.div`
  margin-left: 3rem;
  width: 60%;
`

const InputContainer = styled.div`
  display : flex
`

const PreferenceForm = () => {
    const formOG = {
        meta_title: '',
        meta_description: '',
        google_analytics: '',
    }
    const formValidation = {
        meta_title: '',
        meta_description: '',
        google_analytics: '',
    }
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState<any>({})
    const [form, setForm] = useState(formOG)
    const [errors, setErrors] = useState<any>({})
    const [apiError, setAPIError] = useState<any>(null)
    const [showErrors, setShowErrors] = useState(false)
    const [descriptionCount, setDescriptionCount] = useState(0)
    const [analyticsCount, setAnalyticsCount] = useState(0)
    const openModal = () => setShowModal(true)

    const closeModal = () => {
        setShowModal(false)
    }

    const handleOnChange = (e: any) => {
        const { name } = e.target
        let { value } = e.target
        const result = CharacterCount(value)
        if (name === 'meta_description') {
            setDescriptionCount(result)
        }
        else if (name === 'google_analytics') {
            setAnalyticsCount(result)
        }
        setForm({
            ...form,
            [name]: value,
        })

    }

    const handleSubmit = async (e: any) => {
        const result = await validateForm(form, formValidation)
        if (result === true) {
            setErrors({})
            updatePreference()
        } else {
            setShowErrors(true)
            setAPIError(null)
            setErrors(result)
        }
    }


    const updatePreference = () => {
        const data = []
        for (let [key, value] of Object.entries(form)) {
            data.push(
                {
                    preferanceKey: key,
                    preferanceValue: value
                }
            )
        }
        API.updatePreference({
            "preferances": data
        }).then((res) => {
            if (res?.data !== null) {
                setData(res?.data)
                openModal()
                setAPIError(null)
            } else {
                openModal()
                setAPIError(res?.error?.error?.message || 'Error while updating preferances. Please try again.')
            }
        }).catch((err) => {
            console.log('err', err?.response?.error)
        })
    }

    const getPreferenceData = () => {
        const params: any = {
            page: 1,
            items: 10,
        }

        API.getPreferances(params)
            .then((res) => {
                if (res?.data?.data) {
                    const data = res?.data?.data
                    setForm({
                        ...form,
                        meta_title: getFieldValue(data, "meta_title"),
                        meta_description: getFieldValue(data, "meta_description"),
                        google_analytics: getFieldValue(data, "google_analytics"),
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        (async () => {
            if (showErrors) {
                const result = await validateForm(form, formValidation)
                if (result == true) {
                    setErrors({})
                } else {
                    setErrors(result)
                }
            }
        })()
    }, [form])

    useEffect(() => {
        getPreferenceData()
    }, [])

    return (
        <Container>
            <FormWrapper>
                <InputContainer>
                    <TextContainer>
                        <label className='title'>Title and meta description</label>
                        <label className='description'>The title and meta description help define how your store shows up on search engines.</label>
                    </TextContainer>
                    <FormContent>
                        <div className="inner-box">
                            <InputText label={`Homepage title`} error={errors?.meta_title} onChange={handleOnChange} value={form?.meta_title} name={`meta_title`} placeholder={`Enter title`} required={true} />
                            <InputTextarea
                                label={`Homepage meta description`}
                                error={errors?.meta_description}
                                onChange={handleOnChange}
                                value={form?.meta_description}
                                name={`meta_description`}
                                placeholder={`Enter Description`}
                                charLimitCount={descriptionCount}
                                required={true}
                                charLimit={360}
                            />
                        </div>
                    </FormContent>
                </InputContainer>
                <InputContainer>
                    <TextContainer>
                        <label className='title'>Google Analytics</label>
                        <label className='description'>Google Analytics enables you to track the visitors to your store, and generates reports that will help you with your marketing.
                        </label>
                    </TextContainer>
                    <FormContent>
                        <div className="inner-box">
                            <InputTextarea
                                label={`Google Analytics`}
                                error={errors?.analyticsText}
                                onChange={handleOnChange}
                                value={form?.google_analytics}
                                name={`google_analytics`}
                                placeholder={`Paste your code from Google here`}
                                required={true}
                                charLimitCount={analyticsCount}
                                charLimit={360}
                            />
                        </div>
                    </FormContent>
                </InputContainer>
                <InputContainer>
                    <FormContent>
                        <div className="btn-wrp">
                            <ButtonGradientPrimary onDoubleClick={()=>{}} onClick={handleSubmit} blockBtn size={`md`}>
                                Save
                            </ButtonGradientPrimary>
                        </div>
                    </FormContent>
                </InputContainer>
            </FormWrapper>
            {apiError ? <ErrorModal show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
        </Container>
    )
}

export default PreferenceForm
