import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '@apps/customer/styles/CommonStyles'
import Pagination from '@apps/customer/components/pagination/pagination'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader'
import NotFound from '@apps/customer/components/NotFound'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'
import { formatToUSD, handleApiImage, objectDeepClone } from '@apps/customer/utils/helper'
import API from '@apps/customer/api/customer/index'
import MyAuctionCard from '@apps/customer/modules/auctions/myAuctionCards'
import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import { getCookie, setCookie } from '@nft-marketplace/js-cookie'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import InputCheckbox from '@apps/customer/modules/shared/components/formInputs/inputCheckbox'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import UserService from '@apps/customer/api/customer/UserService'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import Link from 'next/link'
import Icon from '@apps/customer/modules/shared/components/icon/icon'

const MyCartWrapper = styled.div`
  .loader-section{
    position:fixed;
    left:0px;
    top:0px;
    width:100vw;
    height:100vh;
    z-index:100;
    display:flex;
    align-items:center;
    justify-content:center;
    background: #0000006e;
  }
  display: flex;
  flex-direction: column;
  padding: 0 0 21 rem;
  @media screen and (max-width: 768px) {
    padding: 7.5rem 0 15.4rem;
  }
`
const PageBanner = styled.div`
    display:flex;
    align-items:center;
    background-color: #0E1818;
    position: relative;
    text-align: center;
    padding: 21rem 0 10rem;
    justify-content: center;
    min-height: 250px;
    background-image: url('/images/customer/Banner/bg-img.webp');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
`
const MyCartGrid = styled.div`
    display: grid;
    grid-template-columns: 1012px 388px;
    grid-gap: 40px;
    margin: 60px 0;
    input:hover, a {
        cursor: pointer;
    }
    @media screen and (max-width: 1450px) {
        grid-template-columns: 800px 388px;
    }
    @media screen and (max-width: 1200px) {
        grid-template-columns: auto;
    }
`
const MyCartLHSSection = styled.div`

`
const MyCartRHSSection = styled.div`

`
const AddressCard = styled.div`
    padding: 24px;
    background: #F4F9F9;
    margin-bottom: 40px;
    border: 1px solid #D1E0E2;
    h4 {
        color: #1D1D1D;
        font-size: 22px;
        font-weight: 400;
        line-height: 120%; /* 26.4px */
        text-transform: uppercase;
    }
    a {
        padding: 4px 10px;
        border: 1px solid #2A7575;
        background: white;
        color: #2A7575;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.13px;
    }
    .icon-text {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 24px auto;
        grid-gap: 14px;
        align-items: flex-start;
        p {
            color: #7C7C7C;
            font-size: 16px;
            font-weight: 400;
            line-height: 140%; /* 22.4px */
        }
        strong {
            color: #444;
            font-weight: 600;
        }
        span {
            display: block;
            margin-top: 11px;
        }
    }
`
const CheckoutCard = styled.div`
    padding: 29px 24px;
    background: #F4F9F9;
    margin-bottom: 40px;
    border: 1px solid #D1E0E2;
    .title-price {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
        align-items: center;
        span {
            color: #444;
            font-size: 16px;
            font-weight: 600;
            text-transform: capitalize;
        }
        p {
            color: #7C7C7C;
            font-size: 16px;
            font-weight: 600;
            line-height: 160%; /* 25.6px */
        }
    }
    .total {
        span {
            color: #444444;
            font-size: 18px;
            line-height: 18px;
        }
        p {
            font-size: 20px;
            font-weight: 600;
            line-height: 32px;
            color: #000000;
        }
    }
    .divider {
        border-bottom: 1px solid #D9D9D9;
        margin-bottom: 24px;
    }
    .info {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;  
        color: #444444;      
    }
    button {
        margin-top: 20px;
        width: 100%;
    }
`

const MultiSelect = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F4F9F9;
    box-shadow: 0px 1px 0px 0px #E0EDED;
    padding: 10px 14px;
    margin-bottom: 14px;
    .text-input-wrapper {
        margin: 0;
    }
    .lhs {
        display: flex;
        .d-flex-aic {
            font-size: 14px;
            font-weight: 400;
            line-height: 25px;
            color: #4E4E4E;
        }
    }
    .divider {
        margin: 0 24px;
        border-right: 1px solid #D9D9D9;
    }
    @media screen and (max-width: 600px) {
        display: block;
        .lhs {
            margin-top: 20px;
        }
        .divider {
            margin: 0 10px;
        }
    }
`

const CardContainer = styled.div`

`
const Card = styled.div`
    display: grid;
    border: 1px solid #D1E0E2;
    position: relative;
    padding: 30px 35px;
    grid-template-columns: 181px auto;
    grid-gap: 50px;
    .select {
        position: absolute;
        left: 1rem;
        top: 1rem;
        input {
            width: 2rem;
            height: 2rem;
        }
    }
    .actions {
        display: flex;
        gap: 34px;
        position: absolute;
        right: 2.5rem;
        top: 1rem;
        svg {
            width: 24px;
            height: 24px;
        }
    }
    .content {
        padding-left: 60px;
        border-left: 1px solid #D1E0E2;
        .name {
            color: #121212;
            font-size: 15px;
            font-weight: 400;
            line-height: 180%;
        }
        .refNo {
            color: #898989;
            font-size: 15px;
            font-weight: 600;
            line-height: 180%;
        }
        .refName {
            color: #121212;
            font-size: 15px;
            font-weight: 700;
            line-height: 180%;
            text-transform: uppercase;
        }
        h4 {
            padding: 29px 0 40px 0;
            color: #121212;
            font-size: 32px;
            font-weight: 700;
            line-height: 140%; /* 44.8px */
        }
        .delivery {
            margin-left: 4px;
            color: #121212;
            font-size: 15px;
            font-weight: 400;
            line-height: 180%; /* 27px */
            span {
                color: #121212;
                font-weight: 600;
            }
        }
    }
    @media screen and (max-width: 600px) {
        display: block;
        .select {
            left: 2rem;
            top: 2rem;
            input {
                width: 24px;
                height: 24px;
            }
        }
        .actions {
            gap: 20px;
            top: 2rem;
        }
        .main-img {
            text-align: center;
            margin: 20px 0;

        }
        .content { 
            text-align: center;
            padding: 0;
            border: none;
            h4 {
                padding: 20px 0;
            }
            .d-flex-aic {
                justify-content: center;
            }
        }
    }
`

const CheckoutBtn = styled.div`
    width: 100%;
    button {
        width: 100%;
    }
`

const MyCartPage = () => {
    const router = useRouter()

    const [currentPage, setCurrentPage] = useState(1)
    const [pageMeta, setPageMeta] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cartList, setCartList] = useState([])
    const [address, setAddress] = useState(null)
    const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
    const [selectedCards, setSelectedCards] = useState([])
    const [addToFav, setAddToFav] = useState(false)

    const onChange = (e, el) => {
        const { name, value, checked } = e?.target
        console.log('onChange', name, value, checked, el)
        if(checked) {
            let arr = objectDeepClone(selectedCards || [])
            arr.push(el)
            console.log('if checked', arr)
            setSelectedCards(arr)
        } else {
            let arr = selectedCards?.filter((el) => el?.assetId !== name)
            console.log('if not else 223234', arr)
            setSelectedCards(arr)
        }
    }

    const cartCards = [
        { name: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', refName: '“Amag” “Noir” Early 1st Series', price: '$25,400', image: '/images/customer/dashboard/watch-1.png'  },
        { name: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', refName: '“American” Calendar', price: '$25,400', image: '/images/customer/dashboard/watch-2.png'  },
        { name: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', refName: '“Amag” “Noir” Early 1st Series', price: '$25,400', image: '/images/customer/dashboard/watch-3.png'  },
    ]

    const formatAddress = () => {
        if(address?.buildingName && address?.addressLine2 && address?.country) {
            return `${address?.buildingName}, ${address?.addressLine2}. ${address?.country}`
        } else {
            return null
        }
    }

    const selectAll = (e) => {
        const { name, value, checked } = e?.target
        console.log('onChange', name, value, checked)
        if(checked) {
            setSelectedCards(cartList)
        } else {
            setSelectedCards([])
        }
    }

      // add or remove fav
    const updateFav = useCallback(async (assetId) => {
        const response = await API.createOrRemovefavorite({ assetId })
        if (response?.status === 200) {
            getCartItems()
            Toast.success(response?.data?.data?.isFavorite ? 'Added to favorite' : 'Removed from favorite')
        } else {
            Toast.error(response.error.error.message || 'Something went wrong try again later')
        }
    }, [])

    const bulkFavAdd = () => {
        let arr = cartList?.map(el => {return el?.assetId})
        let payload = {
            assetIds: arr,
        }
        API.bulkAddToFav(payload)
        .then(res => {
            getCartItems()
            setAddToFav(false)
            Toast.success('Items added to favorite')
        })
        .catch(err => {
            Toast.error(err.error.error.message || 'Something went wrong try again later')
        })
    }

    const bulkFavRemove = () => {
        let arr = cartList?.map(el => {return el?.assetId})
        let payload = {
            assetIds: arr,
        }
        API.bulkRemoveToFav(payload)
        .then(res => {
            getCartItems()
            setAddToFav(true)
            Toast.success('Items removed from favorite')
        })
        .catch(err => {
            Toast.error(err.error.error.message || 'Something went wrong try again later')
        })
    }

    const checkOut = () => {
        let arr = []
        selectedCards.forEach(el => {
            let obj = {
                id: el?.assetId,
                name: el?.assetData?.name,
                refNo: el?.assetData?.refNo,
                refName: el?.assetData?.refName,
                price: el?.assetData?.primarySalePrice,
                mainImg: el?.assetData?.mainAssetUrl,
                // isFavorite,
            }
            arr.push(obj)
        })
        setCookie('buyItems', JSON.stringify(arr))
        router.push('/base/buy/payment')
    }

    const getUserAddress = () => {
        UserService.getAddress()
        .then(res => {
            console.log('getUserAddress', res)
            if(res?.data?.data?.length) {
                let data = objectDeepClone(res?.data?.data)
                let delAddress = data.find(el =>  el?.addressType === "PRIMARY_SHIPPING")
                console.log('"PRIMARY_SHIPPING"', delAddress)
                if(delAddress) {
                    setAddress(delAddress)
                }
            }
            // if()
            // setAddressArr(res?.data?.data)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    const getCartItems = () => {
        API.getCart()
        .then(res => {
            console.log('getCartItems res', res)
            if(res?.data?.data?.items) {
                setCartList(res?.data?.data?.items)
                setPageMeta(res?.data?.data?.pageMeta)
                setPageFav()
            }
        })
        .catch(err => {
            console.log('getCartItems err', err)
        })
    }

    const removeItemFromCart = (id) => {
        API.removeFromCart(id)
        .then(res => {
            console.log('removeItemFromCart res', res)
            if(res.status === 200) {
                Toast.success(res?.data?.message || 'Item removed!')
                setTimeout(() => getCartItems(), 1000)
            } else {
                Toast.info(res?.error?.error?.message || 'Item doesnt exist in the cart')
            }
        })
        .catch(err => {
            console.log('removeItemFromCart err', err)
            Toast.error(err?.error?.message || 'Something went wrong!')
        })
    }

    const clearCart = () => {
        API.clearCart()
        .then(res => {
            console.log('clearCart res', res)
            if(res.status === 200) {
                Toast.success(res?.data?.message || 'Cart cleared!')
                setTimeout(() => getCartItems(), 1000)
            } else {
                Toast.info(res?.error?.error?.message || 'Item doesnt exist in the cart')
            }
        })
        .catch(err => {
            console.log('clearCart err', err)
            Toast.error(err?.error?.message || 'Something went wrong!')
        })
    }

    const setPageFav = () => {
        if(cartList?.length) {
            let fav = false
            cartList.map(el => {
                console.log('setAddToFav', !el?.assetData?.isFavorite)
                if(!el?.assetData?.isFavorite) {
                    fav = true
                }
            })
            setAddToFav(fav)
        }
    }

    useEffect(() => {
        setPageFav()
    },[cartList])
    
    useEffect(() => {
        getCartItems()
        getUserAddress()
    },[])

    useEffect(() => {
        getCartItems()
        getUserAddress()
    },[])

    console.log('addToFav', addToFav, selectedCards)

    return (
        <MyCartWrapper>
            {loading 
            ? <div className='loader-section'>
                <Loader />
            </div>
            : null}
            <PageBanner>
                <h1>MY CART</h1>
            </PageBanner>
            <Container>
                <MyCartGrid>
                    <MyCartLHSSection>
                        {cartList?.length 
                        ?  <MultiSelect>
                            <InputCheckbox label={`${selectedCards?.length}/${cartList?.length} Items selected`} onChange={selectAll} value={selectedCards?.length > 0 && selectedCards?.length === cartList?.length} />
                            <div className='lhs'>
                                {cartList?.length 
                                ? <>
                                <a className='d-flex-aic' onClick={() => clearCart()}>
                                    <Image src={`/svgs/cart-delete.svg`} width={24} height={24} /> &nbsp;&nbsp;Remove
                                </a>
                                <div className='divider'></div>
                                </>
                                : null}
                                <a className='d-flex-aic' onClick={() => addToFav ? bulkFavAdd() : bulkFavRemove()}>
                                    {/* <Image src={`/svgs/cart-heart.svg`} width={24} height={24} />  */}
                                    <Icon name="heart-dark" fill={addToFav ? 'none' : 'red'} />
                                    &nbsp;&nbsp;{addToFav ? 'Move to' : 'Remove from' } My Favorites
                                </a>
                            </div>
                        </MultiSelect>
                        : null}
                        <CardContainer>
                            {cartList?.length 
                            ? cartList.map((el, i) => {
                                console.log('card console', selectedCards, el?.assetId, selectedCards?.includes(el?.assetId))
                                let arr = selectedCards?.filter(p => el?.assetId === p?.assetId)
                                let selected = false
                                if(arr?.length) {
                                    selected = true
                                } 
                                console.log('selected', selected)
                                return (
                                    <Card key={i}>
                                        <div className='select'>
                                            <input type="checkbox" name={el?.assetId} onChange={(e) => onChange(e, el)} defaultChecked={selected} checked={selected} />
                                        </div>
                                        {/* checked={selectedCards?.includes(el?.assetId)} */}
                                        <div className='actions'>
                                            <a onClick={() => updateFav(el?.assetId)}>
                                                <Icon name="heart-dark" fill={el?.assetData?.isFavorite ? 'red' : 'none'} />
                                                {/* {el?.isFavorite 
                                                ? <Icon name="heart-dark" fill={el?.fav ? 'red' : 'none'} />
                                                : <Image src={`/svgs/cart-heart.svg`} width={24} height={24} />} */}
                                            </a>
                                            <a onClick={() => removeItemFromCart(el?.assetId)}><Image src={`/svgs/cart-delete.svg`} width={24} height={24} /></a>
                                        </div>
                                        <div className='main-img'>
                                            <Image src={handleApiImage(el?.assetData?.mainAssetUrl)} width={180} height={220} />
                                        </div>
                                        <div className='content'>
                                            <p className='name'>{el?.assetData?.name}</p>
                                            <p className='refNo'>{el?.assetData?.refNo}</p>
                                            <p className='refName'>{el?.assetData?.refName}</p>
                                            <h4>{formatToUSD(el?.assetData?.primarySalePrice)}</h4>
                                            <div className='d-flex-aic'>
                                                <Image src={`/svgs/tick-primary.svg`} width={20} height={20} />&nbsp;
                                                <p className='delivery'>Delivery by <span>11 jan 2023</span></p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                            : <NotFound padding="50px 0" />}
                            {/* {cartCards?.map((el,i) => {
                                return (
                                    <Card key={i}>
                                        <div className='select'>
                                            <InputCheckbox label={``} name='terms' value={null} onChange={onChange} />
                                        </div>
                                        <div className='actions'>
                                            <a><Image src={`/svgs/cart-heart.svg`} width={24} height={24} /></a>
                                            <a><Image src={`/svgs/cart-delete.svg`} width={24} height={24} /></a>
                                        </div>
                                        <div className='main-img'>
                                            <Image src={el?.image} width={180} height={220} />
                                        </div>
                                        <div className='content'>
                                            <p className='name'>{el?.name}</p>
                                            <p className='refNo'>{el?.name}</p>
                                            <p className='refName'>{el?.name}</p>
                                            <h4>{el?.price}</h4>
                                            <div className='d-flex-aic'>
                                                <Image src={`/svgs/tick-primary.svg`} width={20} height={20} />&nbsp;
                                                <p className='delivery'>Delivery by <span>11 jan 2023</span></p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })} */}
                        </CardContainer>
                    </MyCartLHSSection>
                    <MyCartRHSSection>
                        <AddressCard>
                            <div className='d-flex-aic-jcsb'>
                                <h4>Delivery Address</h4>
                                <Link href={`/base/myProfile`}><a>Change</a></Link>
                            </div>
                            <div className='icon-text'>
                                <Image src={`/svgs/cart-location.svg`} width={24} height={24} />
                                <p>{formatAddress()}
                                    <span><strong>Pin code:</strong> {address?.pincode || 'NA'}</span>
                                </p>
                            </div>
                            <div className='icon-text'>
                                <Image src={`/svgs/email.svg`} width={24} height={24} />
                                <p>{profileData?.email || 'NA'}</p>
                            </div>
                            <div className='icon-text'>
                                <Image src={`/svgs/telephone.svg`} width={24} height={24} />
                                <p>{profileData?.countryCode && profileData?.phone ? `${profileData?.countryCode} ${profileData?.phone}` : 'NA'}</p>
                            </div>
                        </AddressCard>
                        {/* {selectedCards?.length 
                        ? <CheckoutCard>
                            <div className='title-price'>
                                <span>Purchase Amount</span>
                                <p>$26,000</p>
                            </div>
                            <div className='title-price'>
                                <span>Estimated Shipping</span>
                                <p>$6,000</p>
                            </div>
                            <div className='title-price'>
                                <span>Buyer's Premium</span>
                                <p>$10400</p>
                            </div>
                            <div className='divider'></div>
                            <div className='title-price total'> 
                                <span>Total Amount</span>
                                <p>$20,100</p>
                            </div>
                            <div className='d-flex-aic info'>
                                <Image src={`/svgs/info-primary.svg`} width={18} height={18} />&nbsp;
                                All numbers are shown in USD
                            </div>
                            <ButtonPrimary>Checkout</ButtonPrimary>
                        </CheckoutCard>
                        : null} */}
                        {selectedCards?.length 
                        ? <CheckoutBtn>
                            <ButtonPrimary onClick={checkOut}>Checkout</ButtonPrimary>
                        </CheckoutBtn>
                        : null}
                    </MyCartRHSSection>
                </MyCartGrid>
            </Container>
        </MyCartWrapper>
  )
}

export default MyCartPage
