import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Image from 'next/image';
import { APP_ENV } from '@apps/customer/config';

import TimeLeftCard from '../../shared/components/timeLeftCard';
import TimerLeft from '../../../modules/shared/components/RemainingTime';

import {
  ButtonPrimaryOutline,
  ButtonGradientPrimary,
} from '../../shared/components/button/button';
///// Hide Section ///////
const Section_Comp = styled.section`
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  max-width: 112rem;
  margin: auto;
  grid-template-columns: 38rem 60.7rem;
  grid-gap: 13rem;
  align-items: center;
  background: ${({ theme }) => theme.colors.auctionBoxbg};
  border: double 1px ${({ theme }) => theme.colors.transparent};
  backdrop-filter: blur(3rem);
  @media screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    grid-gap: 0;
    align-items: center;
    justify-content: center;
    padding: 6rem 0;
    background: ${({ theme }) => theme.colors.auctionBoxbg};
    border: double 1px ${({ theme }) => theme.colors.transparent};
    backdrop-filter: blur(3rem);
  }
`;

const AuctionWrapper = styled.div`
  margin-bottom: 3.5rem;
`;
const Heading = styled.h2`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 3.6rem;
  font-weight: 600;
  line-height: 5rem;
  margin: 0;
  margin-bottom: 4.2rem;
  color: ${({ theme }) => theme.colors.whiteSand};
  text-transform: capitalize;
  @media screen and (max-width: 540px) {
    font-size: 4rem;
    line-height: 1.2;
    margin-bottom: 2rem;
  }
`;
const AuctionBox = styled.div`
  padding: 5.2rem 14rem;
  /* border-radius: 1.5rem; */
  /* background: ${({ theme }) => theme.colors.auctionBoxbg}; */
  /* border: double 1px ${({ theme }) => theme.colors.transparent}; */
  /* backdrop-filter: blur(3rem); */
  position: relative;
  /* border: 0.92px solid; */
  /* border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder}; */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    box-shadow: 0rem 0rem 15rem 5rem ${({ theme }) => theme.colors.cardShadow};
  }
  &::after {
    content: '';
    position: absolute;
    box-shadow: 0rem 0rem 15rem 5rem ${({ theme }) => theme.colors.cardShadow};
    right: 0;
  }
  @media screen and (max-width: 520px) {
    padding: 3rem;
  }
`;
const AuctionDataBox = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  &:last-child {
    margin-bottom: 0rem;
  }
`;
const AuctionBoxHeading = styled.h4`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.1rem;
  letter-spacing: -0.025em;
  margin: 0;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
`;
const AuctionBoxHeading2 = styled.h4`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.2rem;
  letter-spacing: -0.025em;
  margin: 0;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.endingColor};
`;
const AuctionBoxMainText = styled.p`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 4rem;
  width: 107%;
  font-weight: 600;
  line-height: 4.7rem;
  letter-spacing: 0.02em;
  margin: 0;
  margin-bottom: 1.2rem;
`;
const ButtonWrapper = styled.div`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 4rem;
  font-weight: 600;
  line-height: 4.7rem;
  letter-spacing: 0.02em;
  margin: 0;
  margin-bottom: 1.2rem;
  padding: 0 3.4rem;
`;
const AuctionBoxSubText = styled.span`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.3rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.pink};
`;
const AuctionMainImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.2rem;
  background: ${({ theme }) => theme.colors.copyFromClipboardbg};
  border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
  box-sizing: border-box;
  backdrop-filter: blur(3rem);
  border-radius: 2rem;
  img {
    max-width: 100%;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3rem;
    img {
      max-height: 30rem;
    }
  }
`;

const IndividualNFTSection = (props: any) => {
  const { currentBid, dollarValue, handleStep1, data } = props;
  const timeLeftInMS = moment().add(1, 'day').valueOf();

  return (
    <Section_Comp>
      <>
        <AuctionWrapper>
          {/* <Heading>Three Generations & Their Pets: </Heading> */}
          <AuctionBox>
            <AuctionDataBox>
              <AuctionBoxHeading>Current Bid</AuctionBoxHeading>
              <AuctionBoxMainText>
                {currentBid} {APP_ENV.BASE_CRYPTO_CURRENCY}{' '}
              </AuctionBoxMainText>
              <AuctionBoxSubText>${dollarValue}</AuctionBoxSubText>
            </AuctionDataBox>
            <AuctionDataBox>
              <AuctionBoxHeading>Auction Ending In</AuctionBoxHeading>
              {/* <TimeLeftCard time={timeLeftInMS} /> */}
              <TimerLeft
                endDate={moment(data?.auctionsData?.[0].endTime).add(
                  4,
                  'months'
                )}
              />
            </AuctionDataBox>
          </AuctionBox>
          <ButtonWrapper>
            {' '}
            <ButtonGradientPrimary
              marginBottom="1.5"
              blockBtn
              size="md"
              onClick={handleStep1}
              onDoubleClick={()=>{}}
            >
              Bid Now
            </ButtonGradientPrimary>
          </ButtonWrapper>
        </AuctionWrapper>
      </>
    </Section_Comp>
  );
};

export default IndividualNFTSection;
