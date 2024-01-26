import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image'
import Select from 'react-select';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import CustomInputDatePicker from '@apps/customer/modules/shared/components/datePicker/customDateTime';
import InputText from '@apps/customer/modules/shared/components/formInputs/inputText';
import InputDate from '@apps/customer/modules/shared/components/formInputs/inputDate';
import { ButtonPrimary, ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = []

const FilterWrapper = styled.div`
    .display-block{
        display:block !important;
    }
    .filter-options{
        display:none;
        z-index: 1000;
        width: 640px;
        height:100vh;
        right:0px;
        top:0px;
        position:fixed;
        padding: 40px;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        background-color: #fff;
        box-shadow: 0px 0px 20px -2px rgba(0,0,0,0.25), 2px 2px 4px 4px rgba(0,0,0,0.06);
        font-size:16px;
        @media screen and (max-width: 768px) {
            width: 100%;
            padding: 24px;
        }
    }
`
const FilterHeader = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 54px;
    h3 {
        font-size: 24px;
        font-weight: 600;
        line-height: 31px;
        color: #2A7575;
    }
    .close-btn {
        position: absolute;
        right: 0; 
        top: 0
    }
`
const FilterContent = styled.div`
    h4 {
        font-size: 20px;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0.005em;
        color: #121212;
    }
    a {
        margin: 12px 0;
        cursor: pointer;
        display: inline-block;
    }
    .accordion {
        &:before {
            display: none;
        }
        &.Mui-expanded {
            margin: 0;
            padding-bottom: 24px;
        }
        &:after {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            content: "";
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.12);
            -webkit-transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
        border: none;
        box-shadow: none;
        .accordion-header {
            padding: 0;
            min-height: auto;
            svg {
                width: 20px;
                height: 20px;
            }
            .MuiAccordionSummary-content {
                margin: 24px 0;
            }
            .Mui-expanded {
                margin: 24px 0 16px;
            }
        }
        .accordion-content {
            padding: 0;
        }
        input {
            padding: 16px;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0.005em;
            color: #000000;
            border: 1px solid #D9D9D9;
            width: 100%;
        }
        .estimate-font {
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            color: #8A8A8A;
            margin-top: 10px;
        }
        label {
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            letter-spacing: 0.005em;
            color: #8A8A8A;
            margin-bottom: 8px;
        }
    }
`
const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 4rem;
    @media screen and (max-width: 768px) {
        grid-template-columns: auto;
        grid-gap: 2rem;
    }
    .amount-input {
        margin: 0;
        .MuiInputBase-root {
            border-radius: 0;
            padding-left: 16px;
        }
        .MuiTypography-root {
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0.005em;
            color: #8D8D8D;
        }
        .MuiInputAdornment-root {
            margin: 0;
        }
        input {
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            color: #000000;
            border: none;
            padding: 16px 16px 16px 6px;
        }
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 15px;
    button {
        height: auto;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        :first-child {
            color: #2A7575;
            border: 1px solid #2A7575;
        }
    }
`


const TransactionFilter = (props) => {
    const { show, filterData, setFilterData, applyFilter, brands, closeFilter, button } = props

    const handleChange = (e) => {
        const { name, value } = e?.target
        if(value <= -1) return
        setFilterData({
            ...filterData,
            [name]: value
        })
    }

    const handleSelect = (e) => {
        setFilterData({
            ...filterData,
            ['brand']: e?.value
        })
    }

    const clearFilter = () => {
        setFilterData({
            start: '',
            end: ''
        })
        closeFilter()
    }

    return (
        <FilterWrapper>
            {button 
            ? <div className='filter-image'>
                <Image src="/images/customer/filter-image.png" onClick={() => closeFilter()} className='filter-image' width={50} height={50} />
            </div> 
            : null}
            <div className='filter-overlay'></div>
            <div className={show ? 'filter-options display-block' : 'filter-options'}>
                <FilterHeader>
                    <h3>Filter By</h3>
                    <div className='close-btn'>
                        <Image src="/images/customer/close-cross.png" onClick={() => closeFilter()} width={24} height={24} />
                    </div>
                </FilterHeader>
                <FilterContent>
                    <AccordionWrapper title={`Date Range`}>
                        <GridWrapper>
                            <InputDate value={filterData?.start} onChange={handleChange} placeholder="MM/DD/YYYY" name={`start`} className={`m-0`} label='Start Date' />
                            <InputDate value={filterData?.end} onChange={handleChange} placeholder="MM/DD/YYYY" name={`end`} className={`m-0`} label='End Date' />
                        </GridWrapper>
                    </AccordionWrapper>
                    <ButtonWrapper>
                        <ButtonPrimaryOutline onClick={() => clearFilter()}>Reset</ButtonPrimaryOutline>
                        {/* <ButtonPrimary onClick={() => applyFilter()}>Apply</ButtonPrimary> */}
                    </ButtonWrapper>
                </FilterContent>
            </div>
        </FilterWrapper>
    )
}

export default TransactionFilter;

const AccordionWrapper = (props) => {

    const { children, title } = props

    return (
        <Accordion className='accordion'>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='accordion-header'
            >
                <h4>{title}</h4>
            </AccordionSummary>
            <AccordionDetails className='accordion-content'>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}