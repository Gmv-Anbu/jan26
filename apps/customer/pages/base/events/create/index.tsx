import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { NextPage } from 'next'
import styled from 'styled-components'
import RadioButton from '@apps/customer/components/Radio-button/radio-btn'
import { useRouter } from 'next/router'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import API from '../../../../api/customer/index'
import CustomTimePicker from '@apps/customer/components/Mui-date-picker'
import { Loader } from '@apps/customer/modules/shared/components/Loader'
import Image from 'next/image'

interface StyleProps {
  isColor?: string
  isHide?: boolean
  isRowGap?: string
}

const Container = styled.div`
  width: 100%;
`
const FormWrapper = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8rem 0;
  padding: 10rem 18rem 12rem 18rem;
  @media screen and (max-width: 1722px) {
    padding: 6rem 10rem 10rem 10rem;
  }
  @media screen and (max-width: 1568px) {
    padding: 6rem 2rem 10rem 2rem;
  }
  @media screen and (max-width: 768px) {
    padding: 6rem 0rem 10rem 0rem;
  }
`

const SectionWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  .field-header {
    font-style: normal;
    font-weight: 400;
    font-size: 3.2rem;
    line-height: 104%;
    text-transform: uppercase;
    color: #111727;
  }
  .date-header {
    position: relative;
  }
  @media screen and (max-width: 768px) {
    gap: 21px;
    .field-header {
      font-size: 3rem;
    }
  }
`

const GridContianer = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 640px 640px;
  column-gap: 80px;
  row-gap: ${(props) => (props.isRowGap ? props.isRowGap : '40px')};
  padding: 0rem;
  place-content: center;
  .close-btn {
    width: fit-content;
    display: block;
    position: absolute;
    right: -3.5%;
    top: 25%;
    display: block;
    color: #fff;
    padding: 0.6rem 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
  }
  @media screen and (max-width: 1424px) {
    place-content: center;
    grid-template-columns: 640px;
    row-gap: ${(props) => (props.isRowGap ? props.isRowGap : '20px')};
  }
  @media screen and (max-width: 795px) {
    .close-btn {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 342px;
    row-gap: ${(props) => (props.isRowGap ? props.isRowGap : '20px')};
  }
`

const Flex = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
    color: #121212;
  }
  textarea {
    width: 100%;
    min-height: 140px;
    border: 1.5px solid #d0d0d0;
    resize: vertical;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    padding: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  @media screen and (max-width: 1424px) {
    padding: 0 10%;
  }
  @media screen and (max-width: 768px) {
    padding: 0 24px;
    gap: 6px 0;
    .text-area {
      p {
        font-size: 1.75rem;
      }
    }
  }
`
const Input = styled.input`
  position: relative;
  width: 100%;
  height: 5.2rem;
  padding: 0.5rem 2rem;
  border: 1.5px solid #d0d0d0;
  background: none;
  box-sizing: border-box;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.md};
`
const ButtonBox = styled.div`
  max-width: 1360px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  align-items: center;
  gap: 2rem;
  @media screen and (max-width: 1424px) {
    padding: 0 10%;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
    flex-direction: column-reverse;
    justify-content: center;
  }
`
const CancelButton = styled.button`
  display: block;
  width: 137px;
  height: 46px;
  /* padding: 1.4rem 3rem; */
  background: #ffffff;
  border: 1px solid #29898b;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 140.02%;
  color: #2a7575;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 342px;
    height: 50px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 2.25rem;
  }
`
const ButtonPrimary = styled.button`
  padding: '1.6rem 4rem';
  background: #29898b;
  cursor: pointer;
  width: 195px;
  height: 46px;
  border: 1px solid #29898b;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  :disabled {
    filter: blur(0.6px);
    cursor: not-allowed;
  }
  .loader {
    position: absolute;
  }
  @media screen and (max-width: 768px) {
    width: 342px;
    height: 50px;
  }
`

export const ErrorMessageBox = styled.span`
  color: red;
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
`
const ErrorMessageBox2 = styled.span`
  position: absolute;
  top: 470%;
  color: red;
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  @media screen and (max-width: 1500px) {
    top: 490%;
  }
  @media screen and (max-width: 1100px) {
    top: 520%;
  }
  @media screen and (max-width: 900px) {
    top: 540%;
  }
  @media screen and (max-width: 768px) {
    top: 490%;
  }
`

const EventsPage: NextPage = () => {
  const router = useRouter()
  const [state, setState] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    date: [],
    participants: '',
    otherNotes: '',
    facilities: { drinks: false, food: false, dj: false, music: false, presentations: false, branding: false, tour: false },
  })
  const [countryCode, setCountryCode] = useState('')
  const [isErrors, setIsErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    company: false,
    participants: false,
    date: false,
    facilities: false,
  })
  const [btnLoading, setBtnLoading] = useState(false)

  function inputChangeHandler(event) {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
    setIsErrors({ ...isErrors, [name]: false })
    return
  }

  function facilityHandler(item, name) {
    setState({ ...state, facilities: { ...state.facilities, [name]: item.value } })
    return
  }

  function validateForm() {
    let flag = true
    let flag2 = true
    const validationArray = Object.keys(state)
    const optionalFields = ['otherNotes', 'facilities']
    for (const index in validationArray) {
      if (state[validationArray[index]] == '' && !optionalFields.includes(validationArray[index])) {
        setIsErrors((prevState) => ({ ...prevState, [validationArray[index]]: true }))
        flag = false
      }
    }
    if (flag) {
      // u can add your validation
      for (const index in validationArray) {
        if (validationArray[index] === 'fullName') {
          if (!/^[a-zA-Z ]{3,25}$/.test(state.fullName)) {
            Toast.error('Invalid name!')
            flag2 = false
            break
          }
        } else if (validationArray[index] === 'email') {
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
            Toast.error('Invalid Email!')
            flag2 = false
            break
          }
        } else if (validationArray[index] === 'phone') {
          const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/
          if (!phoneRegex.test(state.phone)) {
            Toast.error('Invalid Phone number!')
            flag2 = false
            break
          }
        } else if (validationArray[index] == 'date' && state.date?.length == 0) {
          setIsErrors({ ...isErrors, ['date']: true })
          flag = false
          break
        } else if (validationArray[index] == 'date') {
          let arr = []
          for (let i = 0; i < state.date.length; i++) {
            let timeArr = state.date[i].time.split(/[: ]/)
            arr.push(state.date[i].date+timeArr[0]+timeArr[1]+timeArr[3])
            if (state.date[i].date == '' || state.date[i].time == '') {
              Toast.error('Date or Time missing in one field!')
              flag2 = false
              break
            }
          }
          arr = [...new Set(arr)]
          if(state.date?.length !== arr?.length) {
            Toast.error('Same time cannot be select more than once!')
            flag2 = false
            break
          }
        } else if (validationArray[index] == 'facilities') {
          const mustKeys = ['drinks', 'food', 'tour', 'dj', 'music', 'presentations', 'branding']
          let haveKeys = false
          for (let indx = 0; indx < mustKeys.length; indx++) {
            if (mustKeys[indx] in state.facilities) {
              haveKeys = true
            } else {
              haveKeys = false
              break
            }
          }
          flag = haveKeys
          if (!haveKeys) {
            setIsErrors({ ...isErrors, ['facilities']: true })
          } else {
            setIsErrors({ ...isErrors, ['facilities']: false })
          }
          break
        } else if (validationArray[index] == 'participants' && +state.participants <= 0) {
          Toast.error("Participants value can't be negative")
          flag2 = false
          break
        }
      }
    }
    return { flag, flag2 }
  }

  // Covert 24hrs into 12hrs
  function timeConvert(time) {
    if (time == '' || time == undefined) {
      return null
    }
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1) // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM' // Set AM/PM
      time[0] = +time[0] % 12 || 12 // Adjust hours
    }
    return time.join('')
  }

  async function submitHandler() {
    setBtnLoading(true)
    const { flag, flag2 } = validateForm()
    if (!flag || !flag2) {
      if (!flag) {
        Toast.error('Please fill required fields!')
      }
      setBtnLoading(false)
      return
    }
    const data = {
      name: state.fullName,
      email: state.email,
      phone: state.phone,
      company: state.company,
      preferredDate: state.date?.[0].date,
      preferredTime: timeConvert(state.date?.[0].time),
      preferredDate2: state.date?.[1]?.date || null,
      preferredTime2: timeConvert(state.date?.[1]?.time) || null,
      preferredDate3: state.date?.[2]?.date || null,
      preferredTime3: timeConvert(state.date?.[2]?.time) || null,
      participantCount: state.participants,
      drinks: state.facilities?.drinks,
      food: state.facilities?.food,
      dj: state.facilities?.dj,
      backgroundLoungeMusic: state.facilities?.music,
      projector: state.facilities?.presentations,
      personalizedBranding: state.facilities?.branding,
      privateGuidedTourFGMuseum: state.facilities?.tour,
      otherNotes: state.otherNotes || null,
    }
    const response = await API.eventRequest(data)
    if (response.status == 200) {
      Toast.success('Event Added')
      router.push('/base/events')
      setTimeout(() => {
        setBtnLoading(false)
      }, 2500)
    } else {
      Toast.error(response.message || 'Something went wrong!')
      setBtnLoading(false)
    }
    return
  }

  return (
    <Container>
      <Banner heading={'Host an event'} description={'See what extra we have in store for you..'} maxHeight={'390px'} height={'390px'} />
      <FormWrapper onSubmit={(e) => {
        e.preventDefault()
        submitHandler()
      }}>
        <SectionWrapper>
          <h1 className="field-header">Personal Info</h1>
          <GridContianer>
            <InputBox label={'Full Name*'} type={'text'} name={'fullName'} onchange={inputChangeHandler} placeholder={false} value={state.fullName} isAnyError={isErrors.fullName} />
            <InputBox label={'Email address*'} type={'email'} name={'email'} onchange={inputChangeHandler} placeholder={false} value={state.email} isAnyError={isErrors.email} />
            <CountryCodeInput
              label={'Phone*'}
              type={'number'}
              name={'phone'}
              onchange={(number, country) => {
                setState({ ...state, phone: countryCode !== country?.dialCode ? country?.dialCode : number })
                setCountryCode(country?.dialCode)
                setIsErrors({ ...isErrors, phone: false })
              }}
              placeholder={''}
              value={state.phone}
              isAnyError={isErrors.phone}
            />
            <InputBox label={'Company*'} type={'text'} name={'company'} onchange={inputChangeHandler} placeholder={false} value={state.company} isAnyError={isErrors.company} />
          </GridContianer>
        </SectionWrapper>
        <SectionWrapper>
          <span className="date-header">
            <h1 className="field-header">Date & Time 1</h1>
            <ErrorMessageBox2>{isErrors.date && 'Atleast one date & time required'}</ErrorMessageBox2>
          </span>
          <DateTime
            onAddDate={(dateAndTime) => {
              setState({ ...state, date: dateAndTime })
            }}
            onChangeError={() => {
              setIsErrors({ ...isErrors, ['date']: false })
            }}
            isError={isErrors.date}
          />
        </SectionWrapper>
        <GridContianer>
          <InputBox label={'Number of participants*'} type={'number'} name={'participants'} onchange={inputChangeHandler} placeholder={false} value={state.participants} isAnyError={isErrors.participants} />
        </GridContianer>
        <SectionWrapper>
          <span>
            <h1 className="field-header">
              facility <ErrorMessageBox>{isErrors.facilities && 'All fields required*'}</ErrorMessageBox>
            </h1>
          </span>
          <GridContianer isRowGap={'60px'}>
            <RadioButton label={'Drinks*'} name={'drinks'} onGetValue={facilityHandler} />
            <RadioButton label={'Food*'} name={'food'} onGetValue={facilityHandler} />

            <RadioButton label={'Private Guided Tour of the FG Museum*'} name={'tour'} onGetValue={facilityHandler} />
            <RadioButton label={'On-Site DJ*'} name={'dj'} onGetValue={facilityHandler} />

            <RadioButton label={'Background Lounge Music*'} name={'music'} onGetValue={facilityHandler} />
            <RadioButton label={'Projector for presentations*'} name={'presentations'} onGetValue={facilityHandler} />

            <RadioButton label={'Personalized Branding on 4 Meter Museum Screen*'} name={'branding'} onGetValue={facilityHandler} />
          </GridContianer>
        </SectionWrapper>
        <Flex>
          <p>Other notes</p>
          <textarea maxLength={250} name="otherNotes" value={state.otherNotes} onChange={inputChangeHandler}></textarea>
        </Flex>
        <ButtonBox>
          <ButtonPrimary type='submit' disabled={btnLoading} onClick={submitHandler}>
            {btnLoading && (
              <div className="loader">
                <Loader width="40" opacity="0.5" />
              </div>
            )}
            SUBMIT NOW
          </ButtonPrimary>
          <CancelButton onClick={() => router.push('/base/events')}>Cancel</CancelButton>
        </ButtonBox>
      </FormWrapper>
    </Container>
  )
}

const InputWrapper = styled.div`
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  flex-basis: 56rem;
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
    color: #121212;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    z-index: 4;
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
  .input {
    width: 100%;
    height: 5.2rem;
    border: 1.5px solid #d0d0d0;
    background: none;
    border-radius: 0;
    box-sizing: border-box;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  .date-icon {
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 17px 0 0;
    transform: translate(0, -40px);
  }
  @media screen and (max-width: 768px) {
    label {
      font-size: 1.75rem;
    }
    input[type='date'] {
      z-index: 4;
    }
    input {
      min-height: 52px;
    }
    .input {
      min-height: 52px;
    }
  }
`
interface IinputProps {
  label: string
  type: string
  name: string
  onchange: any
  placeholder: any
  value: string
  isAnyError: any
  isIcon?: any
}
function InputBox({ label, type, name, onchange, placeholder, value, isAnyError, isIcon }: IinputProps) {
  return (
    <InputWrapper>
      <label>{label}</label>
      <Input type={type} name={name} onChange={onchange} placeholder={placeholder ? placeholder : ''} value={value} />
      {isIcon && (
        <div className="date-icon">
          {' '}
          <Image src={'/images/customer/Events/date-img.png'} width={18} height={18} alt={'ICO'} />
        </div>
      )}

      <ErrorMessageBox>{isAnyError && `${label} required`}</ErrorMessageBox>
    </InputWrapper>
  )
}

const CountryCodeInput = ({ label, type, name, onchange, placeholder, value, isAnyError }) => {
  return (
    <InputWrapper>
      <label>{label}</label>
      <PhoneInput inputClass="input" value={value} countryCodeEditable={false} onChange={onchange} placeholder={placeholder} country={'sg'} />
      <ErrorMessageBox>{isAnyError && `${label} required`}</ErrorMessageBox>
    </InputWrapper>
  )
}

const CardButton = styled.a<StyleProps>`
  display: ${(props) => (props.isHide ? 'none' : 'flex')};
  width: fit-content;
  justify-content: center;
  align-items: center;
  min-width: 94px;
  min-height: 32px;
  background: #ffffff;
  border: 1px solid ${(props) => (props.isColor ? props.isColor : '#29898b')};
  cursor: pointer;
  span {
    font-size: 20.18px;
    margin-right: 5px;
  }
  .close-icon {
    font-size: 11.5px;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 140.02%;
  }

  color: ${(props) => (props.isColor ? props.isColor : '#2a7575')};
  @media screen and (max-width: 795px) {
    display: flex;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    font-family: 'Proxima Nova';
    font-weight: 500;
    font-style: normal;
    font-weight: 600;
    font-size: 1.75rem;
  }
`

const DateTime = ({ onAddDate, onChangeError, isError }) => {
  const [state, setState] = useState([])
  const [date1, setDate1] = useState({ id: 1, date1: '', time1: '', error1: false })
  const [date2, setDate2] = useState({ id: 2, date2: '', time2: '', error2: false })
  const [date3, setDate3] = useState({ id: 3, date3: '', time3: '', error3: false })
  const [id, setId] = useState(1)
  const array = []

  for (let i = 1; i <= id; i++) {
    array.push(i)
  }

  useEffect(() => {
    onAddDate(state)
  }, [state])

  const changeHandler = (event) => {
    const { name, value } = event.target
    const isValid = checkDateAndTimeValid(name, value, event.target)
    if (!isValid) {
      return
    }
    if (name == 'date1' || name == 'time1') {
      setDate1({ ...date1, [name]: value })
      addHandler({ ...date1, [name]: value })
    }
    if (name == 'date2' || name == 'time2') {
      setDate2({ ...date2, [name]: value })
      addHandler({ ...date2, [name]: value })
    }
    if (name == 'date3' || name == 'time3') {
      setDate3({ ...date3, [name]: value })
      addHandler({ ...date3, [name]: value })
    }
    return
  }

  function checkDateAndTimeValid(name, value, { isPrevDate }) {
    if (name == 'date1' || name == 'date2' || name == 'date3') {
      date1.error1 = false
      date2.error2 = false
      date3.error3 = false
      if (name == 'date1') {
        date1.time1 = ''
        date1.error1 = true
      }
      if (name == 'date2') {
        date2.time2 = ''
        date2.error2 = true
      }
      if (name == 'date3') {
        date3.time3 = ''
        date3.error3 = true
      }
      if (new Date(value) < new Date(new Date().toDateString())) {
        Toast.error('Selected date is in the past')
        return false
      } else {
        return true
      }
    } else {
      date1.error1 = false
      date2.error2 = false
      date3.error3 = false
      const dateNumber: any = name == 'time1' ? date1.date1 : name == 'time2' ? date2.date2 : date3.date3
      const nowDate = new Date()
      const currentDate = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate()
      const dateAdded = new Date(dateNumber)
      const addedDate = dateAdded.getFullYear() + '/' + (dateAdded.getMonth() + 1) + '/' + dateAdded.getDate()
      if (currentDate == addedDate && isPrevDate) {
        Toast.error('Selected time is in the past')
        if (name == 'time1') {
          date1.time1 = ''
          date1.error1 = true
          addHandler({ ...date1, [name]: '' })
        }
        if (name == 'time2') {
          date2.time2 = ''
          date2.error2 = true
          addHandler({ ...date2, [name]: '' })
        }
        if (name == 'time3') {
          date2.time2 = ''
          date3.error3 = true
          addHandler({ ...date2, [name]: '' })
        }
        return false
      } else {
        return true
      }
    }
  }

  function addHandler(dateAndTime) {
    onChangeError()
    let flag = true
    if (dateAndTime?.remove) {
      const filteredData = state.filter((item) => item.id != dateAndTime.id)
      setState(filteredData)
      return
    }
    if (state.length > 0) {
      state.map((data) => {
        if (data?.id == dateAndTime.id) {
          data.date = dateAndTime[`date${dateAndTime.id}`]
          data.time = dateAndTime[`time${dateAndTime.id}`]
          flag = false
        }
      })
    }
    if (flag) {
      state.push({
        id: dateAndTime?.id,
        date: dateAndTime[`date${dateAndTime.id}`],
        time: dateAndTime[`time${dateAndTime.id}`],
      })
    }
    return
  }

  function removeDate(item) {
    if (item == 2) {
      setDate2({ id: 2, date2: '', time2: '', error2: false })
      addHandler({ id: 2, remove: true })
    }
    if (item == 3) {
      setDate3({ id: 3, date3: '', time3: '', error3: false })
      addHandler({ id: 3, remove: true })
    }
    setId((prev) => prev - 1)
    return
  }

  return (
    <>
      {' '}
      {array.map((item, key) => (
        <GridContianer key={key}>
          <InputBox isIcon={true} label={'Preferred Date ' + item + '*'} type={'date'} name={'date' + item} onchange={changeHandler} placeholder={''} value={item == 1 ? date1.date1 : item == 2 ? date2.date2 : date3.date3} isAnyError={false} />
          <CustomTimePicker
            isLabel={'Preferred Time ' + item + '*'}
            isName={'time' + item}
            isDisabled={item == 1 && date1?.date1 == '' ? true : item == 2 && date2?.date2 == '' ? true : item == 3 && date3?.date3 == '' ? true : false}
            onchange={changeHandler}
            isError={item == 1 ? date1.error1 : item == 2 ? date2.error2 : date3.error3}
            isValue={item == 1 ? date1.time1 : item == 2 ? date2.time2 : date3.time3}
          />
          {id >= 2 && item == array.length && item != 1 && (
            <div className="close-btn" onClick={() => removeDate(item)}>
              <Image src={'/images/customer/Events/events/close-btn.png'} alt="close" width={24} height={24} />
            </div>
          )}
          {id >= 2 && item == array.length && item != 1 && (
            <div>
              <CardButton isColor={'#FF0000'} isHide={true} onClick={() => removeDate(item)}>
                {' '}
                <span className="close-icon">X</span>
                <p className="close-text">Remove</p>
              </CardButton>
            </div>
          )}
        </GridContianer>
      ))}
      {id <= 2 && (
        <CardButton onClick={() => setId((prev) => prev + 1)}>
          <span>+</span> <p>Add More</p>
        </CardButton>
      )}
    </>
  )
}

export default EventsPage
