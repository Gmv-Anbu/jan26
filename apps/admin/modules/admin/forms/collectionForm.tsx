import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import InputText from '../../shared/components/formInputs/inputText'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'
import InputCheckbox from '../../shared/components/formInputs/inputCheckbox'
import { ButtonGradientPrimary } from '../../shared/components/button/button'
import SuccessModal from '../modal/success'
import ErrorModal from '../modal/error'
import ArtworkInputFile from '../../shared/components/formInputs/artworkInputFile'
import API from '../../../api/admin'
import { acceptOnlyNumbers, CharacterCount, formatAPIError, handleApiImage, validateForm, acceptOnlyNumbersWithDecimals, isFileImage } from '../../../utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import { Loader } from '../../shared/components/Loader'
import { APP_ENV } from '@apps/admin/config'
import BackButton from '../components/button/backButton'

const FormWrapper = styled.div`
  max-width: 766px;
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
  border-radius: 8px;
  padding: 3.7rem 3rem;
  .inner-box {
    background: #fafafa;
    border-radius: 8px;
    padding: 3rem 5.5rem;
    margin-bottom: 18px;
  }
  button {
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    border-radius: 6px;
    max-width: 185px;
    margin-top: 30px;
  }
  .btn-wrp {
    display: flex;
    justify-content: flex-end;
  }
`

const CollectionForm = (props: any) => {
  const { isEdit } = props

  const router = useRouter()
  const formOG = {
    name: '',
    description: '',
    royaltyPercentage: '',
    collectionImage: '',
    bannerImage: '',
    isVerified: false,
    isActive: false,
  }
  const formValidation = {
    name: '',
    description: '',
    collectionImage: '',
    bannerImage: '',
    isVerified: '',
    isActive: '',
  }
  const [collectionId, setCollectionId] = useState<any>(null)

  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<any>({})
  const [form, setForm] = useState(formOG)
  const [errors, setErrors] = useState<any>({})
  const [apiError, setAPIError] = useState<any>(null)
  const [showErrors, setShowErrors] = useState(false)
  const [loaderCollectionImage, setLoaderCollectionImage] = useState<boolean>(false)
  const [loaderBannerImage, setLoaderBannerImage] = useState<boolean>(false)
  const [descriptionCount, setDescriptionCount] = useState(0)
  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setAPIError(null)
    setShowModal(false)
    if (!apiError) goToCollectionList()
  }

  const btnRef = useRef<HTMLInputElement | null>()

  const goToCollectionList = () => {
    router.push('/collection')
  }

  const handleOnChange = (e: any) => {
    if (btnRef.current) {
      btnRef.current.disabled = false
    }
    const { name, files, checked } = e.target
    let { value } = e.target

    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png']
    const fileType = files?.[0]?.type
    if ((name === 'collectionImage' || name === 'bannerImage') && !validExtensions.includes(fileType)) {
      openModal()
      setAPIError('Only supports image files with jpeg, png or jpg')
      return false
    }

    if (name === 'collectionImage' || name === 'bannerImage') {
      if (name === 'collectionImage') {
        if (files?.length > 0) {
          setForm({
            ...form,
            collectionImage: null,
          })
          setLoaderCollectionImage(true)
        }
      }
      if (name === 'bannerImage') {
        if (files?.length > 0) {
          setForm({
            ...form,
            bannerImage: null,
          })
          setLoaderBannerImage(true)
        }
      }
      const [file] = files
      if (file) {
        uploadBannerImage(file, name)
      }
    } else if (name === 'assetCount') {
      const val = acceptOnlyNumbers(value)
      setForm({
        ...form,
        [name]: val,
      })
    } else if (name === 'isActive' || name === 'isVerified') {
      setForm({
        ...form,
        [name]: checked,
      })
    } else if (name === 'royaltyPercentage') {
      if ((acceptOnlyNumbersWithDecimals(value) && Math.round(value * 100) > Math.round(0.00001 * 100)) || value == '' || value == 0) {
        setForm({
          ...form,
          [name]: value,
        })
      } else {
        return false
      }
    } else {
      const result = CharacterCount(value)
      if (name === 'description') {
        setDescriptionCount(result)
      } else if (name === 'name') {
        value = value?.replace(/[^\w\s]/gi, '')
      }

      setForm({
        ...form,
        [name]: value,
      })
    }
  }
  const nameRef = useRef(null)
  const descriptionRef = useRef(null)
  const collectionRef = useRef(null)
  const bannerRef = useRef(null)
  const royaltyPercentageRef = useRef(null)

  const focusInput = (data: any) => {
    const smoothScroll = { behavior: 'smooth' }

    if (data.name) {
      nameRef?.current.focus()
    } else if (data.description) {
      descriptionRef?.current.focus()
    } else if (data.collectionImage) {
      collectionRef?.current.scrollIntoView(smoothScroll)
    } else if (data.bannerImage) {
      bannerRef?.current.scrollIntoView(smoothScroll)
    }
  }

  const handleSubmit = async (e: any) => {
    //disabling multple clicks
    // if (btnRef.current) {
    //   btnRef.current.setAttribute('disabled', 'disabled')
    // }
    if (APP_ENV.NETWORK_TYPE !== 'HEDERA') {
      delete form.royaltyPercentage
    }
    const result = await validateForm(form, formValidation)

    focusInput(result)
    setShowErrors(true)
    if (result === true) {
      setErrors({})
      if (isEdit) {
        updateCollectionById()
      } else {
        addNewCollection()
      }
    } else {
      setAPIError(null)
      setErrors(result)
      focusInput(result)
    }
  }

  const uploadBannerImage = (file: any, field: string) => {
    API.uploadImage(file)
      .then((res: any) => {
        if (res?.data?.data?.url) {
          setForm({
            ...form,
            [`${field}`]: handleApiImage(res?.data?.data?.url),
          })
        } else if (res?.data === null) {
          const errMsg = formatAPIError(res?.error)
          openModal()
          setAPIError(errMsg)
        }
        setLoaderCollectionImage(false)
        setLoaderBannerImage(false)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const addNewCollection = () => {
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    //Prevent multiple clicks
    if (btnRef.current) {
      btnRef.current.disabled = true
    }
    if (APP_ENV.NETWORK_TYPE !== 'HEDERA') {
      delete form.royaltyPercentage
    }
    API.addCollection(form)
      .then((res) => {
        if (res?.data !== null) {
          ModalService.close(fullLoader)
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else {
          ModalService.close(fullLoader)
          openModal()
          setAPIError(res?.error?.error?.message || 'Error while adding collection')
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        console.log('err', err?.response?.error)
      })
  }

  const updateCollectionById = () => {
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    // Can't edit royality commission - Hedera
    delete form.royaltyPercentage
    API.updateCollection(collectionId, form)
      .then((res) => {
        if (res?.data !== null) {
          ModalService.close(fullLoader)
          setData(res?.data)
          openModal()
          setAPIError(null)
          if (btnRef.current) {
            btnRef.current.setAttribute('disabled', 'disabled')
          }
        } else {
          ModalService.close(fullLoader)
          openModal()
          setAPIError(res?.error?.error?.message || 'Error while updating collection')
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        console.log('err', err?.response?.error)
      })
  }

  const getCollectionDataById = () => {
    API.getCollectionById(collectionId)
      .then((res) => {
        if (res?.data?.data) {
          const data = res?.data?.data
          setForm({
            ...form,
            name: data?.name,
            description: data?.description,
            collectionImage: data?.collectionImage,
            bannerImage: data?.bannerImage,
            isVerified: data?.isVerified,
            isActive: data?.isActive,
            royaltyPercentage: data?.royaltyPercentage,
          })
        } else {
          goToCollectionList()
        }
      })
      .catch((err) => {
        console.log(err)
        goToCollectionList()
      })
  }

  useEffect(() => {
    if (router?.query?.id && Number(router?.query?.id)) {
      const id = Number(router?.query?.id)
      setCollectionId(id)
    }
  }, [router])

  useEffect(() => {
    if (collectionId && isEdit) {
      getCollectionDataById()
    }
  }, [collectionId, isEdit])

  useEffect(() => {
    ;(async () => {
      if (showErrors) {
        const result = await validateForm(form, formValidation)
        if (result == true) {
          setErrors({})
        } else {
          setErrors(result)
        }
      }
    })()
  }, [form])

  return (
    <div>
      <BackButton onClick={() => goToCollectionList()} /> 
      <FormWrapper>
        <div className="inner-box">
          <InputText label={`Name`} error={errors?.name} inputRef={nameRef} onChange={handleOnChange} value={form?.name} name={`name`} placeholder={`Enter Name`} required={true} maxLength={20} />
          <InputTextarea
            label={`Description`}
            error={errors?.description}
            textareaRef={descriptionRef}
            onChange={handleOnChange}
            value={form?.description}
            name={`description`}
            placeholder={`Enter Description`}
            descriptionCount={descriptionCount}
            required={true}
          />
          {APP_ENV.NETWORK_TYPE === 'HEDERA' && (
            <InputText
              label={`Royalty Percentage`}
              onChange={handleOnChange}
              inputRef={royaltyPercentageRef}
              value={form?.royaltyPercentage}
              error={errors?.royaltyPercentage}
              name={`royaltyPercentage`}
              placeholder={`Enter the Royalty Percentage of collection`}
              required={true}
              disabled={isEdit ? true : false}
            />
          )}
        </div>
        <div className="inner-box">
          <div ref={collectionRef}>
            <ArtworkInputFile
              size={`sm`}
              noBG={true}
              name={`collectionImage`}
              label={`Collection Image`}
              value={form?.collectionImage}
              onChange={(e) => {
                if (isFileImage(e?.target.files[0]) == true) {
                  handleOnChange(e)
                } else {
                  openModal()
                  setAPIError('File format not supported')
                  e.target.value = null
                }
              }}
              error={errors?.collectionImage}
              spinloader={loaderCollectionImage}
              endLoader={() => {
                setLoaderCollectionImage(false)
              }}
              required={true}
              disabled={loaderCollectionImage || loaderBannerImage}
            />
          </div>
          <div ref={bannerRef}>
            <ArtworkInputFile
              size={`sm`}
              noBG={true}
              name={`bannerImage`}
              label={`Banner Image`}
              value={form?.bannerImage}
              onChange={(e) => {
                if (isFileImage(e?.target.files[0])) {
                  handleOnChange(e)
                } else {
                  openModal()
                  setAPIError('File format not supported')
                  e.target.value = null
                }
              }}
              error={errors?.bannerImage}
              spinloader={loaderBannerImage}
              endLoader={() => {
                setLoaderBannerImage(true)
              }}
              required={true}
              disabled={loaderBannerImage || loaderCollectionImage}
            />
          </div>
          {/* <InputCheckbox label={`Verified`} error={errors?.isVerified} value={form?.isVerified} onChange={handleOnChange} name={`isVerified`} /> */}
          <InputCheckbox label={`Active`} error={errors?.isActive} value={form?.isActive} onChange={handleOnChange} name={`isActive`} />
        </div>
        <div className="btn-wrp">
          <ButtonGradientPrimary onClick={handleSubmit} blockBtn size={`md`} ref={btnRef}>
            {isEdit ? 'Update' : 'Submit'}
          </ButtonGradientPrimary>
        </div>
      </FormWrapper>
      {apiError ? <ErrorModal show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
    </div>
  )
}

export default CollectionForm
