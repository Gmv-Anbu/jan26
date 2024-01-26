import { ButtonPrimary, ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { RootState } from '@apps/customer/redux/store'
import { Container } from '@apps/customer/styles/CommonStyles'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import API from '../../../api/customer/index'
import { useRouter } from 'next/router'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import { formatToUSD, handleApiImage, objectDeepClone } from '@apps/customer/utils/helper'
import UserService from '@apps/customer/api/customer/UserService'
import moment from 'moment'
import Link from 'next/link'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12rem 0;
    @media screen and (max-width: 768px) {
        padding: 7.5rem 0 15.4rem;
    }
    h1 {
        font-size: 60px;
        font-weight: 400;
        line-height: 62px;
        color: #111727;
        margin-bottom: 60px;
    }
`
const GoBackWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0  40px;
    a {
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
        margin-left: 20px;
    }
`

const PaymentContent = styled.div`
    background: #F4F9F9;
`
const PaymentContentHeader = styled.div`
    border-bottom: 1px solid #B8C8CA;
    padding: 30px;
    .nav-container {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto auto;
        grid-gap: 120px;
        @media screen and (max-width: 600px) {
            grid-gap: 60px; 
            align-items: baseline;
        }
    }
    a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        line-height: 17px;
        color: rgba(0,0,0,0.6);
        position: relative;
        span {
            width: 28px;
            height: 28px;
            background: #BDC0C0;
            border-radius: 50%;
            margin-bottom: 10px;
            display: flex;
            text-align: center;
            align-items: center;
            color: white;
            justify-content: center;
            z-index: 1;
        }
        &.active {
            color: #000;
            span {
                background: #2A7575;
            }
        }
        &:first-child:before {
            display: none;
        }
        &:before {
            content: '';
            height: 1px;
            width: 240px;
            background: #848A8B;
            left: -185px;
            top: 14px;
            z-index: 0;
            position: absolute;
            @media screen and (max-width: 600px) {
                width: 110px;
                left: -70px;
            }
        }
    }
`
const PaymentContentBody = styled.div`
    max-width: 986px;
    margin: auto;
    @media screen and (max-width: 840px) {
        padding: 0 20px;
    }
`
const PaymentStepOneBody = styled.div`
    display: grid;
    padding: 55px 0;
    grid-template-columns: 346px 520px;
    grid-gap: 120px;
    @media screen and (max-width: 840px) {
        grid-gap: 40px;
        grid-template-columns: auto;
        div:first-child {
            text-align: center;
        }
    }
    h4 {
        color: #111727;
        font-size: 20px;
        font-weight: 600;
        line-height: 100%;
        margin-bottom: 10px;
    }
    h5 {
        color: #898989;
        font-size: 18px;
        font-weight: 600;
        line-height: 100%;
        margin-bottom: 5px;
    }
    h6 {
        color: #111727;
        font-size: 28px;
        font-weight: 700;
        line-height: 140%;
    }
    .bid-won-date {
        margin: 40px 0;
        padding: 16px 0;
        border-top: 1px solid #B8C8CA;
        border-bottom: 1px solid #B8C8CA;
        span {
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
            color: #4E4E4E;             
        }
        p {
            font-size: 18px;
            font-weight: 600;
            line-height: 22px;
            color: #000000;  
            margin-top: 10px;         
        }
    }
    .label-price {
        display: flex;
        max-width: 365px;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 15px;
        span {
            font-size: 18px;
            font-weight: 600;
            line-height: 23px;  
            color: #4E4E4E;
            display: flex;
            align-items: center;          
        }
        p {
            font-size: 20px;
            font-weight: 600;
            line-height: 20px;    
            color: #121212;            
        }
        &.total {
            span {
                font-size: 20px;
                font-weight: 600;
                line-height: 26px;
                color: #242424;
            }
            p {
                font-size: 22px;
                font-weight: 600;
                line-height: 22px;
                color: #121212;
            }
        }
    }
`
const PaymentStepTwoBody = styled.div`
    padding: 66px 0 80px;
    max-width: 596px;
    margin: auto;
    .ship {
        margin-bottom: 69px;
        h4 {
            font-size: 24px;
            font-weight: 600;
            line-height: 31px;
            color: #121212;
            text-align: center;
            margin-bottom: 24px;
        }
        a {
            font-size: 14px;
            font-weight: 700;
            line-height: 22px;
            color: #2A7575;
            text-decoration: underline;
            margin-top: 8px;
            display: inline-block;
        }
    }
    .box-box {
        margin-bottom: 40px;
        h5 {
            color: #444;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        a {
            position: absolute;
            top: 8px;
            right: 8px;
        }
    }
    .ship, .box-box {
        div {
            display: flex;
            gap: 34px;
        }
        @media screen and (max-width: 600px) {
            div {
                display: block;
                label {
                    justify-content: flex-start;
                    padding: 27px 22px;
                    height: auto;
                    width: 100%;
                }
                label:first-child {
                    margin-bottom: 2rem;
                }
            }
        }
        label {
            position: relative;
            width: 280px;
            height: 96px;
            border: 1px solid #D1E0E2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 400;
            line-height: 26px;
            color: #444444;
            input {
                margin-right: 16px;
            }
            p {
                display: grid;
                font-size: 16px;
                font-weight: 400;
                line-height: 26px;
                color: #444444;
                span {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 14px;
                    color: #6A6A6A;
                }
            }
        }
    }
    .note {
        p {
            color: #444;
            font-size: 16px;
            font-weight: 700;
        }
        span {
            color: #444;
            font-size: 16px;
            font-weight: 400;
        }
    }
`
const PaymentStepThreeBody = styled.div`
    width: 407px;
    padding: 20px;
    background: white;
    margin: 50px auto 15rem;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
    h4 {
        font-size: 24px;
        font-weight: 600;
        line-height: 31px;
        color: #121212;
        margin-bottom: 8px;
    }
    .sub {
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        color: #6F6F6F;
        margin-bottom: 40px;
        span {
            font-weight: 600;
        }
    }
    .label-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
            font-size: 16px;
            font-weight: 600;
            line-height: 21px;
            color: #898989;
            display: flex;
            align-items: center;
        }
        p {
            font-size: 18px;
            font-weight: 600;
            line-height: 18px;
            color: #121212;
        }
    }
    .divider {
        border-bottom: 1px solid #D9D9D9;
        margin: 20px 0;
    }
`
const PaymentContentFooter = styled.div`
    padding: 30px;
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-gap: 30px;
    border-top: 1px solid #B8C8CA;
    button {
        padding: 17px 40px;
        font-size: 18px;
        font-weight: 600;
        line-height: 20px;
        height: auto;
        weight: auto;
    }
`
const ShippingBox = styled.div`
    .ship-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 19px;
        h5 {
            font-size: 24px;
            font-weight: 600;
            line-height: 31px;
            color: #121212;
        }
        a {
            display: flex;
            font-size: 13px;
            font-weight: 600;
            line-height: 13px;
            color: #2A7575;
            padding: 8px 14px;
            border: 1px solid #2A7575;
            span {
                margin-left: 5px;
            }
        }
    }
    .address-list {
        padding: 16px;
        background: white;
        label {
            padding: 20px;
            color: #000;
            font-size: 18px;
            font-weight: 400;
            display: grid;
            grid-template-columns: 17px 24px auto;
            grid-gap: 15px;
        }
        .active {
            border-radius: 4px;
            background: rgba(201, 224, 224, 0.40);
        }
    }
`

const PayemntPage = () => {

    const router = useRouter()
    const [activeTab, setActiveTab] = useState(1)
    const [proceedType, setProceedType] = useState('deposit')
    const [boxSize, setBoxSize] = useState('large')
    const [address, setAddress] = useState(null)
    const [addressArr, setAddressArr] = useState([])
    const [auctionId, setAuctionId] = useState(null)
    const [auctionData, setAuctionData] = useState(null)
    const [orderDetails, setOrderDetails] = useState(null)
    const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
    const shippingAmount = 37
    const safetyBoxPrice = {
        large: 124,
        medium: 100
    }
    const [rapydData, setRapydData] = useState(null)

    const addressList = [
        { id: 1, type: 'home', address: 'Evan Williams, 100E Pasir Panjang Road, Level 3, S118521, Singapore.'},
        { id: 2, type: 'office', address: 'Sweans Technology, 2658 Thompson Street, 100E Pasir Panjang Road, Artesia, California, USA'},
        { id: 3, type: 'office', address: 'Swap Technology, 3710 Thompson Drive, Oakland, California, USA'}
    ]

    const calculateFinalAmount = () => {
        let final = Number(auctionData?.currentBidData?.bidAmount)
        final = (Number(auctionData?.currentBidData?.bidAmount)/10)/2 + final
        if(proceedType === 'ship') {
            final = final + shippingAmount
        } else {
            if(boxSize === 'large') {
                final = final + safetyBoxPrice?.[boxSize]
            } else {
                final = final + safetyBoxPrice?.[boxSize]
            }
        }
        return formatToUSD(final)
    }

    const onChange = (e) => {
        const { name, value, checked } = e?.target
        console.log('name, value, checked', name, value, checked)
        if(name === 'proceedType') setProceedType(value)
        if(name === 'boxSize') setBoxSize(value)
        if(name === 'address') setAddress(value)
    }

    const handleSubmit = () => {
        if(activeTab === 1) {
            setActiveTab(2)
        } else if(activeTab === 2) {
            // setActiveTab(3)
            getOrderSummary()
        } else {
            handlePayment()
        }
    }

    const handleCancel = () => {
        if(activeTab === 2) {
            setActiveTab(1)
        } else if(activeTab === 3) {
            setActiveTab(2)
        } else {
            router.back()
        }
    }

    const handlePayment = () => {
        let payload = {
            "delivery": proceedType === 'ship' ? true : false,
            "addressId": address,
            safetyBox: boxSize
        }
        if(proceedType === 'ship') {
            delete payload?.safetyBox
        } else {
            delete payload?.addressId
        }
        API.checkoutApi(auctionId, payload)
        .then(res => {
            console.log('res', res, res?.data?.data?.data?.id, res?.data?.data?.data?.redirect_url)
            if(res?.data?.data?.data?.id) {
                setRapydData(res?.data?.data?.data)
                router.push(res?.data?.data?.data?.redirect_url)
            }
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    const getUserAddress = () => {
        UserService.getAddress()
        .then(res => {
            console.log('getUserAddress', res)
            setAddressArr(res?.data?.data)
            if(res?.data?.data?.length) setAddress(res?.data?.data?.[0]?.id)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    const getOrderSummary = () => {
        let payload = {
            "delivery": proceedType === 'ship' ? true : false,
            "addressId": address,
            safetyBox: boxSize
        }
        if(proceedType === 'ship') {
            delete payload?.safetyBox
        } else {
            delete payload?.addressId
        }
        API.auctionOrderSummary(auctionId, payload)
        .then(res => {
            console.log('getOrderSummary', res, payload)
            if(res?.data?.data?.auctionId) {
                setOrderDetails(res?.data?.data)
                setActiveTab(3)
            }
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    const getDetailsById = (id) => {
        API.getAuctionById(id)
        .then(res => {
            console.log('res', res)
            if(res?.data?.data?.auction?.id) {
                let data = objectDeepClone(res?.data?.data?.auction)
                if(data?.status === 'paymentComplete' || data?.status === 'paymentVerified' || data?.status === 'settled') {
                    setTimeout(() => router.push('/auctions'), 2000)
                }
                let assetData = res?.data?.data?.auction?.assetEdition?.assetsData
                let obj = {
                    ...res?.data?.data?.auction,
                    mainImg: handleApiImage(assetData?.mainAssetUrl),
                    name: assetData?.name,
                    refName: assetData?.refName,
                    refNo: assetData?.refNo,
                }
                setAuctionData(obj)
            } else {
                Toast.error(res?.data?.message || 'Something went wrong try again later.')
                setTimeout(() => router.push('/auctions'), 2000)
            }
        })
        .catch(err => {
            console.log('err', err)
            Toast.error(err?.data?.message || 'Something went wrong try again later.')
            setTimeout(() => router.push('/auctions'), 2000)
        })
    }

    // useEffect(() => {
    //     if(activeTab === 3) getOrderSummary()
    // },[activeTab])

    useEffect(() => {
        if(router.query.id) {
            getDetailsById(router.query.id)
            setAuctionId(router.query.id)
            getUserAddress()
        }
        console.log('router.query', router.query)
      }, [router.query.id])

      useEffect(() => {
        if(profileData?.id && auctionData?.currentBidData?.userId) {
            if(Number(profileData?.id) !== Number(auctionData?.currentBidData?.userId)) {
                router.push('/auctions')
            }
        }
    }, [profileData, auctionData])

    return (
        <Wrapper>
            <Container>
                <GoBackWrapper onClick={() => router.back()}>
                    <Icon name="back-arrow" />
                    <a>Back</a>
                </GoBackWrapper>
                <h1>Make payment</h1>
                <PaymentContent>
                    <PaymentContentHeader>
                        <div className='nav-container'>
                            <a className={`${activeTab === 1 ? 'active' : ''}`}>
                                <span>1</span>
                                Review the product
                            </a>
                            <a className={`${activeTab === 2 ? 'active' : ''}`}>
                                <span>2</span>
                                Delivery address
                            </a>
                            <a className={`${activeTab === 3 ? 'active' : ''}`}>
                                <span>3</span>
                                Order Summary
                            </a>
                        </div>
                    </PaymentContentHeader>
                    <PaymentContentBody>
                        {activeTab === 1 
                        ? <PaymentStepOneBody>
                            <div>
                                {/* <Image src='/images/customer/dashboard/watch-3.png' width="346px" height='432px' /> */}
                                {auctionData?.mainImg ? <Image src={auctionData?.mainImg} width="346px" height='432px' /> : null}
                            </div>
                            <div>
                                <h4>{auctionData?.name}</h4>
                                <h5>{auctionData?.refNo}</h5>
                                <h6>{auctionData?.refName}</h6>
                                <div className='bid-won-date'>
                                    <span>Bid Won Date</span>
                                    {auctionData?.currentBidData?.updatedAt 
                                    ? <p>{moment(auctionData?.currentBidData?.updatedAt).format('DD/MM/YYYY')}</p>
                                    : null}
                                </div>
                                <div className='label-price'>
                                    <span>Your bid amount:</span>
                                    <p className='price'>{auctionData?.currentBidData?.bidAmount ? formatToUSD(auctionData?.currentBidData?.bidAmount) : null}</p>
                                </div>
                                <div className='label-price'>
                                    <span>Buyer's Premium &nbsp;<Image width={18} height={18} src={`/svgs/info-primary.svg`} /></span>
                                    <p className='price'>{auctionData?.currentBidData?.bidAmount ? formatToUSD((Number(auctionData?.currentBidData?.bidAmount)/10)/2) : null}</p>
                                </div>
                                <div className='label-price total'>
                                    <span>Total</span>
                                    <p className='price'>{auctionData?.currentBidData?.bidAmount ? formatToUSD(((Number(auctionData?.currentBidData?.bidAmount)/10)/2)+Number(auctionData?.currentBidData?.bidAmount)) : null}</p>
                                </div>
                            </div>
                        </PaymentStepOneBody>
                        : activeTab === 2 ? <PaymentStepTwoBody>
                            <div className='ship'>
                                <h4>How do you want to proceed?</h4>
                                <div>
                                    <label>
                                        <input type="radio" name="proceedType" value={`deposit`} checked={proceedType === 'deposit'} onChange={onChange} /> 
                                        Deposit asset with FG
                                    </label>
                                    <label>
                                    <input type="radio" name="proceedType" value={`ship`} checked={proceedType === 'ship'} onChange={onChange} /> 
                                        Ship to my address
                                    </label>
                                </div>
                                <a>How It’s Work ?</a>
                            </div>
                            {proceedType === 'deposit' 
                            ? <>
                                <div className='box-box'>
                                    <h5>Choose the  box size</h5>
                                    <div>
                                        <label>
                                            <a><Image width={18} height={18} src={`/svgs/info-primary.svg`} /></a>
                                            <input type="radio" name="boxSize" value={`large`} checked={boxSize === 'large'} onChange={onChange} /> 
                                            <p>
                                                Large
                                                <span>$124.00</span>
                                            </p>
                                        </label>
                                        <label>
                                            <a><Image width={18} height={18} src={`/svgs/info-primary.svg`} /></a>
                                            <input type="radio" name="boxSize" value={`medium`} checked={boxSize === 'medium'} onChange={onChange} /> 
                                            <p>
                                                Medium
                                                <span>$100.00</span>
                                            </p>
                                        </label>
                                    </div>
                                </div>
                                <div className='note'>
                                    <p>Note:</p>
                                    <span>Once deposited in your vault you will get the mail confirmation</span>
                                </div>
                            </>
                            : <ShippingBox>
                                <div className='ship-header'>
                                    <h5>Select a delivery address</h5>
                                    <Link href={'/base/myProfile'}>
                                        <a>
                                            <Image width={12} height={12} src={`/svgs/edit-2.svg`} />
                                            <span>Manage Address</span>
                                        </a>
                                    </Link>
                                </div>
                                <div className='address-list'>
                                    {/* {addressList.map(el => {
                                        return (
                                            <label className={`${Number(address) === Number(el?.id) ? 'active' : ''}`}>
                                                <input type="radio" name="address" value={el?.id} checked={Number(address) === Number(el?.id)} onChange={onChange} /> 
                                                <Image width={12} height={12} src={el?.type === 'home' ? '/svgs/house.svg' : '/svgs/office.svg'} />
                                                <p>{el?.address}</p>
                                            </label>
                                        )
                                    })} */}
                                    {addressArr?.length 
                                    ? addressArr.map(el => {
                                        return (
                                            <label className={`${Number(address) === Number(el?.id) ? 'active' : ''}`}>
                                                <input type="radio" name="address" value={el?.id} checked={Number(address) === Number(el?.id)} onChange={onChange} /> 
                                                <Image width={12} height={12} src={el?.addressType === 'PRIMARY_RESIDENTIAL' ? '/svgs/house.svg' : '/svgs/office.svg'} />
                                                <p>{el?.buildingName+ ' '+el?.addressLine2}</p>
                                            </label>
                                        )
                                    })
                                    : 'No Address Found'}
                                </div>
                            </ShippingBox>}
                        </PaymentStepTwoBody>
                        : <PaymentStepThreeBody>
                            <h4>Order Summary</h4>
                            <p className='sub'><span>Note:</span> All numbers are shown in USD</p>
                            <div className='label-price'>
                                <span>{auctionData?.name}</span>
                                <p>{formatToUSD(auctionData?.currentBidData?.bidAmount, 2)}</p>
                            </div>
                            <div className='label-price'>
                                <span>{proceedType === 'ship' ? 'Estimated Shipping' : `Safety Boxes (${boxSize})`}</span>
                                {/* <p>{proceedType === 'ship' ? formatToUSD(shippingAmount) : boxSize === 'large' ? safetyBoxPrice?.[boxSize] : safetyBoxPrice?.[boxSize]}</p> */}
                                <p>{orderDetails?.paymentSplit?.length ? formatToUSD(orderDetails?.paymentSplit?.[2]?.amount, 2) : null}</p>
                            </div>
                            <div className='label-price'>
                                <span>Buyer's Premium</span>
                                {/* <p>{auctionData?.currentBidData?.bidAmount ? formatToUSD((Number(auctionData?.currentBidData?.bidAmount)/10)/2) : null}</p> */}
                                <p>{orderDetails?.paymentSplit?.length ? formatToUSD(orderDetails?.paymentSplit?.[1]?.amount, 2) : null}</p>
                            </div>
                            <div className='divider'></div>
                            <div className='label-price'>
                                <span>Total</span>
                                <p>{formatToUSD(orderDetails?.total, 2)}</p>
                            </div>
                        </PaymentStepThreeBody>}
                    </PaymentContentBody>
                    <PaymentContentFooter>
                        <ButtonPrimaryOutline onClick={handleCancel}>{activeTab === 1 ? 'Cancel' : 'Back'}</ButtonPrimaryOutline>
                        <ButtonPrimary onClick={handleSubmit}>Continue</ButtonPrimary>
                    </PaymentContentFooter>
                </PaymentContent>
            </Container>
        </Wrapper>
    )
}

export default PayemntPage