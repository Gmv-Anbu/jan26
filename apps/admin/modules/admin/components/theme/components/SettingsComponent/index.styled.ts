import styled from "styled-components"

interface Props {
    bgColor?: any,
    flexWrap?: string,
    cursor?: string,
}

const Avatar = styled.div<Props>`
    box-sizing: border-box;
    border-radius: 50%;
    border: 0.125rem solid #ddd;
    padding: 0.125rem;
    width: 4rem;
    height: 4rem;
    background-image: ${props => (props.bgColor ? props.bgColor : "white")};    
    background-color: ${props => (props.bgColor ? props.bgColor : "white")};
`;

const ListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: auto;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
`
const Wrapper = styled.div<Props>`
    display: flex;
    flex-wrap: ${props => (props.flexWrap ? props.flexWrap : 'nowrap')};
    cursor: ${props => (props.cursor ? props.cursor : 'unset')};
    align-items: center;
`

const HeaderText = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: #5C5C5C;
    margin-left: .5rem;
`
const ColorHex = styled.p`
    flex-basis: 100%;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-left: .5rem
`

export { Avatar, ListContainer, Wrapper, HeaderText, ColorHex }