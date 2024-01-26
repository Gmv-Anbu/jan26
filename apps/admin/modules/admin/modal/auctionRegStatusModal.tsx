import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../shared/components/Loader'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'
import { localDateToUTC, objectDeepClone, validateForm } from '@apps/admin/utils/helper'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'
import API from '@apps/admin/api/admin'
import { toast } from 'react-toastify';

import InputText from '../../shared/components/formInputs/inputText'

const AuctionRegStatusModal = ({ data, closeModal }) => {

    const formOg = {
        status: data?.status=== 'Pending' ? null : data?.status,
        reason: data?.status==='In Review'? data?.reviewReason : data?.status==='Rejected' ? data?.rejectReason : null,
        lockAmount: Number(data?.lockAmount)
    }
    const [form, setForm] = useState(formOg)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showErrors, setShowErrors] = useState(false)

    const filterOptions = ['Accepted', 'In Review', 'Rejected']

    const handleChange = (e) => {
        const { name, value } = e?.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const updateAuctionStatus = () => {
        setLoading(true)
        let payload = objectDeepClone(form)
        if(form?.status === 'Rejected') payload['rejectReason'] = form?.reason
        if(form?.status === 'In Review') payload['reviewReason'] = form?.reason
        delete payload?.reason
        API.updateAuctionRegistration(data?.id, payload)
        .then(res => {
            if(res?.status === 200) {
                toast.success(res?.data?.message || 'Successfully updated auction registration')
            } else {
                toast.error(res?.error?.error?.message || 'Something went wrong. Try again later')
            }
            console.log('updateAuctionStatus res', res)
            setTimeout(() => closeModal(true), 3000)
        })
        .catch(err => {
            setLoading(false)
            toast.error(err?.error?.error?.message || 'Something went wrong. Try again later')
            console.log('updateAuctionStatus err', err)
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await validateForm(form, formOg, form?.status === 'Rejected' || form?.status === 'In Review' ? [] : ['reason'])
        setShowErrors(true)
        if (result === true) {
          setErrors({})
          console.log('form', data?.auctionId, data?.id, form)
          updateAuctionStatus()
        } else {
          setErrors(result)
        }
    }  

    useEffect(() => {
        (async () => {
        if (showErrors) {    
            const result = await validateForm(form, formOg, form?.status === 'Rejected' || form?.status === 'In Review' ? [] : ['reason'])
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
            <FilterHeader onClick={() => closeModal(false)}>
                <h3>Auction Registration Status</h3>
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
                <Select onChange={handleChange} name={'status'} value={form?.status}>
                    <option value="" selected disabled hidden>Select status</option>
                    {filterOptions?.length 
                    ? filterOptions.map(el => {
                        return (<Option key={el} value={el}>{el}</Option>)
                    })
                    : null}
                </Select>
                {errors?.status ? <p className="error">{errors?.status}</p> : null}
            </Dropdown>
            <InputText label={`Anticipated Bid Amount`} onChange={handleChange} name={'lockAmount'} value={form?.lockAmount} error={errors?.lockAmount} />
            {form?.status === 'Rejected' || form?.status === 'In Review'
            ? <InputTextarea
                label={`Reason`}
                onChange={handleChange}
                value={form?.reason}
                error={errors?.reason}
                name={`reason`}
                placeholder={`Enter Reject Reason`}
                count={false}
                // descriptionCount={descriptionCount}
            />
            : null}
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

export default AuctionRegStatusModal
