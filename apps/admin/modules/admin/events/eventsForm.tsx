import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import CustomInputDatePicker from '../../shared/components/datePicker/customDateTime'
import ImageUploader from '../../shared/components/formInputs/ImageUploader'
import InputRadio from '../../shared/components/formInputs/inputRadio'
import InputSelect from '../../shared/components/formInputs/inputSelect'

import { ButtonGradientPrimary } from '../../shared/components/button/button'

import { InputWrapper } from '../../shared/styled-components/formInputs'
import InputText from '../../shared/components/formInputs/inputText'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'

import API from '../../../api/admin/index'
import { APP_ENV } from '../../../config'
import { acceptOnlyNumbersWithDecimals, CharacterCount, handleApiImage, validateForm, acceptNumbersWithDecimal, handleApiDeleteImage, blockSpecialChar, refRegex, objectDeepClone, isValidUrl, localDateToUTC, UTCtoLocalDate, acceptOnlyNumbers } from '../../../utils/helper'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import ErrorModal2 from '../modal/error'
import SuccessModal from '../modal/success'
import MultipleImageUploader from '../../shared/components/formInputs/MultipleImageUploader'
import { Loader } from '@apps/admin/modules/shared/components/Loader'
import useDropdownData from '../../../hooks/addArtworkHook'
import { ModalService } from '@nft-marketplace/modal'
import moment from 'moment'
import { getCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '@apps/admin/utils/storage'
import { RootState } from '@apps/admin/redux/store'
import BackButton from '../components/button/backButton'
import { error } from 'console'
import InputDate from '../../shared/components/formInputs/inputDate'
import InputTime from '../../shared/components/formInputs/inputTime'
import InputDateTime from '../../shared/components/formInputs/inputDateTime'
import DateTimePicker from '../../shared/components/datePicker/dateTimePicker'

const SectionComp = styled.section`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 0 22rem 0;
  color: ${({ theme }) => theme.colors.artWorkText};
  @media screen and (max-width: 768px) {
    padding: 3rem 0 10rem 0;
  }
  &.admin-section {
    margin: 0;
    padding: 0;
    .form-header {
      display: none;
    }
    .form-container {
      margin: 0;
      grid-gap: 4rem;
    }
  }
`
const BackArrowHeading = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: -5rem;
  margin-bottom: 1rem;
  h1 {
    font-family: Poppins;
    font-size: 4rem;
    font-weight: 500;
    line-height: 6rem;
    margin: 0 0 0rem 1rem;
  }
  @media screen and (max-width: 768px) {
    left: 0rem;
    margin-bottom: 3rem;
    h1 {
      font-size: 3rem;
      line-height: normal;
      margin: 0 0 0 1rem;
    }
  }
`
const ProcessStep = styled.div`
  font-family: Poppins;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontdark};
`
const AddArtworkFormContainer = styled.form`
  display: grid;
  grid-template-columns: 50rem 58rem;
  grid-gap: 10rem;
  margin-top: 4rem;
  background: #fafafa;
  box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  @media screen and (max-width: 1310px) {
    grid-template-columns: 1fr 1fr;
    padding: 3rem;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: auto;
    padding: 2rem;
  }
  .upload-box {
    background: #fff;
    border-radius: 8px 0 0 8px;
    position: relative;
    #upload {
      /* margin: 0;
      padding: 0;
      position: absolute;
      background: #fff !important;
      color: black !important;
      width: 26px !important;
      height: 26px !important;
      top: 130px;
      right: 80px;
      border-radius: 50%;
      min-width: inherit !important; */
      // text-indent: -9999px;
      /* &:after {
                content:"x";
                position: absolute;
                top: 0;
                right: 9px;
            } */
      margin: 0 1.2rem;
      position: absolute;
      color: white;
      width: 94% !important;
      background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
      height: auto;
      right: 0;
      padding: 1rem;
      border-radius: 12px;
      min-width: inherit !important;
      bottom: -5%;
    }
    .multi-image-box {
      img {
        max-width: 70px !important;
      }
      label {
        background: #f2f2f2;
        border-radius: 8px;
        width: 120px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        div > div {
          font-weight: 500;
          font-size: 14px;
          margin-top: 5px;
        }
      }
      .img-wrapper {
        border: 1px solid #10b5e6;
        border-radius: 3px;
      }
    }
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
  &:after {
    ${(props) =>
      props.required &&
      `
        content: ' *';
      `}
    color: red;
  }
`

const FormWrapper = styled.div`
  max-width: 100%;
  padding: 4rem 0;
`
// const SingleOption = styled.div`
//     background: ${({ theme }) => theme.colors.singleOptionbg};
//     border: 2px solid ${({ theme }) => theme.colors.borderColor};
//     border-radius: 1.2rem;
//     font-family: Poppins;
//     font-size: 1.4rem;
//     font-weight: 500;
//     line-height: 2.2rem;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     padding: 1rem 2.2rem;
//     margin-right: 3rem;
//     position: relative;
//     z-index: 2;
//     opacity: 0.7;
//     &.active {
//         opacity: 1;
//         border: 2px solid ${({ theme }) => theme.colors.optionActive};
//     }
//     @media screen and (max-width: 520px) {
//         margin-bottom: 1rem;
//     }
// `

const CalenderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1100px) {
    justify-content: left;
    div.date-wrapper:first-child {
      margin-right: 3.2rem;
    }
  }
  @media screen and (max-width: 520px) {
    display: block;
    div.react-datepicker-wrapper:first-child {
      margin-bottom: 2rem;
      margin-right: 0rem;
    }
  }
`
const FormHeader = styled.div``
const BtnWrapper = styled.div`
  margin-top: 6rem;
  button {
    font-size: 1.4rem;
    font-family: 'Inter';
    font-weight: 500;
    line-height: 3rem;
    padding: 1.2rem;
    height: 48px;
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    border-radius: 5px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    .icon-plus {
      width: 15px;
      height: 15px;
      display: inline-block;
      position: relative;
      left: -10px;
      &:before,
      &:after {
        content: '';
        position: absolute;
        background: #fff;
      }

      &:before {
        left: 50%;
        top: 6px;
        bottom: 4px;
        width: 15px;
        height: 2px;
        transform: translateX(-50%);
      }

      &:after {
        top: 50%;
        left: 6px;
        right: 4px;
        height: 15px;
        width: 2px;
        transform: translateY(-50%);
      }
    }
  }
`
const Errormsg = styled.p`
  color: red;
  margin: 0.5rem 0 0 0.4rem;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
`
const LoaderContainer = styled.div`
  position: relative;
`
const Loaderdiv = styled.div`
  position: absolute;
  top: 45%;
  left: 33.5%;
  @media screen and (max-width: 1440px) {
    top: 46%;
    left: 39%;
  }
  @media screen and (max-width: 2560px) {
    top: 46.6%;
    left: 40%;
  }
`

const ErrorP = styled.p`
  color: red;
  margin: 0.5rem 0 2px 1.9rem;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
`

const ErrorText = ({ text }: any) => {
  if (text) {
    return <ErrorP>{text}</ErrorP>
  } else {
    return null
  }
}

const EventsForm = (props: any) => {
  const adminConfig = useSelector<RootState, any>((state) => state?.app?.adminConfig)
  const [creatorSearchTerm, setCreatorSearchTerm] = useState<string>('')
  const [collectionSearchTerm, setCollectionSearchTerm] = useState<string>('')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(null)
  const { admin, isEdit, eventData, onBackClick } = props
  const now = new Date()
  const later = moment(now).add(30, 'm').toDate()
  const btnRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter()
  const formOg = {
    title: '',
    image: '',
    location: '',
    description: '',
    rsvpUrl: '',
    footerNote: '',
    file: '',
    startDate: null,
    endDate: null,
    hostname: '',
    additionalInfo: '',
    prize: '',
    totalTickets: '',
    addTicket: ''
  }
  const formValidation = {
    title: '',
    place: '',
    description: '',
    rsvpUrl: '',
    footerNote: '',
    file: '',
    startDate: '',
    endDate: ''
  }
  let notRequired = ['description', 'rsvpUrl', 'footerNote', 'additionalInfo', 'addTicket']

  const [form, setForm] = useState(formOg)
  const [errors, setErrors] = useState<any>(null)
  const [apiError, setAPIError] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [data, setData] = useState<any>({})
  const [loader, setLoader] = useState<boolean>(false)
  const [showErrors, setShowErrors] = useState(false)
  const [descriptionCount, setDescriptionCount] = useState(0)
  const [shortdescriptionCount, setShortDescriptionCount] = useState(0)
  const sms = ':00.000Z'
  const momentFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    if (!apiError) goToEventsList()
  }

  const goToEventsList = () => router.push('/events')

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShowErrors(true)
    const payload: any = JSON.parse(JSON.stringify(form))
    let result = await validateForm(form, formValidation, notRequired)
    const finalResult = await timeValidation(result)
    console.log('form', form, result, finalResult)
    if (finalResult === true) {
      setErrors({})
      payload.startDate = localDateToUTC(payload.startDate)
      payload.endDate = localDateToUTC(payload.endDate)
      delete payload.file
      console.log('payload', payload)
      if (isEdit) {
        editEvent(payload)
      } else {
        createEvent(payload)
      }
    } else {
      setAPIError(null)
      setErrors(finalResult)
    }
  }

  const handleOnChange = (e: any) => {
    const { name, files } = e?.target
    let { value } = e?.target
    console.log('handleOnChange', value, name)
    if (name === 'file') {
      const [file] = files
      if (file) {
        const imgSrc = URL.createObjectURL(file)
        setForm({
          ...form,
          [name]: imgSrc,
          ['file']: imgSrc,
        })
        uploadMainImage(file)
      }
    } else if(name === 'totalTickets') {
      let val = acceptOnlyNumbers(value)
      if(isEdit) {
        setForm({
          ...form,
          ['addTicket']: val,
        })
      } else {
        setForm({
          ...form,
          [name]: val,
        })
      }
    } else if(name === 'prize') {
      let val = acceptNumbersWithDecimal(value)
      setForm({
        ...form,
        [name]: val,
      })
    } else {
      const result = CharacterCount(value)
      if (name === 'description') {
        setDescriptionCount(result)
      } else if (name === 'shortDescription') {
        setShortDescriptionCount(result)
      } else if (name === 'name' || name === 'title' || name === 'hostname') {
        value = value.replace(/[^\w\s&]/gi, '')
      }
      let allow = blockSpecialChar(value)
      if (allow) {
        setForm({
          ...form,
          [name]: value,
        })
      } else if(name === 'startDate') {
        setForm({
          ...form,
          [name]: value,
          ['endDate']: ''
        })
      } else {
        setForm({
          ...form,
          [name]: value,
        })
      }
    }
  }

  const handleDateChange = (value, name) => {
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleFileUpload = async (fileUrl: string, fileBlob: File) => {
    if (fileBlob) uploadMainImage(fileBlob)
  }

  const createEvent = (payload: any) => {
    setLoading(true)
    delete payload.addTicket
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.addEvent(payload)
      .then((res) => {
        setLoading(false)
        console.log('ress0', res)
        if (res?.data !== null && res?.status === 200) {
          ModalService.close(fullLoader)
          setData(res?.data)
          setAPIError(null)
          openModal()
        } else if (res?.error?.error) {
          ModalService.close(fullLoader)
          ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
        }
      })
      .catch((err) => {
        setLoading(false)
        ModalService.close(fullLoader)
        console.log(err)
      })
  }

  const editEvent = (payload: any) => {
    setLoading(true)
    if(!payload.addTicket) delete payload.addTicket
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.updateEvent(eventData?.id, payload)
      .then((res) => {
        setLoading(false)
        ModalService.close(fullLoader)
        if (res?.data && res?.data != null) {
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else if (res?.error?.error) {
          // openModal();
          ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
          // setAPIError(res?.error?.response?.data?.error?.message);
        }
      })
      .catch((err) => {
        setLoading(false)
        ModalService.close(fullLoader)
        console.log(err)
      })
  }

  const uploadMainImage = (file: any) => {
    setLoader(true)
    API.uploadEventImage(file)
      .then((res) => {
        console.log('res', res)
        setTimeout(() => {
          setLoader(false)
        }, 3000)
        if (res?.data?.data?.imageUrl) {
          setForm((prevForm) => {
            return {
              ...prevForm,
              ['image']: res?.data?.data?.imageUrl,
              ['file']: handleApiImage(res?.data?.data?.imageUrl),
            }
          })
        }
      })
      .catch((err) => {
        setLoader(false)
        console.log(err)
      })
  }

  const DeleteImgFile = (file: any) => {
    console.log('asdasdasdasdasd')
    setForm({
      ...form,
      ['file']: '',
      ['image']: '',
    })
  }

  const timeValidation = (result) => {
    let finalResult = {}
    let stDate = moment(form?.startDate).format(momentFormat)
    let edDate = moment(form?.endDate).format(momentFormat)
    console.log('timeValidation stDate', stDate, form?.startDate)
    console.log('timeValidation endDate', edDate, form?.endDate)
    if(stDate && edDate) {
      if(stDate >= edDate) {
        console.log('End date should be greater than Start Date')
        finalResult['endDate'] = 'End date should be greater than Start Date'
      }
    }
    // if(stDate) {
    //   if(stDate < moment().format(momentFormat)) {
    //     console.log('Start Date should be a future date and time')
    //     finalResult['startDate'] = 'Start Date should be a future date and time'
    //   }
    // }
    // if(edDate) {
    //   if(edDate < moment().format(momentFormat)) {
    //     console.log('End Date should be a future date and time')
    //     finalResult['endDate'] = 'End Date should be a future date and time'
    //   }
    // }
    if(Object.keys(finalResult).length === 0 && Object.keys(result).length === 0) {
      return true
    } else {
      return { ...finalResult, ...result }
    }
  }

  useEffect(() => {
    if (isEdit && eventData?.id) {
      console.log('update', isEdit, eventData, eventData?.id)
      const data = eventData
      setForm({
        ...form,
        title: data?.title,
        image: data?.image,
        hostname: data?.hostname,
        location: data?.location,
        description: data?.description,
        rsvpUrl: data?.rsvpUrl,
        footerNote: data?.footerNote,
        file: handleApiImage(data?.image),
        startDate: data?.startDate ? UTCtoLocalDate(data?.startDate) : '',
        endDate: data?.endDate ? UTCtoLocalDate(data?.endDate) : '',
        additionalInfo: data?.additionalInfo,
        totalTickets: data?.totalTickets,
        prize: data?.prize,
        addTicket: data?.addTicket
      })
    }
  }, [isEdit, eventData])

  useEffect(() => {
    (async () => {
      if (showErrors) {    
        const result = await validateForm(form, formValidation, notRequired)
        const finalResult = await timeValidation(result)
        if (finalResult === true) {
          setErrors({})
        } else {
          setErrors(finalResult)
        }
      }
    })()
  }, [form])

  console.log('form', form)

  return (
    <SectionComp className={admin ? 'admin-section' : ''}>
      <FormHeader className="form-header">
        <BackArrowHeading>
          <a onClick={() => (onBackClick ? onBackClick() : {})}>
            <Image src={`/svgs/chevron-arrow-left.svg`} alt="Back" width="42" height="42" />
          </a>
          <h1>Add your Artwork</h1>
        </BackArrowHeading>
      </FormHeader>
      <BackButton onClick={() => onBackClick()} />
      <AddArtworkFormContainer className="form-container">
        <div className="upload-box">
          <LoaderContainer>
            <ImageUploader label="Upload your event banner" value={form?.file} supImgText={`Supported formats are .png, .jpg, .jpeg, .webp`} onlyImg={true} onChange={handleFileUpload} onDelete={DeleteImgFile} loader={loader && loader} required={true} mainAssetType={'images'} disabled={false}></ImageUploader>
            <Loaderdiv>{loader && <Loader width="100" height="60" />}</Loaderdiv>
          </LoaderContainer>
          <ErrorText text={errors?.file} />
        </div>
        <FormWrapper>
          <InputText label={`Event Title`} onChange={handleOnChange} value={form?.title} name={`title`} error={errors?.title} placeholder={`Enter title`} required={true} />
          <InputText label={`Host Name`} onChange={handleOnChange} value={form?.hostname} name={`hostname`} error={errors?.hostname} placeholder={`Enter hostname`} required={true} />
          <DateTimePicker label={`Start Date`} min={'noval'} name={`startDate`} onChange={handleDateChange} value={form?.startDate} error={errors?.startDate} placeholder={`Enter start date`} required={true}  />
          <DateTimePicker label={`End Date`} min={form?.startDate} name={`endDate`} onChange={handleDateChange} value={form?.endDate} error={errors?.endDate} placeholder={`Enter end date`} required={true}  />
          {/* <InputDateTime label={`Start Date`} min={new Date().toISOString().slice(0, 16)} onChange={handleOnChange} value={form?.startDate} name={`startDate`} error={errors?.startDate} placeholder={`Enter start date`} required={true} />        
          <InputDateTime label={`End Date`} min={form?.startDate} onChange={handleOnChange} value={form?.endDate} name={`endDate`} error={errors?.endDate} placeholder={`Enter end date`} required={true} /> */}
          {/* <InputTime label={`Time`} onChange={handleOnChange} value={form?.time} name={`time`} error={errors?.time} placeholder={`Enter time`} required={true} /> */}
          <InputText label={`Location`} onChange={handleOnChange} value={form?.location} name={`location`} error={errors?.location} placeholder={`Enter location`} required={true} />
          <InputText label={`RSVP`} onChange={handleOnChange} value={form?.rsvpUrl} name={`rsvpUrl`} error={errors?.rsvpUrl} placeholder={`Enter RSVP url`} />
          <InputText required={true} label={`Ticket Price`} onChange={handleOnChange} value={form?.prize} name={`prize`} error={errors?.prize} placeholder={`Enter price`} />
          <InputText required={true} label={`Total Tickets`} onChange={handleOnChange} disabled={isEdit} value={form?.totalTickets} name={`totalTickets`} error={errors?.totalTickets} placeholder={`Enter Total Tickets`} />
          {isEdit 
          ? <InputText label={`Add Tickets`} onChange={handleOnChange} value={form?.addTicket} name={`addTicket`} error={errors?.addTicket} placeholder={`Enter Tickets`} /> 
          : null}
          <InputTextarea
            label={`Description`}
            onChange={handleOnChange}
            value={form?.description}
            error={errors?.description}
            name={`description`}
            placeholder={`Enter Description`}
            descriptionCount={descriptionCount}
          />
          {/* <InputTextarea
            label={`Footer Note`}
            onChange={handleOnChange}
            error={errors?.footerNote}
            value={form?.footerNote}
            name={`footerNote`}
            placeholder={`Enter footer note`}
            shortDescriptionCount={shortdescriptionCount}
          /> */}
          <InputText label={`Additional Info`} onChange={handleOnChange} value={form?.additionalInfo} name={`additionalInfo`} error={errors?.additionalInfo} placeholder={`Enter Additional Info`} />
          <BtnWrapper>
            <ButtonGradientPrimary blockBtn size={`md`} disabled={loading} onClick={handleSubmit} onDoubleClick={() => {}}>
              <span className="icon-plus"></span>
              {isEdit ? 'Update' : 'Continue'}
            </ButtonGradientPrimary>
          </BtnWrapper>
        </FormWrapper>
        {apiError ? <ErrorModal2 show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
      </AddArtworkFormContainer>
    </SectionComp>
  )
}

export default EventsForm

const SellTypeWrapper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 2rem;
`
