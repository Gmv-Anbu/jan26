import auth from '@apps/admin/api/admin/auth'
import { Model, useForm, ValidateRule } from '@apps/admin/hooks/customForm'
import form from '@apps/admin/hooks/form'

import AdminLayout from '@apps/admin/modules/admin/components/layout/layout'
import SuccessModal from '@apps/admin/modules/admin/modal/SuccessModal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { Loader } from '@apps/admin/modules/shared/components/Loader'
import meta from '@apps/admin/modules/shared/components/meta'
import { trimString } from '@apps/admin/utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PermissionManager from './permissionManger'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const Back = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  div {
    display: flex;
  }
`
const SpanB = styled.span`
  margin-left: 10px;
`
const Active = styled.span`
  background: ${({ theme }) => theme.colors.iconContainerColor};
  border-radius: 6px;
  margin-left: 4rem;
  width: 22%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  svg {
    margin-right: 5px;
  }
`
const Id = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #aaaaaa;
`
const ButtonContainer = styled.div`
  display: flex;
  /* width: 50%; */
  justify-content: flex-end;
  margin-right: 1rem;
`
const Button1 = styled.button`
  border: 1px solid #ff5555;
  border-radius: 5px;
  padding: 7px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #ff5555;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  width: 16%;
  cursor: pointer;
  background-color: #ffffff;
  svg {
    margin-right: 10px;
    text-align: center;
    margin-top: 1px;
  }
`
const Button2 = styled.button`
  svg {
    margin-right: 10px;
    margin-bottom: 1px;
  }
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  width: 100%;
  cursor: pointer;
  background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
  border-radius: 6px;
`
const Button3 = styled.button`
  width: 20px;
  cursor: pointer;
  background: #e7e7e7;
  border-radius: 4px;
  border: none;
  img {
    height: 10px;
  }
`

const VerticalBar = styled.div`
  height: 3px;
  width: 100%;
  margin-top: 1rem;
  background: linear-gradient(90deg, #2a9bd3 1.52%, #30599c 100%);
  border-radius: 5px;
`
const TabMenu = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3.4rem;
`
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`
const TabBox = styled.ul`
  display: flex;
  list-style: none;
  font-size: 18px;
  padding: 0;
  margin: 0;
`

interface ITabList {
  active: boolean
  width: string
}

export const TabList = styled.li<ITabList>`
  color: ${(props) => (props.active ? '#000000' : '#9B9B9B')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  cursor: pointer;

  width: 100%;

  display: flex;
  justify-content: flex-start;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  line-height: 111.5%;
  padding-right: 27px;
  margin-right: 1em;
  width: ${(props) => props.width};
`
const Container1 = styled.div`
  background: #ffffff;
  box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  width: 100%;
  padding: 3.5rem 2.3rem;
`
const ProfileDataWrapper = styled.div`
  position: relative;
`

const BackGround = styled.img`
  width: 100%;
  height: 18.8rem;
  object-fit: cover;
  border-radius: 8px 8px 0px 0px;
`

const BackGroundWrapper = styled.div`
  position: relative;
  max-width: 100rem;
  width: 100%;
`
const ProfileWrapper = styled.div`
  position: relative;
  top: -4.8rem;
  left: 2.3rem;
  max-width: 9.5rem;
`

const ImageContainer = styled.div`
  position: relative;
  margin: 0 0rem 3rem;
`
const Profileimg = styled.img`
  position: absolute;
  width: 9.5rem;
  height: 9.5rem;
  border: 3px solid #ffffff;
  border-radius: 50%;
  @media screen and (max-width: 1024px) {
    position: absolute;
    width: 9%;
    height: 38%;
    top: 68.5%;
    left: 3.5%;
    border: 3px solid #ffffff;
    border-radius: 50%;
  }
`
const Container2 = styled.div`
  display: flex;
  width: 86.7%;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    display: flex;
    width: 86.7%;
  }
`

const Container3 = styled.div`
  display: flex;
  width: 86.7%;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    display: flex;
    width: 86.7%;
  }
`
const NameContainer = styled.div`
  width: 13%;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-left: 4rem;
`
const ProfileContainer = styled.div`
  max-width: 68.6rem;
  width: 100%;
  padding-top: 4rem;
  background: #fafafa;
  border-radius: 8px;
  padding: 3.7rem 2.7rem;
  margin-left: 10rem;
`
const FormHeader = styled.h3`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  margin-bottom: 2.3rem;
  color: '#6E6F72';
`
const Name1 = styled.div`
  display: flex;
  flex-direction: column;
`
const Name = styled.span`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #6e6f72;
  word-break: break-word;
`
const Email = styled.span`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #72809c;
  word-break: break-word;
`

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0px 2rem;
  label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.7);
  }
  input {
    background: #ffffff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    padding: 1.4rem 2rem;
    width: 100%;
    outline: none;
  }
`

const SettingFormData: Model.IFormData = {
  // userId: {
  //   label: 'User ID',
  //   // validationRules: [
  //   //   ValidateRule.requiredRule('First Name'),
  //   //   ValidateRule.minLengthRule('First Name', 3),
  //   //   ValidateRule.maxLengthRule('First Name', 25),
  //   // ],
  // },
  firstName: {
    label: 'First name',
    validationRules: [ValidateRule.requiredRule('First name'), ValidateRule.minLengthRule('First name', 1), ValidateRule.maxLengthRule('First name', 25), ValidateRule.validateNames('first name')],
  },
  lastName: {
    label: 'Last name',
    validationRules: [ValidateRule.requiredRule('Last name'), ValidateRule.minLengthRule('Last name', 1), ValidateRule.maxLengthRule('Last name', 25), ValidateRule.validateNames('Last name')],
  },
  userName: {
    label: ' Username',
    validationRules: [ValidateRule.requiredRule('Username'), ValidateRule.minLengthRule('Username', 1), ValidateRule.maxLengthRule('Username', 25), ValidateRule.validateNames('Username')],
  },

  email: {
    label: 'Email',
    validationRules: [ValidateRule.requiredRule('Email ID'), ValidateRule.validateEmail('Email ID')],
  },
  password: {
    label: 'Password',
    validationRules: [ValidateRule.requiredRule('password'), ValidateRule.minLengthRule('password', 8), ValidateRule.maxLengthRule('password', 25), ValidateRule.validatePassword('Password')],
  },
  confirmPassword: {
    label: 'Confirm password',
    validationRules: [ValidateRule.requiredRule('confirm password'), ValidateRule.minLengthRule('confirm password', 8), ValidateRule.maxLengthRule('confirm password', 25), ValidateRule.validatePassword('confirm password')],
  },
}

interface AdminProfileProps {
  isEditEnabled: boolean
  adminId: number
}

const AdminProfile = (props: AdminProfileProps) => {
  const { isEditEnabled, adminId } = props

  const fileInput = useRef<HTMLInputElement>(null)
  // const fileBannerInput = useRef<HTMLInputElement>(null)
  const [ToggleState, setToggleState] = useState<any>(0)
  const router = useRouter()
  const [edit, setEdit] = useState(true)
  const [update, SetUpdate] = useState()
  const [userStats, setUserStats] = useState(null)
  const [loader, setLoader] = useState<boolean>(false)
  const [bannerLoader, setBannerLoader] = useState<boolean>(false)
  const [renderFlag, setRenderFlag] = useState(true)

  const [permissionList, setPermissionList] = useState<any>([])
  const [permissionListForEdit, setPermissionListForEdit] = useState<any>([])
  const clickHandler = () => {
    setEdit(true)
  }

  let formDataRules = SettingFormData

  if (isEditEnabled) {
    let settingFormDataCopy = { ...SettingFormData }
    delete settingFormDataCopy.password
    delete settingFormDataCopy.confirmPassword
    formDataRules = settingFormDataCopy
  }

  const { isFormValid, form, updateForm, onInputChange, setForm } = useForm(formDataRules)

  const toggleTab = (index: number) => {
    setToggleState(index)
  }
  const backHandler = () => {
    router.push('/subadmin')
  }

  const validateFile = (fileType: string) => {
    if (fileType.split('/')[0] !== 'image') {
      ModalService.open((modalProps: any) => <ErrorModal desc={'Please choose a valid image file...!!'} close={modalProps.close} />)
      return false
    } else {
      return true
    }
  }

  //Fetching All permission list
  const getPermissionList = () => {
    auth.getPermissionsListAdmin().then((data) => {
      const permissionData = data?.data?.data
      setPermissionList(permissionData)
    })
    // setRenderFlag(false)
  }

  const getPermissionByAdminId = (adminId) => {
    const data = auth.getPermissionAdmin(adminId).then((data) => {
      const permissionData = data?.data?.data

      return permissionData
      // setPermissionList(permissionData)
    })
    return data
  }

  // const getPermissionByAdminId = (adminId) => {
  //   console.log('>>> Permission ID ', adminId)
  //   const data = auth.getPermissionAdmin(adminId).then((data) => {
  //     const permissionData = data?.data?.data
  //     console.log('<<< 173 perimision new', permissionList, permissionData)
  //     const permissionListById = permissionList?.map((item) => {
  //       return { ...permissionData?.find((permission) => Number(permission?.permissionId) === Number(item?.id)), ...item }
  //     })
  //     console.log('<<< 173 newer', permissionListById)
  //     setPermissionList(permissionListById)
  //     return permissionData
  //     // setPermissionList(permissionData)
  //   })
  //   return data
  // }

  // Save permission
  const savePermission = (userId: number) => {
    if (userId) {
      let newPermission = structuredClone(permissionList)
      newPermission = newPermission?.filter((permission) => {
        if ('permissionId' in permission) {
          delete permission.label
          delete permission.name
          delete permission.userId
          delete permission.id
          delete permission.description
          delete permission?.permissionData
          return permission
        }
        return
      })

      auth
        .setPermissionAdmin(userId, newPermission)
        .then((res) => {
          if (res?.data?.data) {
            // const userId = res?.data?.data?.id;

            setEdit(false)
            // SetUpdate(res?.data?.data)
            // ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Permission saved" />)
          } else if (res?.error) {
            ModalService.open((modalProps: any) => <ErrorModal desc={res?.error?.error?.message || 'Error while saving permission'} close={modalProps.close} />)
          }
        })
        .catch((err) => {
          console.log(err?.response?.data?.error?.message)
          ModalService.open((modalProps: any) => <ErrorModal desc={err?.response?.data?.error?.message || 'Profile creation failed'} close={modalProps.close} />)
        })
    }
  }

  const saveHandler = (e: any) => {
    e.preventDefault()

    // Permission validaiton
    if (permissionList.filter((item) => item.hasAccess)?.length == 0) {
      ModalService.open((modalProps: any) => <ErrorModal desc={'Please select any permission'} close={modalProps.close} />)
      return false
    }

    if (isFormValid()) {
      const data = {
        firstName: form?.firstName?.value || '',
        lastName: form?.lastName?.value || '',
        userName: form?.userName?.value || '',
        email: form?.email?.value || '',
        password: form?.password?.value || '',
        confirmPassword: form?.confirmPassword?.value || '',
      }
      auth
        .userAdminCreateSubAdmin(data)
        .then(async (res) => {
          if (res?.data?.data) {
            const userId = res?.data?.data?.id

            await savePermission(userId)
            setEdit(false)
            SetUpdate(res?.data?.data)
            await ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="  Profile Updated Successfully" />)
            router.push('/subadmin')
          } else if (res?.error) {
            ModalService.open((modalProps: any) => <ErrorModal desc={res?.error?.error?.message || 'Profile creation failed'} close={modalProps.close} />)
          }
        })
        .catch((err) => {
          console.log(err?.response?.data?.error?.message)
          ModalService.open((modalProps: any) => <ErrorModal desc={err?.response?.data?.error?.message || 'Profile creation failed'} close={modalProps.close} />)
        })
    }
  }

  const editHandler = async (e: any) => {
    const id = adminId
    e.preventDefault()

    //Permission Validation
    if (permissionList.filter((item) => item.hasAccess)?.length == 0) {
      ModalService.open((modalProps: any) => <ErrorModal desc={'Please select any permission'} close={modalProps.close} />)
      return false
    }

    if (isFormValid()) {
      const data = {
        firstName: form?.firstName?.value || '',
        lastName: form?.lastName?.value || '',
        userName: form?.userName?.value || '',
        email: form?.email?.value || '',
      }
      auth
        .updatedProfile(data, id)
        .then(async (res) => {
          if (res?.data?.data) {
            const userId = id

            await savePermission(userId)
            setEdit(false)
            SetUpdate(res?.data?.data)
            await ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="  Profile Updated Successfully" />)
            router.push('/subadmin')
          } else if (res?.error) {
            ModalService.open((modalProps: any) => <ErrorModal desc={res?.error?.error?.message || 'Profile creation failed'} close={modalProps.close} />)
          }
        })
        .catch((err) => {
          console.log(err?.response?.data?.error?.message)
          ModalService.open((modalProps: any) => <ErrorModal desc={err?.response?.data?.error?.message || 'Profile creation failed'} close={modalProps.close} />)
        })
    }
  }

  const getUserDetails = (adminId) => {
    auth.userProfileDetails(adminId).then((data) => {
      const userData = data?.data?.data
      updateForm({
        // userId: {
        //   value: userData?.id || '',
        // },
        firstName: {
          value: userData?.firstName || '',
        },
        lastName: {
          value: userData?.firstName || '',
        },
        userName: {
          value: userData?.userName || '',
        },
        email: {
          value: userData?.email || '',
        },
        profilePic: {
          value: userData?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.profilePicUrl}` : '',
        },
      })
    })
  }

  // useEffect(() => {
  //   const setEditData = async (isEditEnabled, adminId) => {
  //     if (isEditEnabled && adminId && permissionList?.length > 0 && renderFlag === true) {
  //       await getUserDetails(adminId)
  //       const permissionListByAdminId = await getPermissionByAdminId(adminId)
  //       const permissionListById = permissionList?.map((item) => {
  //         return { ...permissionListByAdminId?.find((permission) => Number(permission?.permissionId) === Number(item?.id)), ...item }
  //       })
  //       setPermissionListForEdit(permissionListById)
  //       setRenderFlag(false)
  //     }
  //   }
  //   if (renderFlag) {getPermissionList()
  //   setEditData(isEditEnabled, adminId)
  // }, [isEditEnabled, adminId])
  useEffect(() => {
    const setEditData = async (isEditEnabled, adminId) => {
      if (isEditEnabled && adminId) {
        getUserDetails(adminId)
        const permissionListByAdminId = await getPermissionByAdminId(adminId)
        const permissionListById = permissionListByAdminId?.map((item) => {
          return { ...item, ...item?.permissionData }
        })
        setPermissionList(permissionListById)
      }
    }
    setEditData(isEditEnabled, adminId)
  }, [isEditEnabled, adminId])

  // useEffect(() => {
  //   getPermissionList()
  //   if (isEditEnabled && adminId) {
  //     getUserDetails(adminId)
  //     const permissionListByAdminId = getPermissionByAdminId(adminId)
  //   }

  // }, [isEditEnabled, adminId])

  const fileUploadPicHandler = async (e: any) => {
    if (validateFile(e.target.files?.[0]?.type)) {
      const query: any = router.query.id
      setLoader(true)
      const res: any = await auth.updateUserProfileImg(e.target.files?.[0], query)
      updateForm({
        ...form,
        profilePic: {
          value: res?.data?.data?.profilePicUrl ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${res?.data?.data?.profilePicUrl}` : '',
        },
      })

      setLoader(false)
    }
  }

  // const fileUploadBannerHandler = async (e: any) => {
  //   if (validateFile(e.target.files?.[0]?.type)) {
  //     const query: any = router.query.id
  //     setBannerLoader(true)
  //     const res: any = await auth.updateUserBannerImg(e.target.files?.[0], query)

  //     updateForm({
  //       ...form,
  //       coverPic: {
  //         value: res?.data?.data?.bannerImage ? `${process.env.NEXT_PUBLIC_ASSET_S3}/${res?.data?.data?.bannerImage}` : '',
  //       },
  //     })
  //     setBannerLoader(false)
  //   }
  // }
  return (
    <>
      <Container>
        <Back>
          <div>
            <Button3 onClick={backHandler}>
              <img src="../svgs/back.svg" />
            </Button3>
            <SpanB>Back</SpanB>
          </div>
          {/* <Id># PNFT01</Id> */}
          <Active>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.5" cy="4.5" r="4.5" fill="#009370" />
            </svg>
            Active
          </Active>
        </Back>
        <ButtonContainer>
          <Button2 onClick={isEditEnabled ? editHandler : saveHandler}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.61073 2.55667L9.44333 5.38994L2.8326 12H0V9.16674L6.61073 2.55667ZM7.55493 1.61247L8.97123 0.195508C9.09645 0.0703245 9.26626 0 9.44333 0C9.62039 0 9.79021 0.0703245 9.91543 0.195508L11.8045 2.08457C11.9297 2.2098 12 2.37961 12 2.55667C12 2.73374 11.9297 2.90355 11.8045 3.02877L10.3875 4.44507L7.55493 1.61247Z"
                fill="white"
              />
            </svg>
            {isEditEnabled ? 'Edit Profile' : 'Save Changes'}
          </Button2>
        </ButtonContainer>
      </Container>
      <Container1>
        <TabMenu>
          <Tabs>
            <TabBox>
              <TabList onClick={() => toggleTab(0)} active={ToggleState === 0 ? true : false} width={'74px'}>
                About {ToggleState === 0 ? <VerticalBar></VerticalBar> : null}
              </TabList>
              {/* <TabList
              onClick={() => toggleTab(1)}
              active={ToggleState === 1 ? true : false}
              width={'91px'}
            >
              Analysis{' '}
              {ToggleState === 1 ? <VerticalBar></VerticalBar> : null}
            </TabList>

            <TabList
              onClick={() => toggleTab(2)}
              active={ToggleState === 2 ? true : false}
              width={'89px'}
            >
              Created{' '}
              {ToggleState === 2 ? <VerticalBar></VerticalBar> : null}
            </TabList>
            <TabList
              onClick={() => toggleTab(3)}
              active={ToggleState === 3 ? true : false}
              width={'100px'}
            >
              Collected{' '}
              {ToggleState === 3 ? <VerticalBar></VerticalBar> : null}
            </TabList>
            <TabList
              onClick={() => toggleTab(4)}
              active={ToggleState === 4 ? true : false}
              width={'174px'}
            >
              Transaction Details{' '}
              {ToggleState === 4 ? <VerticalBar></VerticalBar> : null}
            </TabList>
            <TabList
              onClick={() => toggleTab(5)}
              active={ToggleState === 5 ? true : false}
              width={'95px'}
            >
              On Sales{' '}
              {ToggleState === 5 ? <VerticalBar></VerticalBar> : null}
            </TabList> */}
            </TabBox>
          </Tabs>
        </TabMenu>
        <ProfileDataWrapper>
          <ImageContainer>
            <BackGroundWrapper>
              {/* <input type="file" hidden ref={fileBannerInput} onChange={fileUploadBannerHandler} value="" /> */}
              <BackGround src={form?.coverPic?.value || '/images/customer/profile-bg.png'}></BackGround>
              {/* {edit ? (
                <IconDiv>
                  <BackGroundIcon
                    onClick={() => {
                      if (null !== fileBannerInput?.current && edit) fileBannerInput?.current?.click()
                    }}
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.00065 0H9.00065L10.334 1.33333H13.0007C13.1775 1.33333 13.347 1.40357 13.4721 1.5286C13.5971 1.65362 13.6673 1.82319 13.6673 2V11.3333C13.6673 11.5101 13.5971 11.6797 13.4721 11.8047C13.347 11.9298 13.1775 12 13.0007 12H1.00065C0.82384 12 0.654271 11.9298 0.529246 11.8047C0.404222 11.6797 0.333984 11.5101 0.333984 11.3333V2C0.333984 1.82319 0.404222 1.65362 0.529246 1.5286C0.654271 1.40357 0.82384 1.33333 1.00065 1.33333H3.66732L5.00065 0ZM7.00065 10.6667C8.06152 10.6667 9.07893 10.2452 9.82908 9.49509C10.5792 8.74495 11.0007 7.72753 11.0007 6.66667C11.0007 5.6058 10.5792 4.58839 9.82908 3.83824C9.07893 3.08809 8.06152 2.66667 7.00065 2.66667C5.93978 2.66667 4.92237 3.08809 4.17222 3.83824C3.42208 4.58839 3.00065 5.6058 3.00065 6.66667C3.00065 7.72753 3.42208 8.74495 4.17222 9.49509C4.92237 10.2452 5.93978 10.6667 7.00065 10.6667V10.6667ZM7.00065 9.33333C6.29341 9.33333 5.61513 9.05238 5.11503 8.55229C4.61494 8.05219 4.33398 7.37391 4.33398 6.66667C4.33398 5.95942 4.61494 5.28115 5.11503 4.78105C5.61513 4.28095 6.29341 4 7.00065 4C7.70789 4 8.38617 4.28095 8.88627 4.78105C9.38637 5.28115 9.66732 5.95942 9.66732 6.66667C9.66732 7.37391 9.38637 8.05219 8.88627 8.55229C8.38617 9.05238 7.70789 9.33333 7.00065 9.33333Z"
                      fill="white"
                    />
                  </BackGroundIcon>
                </IconDiv>
              ) : null} */}
              {bannerLoader && (
                <LoaderDiv>
                  <Loader width="100" height="60" />
                </LoaderDiv>
              )}
            </BackGroundWrapper>
            <ProfileWrapper>
              <Profileimg src={form?.profilePic?.value || '/images/customer/profile-img.png'}></Profileimg>
              <input type="file" hidden ref={fileInput} onChange={fileUploadPicHandler} value="" />
              {loader && (
                <LoaderDiv1>
                  <Loader width="100" height="60" />
                </LoaderDiv1>
              )}
              {isEditEnabled ? (
                <EditIcon
                  onClick={() => {
                    if (null !== fileInput?.current && edit) fileInput?.current?.click()
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  height={'32'}
                  width={'40'}
                >
                  <path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
                </EditIcon>
              ) : null}
            </ProfileWrapper>
          </ImageContainer>
          <Container2>
            <NameContainer>
              <Name1>
                <Name>{trimString(form?.firstName?.value, 25) || 'NA'}</Name>
                <Email>@{form?.userName?.value || 'NA'}</Email>
              </Name1>
              {/* <FollowContainer>
                <FollowDetails>
                  <Follower>
                    <Count>{userStats?.data?.followerCount}</Count>
                    <Status>Followers</Status>
                  </Follower>
                  <HorizontalBar></HorizontalBar>
                  <Follow>
                    <Count> {userStats?.data?.followingCount}</Count>
                    <Status>Following</Status>
                  </Follow>
                </FollowDetails>
              </FollowContainer> */}
              <div>
                <PermissionManager permissionList={permissionList} setPermissionList={setPermissionList} />
              </div>
            </NameContainer>
            <ProfileContainer>
              <FormHeader>Profile Details</FormHeader>
              <ProfileDetails>
                {['firstName', 'lastName', 'userName', 'email', 'password', 'confirmPassword'].map((eachItem, i) => (
                  <>
                    {(isEditEnabled && eachItem == 'password') || (isEditEnabled && eachItem == 'confirmPassword') ? null : (
                      <FormDiv key={eachItem + i}>
                        <label htmlFor={eachItem}>{form?.[eachItem]?.label}</label>
                        <input
                          type={eachItem === 'password' || eachItem === 'confirmPassword' ? 'password' : 'text'}
                          className={edit && eachItem === 'name' ? '' : 'cursor-default'}
                          readOnly={edit && eachItem === 'userId' ? true : !edit ? true : false}
                          id={eachItem + i}
                          name={eachItem}
                          value={form?.[eachItem]?.value}
                          onChange={onInputChange}
                          maxLength={edit && eachItem === 'name' && 27}
                          placeholder={edit && eachItem === 'name' && 'max length 25 characters'}
                        />

                        {!form[eachItem]?.valid && <ErrorMsg>{form[eachItem]?.errorMessage}</ErrorMsg>}
                      </FormDiv>
                    )}
                  </>
                ))}
              </ProfileDetails>
              {/* <Description>
                {['description'].map((eachItem, i) => (
                  <>
                    <FormDiv1 key={eachItem + i}>
                      <label htmlFor={eachItem}>{form?.[eachItem]?.label}</label>
                      <textarea id={eachItem + i} name={eachItem} className={edit ? '' : 'cursor-default'} readOnly={edit ? false : true} value={form?.[eachItem]?.value} onChange={onInputChange} />

                      {!form[eachItem].valid && <ErrorMsg>{form[eachItem]?.errorMessage}</ErrorMsg>}
                    </FormDiv1>
                  </>
                ))}
              </Description> */}
            </ProfileContainer>
          </Container2>
          <Container3>
            {/* <div>
              <PermissionManager />
            </div> */}
          </Container3>
        </ProfileDataWrapper>
      </Container1>
    </>
  )
}

export default AdminProfile

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  input {
    background: rgba(253, 253, 253, 0.82);
    border: 1.5px solid #ededed;
    border-radius: 6px;
    width: 30rem;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin-top: 0.5rem;
    outline: none;
    color: #72809c;
  }
  label {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: #000000b2;
  }
  label:after {
    content: ' *';
    color: red;
  }
`
const FormDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.8rem;
  textarea {
    background: rgba(253, 253, 253, 0.82);
    border: 1.5px solid #ededed;
    border-radius: 6px;
    width: 100%;
    height: 10rem;
    padding: 2rem;
    outline: none;
    color: #72809c;
  }
  label {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: #000000b2;
  }
`

const ErrorMsg = styled.div`
  font-size: 10px;
  color: red;
  margin: 0;
`
const ImgDiv = styled.div``

const EditIcon = styled.svg`
  position: absolute;
  right: -1rem;
  top: 6rem;
  z-index: 999;
`
const BackGroundIcon = styled.svg`
  z-index: 999;
  height: 50%;
  width: 50%;
`

const IconDiv = styled.div`
  background: rgba(0, 0, 0, 0.39);
  border: 2px solid #ffffff;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 50%;
  width: 4rem;
  bottom: 2rem;
  right: 2rem;
`
const LoaderDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 99999;
`
const LoaderDiv1 = styled.div`
  position: absolute;
  transform: translate(-50%, 15%);
  top: 50%;
  left: 50%;
  z-index: 999;
`
