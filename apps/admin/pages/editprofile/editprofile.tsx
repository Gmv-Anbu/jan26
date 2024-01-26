import auth from '@apps/admin/api/admin/auth'
import { Model, useForm, ValidateRule } from '@apps/admin/hooks/customForm'
import AdminLayout from '@apps/admin/modules/admin/components/layout/layout'
import meta from '@apps/admin/modules/shared/components/meta'
import React, { useEffect, useRef, useState } from 'react'
import { removeCookie, getCookie } from '@nft-marketplace/js-cookie'
import API from '../../api/admin'
import TYPE from '../../redux/types/types'
// interface ErrorMessageProps {
//   show: boolean;
// }
// export const Errormsg = styled.div<ErrorMessageProps>`
//   font-size: 10px;
//   color: red;
// `;

import actions from '../../redux/actions/index' 

import { KEYS } from '@apps/admin/utils/storage'
import Image from 'next/image'
import router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@apps/admin/redux/store'
import { DropDownOverlay } from '@apps/admin/modules/admin/components/dropDown'
import { Loader } from '@apps/admin/modules/shared/components/Loader'
import SuccessModal from '@apps/admin/modules/admin/modal/SuccessModal'
import { ModalService } from '@nft-marketplace/modal'
import {
  Bg,
  BtnContent,
  Cancel,
  ChangeContent,
  ChangeHead,
  Content1,
  DropLi,
  DropUl,
  EditContainer,
  Editpro,
  ErrorMsg,
  Ficon,
  FormBtn,
  FormContent,
  FormDiv,
  ImgContainer,
  LoaderDiv,
  ProfileDetailsContainer,
  ProfileImageContainer,
  ProfileImageWrapper,
  PwdContent,
  PwdContent1,
  PwdForm,
  Save,
  CheckBoxWrapper,
  CheckBoxLabel,
  CheckBox,
} from '@apps/admin/modules/admin/styled-components/editprofileCss'
import PasswordModel from '../../modules/admin/modal/passwordModal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
// import { getConfig } from '@apps/admin/redux/reducer/adminConfigSlice'

const SettingFormData: Model.IFormData = {
  firstName: {
    label: 'First Name*',
    validationRules: [ValidateRule.requiredRule('First Name'), ValidateRule.minLengthRule('First Name', 3), ValidateRule.maxLengthRule('First Name', 25), ValidateRule.validTextNoSpecialCharacters('First Name')],
  },
  lastName: {
    label: 'Last Name*',
    validationRules: [ValidateRule.requiredRule('Last Name'), ValidateRule.minLengthRule('Last Name', 1), ValidateRule.maxLengthRule('Last Name', 25), ValidateRule.validTextNoSpecialCharacters('Last Name')],
  },
  email: {
    label: 'Email*',
    validationRules: [ValidateRule.requiredRule('Email ID'), ValidateRule.validateEmail('Email ID')],
  },
  phoneNumber: {
    label: 'Phone Number',
    validationRules: [ValidateRule.requiredRule('phoneNumber'), ValidateRule.minLengthRule('phoneNumber', 10), ValidateRule.maxLengthRule('phoneNumber', 10), ValidateRule.validPhoneNumber('phoneNumber')],
  },
}

const EditProfile = (props) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [modalOpen, setModalOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [update, SetUpdate] = useState()
  const [loader, setLoader] = useState<boolean>(false)
  const [twoFactorConfigEnabled, setTwoFactorConfigEnabled] = useState<boolean>(false)
  const [passWord, setPassWord] = useState(false)
  const [uploadImageType, setUploadImageType] = useState<string>('profile')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false)

  const { logOutUser } = actions

  const { isFormValid, form, updateForm, onInputChange } = useForm(SettingFormData)

  const clickHandler = () => {
    setEdit(true)
  }
  const cancelHandler = () => {
    setEdit(false)
  }

  const changeHandler = (e: any) => {
    e.preventDefault()

    const id = getCookie(KEYS.ADMIN_ID)
    if (isFormValid()) {
      const data = {
        email: form?.email?.value || '',
        firstName: form?.firstName?.value || '',
        lastName: form?.lastName?.value || '',
        phone: form?.phoneNumber?.value || '',
      }
      auth
        .updatedProfile(data, id)
        .then((res) => {
          if (res?.data?.data) {
            cancelHandler()
            SetUpdate(res?.data)
            dispatch({
              type: TYPE.USER_DETAILS,
              payload: res.data?.data,
            })
            ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="  Profile Updated Successfully" />)
          } else if (res?.data?.error) {
            ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={res?.data?.error?.message} />)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    updateForm({
      firstName: {
        value: userData?.firstName || '',
      },
      lastName: {
        value: userData?.lastName || '',
      },
      email: {
        value: userData?.email || '',
      },
      phoneNumber: {
        value: userData?.phone || '',
      },
      profilePic: {
        value: userData?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.profilePicUrl}` : '',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const getAdmin2faConfig = async () => {
    const response = await API.getAdminConfig()
    let data = response?.data?.data
    let admin2faEnabled = false
    if(data) {
      data.find(({ config, value }) => {
        if (config === 'admin2FA' && value === 'true') admin2faEnabled = true
      })
    }
    setTwoFactorConfigEnabled(admin2faEnabled)
  }

  useEffect(() => {
    const id = getCookie(KEYS.ADMIN_ID)
    getAdmin2faConfig()
    auth
      .getAdminDetails(id)
      .then((profile) => {
        const userData = profile?.data?.data
        setTwoFactorEnabled(profile?.data?.data.is2Fa)
        dispatch({
          type: TYPE.USER_DETAILS,
          payload: profile.data?.data,
        })
        updateForm({
          firstName: {
            value: userData?.userName || '',
          },
          lastName: {
            value: userData?.userName || '',
          },
          email: {
            value: userData?.email || '',
          },
          phoneNumber: {
            value: userData?.phone || '',
          },
          profilePic: {
            value: userData?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.profilePicUrl}` : '',
          },
        })
      })
      .catch((err) => {
        console.log('err')
      })
  }, [])
  const ProfilePicMenu = () => {
    return (
      <DropUl
        onClick={() => {
          if (null !== fileInput?.current && edit) fileInput?.current?.click()
        }}
      >
        {' '}
        <Bg>
          {!loader ? (
            <DropLi>
              <Ficon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height={'32'} width={'40'}>
                <path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
              </Ficon>
            </DropLi>
          ) : (
            <LoaderDiv>
              <Loader width="100" height="60" />
            </LoaderDiv>
          )}
        </Bg>
      </DropUl>
    )
  }
  const fileUploadCoverPicHandler = async (e: any) => {
    setLoader(true)
    const fileType = e.target.files?.[0]?.type
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png']
    if (validExtensions.includes(fileType)) {
      const res: any = await auth.updateProfileImg(e.target.files?.[0])
      updateForm({
        ...form,
        profilePic: {
          value: res?.data?.data.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${res?.data?.data.profilePicUrl}` : '',
        },
      })
      const payload = {
        ...res.data.data,
        email: form?.email.value,
        firstName: form?.firstName.value,
        lastName: form?.lastName.value,
        phone: form?.phoneNumber.value,
      }

      setLoader(false)
      dispatch({
        type: TYPE.USER_DETAILS,
        payload: payload,
      })
    } else {
      setLoader(false)
      ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc="Upload a valid image file (png,jpg.jpeg)" />)
    }
  }

  const handle2fa = async (e: any) => {
    setTwoFactorEnabled(!twoFactorEnabled)
    auth.enable2fa({ is2Fa: !twoFactorEnabled })
    .then(res => {
      if(res?.data?.data?.is2Fa) {
        ModalService.open((modalProps) => 
          <SuccessModal 
            close={() => {
              modalProps.close()
              logoutUser()
            }} 
            desc="2FA Enabled Successfully" />)
      } else if(!res?.data?.data?.is2Fa) {
        ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="2FA Disabled Successfully" />)
      }
    })
    .catch(err => {
      ModalService.open((modalProps) => <ErrorModal close={modalProps.close} desc={err?.error?.error?.message || 'Something went wrong'} />)
    })
  }

  const logoutUser = () => {
    dispatch(logOutUser(null))
    .then((res) => {
      router.push('/auth/login')
      removeCookie(KEYS.ADMIN_TOKEN)
      removeCookie(KEYS.ADMIN_USER)
    })
  }

  return (
    <>
      {' '}
      {modalOpen && <PasswordModel setOpenModal={setModalOpen} logoutUser={logoutUser} userData={userData}></PasswordModel>}
      <AdminLayout meta={meta} pageTitle={`Profile`}>
        <input type="file" hidden ref={fileInput} onChange={fileUploadCoverPicHandler} value="" disabled={loader ? true : false} />
        <EditContainer>
          <Content1>
            <h3>Profile Details</h3>
            <span>View and edit your profile details</span>
          </Content1>
          <Editpro>
            <ImgContainer>
              {/* <DropDownOverlay overlay={<ProfilePicMenu />} trigger={['click']}> */}
              <ProfileDetailsContainer>
                <ProfileImageContainer>
                  <ProfileImageWrapper>
                    <Image className="cover-img" src={form?.profilePic?.value || '/images/customer/profile-img.png'} width="710" height="200" alt="setting-cover" />
                  </ProfileImageWrapper>
                </ProfileImageContainer>
              </ProfileDetailsContainer>

              {/* </DropDownOverlay> */}
              {edit && <ProfilePicMenu />}
            </ImgContainer>
            <BtnContent>
              {!edit ? (
                <>
                  <FormBtn onClick={clickHandler}>Edit Profile</FormBtn>
                  <span>View and edit your profile details</span>
                </>
              ) : (
                <>
                  <ChangeHead>Change the profile details</ChangeHead>
                  <span>View and edit your profile details</span>
                </>
              )}
            </BtnContent>
          </Editpro>

          <FormContent>
            {['firstName', 'lastName', 'email', 'phoneNumber'].map((eachItem, i) => (
              <>
                <FormDiv key={eachItem + i}>
                  <label htmlFor={eachItem}>{form?.[eachItem]?.label}</label>
                  <input readOnly={!edit} type="text" id={eachItem + i} name={eachItem} value={form?.[eachItem]?.value} onChange={(e) => onInputChange(e)} />

                  {!form[eachItem].valid && <ErrorMsg>{form[eachItem]?.errorMessage}</ErrorMsg>}
                </FormDiv>
              </>
            ))}

            {edit && (
              <ChangeContent>
                <Cancel onClick={cancelHandler}>Cancel</Cancel>
                <Save onClick={changeHandler}>Save Changes</Save>
              </ChangeContent>
            )}
          </FormContent>
        </EditContainer>
        <PwdContent>
          <PwdContent1>
            <ChangeHead>Password Settings</ChangeHead>
            <span>Use a strong password to make your account more secure while changing password.</span>
          </PwdContent1>
          <PwdForm>
            <form>
              <span>
                <label htmlFor="PassWord">Password</label>
              </span>
              <div>
                <input type="password" value="password123" disabled></input>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setModalOpen(true)
                  }}
                >
                  Change Password
                </button>
              </div>
            </form>
          </PwdForm>
        </PwdContent>
        {twoFactorConfigEnabled ? (
          <>
            <PwdContent>
              <PwdContent1>
                <ChangeHead>Two Factor Authentication Settings</ChangeHead>
                <span>Enable or disable your two factor Authentication.</span>
              </PwdContent1>
              <CheckBoxWrapper>
                <ChangeHead>Enable 2FA</ChangeHead>
                <CheckBox checked={twoFactorEnabled} type="checkbox" id="checkbox" onChange={handle2fa} />
                <CheckBoxLabel htmlFor="checkbox" />
              </CheckBoxWrapper>
            </PwdContent>
          </>
        ) : (
          ''
        )}
      </AdminLayout>
    </>
  )
}

export default EditProfile
