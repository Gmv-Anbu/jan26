import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import CardBids from '../../../modules/customer/shared/nftDetails/CardBids';
import CardFilter from '../../../modules/customer/shared/nftDetails/CardFilter';
import CreatorCollectionsCard from '../../../modules/customer/shared/infoCard/creatorCollectionInfo';
import Meta from '../../../modules/shared/components/meta';

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.whiteSand};
  margin-bottom: 3.5rem;
  font-size: 4.4rem;
  line-height: 5.3rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-weight: 600;
`;
const ImageSection = styled.div`
  width: 57.5rem;
  height: 70rem;
  position: relative;
  background: ${({ theme }) => theme.colors.copyFromClipboardbg};
  border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
  backdrop-filter: blur(3rem);
  border-radius: 2rem;
  padding: 2.5rem;
  @media screen and (max-width: 1120px) {
    width: 80%;
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    height: 50rem;
    padding: 1.5rem;
  }
`;
const ProductImageDiv = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  border-radius: 1.6rem;
  @media screen and (max-width: 576px) {
    background-size: auto;
  }
`;
const ShareBox = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 40%);
`;
const ShareBoxLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 3.5rem;
  background-color: ${({ theme }) => theme.colors.shareBtnBg};
  border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
  backdrop-filter: blur(3rem);
  border-radius: 3.5rem;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: flex;
    margin-right: 1rem;
  }
  &.share-btn {
    width: 17rem;
  }
  &.dots {
    width: 5.5rem;
    height: 5.5rem;
    border-radious: 2rem;
  }
  margin-right: 1rem;
  &:last-child {
    margin-right: 0rem;
  }
`;
const NFTcardWrapper = styled.section`
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    width: 50vw;
    position: absolute;
    height: 100%;
    left: 0;
    background: ${({ theme }) => theme.colors.nftDetailsImgCover};
    backdrop-filter: blur(3rem);
  }
  @media screen and (max-width: 768px) {
    overflow: visible;
    &:before {
      display: none;
    }
  }
`;
const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.mainBG};
  display: grid;
  max-width: 128rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  grid-template-columns: 1fr 1fr;
  grid-gap: 14rem;
  margin: 0rem auto;
  padding: 7.5rem 0 0 0;
  @media screen and (max-width: 1120px) {
    display: inline-block;
  }
  @media screen and (max-width: 768px) {
    display: inline-block;
  }
  @media screen and (max-width: 576px) {
    display: inline-block;
    margin: 0 0 4rem;
  }
`;

const Container = styled.div`
  @media screen and (max-width: 1120px) {
    width: 100%;
    margin: 5rem auto;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 5rem auto;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    margin: 5rem auto;
  }
`;
const AuthorFlex = styled.div`
  justify-content: flex-start;
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 575px) {
    flex-flow: wrap;
    justify-content: space-between;
  }
`;

const NftCard = () => {
  return (
    <>
      <Meta />
      <NFTcardWrapper>
        <CardWrapper>
          <ImageSection>
            <ProductImageDiv
              style={{
                backgroundImage: `url(/images/customer/nft-detail.png)`,
              }}
            />
            <ShareBox>
              <ShareBoxLink className="share-btn" href="#">
                <span>
                  <Image
                    src={'/svgs/share.svg'}
                    alt="share Icon"
                    width="18"
                    height="18"
                  />
                </span>
                Share
              </ShareBoxLink>
              <ShareBoxLink className="dots" href="#">
                <Image
                  src={'/svgs/dots.svg'}
                  alt="dots"
                  width="20"
                  height="4"
                />
              </ShareBoxLink>
            </ShareBox>
          </ImageSection>
          <Container>
            <Title>CoinList. Mina Token Sale.</Title>
            <AuthorFlex>
              <CreatorCollectionsCard
                type={`Creator`}
                verified={true}
                name={`@jonraf_wavakazi`}
                imgSrc={`/images/customer/creator-img.png`}
              />
              <CreatorCollectionsCard
                type={`Collection`}
                name={`Petronas Sepang`}
                imgSrc={`/images/customer/collection-img.png`}
              />
            </AuthorFlex>
            <CardBids />
            <CardFilter />
          </Container>
        </CardWrapper>
      </NFTcardWrapper>
    </>
  );
};

export default NftCard;
