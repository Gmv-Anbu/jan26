import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ButtonGradientPrimary } from '../../shared/components/button/button';
import { MainHeading } from '../../shared/components/heading/heading';
import VerticalSlider from '../shared/homeSlider/verticalSilder';
import SliderSelectedNFT from '../shared/homeSlider/sliderSelectedNFT';
import MarketService from '../../../api/customer/MarketService';
import Link from 'next/link';
import { processFeaturedNFTData } from '../../../utils/helper';

const SectionComp = styled.section`
  padding: 7.2rem 0 14rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding: 6rem 0;
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;
const MainSectionInfo = styled.p`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  color: ${({ theme }) => theme.colors.headingInfo};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.545em;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 2rem;
`;
const MainSectionDesc = styled.p`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem;
  margin: 0;
  margin-bottom: 5.5rem;
  color: ${({ theme }) => theme.colors.headingInfo};
  @media screen and (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const HomepageSlider = (props:any) => {
  const {items, sectionTitle}=props;
  const [selected, setSelected] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentpage, setCurrentPage] = useState<number>(1);

  const getData = async (page: number) => {
    if (hasMore) {
      MarketService.getFeaturedNFTList(1, items)
        .then((res) => {
          if (res?.data?.data) {
            const assetList = processFeaturedNFTData(
              res?.data?.data?.assetList
            );
            const totalItems = res?.data?.data?.pageMeta?.totalItems;
            const fetchedItems = data.length + assetList.length;
            setData((prevAssetList: any) => [...prevAssetList, ...assetList]);
            if (totalItems === fetchedItems) {
              setHasMore(false);
            }
            setCurrentPage(page);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getData(currentpage);
  }, []);

  const parentCallBack = (value: any) => {
    setSelected(value);
  };

  return (
    <SectionComp>
      {data?.length > 0 && (
        <>
          <VerticalSlider
            parentCallBack={parentCallBack}
            sliderArr={data}
            selected={selected}
          />
          <SliderSelectedNFT selected={selected} data={data[selected]} />
        </>
      )}
      <div>
        <MainSectionInfo>EXPLORE NFTS</MainSectionInfo>
        <MainHeading marginBottom="3.5">
          {sectionTitle ? sectionTitle : "Join our Creative Community"}
        </MainHeading>
        <MainSectionDesc>
          Create , Collect and Share <br></br> Your Favorite Nft
        </MainSectionDesc>
        <Link passHref href="/base/market">
          <ButtonGradientPrimary fs="1.4" size="md">
            Explore now
          </ButtonGradientPrimary>
        </Link>
      </div>
    </SectionComp>
  );
};

export default HomepageSlider;
