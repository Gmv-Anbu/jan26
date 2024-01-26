import API from '@apps/admin/api/admin/index'
import { objectDeepClone } from '@apps/admin/utils/helper'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import InputCheckbox from '../../shared/components/formInputs/inputCheckbox'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, SelectD, Option, Line } from '../styled-components/FilterModalStyle'
import { Loader } from '../../shared/components/Loader'
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
export const InputWrapper = styled.div`
  font-family: Poppins;
  width: 100%;
  margin-bottom: 1rem !important;
  p.error {
    color: red;
    margin: 0.5rem 0 0 0.4rem;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 500;
  }
  input[type='text'] {
    font-family: Poppins;
    font-size: 1.6rem;
    font-weight: 500;
    height: 6rem;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: #333333;
    border: 1.5px solid #d1e0e2;
    width: 100%;
    height: 6rem;
    &::-webkit-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &::placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:disabled {
      background-color: #f3f3f3;
      cursor: not-allowed;
    }
  }
  textarea {
    height: 18rem;
    width: 100%;
    font-family: Poppins;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: #333333;
    background: #fff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    resize: none;
    height: 200px;
    &::-webkit-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &::placeholder {
      color: #515151;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:disabled {
      background-color: #f3f3f3;
      cursor: not-allowed;
    }
  }
  .react-select__control {
    background: #fff;
    border: 1.5px solid #d1e0e2;
    padding: 0;
    height: 6rem;
    box-shadow: none;
    &--is-focused,
    &--is-focused:hover {
      border: 1.5px solid #d1e0e2;
    }
    &--is-disabled {
      background-color: #f3f3f3;
      cursor: not-allowed;
    }
    .react-select__input-container,
    .react-select__single-value {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: normal;
      color: #333333;
      padding: 0;
      margin: 0;
    }
    .react-select__value-container {
      padding: 0 1.6rem;
    }
    .react-select__placeholder {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: normal;
      color: #515151;
    }
    .react-select__indicator-separator {
      display: none;
    }
    .react-select__indicator {
      color: ${({ theme }) => theme.colors.fontdark};
      padding: 1.6rem;
    }
  }
  .react-select__menu {
    border: 1.5px solid #d1e0e2;
    background-color: #fff !important;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  .react-select__menu-list {
    margin: 0;
    padding: 0;
    overflow: auto;
  }
  .react-select__option {
    font-size: 1.6rem;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 600;

    color: #0e1818;
  }
  .react-select__option {
    color: #0e1818;
  }
  .react-select__option--is-selected {
    color: #0e1818;
    font-weight: 700;
  }
  .react-select__option--is-focused {
    background: #fff;
  }
`
interface IInputLabel {
  required: boolean
}

const InputLabel = styled.label<IInputLabel>`
  font-family: Inter;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
`
const TransferNft = ({ data, setOpenModal, commonModalPopup, tokenId }) => {
  const [loading, setLoading] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [showError, setShowError] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>()
  const [userID, setUserId] = useState<any>()
  const [transferData, setTranferData] = useState([])

  const handleChange = (e) => {
    if (!e) {
      setShowError(true)
    } else {
      setLoading(false)
      setShowError(false)
    }
    setUserId(e)
  }

  const handleApply = () => {
    if (!loading) {
      setLoading(true)
    }
    if (userID) {
      let payload = {
        userId: Number(userID.value),
        tokenId: Number(tokenId),
      }

      API.transferNft(payload)
        .then((res) => {
          if (res.status === 200) {
            commonModalPopup('success', res?.data?.message || 'Asset transfer successfully')
          } else {
            commonModalPopup('error', res?.error?.error?.message || 'Transfer failed try again later')
          }
          setOpenModal(false)
        })
        .catch((err) => {
          // commonModalPopup('error', err?.error?.error?.message || 'Transfer failed try again later')
          setOpenModal(false)
        })
    } else {
      setShowError(true)
      // setTimeout(() => {
      //   setShowError(false)
      // }, 5000)
    }
  }

  // useEffect(() => {
  //   // Fetch the list of countries from the REST Countries API

  //   setTranferData(data)

  // }, [transferData])

  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader onClick={() => setOpenModal(false)}>
            <h3>Transfer Asset</h3>
            <span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                  fill="#172F53"
                />
              </svg>
            </span>
          </FilterHeader>
          <InputWrapper>
            <InputLabel required={true}></InputLabel>
            <Select
              placeholder="Select user"
              classNamePrefix="react-select"
              menuPlacement="auto"
              maxMenuHeight={300}
              onChange={handleChange}
              options={data}
              value={userID}
              name="Selectuser"
              // onInputChange={(value) => setCollectionSearchTerm(value)}
              isClearable={true}
            />
            {/* <ErrorText text={errors?.collectionId} /> */}
            {showError && <Errormsg>Please choose an user</Errormsg>}
          </InputWrapper>
          <Line></Line>
          <ButtonComponent>
            <Button1 onClick={() => setOpenModal(false)}>Cancel</Button1>
            <Button2 disabled={loading} onClick={() => handleApply()}>
              {loading && !showError ? (
                <>
                  Loading... <Loader height="20" width="20" />
                </>
              ) : (
                'Transfer Nft'
              )}
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default TransferNft
