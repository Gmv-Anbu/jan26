import React, { useEffect, useState } from 'react'
import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'
import Image from 'next/image'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import UserService from '@apps/customer/api/customer/UserService'
import { useRouter } from 'next/router'

const CollectionWrap = styled.div`
  padding: 14rem 0;
  background: url(/images/customer/shared/bg-text-bold.png) no-repeat bottom center;
  h1 {
    line-height: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1.6rem;
    font-size: 5rem;
  }
  p {
    color: ${({ theme }) => theme.colors.fontDarkGray};
    text-align: center;
    max-width: 405px;
    margin: auto;
    font-size: 1.8rem;
    font-weight: 400;
    margin-top: 2.5rem;
  }
  @media screen and (max-width: 549px) {
    margin-top: 60px;
    background: url(/images/customer/shared/collection-mob-bg.png) no-repeat bottom center;
    h1 {
      font-size: 24px;
      line-height: 116%;
      margin-bottom: 0;
    }
    p {
      font-size: 14px;
      letter-spacing: -0.015em;
      margin-top: 6px;
      max-width: 287px;
    }
  }
`
const CollectionBoxWrap = styled.div`
  /* display: flex;
    flex-wrap: wrap; */
  margin-top: 14.7rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  @media screen and (max-width: 549px) {
    margin-top: 24px;
    /* flex-direction: column; */
    gap: 35px;
    grid-template-columns: auto;
    justify-content: center;
  }
`
const CollectionBxEach = styled.div`
  /* width: 33%; */
  cursor: pointer;
  &:nth-child(2) {
    @media screen and (min-width: 549px) {
      position: relative;
      top: -70px;
    }
  }

  @media screen and (max-width: 549px) {
    width: 100%;
  }
`
const CollectionBxInner = styled.div`
  transition: all 0.9s ease-in;
  /* padding: 0 3.9rem;  */
  img {
    transition: all 0.5s ease-in;
  }
  figure {
    overflow: hidden;
  }
  &:hover {
    img {
      transform: scale(1.05);
      -webkit-transform: scale(1.05);
      -moz-transform: scale(1.05);
    }
    span {
      opacity: 1;
    }
    h3:after {
      width: 100%;
    }
  }
`
const BxDesc = styled.div`
  margin: 3.3rem 0 0;
  display: flex;
  flex-wrap: wrap;
  h3 {
    text-transform: uppercase;
    font-size: 3.2rem;
    position: relative;
    font-weight: normal;
    &:after {
      @media screen and (min-width: 549px) {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        background: #0e1818;
        bottom: 0;
        left: 0;
        transition: all 0.8s ease;
      }
    }
  }
  span {
    opacity: 0;
    transition: all 0.8s ease;
    font-size: 3.2rem;
    margin-left: 5px;
  }
  @media screen and (max-width: 549px) {
    margin-top: 16px;
    h3 {
      border-bottom: 2px solid;
      font-size: 25.5721px;
      line-height: 104%;
    }
    span {
      font-size: 25.5721px;
      opacity: 1;
    }
  }
`
const HomeCollection = () => {
  const router = useRouter()
  const { width } = useWindowSize()
  const [pocketWatchCount, setPocketWatchCount] = useState(0)
  const [wristWatchCount, setWristWatchCount] = useState(0)
  const [artifectCount, setArtifectCount] = useState(0)
  useEffect(() => {
    getCollectionsCount()
  }, [])
  const getCollectionsCount = async () => {
    const res = await UserService.getCollectionCount()
    if (res.status == 200) {
      res.data.data.map((d) => {
        if (d.name == 'Pocket Watches') {
          setPocketWatchCount(d.assetCount)
        } else if (d.name == 'Wrist Watches') {
          setWristWatchCount(d.assetCount)
        } else {
          setArtifectCount(d.assetCount)
        }
      })
    }
  }
  const redirectHandler = (query) => {
    router.push(`/base/museum${query ? '?'+query : ''}#collection`)
  }
  return (
    <CollectionWrap>
      <Container>
        <h1>Our Collections</h1>
        <p>Unveiling a Timeless Collection: Discover Our Rare and Historical Watches</p>
        <CollectionBoxWrap>
          <CollectionBxEach onClick={() => redirectHandler('')}>
            <CollectionBxInner>
              <figure>
                <Image src={width > 549 ? '/images/customer/home/ourCollections/img-1.png' : '/images/customer/home/ourCollections/img-1-mr.png'} alt="ICO" width={width > 549 ? 428 : 342} height={width > 549 ? 613 : 358} />
              </figure>
              <BxDesc>
                <h3>Pocket Watches</h3>
                <span>({pocketWatchCount})</span>
              </BxDesc>
            </CollectionBxInner>
          </CollectionBxEach>
          <CollectionBxEach onClick={() => redirectHandler('tab=2')} style={{ justifySelf: 'center' }}>
            <CollectionBxInner>
              <figure>
                <Image src={width > 549 ? '/images/customer/home/ourCollections/img-2.png' : '/images/customer/home/ourCollections/img-2-mr.png'} alt="ICO" width={width > 549 ? 428 : 342} height={width > 549 ? 613 : 358} />
              </figure>
              <BxDesc>
                <h3>Wrist Watches</h3>
                <span>({wristWatchCount})</span>
              </BxDesc>
            </CollectionBxInner>
          </CollectionBxEach>
          <CollectionBxEach onClick={() => redirectHandler('tab=3')} style={{ justifySelf: 'flex-end' }}>
            <CollectionBxInner>
              <figure>
                <Image objectFit='contain' objectPosition={`center`} src={width > 549 ? '/images/customer/home/ourCollections/img-3.png' : '/images/customer/home/ourCollections/img-3-mr.png'} alt="ICO" width={width > 549 ? 428 : 342} height={width > 549 ? 613 : 358} />
              </figure>
              <BxDesc>
                <h3>Clocks & Artifacts </h3>
                <span>({artifectCount})</span>
              </BxDesc>
            </CollectionBxInner>
          </CollectionBxEach>
        </CollectionBoxWrap>
      </Container>
    </CollectionWrap>
  )
}

export default HomeCollection
