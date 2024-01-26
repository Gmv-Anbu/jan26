import { ButtonPrimary, ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { Container } from '@apps/customer/styles/CommonStyles'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

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
        grid-template-columns: auto auto;
        grid-gap: 120px;
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
        }
    }
`
const PaymentContentBody = styled.div`
    max-width: 986px;
    margin: auto;
`
const PaymentStepOneBody = styled.div`
    display: grid;
    padding: 55px 0;
    grid-template-columns: 346px 520px;
    grid-gap: 120px;
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
    }
    .ship, .box-box {
        div {
            display: flex;
            gap: 34px;
        }
        label {
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

    const [activeTab, setActiveTab] = useState(1)
    const [proceedType, setProceedType] = useState('deposit')
    const [boxSize, setBoxSize] = useState('large')
    const [address, setAddress] = useState(1)

    const addressList = [
        { id: 1, type: 'home', address: 'Evan Williams, 100E Pasir Panjang Road, Level 3, S118521, Singapore.'},
        { id: 2, type: 'office', address: 'Sweans Technology, 2658 Thompson Street, 100E Pasir Panjang Road, Artesia, California, USA'},
        { id: 3, type: 'office', address: 'Swap Technology, 3710 Thompson Drive, Oakland, California, USA'}
    ]

    const onChange = (e) => {
        const { name, value, checked } = e?.target
        console.log('name, value, checked', name, value, checked)
        if(name === 'proceedType') setProceedType(value)
        if(name === 'boxSize') setBoxSize(value)
        if(name === 'address') setAddress(value)
    }

    return (
        <Wrapper>
            <Container>
                <GoBackWrapper>
                    <Icon name="back-arrow" />
                    <a>Live Auctions</a>
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
                        </div>
                    </PaymentContentHeader>
                    <PaymentContentBody>
                        {activeTab === 1 
                        ? <PaymentStepOneBody>
                            <div>
                                <Image src='/images/customer/dashboard/watch-3.png' width="346px" height='432px' />
                            </div>
                            <div>
                                <h4>Patek Philippe</h4>
                                <h5>REF. 3418A</h5>
                                <h6>“AMERICAN” CALENDAR</h6>
                                <div className='bid-won-date'>
                                    <span>Bid Won Date</span>
                                    <p>28/12/2022</p>
                                </div>
                                <div className='label-price'>
                                    <span>Your bid amount:</span>
                                    <p className='price'>$40000</p>
                                </div>
                                <div className='label-price'>
                                    <span>Buyer's Premium</span>
                                    <p className='price'>$10400</p>
                                </div>
                                <div className='label-price total'>
                                    <span>Total</span>
                                    <p className='price'>$50400</p>
                                </div>
                            </div>
                        </PaymentStepOneBody>
                        : <PaymentStepTwoBody>
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
                                            <input type="radio" name="boxSize" value={`large`} checked={boxSize === 'large'} onChange={onChange} /> 
                                            <p>
                                                Large
                                                <span>$124.00</span>
                                            </p>
                                        </label>
                                        <label>
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
                                    <a>
                                        <Image width={12} height={12} src={`/svgs/edit-2.svg`} />
                                        <span>Manage Address</span>
                                    </a>
                                </div>
                                <div className='address-list'>
                                    {addressList.map(el => {
                                        return (
                                            <label className={`${Number(address) === Number(el?.id) ? 'active' : ''}`}>
                                                <input type="radio" name="address" value={el?.id} checked={Number(address) === Number(el?.id)} onChange={onChange} /> 
                                                <Image width={12} height={12} src={el?.type === 'home' ? '/svgs/house.svg' : '/svgs/office.svg'} />
                                                <p>{el?.address}</p>
                                            </label>
                                        )
                                    })}
                                </div>
                            </ShippingBox>}
                        </PaymentStepTwoBody>}
                    </PaymentContentBody>
                    <PaymentContentFooter>
                        <ButtonPrimaryOutline>Cancel</ButtonPrimaryOutline>
                        <ButtonPrimary>Continue</ButtonPrimary>
                    </PaymentContentFooter>
                </PaymentContent>
            </Container>
        </Wrapper>
    )
}

export default PayemntPage