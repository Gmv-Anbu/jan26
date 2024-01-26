


import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import AdminLayout from "../../modules/admin/components/layout/layout";
import { ButtonPrimary } from "../../modules/shared/components/button/button";
import InputText from "../../modules/shared/components/formInputs/inputText";
import InputTextarea from "../../modules/shared/components/formInputs/inputTextarea";
import API from "../../api/admin";


  const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .add_icon{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;
const ButtonGroup = styled.div`
    display:flex;
    width:70%;
    justify-content:flex-end;
`;
const Button1 = styled.button`
    display:flex;
    border-radius: 5px;
    max-width:125px;
    width:100%;
    border:1px solid #2D5B9A8F;
    justify-content:center;
    align-items:center;
    height: 34px;
    color: #23487B;
    font-size: 1.4rem;
    font-weight: 500;
    margin-right:15px;
    cursor:pointer;
`;
const Button2 = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    height: 34px;
    color: #fff;
    max-width:82px;
    width:100%;
    font-size: 1.4rem;
    font-weight: 500;
    background: linear-gradient(266.81deg, #305498 3.68%, #25C0F2 144.79%);
    border-radius: 6px;
    cursor:pointer;
    border:0;
    img {
        padding-right:5px !important;
    }
`;
const HeaderLink = styled.a`
    width:30%;
    position:relative;
    padding-left: 33px;
    cursor:pointer; display: flex;
    align-items: center;

    &:after {
        content:"";
        position:absolute;
        top: 10px;
        left: 10px;
        border: solid #141415;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 2px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }
    &:before {
        content:"";
        position:absolute;
        left: 0;
        background: #E7E7E7;
        width: 23px;
        height: 23px;
        border-radius: 4px;
    }
`;
const CollectionWrap = styled.div`
    background: #FFFFFF;
    box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding:3rem 2rem;
    margin:2rem 0 0;
`;
const CollectionBanner = styled.div`
   background:url('/images/Admin/bg-collection.png') no-repeat center center;
   background-size: cover;
    min-height: 352px;
    border-radius: 8px;
    padding: 3.7rem 2.6rem;
    position:relative;
    margin:0 0 3rem;
    .img-collection {
        border: 6px solid rgba(255, 255, 255, 0.32)!important;
        border-radius: 6px;
    }
    h3 {
        font-size: 2.6rem;
        color: #F0F0F0;
        margin:3rem 0 1rem;
        text-transform: uppercase;
        font-weight: 600;
    }
    h6 {
        color: #FFFFFF;
        opacity: 0.66;
        font-size: 1.2rem;
        margin-bottom: 9px;
        text-transform: uppercase;
        font-weight: 600;
    }
    p {
        font-size: 1.2rem;
        color: #D8D8D8;
        max-width:388px;
        line-height: 22px;
        margin-bottom:14px;
    }
`;
const CollectionBannerProf = styled.div`
    background: ${({ theme }) => theme.colors.avatarBg};
    border-radius: 26.867px;
    display: flex;
    align-items: center;
    max-width:178px;
    height:44px;
`;
const CollectionBannerProfname = styled.h4`
    font-size: 1.6rem;
    color: #F0F0F0;
    font-weight: 500;
    padding-left: 6px;
`;
const CollectionTimerWrp = styled.div`
    background: ${({ theme }) => theme.colors.avatarBg};
    border-radius: 7.64031px;
    height: 48px;
    max-width: 167px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffff;
    position: absolute;
    top: 13px;
    right: 13px;
    font-size: 2rem;
    font-weight: 600;
`;
const CollectionTimer = styled.span`
    font-size:2rem;
    font-weight:600;
`;
const CollectionListWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.6rem;
`;
const CollectionListEach = styled.div`
    width:23.7%;
    border: 1px solid #EAEAEA;
    border-radius: 8.63348px;
    padding:1.2rem;
    margin: 0 0.6rem 2rem;
    span {
        width:100% !important;
    }
    img {
        width:100% !important;
    }
`;
const CollectionCardTitle = styled.h3`
    color: #001C35;
    font-size:1.6rem;
    font-weight:500;
    margin-top:13px;
`;
const CollectionDetails: NextPage = () => {
  const meta = {
    title: "NFT2.0 | Admin Artwork Listing",
    description: "Admin Artwork Listing for NFT",
  };

  return (
    <AdminLayout meta={meta} pageTitle={`Collection Management  >  The Wanderer`}>
      <SpaceBetween>
        <HeaderLink>Back</HeaderLink>
        <ButtonGroup>
            <Button1   className="btn_deactivate">
                Delete
            </Button1>
            <Button2   className="btn_edit">
            <Image src={`/svgs/icons/edit.svg`} alt={`edit`} width="12px" height="12px"/> 
            Edit
            </Button2>
        </ButtonGroup>
      </SpaceBetween>
        <CollectionWrap>
            <CollectionBanner>
                <Image src={`/images/Admin/img-collection.png`} alt={`card`} width="76px" height="69px"  className="img-collection"/> 
                <h3>The Beholders</h3>
                <h6>5 NFTs</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius when an unknown printer took a galley of type.</p>
                <CollectionBannerProf>
                    <Image src={`/images/admin/avatar.png`} alt={`user`} width="35" height="35" />
                    <CollectionBannerProfname>Theresa Web</CollectionBannerProfname>
                </CollectionBannerProf>
                <CollectionTimerWrp>
                    <CollectionTimer>11h  33m  20s</CollectionTimer>
                </CollectionTimerWrp>
            </CollectionBanner>
            <CollectionListWrap>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list1.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list2.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list3.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list4.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list1.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list2.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list3.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
                <CollectionListEach>
                    <Image src={`/images/Admin/img-list4.png`} alt={`card`} width="243px" height="230px" /> 
                    <CollectionCardTitle>CoinList. Mina Token Sale. junior one</CollectionCardTitle>
                </CollectionListEach>
        </CollectionListWrap>
        </CollectionWrap>
    </AdminLayout>
  );
};

export default CollectionDetails;
