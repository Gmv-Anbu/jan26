import API from '@apps/admin/api/admin/index'
import { objectDeepClone } from '@apps/admin/utils/helper'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputCheckbox from '../../shared/components/formInputs/inputCheckbox'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'

const CheckboxSection = styled.div`
    margin-top: 3rem;
    max-height: 30rem;
    overflow-y: auto;
`
const ErrorMsg = styled.p`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.danger};
    margin-top: 1rem;
`

const BulkUnblockUser = ({  data, setOpenModal, commonModalPopup }) => {

  const [loading, setLoading] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [showError, setShowError] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>([])

  const handleChange = (e) => {
    const { value, name, checked } = e?.target
    if(checked) {
        let arr = objectDeepClone(selectedUser)
        arr.push(name)
        setSelectedUser(arr)
    } else {
        let arr = selectedUser.filter(el => el !== name)
        setSelectedUser(arr)
    }
  }

  const handleSelectAll = (e) => {
    const { value, name, checked } = e?.target
    setSelectAll(checked)
  }

  const handleApply = () => {
    if(selectedUser?.length) {
        let payload = {
            "userIds": selectedUser
        }
        API.bulkUnblockUser(payload)
        .then(res => {
            if (res.status === 200) {
                commonModalPopup('success', res?.data?.message || 'User unblocked successfully')
            } else {
                commonModalPopup('error', res?.data?.message || 'Unblock failed try again later')
            }
            setOpenModal(false)
        })
        .catch(err => {
            commonModalPopup('error', err?.error?.error?.data?.message || 'Unblock failed try again later')
            setOpenModal(false)
        })
    } else {
        setShowError(true)
        setTimeout(() => {
            setShowError(false)
        }, 5000)
    }
  }

    useEffect(() => {
        if(selectAll) {
            let arr = []
            data.forEach(el => {
                arr.push(el?.id.toString())
            })
            setSelectedUser(arr)
        } else {
            setSelectedUser([])
        }
    },[selectAll])

  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader onClick={() => setOpenModal(false)}>
            <h3>Unblock Users</h3>
            <span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                  fill="#172F53"
                />
              </svg>
            </span>
          </FilterHeader>
            
          <CheckboxSection>
            {data?.length 
            ? data.map((el, i) => {
                return (
                    <InputCheckbox key={el?.id} label={el?.userName || el?.email || el?.walletAddress} value={selectedUser.includes(el?.id.toString())} onChange={handleChange} name={el?.id} />
                )
            })
            : 'No User found.'}
          </CheckboxSection>
          {showError ? <ErrorMsg>Selected users before proceeding</ErrorMsg> : null}
          {data?.length 
          ? <div className='mt-10'>
            <InputCheckbox label={`Select all`} value={selectAll} onChange={handleSelectAll} name={`selectAll`} />
            </div>
          : null}
          <Line></Line>
          <ButtonComponent>
            <Button1 onClick={() => setOpenModal(false)}>
              Cancel
            </Button1>
            <Button2 disabled={loading} onClick={() => handleApply()}>
              Unblock Users
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default BulkUnblockUser
