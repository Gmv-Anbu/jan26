import moment from 'moment'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../shared/components/Loader'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'

const UserFilterModel = ({ setOpenModal, onData, onApplyFilter, onResetFilter }) => {
  const [from, setFrom] = useState(onData.from ? moment(onData.from).format('YYYY-MM-DD') : null)
  // const [saleType, setRole] = useState(data.saleType)
  const [to, setTo] = useState(onData.to ? moment(onData.to).format('YYYY-MM-DD') : null)
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState(null)

  const isValidDate = (data: any) => {
    if (!data.from || !data.to) {
      setValidationError('Please select any filters')
      return false
    }

    const fromDate = new Date(data.from)
    const toDate = new Date(data.to)

    if (fromDate.getTime() < toDate.getTime()) {
      setValidationError(null)
      return true
    } else if (fromDate.getTime() > toDate.getTime()) {
      setValidationError('To date should be greater than from date')
      return false
    } else {
      if (isNaN(fromDate.getTime()) === true || isNaN(toDate.getTime()) === true) {
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
            <DHead>Sale Type</DHead>
            <Select
              onChange={(e: any) => {
                setValidationError(null)
                setRole(e.target.value)
              }}
              value={saleType}
            >
              <Option value="">All </Option>
              <Option value="auction">Auction </Option>
              <Option value="fixed">Fixed</Option>
            </Select>
          </Dropdown> */}
          <div>
            <DropdownDate>
              <DateL>From</DateL>
              <SelectD
                onChange={(e: any) => {
                  setValidationError(null)
                  setFrom(e.target.value)
                }}
                type="date"
                value={from}
              ></SelectD>
            </DropdownDate>
            {/* {showError && <Errormsg>fill the Data</Errormsg>} */}
            <DropdownDate>
              <DateL> To</DateL>
              <SelectD
                onChange={(e: any) => {
                  setValidationError(null)
                  setTo(e.target.value)
                }}
                type="date"
                value={to}
              ></SelectD>
              <p className="error">{validationError}</p>
            </DropdownDate>
          </div>
          <Line></Line>
          <ButtonComponent>
            <Button1
              onClick={() => {
                setValidationError(null)
                onResetFilter({ from: null, to: null})
                setTo('')
                setFrom('')
             
                setShowError(false)
              }}
              disabled={ !to && !from ? true : false}
              disabledStatus={!to && !from ? true : false}
            >
              Reset
            </Button1>
            <Button2
              disabled={loading}
              onClick={() => {
                if (isValidDate({ from: from, to: to})) {
                  onApplyFilter({ from: from, to: to })
                  setLoading(true)
                  setOpenModal(false)
                }
                // onApplyFilter({ from: from, to: to, saleType: saleType })
                // if ((from && to) || saleType) {

                // }
                else {
                  setShowError(true)
                }
              }}
            >
              {loading ? (
                <>
                  Loading... <Loader height="20" width="20" />
                </>
              ) : (
                'Apply Filter'
              )}
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default UserFilterModel;
