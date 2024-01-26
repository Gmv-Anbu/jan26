import styled from "styled-components";
import Image from "next/image";
import Icon from "../../../shared/components/icon/icon";

const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;
    &.avatar-cover {
        width: fit-content;
        padding: 0.5rem 3rem 0.5rem 0.6rem;
        border-radius: 3rem;
        margin: 0;
        background: ${({ theme }) => theme.colors.avatarBg};
        backdrop-filter: blur(3rem);
        .img-container {
            width: 4.2rem;
            height: 4.2rem;
            .icon-container {
                width: 1.6rem;
                height: 1.6rem;
            }
        }
    }
    &.collection {
        .icon-container svg {
            width: 1.6rem;
            height: 1.6rem;
        }
    }
    &.large {
        background: ${({ theme }) => theme.colors.avatarBg};
        backdrop-filter: blur(4rem);
        .img-container {
            width: 6.5rem;
            height: 6.5rem;
        }
        .icon-container {
            width: 2.5rem !important;
            height: 2.5rem !important;
            right: -4px;
            svg {
                width: 2.5rem;
                height: 2.5rem;
            }
        }
        p {
            // font-family: Roobert;
            font-size: 2.4rem;
            font-weight: 600;
            line-height: 3.8rem;
        }
    }
`;
const ImageContainer = styled.div`
    position: relative;
`;
const IconContainer = styled.span`
    position: absolute;
    bottom: 0;
    right: -5px;
`;
const UserName = styled.p`
    // font-family: Roobert;
    margin: 0;
    margin-left: 1.2rem;
    color: ${({ theme }) => theme.colors.infoContainerColor};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    &.username {
        font-size: 1.4rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.fontcolor};
    }
`;

const Avatar = ({
    image,
    userName,
    isVerified,
    atTheRate,
    withBG,
    collection,
    large,
}: {
    image: string;
    userName: string;
    isVerified: boolean;
    atTheRate?: boolean;
    withBG?: boolean;
    collection?: boolean;
    large?: boolean;
}) => {

    const myLoader=({src}:any)=>{
        return `${src}?w=${34}`;
    }

    return (
        <AvatarContainer className={`${withBG ? 'avatar-cover' : ''} ${large ? 'large' : ''} ${collection ? 'collection' : ''}`}>
            <ImageContainer className="img-container">
                <Image loader={myLoader} src={image || `/images/shared/user-placeholder.png`} alt={userName} width={large ? '65' : collection ? '42' : '34'} height={large ? '65' : collection ? '42' : '34'} />
                {isVerified && (
                    <IconContainer className="icon-container">
                        <Icon name="verified" />
                    </IconContainer>
                )}
            </ImageContainer>
            <UserName className={collection ? 'username': ''}>{!atTheRate ? userName : '@'+userName}</UserName>
        </AvatarContainer>
    );
};

export default Avatar;
