import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Card from '../shared/card/card'
import ICard from '../shared/card/card.interface'
import Tab from '../shared/tab/tab'
import useCollection, { collectionTabs } from '../base/collections/useCollection'

import { ButtonGradientPrimary } from '../../shared/components/button/button'
import { FLexSpaceBetween, SectionHeading } from '@apps/customer/styles/section'

const SectionComp = styled.section`
  padding: 10rem 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  @media screen and (max-width: 768px) {
    padding: 6rem 0;
  }
`

const CardRow = styled.div`
  margin: 0 -1rem;  
`
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  @media screen and (max-width: 520px) {
    display:flex;
    justify-content: center;
  }
  & > div {
    /* margin: 0rem 0rem 7rem 1.5rem; */

    /* @media screen and (max-width: 1034px) {
      margin: 0rem 0rem 7rem 8rem;
    } */

    @media screen and (max-width: 520px) {
      margin: 0rem 1rem 4rem;
    }
  }
`
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CollectionSection = (props: any) => {
  const { sectionTitle, btnSize, btnText, showTab } = props

  const router = useRouter()

  const { featuredAssestData, TabRender } = useCollection()

  const goToDetailsPage = () => {
    router.push('/base/market')
  }

  return (
    <SectionComp>
      <FLexSpaceBetween>
        <SectionHeading>{sectionTitle}</SectionHeading>
        {!showTab ? null : <>{TabRender && TabRender(collectionTabs)}</>}
        {/* <Tab data={tabs} selectedTab={""} onChange={()=>{}} ></Tab> */}
      </FLexSpaceBetween>
      <CardRow>
        <CardContainer>
          {featuredAssestData?.map((data: ICard) => (
            <Card cardClass={`m-10`} key={data.id} vidHeight={24.2} {...data}></Card>
          ))}
        </CardContainer>
      </CardRow>
      {featuredAssestData?.length > 0 && (
        <BtnWrapper>
          <ButtonGradientPrimary onClick={goToDetailsPage} fs="1.4" size={btnSize || 'sm'}>
            {btnText || 'View all'}
          </ButtonGradientPrimary>
        </BtnWrapper>
      )}
    </SectionComp>
  )
}

export default CollectionSection
