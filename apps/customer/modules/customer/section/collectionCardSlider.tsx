import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import CollectionCard from '../shared/collectionCard/index'
import ICollectionCard from '../shared/collectionCard/card.interface'
import { ButtonGradientPrimary } from '../../shared/components/button/button'

import MarketService from '../../../api/customer/MarketService'
import { processCollectionData } from '../../../utils/helper'
import { RootState } from '../../../redux/store'
import { SectionHeading } from '@apps/customer/styles/section'

const SectionComp = styled.section`
  padding: 10rem 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  max-width: 100%;
  @media screen and (max-width: 768px) {
    padding: 6rem 0;
  }
`
const SliderContainer = styled.div`
  .slick-prev,
  .slick-next {
    top: -7rem;
    width: 4.6rem;
    height: 4.6rem;
    z-index: 2;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &:before {
      display: none;
    }
  }
  .slick-prev {
    right: 7rem;
    left: auto;
    background-image: url(/svgs/chevron-arrow-left.svg);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      top: -7.2rem;
    }
  }
  .slick-next {
    right: 2rem;
    background-image: url(/svgs/chevron-arrow-right.svg);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      top: -7.2rem;
    }
  }
  @media screen and (max-width: 520px) {
    .slick-prev,
    .slick-next {
      width: 3rem;
      height: 3rem;
    }
    .slick-prev {
      right: 3.5rem;
    }
    .slick-next {
      right: 0rem;
    }
  }
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CollectionCardSlider = (props: any) => {
  const router = useRouter()
  const isAuthenticated = useSelector<RootState, any>((state) => state?.userData?.isAuthenticated)

  const { sectionTitle, items } = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  const [collectionList, setCollectionList] = useState([])

  const getCollectionList = async (page: number, limit: number) => {
    MarketService.getCollectionData(page, limit)
      .then((res) => {
        // setCurrentPage(page)
        if (res?.data?.data) {
          const collectionList = processCollectionData(res?.data?.data?.collectionList)
          setCollectionList(collectionList)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const goToDetailsPage = () => {
    router.push('/base/collections')
  }

  useEffect(() => {
    // For now showing dummy data if user is not authenticated
    getCollectionList(1, items)
  }, [isAuthenticated])
  
  return (
    <SectionComp>
      <SectionHeading marginBottom="4">{sectionTitle || ''}</SectionHeading>
      <SliderContainer>
        {collectionList?.length ? (
          <Slider {...settings}>
            {collectionList?.map((data: ICollectionCard) => (
              <CollectionCard
                key={data.id}
                onClick={() => {
                  router.push(`/base/collections/${data.id}`)
                }}
                {...data}
              ></CollectionCard>
            ))}
          </Slider>
        ) : null}
      </SliderContainer>
      <BtnWrapper>
        <ButtonGradientPrimary onClick={goToDetailsPage} fs="1.4" size="sm">
          View all
        </ButtonGradientPrimary>
      </BtnWrapper>
    </SectionComp>
  )
}

export default CollectionCardSlider
