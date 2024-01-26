import styled from 'styled-components';

export const LinkItem = styled.a`
  transition: all 0.2s;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fontdark};
  font-size: ${({ theme }) => theme.fontSizes.md};
  &:hover {
    color: ${({ theme }) => theme.colors.fontprimary};
  }
`;
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.fontprimary};
  padding-bottom: 0.5rem;
  position:relative;
  span{
    font-size:${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.fontdark};
    padding: 0rem 2rem;
    font-weight: normal;
    float: right;
    margin-top: 7px;
    padding-right: 120px;
    @media (max-width: 1120px) {
    display: flex;
    flex-direction: column;
    padding:0;
    margin-top:10px;
    float:inherit;
  }
  }
  .editing{
    background: ${({ theme }) => theme.colors.auctionBoxbg};
    border: 1px solid ${({ theme }) => theme.colors.iconContainerColor};
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.11));
    border-radius: 1.2rem;
  }
  @media (max-width: 1120px) {
    display: flex;
    flex-direction: column;
  }
`;
export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.fontdark};
`;
export const ProfileWrapper = styled.div<any>`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    color: ${({ theme }) => theme.colors.fontprimary};
    margin-top: 15rem;
    margin-bottom: 30rem;
    width: 100%;
    &:before {
        content: "";
        width: 100%;
        height: 33rem;
        left: 0;
        top: 0;
        position: absolute;
        z-index: -1;
        background-repeat: no-repeat;
        background-position: left;
        background-size: cover;
        background-image: url(${(props) => props.url});
      
    }
    @media (max-width:1120px) {
      padding: 0 2rem;
    }
    @media (max-width:767px) {
     
    }
    @media (max-width:575px) {
     
    }
`;
export const ProPicWrapper = styled.div`
    width:15rem;
    height:15rem;
    position: relative;
    flex-basis:5%;
    align-self: flex-start;
    align-items: center;
    display: flex;
    span{
        width:9rem!important;
        height:9rem!important;
        padding:12px 0px;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      border: 0.4rem solid ${({ theme }) => theme.colors.fontdark};
    }
    @media (max-width:1120px) {
      flex:0 0 100%;
      width:100%;
      justify-content:center;
      img,span{
        width:10rem!important;
        height:10rem!important;
      }
    }
    @media (max-width:768px) {
      flex:0 0 100%;
      justify-content:center;
      img,span{
        width:10rem!important;
        height:10rem!important;
      }
    }
`;
export const InfoWrapper = styled.div`
    position: relative;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    flex-direction:column;
    flex-basis:55%;
    width:100%;
    margin:0px 0px 0px 33px;
    p{
      //font-size:${({ theme }) => theme.fontSizes.md};
      font-size:1.4rem;
      color: ${({ theme }) => theme.colors.colorD2};
      text-align:left;
    }
    @media (max-width:1120px){
      flex:0 0 100%;
      margin: 0px;
      padding:10px;
      justify-content: center;
      align-items: center;
      div{
        padding-left: 0rem;
      }
  }
    @media (max-width:768px){
        flex:0 0 100%;
        div{
          padding-left: 0rem;
        }
    }
    @media (max-width:575px){
      flex:0 0 100%;
      margin:0rem;
      div{
        padding-left: 0rem;
      }
  }
`;
export const SocialMediaSection = styled.div`
position: relative;
display: inline-block;
align-items:center;
flex-basis:40%;
div{
  width:100%
}
@media (max-width:1120px){
  flex: 0 0 100%;
  width: 100%;
}
@media (max-width:768px){
  
}
@media (max-width:768px){
 width:100%;
}
`
export const SocialIcon = styled.div`
  display: flex;
  margin: 2.8rem 0 0 2rem;
  
  .icon{
    flex: 0 0 7%;
    min-width: 34px;
    min-height: 34px;
    margin:0rem 1rem;
    text-align: center;
    border-radius: 100%;
    background: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.fontdark};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width:1120px){
   margin-bottom:3rem;
   }
   @media (max-width:767px){
    
   }
   @media (max-width:575px){
    justify-content: center;
   }
`
export const ActionWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 7.5rem;
    padding: 1rem 1.5rem;
    gap:1rem;
`;
export const FlexContainer = styled.div`
     display:flex;
     align-self: flex-start;
     margin: auto;
     border-radius: 1rem;
     border: 1px solid ${({ theme }) => theme.colors.fontdark};
     backdrop-filter: blur(43.0769px);
     padding: 38px 50px;
     margin-bottom: 5rem;
     background:${({ theme }) => theme.colors.flexContainerBg};
      @media screen and (min-width:1121px){
        width: calc(100% - 20px);
        max-width: 1377px;
        margin:0 10px 5rem;
      }
     @media (max-width:1120px){
     padding:0 2rem;
     display: inline-block;
     text-align: center;
     width: 100%;
     max-width: 400px;
    }
     @media (max-width:768px){
       flex-wrap:wrap;
       padding-left:0rem;
     }
     @media (max-width:575px){
      padding:0 2rem;
      margin:auto;
      transform: translateY(-10%);
      width:100%;
    }
`;
export const TabSection = styled.div`
        display:flex;
        align-self: flex-start;
        width:100%;
        justify-content: center;

        @media (max-width: 1120px) {
         padding:0 2rem;
         margin-top: 0rem;
        }
        @media (max-width: 768px) {
          padding-left: 0rem;
          margin-top: -5rem;
        }
        @media (max-width: 575px) {
          padding-left: 0rem;
          margin-top: 0rem;
        }
`;
export const TabContent = styled.div`
    display:flex;
    flex-flow:column;
    justify-content: center;
    width:100%;
    margin-top:4.38rem;
`;

export const CardFlexContainer = styled.div`
  display:flex;
  flex-flow:row;
  flex-wrap:wrap;
  gap:1.25rem;
  // @media (max-width: 1120px) {
  //   padding: 0 2rem;
  // }
  @media (max-width: 768px) {
    justify-content:center
  }
  `
export const FavoriteNftContainer = styled.div`
  display:flex;
  flex-flow:row;
  flex-wrap:wrap;
  gap:1.25rem;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SocialMediaCountValueSection = styled.div`
display:flex;
align-items:center;
justify-content: flex-end;
flex-wrap:wrap;
margin-top: 0rem;
width:100%;
@media (max-width: 1024px) {
  justify-content: center;
}
`
export const SocialMediaCountBox = styled.div`
    flex-basis:33.33%;
    text-align:center;
    border-right: 1px solid ${({ theme }) => theme.colors.fontdark};
    &:last-child {
      border: none;
    }
    h3{
      font-size:${({ theme }) => theme.fontSizes.lg};
      margin-bottom:0rem;
    }
    p{
      font-size:${({ theme }) => theme.fontSizes.md};
      margin-top:0rem;
      color: ${({ theme }) => theme.colors.colorD2};
    }
`
export const SocialMediaIconsSection = styled.div`
display:flex;
align-items:center;
padding: 1rem 0rem 0rem 3rem;

@media (max-width: 768px) {
  justify-content: center;
  margin-left: 0rem;
  padding: 1rem 0rem;
}
`
export const IconCotainer = styled.div`
    padding:0.5rem;
    border:0.1rem  solid ${({ theme }) => theme.colors.fontdark};
    background: ${({ theme }) => theme.colors.secondary};
    margin:0.5rem;
    flex: 0 0 4.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4.5rem;
`
export const EditIconWrapper2 = styled.div`
z-index:99;
    float:right;
    height:30px;
    width:30px;
    min-width: 30px;
    min-height: 30px;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.auctionBoxbg};
    border: 1px solid ${({ theme }) => theme.colors.iconContainerColor};
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.11));
    border-radius: 100%;
    cursor: pointer;
    img{
        width:11px!important;
        height:11px!important;
        min-width: 11px;
        max-width: 11px; 
        min-height: 11px; 
        max-height: 11px;
    }
`;

export const FollowButton = styled.button`
min-width: 108px;
max-height: 38px;
font-family: ${({theme}) => theme.fontsFamily.primary};
font-style: normal;
font-weight: 500;
font-size: 14px;
padding:9px 9px 8px;
font-family: ${({theme}) => theme.fontsFamily.primary};
font-style: normal;
font-weight: 500;
line-height: 21px;
color: ${({ theme }) => theme.colors.fontprimary};
cursor:pointer;
position: relative;
background-color: ${({ theme }) => theme.colors.black};
border-radius: 7px;
`
export const FollowButtonWrapper = styled.div`
    float:right;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    @media (max-width: 1120px) {
    margin: 0;
    width: 100%;
    display: inline-block;
    float: inherit;
    padding: 0;
    margin-top: 10px;
    position:relative;
    right: 0;
  }
`
export const ProfileDataContainer = styled.div`
    display:flex;
    align-items: center;
    word-break: break-word;
    @media (max-width: 1120px) {
      display: flex;
      flex-direction: column;
      padding:0;
      margin-top:10px;
      float:inherit;
    }
    span{
      font-size:${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.fontdark};
      padding: 0rem 2rem;
      font-weight: normal;
      @media (max-width: 1120px) {
      display: flex;
      flex-direction: column;
      padding:0;
      margin-top:10px;
      float:inherit;
    }}
`;