import moment from 'moment'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../shared/components/Loader'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'

const TypeFilterModal = ({ setOpenModal, data, onApplyFilter, onResetFilter }) => {
  const [type, setType] = useState(data)
  const [loading, setLoading] = useState(false)

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

          <Dropdown>
            <DHead>Type</DHead>
            <Select
              onChange={(e: any) => {
                setType(e.target.value)
              }}
              value={type}
            >
              <Option value="">All</Option>
              <Option value="general">General</Option>
              <Option value="bid">Bidding</Option>
              <Option value="payment">Payment</Option>
              <Option value="transaction">Transaction</Option>
            </Select>
          </Dropdown>
          <Line></Line>
          <ButtonComponent>
            <Button1
              onClick={() => {
                onResetFilter('')
              }}
              disabled={!type ? true : false}
              disabledStatus={!type ? true : false}
            >
              Reset
            </Button1>
            <Button2
              disabled={loading}
              onClick={() => {
                onApplyFilter(type)
                setLoading(true)
                setOpenModal(false)
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

export default TypeFilterModal
