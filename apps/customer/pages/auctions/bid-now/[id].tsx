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
import { acceptOnlyNumbers, formatToUSD, handleApiImage, objectDeepClone, prependZero } from '@apps/customer/utils/helper'
import moment from 'moment'
import { ModalService } from '@nft-marketplace/modal'
import LockAmountModal from '@apps/customer/components/FormModal/lockAmountModal'
import ConfirmBidModal from '@apps/customer/modules/auctions/confirmBidModal'
import useAuctionSocket from '@apps/customer/modules/auctions/useAuctionSocket'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12rem 0;
    @media screen and (max-width: 768px) {
        padding: 7.5rem 0 15.4rem;
    }
    h1 {
        color: #1D1D1D;
        font-size: 32px;
        font-weight: 400;
        line-height: 104%;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 580px) {
        .container {
            max-width: 100%;
            padding: 0;
        }
    }
`
const BidNowWrapper = styled.div`
    display: grid;
    margin: 33px 0;
    grid-template-columns: 711px auto;
    grid-gap: 77px;
    @media screen and (max-width: 1400px) {
        grid-template-columns: 550px auto;
        grid-gap: 40px;
    }
    @media screen and (max-width: 1200px) {
        grid-template-columns: auto;
        grid-gap: 40px;
    }
    @media screen and (max-width: 580px) {
        margin: 13px 0;
        grid-gap: 20px;
    }
`
const BidNowRHSContent = styled.div`
    label {
        font-size: 16px;
        font-weight: 400;
        line-height: 21px; 
        color: #8A8A8A;
        margin-right: 5px;
    }
    .paddle-no {
        font-size: 1.8rem;
        line-height: 2.5rem;
    }
    .price-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-bottom: 51px;
        max-width: 100%;
        .d-flex-aic {
            margin-bottom: 10px;
        }
        h4 {
            // font-size: 34px;
            // font-weight: 400;
            // line-height: 34px;
            // color: #121212;
            font-size: 24px;
            font-weight: 600;
            line-height: 28px;
            color: #121212;
        }
    }
    .nav-links {
        margin-top: 10px;
        border-bottom: 1px solid #DCDCDC;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
            color: #121212;
            font-size: 18px;
            font-weight: 400;
            padding: 8px 25px;
            cursor: pointer;
            &.active {
                font-weight: 600;
                border-bottom: 4px solid #2A7575;
                display: inline-block;
            }
        }
    }
    @media screen and (max-width: 780px) {
        padding: 33px;
    }
    @media screen and (max-width: 580px) {
        padding: 2.4rem;
        label {
            font-size: 14px;
            line-height: normal;
        }
        .price-container {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 32px;
            h4 {
                font-size: 24px;
            }
        }
        .bid-label {
            font-size: 16px;
            line-height: 20px;
        }
        .nav-links {
            a {
                padding: 8px 40px;
            }
        }
    }
`

const TabContent = styled.div`
    padding: 25px 0;
    .max-bid-content {
        .place-bid-container {
            margin-bottom: 51px;
            .info {
                font-style: italic;
                font-size: 15px;
                margin-top: 7px;
            }
            .bid-hyperlinks {
                margin-top: 20px;
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
                a {
                    font-size: 14px;
                    text-decoration: underline;
                    color: #0e1818;
                    &:hover {
                        color: blue;
                    }
                }
            }
            .place-bid-input {
                display: flex;
                align-items: center;
                width: 100%;
                border: 1px solid #2A7575;
                input {
                    color: #121212;
                    font-size: 24px;
                    font-weight: 400;
                    padding: 14px 18px;
                    width: 100%;
                    border: none;
                    &:focus-visible {
                        outline: none;
                    }
                }
                button {
                    padding: 17px 40px;
                    line-height: 24px;
                    white-space: nowrap;
                }
            }
        }
    }
    .max-bid-value-container {
        padding: 26px 24px;
        border: 1px solid #2A7575;
        border-top: none;
        text-align: center;
        div {
            gap: 10px 6px;
            display: grid;
            grid-template-columns: auto auto auto auto auto;
        }
        a.tic-tac {
            border-radius: 26px;
            border: 1px solid #D4DFDF;
            background: #F9FCFC;
            color: #121212;
            font-size: 18px;
            font-weight: 400;
            padding: 6px 28px;
            display: inline-block;
            cursor: pointer;
            &.active {
                background: #2A7575;
                color: white;
            }
        }
        a.load-more {
            font-size: 16px;
            font-weight: 700;
            line-height: 16px;
            color: #2A7575;
            margin-top: 30px;
            display: block;
            cursor: pointer;
        }
    }
    .bids-table {
        label {
            display: block;
            margin-bottom: 16px;
        }
        .tr {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 18px 0 16px;
            border-top: 1px solid #E7E5E5;
            p {
                color: #000;
                font-size: 18px;
                font-weight: 400;
                line-height: 160%;
                &.price {
                    font-weight: 700;
                }
                &:nth-child(1) {
                    text-align: left;
                }
                &:nth-child(2) {
                    text-align: center;
                }
                &:nth-child(3) {
                    text-align: right;
                }
                span {
                    color: #000;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 4px 10px;
                    border-radius: 12px;
                    background: #D1E0E2;
                }
            }
        }
    }
    @media screen and (max-width: 580px) {
        .max-bid-content .place-bid-container {
            margin-bottom: 24px;
            .place-bid-input input {
                font-size: 20px;
            }
            .place-bid-input button {
                font-size: 16px;
                font-weight: 700;
                line-height: 20px; 
            }
        }
        .max-bid-value-container {
            padding: 24px 15px;
            div {
                gap: 8px 5px;
                display: grid;
                grid-template-columns: auto auto auto;
            }
            a.load-more {
                margin-top: 15px;
            }
        }
        .bids-table {
            label {
                font-size: 16px;
            }
            .tr p {
                font-size: 14px;
                span {
                    font-weight: 500;
                }
            }
        }
    }
`
const PlaceBidSelect = styled.div`
    .react-select__control {
        width: 100%;
        .react-select__indicator-separator {
          display: none;
        }
        .react-select__single-value, .react-select__placeholder{
            color: #121212;
            font-size: 20px;
            font-weight: 400;
            line-height: 101%;
            text-transform: capitalize;
            padding: 12px 10px;
        }
        .react-select__indicator {
            margin-right: 10px;
        }
    }
    .react-select__option {
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.25px;     
        color: #21393A;    
    }
    button { 
        margin-top: 30px;
        white-space: nowrap;
        width: 100%;
    }
`
const AuctionContent = styled.div`
    color: #FFF;
    position: relative;
    height: fit-content;
    &:before {
        content: "";
        display: none;
        position: absolute;
        background: url("/images/customer/auctions/bid-now-clean.png") no-repeat center center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .auction-bg {
        min-height: 600px;
    }
    @media screen and (max-width: 1200px) {
        text-align: center;
    }
    .auction-img {
        position: absolute;
        z-index: 2;
        width: 300px;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .phase {
        position: absolute;
        color: #FFF;
        z-index: 2;
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: 3.57px;
        text-transform: uppercase;
        top: 8%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .timer {
        position: absolute;
        z-index: 2;
        top: 19%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        label {
            font-size: 16px;
            font-weight: 400;
            line-height: 23px;
            display: block;
        }
        span {
            font-size: 53px;
            font-weight: 400;
            line-height: normal;
        }
    }
    .text-content {
        position: absolute;
        z-index: 2;
        text-align: center;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        h3 {
            font-size: 28.24px;
            font-weight: 400;
        }
        p {
            font-size: 28.24px;
            font-weight: 400;
            line-height: 140%;
        }
        h4 {
            font-size: 37.004px;
            font-weight: 700;
            line-height: 140%;
        }
    }
    @media screen and (max-width: 580px) {
        min-height: 620px;
        &:before {
            display: block;
        }
        .phase {
            font-size: 12px;
        }
        .timer {
            label {
                font-size: 12px;
                line-height: normal;             
            }
            span {
                font-size: 40px;                
            }
        }
        .text-content {
            top: 88%;
            h3 {
                font-size: 20px;
            }
            p {
                font-size: 20px;
            }
            h4 {
                font-size: 24px;
            }
        }
        .auction-img {
            top: 53%;
        }
    }
`

const BidNowPage = () => {

    const router = useRouter()
    const auctionId = router.query?.id
    let { wsBidHistory, wsAuctionDetails }: any = useAuctionSocket(auctionId)
    const [tab, setTab] = useState(1)
    const [bid, setBid] = useState(null)
    const [assetId, setAssetId] = useState(null)
    const [mainImg, setMainImg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userBid, setUserBid] = useState(0)
    const [currentBid, setCurrentBid] = useState(null)
    const [dynamicPhase, setDynamicPhase] = useState(false)
    const [timer, setTimer] = useState({ days: '', hours: '', minutes: '', seconds: '' })
    const [maxBidValues, setMaxBidValues] = useState([])
    const [auctionDetails, setAuctionDetails] = useState<any>(null)
    const [bidHistory, setBidHistory] = useState([])
    const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
    const [auctionRegData, setAuctionRegData] = useState(null)

    const bids = ['1200', '1300', '1400', '1500', '1600', '1200', '1300', '1400', '1500', '1600']
    const bidTable = [
        { id: 1, time: '1:30 PM', bid: '$1100'},
        { id: 2, time: '2:40 PM', bid: '$1300'},
        { id: 3, time: '2:45 PM', bid: '$1400'},
        { id: 4, time: '2:20 PM', bid: '$1600', user: true},
        { id: 5, time: '5:30 PM', bid: '$1800'}
    ]

    const handleChange = (e) => {
        const { name, value } = e?.target
        setBid(Number(acceptOnlyNumbers(value)))
    }

    const onBidSelect = (e) => {
        setBid(e)
    }

    const calculateRemainingTime = (endtime) => {
        const total = Date.parse(endtime) - Date.parse(new Date().toString());
        const seconds = prependZero(Math.floor((total / 1000) % 60).toString());
        const minutes = prependZero(Math.floor((total / 1000 / 60) % 60).toString());
        const hours = prependZero(Math.floor((total / (1000 * 60 * 60)) % 24).toString());
        const days = prependZero(Math.floor(total / (1000 * 60 * 60 * 24)).toString());
        // console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s")
        setTimer({ days, hours, minutes, seconds })
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    }

    const showLockAmountModal = () =>
        ModalService.open((modalProps: any) => <LockAmountModal close={modalProps.close} />
    )

    const getDetailsById = async () => {
        await API.getAuctionById(auctionId)
        .then(res => {
          if (res.status == 200 && res?.data?.data?.auction) {
            let auctionDetails = objectDeepClone(res?.data?.data?.auction)
            // console.log('asdasdasdasdasdasd', auctionDetails)
            let assetDetails = objectDeepClone(auctionDetails?.assetEdition?.assetsData)
            let bidAmount = auctionDetails?.currentBidData?.bidAmount 
                ? Number(auctionDetails?.currentBidData?.bidAmount) 
                : auctionDetails?.bidAmount 
                    ? Number(auctionDetails?.bidAmount) 
                    : assetDetails?.primarySalePrice 
                        ? Number(assetDetails?.primarySalePrice) 
                        : null 
            setCurrentBid(bidAmount)
            setAssetId(auctionDetails?.assetEdition?.assetId)
            setAuctionDetails({
              id: auctionDetails?.id,
              name: assetDetails?.name,
              refNo: assetDetails?.refNo,
              refName: assetDetails?.refName,
              mainImg: handleApiImage(assetDetails?.mainAssetUrl),
              minPrice: Number(auctionDetails?.minPrice), // reverse price
              maxPrice: Number(auctionDetails?.maxPrice),
              bidAmount: Number(auctionDetails?.bidAmount),
              endTime: auctionDetails?.endTime,
              phase: auctionDetails?.phase,
              upperLimit: Number(auctionDetails?.currentBidData?.upperLimit),
              upperLimitUserId: auctionDetails?.currentBidData?.userId
            })
        } else {
            Toast.error(res?.error?.error?.message || 'Something went wrong. Please try again later')
            setTimeout(() => { router.push(`/auctions/${auctionId}`) }, 3000)
          }
        })
    }

    const getAuctionReg = () => {
        API.getAuctionRegistration(auctionId)
        .then(res => {
          setAuctionRegData(res?.data?.data)
        //   console.log('res getAuctionReg', res)
        })
        .catch(err => {
          console.log('err', err)
        })
    }

    const closeConfirmModal = (close, val) => {
        close()
        if(val) confirmBid()
    }

    const openConfirmBidModal = () => {
        ModalService.open((modalProps: any) =>
            <ConfirmBidModal bid={bid?.value} close={(val) => closeConfirmModal(modalProps.close, val)} />,
            { closeIcon: false }
        )
    }

    const resetData = () => {
        // getAuctionBidHistory()
        setBid(null)
        // getDetailsById()
        // getMaxBidValues()
        setLoading(false)
    }

    const confirmBid = () => {
        let payload = {
            bidAmount: bid?.value
        }
        setLoading(true)
        // console.log('payload', payload)
        API.submitBid(auctionId, payload)
        .then(res => {
            if(res?.status == 200) {
                Toast.success('Successfully placed bid')
                setTimeout(() => { 
                    // router.push(`/auctions/${auctionId}`) 
                    resetData()
                }, 3000)
            } else {
                Toast.error(res?.error?.error?.message || 'Something went wrong. Please try again later')
                setLoading(false)
            }
            // console.log('submitBid res', res)
        })
        .catch(err => {
            console.log('err', err)
            setLoading(false)
            Toast.error(err.error?.message || 'Something went wrong. Please try again later')
        })
    }

    const handleSubmit = (e) => {
        if(!bid?.value) {
            Toast.info('Add bid amount before proceeding')
            return
        }
        openConfirmBidModal()   
    }

    const getMaxBidValues = (val = 50) => {
        let payload = {
            input: currentBid, stepCount: val
        }
        API.bidsGenerator(payload)
        .then(res => {
            if(res?.status === 200 && res?.data?.data?.steps?.length) {
                let arr = [] 
                res?.data?.data?.steps.forEach(el => {
                    arr.push({ value: el, label: el })
                })
                setMaxBidValues(arr)
            }
            // console.log('getMaxBidValues', res)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    const getAuctionBidHistory = () => {
        API.getBidHistory(auctionId)
        .then(res => {
            if(res?.status === 200 && res?.data?.data?.bidHistory?.length) {
                let data = objectDeepClone(res?.data?.data?.bidHistory)
                setBidHistory(data)
            }
            // console.log('getAuctionBidHistory', res)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    useEffect(() => {
        setBid(null)
        if(wsAuctionDetails?.bidIncrements) setMaxBidValues(wsAuctionDetails?.bidIncrements)
        if(wsAuctionDetails?.phase === 2) setDynamicPhase(true)
        if(wsAuctionDetails?.currentBidData?.bidAmount || wsAuctionDetails?.bidAmount) {
            setCurrentBid(Number(wsAuctionDetails?.currentBidData?.bidAmount || wsAuctionDetails?.bidAmount))
        }
        // console.log('wsAuctionDetails', wsAuctionDetails)
        let intervalId = setInterval(() => { calculateRemainingTime(wsAuctionDetails?.endTime) }, 1000)
        return (() => {
          clearInterval(intervalId)
        })
    },[wsAuctionDetails])

    
    useEffect(() => {
        if(wsBidHistory?.rows?.length) {
            setBidHistory(wsBidHistory?.rows)
            setUserBid(wsBidHistory?.rows?.length)
        }
        // console.log('wsBidHistory', wsBidHistory)
    }, [wsBidHistory])

    useEffect(() => {
        if(auctionId) {
            getDetailsById()
            getAuctionReg()
            // getAuctionBidHistory()
        }
    }, [auctionId])

    // useEffect(() => {
    //     if(profileData?.id && bidHistory?.length) {
    //         let val = 0
    //         bidHistory.forEach(el => {
    //             if(el?.userId === profileData?.id) val = val+1
    //         })
    //         setUserBid(val)
    //     }
    // }, [profileData?.id, bidHistory])

    // useEffect(() => {
    //     let intervalId = setInterval(() => { calculateRemainingTime(auctionDetails?.endTime) }, 1000)
    //     return (() => {
    //       clearInterval(intervalId)
    //     })
    // }, [auctionDetails])

    // useEffect(() => {
    //     // console.log('auctionDetails?.phase', auctionDetails?.phase)
    //     if(auctionDetails?.phase === 2) {
    //         setDynamicPhase(true)
    //         // setTab(1)
    //     }
    // },[auctionDetails?.phase])

    // useEffect(() => {
    //     if(currentBid) getMaxBidValues()
    // }, [currentBid])

    // console.log('timer', timer, bid)

    useEffect(() => {
        if(Number(timer?.minutes) <= -1 && Number(timer?.seconds) <= -1) {
            router.push(`/auctions/${auctionId}`)
        }
    }, [timer?.seconds, timer?.minutes])

    return (
        <Wrapper>
            <Container className='container'>
                <BidNowWrapper>
                    {/* auction content with static image */}
                    <AuctionContent>
                        <p className='phase'>{dynamicPhase ? 'Dynamic' : 'Regular'} phase</p>
                        <div className='timer'>
                            {timer?.minutes || timer?.seconds || timer?.hours 
                            ? <>
                                <label>Auction ends in</label>
                                <span>
                                    {dynamicPhase 
                                        ? null 
                                        : <>
                                            {Number(timer?.days) ? `${timer?.days}:` : null}
                                            {Number(timer?.hours) || Number(timer?.days) ? `${timer?.hours}:`: null}
                                        </>}
                                    {timer?.minutes === "NaN" ? '' : timer?.minutes+':'}
                                    {timer?.seconds === "NaN" ? '' : timer?.seconds}
                                </span>
                            </>
                            : null}
                        </div>
                        <div className='auction-img'>
                            <Image src={auctionDetails?.mainImg || ''} width={300} height={300} />
                        </div>
                        <div className='auction-bg'>
                            <Image src={`/images/customer/auctions/bid-now-clean.png`} objectFit='cover' width="712px" height="841px" />
                        </div>
                        <div className='text-content'>
                            <h3>{auctionDetails?.name || ''}</h3>
                            <p>{auctionDetails?.refNo || ''}</p>
                            <h4>{auctionDetails?.refName || ''}</h4>
                        </div>
                    </AuctionContent>
                    {/* auction content with dynamic image */}
                    {/* <AuctionContent>
                        <div className='timer'>
                            <label>Auction ends in</label>
                            <span>{timer?.days}:{timer?.hours}:{timer?.minutes}:{timer?.seconds}</span>
                        </div>
                        <Image src={`/images/customer/auctions/bid-now-ai.png`} width="712px" height="841px" />
                        <div className='text-content'>
                            <h3>{auctionDetails?.name || ''}</h3>
                            <p>{auctionDetails?.refNo || ''}</p>
                            <h4>{auctionDetails?.refName || ''}</h4>
                        </div>
                    </AuctionContent> */}
                    <BidNowRHSContent>
                        <div className='price-container'>
                            <div>
                                <div className='d-flex-aic'>
                                    <label>Estimate Price</label>
                                    <Image src="/svgs/info-primary.svg" width="15" height="15" />
                                </div>
                                <h4>{formatToUSD(auctionDetails?.minPrice)} - {formatToUSD(auctionDetails?.maxPrice)}</h4>
                            </div>
                            <div>
                                <div className='d-flex-aic'>
                                    <label>{!wsAuctionDetails?.currentBidData?.bidAmount ? 'Starting' : 'Current Highest'} Bid</label>
                                    <Image src="/svgs/info-primary.svg" width="15" height="15" />
                                </div>
                                <h4>{formatToUSD(currentBid)}</h4>
                            </div>
                            {wsAuctionDetails?.currentBidData?.userId === profileData?.id && wsAuctionDetails?.currentBidData?.upperLimit 
                                // || auctionDetails?.upperLimit && auctionDetails?.upperLimitUserId === profileData?.id
                            ? <div>
                                <div className='d-flex-aic'>
                                    <label>Max Highest Bid</label>
                                    <Image src="/svgs/info-primary.svg" width="15" height="15" />
                                </div>
                                <h4>{formatToUSD(wsAuctionDetails?.currentBidData?.upperLimit || auctionDetails?.upperLimit)}</h4>
                            </div>
                            : null}
                        </div>
                        <div>
                            <label className='bid-label'>Bid Amount</label>
                            <div className='nav-links'>
                                <div>
                                    <a className={`active`}>Bid</a>
                                </div>
                                <span className='paddle-no'>#PaddleNumber-{auctionRegData?.id}</span>
                                {/* <a className={tab == 1 ? 'active' : ''} onClick={() => setTab(1)}>Bid</a>
                                {dynamicPhase ? null :  <a className={tab == 2 ? 'active' : ''} onClick={() => setTab(2)}>Max bid</a>} */}
                            </div>
                            <TabContent>
                                <div className='max-bid-content'>
                                    <div className='place-bid-container'>
                                        <PlaceBidSelect>
                                            <Select
                                                placeholder="Select Bid"
                                                classNamePrefix="react-select"
                                                options={maxBidValues}
                                                defaultValue={bid}
                                                value={bid}
                                                onChange={onBidSelect}
                                                isSearchable={false}
                                            />
                                            <ButtonPrimary disabled={loading} onClick={(e) => handleSubmit(e)}>Place a bid</ButtonPrimary>
                                        </PlaceBidSelect>
                                        <p className='info'>Bids will be entered on your behalf by the System for this lot up to your selected maximum bid.</p>
                                        <div className='bid-hyperlinks'>
                                            <a href={`/files/fg-bidding-table.pdf`} target="_blank">
                                                Bidding Table
                                            </a>
                                            <a href={`/files/fg-how-bidding-works.pdf`} target="_blank">
                                                How Bidding Works
                                            </a>
                                        </div>
                                        {/* <div className='place-bid-input'>
                                            <input type="text" value={bid} disabled={tab == 2} onChange={(e) => tab == 1 ? handleChange(e) : {}} />
                                            <ButtonPrimary disabled={loading} onClick={(e) => handleSubmit(e)}>Place a bid</ButtonPrimary>
                                        </div> */}
                                        {/* {tab === 2 && !dynamicPhase && maxBidValues?.length 
                                        ? <div className='max-bid-value-container'>
                                            <div>
                                                {maxBidValues.map(el => <a key={el} className={`tic-tac ${bid === el ? 'active' : ''}`} onClick={() => setBid(el)}>$ {el}</a>)}   
                                            </div>
                                            {maxBidValues?.length === 20 ? null : <a className='load-more' onClick={() => getMaxBidValues(20)}>Load More</a>}
                                        </div>
                                        : null} */}
                                        
                                    </div>
                                    <div className='bids-table'>
                                        <label>My Bids ({userBid} Bids)</label>
                                        <div>
                                            {/* {bidHistory?.length 
                                            ? bidHistory.map(el => {
                                                if(el?.userId !== profileData?.id) return null
                                                return(
                                                    <div className='tr' key={el?.id}>
                                                         <p>#{el?.id}</p>
                                                        <p>{moment(el?.createdAt).format('DD MMM YYYY - H:mm A')}</p>
                                                        <p className='price'>{Number(el?.bidAmount) === currentBid ? <span>My Bid</span> : null} {formatToUSD(el?.bidAmount)}</p>
                                                    </div>
                                                )
                                            })
                                            : <p className='no-data'>No bid history found.</p>} */}
                                            {bidHistory?.length 
                                            ? bidHistory.map((el, index) => {
                                                let count = wsBidHistory?.count - index
                                                return(
                                                    <div className='tr' key={el?.index}>
                                                        {/* {el?.userId === profileData?.id ? <span>You</span> : null}</p> */}
                                                         <p>#{count}</p>
                                                        <p>{moment(el?.createdAt).format('DD MMM YYYY - H:mm A')}</p>
                                                        <p className='price'>{Number(el?.bidAmount) === currentBid ? <span>My Bid</span> : null} {formatToUSD(el?.bidAmount)}</p>
                                                    </div>
                                                )
                                            })
                                            : <p className='no-data'>No bid history found.</p>}
                                        </div>
                                    </div>
                                </div>
                            </TabContent>
                        </div>
                    </BidNowRHSContent>
                </BidNowWrapper>
            </Container>
        </Wrapper>
    )
}

export default BidNowPage