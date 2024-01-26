import Styled from 'styled-components';

export const TableHeader = Styled.div`
 display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    background: #FFFFFF;
box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
border-radius: 8px; 
    
`;

export const HeaderContainer = Styled.div`
      display: flex;
    flex: 0 0 10%;
    justify-content: space-around;
    h3{
        font-weight: 500;
font-size: 16px;
padding: 1rem;
    }
    
`;

export const Container_1 = Styled.div` display: flex;
flex: 0 0 48%;
justify-content: space-around;


`;
export const InputField = Styled.div` position: relative;
/* span{
    position: absolute;
    
    color:  #858181;
    Width:13px;
    Height:13px;
    font-weight: 500;
    top: 8px;
    left: 15px;
    text-align: center;
} */

`;

export const InputPath = Styled.input`
    background: #FFFFFF;
border: 1px solid #EBEBEB ;
border-radius: 6px;
width: 255px;
padding: 5px;
outline: none;
padding-left: 2.2em
padding-top: 0.4em
::placeholder {
    padding: 30px;
    font-size: 14px;
    color:  #606060;
    Width:44px;
    font-weight:400;
    inline-border: none;
    Height:17px;}
`;
export const FilterButton = Styled.button` 
background: #FFFFFF;
border: 1px solid #EBEBEB;
box-shadow: 0px 13px 50px rgba(0, 0, 0, 0.03);
border-radius: 6px;
padding: 7px;
width: 87px;
cursor: pointer;

font-size: 14px;

color: #606060;
`;
//////ICON////
export const Icon = Styled.svg`  margin-right: 10px;
margin-bottom: -2.5px;`;

export const SearchIcon = Styled.span`position: absolute;
color:#858181;
hight:13px;
width:13px;
top:9px;
left:13px`;

export const AiIcon = Styled.span`color: #131313;
font-size:18px;`;

export const SortIcon = Styled.span`color:#888888;margin-left:5px;
`;

///////
export const ButtonContainer = Styled.div`
 display: flex;
    justify-content: center;
    align-self: center;
`;

export const CreateButton = Styled.button` background: linear-gradient(266.81deg, #305498 3.68%, #25C0F2 144.79%);
border-radius: 6px;
width: 150px;
cursor:pointer;
padding: 2.5px;
border: none;
height: 36px;
font-size: 14px;
color: #FFFFFF;
text-align: center;`;

export const Plus = Styled.span`
     
    font-size: 20px;
    height: 12px;
    width: 12px;
     display: flex;
     align-items: center;
     justify-content: center;
     margin-right: 5px;
     margin-bottom: 0.5px;
 `;

////Image///

export const ArtworkImage = Styled.div`
fontsize:14px;
img{
    height:24px;
    width:24px;
    border-radius:3px;
    margin-bottom: -5px;
    margin-right: 10px;}
    
    
 `;

export const ArtistImg = Styled.img`  height:24px;
width:24px;
border-radius:3px;
margin-bottom: -5px;
margin-right: 10px;`;

///Table-Background///
export const TableBackground = Styled.div`
width: 100vw;
height: 100vh;
padding:30px;

`;

/////Table Style/////

export const TableContainer = Styled.table`  border-collapse: collapse;
width: 100%;
    height: 70vh;
    background-color: #FFFFFF;
    margin-top: 10px;
`;

export const TableTd = Styled.td`  border: 0.5px 0px 0.5px 0px solid #E4E4E4;
padding: 5px;
font-weight:400;
border-bottom: 0.1px solid #E4E4E4;
color:#131313;
font-size:14px;
padding-left:10px`;

export const TableTh = Styled.th`padding: 5px;
background-color: #F6F6F6;
font-size:14px;
font-weight:500;
color:#434040;text-align:start;
padding-left: 10px;`;

export const TableTr = Styled.tr`
height: 4.8rem`;

/////////////////////////Pagination////
export const Page = Styled.div`
    margin: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color:#23487B;
    font-size:12px;
    margin-top: 15px 0 0 0 ;
 

   span{
    border: 1px solid #23487B;
    border-radius:5px;
    margin:10px;
    padding:2.5px;
    
   }
 `;

interface ILinkS {
  active: boolean;
}

export const LinkS = Styled.a<ILinkS>`
    text-decoration: none;
    padding:5px 5px;
    border-radius:${(props) => `${props.active ? '5px' : '0px'}`};
    margin:10px;
    color:${(props) => `${props.active ? '#ffffff' : ''}`};
    background: ${(props) => `${props.active ? '#23487B' : ''}`};
    font-size:12px;
    svg{
        height:10px;
        width:10px;
    }
   
`;

export const Pages = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

export const One = Styled.span` border: 1px solid #23487B;
    border-radius:5px;
    margin:10px;
    color:#ffffff;
    background:#23487B;
    font-size:12px`;

export const TableWrapper = Styled.span`
   width: 100%`;
