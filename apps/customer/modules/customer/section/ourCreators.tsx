import React, { useState } from 'react'
import styled from 'styled-components'

import Tab from '../shared/tab/tab'
import CreatorCard from '../shared/creatorCard/creatorCard'

import { ButtonGradientPrimary } from '../../shared/components/button/button'

import { creatorCardArr } from '../../../mock/db'
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
  & > div {
    margin: 0rem 1rem 7rem;
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

const CreatorSection = (props: any) => {
  const { sectionTitle } = props

  const tabs = [
    { id: 'topArtist', name: 'Top Artist' },
    { id: 'followers', name: 'Followers' },
  ]
  return (
    <SectionComp>
      <FLexSpaceBetween>
        <SectionHeading>{sectionTitle}</SectionHeading>
        <Tab data={tabs} selectedTab="topArtist" onChange={() => {}}></Tab>
      </FLexSpaceBetween>
      <CardRow>
        <CardContainer>
          {creatorCardArr?.map((creator) => {
            return <CreatorCard key={creator?.id} bgCoverImg={creator?.bgCoverImg} profileImg={creator?.profileImg} creatorName={creator?.creatorName} followers={creator?.followers} id={creator.id} />
          })}
        </CardContainer>
      </CardRow>
      <BtnWrapper>
        <ButtonGradientPrimary fs="1.4" size="md">
          Load More
        </ButtonGradientPrimary>
      </BtnWrapper>
    </SectionComp>
  )
}

export default CreatorSection
