import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import API from '../../../api/customer/index'

const Modal = styled.div`
position: absolute;
top: 80px;
right: 0;
height: 368px;
width: 351px;
z-index: 5;
`
const ModalContent = styled.div`
  background-color: white;
  width: 100%;
  margin: auto;
  padding: 3.2rem 2rem 3.9rem 2rem;
  box-shadow: 0px 10px 64px rgba(13, 42, 45, 0.15);

  h3 {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 130%;
    letter-spacing: 0.005em;
    margin-bottom: 1.5rem;
  }

  input {
    border: 0.557143px solid #d9d9d9;
    height: 30px;
    width: 148px;
    padding: 0 1rem;
    &:focus {
      outline: none;
    }
  }
  svg {
    cursor: pointer;
  }
  .mg-right {
    margin-right: 15px;
  }
  .head {
    display: flex;
    justify-content: space-between;

    p {
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 130%;
      letter-spacing: 0.005em;
      padding-bottom: 0.54rem;
    }
    span {
      align-self: center;
    }
  }
  .each-section {
    border-bottom: 1px solid #eaeaea;
    padding: 1.23rem 0;
    label {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.8rem;
    }
    &.acc-open {
      label {
        font-weight: 600;
      }
    }
  }
  .estimate {
    padding: 2.4rem 0 1.2rem;
  }
  .estimate-text {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
    line-height: 130%;
    letter-spacing: 0.005em;
    padding-top: 0.5rem !important;
  }
  .btn-section {
    padding-top: 3.2rem;
    display: flex;
    justify-content: space-between;
    button {
      width: 145px;
      &:first-child {
        background: white;
        color: #2A7575;
      }
    }
  }
`

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownMenu = styled.ul`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const DropdownMenuItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`
const FilterModal = ({ ref, visible, toggle, brandFilter, applyFilter, setBrandFilter }) => {
  const [showBrand, setShowBrand] = useState(false)
  const [items, setItems] = useState([])
  const [currentBrand, setCurrentBrand] = useState('')
  useEffect(() => {
    getAllBrandData()
  }, [])

  const getAllBrandData = async () => {
    const response = await API.getBrands()
    if (response.status === 200) {
      setItems(response?.data?.data)
    } else if (response.status === 400 || response.status === 401 || response.status === 500 || response.status === 412 || response.status === 404) {
      toast.error(response.error.error.message, {
        toastId: 'getAllErrorToast',
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        style: {
          fontSize: '1.6rem',
        },
      })
    }
  }

  const handleUpdate = (type: string) => {
    // applyFilter(type,priceFilter)
    applyFilter(type, { brand : brandFilter })
    if (type === 'apply') toggle()
    else {
      // setPriceFilter({min:0, max:0})
      setBrandFilter('')
      setCurrentBrand('')
    }
  }
  const updateBrand = (item) => {
    setCurrentBrand(item.toString())
    setBrandFilter(item.toString())
  }

  return visible ? (
    <Modal ref={ref}>
      <ModalContent role="dialog" aria-modal="true">
        <h3>Filter By</h3>
        <section className={`each-section ${showBrand ? 'acc-open' : ''}`} onClick={() => setShowBrand(!showBrand)}>
          <div className="head">
            <label>Brands</label>
            <span>
              <Icon name={showBrand ? 'resize-up' : 'resize-down'} />
            </span>
          </div>
          {showBrand && (
            <>
              <DropdownContainer onClick={() => setShowBrand(!showBrand)}>
                <DropdownMenu>
                  {items.map((item) => (
                    <>
                      <DropdownMenuItem key={item} value={item} onClick={() => updateBrand(item)}>
                        {item}
                      </DropdownMenuItem>
                    </>
                  ))}
                </DropdownMenu>
              </DropdownContainer>
            </>
          )}
          {!showBrand && currentBrand && <p className="estimate-text">{currentBrand}</p>}
        </section>
        <section className="btn-section">
          <ButtonPrimary padding="1.2rem 4.8rem" onClick={() => handleUpdate('clear')}>
            Clear
          </ButtonPrimary>
          <ButtonPrimary padding="1.2rem 4.8rem" onClick={() => handleUpdate('apply')}>
            Apply
          </ButtonPrimary>
        </section>
      </ModalContent>
    </Modal>
  ) : null
}

export default React.memo(FilterModal)
