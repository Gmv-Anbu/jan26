import moment from 'moment'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../shared/components/Loader'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, InputWrapper, SelectD, Option, Line } from '../styled-components/FilterModalStyle'
import { localDateToUTC } from '@apps/admin/utils/helper'
import Icon from '../../shared/components/icon/icon'

const PriceTypeFilterModal = ({ setOpenModal, filterOptions, data, onApplyFilter, onResetFilter }) => {
    
  const [minPrice, setMinPrice] = useState(data.minPrice)
  const [maxPrice, setMaxPrice] = useState(data.maxPrice)
  const [categoryId, setCategoryId] = useState(data.categoryId)
  const [showError, setShowError] = useState(false)
  const [validationError, setValidationError] = useState('')

 
  const isValidDate = () => {
    console.log('asdasdasdasd', data)
    if (minPrice && !maxPrice) {
      setValidationError('Max price is required')
      return false
    }
    if (!minPrice && maxPrice) {
        setValidationError('Min price is required')
        return false
      }
    if(Number(minPrice) > Number(maxPrice)) {
        setValidationError('Max price should be greater')
        return false
    }
    return true
  }

  const handleApply = () => {
    if (isValidDate()) {
      onApplyFilter({ minPrice, maxPrice, categoryId })
      setOpenModal(false)
    }
    else {
      setShowError(true)
    }
  }

  const onReset = () => {
    setValidationError(null)
    onResetFilter({ minPrice: null, maxPrice: null, categoryId: null })
    setMaxPrice('')
    setMinPrice('')
    setCategoryId('')
    setShowError(false)
  }

  const handleChange = (e) => {
    const { name, value } = e?.target
    setValidationError(null)
    if(name === 'categoryId') setCategoryId(value)
    if(name === 'maxPrice') setMaxPrice(Number(value) || '')
    if(name === 'minPrice') setMinPrice(Number(value) || '')
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
            <DHead>Category</DHead>
            <Select onChange={(e: any) => handleChange(e)} value={categoryId} name="categoryId">
              <Option value="">All</Option>
              {filterOptions?.length 
              ? filterOptions.map(el => {
                return (<Option key={el?.value} value={el?.value}>{el?.label}</Option>)
              })
              : null}
            </Select>
          </Dropdown>
          <div>
            <InputWrapper>
              <DateL>Min Price</DateL>
              <input onChange={(e: any) => handleChange(e)} name="minPrice" type="text" value={minPrice} />
            </InputWrapper>
            {validationError && validationError.includes('Min') ?  <p className="error">{validationError}</p> : null}
            <InputWrapper>
              <DateL>Max Price</DateL>
              <input onChange={(e: any) => handleChange(e)} name="maxPrice" type="text" value={maxPrice} />
            </InputWrapper>
          </div> 
          {validationError && !validationError.includes('Min') ?  <p className="error">{validationError}</p> : null}
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

export default PriceTypeFilterModal
