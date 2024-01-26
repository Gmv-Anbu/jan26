import auth from '@apps/admin/api/admin/auth'
import { Model, useForm, ValidateRule } from '@apps/admin/hooks/customForm'
import form from '@apps/admin/hooks/form'

import AdminLayout from '@apps/admin/modules/admin/components/layout/layout'
import SuccessModal from '@apps/admin/modules/admin/modal/SuccessModal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { Loader } from '@apps/admin/modules/shared/components/Loader'
import meta from '@apps/admin/modules/shared/components/meta'
import { RootState } from '@apps/admin/redux/store'
import { trimString } from '@apps/admin/utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import API, { handleApiImage } from '../../api/admin'
import CompanyApprovalModal from '@apps/admin/modules/admin/modal/companyApprovalModal'

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
const HorizontalBar = styled.span`
  width: 1px;
  height: 35px;
  border: 1px solid #bac6d9;
  margin-left: 20px;
  margin-right: 20px;
`

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
  padding: 0;
`
const ProfileDataWrapper = styled.div`
  position: relative;
  border-radius: 10px;
`

const BackGround = styled.img`
  width: 100%;
  height: 18.8rem;
  object-fit: cover;
  border-radius: 8px 8px 0px 0px;
`
const EditBackground = styled.div`
  position: relative;
`
const BackGroundWrapper = styled.div`
  position: relative;
  max-width: 94.4rem;
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
const NameContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-left: 4rem;
`
const ProfileContainer = styled.div`
  max-width: 68.6rem;
  width: 100%;
  padding: 4rem;
`
const FormHeader = styled.h3`
  font-family: Poppins;
  font-size: 25px;
  font-weight: 500;
  line-height: 27px;
  margin-bottom: 3rem;
`
const Name1 = styled.div`
  display: flex;
  flex-direction: column;
`
const FollowContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
`
const FollowDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
`
const Follow = styled.div`
  display: flex;
  flex-direction: column;
`
const Follower = styled.div`
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

const Count = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 4px;
  color: #001c35;
`
const Status = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #656565;
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
  input, textarea {
    background: #ffffff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    padding: 1.4rem 2rem;
    width: 100%;
    outline: none;
  }
`
const Form1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 46%;
`
const Form2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 46%;
  margin-right: 2rem;
`
const Id1 = styled.label`
  margin-bottom: 10px;
`
const Name2 = styled.label`
  margin-bottom: 10px;
`
const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 10px;
`
const Label2 = styled.label`
  margin-top: 10px;
  margin-bottom: 10px;
`
const DescriptionBox = styled.textarea`
  width: 100%;
  outline: none;
  margin-top: 10px;
  height: 8rem;
  background: #ffffff;
  border: 1px solid #bac6d9;
  border-radius: 6px;
  margin-bottom: 10px;
`
const Description = styled.div`
  label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

    line-height: 17px;

    color: rgba(0, 0, 0, 0.7);
  }
  width: 98%;
`
const AdminProfile = () => {

    const router = useRouter()
    const [details, setDetails] = useState(null)
    const inputFields = ['name', 'registrationNumber', 'email', 'ubo', 'year', 'kybStatus']
    const inputFieldsLabels = ['Name', 'Registration Number', 'Email', 'UBO', 'Year', 'KYB Status']
    const [companyModal, setCompanyModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)

    const openStatusModal = () => {
        setCompanyModal(true)
    }
    const closeStatusModal = (val) => {
        setCompanyModal(false)
        if(val) backHandler()
    }
    
    const backHandler = () => {
        router.push('/company')
    }

    const getComapnyById = (id) => {
        API.getCompanyById(id)
        .then((res) => {
            const data = res?.data?.data
            console.log('getComapnyById', data)
            setDetails(data)
        })
        .catch(err => {
            console.log('err')
            backHandler()
        })
    }

    useEffect(() => {
        if(router.query.id) getComapnyById(router.query.id)
    }, [router.query.id])

    return (
        <>
            {companyModal && <CompanyApprovalModal data={details} closeModal={closeStatusModal} />}
            <AdminLayout meta={meta} pageTitle={`Company Approval`}>
                <Container>
                    <Back>
                    <div>
                        <Button3 onClick={backHandler}>
                        <img src="../svgs/back.svg" />
                        </Button3>
                        <SpanB>Back</SpanB>
                    </div>
                    </Back>
                <ButtonContainer>
                <Button2 onClick={() => openStatusModal()}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.61073 2.55667L9.44333 5.38994L2.8326 12H0V9.16674L6.61073 2.55667ZM7.55493 1.61247L8.97123 0.195508C9.09645 0.0703245 9.26626 0 9.44333 0C9.62039 0 9.79021 0.0703245 9.91543 0.195508L11.8045 2.08457C11.9297 2.2098 12 2.37961 12 2.55667C12 2.73374 11.9297 2.90355 11.8045 3.02877L10.3875 4.44507L7.55493 1.61247Z"
                        fill="white"
                    />
                    </svg>
                    Update Status
                </Button2>
                </ButtonContainer>
            </Container>
            <Container1>
                <ProfileDataWrapper>
                <Container2>
                    <ProfileContainer>
                    <FormHeader>Company Details</FormHeader>
                    <ProfileDetails>
                        {inputFields.map((el, i) => (
                        <>
                            <FormDiv key={el + i}>
                                <label htmlFor={el}>{inputFieldsLabels[i]}</label>
                                <input
                                    type="text"
                                    className={'cursor-default'}
                                    readOnly={true}
                                    id={el + i}
                                    name={details?.[el]}
                                    value={details?.[el]}
                                />
                            </FormDiv>
                        </>
                        ))}
                    </ProfileDetails>
                    <FormDiv>
                        <label>Address</label>
                        <textarea disabled value={details?.address} />
                    </FormDiv>
                    <FormDiv>
                        <label>Documents</label>
                        {details?.CompanyDocuments?.length 
                        ? details?.CompanyDocuments?.map((el,i) => {
                            return (<a key={el?.id} href={handleApiImage(el?.filePath)} target="_blank">{i+1}. {handleApiImage(el?.filePath)}</a>)
                        }) 
                        : 'No documents found.'}
                    </FormDiv>
                    </ProfileContainer>
                </Container2>
                </ProfileDataWrapper>
            </Container1>
            </AdminLayout>
        </>
    )
}

export default AdminProfile

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  input, textarea {
    background: rgba(253, 253, 253, 0.82);
    border: 1.5px solid #ededed;
    border-radius: 6px;
    width: 100%;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin-top: 0.5rem;
    outline: none;
    color: #72809c;
  }
  textarea {
    height: 12rem;
    width: 100%;
    padding: 1.4rem 2rem;
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
  a {
    font-size: 12px;
    width: 600px;
    margin-bottom: 5px;
    &:hover {
        color: blue;
    }
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
