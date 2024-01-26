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
import { acceptOnlyNumbersWithDecimals, CharacterCount, handleApiImage, validateForm, acceptNumbersWithDecimal, handleApiDeleteImage, blockSpecialChar, refRegex, objectDeepClone, acceptOnlyNumbers, appendS3url, localToServer, serverToLocal } from '../../../utils/helper'
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
import AssetAttributes from './assetAttributes'
import { error } from 'console'
import SingleSelect from '../../shared/components/formInputs/singleSelect'
import { LinksAnchor, InputCheckbox } from '../styled-components/formInputs'
import Icon from '../../shared/components/icon/icon'
import ArtworkInputFile from '../../shared/components/formInputs/artworkInputFile'

const SectionComp = styled.section`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 0 22rem 0;
  color: ${({ theme }) => theme.colors.artWorkText};
  .margin-bottom-2vh{
    margin-bottom:2vh;
  }
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
  .color-black{
    color: #000 !important;
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
const AddArtworkFormContainer = styled.div`
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
  .thumnail-wrapper {
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
        min-width:120px;
        height: 100px;
        min-height:100px;
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
  .pdf-file-upload {
    margin: 40px 20px 20px;
    .pdf-wrapper {
      display: grid;
      grid-template-columns: 340px 30px;
      align-items: center;
      a {
        cursor: pointer;
        display: inline-block;
        height: 20px;
      }
    }
    p {
      margin: 0.5rem 0 2px 0rem;
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

const DHead = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #323232;
    margin-top: 25px;
    margin-bottom: 10px;
    line-height: 21px;
`

const ErrorText = ({ text }: any) => {
  if (text) {
    return <ErrorP>{text}</ErrorP>
  } else {
    return null
  }
}

const AddArtwork = (props: any) => {
  const adminConfig = useSelector<RootState, any>((state) => state?.app?.adminConfig)
  const [creatorSearchTerm, setCreatorSearchTerm] = useState<string>('')
  const [collectionSearchTerm, setCollectionSearchTerm] = useState<string>('')
  const [showAuction, setShowAuction] = useState<boolean>(false)
  const [auctionTime, setAuctionTime] = useState({ auctionStart: null, auctionEnd: null })
  const [subCategory, setSubCategory] = useState<any>([])
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(null)
  const { admin, isEdit, assetData, onBackClick } = props
  const now = new Date()
  const later = moment(now).add(30, 'm').toDate()
  const btnRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter()
  const formOg = {
    name: '',
    type: 'museum',
    year: '',
    refNo: "",
    refName: "",
    fourthLine: '',
    description: '',
    shortDescription: '',
    mainAssetUrl: '',
    mainAssetlpfsUrl: '',
    mainAssetType: 'images',
    auctionType: 'normal',
    // creatorId: null,
    categoryId: null,
    subCategoryId: null,
    subCategoryObj: null,
    // collectionId: null,
    // totalEditionCount: '',
    primarySalePrice: '',
    currencyId: '',
    royaltyPercentage: null,
    minPrice: null,
    maxPrice: null,
    // artistName: '',
    saleType: 'fixed',
    // ...((saleType !== 'basicSetting') && ({ isEnable: isEnable })),
    auctionStart: now,
    auctionEnd: later,
    // nftType: '',
    sell: false,
    imgFile: '',
    supportingAssetMediaFiles: [],
    // creatorObj: null,
    categoryObj: null,
    // collectionObj: null,
    // attributes: [{}]
    // assetHeight: '',
    // assetWidth: '',
    // assetWeight: '',
    "auctionID": null,
    "sku": null,
    "lotNumber": null,
    "lotAssay": null,
    "biography": null,
    "conditionalReportUrl" : null,
    isHighlight: false,
    thumbnailURL: null
  }
  const formValidation = {
    name: '',
    type: 'museum',
    year: '',
    refNo: "",
    refName: "",
    description: '',
    shortDescription: '',
    mainAssetUrl: '',
    mainAssetlpfsUrl: '',
    mainAssetType: '',
    // creator: '',
    category: '',
    // subCategoryId: '',
    // collection: '',
    // totalEditionCount: '',
    primarySalePrice: '',
    currencyId: '',
    royaltyPercentage: '',
    auctionStart: '',
    auctionEnd: '',
  }
  const museumNotRequired = ['thumbnailURL', 'minPrice', 'fourthLine', 'maxPrice', 'auctionType', 'auctionID', 'sku', 'lotNumber', 'lotAssay', 'biography', 'conditionalReportUrl']
  const fixedNotRequired = ['thumbnailURL', 'minPrice', 'fourthLine', 'maxPrice', 'auctionType', 'auctionID', 'sku', 'lotNumber', 'lotAssay', 'biography', 'conditionalReportUrl']
  const auctionNotRequired = ['thumbnailURL', 'auctionID', 'fourthLine', 'sku', 'lotNumber', 'lotAssay', 'biography', 'conditionalReportUrl']
  const [form, setForm] = useState(formOg)
  const [errors, setErrors] = useState<any>(null)
  const [apiError, setAPIError] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<any>({})
  const options = [
    { value: 'art', label: 'Art' },
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports' },
  ]
  // const nftTypes = ['Single Upload', 'Collection', 'Edition']
  // const auctionTypeArr = ['Fixed Price', 'Auction']
  const [selectedNFT, setSelectedNFT] = useState(null)

  // const [auctionType] = useState(null)
  const [loader, setLoader] = useState<boolean>(false)
  const [showErrors, setShowErrors] = useState(false)
  const [descriptionCount, setDescriptionCount] = useState(0)
  const [shortdescriptionCount, setShortDescriptionCount] = useState(0)
  const [refNo, setRefNo] = useState()
  const [refName, setRefName] = useState()
  const [year, setYear] = useState([])
  const [pdfError, setPDFError] = useState('')
  const [pdfError2, setPDFError2] = useState('');
  const [highlight, setHighlight] = useState(false)
  const [thumbnailLoader, setThumbnailLoader] = useState(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    if (!apiError) goToArtworkList()
  }

  const goToArtworkList = () => router.push('/artwork')

  const { collection, activeCategory, currency, creators, } = useDropdownData(form?.type === 'buy' ? { type: 'buy'} : '')

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // btnRef.current.setAttribute('disabled', 'disabled')
    if (form?.supportingAssetMediaFiles?.length == 0) {
      delete form.supportingAssetMediaFiles
    }
    setShowErrors(true)
    if (!form?.subCategoryId || !form?.subCategoryId?.length) {
      delete form?.subCategoryId
      delete form?.subCategoryObj
    }
    delete form?.currencyId
    //creates a deep copy of form and removes non required fields to overcome the validation
    const payload: any = JSON.parse(JSON.stringify(form))
    // if (APP_ENV.NETWORK_TYPE == 'HEDERA') delete form.creatorObj
    // delete form.creatorId;

    let result = await validateForm(form, formValidation, form?.type === "museum" ? museumNotRequired : form?.saleType === 'fixed' ? fixedNotRequired : auctionNotRequired)

    if (result === true && pdfError?.length === 0 && pdfError2?.length === 0) {
      setErrors({})
      const supportImages = payload?.supportingAssetMediaFiles?.map((el: any) => {
        return {
          key: el?.filePath,
          fileType: el?.fileType,
        }
      })
      payload.supportingAssetMediaFiles = supportImages
      console.log('supportImages', supportImages)
      delete payload.nftType
      delete payload.sell
      delete payload.imgFile
      delete payload.categoryObj
      delete payload.creatorObj
      delete payload.collectionObj
      delete payload.currencyId
      delete payload?.attributes
      delete payload?.creatorId
      if (form?.saleType === 'fixed') {
        delete payload.auctionStart
        delete payload.auctionEnd
        delete payload.minPrice
        delete payload.maxPrice
      }
      if (form?.type === 'museum') {
        delete payload.auctionStart
        delete payload.auctionEnd
        delete payload.auctionType
        delete payload.auctionID
        delete payload.sku
        delete payload.lotNumber
        delete payload.lotAssay
        delete payload.biography
        delete payload.conditionalReportUrl
      }
      if(form?.saleType === "auction" || form?.saleType === 'fixed') {
        for (const [key, value] of Object.entries(payload)) {
          if(value) {
            payload[key] = value
          } else {
            delete payload[key]
          }
        }
      }
      if (isEdit) {
        editAsset(payload)
      } else {
        createAsset(payload)
      }
    } else {
      setAPIError(null)
      setErrors(result)
      // focusInput(result)
    }
  }

  const handleOnChange = (e: any) => {
    // btnRef.current.removeAttribute('disabled')
    // eslint-disable-next-line no-unsafe-optional-chaining
    let { name, files, value, checked } = e?.target
    console.log('name, files, value, checked', name, files, value, checked)
    if (name === 'imgFile') {
      const [file] = files
      if (file) {
        const imgSrc = URL.createObjectURL(file)
        setForm({
          ...form,
          [name]: imgSrc,
          ['imgFile']: imgSrc,
        })
        uploadMainImage(file)
      }
    } 
    else if (name === 'assetHeight' || name === 'assetWidth' || name === 'assetWeight' || name === 'minPrice' || name === 'maxPrice') {
      const val = acceptOnlyNumbers(value)
      setForm({
        ...form,
        [name]: val,
      })
    } 
    else if (name === 'primarySalePrice' || name === 'royaltyPercentage') {
      const valid = acceptOnlyNumbersWithDecimals(value)
        ; (value === '' || valid === true) &&
          setForm({
            ...form,
            [name]: value,
          })
    } else if (name === 'year') {
      const val = acceptOnlyNumbersWithDecimals(value)
      if (val && value?.length <= 4 || value?.length === 0) {
        setForm({
          ...form,
          [name]: value,
        })
      }
    } else if (name === 'highlight') {
      setForm({
        ...form,
        isHighlight: checked,
      })
    } else if (name === 'saleType') {
      setForm({
        ...form,
        [name]: value,
        isHighlight: false,
      })
    }
    else {
      const result = CharacterCount(value)
      if (name === 'description') {
        setDescriptionCount(result)
      } else if (name === 'shortDescription') {
        setShortDescriptionCount(result)
      } else if (name === 'name' || name === 'artistName') {
        value = value.replace(/[^\w\s&]/gi, '')
      } else if (name === 'refNo') {
        setRefNo(result)
      }
      else if (name === 'refName') {
        setRefName(result)
      }
      let allow = blockSpecialChar(value)
      if (allow) {
        setForm({
          ...form,
          [name]: value,
        })
      } else {
        setForm({
          ...form,
          [name]: value,
        })
      }
    }
  }

  const handleCategory = (e: any, type: string) => {
    // btnRef.current.removeAttribute('disabled')
    const objStr = (type + 'Obj').replace('Id', '')
    if (e === null) {
      setForm({
        ...form,
        [type]: null,
        [objStr]: e,
      })
    }
    else if (type === 'year') {
      setForm({
        ...form,
        [type]: (e.value.toString()),
        [objStr]: e,
      })
    }
    else if (type === 'subCategoryId') {
      setForm({
        ...form,
        [type]: (e),
        [objStr]: e,
      })
    }
    else {
      setForm({
        ...form,
        [type]: Number(e?.value),
        [objStr]: e,
      })

    }
  }

  const auctionStartHandle = (data: Date) => {
    // btnRef.current.removeAttribute('disabled')
    setForm({ ...form, auctionStart: data })
    // console.log('auctionStartHandle', data, localToServer(data))
  }
  const auctionEndHandle = (data: Date) => {
    // btnRef.current.removeAttribute('disabled')
    setForm({ ...form, auctionEnd: data })
    // console.log('auctionEndHandle', data, localToServer(data))
  }

  const handleFileUpload = async (fileUrl: string, fileBlob: File) => {
    if (fileBlob) uploadMainImage(fileBlob)
  }

  const handlePDFFileUpload = async (e: any) => {
    const { name } = e?.target
    if (e?.target.files?.[0]) {
      const fileName = e?.target.files?.[0].name;
      if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) !== 'pdf') {
        if (name === 'conditionalReportUrl') {
          setPDFError('Supported file format is pdf.')
        } else {
          setPDFError2('Supported file format is pdf.')
        }
        e.preventDefault()
        return false
      } else {
        if (name === 'conditionalReportUrl') {
          setPDFError('')
        } else {
          setPDFError2('')
        }
        API.uploadAuctionPDF(e?.target.files?.[0])
          .then(res => {
            console.log('pdf res', res)
            if (res?.data?.data?.s3Key)
              setForm({
                ...form,
                [name]: res?.data?.data?.s3Key
              })
          })
          .catch(err => {
            console.log('err', err)
          })
      }
    }
  }

  const createAsset = (payload: any) => {
    payload.subCategoryIds = []
    if (payload.subCategoryId?.length) {
      payload.subCategoryId.forEach((e) => {
        payload.subCategoryIds.push(e?.value)
      })
    }
    let newPayload = objectDeepClone(payload)
    delete newPayload.subCategoryId
    delete newPayload.subCategoryObj
   
    if (form?.saleType === 'fixed') {
      delete newPayload.auctionType
    }
    if(form?.saleType === 'auction') {
      newPayload['auctionStart'] = localToServer(payload?.auctionStart)
      newPayload['auctionEnd'] = localToServer(payload?.auctionEnd)
    }
    if(form?.type === 'museum') newPayload['saleType'] = null
    delete newPayload.imgFile
    delete newPayload.categoryObj
    console.log('final payload add', newPayload)
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.addAsset(newPayload)
      .then((res) => {
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
        ModalService.close(fullLoader)
        console.log(err)
      })
  }

  const editAsset = (payload: any) => {
    let newPayload = objectDeepClone(payload)
    delete newPayload.subCategoryId
    delete newPayload.subCategoryObj
    console.log('final payload edit', newPayload)
    if (form?.saleType === 'fixed') {
      delete newPayload.auctionType
      delete newPayload?.conditionalReportUrl
    }
    if(form?.saleType === 'auction') {
      newPayload['startTime'] = localToServer(payload?.auctionStart)
      newPayload['endTime'] = localToServer(payload?.auctionEnd)
    }
    delete newPayload.auctionStart
    delete newPayload.auctionEnd
    delete newPayload.imgFile
    delete newPayload.categoryObj
    if(form?.type === 'museum') newPayload['saleType'] = null
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.updateAsset(assetData?.id, newPayload)
      .then((res) => {
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
        ModalService.close(fullLoader)
        console.log(err)
      })
  }

  const uploadMainImage = (file: any) => {
    setLoader(true)
    API.uploadAssetMainImage(file)
      .then((res) => {
        setTimeout(() => {
          setLoader(false)
        }, 3000)
        if (res?.data?.data?.s3Key) {
          let mediaType = 'images'
          const validVideoExtensions = ['mp4'] //adding some valid image extensions in array
          const validAudioExtensions = ['mp3', 'mpeg', 'wav']

          const fileType = res?.data?.data?.s3Key?.split('.')?.[res?.data?.data?.s3Key?.split('.')?.length - 1]
          if (validVideoExtensions.includes(fileType)) {
            mediaType = 'video'
          }
          if (validAudioExtensions.includes(fileType)) {
            mediaType = 'audio'
          }

          setForm((prevForm) => {
            return {
              ...prevForm,
              ['mainAssetUrl']: res?.data?.data?.s3Key,
              ['mainAssetlpfsUrl']: res?.data?.data?.ipfsHash,
              ['imgFile']: handleApiImage(res?.data?.data?.s3Key),
              ['mainAssetType']: mediaType,
            }
          })
        }
      })
      .catch((err) => {
        setLoader(false)
        console.log(err)
      })
  }

  const getSubData = (page: number, limit = 10) => {
    let query = `?page=${page}&items=${limit}`
    if (searchQuery) {
      query += `&search=${searchQuery}`
    }
    API.subCategoryData(page, limit, searchQuery)
      .then((res) => {
        setPage(page)
        if (res) {
          setSubCategory(res?.data?.data?.subCategoryList)
        }
        // setModalOpen(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const DeleteImgFile = (file: any) => {
    const DeleteFile = handleApiDeleteImage(file)
    API.deleteImage(DeleteFile)
      .then((res: any) => {
        if (res) {
          setForm({
            ...form,
            ['mainAssetUrl']: null,
            ['imgFile']: null,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteThumbnail = () => {
    setForm({
      ...form,
      ['thumbnailURL']: ''
    })
  }

  const uploadThumbNail = (e) => {
    const { name, files, checked } = e.target
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const fileType = files?.[0]?.type
    const fileSize = files?.[0]?.size
    if (!validExtensions.includes(fileType)) {
      openModal()
      setAPIError('Only supports image files with jpeg, png, jpg or webp')
      return false
    }
    if (fileSize >= 200000) {
      openModal()
      setAPIError('File size should be less than 200kb')
      return false
    }
    const [file] = files
    if (!file) return
    API.uploadSupportImage(file)
      .then((res) => {
        if (res?.data?.data?.s3Key) {
          setForm({
            ...form,
            thumbnailURL: res?.data?.data?.s3Key,
          })
        }
      })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleSuppportFileUpload = async (file: File) => {
    API.uploadSupportImage(file)
      .then((res) => {
        if (res?.data?.data?.s3Key) {
          const temp: any = [
            ...form.supportingAssetMediaFiles,
            {
              filePath: handleApiImage(res?.data?.data?.s3Key),
              fileType: res?.data?.data?.fileType,
            },
          ]
          setForm({
            ...form,
            supportingAssetMediaFiles: temp,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const DeleteSupportFile = (file: any, index: any) => {
    const DeleteFile = handleApiDeleteImage(file)
    API.deleteSupportImage(DeleteFile)
      .then((res: any) => {
        if (res) {
          const tempSupportfile = form.supportingAssetMediaFiles
          tempSupportfile.splice(index, 1)
          setForm({
            ...form,
            supportingAssetMediaFiles: tempSupportfile,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getYearValues = (min: any, max: any) => {
    let yearsArray: any = [];
    for (let i = min; i <= max; i++) {
      yearsArray.push({ label: i.toString(), value: i });

    }
    setYear(yearsArray)
  }

  useEffect(() => {
    getYearValues(1800, 2999)
  }, [])

  useEffect(() => {
    getSubData(page, 100)
  }, [])

  useEffect(() => {
    if (adminConfig?.length) {
      const arr = adminConfig.find((el) => el?.config === 'sale.primary.auction')
      if (arr?.value === 'true') {
        setShowAuction(true)
      } else {
        setShowAuction(false)
      }
    }
  }, [adminConfig])

  useEffect(() => {
    // if (isEdit) {
    //   edit disable for phase1
    //   goToArtworkList();
    // }
    if (isEdit && assetData?.id) {
      const data = objectDeepClone(assetData)
      console.log('assetData', assetData)
      const yearValue = year.find((el: any) => el?.value === (data?.year))
      console.log(yearValue, "year")
      let subCategoryArr = [];
      if (data?.AssetSubCategories) {
        data?.AssetSubCategories.forEach(el => {
          let obj = { label: el?.subCategory?.name, value: el?.subCategory?.id }
          subCategoryArr.push(obj)
        })
      }

      // const subCategoryArr=subCategory?.((el: any) => Number(el?.id) === Number(data?.subCategoryId))

      const foundCategory = activeCategory.find((el: any) => Number(el?.id) === Number(data?.categoryId))
      // const foundCollection = collection.find((el: any) => Number(el?.id) === Number(data?.collectionId))
      const creatorObj = { label: data?.assetCreator?.firstName + ' ' + (data?.assetCreator?.lastName || ' '), value: assetData?.ownerId }
      let auctionData = null
      if (assetData?.saleType === "auction") {
        auctionData = assetData?.editions?.[1]?.auctionsData?.[0]
        if (auctionData?.startTime && auctionData?.endTime) {
          // console.log('auctionData?.startTime && auctionData?.endTime', auctionData?.startTime, serverToLocal(auctionData?.startTime))
          setAuctionTime({ auctionStart: serverToLocal(auctionData?.startTime), auctionEnd: serverToLocal(auctionData?.endTime) })
        }
      }

      setForm({
        ...form,
        name: data?.name,
        year: data?.year,
        refNo: data?.refNo,
        refName: data?.refName,
        fourthLine: data?.fourthLine,
        description: data?.description,
        shortDescription: data?.shortDescription,
        imgFile: handleApiImage(data?.mainAssetUrl),
        mainAssetUrl: data?.mainAssetUrl,
        mainAssetlpfsUrl: data?.mainAssetlpfsUrl,
        mainAssetType: data?.mainAssetType,
        categoryId: data?.categoryId,
        auctionStart: serverToLocal(auctionData?.startTime),
        auctionEnd: serverToLocal(auctionData?.endTime),
        // collectionId: data?.collectionId,
        // creatorId: data?.creatorId,
        // totalEditionCount: data?.totalEditionCount,
        primarySalePrice: data?.primarySalePrice ? parseFloat(data?.primarySalePrice).toString() : '0',
        minPrice: Number(auctionData?.minPrice),
        maxPrice: Number(auctionData?.maxPrice),
        currencyId: data?.currencyId,
        royaltyPercentage: data?.royaltyPercentage,
        supportingAssetMediaFiles: data?.assetMediaFileData,
        // artistName: assetData?.assetsData?.artistName,
        categoryObj: foundCategory,
        subCategoryObj: subCategoryArr,
        // new fields
        type: assetData?.type,
        saleType: assetData?.saleType || ' ',
        auctionType: auctionData?.type,
        // assetHeight: assetData?.assetHeight,
        // assetWidth: assetData?.assetWidth,
        // assetWeight: assetData?.assetWeight,
        "auctionID": auctionData?.auctionID,
        "sku": auctionData?.sku,
        "lotNumber": auctionData?.lotNumber,
        "lotAssay": auctionData?.lotAssay,
        "biography": auctionData?.biography,
        "conditionalReportUrl": auctionData?.conditionalReportUrl,
        isHighlight: auctionData?.isHighlight,
        // collectionObj: { ...data?.collectionData, label: data?.collectionData?.name },
        // creatorObj,
        thumbnailURL: assetData?.thumbnailURL
      })
      //
    }
  }, [isEdit, assetData, activeCategory, collection, subCategory, year])

  useEffect(() => {
    (async () => {
      if (showErrors) {
        // delete form.primarySalePrice      
        const result = await validateForm(form, formValidation, form?.type === "museum" ? museumNotRequired : form?.saleType === 'fixed' ? fixedNotRequired : auctionNotRequired)
        if (result == true) {
          setErrors({})
        } else {
          setErrors(result)
        }
      }
    })()
  }, [form])

  console.log('form', form, errors, auctionTime)

  return (
    <SectionComp className={admin ? 'admin-section' : ''}>
      <FormHeader className="form-header">
        <BackArrowHeading>
          <a onClick={() => (onBackClick ? onBackClick() : {})}>
            <Image src={`/svgs/chevron-arrow-left.svg`} alt="Back asdasd" width="42" height="42" />
          </a>
          <h1>Add your Artwork</h1>
        </BackArrowHeading>
        <ProcessStep>Step 1 of 2</ProcessStep>
      </FormHeader>
      <BackButton onClick={() => onBackClick()} />
      <AddArtworkFormContainer className="form-container">
        <div className="upload-box">
          <div>
            <LoaderContainer>
              <ImageUploader label="Upload your Art work" value={form?.imgFile} onlyImg={true} onChange={handleFileUpload} onDelete={DeleteImgFile} loader={loader && loader} required={true} mainAssetType={form?.mainAssetType} 
                // disabled={isEdit}
              ></ImageUploader>
              <Loaderdiv>{loader && <Loader width="100" height="60" />}</Loaderdiv>
            </LoaderContainer>
            <ErrorText text={errors?.imgFile} />
          </div>
          <div className='thumnail-wrapper'>
            {/* <LoaderContainer>
              <ImageUploader className={`thumbnail`} label="Upload thumbnail" value={form?.thumbnailURL} onlyImg={true} onChange={uploadThumbNail} onDelete={deleteThumbnail} loader={loader && loader} required={true} mainAssetType={'images'}></ImageUploader>
              <Loaderdiv>{loader && <Loader width="100" height="60" />}</Loaderdiv>
            </LoaderContainer>
            <ErrorText text={errors?.imgFile} /> */}
            <ArtworkInputFile
              size={`md`}
              noBG={true}
              name={`bannerImageUrl`}
              label={`Upload Thumbnail`}
              value={form?.thumbnailURL}
              onChange={uploadThumbNail}
              error={errors?.thumbnailURL}
              spinloader={thumbnailLoader}
              endLoader={() => {
                setThumbnailLoader(false)
              }}
              info={`Thumbnail will be auto-generated based on Main image selected`}
              required={false}
              disabled={false}
            />
          </div>
          <div className="multi-image-box">
            {/* <span>Maximum 5 files can be uploaded</span> */}
            <MultipleImageUploader value={form?.supportingAssetMediaFiles} onChange={handleSuppportFileUpload} onDelete={DeleteSupportFile} required={true} />
          </div>
          <ErrorText text={errors?.supportingAssetMediaFiles} />
          {/* {form?.saleType === 'auction' && form?.type === 'buy'
            ? <>
              <div className='pdf-file-upload'>
                <DHead>Conditional Report (pdf file)</DHead>
                <div className='pdf-wrapper'>  
                  <input type="file" name="conditionalReportUrl" onChange={(e) => handlePDFFileUpload(e)} />
                  {pdfError ? <a onClick={() => setPDFError('')}><Icon name="close-black" /></a> : null}
                </div>
                <ErrorText text={pdfError} ></ErrorText>
              </div>
            </>
            : null} */}
        </div>
        <FormWrapper>
          {/* <SingleSelect arr={auctionTypes} label={`Select the NFT type`} selected={selectedNFT} setSelected={setSelectedNFT} />
          <InputRadio value={form?.sell} onChange={handleOnChange} label={`Sell this Artwork`} name={`sell`} /> */}
          {/* <SingleSelect arr={auctionTypeArr} selected={auctionType} setSelected={setAuctionType} /> */}
          {/* <InputLabel required={false}>Product Name</InputLabel> */}
          <SellTypeWrapper>
            <InputRadio value="museum" id="Type-museum" checked={form?.type === 'museum'} onChange={handleOnChange} label="Museum" name="type" disabled={isEdit} />
            <InputRadio value="buy" id="Type-buy" checked={form?.type === 'buy'} onChange={handleOnChange} label="Buy" name="type" disabled={isEdit} />
          </SellTypeWrapper>
          {form?.type === 'buy'
            ? <SellTypeWrapper>
              <InputRadio value="fixed" id="saleType-fixed" checked={form?.saleType === 'fixed'} onChange={handleOnChange} label="Fixed" name="saleType" disabled={isEdit} />
              <InputRadio value="auction" id="saleType-auction" checked={form?.saleType === 'auction'} onChange={handleOnChange} label="Auction" name="saleType" disabled={isEdit} />
            </SellTypeWrapper>
            : null}
          {form?.saleType === 'auction' && form?.type === 'buy'
            ? <SellTypeWrapper>
              <InputRadio value="normal" id="auctionType-normal" checked={form?.auctionType === 'normal'} onChange={handleOnChange} label="Normal" name="auctionType" />
              <InputRadio value="fraction" id="auctionType-fraction" checked={form?.auctionType === 'fraction'} onChange={handleOnChange} label="Fraction" name="auctionType" />
            </SellTypeWrapper>
            : null}
          {form?.saleType === 'auction' ? (<InputCheckbox className='margin-bottom-2vh'>
            <input type="checkbox" id="highlight" checked={form?.isHighlight} 
              // disabled={isEdit} 
            name='highlight' onChange={handleOnChange} />
            <LinksAnchor htmlFor='highlight' className='color-black'>Highlight</LinksAnchor>
          </InputCheckbox>) : null}

          <InputText label={`Brand Name`} onChange={handleOnChange} value={form?.name} name={`name`} error={errors?.name} placeholder={`Enter the name of artwork`} required={true} />
          {/* <InputWrapper>
            <InputLabel required={true}>year</InputLabel>
            <Select
              placeholder="Year"
              classNamePrefix="react-select"
              menuPlacement="auto"
              maxMenuHeight={300}
              options={year}
              value={form?.yearObj}
              name="Year"
              onChange={(e) => handleCategory(e, 'year')}
              isClearable={true}
            />
            {errors?.year && <Errormsg>year is required </Errormsg>}
          </InputWrapper> */}
          <InputText label={`Year`} onChange={handleOnChange} value={form?.year} name={`year`} error={errors?.year} placeholder={`Enter year`} required={true} />
          <InputText label={`Ref No`} onChange={handleOnChange} value={form?.refNo} name={`refNo`} error={errors?.refNo} placeholder={`Enter the refNo`} required={true} />
          <InputText label={`Ref Name`} onChange={handleOnChange} value={form?.refName} name={`refName`} error={errors?.refName} placeholder={`Enter the refName`} required={true} />
          <InputText label={`Fourth Line`} onChange={handleOnChange} value={form?.fourthLine} name={`fourthLine`} error={errors?.fourthLine} placeholder={`Enter Fourth Line`} />
          {/* <InputText label={`Asset Weight`} onChange={handleOnChange} value={form?.assetWeight} name={`assetWeight`} error={errors?.assetWeight} placeholder={`Enter Asset Weight`} required={true} />
          <InputText label={`Asset Height`} onChange={handleOnChange} value={form?.assetHeight} name={`assetHeight`} error={errors?.assetHeight} placeholder={`Enter Asset Height`} required={true} />
          <InputText label={`Asset Width`} onChange={handleOnChange} value={form?.assetWidth} name={`assetWidth`} error={errors?.assetWidth} placeholder={`Enter Asset Width`} required={true} /> */}
          {/* {APP_ENV.NETWORK_TYPE === 'HEDERA' ? (
            <InputWrapper>
              <InputLabel required={false}>Artist</InputLabel>

              <InputText onChange={handleOnChange} value={form?.artistName} error={errors?.artistName} name={`artistName`} placeholder={`Enter the artist name.`} />
              {/* <ErrorText text={errors?.categoryId} /> */}
          {/* {errors?.artistName && <Errormsg>Artist name is required </Errormsg>} */}
          {/* </InputWrapper>
          ) : (
            <InputWrapper ref={categoryRef}>
              <InputLabel required={false}>Creator</InputLabel>
              <Select
                placeholder="Choose or search creator"
                classNamePrefix="react-select"
                menuPlacement="auto"
                maxMenuHeight={300}
                options={creators || []}
                value={form?.creatorObj}
                name="creator"
                onInputChange={(value) => setCreatorSearchTerm(value)}
                onChange={(e) => handleCreator(e, 'creatorId')}
              />
              {/* <ErrorText text={errors?.categoryId} /> */}
          {/* {errors?.categoryId && <Errormsg>Category is required </Errormsg>} */}
          {/* </InputWrapper> */}



          {/* <InputWrapper ref={collectionRef}>
            <InputLabel required={true}>Collection</InputLabel>
            <Select
              placeholder="Choose collection"
              classNamePrefix="react-select"
              menuPlacement="auto"
              maxMenuHeight={300}
              options={collection || options}
              defaultValue={form?.collectionObj}
              value={form?.collectionObj}
              name="collection"
              // onInputChange={(value) => setCollectionSearchTerm(value)}
              onChange={(e) => handleCategory(e, 'collectionId')}
              isDisabled={isEdit}
              isClearable={true}
            />
            {/* <ErrorText text={errors?.collectionId} /> */}
          {/* {errors?.collectionId && <Errormsg>Collection is required</Errormsg>} */}
          {/* </InputWrapper> */}

          <InputTextarea
            label={`Description`}
            onChange={handleOnChange}
            value={form?.description}
            error={errors?.description}
            name={`description`}
            placeholder={`Enter details about the product`}
            count={false}
            required={true}
          />
          <InputTextarea
            label={`Short Description `}
            onChange={handleOnChange}
            error={errors?.shortDescription}
            value={form?.shortDescription}
            name={`shortDescription`}
            placeholder={`Enter short description about the product`}
            count={false}
            required={true}
          />
          {/* {form?.saleType === 'fixed' && (
            <InputText
              label={`Total Edition Count`}
              onChange={handleOnChange}
              value={form?.totalEditionCount}
              error={errors?.totalEditionCount}
              name={`totalEditionCount`}
     
              placeholder={`Enter the Total Edition Count of artwork`}
              required={true}
              disabled={isEdit}
            />
          )} */}
          {APP_ENV.NETWORK_TYPE != 'HEDERA' && (
            <InputText
              label={`Royalty Percentage`}
              onChange={handleOnChange}
              value={form?.royaltyPercentage}
              error={errors?.royaltyPercentage}
              name={`royaltyPercentage`}
              // readOnly={isEdit}
              placeholder={`Enter the Royalty Percentage of artwork`}
              required={true}

            />
          )}
          <InputWrapper>
            <InputLabel required={true}>Category</InputLabel>
            <Select
              placeholder="Choose category"
              classNamePrefix="react-select"
              menuPlacement="auto"
              maxMenuHeight={300}
              options={activeCategory}
              defaultValue={form?.categoryObj}
              value={form?.categoryObj}
              // isDisabled={isEdit}
              name="category"
              onChange={(e) => { handleCategory(e, 'categoryId') }}
              isClearable={true}
            />
            {/* <ErrorText text={errors?.categoryId} /> */}
            {errors?.categoryId && <Errormsg>Category is required </Errormsg>}
          </InputWrapper>
          {form?.type !== 'buy' 
          ? <InputWrapper >
            <InputLabel required={false}>Sub Category</InputLabel>
            <Select
              placeholder="Choose SubCategory"
              classNamePrefix="react-select"
              menuPlacement="auto"
              maxMenuHeight={300}
              options={subCategory?.length ? subCategory?.map(e => {
                return {
                  label: e.name,
                  value: e.id
                }
              }) : null}
              // isDisabled={isEdit}
              value={form?.subCategoryObj}
              name="subCategory"
              onChange={(e) => handleCategory(e, 'subCategoryId')}
              isClearable={true}
              isMulti={true}
            />
            {/* <ErrorText text={errors?.categoryId} /> */}
            {/* {errors?.subCategory && <Errormsg>SubCategory is required </Errormsg>} */}
          </InputWrapper>
          : null}
          <InputSelect
            currency={[]}
            label={`Set price ${form?.type === 'museum' ? '' : form?.saleType ? 'for ' + form?.saleType : ''}`}
            form={{ ...form, currencyId: 1 }}
            setForm={setForm}
            // selectDisabled={isEdit}
            error={errors?.primarySalePrice || errors?.currencyId}
            required={true}
          />
          {form?.saleType === 'auction' && form?.type === 'buy' &&
            (<>
              <InputText label={`Auction Id`} value={form?.auctionID} error={errors?.auctionID} name={`auctionID`} onChange={handleOnChange}  />
              <InputText label={`SKU`} value={form?.sku} error={errors?.sku} name={`sku`} onChange={handleOnChange}  />
              <InputText label={`Lot Number`} value={form?.lotNumber} error={errors?.lotNumber} name={`lotNumber`} onChange={handleOnChange}  />
              <InputTextarea
                label={`Lot Essay`}
                onChange={handleOnChange}
                error={errors?.lotAssay}
                value={form?.lotAssay}
                name={`lotAssay`}
                placeholder={`Enter Lot Essay`}
                count={false}
              />
              <InputTextarea
                label={`Biography`}
                onChange={handleOnChange}
                error={errors?.biography}
                value={form?.biography}
                name={`biography`}
                placeholder={`Enter Biography`}
                count={false}
              />
              <InputTextarea
                label={`Condition Report`}
                onChange={handleOnChange}
                error={errors?.conditionalReportUrl}
                value={form?.conditionalReportUrl}
                name={`conditionalReportUrl`}
                placeholder={`Enter Condition Report`}
                count={false}
              />
              <InputText
                label={`Low estimate price`}
                onChange={handleOnChange}
                value={form?.minPrice}
                error={errors?.minPrice}
                name={`minPrice`}
                // readOnly={isEdit}
                placeholder={``}
                required={true}
              />
              <InputText
                label={`High estimate price`}
                onChange={handleOnChange}
                value={form?.maxPrice}
                error={errors?.maxPrice}
                name={`maxPrice`}
                // readOnly={isEdit}
                placeholder={``}
                required={true}
              />
            </>)
          }

          {/* <SellTypeWrapper>
            <InputRadio value="fixed" id="saleType-fixed" checked={form?.saleType === 'fixed'} onChange={handleOnChange} label="Fixed" name="saleType" disabled={isEdit} />
          </SellTypeWrapper> */}
          {form?.saleType === 'auction' && form?.type === 'buy' ? (
            <InputWrapper>
              <InputLabel required={true}>Set auction time</InputLabel>
              <CalenderWrapper>
                <div className="date-wrapper">
                  <CustomInputDatePicker auctionStart={auctionTime.auctionStart} onChange={(data: any) => auctionStartHandle(data)} label={`From`} timeLabel={`Start With`} disabled={false} />
                  {errors?.auctionStart ? <p className="error">{errors?.auctionStart}</p> : null}
                </div>
                <div className="date-wrapper">
                  <CustomInputDatePicker auctionEnd={auctionTime.auctionEnd} onChange={(data: any) => auctionEndHandle(data)} label={`To`} timeLabel={`End With`} disabled={false} />
                  {errors?.auctionEnd ? <p className="error">{errors?.auctionEnd}</p> : null}
                </div>
              </CalenderWrapper>
            </InputWrapper>
          ) : null}
          {/* {isEdit ? null : <AssetAttributes form={form} setForm={setForm} />} */}
          <BtnWrapper>
            <ButtonGradientPrimary type="button" blockBtn size={`md`} onClick={handleSubmit} onDoubleClick={() => { }}>
              <span className="icon-plus"></span>
              {isEdit ? 'Update' : 'Continue'}
            </ButtonGradientPrimary>
          </BtnWrapper>
          {/* <ButtonTransparent blockBtn size={`md`} >Continue</ButtonTransparent> */}
        </FormWrapper>
        {apiError ? <ErrorModal2 show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
      </AddArtworkFormContainer>
    </SectionComp>
  )
}

export default AddArtwork

const SellTypeWrapper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 2rem;
`
