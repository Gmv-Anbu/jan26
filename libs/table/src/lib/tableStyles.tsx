import Styled from 'styled-components'

interface Props {
  isSelected?: boolean
}

export const TableHeader = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    background: #FFFFFF;
    box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
    border-radius: 8px; 
`

export const HeaderContainer = Styled.div`
    display: flex;
    flex: 0 0 10%;
    justify-content: space-around;
    h3{
        font-weight: 500;
        font-size: 16px;
        padding: 1rem;
    }
`

export const Container = Styled.div`
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 10%);
  border-radius: 8px;
`
export const SpaceBetween = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 2.5rem;
  .add_icon {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`

export const Container_1 = Styled.div` 
    display: flex;
    justify-content: flex-end;
    > div {
        margin-right: 1rem;
        
    }
`
export const InputField = Styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    outline: none;
    padding: 1rem 1.2rem;
`

export const InputPath = Styled.input`
    outline: none;
    border: none;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    &::placeholder {
        padding: 10px 0px;
        font-size: 14px;
        color:  #606060;
        Width:40%;
        font-weight:400;
        inline-border: none;
        Height:17px;
    }
`
export const FilterButton = Styled.button` 
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    box-shadow: 0px 13px 50px rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    padding: 7px;
    width: 87px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 1rem;
    color: #606060;
    height: -webkit-fill-available;
`

//////ICON////
export const Icon = Styled.svg`  
    margin-right: 10px;
    margin-bottom: -2.5px;
`

export const SearchIcon = Styled.span`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    color: #858181;
`

export const AiIcon = Styled.span`
    color: #131313;
    font-size:18px;
`

export const SortIcon = Styled.span`
    color:#888888;
    margin-left:5px;
`

export const ButtonContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
`

export const CreateButton = Styled.button` 
    font-family: Inter;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.8rem;
    color: white;
    background: linear-gradient(266.81deg, #305498 3.68%, #25C0F2 144.79%);
    border-radius: 6px;
    cursor:pointer;
    padding: 1.3rem 3rem;
    height: fit-content;
    border: none;
    span {
        display: block;
        padding-right: 5px;
    }
`

export const RequestButton = Styled.span` 
    background: #FFFFFF;
    border-radius: 6px;
    width: 155px;
    cursor:pointer;
    padding: 6px;
    height: auto;
    font-size: 13px;
    text-align: center;
`

export const Plus = Styled.span`
    font-size: 14px;
    height: auto;
    width: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    margin-bottom: 0.5px;
`

////Image///

export const ArtworkImage = Styled.div`
fontsize:14px;
img{
    height:24px;
    width:24px;
    border-radius:3px;
    margin-bottom: -5px;
    margin-right: 10px;}
    
    
 `

export const ArtistImg = Styled.img`  height:24px;
width:24px;
border-radius:3px;
margin-bottom: -5px;
margin-right: 10px;`

///Table-Background///
export const TableBackground = Styled.div`
width: 100vw;
height: 100vh;
padding:30px;

`

/////Table Style/////

export const TableContainer = Styled.table`  
    border-collapse: collapse;
    width: 100%;
    background-color: #FFFFFF;
`

export const TableTd = Styled.td`  border: 0.5px 0px 0.5px 0px solid #E4E4E4;
    padding: 2rem 1rem ;
    font-weight:400;
    border-bottom: 0.1px solid #E4E4E4;
    color:#131313;
    font-size:14px;
    overflow-wrap: break-word;
    &.width {
        div {
            white-space: break-spaces;
        }
    }
`

export const TableTh = Styled.th`padding: 5px;
background-color: #F6F6F6;
font-size:14px;
font-weight:500;
color:#434040;text-align:start;
padding: 2rem 1rem;
white-space: nowrap;
`

export const TableTr = Styled.tr<Props>`
height: 4.8rem;
background-color: ${(props) => (props.isSelected ? 'rgba(0, 163, 255, 0.06)' : 'FFF')};
:hover{
background-color:whitesmoke !important;
border-bottom:1px solid transparent;
border-top:1px solid transparent;
/* transition:0.3s; */
}`
/////////////////////////Pagination////
export const Page = Styled.div`
    margin: 15px;
    display: flex;
    justify-content: end;
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
    
 `

export const LinkS = Styled.a`
    text-decoration: none;
 
    min-width: 100%;
    padding:5px 5px;
   
    svg{
        height:10px;
        width:10px;
    }
   
`

export const Pages = Styled.div`
`

export const One = Styled.span` border: 1px solid #23487B;
    border-radius:5px;
    margin:10px;
    color:#ffffff;
    background:#23487B;
    font-size:12px`

export const TableWrapper = Styled.span`
   width: 100%`

export const EmptyNLoadWrapper = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem 0 3rem;
`
