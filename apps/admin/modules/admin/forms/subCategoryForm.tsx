import React, { useEffect, useRef, useState } from 'react'
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
import { CharacterCount, formatAPIError, handleApiImage, validateForm } from '../../../utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import { Loader } from '../../shared/components/Loader'
import BackButton from '../components/button/backButton'

const FormWrapper = styled.form`
  width: 52%;
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
  border-radius: 8px;
  padding: 3rem;
  .inner-box {
    background: #fafafa;
    border-radius: 8px;
    padding: 2rem 3.5rem;
    margin-bottom: 18px;
    .loader {
      position: relative;
    }
  }
  button {
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    border-radius: 6px;
    max-width: 160px;
    margin-top: 1rem;
    font-size: 14px;
  }
  .btn-wrp {
    display: flex;
    justify-content: flex-end;
  }
`
const Container = styled.div`
  width: 100%;
`

const CategoryFormWrapper = styled.div`
  padding-left: 3rem;
`

const SubCategoryForm = (props: any) => {
  const { isEdit } = props
  const btnRef = useRef<HTMLInputElement | null>()
  const [isActive, setIsActive] = useState(true)
  const router = useRouter()
  const formOG = {
    name: '',
    imageUrl: '',
    bannerImageUrl: '',
    description: '',
    isActive: isActive,
  }
  const formValidation = {
    name: '',
    imageUrl: '',
    bannerImageUrl: '',
    isActive: '',
  }
  const [showModal, setShowModal] = useState(false)
  const [categoryId, setCategoryId] = useState<any>(null)
  const [data, setData] = useState<any>({})
  const [form, setForm] = useState(formOG)
  const [errors, setErrors] = useState<any>({})
  const [apiError, setAPIError] = useState<any>(null)
  const [showErrors, setShowErrors] = useState(false)
  const [loaderImageUrl, setLoaderImageUrl] = useState<boolean>(false)
  const [loaderBannerImageUrl, setLoaderBannerImageUrl] = useState<boolean>(false)
  const [descriptionCount, setDescriptionCount] = useState(0)

  const openModal = () => setShowModal(true)
  const closeModal = () => {
    setShowModal(false)
    if (!apiError) goToCategoryList()
  }

  const goToCategoryList = () => {
    router.push('/subcategory')
  }

  const handleOnChange = (e: any) => {
    const { name, files, checked } = e.target
    let { value } = e.target
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const fileType = files?.[0]?.type
    if ((name === 'imageUrl' || name === 'bannerImageUrl') && !validExtensions.includes(fileType)) {
      openModal()
      setAPIError('Only supports image files with jpeg, png or jpg')
      return false
    }

    if (name === 'imageUrl' || name === 'bannerImageUrl') {
      if (name === 'imageUrl') {
        if (files?.length > 0) {
          setForm({
            ...form,
            imageUrl: null,
          })
          setLoaderImageUrl(true)
        }
      }
      if (name === 'bannerImageUrl') {
        if (files?.length > 0) {
          setForm({
            ...form,
            bannerImageUrl: null,
          })
          setLoaderBannerImageUrl(true)
        }
      }
      const [file] = files
      if (file) {
        uploadBannerImage(file, name)
      }
    } else if (name === 'isActive') {
      setForm({
        ...form,
        [name]: checked,
      })
    } else {
      const result = CharacterCount(value)
      console.log('CharacterCount(value)', CharacterCount(value))
      if (name === 'description' && result <= 250) {
        setDescriptionCount(result)
        setForm({
          ...form,
          [name]: value,
        })
      } else if(name === 'name') {
        value = value?.replace(/[^\w\s]/gi, '')
        setForm({
          ...form,
          [name]: value,
        })
      } else {
        return
      }
    }
  }

  const uploadBannerImage = (file: any, field: string) => {
    API.categoryImgUpload(file)
      .then((res: any) => {
        if (res?.data?.data?.url) {
          setForm({
            ...form,
            [`${field}`]: handleApiImage(res?.data?.data?.url),
          })
          setLoaderImageUrl(false)
          setLoaderBannerImageUrl(false)
        } else if (res?.data === null) {
          const errMsg = formatAPIError(res?.error)
          openModal()
          setAPIError(errMsg)
          setLoaderImageUrl(false)
          setLoaderBannerImageUrl(false)
        }
      })
      .catch((err: any) => {
        console.log(err)
        setLoaderImageUrl(false)
        setLoaderBannerImageUrl(false)
      })
  }
  const nameRef = useRef(null)
  const descriptionRef = useRef(null)
  const collectionRef = useRef(null)
  const bannerRef = useRef(null)

  const focusInput = (data: any) => {
    const smoothScroll = { behavior: 'smooth' }
    if (data.name) {
      nameRef?.current.focus()
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await validateForm(form, formValidation)
    focusInput(result)

    setShowErrors(true)
    if (result === true) {
      setErrors({})
      if (isEdit) {
        updateSUbCategory()
      } else {
        addNewSubCategory()
      }
    } else {
      setAPIError(null)
      setErrors(result)
      focusInput(result)
    }
  }

  const updateSUbCategory = () => {
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.updateSubCategory(categoryId, form)
      .then((res) => {
        ModalService.close(fullLoader)
        if (res?.data !== null) {
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else {
          openModal()
          setAPIError(res?.error?.error?.message || 'Error while updating category. Please try again.')
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        console.log('err', err?.response?.error)
      })
  }

  const addNewSubCategory = () => {
    const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
    API.addSubCategory(form)
      .then((res) => {
        ModalService.close(fullLoader)
        if (res?.data !== null) {
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else {
          openModal()
          setAPIError(res?.error?.error?.message || 'Error while adding category, please try agin.')
        }
      })
      .catch((err) => {
        ModalService.close(fullLoader)
        console.log('err', err?.response?.error)
      })
  }

  const getSubCategoryDataById = () => {
    API.getSubCategoryById(categoryId)
      .then((res) => {
        if (res?.data?.data) {
          const data = res?.data?.data
          setForm({
            ...form,
            name: data?.name,
            isActive: data?.isActive,
            bannerImageUrl: data?.bannerImageUrl,
            description: data?.description,
            imageUrl: data?.imageUrl
          })
          setIsActive(data?.isActive)
        } else {
          goToCategoryList()
        }
      })
      .catch((err) => {
        console.log(err)
        goToCategoryList()
      })
  }

  useEffect(() => {
    if (router?.query?.id && Number(router?.query?.id)) {
      const id = Number(router?.query?.id)
      setCategoryId(id)
    }
  }, [router])

  useEffect(() => {
    if (categoryId && isEdit) {
      getSubCategoryDataById()
    }
  }, [categoryId, isEdit])

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
    <Container>
      <BackButton onClick={() => goToCategoryList()} />
      <FormWrapper>
        <div className="inner-box">
          <InputText label={`Sub Category Name`} inputRef={nameRef} error={errors?.name} onChange={handleOnChange} value={form?.name} name={`name`} placeholder={`Enter sub category name`} required={true} maxLength={20} />
          <InputTextarea label={`Description`} type={`shortDesc`} onChange={handleOnChange} value={form?.description} error={errors?.description} name={`description`} placeholder={`Enter description`} required={true} shortDescriptionCount={descriptionCount} />
        </div>
        <div className="inner-box">
          <div ref={collectionRef}>
            <ArtworkInputFile
              size={`sm`}
              noBG={true}
              name={`imageUrl`}
              label={`Image`}
              value={form?.imageUrl}
              onChange={handleOnChange}
              error={errors?.imageUrl}
              spinloader={loaderImageUrl}
              endLoader={() => {
                setLoaderImageUrl(false)
              }}
              required={true}
              disabled={loaderImageUrl || loaderBannerImageUrl}
            />
          </div>
          <div ref={bannerRef}>
            <ArtworkInputFile
              size={`sm`}
              noBG={true}
              name={`bannerImageUrl`}
              label={`Banner Image`}
              value={form?.bannerImageUrl}
              onChange={handleOnChange}
              error={errors?.bannerImageUrl}
              spinloader={loaderBannerImageUrl}
              endLoader={() => {
                setLoaderBannerImageUrl(false)
              }}
              required={true}
              disabled={loaderImageUrl || loaderBannerImageUrl}
            />
          </div>
          <InputCheckbox label={`Active`} error={errors?.isActive} value={form?.isActive} onChange={handleOnChange} name={`isActive`} />
          <div className="btn-wrp">
            <ButtonGradientPrimary onClick={handleSubmit} onDoubleClick={() => {}} blockBtn size={`lg`}>
              {isEdit ? 'Update ' : 'Create '}SubCategory
            </ButtonGradientPrimary>
          </div>
        </div>
      </FormWrapper>
      {apiError ? <ErrorModal show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
    </Container>
  )
}

export default SubCategoryForm
