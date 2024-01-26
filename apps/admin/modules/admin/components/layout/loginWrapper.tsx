import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    background: ${({ theme }) => theme.colors.white};
`;
const LoginPageOuterDiv = styled.div`
    height: 100vh;
    overflow: auto;
`;
const LoginBgCover = styled.div`
    background-image: url(/images/admin/Background.png);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
    flex: 0 0 35%;
    height: auto;
    min-height: 100vh;
    @media screen and (max-width: 768px) {
        position: absolute;
        width: 100%;
        z-index: 0;
        flex: 100%;
    }
`;
const SiteLogoWrapper = styled.div`
    width: 100%;
    @media screen and (max-width: 540px) { 
        max-width: 15rem;
    }
`;
const HeaderAnchor = styled.a`
    font-size: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.headerAnchor};
    display: block;
    padding: 2.8rem 7.5rem;
    @media screen and (max-width: 768px) {
        padding: 2.8rem;
    }
    @media screen and (max-width: 540px) { 
        padding: 1.5rem;
    }
`;
const Content = styled.div`
    flex: 0 0 65%;
    padding: 2.8rem 8rem;
    @media screen and (max-width: 768px) {
        position: absolute;
        width: 100%;
        z-index: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 540px) { 
        padding: 0 2rem;
        margin: 0 auto;
    }
`;
const LanguageSelection = styled.div`
    text-align: right;
    @media screen and (max-width: 768px) {
        position: absolute;
        top: 2.8rem;
        right: 2.8rem;
    }
    @media screen and (max-width: 540px) { 
        top: 1.5rem;
        right: 1.5rem;
    }
`;
const SelectItem = styled.select`
    border: 0;
    background-color: ${({ theme }) => theme.colors.langSelectBg};
    padding: 0.5rem;
    border-radius: 0.55rem;
    color: ${({ theme }) => theme.colors.langSelectColor};
`;
const DetailsSection = styled.div`
    max-width: 45rem;
    margin: 12rem auto;
    @media screen and (max-width: 768px) {
        background: ${({ theme }) => theme.colors.white};
        padding: 5.5rem 3rem;
        box-shadow: 0px 44px 65px rgba(176, 183, 195, 0.19);
        border-radius: 1.5rem;
    }
    @media screen and (max-width: 540px) { 
        margin-top: 15rem;
        padding 4rem 2rem;
    }
`;
const DetailsSectionHeader = styled.h1`
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.loginHeader};
    font-weight: 600;
    margin-bottom: 1rem;
`;
const DetailsSectionParagraph = styled.p`
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.loginSubHeader};
    margin-bottom: 2rem;
`;

const LoginPageWrapper = (props: any) => {

    const { children, title, subTitle } = props

    return (
        <LoginPageOuterDiv>
            <Wrapper>
                <LoginBgCover>
                    <SiteLogoWrapper>
                        <Link href="/auth/login" passHref>
                            <HeaderAnchor>
                                <Image
                                    src="/images/admin/Logo.svg"
                                    alt="Logo"
                                    width="211"
                                    height="55"
                                />
                            </HeaderAnchor>
                        </Link>
                    </SiteLogoWrapper>
                </LoginBgCover>
                <Content>
                    {/* <LanguageSelection>
                        <SelectItem>
                            <option value="english(uk)" selected>English(UK)</option>
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                            <option value="malayalam">Malayalam</option>
                            <option value="arbic">Arbaic</option>
                        </SelectItem>
                    </LanguageSelection> */}
                    <DetailsSection>
                        <DetailsSectionHeader>{title}</DetailsSectionHeader>
                        <DetailsSectionParagraph>{subTitle}</DetailsSectionParagraph>
                        {children}
                    </DetailsSection>
                </Content>
            </Wrapper>
        </LoginPageOuterDiv>
    );
};

export default LoginPageWrapper;
