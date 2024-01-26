import useWindowSize from '@apps/customer/hooks/useWindowSize'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface ICard {
  id: number
  image: string
  name: string
  refNo: string
  refName: string
  key: number
  isFav: boolean
  className?: string
  routerPush?: string
  updateFav?: (assetId: string | number) => void
}

const CardWrapper = styled.div`
  position: relative;
  border: 1.5px solid #d1e0e2;
  padding: 6.2rem 5.5rem 2.9rem;
  width: 360px;
  min-height: 492px;
  &.museum-page-card {
    padding: 6.2rem 4rem 2.9rem;
    width: 48rem;
    min-height: 49rem;
    .product-img {
      min-height: 50rem;
    }
    @media screen and (max-width: 980px) {
      padding: 4.2rem 4rem 2.9rem;
    }
    @media screen and (max-width: 540px) {
      .product-img {
        min-height: 40rem;
      }
    }
  }
  &.cursor-pointer {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  .product-img{
    position: relative;
    z-index: 1;
    width: 100%;
    min-width: 181px;
    max-height: 230px;
    min-height: 250px;
    align-self: center;
    overflow: hidden;
    transition: all 0.7s ease-in-out;
  }

  &:hover{
    .product-img{
      transform: scale(1.1);
    }
    .refName{
      color: ${({theme}) => theme.colors.secondary} !important; 
    }
  }
  
  hr {
    position: relative;
    z-index: 2;
    margin-top: 10px;
    background: linear-gradient(90deg, rgba(209, 224, 226, 0) 0%, #d1e0e2 52.11%, rgba(209, 224, 226, 0) 100%) !important;
    border: 0;
    height: 2px;
  }
  span.cursor-pointer svg {
    cursor: pointer;
  }
  svg {
    position: absolute;
    inset: 23px 20px auto auto;
    z-index: 5;
  }
  @media screen and (max-width: 980px) {
    padding: 4.2rem 5.5rem 2.9rem;
    min-height: 454px;
    hr {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`
const ProductDetails = styled.div`
  padding-top: 1.6rem;
  text-align: center;
  h6, p {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    line-height: inherit;
    overflow: hidden !important;
  }
  h6{
    color: ${({theme}) => theme.colors.primary}; 
    word-break: break-all;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    text-transform: capitalize;
  }
  p{
    font-size: 18px;
    font-weight: 600;
    line-height: 125%;
    word-break: break-all;
  }
  .refNo{
    font-weight: 400;
    font-size: 18px;
    color: ${({theme}) => theme.colors.fontGray}; 
    margin-bottom: 4px;
  }
  .refName{
    font-weight: 800;
    font-size: 18px;
    color: ${({theme}) => theme.colors.primary};
  }
  @media screen and (max-width: 980px) {
    padding-top: 32px;
    h6{
      margin-bottom: 6px;
    }
  }
`

const NftCard = ({ id, className, image, name, refNo, refName, isFav, routerPush, updateFav }: ICard) => {
  const {width} = useWindowSize()
  const router = useRouter()
  const [fav, setFav] = useState(isFav)
  let user = JSON.parse(localStorage.getItem('user'))

  const favClicked = (e) => {
    e.stopPropagation()
    setFav(!isFav)
    updateFav(id)
  }

  return (
    <CardWrapper 
      className={`${className || ''} ${user?.accessToken ? 'cursor-pointer' : ''} ${router?.pathname === "/base/museum" ? 'museum-page-card' : ''}`} 
      onClick={() => routerPush 
                    ? router.push(routerPush) 
                    : user?.accessToken && id
                      ? router.push('/base/museum/' + id) 
                      : router.push('/base/signin') }
    >
      <span className={`cursor-pointer`} onClick={(e) => user?.accessToken ? favClicked(e) : router.push('/base/signin')}>
        <Icon name="heart-dark" fill={fav ? 'red' : 'none'} />
      </span>
      <div className='product-img'>
        <Image src={image} alt="Product" layout="fill" objectFit="cover" />
      </div>
      
      <hr />
      <ProductDetails>
        <h6>{name}</h6>
        {refNo ? <p className='refNo'>{refNo}</p> : null}
        <p className='refName'>{refName}</p>
      </ProductDetails>
    </CardWrapper>
  )
}

export default React.memo(NftCard)
