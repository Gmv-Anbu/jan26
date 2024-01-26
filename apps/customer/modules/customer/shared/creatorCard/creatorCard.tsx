import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import { ButtonPrimary } from '../../../shared/components/button/button';
import UserService from '../../../../api/customer/UserService';
import LoginModal from '../modal/login/LoginModal';
import useAuthConnect from '../ConnectWallet/useAuthConnect';
import { getCookie } from '@nft-marketplace/js-cookie';
import { KEYS } from '../../../../utils/storage';

const CreatorCardWrapper = styled.div`
    margin: 1rem auto;
    width: 33rem;
    background: ${({ theme }) => theme.colors.copyFromClipboardbg};
    border-radius:1.9rem;
    padding: 1.5rem 1.6rem 2rem;
    text-align:center;
    @media screen and (max-width: 1500px) {
        width: 28.5rem;
    }
`;
const CreatorBoxAuthor = styled.div`
    margin-top:-3rem;
    text-align:center;
    font-family: ${({theme}) => theme.fontsFamily.secondary};
    h4 {
        color: ${({ theme }) => theme.colors.fontcolor};
        font-size: 2.3rem;
        font-weight: 600;
        line-height: 3.7rem;
        margin-bottom: .5rem;
    }
    p {
        color: ${({ theme }) => theme.colors.fontcolor};
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 2.2rem;
        margin-bottom: 2rem;
        span {
            font-size: 1.6rem;
            font-weight: 500;
            line-height: 1.9rem;
        }
    }
`;
const CreatorBoxText = styled.div`
   
`;

function CreatorCard(props: any) {

    const { id, bgCoverImg, profileImg, creatorName, followers } = props
    const [data, setData] = useState<any>(null)
    const { connectToWallet } = useAuthConnect();
    const [error, setError] = useState(false)

    const close = () => {
        setError(false)
        connectToWallet();
    }
    const handleFollow = () => {
        let token = getCookie(KEYS.CUSTOMER_TOKEN);
        if (token) {
            const result = UserService.followCreator(id).then(
                response => {
                    setData(response?.data?.data)
                }
            ).catch(err => {
                console.log(err)
            })
        } else {
            setError(true)
        }
    }
    return (
        <CreatorCardWrapper>
            <Image src={bgCoverImg} alt="bg-cover" width="305px" height="150px" />
            <CreatorBoxAuthor>
                <CreatorBoxText>
                    <Image src={profileImg} alt="" width="91" height="91" />
                </CreatorBoxText>
                <h4>{creatorName}</h4>
                <p>{followers} <span>Followers</span></p>
                <ButtonPrimary blockBtn size="md" onDoubleClick={()=>{}} onClick={handleFollow}>{data?.followed ? "Following" : "Follow Me"}</ButtonPrimary>
            </CreatorBoxAuthor>
            {error && <LoginModal show={error} closeModal={close} msg={'Please Connect to wallet for further process'} />}
        </CreatorCardWrapper>
    )
}

export default CreatorCard