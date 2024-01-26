import { ButtonPrimary, ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import InputText from '@apps/customer/modules/shared/components/formInputs/inputText'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { RootState } from '@apps/customer/redux/store'
import { Container } from '@apps/customer/styles/CommonStyles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import API from '@apps/customer/api/customer/index'
import { toast } from 'react-toastify'
import Select from 'react-select'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import Link from 'next/link'
import { acceptOnlyNumbers } from '@apps/customer/utils/helper'
import InputCheckbox from '@apps/customer/modules/shared/components/formInputs/inputCheckbox'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12rem 0;
    @media screen and (max-width: 768px) {
        padding: 7.5rem 0 15.4rem;
    }
    .container {
        max-width: 900px;
    }
    h1 {
        color: #1D1D1D;
        font-size: 32px;
        font-weight: 400;
        line-height: 104%;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 850px) {
        .container {
            padding: 0 20px;
        }
    }
`
const GoBackWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    margin: 22px 0  43px;
    cursor: pointer;
    a {
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
        margin-left: 20px;
        color: #848A8B;
    }
`

const AuctionRegForm = styled.div`
    width: 900px;
    height: auto;
    background: #F4F9F9;
    padding: 68px 60px 58px;
    .d-flex-sb {
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
            font-size: 13px;
            &:hover {
                color: blue;
            }
        }
    }
    .d-flex {
        display: flex;
        gap: 20px;
    }
    .text-input-wrapper {
        margin-bottom: 40px;
        label {
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            color: #4E4E4E;
            margin-bottom: 6px;
        }
        input {
            font-size: 16px;
            font-weight: 600;
            line-height: 16px;
            color: #0E1818 !important;
            border: 1.5px solid #D1E0E2;
            padding: 24px 22px;
        }
        .radio-input {
            margin-top: 6px;
            label {
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: 600;
                line-height: 16px;
            }
            input {
                margin-right: 4px;
            }
        }
    }
    .react-select__control {
        .react-select__indicator-separator {
          display: none;
        }
        .react-select__single-value, .react-select__placeholder{
            font-size: 16px;
            font-weight: 600;
            line-height: 16px;
            color: #0E1818 !important;
            padding: 18px 10px;
        }
        .react-select__indicator {
            margin-right: 10px;
        }
    }
    @media screen and (max-width: 850px) {
        width: 100%;
        max-width: 100%;
        padding: 40px 25px;
    }
`
const FormHeader = styled.div`
    display: flex;
    margin-bottom: 20px;
    gap: 25px;
    align-items: baseline;
    h1 {
        margin: 0;
    }
    a {
        font-size: 14px;
        text-decoration: underline;
        color: #0e1818;
        &:hover {
            color: blue;
        }
    }
    @media screen and (max-width: 500px) {
        display: block;
    }
`
const KYCWrapper = styled.div`
    margin-bottom: 40px;
    p {
        color: #4E4E4E;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        margin-bottom: 16px;
        span {
            font-weight: 600;
        }
    }
    .kyc-badge {
        background: #C9E0E066;
        padding: 10px;
        gap: 6px;
        color: #202A2A;
        font-size: 16px;
        display: inline-flex;
        align-items: center;
        font-weight: 700;
        border-radius: 50px;
        &.pending {
            background: #FF5555;
            color: white;
        }
    }
`
const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
`
const Terms = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 16px;
    margin-bottom: 56px;
    .text-input-wrapper {
        div {
            align-items: flex-start;
        }
        input {
            margin-top: 4px;
            min-width: 18px;
        }
    }
`

const AuctionRegPage = () => {

    const router = useRouter()
    const assetId = router.query?.id
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [auctionId, setAuctionId] = useState(null)
    const [companyArr, setCompanyArr] = useState([])
    const [auctionDetails, setAuctionDetails] = useState(null)
    const [type, setType] = useState(null)
    const [amount, setAmount] = useState(null)
    const [terms, setTerms] = useState(false)
    const [whitelisted, setWhitelisted] = useState(false)
    const [userDetails, setUserDetails] = useState(null)

    console.log('assetId, auctionId, userDetails', assetId, auctionId, userDetails)

    const onSelectChange = (e) => {
        // console.log(e)
        setSelectedCompany(e)
    }
    
    const requestAuctionReg = async () => {
        let payload = {
            type: type,
            lockAmount: amount
        }
        if(type === 'Company') payload['companyId'] = selectedCompany?.id
        if(whitelisted) delete payload['lockAmount']
        await API.requestAuctionReg(payload, auctionId)
        .then(res => {
            if (res.status == 200) {
                // console.log('res requestAuctionReg', res)
                Toast.success(res?.data?.data?.message || 'Successfully created auction registration')
                setTimeout(() =>  router.push(`/auctions`), 3000)
            } else {
                Toast.error(res?.error?.error?.message || `Something went wrong. Please try later`)
            }
        })
        .catch(err => {
            console.log('err', err)
            Toast.error(err?.error?.error?.message || `Something went wrong. Please try later`)
        })
    }

    const getDetailsById = async (Id = assetId) => {
        await API.getAssetById(Id)
        .then(res => {
            if (res.status == 200) {
                // console.log('res auction data', res)
                setAuctionDetails(res?.data?.data)
                setAuctionId(res?.data?.data.editions?.[1]?.auctionsData?.[0]?.id)
            } else {
                toast.error(res?.error?.error?.message || 'Something went wrong. Please try again later', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    style: {
                        fontSize: '1.6rem',
                    },
                })
                setTimeout(() =>  router.push(`/auctions`), 3000)
            }
        })
    }

    const getUserDetails = () => {
        API.getUserDetails()
        .then(res => {
            if(res?.data?.data?.id) {
                setUserDetails(res?.data?.data)
            }
            // console.log('res getUserDetails', res)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    const getCompaniesData = () => {
        API.getCompanies()
        .then(res => {
            if(res?.data?.data?.companies) {
                let arr = []
                res?.data?.data?.companies.forEach(el => {
                    if(el?.kybStatus === "Approved") {
                        arr.push({ ...el, value: el?.id, label: el?.name })
                    }
                })
                setCompanyArr(arr)
            }
            // console.log('res getCompaniesData', res)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    const validateForm = () => {
        let result = false
        if(selectedCompany === null && type === null && amount === null) {
            Toast.info('All Fields are required')
            return result
        } else if(type === null) {
            Toast.info('Type is required')
            return result
        } else if(type === 'Company' && selectedCompany === null) {
            Toast.info('Company is required')
            return result
        } else if(amount === null && !whitelisted || amount === '' && !whitelisted) {
            Toast.info('Anticipated Bid Amount is required')
            return result
        } else if(!terms) {
            Toast.info('Please accept terms and conditions before proceeding')
            return result
        } else {
            return true
        }
    }

    const handleSubmit = () => {
        // console.log('selectedCompany', selectedCompany)
        if(userDetails?.kycStatus === 'In Review') {
            Toast.info('KYC is under review cannot register now for auction')
            return
        } else if(userDetails?.kycStatus === 'Rejected') {
            Toast.info('KYC is Rejected cannot register now for auction')
            return
        } else if(userDetails?.kycStatus === 'Pending') {
            Toast.info('Complete KYC to proceed for Auction Registration')
            return
        }
        const result = validateForm()
        // console.log('result', result)
        if(result) {
            requestAuctionReg()
        }
    }

    const onChange = (e) => {
        const { name, value, checked } = e?.target
        // console.log('name, value', name, value)
        if(name === 'amount') {
            setAmount(Number(acceptOnlyNumbers(value)) || '')
        } else if(name === 'type') {
            setType(value)
        } else {
            setTerms(checked)
        }
    }

    useEffect(() => {
        getUserDetails()
        getDetailsById()
        getCompaniesData()
    }, [assetId])

    useEffect(() => {
        if (type==='Individual') {
            if(userDetails?.isWhitelisted) {
                setWhitelisted(true)
            } else {
                setWhitelisted(false)
            }
        } else {
            if(selectedCompany?.isWhitelisted) {
                setWhitelisted(true)
            } else {
                setWhitelisted(false)
            }
        }
    }, [type, selectedCompany])

    // console.log('ansdnasndnasdnasnd', type, amount, selectedCompany, terms, profileData)

    return (
        <Wrapper>
            <Container className='container'>
                <GoBackWrapper onClick={() =>  router.push(`/auctions`)}>
                    <Icon name="back-arrow" />
                    <a>Back</a>
                    {/* <a>{auctionDetails?.refName}</a> */}
                </GoBackWrapper>
                <FormHeader>
                    <h1>Register Now</h1>
                    <a href={`/files/fg-how-to-register.pdf`} target="_blank">
                        (How to Register)
                    </a>
                </FormHeader>
                <AuctionRegForm>
                    <InputText label={`User Name`} onChange={() => {}} disabled value={userDetails?.userName} name={`userName`} placeholder={`Enter user name`} required={true} />
                    <InputText label={`Email address`} onChange={() => {}} disabled value={userDetails?.email} name={`email`} placeholder={`Enter email`} required={true} />
                    <div className='text-input-wrapper'>
                        <label>Select Type</label>
                        <div className='d-flex'>
                            <div className='radio-input'>
                                <label>
                                    <input type="radio" name="type" value="Individual" checked={type === 'Individual'} onChange={onChange} />Individual 
                                </label>
                            </div>
                            <div className='radio-input'>
                                <label>
                                    <input type="radio" name="type" value="Company" checked={type === 'Company'} onChange={onChange} />Company
                                </label>
                            </div>
                        </div>
                    </div>
                    {type === 'Company' 
                    ? <div className='text-input-wrapper'>
                        <div className='d-flex-sb'>
                            <label>Company</label>
                            <Link passHref href={`/base/myProfile`}><a>+ Add company</a></Link>
                        </div>
                        <Select
                            placeholder="Select Company"
                            classNamePrefix="react-select"
                            options={companyArr}
                            defaultValue={selectedCompany}
                            value={selectedCompany}
                            onChange={onSelectChange}
                        />
                    </div>
                    : null}
                    {whitelisted 
                    ? null
                    : <InputText label={`Anticipated Bid Amount`} onChange={onChange} value={amount} name={`amount`} placeholder={`Enter Anticipated Bid Amount`} required={true} />}
                    <KYCWrapper>
                        <p>KYC/KYB Status {userDetails?.kycStatus !== 'Completed' ? <>- <span>{userDetails?.kycStatus}</span></> : null}</p>
                        {userDetails?.kycStatus === 'Completed' 
                        ?  <div className='kyc-badge'>
                            <Image src='/svgs/verified.svg' width={14} height={14} />
                            Verified 
                        </div>
                        : userDetails?.kycStatus === 'Pending' 
                            ? <Link passHref href={`/base/myProfile`}>
                                <a className='kyc-badge pending'>Verify now</a>
                            </Link>
                            : null}
                    </KYCWrapper>
                    <Terms>
                        <InputCheckbox label={`By clicking on this box, you confirm that you have read and agree to be bound by the Conditions of Sale for this bid and any later bids you may place on this or any other lot in this sale. Bids placed in an online-only sales are final and cannot be cancelled except for the limited reasons set out in the Conditions of Sale.`} 
                            name='terms' value={terms} onChange={onChange} 
                        />
                    </Terms>
                    <BtnWrapper>
                        <ButtonPrimaryOutline onClick={() =>  router.push(`/auctions/${auctionId}`)}>Cancel</ButtonPrimaryOutline>
                        <ButtonPrimary onClick={() => handleSubmit()}>Submit</ButtonPrimary>
                    </BtnWrapper>
                </AuctionRegForm>
            </Container>
        </Wrapper>
    )
}

export default AuctionRegPage