import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../shared/components/Loader'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'
import { acceptOnlyNumbers, localDateToUTC, objectDeepClone, validateForm } from '@apps/admin/utils/helper'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'
import API from '@apps/admin/api/admin'
import { toast } from 'react-toastify';
import InputCheckbox from '../../shared/components/formInputs/inputCheckbox'
import InputText from '../../shared/components/formInputs/inputText'

const CompanyApprovalModal = ({ data, closeModal }) => {

    const formOg = {
        kybStatus: data?.kybStatus === 'Pending' ? null : data?.kybStatus,
        isWhitelisted: data?.isWhitelisted,
        maxBidAmount: Number(data?.maxBidAmount),
    }
    const [form, setForm] = useState(formOg)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showErrors, setShowErrors] = useState(false)

    const filterOptions = [
        {value: 'Approved', label: 'Approved'},
        {value: 'In Review', label: 'In Review'},
        {value: 'Rejected', label: 'Rejected'}
    ]

    const handleChange = (e) => {
        const { name, value, checked } = e?.target
        setForm({
            ...form,
            [name]: name === 'isWhitelisted' ? checked : name === 'maxBidAmount' ? acceptOnlyNumbers(value) : value
        })
    }

    const updateCompanyStatus = () => {
        setLoading(true)
        let payload = objectDeepClone(form)
        if(form?.isWhitelisted) delete payload?.maxBidAmount
        API.updateCompanyStatus(data?.id, payload)
        .then(res => {
            if(res?.status === 200) {
                toast.success(res?.data?.message || 'Successfully updated company status')
            } else {
                toast.error(res?.error?.error?.message || 'Something went wrong. Try again later')
            }
            console.log('updateCompanyStatus res', res)
            setTimeout(() => closeModal(true), 3000)
        })
        .catch(err => {
            setLoading(false)
            toast.error(err?.error?.error?.message || 'Something went wrong. Try again later')
            console.log('updateCompanyStatus err', err)
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await validateForm(form, formOg, form?.isWhitelisted ? ['maxBidAmount'] : [])
        setShowErrors(true)
        if (result === true) {
          setErrors({})
          console.log('form', data, form)
          updateCompanyStatus()
        } else {
          setErrors(result)
        }
    }  

    useEffect(() => {
        (async () => {
        if (showErrors) {    
            const result = await validateForm(form, formOg, form?.isWhitelisted ? ['maxBidAmount'] : [])
            if (result === true) {
                setErrors({})
            } else {
                setErrors(result)
            }
        }
        })()
    }, [form])

    console.log('form', form)

    return (
        <ModalBackground>
        <ModalContainer>
            <div>
            <FilterHeader
                onClick={() => {
                    closeModal(false)
                }}
            >
                <h3>Update Company</h3>
                <span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                    fill="#172F53"
                    />
                </svg>
                </span>
            </FilterHeader>
            <Dropdown>
                <DHead>Status</DHead>
                <Select onChange={handleChange} name={'kybStatus'} value={form?.kybStatus}>
                    <option value="" selected disabled hidden>Select KYB Status</option>
                    {filterOptions?.length 
                    ? filterOptions.map(el => {
                        return (<Option key={el?.value} value={el?.value}>{el?.label}</Option>)
                    })
                    : null}
                </Select>
                {errors?.kybStatus ? <p className="error">{errors?.kybStatus}</p> : null}
            </Dropdown>
            <InputCheckbox label={`Whitelisted`} onChange={handleChange} name={'isWhitelisted'} value={form?.isWhitelisted} />
            {form?.isWhitelisted 
            ? null 
            : <InputText label={`Lock Amount`} onChange={handleChange} name={'maxBidAmount'} value={form?.maxBidAmount} error={errors?.maxBidAmount ? 'Lock Amount is required' : null} />}
            <Line></Line>
            <ButtonComponent>
                <Button1 onClick={() => closeModal(false)}>Cancel</Button1>
                <Button2 onClick={(e) => loading ? {} : handleSubmit(e)}>Submit</Button2>
            </ButtonComponent>
            </div>
        </ModalContainer>
        </ModalBackground>
    )
}

export default CompanyApprovalModal
