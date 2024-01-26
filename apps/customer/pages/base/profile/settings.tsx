import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import Image from 'next/image'
import { ButtonGradientPrimary, ButtonPrimaryOutline } from '../../../modules/shared/components/button/button'
import { Model, ValidateRule, useForm } from '../../../hooks/customForm'
import AccountService from '../../../api/customer/UserService'
import { getProfile } from '../../../redux/reducer/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import ErrorModal from '../../../modules/customer/shared/modal/error'
import Router from 'next/router'
import SuccessModal from '../../../modules/customer/shared/modal/success'
import Meta from '../../../modules/shared/components/meta'
import Loader from '@apps/customer/modules/shared/components/Loader'
import { APP_ENV } from '@apps/customer/config'
import Tooltip from '@apps/customer/modules/shared/components/tooltip/tooltip'
interface ErrorMessageProps {
  show: boolean
  height: number
}

const SettingFormData: Model.IFormData = {
  firstName: {
    label: 'First Name*',
    validationRules: [ValidateRule.requiredRule('First name'), ValidateRule.minLengthRule('First name', 3), ValidateRule.maxLengthRule('First name', 25)],
  },
  lastName: {
    label: 'Last Name*',
    validationRules: [ValidateRule.requiredRule('Last Name'), ValidateRule.minLengthRule('Last Name', 1), ValidateRule.maxLengthRule('Last Name', 25)],
  },
  userName: {
    label: 'User Name*',
    validationRules: [ValidateRule.requiredRule('User Name'), ValidateRule.minLengthRule('User Name', 4), ValidateRule.maxLengthRule('User Name', 25)],
  },
  email: {
    label: 'Email*',
    validationRules: [ValidateRule.requiredRule('Email ID'), ValidateRule.validateEmail('Email ID')],
  },
  // "mobileNumber": {
  //     label: "Mobile Number",
  //     // validationRules: [
  //     //     ValidateRule.requiredRule('Mobile Number'),
  //     // ]
  // },
  about: {
    label: 'Enter short description about yourself',
    // validationRules: [
    //     ValidateRule.requiredRule('Short Description'),
    // ]
  },
  profilePic: {
    value: '/images/setting-cover.png',
  },
  coverPic: {
    value: '/images/setting-cover.png',
  },
  facebook: {
    value: 'facebook.com',
    validationRules: [ValidateRule.validateFacebookLink('Facebook')],
  },
  twitter: {
    value: 'twitter.com',
    validationRules: [ValidateRule.validateTwitterLink('Twitter')],
  },
  instagram: {
    value: 'instagram.com',
    validationRules: [ValidateRule.validateInstagramLink('Instagram')],
  },
  website: {
    value: 'website.data',
    validationRules: [ValidateRule.validateLink('Website')],
  },
}

const Settings: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploadImageType, setUploadImageType] = useState<string>('profile')
  const { isFormValid, form, updateForm, onInputChange } = useForm(SettingFormData)
  const userData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [error, setError] = useState<any>(null)
  const [profileEdit, setProfileEdit] = useState<any>(false)
  const [bannerEdit, setBannerEdit] = useState<any>(false)
  const [imgModal, setImgModal] = useState({
    show: false,
    message: '',
    status: '',
  })
  const [coverLoader, setCoverLoader] = useState(false)
  const [profileLoader, setProfileLoader] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [ProfileData, setProfileData] = useState<any>(null)
  const openModal = () => setShowModal(true)

  const closeModal = () => {
    setShowModal(false)
    if (!error) {
      Router.push(`/base/profile/${userData?.userName}`)
    }
  }

  const closeImgModal = () => setImgModal({ ...imgModal, show: false })

  const handleImgModals = (response, type: string) => {
    setCoverLoader(false)
    setProfileLoader(false)
    let message
    if (response.status === 200) {
      type === 'delete' ? (message = 'Image removed') : (message = 'Image updated')
      setImgModal({
        message,
        status: 'success',
        show: true,
      })
      setProfileEdit(false)
      return
    }
    type === 'delete' ? (message = 'Failed to remove image') : (message = 'Failed to update image')
    setImgModal({
      message,
      status: 'error',
      show: true,
    })
  }

  const updateProfile = async (e: any) => {
    e.preventDefault()

    if (isFormValid()) {
      const socialLinks: any = {}
      if (form?.facebook?.value) socialLinks.facebookUrl = form?.facebook?.value
      if (form?.twitter?.value) socialLinks.twitterUrl = form?.twitter?.value
      if (form?.instagram?.value) socialLinks.instagramUrl = form?.instagram?.value
      if (form?.website?.value) socialLinks.websiteUrl = form?.website?.value
      if (userData?.role === 'creator' && Object.keys(socialLinks).length === 0) {
        const error = {
          error: {
            message: 'At least one social media link is mandatory!',
          },
        }
        setError(error)
        openModal()
        return false
      }
      const data = {
        firstName: form?.firstName?.value || '',
        lastName: form?.lastName?.value || '',
        userName: form?.userName?.value || '',
        email: form?.email?.value || '',
        description: form?.about?.value || '',
        // ...(form?.mobileNumber?.value) && { "phone": form?.mobileNumber?.value },
        socialLinks: socialLinks || {},
      }
      const res: any = await AccountService.updateProfile(data)
      if (res?.data) {
        setProfileData(res?.data)
        setError(null)
        openModal()
        dispatch(getProfile(undefined))
      } else {
        if (res?.error) {
          if (res?.error?.error?.message?.includes('Username') || res?.error?.error?.message?.includes('user')) {
            const errorObj = {
              userName: {
                valid: false,
                message: res?.error?.error?.message,
              },
            }
            setError(errorObj)
          } else if (res?.error?.error?.message?.includes('Email ID')) {
            const errorObj = {
              email: {
                valid: false,
                message: res?.error?.error?.message,
              },
            }
            setError(errorObj)
          } else {
            setError(res?.error)
            openModal()
          }
        }
      }
    } else {
      //Scroll to top when validation fails
      window.scrollTo(0, 0)
    }
  }

  const handleCancelEvent = () => {
    Router.push(`/base/profile`)
  }

  useEffect(() => {
    updateForm({
      firstName: {
        value: userData?.firstName || '',
      },
      lastName: {
        value: userData?.lastName || '',
      },
      userName: {
        value: userData?.userName || '',
      },
      email: {
        value: userData?.email || '',
      },
      // "mobileNumber": {
      //     value: userData?.phone || ''
      // },
      coverPic: {
        value: userData?.bannerImage ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.bannerImage}` : '',
      },
      facebook: {
        value: userData?.socialLinks?.facebookUrl || '',
      },
      twitter: {
        value: userData?.socialLinks?.twitterUrl || '',
      },
      instagram: {
        value: userData?.socialLinks?.instagramUrl || '',
      },
      website: {
        value: userData?.socialLinks?.websiteUrl || '',
      },
      about: {
        value: userData?.description || '',
      },
      profilePic: {
        value: userData?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.profilePicUrl}` : '',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])
  useEffect(() => {
    const getFormData = async () => {
      dispatch(getProfile(undefined))
    }
    getFormData()
  }, [dispatch])
  const fileUploadCoverPicHandler = async (e: any) => {
    if (uploadImageType === 'profile') {
      setProfileLoader(true)
      const response = await AccountService.updateProfileImage(e.target.files?.[0])
      response?.status === 200 && updateForm({ ...form, profilePic: { value: `${process.env.NEXT_PUBLIC_ASSET_S3}/${response?.data?.data?.profilePicUrl}` } })
      handleImgModals(response, 'update')
    } else {
      setCoverLoader(true)
      const coverReponse = await AccountService.updateCoverImage(e.target.files?.[0])
      coverReponse?.status === 200 && updateForm({ ...form, coverPic: { value: `${process.env.NEXT_PUBLIC_ASSET_S3}/${coverReponse?.data?.data?.bannerImage}` } })
      handleImgModals(coverReponse, 'update')
    }
    setBannerEdit(false)
    // await dispatch(getProfile(undefined))
  }

  const removeImageFromServer = async (type = 'profile') => {
    if (type === 'profile') {
      setProfileLoader(true)
      const response = await AccountService.deleteProfileImage()
      response?.status === 200 && updateForm({ ...form, profilePic: { value: null } })
      handleImgModals(response, 'delete')
    } else {
      setCoverLoader(true)
      const coverResponse = await AccountService.deleteCoverImage()
      coverResponse?.status === 200 && updateForm({ ...form, coverPic: { value: null } })
      handleImgModals(coverResponse, 'delete')
    }
    setBannerEdit(false)
    // await dispatch(getProfile(undefined))
  }

  useEffect(() => {
    if (error && (error.userName || error.email)) {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }, [error])

  const onCLickResendEmail = async () => {
    const body = {
      email: userData?.email,
    }
    const response = await AccountService.resendEmailVerification(body)
    if (response?.status === 200) {
      setProfileData(response?.data?.data)
      openModal()
      return false
    } else {
      setError(response.error)
      openModal()
    }
  }

  return (
    <>
      <Meta />
      <input type="file" hidden ref={fileInput} onChange={fileUploadCoverPicHandler} value="" />
      <StyledSection>
        {coverLoader && (
          <CoverLoaderWrapper>
            <Loader width="70" height="70" />
          </CoverLoaderWrapper>
        )}
        <ProfileDetailsContainer url={form?.coverPic?.value || '/images/customer/profile-bg.png'}>
          <CoverImageContainer>
            <EditProfileImageWrapper>
              <EditIconWrapper onClick={() => setBannerEdit(!bannerEdit)}>
                <Image src="/svgs/pen-tool.svg" width="710" height="200" alt="setting-cover" />
              </EditIconWrapper>
              {bannerEdit ? (
                <DropUl onClick={() => setUploadImageType('banner')}>
                  {form?.coverPic?.value && <DropLi onClick={() => removeImageFromServer('banner')}>Remove Picture</DropLi>}
                  <DropLi
                    onClick={() => {
                      if (null !== fileInput?.current) fileInput?.current?.click()
                    }}
                  >
                    Change Picture
                  </DropLi>
                </DropUl>
              ) : null}
            </EditProfileImageWrapper>
          </CoverImageContainer>
        </ProfileDetailsContainer>
        <StyledHeader>Edit Details</StyledHeader>
        <ProfileImageContainer>
          <ProfileImageWrapper>{profileLoader ? <Loader width="50" height="50" /> : <Image className="cover-img" src={form?.profilePic?.value || '/images/customer/avatar.png'} width="710" height="200" alt="setting-cover" />}</ProfileImageWrapper>
          <EditProfileImageWrapper>
            <EditIconWrapper2 onClick={() => setProfileEdit(!profileEdit)}>
              <Image src="/svgs/pen-tool.svg" width="710" height="200" alt="setting-cover" />
            </EditIconWrapper2>
            {profileEdit ? (
              <DropUl onClick={() => setUploadImageType('profile')}>
                {form?.profilePic?.value && <DropLi onClick={() => removeImageFromServer('profile')}>Remove Picture</DropLi>}
                <DropLi
                  onClick={() => {
                    if (null !== fileInput?.current) fileInput?.current?.click()
                  }}
                >
                  Change Picture
                </DropLi>
              </DropUl>
            ) : null}
          </EditProfileImageWrapper>
        </ProfileImageContainer>
        <Form>
          <FormContent>
            {['firstName', 'lastName', 'userName', 'email'].map((eachItem) => (
              <FormItem key={eachItem}>
                <FormLabel htmlFor={eachItem}>{form?.[eachItem]?.label}</FormLabel>
                <FormInput type="text" id={eachItem} name={eachItem} value={form?.[eachItem]?.value} onChange={onInputChange} />
                <FormError show={!form?.[eachItem]?.valid || error} height={1}>
                  {(error && error[eachItem]?.message) || (!form?.[eachItem]?.valid && form?.[eachItem]?.errorMessage)}
                </FormError>
                {APP_ENV.NETWORK_TYPE !== 'HEDERA' && eachItem === 'email' && !userData?.emailVerified && userData?.email && userData?.email === form?.email?.value ? (
                  <FormAction marginTop="unset">
                    <ButtonPrimaryOutline fs="1.6" size="sm" type="button" onDoubleClick={() => {}} onClick={onCLickResendEmail}>
                      Resend verification mail
                    </ButtonPrimaryOutline>
                  </FormAction>
                ) : null}
              </FormItem>
            ))}
            <FormItem className="six">
              <FormLabel>Add your social media links</FormLabel>
              <IconWrapper>
                <Image className="pre-icon" alt="pre-icon" src={'/svgs/facebook.svg'} width="16" height="16" />
                <FormInput type="search" id="facebook" name="facebook" value={form?.facebook?.value} onChange={onInputChange} />
              </IconWrapper>
              <FormError show={!form?.facebook?.valid} height={2}>
                {form?.facebook?.errorMessage}
              </FormError>
              <IconWrapper>
                <Image className="pre-icon" alt="pre-icon" src={'/svgs/twitter-white.svg'} width="16" height="16" />
                <FormInput type="search" id="twitter" name="twitter" value={form?.twitter?.value} onChange={onInputChange} />
              </IconWrapper>
              <FormError show={!form?.twitter?.valid} height={2}>
                {form?.twitter?.errorMessage}
              </FormError>
              <IconWrapper>
                <Image className="pre-icon" alt="pre-icon" src={'/svgs/instagram-white.svg'} width="16" height="16" />
                <FormInput type="search" id="instagram" name="instagram" value={form?.instagram?.value} onChange={onInputChange} />
              </IconWrapper>
              <FormError show={!form?.instagram?.valid} height={2}>
                {form?.instagram?.errorMessage}
              </FormError>
              <IconWrapper>
                <Image className="pre-icon" alt="pre-icon" src={'/svgs/website.svg'} width="16" height="16" />
                <FormInput type="search" id="website" name="website" value={form?.website?.value} onChange={onInputChange} />
              </IconWrapper>
              <FormError show={!form?.website?.valid} height={2}>
                {form?.website?.errorMessage}
              </FormError>
            </FormItem>
            <FormItem className="seven">
              <FormLabel htmlFor="about">{form?.about?.label}</FormLabel>
              <FormTextArea name="about" id="about" value={form?.about?.value} onChange={onInputChange} maxLength={250} />
              <FormError show={!form?.about?.valid} height={1}>
                {form?.about?.errorMessage}
              </FormError>
              <FormLabel htmlFor="about">{(250 - form?.about?.value?.length || 0) + ' characters remaining'}</FormLabel>
            </FormItem>
          </FormContent>
          <HorizontalSeperator />
          <FormAction marginTop="3.8rem">
            <ButtonPrimaryOutline fs="1.6" size="sm" type="button" onClick={handleCancelEvent}>
              Cancel
            </ButtonPrimaryOutline>
            <ButtonGradientPrimary onDoubleClick={() => {}} onClick={updateProfile} fs="1.6" size="sm">
              Save
            </ButtonGradientPrimary>
          </FormAction>
        </Form>
      </StyledSection>
      {error ? <ErrorModal show={showModal} closeModal={closeModal} msg={error?.error?.message} /> : <SuccessModal show={showModal} closeModal={closeModal} title={ProfileData?.message} />}
      {imgModal.status === 'success' ? <SuccessModal show={imgModal.show} closeModal={closeImgModal} title={imgModal.message} /> : <ErrorModal show={imgModal.show} closeModal={closeImgModal} msg={imgModal.message} />}
    </>
  )
}
export default Settings

const StyledSection = styled.section`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin: 5.8rem 0 6.8rem;
`
const StyledHeader = styled.h1`
  margin: 2.5rem 0 2.5rem;
  font-size: 3.2rem;
  line-height: 88.5%;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fontprimary};
`
const ProfileDetailsContainer = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontprimary};
  margin-top: 15rem;
  width: 100%;
  align-items: self-end;
  &:before {
    content: '';
    width: 100%;
    height: 33rem;
    left: 0;
    top: 0;
    position: absolute;
    z-index: -1;
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    background-image: url(${(props) => props.url});
  }
`
const CoverImageContainer = styled.div`
  display: block;
  position: relative;
`
const CoverImageWrapper = styled.div`
  width: 100% !important;
  height: 19.6rem !important;
  span {
    width: 100% !important;
    height: 100% !important;
  }
`

const EditIconWrapper = styled.div`
  width: 3.7rem;
  height: 3.7rem;
  position: absolute;
  float: right;
  right: 1.2rem;
  bottom: 0.8rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 0.16rem solid ${({ theme }) => theme.colors.fontdark};
  backdrop-filter: blur(6.93rem);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img,
  span {
    width: 1.8rem !important;
    height: 1.8rem !important;
  }
`

const ProfileImageContainer = styled.div`
  display: inline-block;
  position: absolute;
  margin: 1.4rem 0 1.4rem;
`
const ProfileImageWrapper = styled.div`
  width: 10.7rem;
  height: 10.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 100% !important;
    height: 100% !important;
  }
  ,
  img {
    border: 0.5rem solid ${({ theme }) => theme.colors.shareBtnBorder};
    border-radius: 50%;
  }
`
const EditIconWrapper2 = styled.a`
  float: right;
  position: absolute;
  bottom: 0.2rem;
  right: 0.2rem;
  width: 2.3rem;
  height: 2.3rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 0.16rem solid ${({ theme }) => theme.colors.fontdark};
  backdrop-filter: blur(6.93rem);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img,
  span {
    width: 1.1rem !important;
    height: 1.1rem !important;
  }
`
const Form = styled.form`
  margin-top: 18.6rem;
`
const FormContent = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  grid-gap: 2.6rem;
  margin-bottom: 5rem;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.6rem 5.7rem;
    .seven {
      grid-column: 1;
    }
    .six {
      grid-column: 2;
      grid-row: 3/6;
    }
  }
`
const HorizontalSeperator = styled.div`
  border: 0.05rem solid ${({ theme }) => theme.colors.bordersecondary};
  margin: 5rem 0 3.8rem 0;
`
interface formActionProps {
  marginTop: string
}

const FormAction = styled.div<formActionProps>`
  margin-top: ${(props) => props.marginTop};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
`
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`
const FormLabel = styled.label`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: ${({ theme }) => theme.colors.fontcolor};
  margin-bottom: 1.3rem;
`
const FormInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-sizing: border-box;
  border-radius: 1.2rem;
  height: 4.5rem;
  padding: 1.4rem 1.7rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.colors.textInput};
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }
`

const FormTextArea = styled.textarea`
  height: 12.7rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 0.1rem solid ${({ theme }) => theme.colors.borderColor};
  box-sizing: border-box;
  border-radius: 1.2rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  padding: 1.2rem 1.7rem;
  color: ${({ theme }) => theme.colors.textInput};
  overflow: hidden;
  resize: none;
`
const IconWrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-sizing: border-box;
  border-radius: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 1rem 1.2rem 2.1rem;
  margin-bottom: 0.8rem;
  height: 4.5rem;
  input {
    border: none;
    background: none;
    &:focus-visible {
      outline: none;
    }
  }
`
const FormError = styled.span<ErrorMessageProps>`
  color: #ff0000;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: ${({ show }) => (show ? '' : 'none')};
  height: ${({ height }) => `${height}rem`};
`

const EditProfileImageWrapper = styled.div`
  position: relative;
`
const DropUl = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.modelContentColor};
  border: 0.1rem solid ${({ theme }) => theme.colors.activeBeforeColor};
  border-radius: 0.9rem;
  padding: 2.2rem 5.8rem 2.2rem 2.2rem;
  list-style: none;
  display: block;
  right: -4rem;
  top: 0.2rem;
`
const DropLi = styled.a`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.colors.fontprimary};
  cursor: pointer;
  display: block;
  margin-bottom: 1.2rem;
  white-space: nowrap;
  &:last-child {
    margin-bottom: 0;
  }
`
const CoverLoaderWrapper = styled.div`
  width: 100% !important;
  height: 8rem !important;
  padding: 20px 0px;
  img,
  span {
    width: 100% !important;
    height: 100% !important;
  }
`
