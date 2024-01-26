import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import API from '../../../api/customer/index'

import ErrorModal from '@apps/customer/modules/customer/shared/modal/error'
import SuccessModal from '@apps/customer/modules/customer/shared/modal/success'
import { ButtonGradient, ButtonGradientPrimary } from '@apps/customer/modules/shared/components/button/button'
import ArtworkInputFile from '@apps/customer/modules/shared/components/formInputs/artworkInputFile'
import InputText from '@apps/customer/modules/shared/components/formInputs/inputText'
import InputTextarea from '@apps/customer/modules/shared/components/formInputs/inputTextarea'
import Image from 'next/image'
import { acceptOnlyNumbers, CharacterCount, formatAPIError, handleApiImage, validateForm } from '../../../utils/helper'

const FormWrapper = styled.div`
  width: 55%;
  .btn-wrp {
    width: 30%;
    @media screen and (max-width: 568px) {
      width: 100%;
    }
  }
  .inner-box {
    margin-top: 5rem;
  }
  @media screen and (max-width: 540px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: auto;
  }
`
const Container = styled.div`
  width: 100%;
  margin-bottom: 15rem;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.fontprimary};
  margin-left: 5rem;
  @media screen and (max-width: 768px) {
    margin: auto;
    margin-bottom: 15rem;
  }
`
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const BackContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
`
export const InputWrapper = styled.div`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  margin-bottom: 3rem;
  p.error {
    color: ${({ theme }) => theme.colors.danger};
    margin: 0.5rem 0 0 0.4rem;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 500;
  }
  input[type='text'] {
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: ${({ theme }) => theme.colors.fontdark};
    background: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 1.2rem;
    width: 100%;
  }
  textarea {
    height: 18rem;
    width: 100%;
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 2.1rem;
    padding: 1.6rem;
    color: ${({ theme }) => theme.colors.fontdark};
    background: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 1.2rem;
  }
  .react-select__control {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 1.2rem;
    padding: 0;
    box-shadow: none;
    &--is-focused,
    &--is-focused:hover {
      border-radius: 1.2rem 1.2rem 0 0;
      border: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
    .react-select__input-container,
    .react-select__single-value {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: normal;
      color: ${({ theme }) => theme.colors.fontdark};
      padding: 0;
      margin: 0;
    }
    .react-select__value-container {
      padding: 1.6rem;
    }
    .react-select__placeholder {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: normal;
      color: ${({ theme }) => theme.colors.fontdark};
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
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background-color: ${({ theme }) => theme.colors.mainBG} !important;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  .react-select__menu-list {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .react-select__option {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.colors.fontdark};
  }
  .react-select__option {
    color: ${({ theme }) => theme.colors.fontdark};
  }
  .react-select__option--is-selected {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
  }
  .react-select__option--is-focused {
    background: ${({ theme }) => theme.colors.selectBg};
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.fontprimary};
  display: flex;
  flex-direction: column;

  p {
    color: ${({ theme }) => theme.colors.fontdark};
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-size: 14px;
    margin-bottom: 0.3rem;
    @media screen and (max-width: 540px) {
      font-size: 1rem;
    }
  }
`
const BackButton = styled.button`
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.danger};
  border: none;
  margin-left: -5rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: auto;
    width: 4rem;
    margin-right: 1rem;
    height: 4rem;
  }
`
const LabelH = styled.label`
  font-size: 1.8rem;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  margin-bottom: 0.5rem;
  line-height: 2.5rem;
  @media screen and (max-width: 540px) {
    font-size: 1rem;
  }
`
const Head = styled.span`
  font-size: 4rem;
  @media screen and (max-width: 540px) {
    font-size: 2rem;
  }
`
const ErrorText = ({ text }: any) => {
  if (text) {
    return <p className="error">{text}</p>
  } else {
    return null
  }
}
const InputLabel = styled.label`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.7rem;
  margin: 0;
  margin-bottom: 1.1rem;
  display: block;
`
const InputBox = styled.div``
const CollectionForm = (props: any) => {
  const { isEdit } = props

  const router = useRouter()
  const formOG = {
    name: '',
    description: '',
    collectionImage: '',
    bannerImage: '',
    isVerified: false,
    isActive: true,
  }
  const formValidation = {
    name: '',
    description: '',
    collectionImage: '',
    bannerImage: '',
    isVerified: '',
    isActive: '',
  }
  const [collectionId, setCollectionId] = useState<number>()
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
    setShowModal(false)
    if (!apiError) goToCollectionList()
  }

  const goToCollectionList = () => {
    router.push('/base/myCollection')
  }

  const handleOnChange = (e: any) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { value, name, files, checked } = e?.target
    if (name === 'collectionImage' || name === 'bannerImage') {
      if (files.length) {
        setForm({
          ...form,
          [`${name}`]: null,
        })
      }

      const [file] = files

      if (file) {
        uploadBannerImage(file, name)
        if (name === 'bannerImage') {
          setLoaderBannerImage(true)
        }
        if (name === 'collectionImage') {
          setLoaderCollectionImage(true)
        }
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
    } else {
      const result = CharacterCount(value)

      if (name === 'description') {
        setDescriptionCount(result)
      }

      setForm({
        ...form,
        [name]: value,
      })
    }
  }

  const nameRef = useRef(null)
  const descriptionRef = useRef(null)
  const collectionImageRef = useRef(null)
  const bannerImageRef = useRef(null)

  const focusInput = (data: any) => {
    if (data.collectionImage) {
      collectionImageRef?.current.scrollIntoView()
    } else if (data.bannerImage) {
      bannerImageRef?.current.scrollIntoView()
    } else if (data.name) {
      nameRef?.current.focus()
    } else if (data.description) {
      descriptionRef?.current.focus()
    }
  }

  const handleSubmit = async (e: any) => {
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
          setLoaderCollectionImage(false)
          setLoaderBannerImage(false)
          setForm({
            ...form,
            [`${field}`]: handleApiImage(res?.data?.data?.url),
          })
        } else if (res?.data === null) {
          const errMsg = formatAPIError(res?.error)
          openModal()
          setAPIError(errMsg)
          setLoaderCollectionImage(false)
          setLoaderBannerImage(false)
        }
      })
      .catch((err: any) => {
        console.log(err)
        setLoaderCollectionImage(false)
        setLoaderBannerImage(false)
      })
  }

  const addNewCollection = () => {
    API.addCollection(form)
      .then((res) => {
        if (res?.data !== null) {
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else {
          openModal()
          setAPIError(res?.error?.error?.message || 'Collection was added successfully')
        }
      })
      .catch((err) => {
        console.log(err?.response?.error)
      })
  }

  const updateCollectionById = () => {
    API.updateCollection(collectionId, form)

      .then((res) => {
        if (res?.data !== null) {
          setData(res?.data)
          openModal()
          setAPIError(null)
        } else {
          openModal()
          setAPIError(res?.error?.error?.message)
        }
      })
      .catch((err) => {
        console.log(err?.response?.error)
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
    // else {
    //     goToCollectionList()
    // }
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
    <Container>
      <BackContainer>
        <div>
          <BackButton
            onClick={() => {
              router.push('/base/myCollection')
            }}
          >
            <Image src={`/svgs/leftArrow.svg`} alt="Back" width="90" height="90"></Image>
          </BackButton>
        </div>
        <div>
          <Head>Create a Collection</Head>
        </div>
      </BackContainer>
      <FormWrapper>
        <div ref={collectionImageRef}>
          <Label>
            <LabelH>Upload your collections Profile Image</LabelH>
            <p>This image will appear at the top of your collection page</p>
          </Label>
          <ArtworkInputFile
            size={`sm`}
            noBG={true}
            label={``}
            name={`collectionImage`}
            value={form?.collectionImage}
            onChange={(e: any) => {
              handleOnChange(e)
            }}
            error={errors?.collectionImage}
            spinloader={loaderCollectionImage}
            endLoader={() => {
              setLoaderCollectionImage(false)
            }}
          />
        </div>
        <div ref={bannerImageRef}>
          <Label>
            <LabelH>Upload your collections banner Image</LabelH>
            <p>This image will appear at the top of your collection page</p>
          </Label>
          <ArtworkInputFile
            label={``}
            size={`sm`}
            noBG={true}
            name={`bannerImage`}
            value={form?.bannerImage}
            onChange={(e: any) => {
              handleOnChange(e)
            }}
            error={errors?.bannerImage}
            spinloader={loaderBannerImage}
            endLoader={() => {
              setLoaderBannerImage(false)
            }}
          />
        </div>
        <div>
          <Label>
            <LabelH>Name</LabelH>
            <p>Enter the name of your collection</p>
          </Label>
          <InputText inputRef={nameRef} error={errors?.name} onChange={handleOnChange} value={form?.name} name={`name`} placeholder={``} />
        </div>
        <div>
          <Label>
            <LabelH>Description</LabelH>
            <p>The description will be included on the collection page</p>
          </Label>
          <InputTextarea textAreaRef={descriptionRef} error={errors?.description} onChange={handleOnChange} value={form?.description} name={`description`} placeholder={`Enter details about the product`} descriptionCount={descriptionCount} />
        </div>
        {/* <InputWrapper>
          <Label>
            <LabelH>Collection Limit</LabelH>
            <p>
              Select the limit of NFT’s that can be added to this collections
            </p>
          </Label>
          <Select
            placeholder="Choose Category"
            classNamePrefix="react-select"
            name="collection"
          />
          <ErrorText text={errors?.collectionId} />
        </InputWrapper> */}
        {/* <InputCheckbox
          label={`Verified`}
          error={errors?.isVerified}
          value={form?.isVerified}
          onChange={handleOnChange}
          name={`isVerified`}
        />
        <InputCheckbox
          label={`Active`}
          error={errors?.isActive}
          value={form?.isActive}
          onChange={handleOnChange}
          name={`isActive`}
        /> */}
        <ButtonDiv>
          <div className="btn-wrp">
            <ButtonGradient onClick={handleSubmit} onDoubleClick={()=>{}} blockBtn size={`md`}>
              Create Collection
            </ButtonGradient>
          </div>
        </ButtonDiv>
      </FormWrapper>
      {apiError ? <ErrorModal show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
    </Container>
  )
}

export default CollectionForm
