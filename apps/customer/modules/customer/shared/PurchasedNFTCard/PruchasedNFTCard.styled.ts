import styled from "styled-components";

export const CardContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    cursor:pointer;
    // max-height: 52.8rem; 
    border-radius: 1.9rem;
    background: ${({ theme }) => theme.colors.copyFromClipboardbg};
    backdrop-filter: blur(2.8rem);
    width: calc(25% - 20px);
    padding: 15px 15px 34px;

    @media screen and (max-width:767px){
     width:calc(50% - 20px);
    }
    @media screen and (max-width:574px){
     width:calc(100% - 20px);
     margin-top:4rem;
    }
`
export const ImagePreview = styled.div`
    position:relative;
    span{
        border-radius: 1.5rem;
    }
    /* height: 100%; */
    width: 100%;
    &::after{
        content:'';
        position: absolute;
        background: ${({ theme }) => theme.colors.gradientLayer};
        border-radius: 1.5rem;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`
export const VideoPreview = styled.div`
    object-fit: cover;
    /* height: 28.5rem;  */
    position: relative;
    width: 100% !important;
    cursor: pointer;
    /* max-height: 200px;
    overflow: hidden; */
   
    /* @media screen and (min-width: 767px)  and (max-width: 767px) {
    video {
    width: 100% !important;
    max-height:119px; 
    } 
    } */
    @media screen and (min-width: 768px)  and (max-width: 900px) {
    video {
    width: 100%;
    max-height:122px; 
    }
    }
    @media screen and (min-width: 901px)  and (max-width: 1100px) {
    video {
    width: 100%;
    height:144px; 
    }
    }
    @media screen and  (min-width: 1101px) and (max-width: 1120px) {
    video {
    height: 21.2rem; 
    width: 100%
    }
    }
    @media screen and (min-width: 1121px)  and (max-width: 1500px) {
    video {
    width: 100%;
    height: 23.1rem; 
    }
    }
    @media only screen and (max-width: 768px){
    video {
    width: 100%;
    max-height:119px; 
    }
    }
    @media only screen and (max-width: 767px){
    video {
    width: 100%;
    max-height:initial; 
    }
    }
    @media only screen and (max-width: 574px){
    video {
    width: 100%;
    max-height:436px; 
    }
    }
    @media only screen and (max-width: 480px){
    video {
    width: 100%;
    max-height:247px; 
    }
    }
    @media only screen and (max-width: 360px){
    video {
    width: 100%;
    max-height:199px; 
    }
    }
    video{
        border-radius: 1.5rem;
    }
    
`
export const AudioPreview = styled.div`
    height: 100%;
    width: 100%
`
export const ProfileContainer = styled.div`
    display:flex;
    height: 5.2rem;
    width: 17.2rem;
    border-radius: 3.2rem;
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.avatarBg};
    backdrop-filter: blur(2.8rem);
    margin-top: -24px;
    position: relative;
    z-index: 3;
    top: inherit;
    left: inherit;
    right: inherit;
    bottom: inherit;
    padding:5px 6px 4px 6px;
    align-items: center;
`
export const ProfileImage = styled.img`
    height: 4.227012634277344rem;
    width: 4.2rem;
    border-radius: 100rem;
   `
export const UserName = styled.div`
    font-family: ${({ theme }) => theme.fontsFamily.secondary};
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 160%;
    color: ${({ theme }) => theme.colors.fontcolor};
    margin-left:1rem;
`
export const AssetInfoWrapper = styled.div`
    display:flex;
    flex-flow:column;
`;
export const EditionInfo = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 160%;
    color: ${({ theme }) => theme.colors.fontcolor};
    text-align: center;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 23px;
    padding-top:23px;
    border-top: 2px solid rgba(101, 108, 132, 0.12);
    p{
        font-family: ${({ theme }) => theme.fontsFamily.primary};
        font-style: normal;
        font-weight: 500;
        font-size: 2rem;
        line-height: 160%;
        color: ${({ theme }) => theme.colors.fontcolor};
        text-align:center;
}
`
