import React, { useState } from "react";
import styled from 'styled-components';
import Image from "next/image";
import router from "next/router";
import { handleNaming } from "@apps/customer/utils/helper";
import Icon from "../../../shared/components/icon/icon"
import { VideoComponent } from "@nft-marketplace/VideoComponent";

const NFTDetailsContainer = styled.div`
    position: relative;
    font-family: ${({theme}) => theme.fontsFamily.primary};
    height: 70rem;
    max-width: 57.5rem;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 3rem;
    display: flex;
    align-items: flex-end;
    padding: 5rem 5.5rem;
    border-radius: 1.5rem;
    @media screen and (max-width: 768px) {
        min-width: 100%;
        max-height: calc(100vh - 25%);
        min-height: 60rem;
        height: 100%;
        margin: 3rem 0;
    }
    @media screen and (max-width: 540px) {
        padding: 3rem;
    }
    cursor:pointer
`
const NFTDetailsContent = styled.div`
    max-width: 36rem;
    width: 100%;
`
const NFTDetailsHeading = styled.h3`
    font-size: 3rem;
    font-weight: 700;
    line-height: 3.6rem;
    margin: 0rem;
    margin-bottom: 3rem;
`
const DeFlex = styled.div`
    display: flex;
    @media screen and (max-width: 540px) {
        display: block;
        div:first-child {
            margin-bottom: 2rem;
        }
    }
`
const NFTDetailsUserContent = styled.div`
    display: flex;      
    margin-right: 1.5rem;
    img {
        width: 5rem;
        margin-right: 1.2rem;
    }
    span {
        display: block;
        font-size: 1.8rem;
        font-weight: 300;
        line-height: 2.3rem;
        color: ${({ theme }) => theme.colors.headingInfo};
    }
    p {
        margin: 0;
        font-family: ${({theme}) => theme.fontsFamily.primary};
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 2.3rem;
    }
`
const UserImageWrapper = styled.div`
    position: relative;
    width: 5rem;
    margin-right: 1.2rem;
    img{
        border-radius:9rem;
    }
`
const IconContainer = styled.span`
    position: absolute;
    bottom: 0;
    right: -1px;
`;

const VideoPreview = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    border-radius: 15px
`

const SliderSelectedNFT = (props: any) => {

    const { selected, data } = props

    const handleSliderClick = (id: number) => {
        router.push(`/base/assetDetails?id=${id}`)
    }

    return (
        <NFTDetailsContainer style={{ backgroundSize: data?.mediaType === "audio" ? "contain":"cover" , backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6188) 52.6%, rgba(0, 0, 0, 0.68) 100%), url(${data?.mediaType === "audio" ? "/svgs/audio-white.svg" : data?.NFT})` }} onClick={() => handleSliderClick(data?.id)}>
            {data?.mediaType === "video" && (
                <VideoPreview>
                    <VideoComponent filePath={data?.NFT} controls={false} mute={true} autoPlay={true}/>
                </VideoPreview>
            )}
            <NFTDetailsContent >
                <NFTDetailsHeading>{data?.name}</NFTDetailsHeading>
                <DeFlex>
                    {data &&
                        <NFTDetailsUserContent>
                            <UserImageWrapper>
                                <Image src={data?.image || `/images/admin/avatar.png`} alt='owner' width="50" height="50" />
                                {data?.isVerified && (
                                    <IconContainer className="icon-container">
                                        <Icon name="verified" />
                                    </IconContainer>
                )}
                            </UserImageWrapper>

                            <div>
                                <span>Owner</span>
                                <p>{`${handleNaming(data?.firstName,data?.lastName,data?.userName,data?.walletAddress)}`}</p>
                            </div>

                        </NFTDetailsUserContent>
                    }
                    {/* <NFTDetailsUserContent>
                        <UserImageWrapper>
                            <Image src={'/images/customer/mainSlider/artist.png'} alt='artist' width="50" height="50" />
                        </UserImageWrapper>
                        <div>
                            <span>Artist</span>
                            <p>@jonrafman</p>
                        </div>
                    </NFTDetailsUserContent> */}
                </DeFlex>
            </NFTDetailsContent>
        </NFTDetailsContainer>
    )
}

export default SliderSelectedNFT