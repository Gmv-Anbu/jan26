import React, { forwardRef, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import moment from "moment";

const CustomInputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    padding: 1.6rem;
    border-radius: 1.2rem;
    label {
        font-family: ${({theme}) => theme.fontsFamily.primary};
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 2.1rem;
        color: ${({ theme }) => theme.colors.artWorkText};
    }
    span {
        color: ${({ theme }) => theme.colors.fontdark};
        font-family: ${({theme}) => theme.fontsFamily.primary};
        font-size: 1.4rem;
        font-weight: 500;
    } 
`
const DatePickerWrapper = styled.div`
    max-width: 50rem;
    min-width: 25rem;
    .react-datepicker {
        background: ${({ theme }) => theme.colors.datePickerColor};
        color: ${({ theme }) => theme.colors.fontdark};
        border: none;
        border-radius: 1rem;
        font-family: ${({theme}) => theme.fontsFamily.primary};
        overflow: hidden;
        // width: 40rem;
        // month date picker
        .react-datepicker__month-container {
            margin-bottom: 3rem;
            .react-datepicker__header  {
                background: transparent;
                border: none;
                padding: 3.5rem 4rem 0.5rem;
                .react-datepicker__current-month {
                    font-size: 2rem;
                    font-weight: 500;
                    line-height: 3rem;
                    color: ${({ theme }) => theme.colors.coolGrey};
                    text-align: left;
                    padding-left: 1.2rem;
                    margin-bottom: 2rem;
                }
                .react-datepicker__day-name {
                    color: ${({ theme }) => theme.colors.dayNameColor};
                }
            }
            .react-datepicker-time__header, .react-datepicker-year-header {
                margin-top: 0;
                color: ${({ theme }) => theme.colors.coolGrey};
                font-size: 1.7rem;
                font-weight: 400;
                line-height: 2.5rem;
            }
            .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
                color: ${({ theme }) => theme.colors.coolGrey};
                display: inline-block;
                width: 4rem;
                margin: .5rem;
                height: 4rem;
                font-size: 1.7rem;
                font-weight: 400;
                line-height: 2.5rem;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                &.react-datepicker__day--selected {
                    color: ${({ theme }) => theme.colors.fontprimary};
                }
            }
        }
        
        // time container
        .react-datepicker__input-time-container {
            padding: 0rem 5rem 3.5rem;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .react-datepicker-time__caption {
                font-size: 1.7rem;
                font-weight: 400;
                line-height: 2.5rem;
                color: ${({ theme }) => theme.colors.dayNameColor};
            }
            .react-datepicker-time__input {
                margin: 0;
                input {
                    background: ${({ theme }) => theme.colors.singleOptionbg};
                    border: 0.825561px solid ${({ theme }) => theme.colors.borderColor};
                    border-radius: 1.2rem;
                    font-family: ${({theme}) => theme.fontsFamily.primary};
                    font-size: 1.3rem;
                    font-weight: 500;
                    line-height: 2.1rem;
                    padding: .7rem 1.5rem;
                    color: ${({ theme }) => theme.colors.coolGrey};
                    &[type="time"]::-webkit-calendar-picker-indicator {
                        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
                    }
                }
            }
        }
        // navigation
        .react-datepicker__navigation {
            &.react-datepicker__navigation--previous {
                left: 22rem;
                top: 3.8rem;
            }
            &.react-datepicker__navigation--next {
                left: 26rem;
                top: 3.8rem;
            }
        }
        // triangle
        .react-datepicker__triangle {
            display: none;
        }
        // timepicker
        .react-datepicker__time-container, .react-datepicker__time-box {
            background: ${({ theme }) => theme.colors.datePickerColor};
            width: 12rem;
            border: none !important;
        }
        .react-datepicker__header, .react-datepicker__time-list-item, .react-datepicker__time {
            border: none;
            background: ${({ theme }) => theme.colors.datePickerColor};
            color: ${({ theme }) => theme.colors.coolGrey} !important;
        }
        .react-datepicker__time-list-item {
            font-size: 1.7rem;
            font-weight: 400 !important;
            line-height: 2.5rem;
        }
        .react-datepicker__time-list-item--selected {
            color: ${({ theme }) => theme.colors.white} !important;
        }
        .react-datepicker-time__header {
            font-size: 2rem;
            font-weight: 500;
            line-height: 3rem;
            color: ${({ theme }) => theme.colors.coolGrey};
            text-align: left;
            padding-left: 1rem;
        }
        .react-datepicker__time-container {
            background: ${({ theme }) => theme.colors.datePickerColor};
            border: 1px solid ${({ theme }) => theme.colors.coolGrey}
        }
        @media screen and (max-width: 1100px) {
            min-width: 32rem;
        }

        @media screen and (max-width: 400px) {
            .react-datepicker__month-container .react-datepicker__header {
                padding: 3.5rem 1rem 0.5rem;
            }
            .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
                width: 3.5rem !important;
                height: 3.5rem !important;
            }
            .react-datepicker__time-container, .react-datepicker__time-box {
                width: 11rem;
            }
        }
    }
`

const CustomInputDatePicker = (props: any) => {

    const { label, timeLabel, onChange, startTimeError, endTimeError, disabled, auctionStart, auctionEnd } = props
    const now = new Date()
    const Currentdate = auctionStart ? new Date(auctionStart) : auctionEnd ? new Date(auctionEnd) : timeLabel == 'End With' ? now.setMinutes(now.getMinutes() + 30) : now
    const [startDate, setStartDate] = useState(Currentdate);
    const datePicker = useRef(null);



    const CustomInput = (({ value, onClick, onChange, }: any) => {
        return (
            <CustomInputWrapper onChange={onChange} onClick={onClick} ref={datePicker}>
                <label>{label}</label>
                <span>{value}</span>
                <Image src={`/svgs/calender.svg`} alt={`calender`} width="16" height="16" />
            </CustomInputWrapper>
        )
    });

    return (
        <DatePickerWrapper>
            <DatePicker
                minDate={new Date()}
                selected={startDate}
                onChange={(date: Date) => {
                    setStartDate(date);
                    onChange(date);
                }}
                customInput={<CustomInput />}
                timeInputLabel={timeLabel}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeSelect
                minTime={moment().toDate().getTime()}
                maxTime={moment().endOf('day').toDate().getTime()}
                timeIntervals={1}
                popperPlacement="bottom-end"
                disabled={disabled}
            />
            <p className="error">{timeLabel == 'Start With' ? startTimeError : endTimeError}</p>
        </DatePickerWrapper>
    );
};

export default CustomInputDatePicker