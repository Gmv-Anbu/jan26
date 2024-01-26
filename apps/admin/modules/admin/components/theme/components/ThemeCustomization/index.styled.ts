import styled from "styled-components"

interface Props {
    showPointer?: boolean,
    borderBottom?: string,
    textTransform?: string,
    isOpen?: boolean,
    background?: string,
}

const Container = styled.div`
    display: grid;
    height: 100%;
    grid-gap: 2.5rem;
    background: #E7E7E7;
    grid-template-columns: 25rem auto 30rem;
    @media screen and (min-width: 1121px) { 
        grid-template-columns: 25rem auto 25rem;
    }
`
const SideMenu = styled.div`
    background: ${({ theme }) => theme.colors.white};
    display: flex;
    height: 1000px;
    flex-direction: column;
    overflow-y: scroll;
`

const MiddleContainer = styled.div`

`
const EditSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  height: 1000px;
  overflow-y: scroll;
`

const Preview = styled.div`
    width: 100%;
    iframe {
        position: absolute;
        width: 100%;
        transform: scale(0.54);
        transform-origin: 1rem top;
        height: 1710px;
        @media screen and (max-width: 1400px) { 
            transform: scale(0.55);
        }
        @media screen and (max-width: 1200px) { 
            transform: scale(0.51);
        }
        @media screen and (min-width: 1530px) { 
            transform: scale(0.56);
        }
        @media screen and (min-width: 1650px) { 
            transform: scale(0.6);
        }
        @media screen and (min-width: 1800px) { 
            transform: scale(0.62);
        }
        @media screen and (min-width: 1900px) { 
            transform: scale(0.64);
        }
    }
`

const PreviewInfo = styled.div`
    display: flex;
    padding: 1.2rem;
    background: white;
    border-radius: 5px;
    margin: 1.5rem 0;
    align-items: center;
    p, a {
        font-family: Inter;
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.7rem;
    }
    p {
        margin-left: 1rem;
        color: #010101;
    }
    a {
        color: #2D7AB8;
    }
    div{
    
    background: #F9F8F9;
    border: 1px solid rgba(45, 122, 184, 0.2);
    border-radius: 6px;   
    width: 100%;
    height: 33px; 
    margin-left: 4rem;
    padding: 2px 5px 5px 5px;
    }
`
const Pages = styled.li<Props>`
    display: flex;
    flex-direction: column;
    padding: 0 0 30px;
    border-bottom: ${props => props.borderBottom ? props.borderBottom : 'unset'};
`
const MenuSection = styled.ul`
    display:flex;
    flex-direction: column;
   
`
const PageName = styled.li`
    padding: 10px 0px 10px 20px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #171717;
    display: list-item;
    list-style: none;
    .active{
        background-color: blue;
    }



`
const ListName = styled.li`
    width: 72px;
    left: 118px;
    top: 187px;
    padding: 10px 0px 10px 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: #171717;
`
const Heading = styled.div`
    display: flex;
    width: 54px;
   
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    
/* identical to box height */
   
    color: #151515;
    width: 100%;
   
   
   
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    justify-content: flex-start;
    align-items: center;
    height: auto;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
`
const TopHeading = styled.div`
    display: flex;
    width: 54px;
   

    
/* identical to box height */
   
    color: #151515;
    width: 100%;
   
   
   
  
    justify-content: space-between;
    align-items: center;
    height: auto;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
`
const TopHeadingText = styled.span<Props>`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    margin-right: 1.5rem;
    cursor: ${props => props.showPointer ? 'pointer' : 'unset'};
    text-transform: ${props => props.textTransform ? props.textTransform : 'none'};
`
const CollapsibleListItem = styled.div<Props>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
    cursor: pointer;
    background: ${props => (props.background ? props.background : 'none')};
`
const SettingContent = styled.div<Props>`
    border-top: none;
    opacity: ${props => (props.isOpen ? "1" : "0")};
    max-height: ${props => (props.isOpen ? "100%" : "0")};
    overflow: hidden;
    padding: ${props => (props.isOpen ? "10px" : "0 15px")};
    transition: all 0.3s;
`;

const FavIconWrapper = styled.div`
    text-align: center;
    cursor: pointer;
`

// const EditSeperator = styled.div`
//     padding: 2.5rem 2rem;
//     border: 1px solid #E0E0E0;
//     font-family: Inter;
//     h4 {
//         font-size: 1.6rem;
//         font-weight: 500;
//         line-height: 1.9rem;
//     }
//     label {
//         font-size: 1.4rem;
//         font-weight: 500;
//         line-height: 1.7rem;
//         display: block;
//         margin-bottom: 6px;
//     }
//     input {
//         background: #FFFFFF;
//         border: 1px solid #BAC6D9;
//         border-radius: 4px;
//         font-family: Poppins;
//         font-size: 1.4rem;
//         font-weight: 500;
//         line-height: 2.1rem;
//         padding: 1rem 1.2rem;
//         width: 100%;
//         color: #3C527D;
//     }
//     .d-flex-aic {
//         display: flex;
//         align-items: center;
//     }
//     .redirect-text {
//         display: flex;
//         align-items: center;
//         span {
//             font-family: Inter;
//             font-size: 1.6rem;
//             font-weight: 400;
//             line-height: 1.7rem;
//         }
//     }
//     .mr-2 {
//         margin-right: 4px;
//     }
//     .ml-auto {
//         margin-left: auto;
//     }
// `

// const ImageUploader = styled.div`
//     padding: 3rem 1.5rem 1.8rem;
//     background: #F9F9F9;
//     border: 1px dashed #BAC6D9;
//     border-radius: 4px;
//     border-width: 2px;
//     text-align: center;
//     label {
//         font-family: Inter;
//         font-size: 14px;
//         font-weight: 400;
//         line-height: 20px;   
//         margin-bottom: 5px;     
//     }
//     span {
//         display: block;
//         font-family: Inter;
//         font-size: 12px;
//         font-weight: 400;
//         line-height: 18px;
//         margin-bottom: 15px;     
//     }
//     button {
//         background: #FFFFFF;
//         border-radius: 6px;
//         font-family: Inter;
//         padding: 1rem;
//         font-size: 14px;
//         font-weight: 500;
//         line-height: 20px;
//         width: 100%;
//         border: 1px solid #2D5B9A;

//         // border-image-source: linear-gradient(90deg, rgba(45, 91, 154, 0.56) 0%, rgba(8, 18, 35, 0.56) 100%);
//         color: #23487B;
//     }
// `
const ItemContainer = styled.div`
    display: flex;
    padding-left: 5rem;
    @media screen and (min-width: 1121px) { 
        padding-left: 3rem;
    }
    .active{
        background-color: aliceblue;
    }
    img{
        cursor: pointer;
    }
`
const PageItems = styled.li`
    display: flex;
    flex-direction: column;
    .active{
        background: aliceblue;
    }
`
const SubMenu = styled.ul`
    display: flex;
    flex-direction: column;
    margin-left: 9.5rem;
`
const SubMenuItem = styled.li`
    list-style: none;
    position: relative;
    &:before {
        content: ' ';
        width: 20px;
        height: 1.2px;
        left: -35px;
        background: #6A7F8F;
        display: block;
        position: absolute;
        bottom: 11px;
    }
    &:after {
        content: ' ';
        width: 1px;
        height: 23px;
        left: -35px;
        background: #6A7F8F;
        display: block;
        position: absolute;
        top: -11px;
    }
`

const CheckboxInput = styled.label`
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0px;
    text-align: left;
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: white;
    }
    &:hover input ~ .checkmark {
        background-color: white;
    }
    input:checked ~ .checkmark {
        background-color: white;
    }
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    input:checked ~ .checkmark:after {
        display: block;
    }
    .checkmark:after {
        left: 10px;
        top: 2px;
        width: 6px;
        height: 12px;
        border: solid black;
        border-width: 0px 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`

export {
    CheckboxInput, SubMenuItem, SubMenu, PageItems, ItemContainer, TopHeading, ListName, PageName, MenuSection,
    Pages, PreviewInfo, Preview, EditSection, MiddleContainer, SideMenu, Container, Heading, TopHeadingText, CollapsibleListItem, SettingContent,
    FavIconWrapper,
}