import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'

import { acceptNumbersWithDecimal, acceptOnlyNumbers } from '../../../../utils/helper'
import { handleInputChange } from 'react-select/dist/declarations/src/utils'
import { APP_ENV } from '@apps/customer/config'

const InputSelectWrapper = styled.div`
  max-width: 60rem;
  margin-bottom: 3.2rem;
  select {
    /* Reset Select */
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: none;
    /* Personalize */
    flex: 1;
    padding: 0 1em;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.secondary};
    background-image: none;
    cursor: pointer;
  }
  /* Remove IE arrow */
  select::-ms-expand {
    display: none;
  }
  /* Custom Select wrapper */
  .select {
    position: relative;
    display: flex;
    width: 20em;
    height: 3em;
    border-radius: 0.25em;
    overflow: hidden;
  }
`
const InputLabel = styled.label`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
`
const InputSelectFeild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 1.2rem;
  input {
    border: none;
    background: none;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 2.5rem;
    font-weight: 500;
    padding: 0.8rem 1.4rem;
    line-height: 4.2rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.fontprimary};
    &:focus-visible {
      outline: none;
    }
  }
  .react-select__control {
    width: max-content;
    background: transparent;
    border: none !important;
    border-radius: 1.2rem;
    padding: 0;
    box-shadow: none;
    .react-select__indicator-separator {
      display: none;
    }
    .react-select__single-value {
      font-family: ${({ theme }) => theme.fontsFamily.primary};
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.1rem;
      color: ${({ theme }) => theme.colors.coolGrey};
    }
    .react-select__value-container {
      padding: 0;
      margin-right: 1rem;
    }
  }
  .react-select__menu {
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background-color: ${({ theme }) => theme.colors.mainBG} !important;
    overflow: hidden;
    padding: 0;
  }
  .react-select__menu-list {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .react-select__option {
    padding: 1.2rem;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.colors.fontdark};
  }
  .react-select__option {
    color: ${({ theme }) => theme.colors.fontdark};
  }
  .react-select__option--is-selected {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
  .react-select__option--is-focused {
    background: ${({ theme }) => theme.colors.selectBg};
  }
`

const InputSelect = (props: any) => {
  const { currency, form, setForm, label, error, selectDisabled } = props

  const priceTypeArr = [
    { value: 'ETH', label: 'ETH' },
    { value: 'USD', label: 'USD' },
  ]
  const [price, setPrice] = useState<any>('')
  const [priceType, setPriceType] = useState(null)

  const priceTypeChange = (e: any) => {
    setPriceType(e)
    setForm({
      ...form,
      ['currencyId']: e?.value,
    })
  }

  const handlePrice = (e: any) => {
    const { name, value } = e?.target
    let val = acceptNumbersWithDecimal(value)
    const minNum = 0.001
    if (Math.round(Number(e?.target.value) * 1000000) >= Math.round(minNum * 1000000) || Number(e?.target.value) == 0) {
      setPrice(val)
      setForm({
        ...form,
        ['primarySalePrice']: val,
      })
    }
  }

  useEffect(() => {
    if (form?.currencyId && !priceType) {
      let found = currency.find((el: any) => Number(el?.id) === Number(form?.currencyId))
      setPriceType(found)
    }
  }, [form?.currencyId])

  return (
    <InputSelectWrapper>
      <InputLabel>{label}</InputLabel>
      <InputSelectFeild>
        <input type="text" value={form?.primarySalePrice} onChange={handlePrice} />
        <Select
          placeholder="Choose Currency"
          classNamePrefix="react-select"
          options={currency || priceTypeArr}
          defaultValue={priceType}
          value={priceType}
          name="category"
          onChange={priceTypeChange}
          isDisabled={selectDisabled}
          components={APP_ENV.NETWORK_TYPE == 'HEDERA' ? { DropdownIndicator: () => null, IndicatorSeparator: () => null } : null}
        />
      </InputSelectFeild>
      {error ? <p className="error">{error}</p> : null}
    </InputSelectWrapper>
  )
}

export default InputSelect
