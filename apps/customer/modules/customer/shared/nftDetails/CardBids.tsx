import React from 'react'
import styled from 'styled-components'

import { ButtonGradientPrimary } from '../../../shared/components/button/button'

const Bids = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.bidsColor};
  padding: 3rem;
`
const CurrentBid = styled.p`
  font-size: 2.2rem;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-weight: 400;
  line-height: 2.6rem;
  letter-spacing: -0.025rem;
  color:${({ theme }) => theme.colors.white};
  margin-bottom: 1.6rem;
`
const Eth = styled.h2`
  margin: .3rem 0;
  font-size:4.8rem;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-weight: 600;
  line-height: 5.6rem;
  letter-spacing: 0.02rem;
  margin-bottom: 1.6rem;
`
const Dollor = styled.p`
  color:${({ theme }) => theme.colors.pink};
  font-size: 2rem;
  font-weight: 600;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  line-height: 2.3rem;
`
const Auction = styled.div`
  padding: 3rem;
`
const Ending = styled.p`
  font-size: 2.2rem;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-weight: 500;
  line-height: 2.6rem;
  letter-spacing: -0.025em;
  color:${({ theme }) => theme.colors.endingColor};

`
const TimeFlex = styled.div`
  max-width:50%;
  margin: 2rem auto 3rem;
  font-size: 1.375rem;
  display: flex;
  color:#${({ theme }) => theme.colors.endingColor};
  justify-content: space-around;
`
const TimeFlexSpan = styled.span`
  font-size:4.4rem;
  font-weight:700;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  line-height: 6rem;
  letter-spacing: 0.02rem;
  color:${({ theme }) => theme.colors.white};
`
const TimeFlexSpanBold = styled.b`
  color:${({ theme }) => theme.colors.timeFlexSpanBold};
  font-size:2rem;
  display:block;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-weight: 500;
  line-height: 2.3rem;
  letter-spacing: 0.02em;
`
const CardBidsWrapper = styled.div`
    border-radius: 1.5rem;
    text-align: center;
    max-width: 60rem;
    color: ${({ theme }) => theme.colors.white};
    position: relative;
    border: double 1px ${({ theme }) => theme.colors.transparent};
    background-image: ${({ theme }) => theme.colors.linearGradient1 }, ${({ theme }) => theme.colors.linearGradient2 };
    background-origin: border-box;
    background-clip: content-box, border-box;
    position: relative;
&::before {
    content: "";
    position: absolute;
    left: -15rem;
    box-shadow: 15rem 1rem 15rem 5rem ${({ theme }) => theme.colors.bidsShadowColor};
}
&::after {
    content: "";
	position:absolute;
	box-shadow: 0rem 0rem 15rem 5rem ${({ theme }) => theme.colors.cardShadow};
	right:0;
}
@media screen and (max-width: 1120px) {
    width:95%;
 }
@media screen and (max-width: 768px) {
    width:100%;
 }
@media screen and (max-width: 575px) {
    width:100%;
 }
`



const CardBids = () => {
    return (
        <CardBidsWrapper>
            <Bids>
                <CurrentBid>Current Bid</CurrentBid>
                <Eth>1.1818 ETH </Eth>
                <Dollor>$1754.787</Dollor>
            </Bids>
            <Auction>
                <Ending>Auction Ending In</Ending>
                <TimeFlex>
                    <TimeFlexSpan>11<TimeFlexSpanBold>Hrs</TimeFlexSpanBold></TimeFlexSpan>
                    <TimeFlexSpan>33<TimeFlexSpanBold>Mins</TimeFlexSpanBold></TimeFlexSpan>
                    <TimeFlexSpan>20<TimeFlexSpanBold>Sec</TimeFlexSpanBold></TimeFlexSpan>
                </TimeFlex>
                <ButtonGradientPrimary blockBtn size="sm" fs='2'>Bid Now</ButtonGradientPrimary>
            </Auction>
        </CardBidsWrapper>
    )
}

export default CardBids