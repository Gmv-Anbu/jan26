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
import Icon from '../../shared/components/icon/icon'

const SellRequestModal = ({ data, closeModal }) => {

    const [status, setStatus] = useState(data?.status === 'Pending' ? null : data?.status)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showErrors, setShowErrors] = useState(false)

    const filterOptions = [
        {value: 'Accepted', label: 'Accepted'},
        {value: 'Denied', label: 'Denied'}
    ]

    const handleChange = (e) => {
        const { name, value, checked } = e?.target
        setStatus(value)
    }

    const updateSellRequest = () => {
        setLoading(true)
        let payload = {
            status
        }
        API.updateSellRequest(data?.id, payload)
        .then(res => {
            if(res?.status === 200) {
                toast.success(res?.data?.message || 'Successfully updated company status')
            } else {
                toast.error(res?.error?.error?.message || 'Something went wrong. Try again later')
            }
            console.log('updateSellRequest res', res)
            setTimeout(() => closeModal(true), 3000)
        })
        .catch(err => {
            setLoading(false)
            toast.error(err?.error?.error?.message || 'Something went wrong. Try again later')
            console.log('updateSellRequest err', err)
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setShowErrors(true)
        if (status !== null) {
          setErrors({})
          console.log('form', data, status)
          updateSellRequest()
        } else {
          setErrors('Status is required')
        }
    } 

    console.log('form', status)

    return (
        <ModalBackground>
        <ModalContainer>
            <div>
            <FilterHeader onClick={() => closeModal(false)}>
                <h3>Update Sell Request Status</h3>
                <span>
                    <Icon name='modal-close' />
                </span>
            </FilterHeader>
            <Dropdown>
                <DHead>Status</DHead>
                <Select onChange={handleChange} name={'status'} value={status}>
                    <option value="" selected disabled hidden>Select Status</option>
                    {filterOptions?.length 
                    ? filterOptions.map(el => {
                        return (<Option key={el?.value} value={el?.value}>{el?.label}</Option>)
                    })
                    : null}
                </Select>
                {errors?.length ? <p className="error">{errors}</p> : null}
            </Dropdown>
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

export default SellRequestModal
