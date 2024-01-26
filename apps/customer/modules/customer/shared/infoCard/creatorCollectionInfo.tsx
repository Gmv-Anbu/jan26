import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Icon from '../../../shared/components/icon/icon'


const CCwrapper = styled.div`
    padding: 1.3rem 2.7rem 1.3rem 1.3rem;
    background: ${({ theme }) => theme.colors.shareBtnBg};
    border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
    backdrop-filter: blur(28px);
    align-items: center;   
    border-radius: 10rem;
    border:1px solid ${({ theme }) => theme.colors.ccwrappercolor};
    display: inline-flex;
    align-items: center;
    margin-bottom: 3.6rem;
    margin-right: 2rem;
    margin-top: 1rem;
    cursor: pointer;
    h3 {
        font-family: ${({theme}) => theme.fontsFamily.secondary};
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.9rem;
        margin-bottom: .3rem;
        color: ${({ theme }) => theme.colors.infoContainerColor};
        opacity: 0.51;
    }
    p {
        font-family: ${({theme}) => theme.fontsFamily.secondary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 2.4rem;
        color: ${({ theme }) => theme.colors.infoContainerColor};
    }
    &.md {
        margin-bottom: 2.3rem;
        margin-right: 1rem;
        &:last-child {
            margin-right: 0rem;
        }
        padding: .8rem 1.5rem .8rem .8rem;
        h3 {
            font-size: 1.1rem;
            font-weight: 500;
            line-height: 1.5rem;
        }
        p {
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 1.9rem;
        }
        .img-wrapper {
            width: 3.5rem;
            height: 3.5rem;
            margin-right: 1.5rem;
        }
        .verify-icon {
            transform: translate(30%,20%);
        }
    }
`
const CCImage = styled.div`
    width: 4.4rem;
    height: 4.4rem;
    position: relative;
    margin-right: 1.2rem;
    img{
        border-radius: 9rem;
    }
`
const Active = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(70%, 40%);
    &.large {
        svg {
            width: 1.7rem;
            height: 1.7rem;
        }
    }
`
const CCcontent = styled.div`

`

const CreatorCollectionsCard = (props: any) => {

    const { verified, type,imgSrc, size, data, clicked } = props
    return (
        <CCwrapper className={size || 'xl'} onClick={clicked}>
            <CCImage className='img-wrapper'>
                <Image src={imgSrc} alt="creator Image" width={size === 'md' ? 35 : 44} height={size === 'md' ? 35 : 44} />
                {verified && <Active className={`verify-icon ${size === 'md' ? '' : 'large'}`}><Icon name="verified" /></Active>}
            </CCImage>
            <CCcontent>
                <h3>{type}</h3>
                <p>{data}</p>
            </CCcontent>
        </CCwrapper>

    )
}
export default CreatorCollectionsCard