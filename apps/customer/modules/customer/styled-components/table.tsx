import styled from "styled-components";

const TableWarpper = styled.div`
    display: block;
    overflow-x: auto;
    width: 100%;
`
const Table = styled.table`
    color: ${({ theme }) => theme.colors.artWorkText};
    width: 100%;
`
const TableHead = styled.thead`
`
const TableBody = styled.tbody`
`
const TableRow = styled.tr`
    text-align: left;
`
const TableTH = styled.th`
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.6rem;
    color: ${({ theme }) => theme.colors.colorD2};
    padding: 3rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.tabBorderBot};
    &:nth-child(1) {
        min-width: 20rem;
    } 
    &:nth-child(2) {
        min-width: 20rem;
    } 
    &:nth-child(3) {
        min-width: 12rem;
    }
    &:nth-child(4) {
        min-width: 12rem;
    } 
    &:nth-child(5) {
        min-width: 12rem;
    }
`
const TableTD = styled.td`
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.1rem;
    padding: 3rem 0;
    a.table-actions {
        width: 25px;
        height: 25px;
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;
    }
    a:hover {
        color: ${({ theme }) => theme.colors.linkHover};
    }
    border-bottom: 1px solid ${({ theme }) => theme.colors.tabBorderBot};
    p {
        line-height: 2.6rem;
        color: ${({ theme }) => theme.colors.colorD2};
        &.user-amount {
            color: ${({ theme }) => theme.colors.white};
            span {
                font-weight: 600;
            }
        }
    }
    @media screen and (max-width: 800px) {
        padding: 2rem 1rem;
        div {
            align-items: flex-start;
        }
    }
`
const FlexCenter = styled.div`
    display: flex;
    align-items: center;
`
const TableImgWrapper = styled.div`
    width: 5.2rem;
    margin-right: 1rem;
    height: 5.2rem;
    cursor: pointer;
`


export {
    TableWarpper, Table, TableHead, TableBody, TableRow, TableTH, TableTD, FlexCenter, TableImgWrapper
}