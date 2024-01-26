import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'

const MainContainer = styled.div`
  width: 100%;
  margin: 20rem 0;
  @media screen and (max-width: 767px) {
    margin: 13rem 0;
   
  }
`
const WrapperContainer = styled.div`
    width: 100%;
    max-width: 135rem;
    margin: 0 auto;
    @media screen and (max-width: 1360px) {
        max-width: 118rem;
    }
    @media screen and (max-width: 1199px) {
        max-width: 114rem;
    }
    @media screen and (max-width: 991px) {
        max-width: 96rem;
    }
    @media screen and (max-width: 767px) {
        max-width: 72rem;
        padding: 0px 24px;
    }
    @media screen and (max-width: 575px) {
        max-width: 54rem;
    }
    h1 {
        color: #111727;
        margin-bottom: 15px;
    }
    p {
        font-size: 18px;
        font-weight: 400;
        line-height: 29px;
        color: #7C7C7C;
        margin-bottom: 60px;
    }
`
const NoSafetyBoxFirst = styled.div`
    max-width: 718px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 100px;
    h1 {
        font-size: 60px;
        font-weight: 400;
        line-height: 62px;
        margin-bottom: 12px;
    }
`
const NoSafetyBoxSecond = styled.div`
    max-width: 880px;
    text-align: center;
    margin: 0 auto;
    h2 {
        font-size: 48px;
        font-weight: 600;   
        line-height: 58px;
        color: #111727;
        margin-bottom: 12px;
    }
`
const NoBoxesContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 40px;
    text-align: left;
    @media screen and (max-width: 780px) {
        grid-template-columns: auto;
    }
`
const NoBoxesCard = styled.div`
    width: 420px;
    padding: 24px;
    background: #F4F9F9;
    h4 {
        font-size: 24px;
        font-weight: 600;
        line-height: 24px;
        color: #0E1818;
        margin-bottom: 15px;
    }
    p {
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        margin-bottom: 18px;
    }
    button {
        width: 140px;
        font-size: 16px;
        font-weight: 600;
        line-height: 18px;
        padding: 8px 25px;
    }
    @media screen and (max-width: 480px) {
        width: 100%;
        padding: 24px 20px;
    }
`

const NoSafetyBox = () => {

    const [tab, setTab] = useState(1)

    return (
        <MainContainer>
            <WrapperContainer>
                <NoSafetyBoxFirst>
                    <h1>My Safety box</h1>
                    <p>Our Vault offers full coverage of your assets and array of services to protected you against economics risks.</p>
                    <Image src="/images/customer/safety-box/no-boxes.png" width="410" height="255" />
                </NoSafetyBoxFirst>
                <NoSafetyBoxSecond>
                    <h2>No safety boxes available </h2>
                    <p>you can purchase safety boxes from below options</p>
                    <NoBoxesContainer>
                        <NoBoxesCard>
                            <h4>Purchase Safety box</h4>
                            <p>Consectetur adipiscing elit. Duis est scelerisque pellentesque sed venenatis. Risus porttitor in cursus justo, posuere odio justo, dolor. Habitasse faucibus egestas nec. </p>
                            <ButtonPrimary>Purchase</ButtonPrimary>
                        </NoBoxesCard>
                        <NoBoxesCard>
                            <h4>Purchase membership plan</h4>
                            <p>Consectetur adipiscing elit. Duis est scelerisque pellentesque sed venenatis. Risus porttitor in cursus justo, posuere odio justo, dolor. Habitasse faucibus egestas nec. </p>
                            <ButtonPrimary>Purchase</ButtonPrimary>
                        </NoBoxesCard>
                    </NoBoxesContainer>
                </NoSafetyBoxSecond>
            </WrapperContainer>
        </MainContainer>
    )
}

export default NoSafetyBox