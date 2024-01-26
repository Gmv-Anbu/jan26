import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'

const FilterModel = ({ setOpenModal, data, onApplyFilter, setFilterData, onResetFilter }) => {
  const { from, role, to } = data
  const [validationError, setValidationError] = useState(null)
  const [loading, setLoading] = useState(false)

  const isValidDate = (data: any) => {
    const fromDate = new Date(data.from)
    const ToDate = new Date(data.to)
    // if (from || to || role) {
    //   setValidationError(null)
    //   return true
    // } else {
    //   setValidationError('Please select any filters')
    //   return false
    // }

    if (fromDate.getTime() < ToDate.getTime()) {
      setValidationError(null)
      return true
    } else if (fromDate.getTime() > ToDate.getTime()) {
      setValidationError('To date should be greater than from date')
      return false
    } else {
      if (isNaN(fromDate.getTime()) === true || isNaN(ToDate.getTime()) === true) {
        setValidationError('From date and to date cannot be empty')

        return false
      }

      return true
    }
  }
  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader
            onClick={() => {
              setOpenModal(false)
            }}
          >
            <h3>Filter By</h3>
            <span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                  fill="#172F53"
                />
              </svg>
            </span>
          </FilterHeader>

          {/* <Dropdown>
            <DHead>User Type</DHead>
            <Select onChange={(e: any) => setRole(e.target.value)} value={role}>
              <Option>-- User Type --</Option>
              <Option value="user">User</Option>
              <Option value="creator">Creator</Option>
            </Select>
          </Dropdown> */}

          <DropdownDate>
            <DateL>From</DateL>
            <SelectD
              onChange={(e: any) => {
                setValidationError(null)
                setFilterData({
                  ...data,
                  ['from']: e.target.value,
                })
              }}
              type="date"
              value={from}
            ></SelectD>
          </DropdownDate>
          <DropdownDate>
            <DateL> To</DateL>
            <SelectD
              onChange={(e: any) => {
                setValidationError(null)
                setFilterData({
                  ...data,
                  ['to']: e.target.value,
                })
              }}
              type="date"
              value={to}
            ></SelectD>
            <p className="error">{validationError}</p>
          </DropdownDate>

          <Line></Line>
          <ButtonComponent>
            <Button1
              onClick={() => {
                setValidationError(null)
                setFilterData({from:'',to:'',role:''})
                onResetFilter({from:'',to:'',role:''});
              }}
              disabled={ !to && !from ? true : false}
              disabledStatus={!to && !from ? true : false}
            >
              Reset
            </Button1>
            <Button2
              disabled={loading}
              onClick={() => {
                if (isValidDate({ from: from, to: to, role: role })) {
                  onApplyFilter({ from: from, to: to, role: role })
                  setLoading(true)
                  setOpenModal(false)
                }
              }}
            >
              Apply Filter
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default FilterModel
