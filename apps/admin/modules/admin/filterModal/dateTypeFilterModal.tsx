import moment from 'moment'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../shared/components/Loader'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'
import { localDateToUTC } from '@apps/admin/utils/helper'
import Icon from '../../shared/components/icon/icon'

const DateTypeFilterModal = ({  dateFilter = true, setOpenModal, filterOptions, data, onApplyFilter, onResetFilter }) => {
  const [from, setFrom] = useState(data.from ? moment(data.from).format('YYYY-MM-DD') : null)
  const [type, setType] = useState(data.type)
  const [to, setTo] = useState(data.to ? moment(data.to).format('YYYY-MM-DD') : null)
  const [showError, setShowError] = useState(false)
  const [validationError, setValidationError] = useState(null)

 
  const isValidDate = (data: any) => {
    console.log('asdasdasdasd', data)
    if (data.from && !data.to) {
      setValidationError('End date is required')
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

  const handleApply = () => {
    if (isValidDate({ from: from, to: to, type: type })) {
      onApplyFilter({ from: from, to: to, type: type })
      setOpenModal(false)
    }
    else {
      setShowError(true)
    }
  }

  const onReset = () => {
    setValidationError(null)
    onResetFilter({ from: null, to: null, type: null })
    setTo('')
    setFrom('')
    setType('')
    setShowError(false)
  }

  const handleChange = (e) => {
    const { name, value } = e?.target
    setValidationError(null)
    if(name === 'type') setType(value)
    if(name === 'to') setTo(value)
    if(name === 'from') setFrom(value)
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader onClick={() => setOpenModal(false)}>
            <h3>Filter By</h3>
            <Icon name="filter-close" />
          </FilterHeader>
          <Dropdown>
            <DHead>Type</DHead>
            <Select onChange={(e: any) => handleChange(e)} value={type} name="type">
              <Option value="">All</Option>
              {filterOptions?.length 
              ? filterOptions.map(el => {
                return (<Option key={el?.value} value={el?.value}>{el?.label}</Option>)
              })
              : null}
            </Select>
          </Dropdown>
          {dateFilter 
          ? <div>
            <DropdownDate>
              <DateL>StartDate</DateL>
              <SelectD onChange={(e: any) => handleChange(e)} name="from" type="date" value={from}></SelectD>
            </DropdownDate>
            {/* {showError && <Errormsg>fill the Data</Errormsg>} */}
            <DropdownDate>
              <DateL>EndDate</DateL>
              <SelectD onChange={(e: any) => handleChange(e)} name="to" type="date" value={to}></SelectD>
            </DropdownDate>
          </div> 
          : null}
          <p className="error">{validationError}</p>
          <Line></Line>
          <ButtonComponent>
            <Button1 onClick={() => onReset()}>Reset</Button1>
            <Button2 onClick={() => handleApply()}>Apply Filter</Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default DateTypeFilterModal
