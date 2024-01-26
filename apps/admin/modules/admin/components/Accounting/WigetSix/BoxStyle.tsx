import Styled from 'styled-components';

export const Container = Styled.div`
    background: #FFFFFF;
    flex: 0 0 33%;
    box-shadow: 1px 6px 40pxrgba(0,0,0,0.06);
    border-radius: 7px;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  
`;

export const BoxWrap = Styled.div`
display: flex;
width: 100%;
    justify-content: flex-start;
`;

export const ContainerWrap = Styled.div`  
display: flex;
flex-wrap: wrap;
width: 100%;
    height: 27.63rem;
`;

export const Box_Content = Styled.div`margin-left:1rem;
padding-top:1rem;
    
    display: flex;
    flex-direction: column;
 
 `;

////////Icon Style////
export const Icon = Styled.span`
 height: 2.25rem;
width: 2.25rem;
background: rgba(255, 178, 59, 0.2);
border-radius: 50%; 

svg{
    margin-left: 0.7rem;
    margin-top: 0.7rem;
  } `;

export const Icon_1 = Styled.span`
 height: 2.25rem;
width: 2.25rem;
background: rgba(113, 97, 212, 0.24);
border-radius: 50%; 
 svg{
    margin-left: 0.7rem;
    margin-top: 0.7rem;
  } `;

export const Icon_2 = Styled.span`
 height: 2.25rem;
width: 2.25rem;
background: #EDFBFF;
border-radius: 50%; 

 svg{
    margin-left: 0.7rem;
    margin-top: 0.7rem;
  } `;

export const Icon_3 = Styled.span`
 height: 2.25rem;
width: 2.25rem;
background: #FCE8FF;
border-radius: 50%; 

 svg{
    margin-left: 0.7rem;
    margin-top: 0.7rem;
  } `;

export const Icon_4 = Styled.span`
 height: 2.25rem;
width: 2.25rem;
background: rgba(56, 93, 255, 0.17);
border-radius: 50%;  

svg{
    margin-left: 0.7rem;
    margin-top: 0.7rem;
  } `;

export const Icon_5 = Styled.span`
 height: 2.25rem;
width: 2.25rem;
background: #EEFFF8;
border-radius: 50%;  

svg{
    margin-left: 0.7rem;
    margin-top: 0.7rem;
  } `;

export const Amount = Styled.h3`
/* font-family: 'Inter'; */
font-style: normal;
font-weight: 500;
font-size: 1.6rem;
color: #001C35;
padding-top: 0.8rem;
margin-block-start: 0;
    margin-block-end: 0;`;

export const Status = Styled.h6`
/* font-family: 'Inter'; */
font-style: normal;
font-weight: 400;
font-size: 0.9rem;
color: #979797;
padding-top:7px;
margin-block-start: 0;
margin-block-end: 0;`;

// export const Sign = Styled.span`font-family: 'Inter';
// font-style: normal;
// font-weight: 500;
// font-size: 1.5rem;
// color: #001C35;`;
